// Sorting is TanStack Table's job, not the Table component's: the header cell only
// draws the state it is handed. active turns on the accent styling, direction picks
// the chevron, and onClick is wired to the column's own toggle handler.
//
// CellHeader draws its sort icon and its tooltip only while hover is true, so every
// sortable header below sets it. Without it the header sorts on click but never
// shows a chevron.
//
// The Last Name column sorts by string length instead of alphabetically, which is
// all a custom sortingFn is: a comparator handed to the column.

import {
  Button,
  CellBasic,
  CellComponent,
  CellHeader,
  Icon,
  Table,
  TableHeader,
  TableRow,
  Tag,
  getSpaces,
  type CellHeaderDirection,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { faker } from "@faker-js/faker";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type CellContext,
  type ColumnDef,
  type HeaderContext,
  type Row,
  type SortingState,
} from "@tanstack/react-table";
import * as React from "react";

type Person = {
  age: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  status: "relationship" | "complicated" | "single";
};

const STATUSES: Person["status"][] = ["relationship", "complicated", "single"];

const STATUS_COLORS = {
  complicated: "negative",
  relationship: "positive",
  single: "notice",
} as const;

function makeData(count: number): Person[] {
  return Array.from({ length: count }, () => ({
    age: faker.number.int({ max: 96, min: 18 }),
    createdAt: faker.date.between({
      from: new Date("2001-01-01"),
      to: new Date(),
    }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    status: faker.helpers.shuffle(STATUSES)[0]!,
  }));
}

const ActionList = styled.ul<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      gap: ${spaces?.xxs}px;
      justify-content: flex-end;
      list-style: none;
      margin: 0;
      padding: 0;
    `;
  }}
`;

const ACTIONS = [
  { icon: "TreeHorizontal", label: "View lineage" },
  { icon: "BarChartVertical3", label: "View chart" },
  { icon: "Download", label: "Download" },
  { icon: "DotsHorizontal", label: "More actions" },
] as const;

function sortableHeader(header: HeaderContext<Person, unknown>, name: string) {
  const sorted = header.column.getIsSorted();

  return (
    <CellHeader
      active={!!sorted}
      colSpan={header.header.colSpan}
      direction={sorted ? (sorted as CellHeaderDirection) : undefined}
      hover
      onClick={header.column.getToggleSortingHandler()}
    >
      {name}
    </CellHeader>
  );
}

function textCell(cell: CellContext<Person, unknown>) {
  return (
    <CellBasic
      primaryText={String(cell.getValue())}
      shouldShowTooltipOnHover={false}
      verticalAlign="center"
    />
  );
}

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "firstName",
    cell: (cell) => (
      <CellBasic
        icon={<Icon sdsIcon="Person" sdsSize="s" />}
        iconVerticalAlign="center"
        primaryText={cell.getValue() as string}
        shouldShowTooltipOnHover={false}
        verticalAlign="center"
      />
    ),
    header: (header) => sortableHeader(header, "First Name"),
  },
  {
    accessorKey: "lastName",
    cell: textCell,
    header: (header) => {
      const sorted = header.column.getIsSorted();

      return (
        <CellHeader
          active={!!sorted}
          colSpan={header.header.colSpan}
          direction={sorted ? (sorted as CellHeaderDirection) : undefined}
          hover
          onClick={header.column.getToggleSortingHandler()}
          shouldShowTooltipOnHover
          tooltipText="This column uses a custom sorting function."
          tooltipSubtitle="Sorts names by how long they are."
        >
          Last Name
        </CellHeader>
      );
    },
    sortingFn: (rowA: Row<Person>, rowB: Row<Person>, columnId: string) => {
      const a = rowA.getValue<string>(columnId).length;
      const b = rowB.getValue<string>(columnId).length;

      return a === b ? 0 : a > b ? 1 : -1;
    },
  },
  {
    accessorKey: "age",
    cell: textCell,
    header: (header) => sortableHeader(header, "Age"),
  },
  {
    accessorKey: "status",
    cell: (cell) => {
      const status = cell.getValue() as Person["status"];

      return (
        <CellComponent verticalAlign="center">
          <Tag
            color={STATUS_COLORS[status]}
            hover={false}
            label={status}
            sdsStyle="rounded"
            sdsType="secondary"
          />
        </CellComponent>
      );
    },
    header: (header) => sortableHeader(header, "Status"),
  },
  {
    accessorKey: "createdAt",
    cell: (cell) => {
      const createdAt = cell.getValue() as Date;

      return (
        <CellBasic
          primaryText={createdAt.getFullYear().toString()}
          secondaryText={createdAt.toLocaleString("en-us", {
            day: "numeric",
            month: "long",
          })}
          tooltipProps={{ title: createdAt.toLocaleString("en-us") }}
          verticalAlign="center"
        />
      );
    },
    header: (header) => sortableHeader(header, "Created At"),
  },
  {
    accessorKey: "actions",
    cell: () => (
      <CellComponent horizontalAlign="right" verticalAlign="center">
        <ActionList>
          {ACTIONS.map((action) => (
            <li key={action.icon}>
              <Button
                aria-label={action.label}
                sdsStyle="minimal"
                sdsType="secondary"
              >
                <Icon sdsIcon={action.icon} sdsSize="s" />
              </Button>
            </li>
          ))}
        </ActionList>
      </CellComponent>
    ),
    enableSorting: false,
    header: () => (
      <CellHeader hideSortIcon horizontalAlign="right">
        Actions
      </CellHeader>
    ),
    id: "actions",
  },
];

function App() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [data] = React.useState(() => makeData(10));

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <div className="app">
      <Table>
        <TableHeader>
          {table.getFlatHeaders().map((header) => (
            <React.Fragment key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </React.Fragment>
          ))}
        </TableHeader>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <React.Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
