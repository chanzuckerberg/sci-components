import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// The WithSelectiveColumnFiltering story: enableColumnFiltering adds a filter
// row under the header, but not every column has to take part in it.
//
// Status replaces its search input with a Dropdown through
// meta.filterComponent, and because that writes a whole status rather than
// something to search for, the column matches with a filterFn of equalsString.
// Salary and Start Date opt out altogether with enableColumnFilter: false,
// which leaves their filter cells empty.
//
// filterComponent is called as a plain function rather than mounted as a
// component, so keep state out of it and read the current value back from
// column.getFilterValue().

import {
  CellBasic,
  CellComponent,
  Dropdown,
  PreComposedTable,
  Tag,
} from "@czi-sds/components";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import * as React from "react";

type Employee = {
  department: string;
  email: string;
  name: string;
  role: string;
  salary: number;
  startDate: string;
  status: "Active" | "Inactive";
};

const DATA: Employee[] = [
  {
    department: "Engineering",
    email: "john.doe@example.com",
    name: "John Doe",
    role: "Software Engineer",
    salary: 85000,
    startDate: "2022-03-15",
    status: "Active",
  },
  {
    department: "Product",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    role: "Product Manager",
    salary: 95000,
    startDate: "2021-08-20",
    status: "Active",
  },
  {
    department: "Design",
    email: "bob.johnson@example.com",
    name: "Bob Johnson",
    role: "Designer",
    salary: 75000,
    startDate: "2023-01-10",
    status: "Inactive",
  },
  {
    department: "Data",
    email: "alice.brown@example.com",
    name: "Alice Brown",
    role: "Data Scientist",
    salary: 90000,
    startDate: "2022-11-05",
    status: "Active",
  },
  {
    department: "Engineering",
    email: "charlie.wilson@example.com",
    name: "Charlie Wilson",
    role: "DevOps Engineer",
    salary: 88000,
    startDate: "2023-06-12",
    status: "Active",
  },
];

const STATUS_OPTIONS = [
  { name: "All" },
  { name: "Active" },
  { name: "Inactive" },
];

/** The cell context, plus how PreComposedTable wants the cell drawn. */
type CellProps = CellContext<Employee, unknown> & {
  as?: React.ElementType;
  style?: React.CSSProperties;
};

function textCell({ as, getValue, style }: CellProps) {
  return (
    <CellBasic
      as={as}
      primaryText={String(getValue())}
      shouldShowTooltipOnHover={false}
      style={style}
    />
  );
}

const COLUMNS: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    cell: textCell,
    header: "Name",
    meta: { isGrow: true, pinning: "left" },
    minSize: 150,
  },
  {
    accessorKey: "email",
    cell: textCell,
    header: "Email",
    meta: { isGrow: true },
    minSize: 200,
  },
  { accessorKey: "role", cell: textCell, header: "Role", minSize: 150 },
  {
    accessorKey: "department",
    cell: textCell,
    header: "Department",
    minSize: 120,
  },
  {
    accessorKey: "status",
    cell: ({ as, getValue, style }: CellProps) => (
      <CellComponent as={as} style={style}>
        <Tag
          color={getValue() === "Active" ? "positive" : "negative"}
          hover={false}
          label={getValue() as string}
          sdsStyle="rounded"
          sdsType="secondary"
        />
      </CellComponent>
    ),
    filterFn: "equalsString",
    header: "Status",
    meta: {
      filterComponent: ({ column }) => (
        <Dropdown<{ name: string }, false, false, false>
          InputDropdownProps={{ width: "100%" }}
          label="Status"
          onChange={(_event, value) =>
            column.setFilterValue(
              !value || value.name === "All" ? undefined : value.name
            )
          }
          options={STATUS_OPTIONS}
        />
      ),
    },
    minSize: 140,
  },
  {
    accessorKey: "salary",
    cell: ({ as, column, getValue, style }: CellProps) => (
      <CellBasic
        as={as}
        extraRightPadding={column.getCanSort() ? 20 : 0}
        horizontalAlign="right"
        primaryText={\`$\${(getValue() as number).toLocaleString()}\`}
        shouldShowTooltipOnHover={false}
        style={style}
        tabularNums
      />
    ),
    enableColumnFilter: false,
    header: "Salary",
    meta: { headerCellProps: { horizontalAlign: "right" } },
    minSize: 120,
  },
  {
    accessorKey: "startDate",
    cell: ({ as, column, getValue, style }: CellProps) => (
      <CellBasic
        as={as}
        extraRightPadding={column.getCanSort() ? 20 : 0}
        horizontalAlign="right"
        primaryText={String(getValue())}
        shouldShowTooltipOnHover={false}
        style={style}
        tabularNums
      />
    ),
    enableColumnFilter: false,
    header: "Start Date",
    meta: {
      headerCellProps: { horizontalAlign: "right" },
      pinning: "right",
    },
    minSize: 120,
  },
];

function App() {
  return (
    <div className="app">
      <PreComposedTable<Employee>
        columns={COLUMNS}
        data={DATA}
        enableColumnFiltering
        enableRowSelection
        enableSorting
      />
    </div>
  );
}

export default App;
`}))();export{t as default};