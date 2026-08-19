// Editing goes through TanStack Table's meta object, which is the supported way to
// reach application state from inside a cell renderer. Each cell keeps the value
// being typed in its own state and calls meta.updateData on blur; the table itself
// stays a pure view of the data above it.
//
// An interactive cell belongs in a CellComponent, not a CellBasic: CellBasic takes
// text through primaryText and renders it as text, while CellComponent takes
// children.

import {
  Button,
  CellComponent,
  CellHeader,
  Icon,
  Table,
  TableHeader,
  TableRow,
  fontBodyS,
  fontBodyXs,
  fontHeaderS,
  getCorners,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { faker } from "@faker-js/faker";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type CellContext,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table";
import * as React from "react";

type Person = {
  age: number;
  firstName: string;
  lastName: string;
  status: string;
  visits: number;
};

// Declaring the meta shape is what types table.options.meta at the call site. The
// type parameter is unused here but has to match TanStack's own declaration.
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: string) => void;
  }
}

function makeData(count: number): Person[] {
  return Array.from({ length: count }, () => ({
    age: faker.number.int({ max: 80, min: 18 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    status: faker.helpers.shuffle([
      "relationship",
      "complicated",
      "single",
    ])[0]!,
    visits: faker.number.int(1000),
  }));
}

const EditableInput = styled.input<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const corners = getCorners(props);
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      background: transparent;
      border: 1px solid transparent;
      border-radius: ${corners?.m}px;
      color: ${semanticColors?.base?.textPrimary};
      padding: ${spaces?.xxs}px ${spaces?.xs}px;
      width: 100%;

      &:hover {
        border-color: ${semanticColors?.base?.borderPrimary};
      }

      &:focus {
        border-color: ${semanticColors?.accent?.borderSelected};
        outline: none;
      }
    `;
  }}
`;

const Toolbar = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      margin-top: ${spaces?.l}px;
    `;
  }}
`;

const Log = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      margin-top: ${spaces?.l}px;
    `;
  }}
`;

const LogTitle = styled.h4<CommonThemeProps>`
  ${fontHeaderS}
  margin: 0;
`;

const LogBody = styled.pre<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const corners = getCorners(props);
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      background: ${semanticColors?.base?.backgroundSecondary};
      border-radius: ${corners?.m}px;
      color: ${semanticColors?.base?.textSecondary};
      margin: ${spaces?.xs}px 0 0;
      max-height: 160px;
      overflow: auto;
      padding: ${spaces?.s}px;
    `;
  }}
`;

function CellEditor(cell: CellContext<Person, unknown>) {
  const initialValue = String(cell.getValue());
  const [value, setValue] = React.useState(initialValue);

  // Regenerating the data resets every cell back to what the table now holds.
  React.useEffect(() => setValue(initialValue), [initialValue]);

  return (
    <CellComponent verticalAlign="center">
      <EditableInput
        aria-label={`${cell.column.id}, row ${cell.row.index + 1}`}
        onBlur={() =>
          cell.table.options.meta?.updateData(
            cell.row.index,
            cell.column.id,
            value
          )
        }
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
    </CellComponent>
  );
}

const columns: ColumnDef<Person>[] = [
  { accessorKey: "firstName", header: "First Name" },
  { accessorKey: "lastName", header: "Last Name" },
  { accessorKey: "age", header: "Age" },
  { accessorKey: "visits", header: "Visits" },
  { accessorKey: "status", header: "Status" },
];

function App() {
  const [data, setData] = React.useState(() => makeData(3));
  const [log, setLog] = React.useState<string[]>([]);

  const table = useReactTable({
    columns,
    data,
    // Every column without its own cell renderer gets the editor.
    defaultColumn: { cell: CellEditor },
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((rows) =>
          rows.map((row, index) => {
            if (index !== rowIndex) return row;

            const previous = String(row[columnId as keyof Person]);
            if (previous === value) return row;

            setLog((entries) => [
              `row ${rowIndex + 1}, ${columnId}: "${previous}" → "${value}"`,
              ...entries,
            ]);

            return { ...row, [columnId]: value };
          })
        );
      },
    },
  });

  return (
    <div className="app">
      <Table>
        <TableHeader>
          {table.getFlatHeaders().map((header) => (
            <CellHeader hideSortIcon key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </CellHeader>
          ))}
        </TableHeader>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} shouldShowTooltipOnHover={false}>
              {row.getVisibleCells().map((cell) => (
                <React.Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Toolbar>
        <Button
          onClick={() => {
            setData(makeData(3));
            setLog([]);
          }}
          sdsStyle="solid"
          sdsType="primary"
          startIcon={<Icon sdsIcon="Refresh" sdsSize="s" />}
        >
          Replace the data
        </Button>
      </Toolbar>

      <Log>
        <LogTitle>Changes written back to the data</LogTitle>
        <LogBody>
          {log.length ? log.join("\n") : "Edit a cell, then click outside it."}
        </LogBody>
      </Log>
    </div>
  );
}

export default App;
