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
        primaryText={`$${(getValue() as number).toLocaleString()}`}
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
