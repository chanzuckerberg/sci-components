// The FixedWidth story: tableWidth pins the table to 600px instead of filling
// its container. The columns need more room than that, so the table scrolls
// sideways and the pinned Name and Actions columns hold their edges, each
// drawing a gradient once there is something hidden behind it.
//
// A column left as a plain accessor is drawn as a CellHeader and a CellBasic.
// A renderer of your own is handed the element and the width to draw with as
// `as` and `style`, and forwards both. Without `as` it renders a second <td>
// inside the one the table already drew. A header renderer is handed
// `data-pinned-edge` too, which is what tells a pinned header to draw its
// gradient.
//
// data, columns and paginationConfig sit outside the component so their
// identity is stable: a new paginationConfig object sends the table back to its
// first page.

import {
  Button,
  CellBasic,
  CellComponent,
  CellHeader,
  Icon,
  PreComposedTable,
  Tag,
} from "@czi-sds/components";
import type {
  CellContext,
  ColumnDef,
  HeaderContext,
} from "@tanstack/react-table";
import * as React from "react";

type Employee = {
  department: string;
  email: string;
  lastActive: string;
  location: string;
  name: string;
  projects: number;
  role: string;
  salary: number;
  startDate: string;
  status: "Active" | "Inactive";
};

const DATA: Employee[] = [
  {
    department: "Engineering",
    email: "john.doe@example.com",
    lastActive: "2024-01-15",
    location: "San Francisco",
    name: "John Doe",
    projects: 5,
    role: "Software Engineer",
    salary: 85000,
    startDate: "2022-03-15",
    status: "Active",
  },
  {
    department: "Product",
    email: "jane.smith@example.com",
    lastActive: "2024-01-14",
    location: "New York",
    name: "Jane Smith",
    projects: 3,
    role: "Product Manager",
    salary: 95000,
    startDate: "2021-08-20",
    status: "Active",
  },
  {
    department: "Design",
    email: "bob.johnson@example.com",
    lastActive: "2024-01-10",
    location: "Austin",
    name: "Bob Johnson",
    projects: 2,
    role: "Designer",
    salary: 75000,
    startDate: "2023-01-10",
    status: "Inactive",
  },
  {
    department: "Data",
    email: "alice.brown@example.com",
    lastActive: "2024-01-16",
    location: "Seattle",
    name: "Alice Brown",
    projects: 7,
    role: "Data Scientist",
    salary: 90000,
    startDate: "2022-11-05",
    status: "Active",
  },
  {
    department: "Engineering",
    email: "charlie.wilson@example.com",
    lastActive: "2024-01-15",
    location: "Remote",
    name: "Charlie Wilson",
    projects: 4,
    role: "DevOps Engineer",
    salary: 88000,
    startDate: "2023-06-12",
    status: "Active",
  },
];

/** The cell context, plus how PreComposedTable wants the cell drawn. */
type CellProps = CellContext<Employee, unknown> & {
  as?: React.ElementType;
  style?: React.CSSProperties;
};

