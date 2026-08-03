# PreComposedTable

This component is a fully-featured, composable table built on top of TanStack Table with built-in support for sorting, pagination, row selection, filtering, column pinning, and responsive sizing

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/PreComposedTable/index.tsx).

## Import

**React TypeScript**

```tsx
import { PreComposedTable } from "@czi-sds/components";
```

## Code examples

**Note:** PreComposedTable runs on [TanStack Table](https://tanstack.com/table/latest), which SDS takes as a peer dependency. Install `@tanstack/react-table` alongside it. Column definitions are TanStack's own, so anything its docs describe applies here too.

### Default

Data, columns, and the features you want switched on (here sorting, row selection and pagination), with Name pinned to the left edge and Actions to the right. A column left as a plain accessor is drawn as a CellHeader and a CellBasic, while the cells that render something else forward the element and width they are handed. Note that `data`, `columns` and `paginationConfig` sit outside the component so their identity is stable: a new `paginationConfig` object sends the table back to its first page.

**Example: DefaultPreComposedTable**

```tsx
// The Default story: sorting, row selection and pagination switched on over the
// full column set, with Name pinned to the left edge and Actions to the right.
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
        primaryText={`${(getValue() as number).toLocaleString()}`}
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
      />
    </div>
  );
}

export default App;
```

### With global filtering

`enableGlobalFiltering` puts a search input above the table that matches across every column at once. The table holds the search term itself, so there is nothing to wire up.

**Example: PreComposedTableWithGlobalFiltering**

```tsx
// The WithGlobalFiltering story: enableGlobalFiltering puts a search input
// above the table that matches across every column at once. The table holds the
// search term itself, so there is nothing to wire up, and sorting and selection
// keep working on whatever rows are left.
//
// A column left as a plain accessor is drawn as a CellHeader and a CellBasic.
// A renderer of your own is handed the element and the width to draw with as
// `as` and `style`, and forwards both. Without `as` it renders a second <td>
// inside the one the table already drew. A header renderer is handed
// `data-pinned-edge` too, which is what tells a pinned header to draw its
// gradient.
//
// data and columns sit outside the component so their identity is stable.

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
        primaryText={`${(getValue() as number).toLocaleString()}`}
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

function App() {
  return (
    <div className="app">
      <PreComposedTable<Employee>
        columns={COLUMNS}
        data={DATA}
        enableGlobalFiltering
        enableRowSelection
        enableSorting
      />
    </div>
  );
}

export default App;
```

### With pagination

The same table paged three rows at a time. `paginationConfig` takes Pagination's own props, so `pageSize` sets the size of every page and `placement` moves the controls, which sit on the right by default.

**Example: PreComposedTableWithPagination**

```tsx
// The WithPagination story: the same table paged three rows at a time.
// paginationConfig takes the Pagination component's own props, so pageSize sets
// both the initial page size and the size of every page after it, and
// placement moves the controls, which sit on the right by default.
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
        primaryText={`${(getValue() as number).toLocaleString()}`}
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

const PAGINATION = { pageSize: 3 };

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
      />
    </div>
  );
}

export default App;
```

### Fixed width

`tableWidth` pins the table to 600px rather than letting it fill its container. The columns need more room than that, so the table scrolls sideways while the pinned Name and Actions columns hold their edges.

**Example: PreComposedTableFixedWidth**

```tsx
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
        primaryText={`${(getValue() as number).toLocaleString()}`}
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
```

### With column filtering

`enableColumnFiltering` adds a row of search inputs under the header, one per column. The filters are held above the table here rather than inside it: `state.columnFilters` and `onColumnFiltersChange` passed through `tableOptions` override the state the component keeps, which is what makes them yours to read, persist or reset.

**Example: PreComposedTableWithColumnFiltering**

```tsx
// The WithColumnFiltering story: enableColumnFiltering adds a row of search
// inputs under the header, one per column.
//
// The filter state is held above the table here rather than inside it. A state
// you pass through tableOptions overrides the one the component keeps, so
// state.columnFilters plus onColumnFiltersChange hands you the filters to read,
// persist or reset from your own code. TanStack sends change handlers an
// updater that is either the next value or a function of the current one, so
// resolve it against your state rather than storing it directly.
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
  ColumnFiltersState,
  HeaderContext,
  Updater,
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
        primaryText={`${(getValue() as number).toLocaleString()}`}
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

function App() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const tableOptions = React.useMemo(
    () => ({
      onColumnFiltersChange: (updater: Updater<ColumnFiltersState>) =>
        setColumnFilters((current) =>
          typeof updater === "function" ? updater(current) : updater
        ),
      state: { columnFilters },
    }),
    [columnFilters]
  );

  return (
    <div className="app">
      <PreComposedTable<Employee>
        columns={COLUMNS}
        data={DATA}
        enableColumnFiltering
        enableSorting
        tableOptions={tableOptions}
      />
    </div>
  );
}

export default App;
```

### With selective column filtering

Not every column has to take part in the filter row. Status replaces its input with a Dropdown through `meta.filterComponent` and matches on equality rather than the default substring search, while Salary and Start Date opt out altogether with `enableColumnFilter: false`.

**Example: PreComposedTableWithSelectiveColumnFiltering**

```tsx
// The WithSelectiveColumnFiltering story: enableColumnFiltering adds a filter
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
        primaryText={`${(getValue() as number).toLocaleString()}`}
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
```

### With custom column filters

Every filter here is a component of its own: a Dropdown for Status, and a pair of number inputs for Salary and Projects matched with TanStack's `inNumberRange` filter. A filter component is called rather than mounted, so it holds no state of its own: it reads `column.getFilterValue()` and writes `column.setFilterValue()`.

**Example: PreComposedTableWithCustomColumnFilters**

```tsx
// The WithCustomColumnFilters story: every filter in this table is a component
// of its own, supplied through meta.filterComponent. Status filters through a
// Dropdown against a filterFn of equalsString, while Salary and Projects use a
// pair of number inputs against inNumberRange, which expects a [min, max] pair.
//
// A filter component is called as a plain function rather than mounted, so it
// holds no state: it reads the current value from column.getFilterValue() and
// writes the next one with column.setFilterValue(), which is also what lets
// something outside the table (a Clear filters button, say) reset it.

import {
  CellBasic,
  CellComponent,
  Dropdown,
  InputText,
  PreComposedTable,
  Tag,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import type { CellContext, Column, ColumnDef } from "@tanstack/react-table";
import * as React from "react";

type Employee = {
  name: string;
  projects: number;
  role: string;
  salary: number;
  status: "Active" | "Inactive";
};

const DATA: Employee[] = [
  {
    name: "John Doe",
    projects: 5,
    role: "Software Engineer",
    salary: 85000,
    status: "Active",
  },
  {
    name: "Jane Smith",
    projects: 3,
    role: "Product Manager",
    salary: 95000,
    status: "Active",
  },
  {
    name: "Bob Johnson",
    projects: 2,
    role: "Designer",
    salary: 75000,
    status: "Inactive",
  },
  {
    name: "Alice Brown",
    projects: 7,
    role: "Data Scientist",
    salary: 90000,
    status: "Active",
  },
  {
    name: "Charlie Wilson",
    projects: 4,
    role: "DevOps Engineer",
    salary: 88000,
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

const RangeInputs = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      align-items: center;
      display: flex;
      gap: ${spaces?.xxs}px;
    `;
  }}
