import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`import * as React from "react";
import {
  CellBasic,
  CellHeader,
  TableHeader,
  TableRow,
  Table,
} from "@czi-sds/components";

import {
  CellContext,
  HeaderContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  birthdate: string;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "Tanner",
    lastName: "Linsley",
    age: 24,
    birthdate: "26 October 1997",
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "Tandy",
    lastName: "Miller",
    age: 40,
    birthdate: "14 July 1982",
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    birthdate: "25 February 1977",
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

function createHeaderCell(
  header: HeaderContext<Person, unknown>,
  name: string
) {
  return (
    <CellHeader
      hideSortIcon
      horizontalAlign={header.header.id === "progress" ? "right" : "left"}
    >
      {header.header.isPlaceholder ? "" : name}
    </CellHeader>
  );
}

function createBodyCell(cell: CellContext<Person, unknown>) {
  return (
    <CellBasic
      primaryText={cell.getValue() as string}
      shouldShowTooltipOnHover={false}
    />
  );
}

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (cell) => createBodyCell(cell),
    header: (header) => createHeaderCell(header, "First Name"),
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (cell) => createBodyCell(cell),
    header: (header) => createHeaderCell(header, "Last Name"),
  }),
  columnHelper.accessor("age", {
    cell: (cell) => (
      <CellBasic
        key={cell.cell.id}
        primaryText={cell.getValue().toString()}
        secondaryText={cell.row.original.birthdate}
        shouldShowTooltipOnHover={false}
      />
    ),
    header: (header) => createHeaderCell(header, "Age"),
  }),
  columnHelper.accessor("visits", {
    cell: (cell) => createBodyCell(cell),
    header: (header) => createHeaderCell(header, "Visits"),
  }),
  columnHelper.accessor("status", {
    cell: (cell) => createBodyCell(cell),
    header: (header) => createHeaderCell(header, "Status"),
  }),
  columnHelper.accessor("progress", {
    cell: (cell) => (
      <CellBasic
        key={cell.cell.id}
        primaryText={cell.getValue().toString()}
        secondaryText={\`\${cell.getValue()} ± 5%\`}
        shouldShowTooltipOnHover={false}
        horizontalAlign="right"
      />
    ),
    header: (header) => createHeaderCell(header, "Profile Progress"),
  }),
];

function App() {
  const [data] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
`}))();export{t as default};