/** The header context, plus which edge a pinned header sits against. */
type HeaderProps = HeaderContext<Employee, unknown> & {
  "data-pinned-edge"?: "left" | "right";
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

function numberCell({ as, column, getValue, style }: CellProps) {
  return (
    <CellBasic
      as={as}
      // Room for the sort chevron, which would otherwise sit on the number.
      extraRightPadding={column.getCanSort() ? 20 : 0}
      horizontalAlign="right"
      primaryText={String(getValue())}
      shouldShowTooltipOnHover={false}
      style={style}
      tabularNums
    />
  );
}

const COLUMNS: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    cell: ({ as, getValue, row, style }: CellProps) => (
      <CellBasic
        as={as}
        link={`mailto:${row.original.email}`}
        linkComponent="a"
        linkProps={{ target: "_blank" }}
        primaryText={getValue() as string}
        secondaryText={row.original.role}
        shouldShowTooltipOnHover={false}
        shouldShowUnderlineOnHover
        style={style}
      />
    ),
    enableSorting: false,
    header: ({ "data-pinned-edge": pinnedEdge, style }: HeaderProps) => (
      <CellHeader
        data-pinned-edge={pinnedEdge}
        hideSortIcon
        hover
        shouldShowTooltipOnHover
        style={style}
        tooltipProps={{ placement: "top", textAlign: "left", width: "wide" }}
        tooltipSubtitle="Each name links to the person's email address."
        tooltipText="Name"
      >
        Name
      </CellHeader>
    ),
    meta: { isGrow: true, pinning: "left" },
    minSize: 150,
  },
  {
    accessorKey: "email",
    cell: ({ as, getValue, style }: CellProps) => (
      <CellBasic
        as={as}
        link={`mailto:${getValue() as string}`}
        linkProps={{ target: "_blank" }}
        primaryText={getValue() as string}
        primaryTextWrapLineCount={1}
        shouldShowTooltipOnHover={false}
        shouldShowUnderlineOnHover
        style={style}
      />
    ),
    header: "Email",
    meta: { isGrow: true },
    minSize: 200,
  },
  {
    accessorKey: "role",
    cell: textCell,
    header: "Role",
    meta: { verticalAlign: "middle" },
    minSize: 150,
  },
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
    header: "Status",
    minSize: 100,
  },
  {
    accessorKey: "lastActive",
    cell: numberCell,
    header: "Last Active",
    meta: { headerCellProps: { horizontalAlign: "right" } },
    minSize: 120,
  },
  {
    accessorKey: "projects",
    cell: numberCell,
    header: "Projects",
    meta: { headerCellProps: { horizontalAlign: "right" } },
    minSize: 100,
  },
  {
    accessorKey: "salary",
    cell: ({ as, column, getValue, style }: CellProps) => (
      <CellBasic
        as={as}
        extraRightPadding={column.getCanSort() ? 20 : 0}
        horizontalAlign="right"
        primaryText={`$${(getValue() as number).toLocaleString()}`}
        shouldShowTooltipOnHover={false}
        style={style}
        tabularNums
      />
    ),
    header: "Salary",
    meta: { headerCellProps: { horizontalAlign: "right" } },
    minSize: 120,
  },
  {
    accessorKey: "location",
    cell: textCell,
    header: "Location",
    minSize: 150,
  },
  {
    accessorKey: "startDate",
    cell: numberCell,
    header: "Start Date",
    meta: { headerCellProps: { horizontalAlign: "right" } },
    minSize: 120,
  },
  {
    cell: ({ as, row, style }: CellProps) => (
      <CellComponent as={as} horizontalAlign="right" style={style}>
        <Button
          aria-label={`Edit ${row.original.name}`}
          onClick={() => console.log("Edit", row.original)}
          sdsStyle="minimal"
          sdsType="secondary"
        >
          <Icon sdsIcon="Edit" sdsSize="s" />
        </Button>
        <Button
          aria-label={`Download ${row.original.name}`}
          onClick={() => console.log("Download", row.original)}
          sdsStyle="minimal"
          sdsType="secondary"
        >
          <Icon sdsIcon="Download" sdsSize="s" />
        </Button>
      </CellComponent>
    ),
    enableSorting: false,
    header: "Actions",
    id: "actions",
    meta: {
      headerCellProps: { horizontalAlign: "right" },
      pinning: "right",
      verticalAlign: "middle",
    },
    size: 100,
  },
];

const PAGINATION = { pageSize: 10 };

function App() {
  return (
    <div className="app">
      <PreComposedTable<Employee>
        columns={COLUMNS}
        data={DATA}
        enablePagination
        enableRowSelection
        enableSorting
        paginationConfig={PAGINATION}
        tableWidth="600px"
      />
    </div>
  );
}

export default App;