`;

function NumberRangeFilter({ column }: { column: Column<Employee, unknown> }) {
  const [min, max] = (column.getFilterValue() as [number?, number?]) ?? [];

  const setBound = (index: 0 | 1, value: string) =>
    column.setFilterValue((old: [number?, number?] = []) => {
      const next: [number?, number?] = [old[0], old[1]];
      next[index] = value ? Number(value) : undefined;
      return next;
    });

  return (
    <RangeInputs>
      <InputText
        hideLabel
        id={`${column.id}-min`}
        label="Min"
        onChange={(event) => setBound(0, event.target.value)}
        placeholder="Min"
        sdsType="textField"
        size="small"
        type="number"
        value={min ?? ""}
      />
      <span>—</span>
      <InputText
        hideLabel
        id={`${column.id}-max`}
        label="Max"
        onChange={(event) => setBound(1, event.target.value)}
        placeholder="Max"
        sdsType="textField"
        size="small"
        type="number"
        value={max ?? ""}
      />
    </RangeInputs>
  );
}

function numberCell({ as, column, getValue, style }: CellProps) {
  return (
    <CellBasic
      as={as}
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
    cell: ({ as, getValue, style }: CellProps) => (
      <CellBasic
        as={as}
        primaryText={getValue() as string}
        shouldShowTooltipOnHover={false}
        style={style}
      />
    ),
    header: "Name",
    meta: { isGrow: true, pinning: "left" },
    minSize: 150,
  },
  {
    accessorKey: "role",
    cell: ({ as, getValue, style }: CellProps) => (
      <CellBasic
        as={as}
        primaryText={getValue() as string}
        shouldShowTooltipOnHover={false}
        style={style}
      />
    ),
    header: "Role",
    minSize: 150,
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
        primaryText={`${(getValue() as number).toLocaleString()}`}
        shouldShowTooltipOnHover={false}
        style={style}
        tabularNums
      />
    ),
    filterFn: "inNumberRange",
    header: "Salary",
    meta: {
      filterComponent: NumberRangeFilter,
      headerCellProps: { horizontalAlign: "right" },
    },
    minSize: 180,
  },
  {
    accessorKey: "projects",
    cell: numberCell,
    filterFn: "inNumberRange",
    header: "Projects",
    meta: {
      filterComponent: NumberRangeFilter,
      headerCellProps: { horizontalAlign: "right" },
    },
    minSize: 180,
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
```

### With table actions

The ref exposes the TanStack table as `ref.current.table`, which covers what the props do not: clearing filters, selecting rows from outside the table, paging programmatically. It is an imperative handle rather than state, so the toolbar calls into it from its click handlers.

**Example: PreComposedTableWithTableActions**

```tsx
// The WithTableActions story: the ref exposes the underlying TanStack table as
// ref.current.table, which is the escape hatch for everything the props do not
// cover: clearing filters, selecting rows from outside the table, paging
// programmatically, reading the filtered rows back out.
//
// It is an imperative handle rather than state, so reading from it during
// render tells you nothing useful; call into it from an event handler, as the
// toolbar does.
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
  getSpaces,
  type CommonThemeProps,
  type PreComposedTableRef,
} from "@czi-sds/components";
import styled from "@emotion/styled";
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
        primaryText={`${(getValue() as number).toLocaleString()}`}
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

const PAGINATION = { pageSize: 5 };

const Toolbar = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.xs}px;
      margin-bottom: ${spaces?.l}px;
    `;
  }}
`;

function App() {
  const tableRef = React.useRef<PreComposedTableRef<Employee>>(null);

  return (
    <div className="app">
      <Toolbar>
        <Button
          onClick={() => tableRef.current?.table.resetColumnFilters()}
          sdsStyle="outline"
          sdsType="primary"
        >
          Clear all filters
        </Button>
        <Button
          onClick={() => tableRef.current?.table.resetSorting()}
          sdsStyle="outline"
          sdsType="primary"
        >
          Reset sorting
        </Button>
        <Button
          onClick={() => tableRef.current?.table.toggleAllRowsSelected(true)}
          sdsStyle="outline"
          sdsType="primary"
        >
          Select all rows
        </Button>
        <Button
          onClick={() => tableRef.current?.table.toggleAllRowsSelected(false)}
          sdsStyle="outline"
          sdsType="primary"
        >
          Deselect all rows
        </Button>
        <Button
          onClick={() => {
            tableRef.current?.table.resetColumnFilters();
            tableRef.current?.table.resetSorting();
            tableRef.current?.table.toggleAllRowsSelected(false);
          }}
          sdsStyle="outline"
          sdsType="secondary"
        >
          Reset everything
        </Button>
      </Toolbar>

      <PreComposedTable<Employee>
        columns={COLUMNS}
        data={DATA}
        enableColumnFiltering
        enablePagination
        enableRowSelection
        enableSorting
        paginationConfig={PAGINATION}
        ref={tableRef}
      />
    </div>
  );
}

export default App;
```

### With table options

`tableOptions` is merged into the underlying TanStack table's options, so anything `useReactTable` accepts can be set through it. This one passes `autoResetPageIndex: false`, so filtering leaves you on the page you were reading instead of returning you to the first.

**Example: PreComposedTableWithTableOptions**

```tsx
// The WithTableOptions story: tableOptions is merged into the underlying
// TanStack table's options, so anything useReactTable accepts can be set here:
// meta, filter functions, debugTable, and the rest.
//
// This one sets autoResetPageIndex: false, so filtering the table leaves you on
// the page you were reading instead of sending you back to the first one.
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
        primaryText={`${(getValue() as number).toLocaleString()}`}
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

const PAGINATION = { pageSize: 3 };

const TABLE_OPTIONS = { autoResetPageIndex: false };

function App() {
  return (
    <div className="app">
      <PreComposedTable<Employee>
        columns={COLUMNS}
        data={DATA}
        enableColumnFiltering
        enablePagination
        enableRowSelection
        enableSorting
        paginationConfig={PAGINATION}
        tableOptions={TABLE_OPTIONS}
      />
    </div>
  );
}

export default App;
```

## Props

PreComposedTable is generic over your row type, so `data` and `columns` are typed together. It owns the table state (sorting, selection, filtering, pagination, pinning), and every feature is off unless you switch it on.

| Name                       | Type                                                                           | Default   | Description                                                                                                                                                                                                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                     | `TData[]`                                                                      | -         | Array of data objects to display in the table rows                                                                                                                                                                                                                                  |
| `columns`                  | `ColumnDef<TData>[]`                                                           | -         | Column definitions that specify how data should be rendered and behave                                                                                                                                                                                                              |
| `border`                   | `boolean`                                                                      | `true`    | Draws the border around the scrolling table area                                                                                                                                                                                                                                    |
| `sdsStyle`                 | `"lined"` \| `"striped"`                                                       | `"lined"` | Whether rows are separated by dividers or by alternating backgrounds                                                                                                                                                                                                                |
| `enableSorting`            | `boolean`                                                                      | `false`   | Makes column headers sortable, wiring each one's chevron and click handler for you                                                                                                                                                                                                  |
| `enableRowSelection`       | `boolean`                                                                      | `false`   | Adds a checkbox column with select-all. To control that column yourself, include one with the `id` `"SdsTableSelectColumn"` and it will be used instead of the generated one                                                                                                        |
| `enableColumnFiltering`    | `boolean`                                                                      | `false`   | Adds a filter row under the header. Each column gets a search input unless its `meta` supplies a `filterComponent`                                                                                                                                                                  |
| `shouldPinSelectRowToLeft` | `boolean`                                                                      | `true`    | Pins the row selection column to the left/right side of the table                                                                                                                                                                                                                   |
| `enablePagination`         | `boolean`                                                                      | `false`   | Enables pagination controls at the bottom of the table                                                                                                                                                                                                                              |
| `enableGlobalFiltering`    | `boolean`                                                                      | `false`   | Displays a search input that filters across all columns                                                                                                                                                                                                                             |
| `paginationConfig`         | `Partial<PaginationProps> & { placement?: "left" \| "center" \| "right" }`     | -         | Passed through to Pagination, plus a placement for the controls, which sit on the right by default. `pageSize` also sets the initial page size, which is `10` otherwise. Changing this object resets the table to the first page                                                    |
| `className`                | `string`                                                                       | -         | CSS class name to apply to the table container                                                                                                                                                                                                                                      |
| `style`                    | `React.CSSProperties`                                                          | -         | Inline styles to apply to the table container                                                                                                                                                                                                                                       |
| `tableWidth`               | `string`                                                                       | `100%`    | Sets the width of the table container                                                                                                                                                                                                                                               |
| `tableRowProps`            | `Partial<TableRowProps>`                                                       | -         | Additional props to pass to each table row component                                                                                                                                                                                                                                |
| `onRowSelect`              | `(selectedRows: TData[]) => void`                                              | -         | Callback triggered when row selection changes; receives array of selected row data                                                                                                                                                                                                  |
| `tableOptions`             | `Partial<Omit<TableOptions<TData>, "data" \| "columns" \| "getCoreRowModel">>` | -         | Escape hatch to the underlying TanStack table. Anything here is merged into its options, and a state you supply overrides the one the component keeps, which is how you drive sorting or pagination from outside. The row models and change handlers are always the component's own |

The component also takes a ref, which exposes the TanStack table instance as `ref.current.table` for anything the props do not cover.

## Column meta

Layout and pinning are set per column through the standard TanStack column definition's `meta` field, which SDS extends with the following. Everything else in a column definition (`accessorKey`, `header`, `cell`, `enableSorting`, `size`, `minSize`, `maxSize`, `filterFn`) behaves as TanStack documents it, and a header or cell given as a plain string is rendered as a CellHeader or CellBasic for you.

| Name              | Type                                                                         | Default | Description                                                                                                                           |
| ----------------- | ---------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `pinning`         | `"left"` \| `"right"`                                                        | -       | Sticks the column to that edge while the table scrolls sideways, with a gradient at the edge once there is something hidden behind it |
| `verticalAlign`   | `"top"` \| `"middle"` \| `"bottom"`                                          | -       | Vertical alignment of the column's cells                                                                                              |
| `widthPercentage` | `number`                                                                     | -       | The column's share of the table width, as a percentage rather than a fixed size                                                       |
| `isGrow`          | `boolean`                                                                    | -       | Lets this column absorb whatever width the others leave over                                                                          |
| `headerCellProps` | `Partial<CellHeaderProps>`                                                   | -       | Props for the CellHeader generated from a string header, for tooltips, alignment or truncation                                        |
| `filterComponent` | `(props: { column: Column<TData>; table: Table<TData> }) => React.ReactNode` | -       | Replaces the default search input in this column's filter cell, for a select or a range instead                                       |
