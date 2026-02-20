import React from "react";
import { Column, ColumnDef, RowData } from "@tanstack/react-table";
import Button from "src/core/Button";
import CellBasic from "src/core/CellBasic";
import CellComponent from "src/core/CellComponent";
import CellHeader from "src/core/CellHeader";
import Icon from "src/core/Icon";
import InputText from "src/core/InputText";
import Link from "src/core/Link";
import Tag from "src/core/Tag";
import Dropdown from "src/core/Dropdown";
import { AutocompleteValue } from "@mui/material";

export interface DataType {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  lastActive: string;
  projects: number;
  salary: number;
  location: string;
  startDate: string;
}

export const SAMPLE_DATA: DataType[] = [
  {
    department: "Engineering",
    email: "john.doe@example.com",
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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

export const COLUMNS_DEFINITION: ColumnDef<DataType>[] = [
  {
    accessorKey: "name",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        secondaryText={`${getValue() as string} is a test`}
        shouldShowTooltipOnHover={false}
        shouldShowUnderlineOnHover={true}
        link="https://www.google.com"
        linkComponent="a"
        linkProps={{
          target: "_blank",
        }}
        {...props}
      />
    ),
    enableSorting: false,
    header: ({ header: _header, ...props }) => (
      <CellHeader
        hideSortIcon={true}
        hover
        shouldShowTooltipOnHover={true}
        tooltipProps={{
          componentSlot: (
            <Link href="https://www.google.com" sdsStyle="dashed" sdsSize="xs">
              A sample link to Google
            </Link>
          ),
          placement: "top" as const,
          textAlign: "left" as const,
          width: "wide",
        }}
        tooltipSubtitle={
          "Measures the model's ability to distinguish between classes. Represents the probability that a randomly chosen positive example is ranked higher than a randomly chosen negative one. Higher values indicate better discriminative performance across thresholds."
        }
        tooltipText="Name"
        {...props}
      >
        Name
      </CellHeader>
    ),
    meta: {
      isGrow: true,
      pinning: "left",
    },
    minSize: 150,
  },
  {
    accessorKey: "email",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        secondaryText={getValue() as string}
        shouldShowUnderlineOnHover={true}
        link={`mailto:${getValue() as string}`}
        linkProps={{
          target: "_blank",
        }}
        shouldShowTooltipOnHover={false}
        primaryTextWrapLineCount={1}
        {...props}
      />
    ),
    header: "Email",
    meta: {
      isGrow: true,
    },
    minSize: 200,
  },
  {
    accessorKey: "role",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        shouldShowTooltipOnHover={false}
        {...props}
      />
    ),
    header: "Role",
    meta: {
      verticalAlign: "middle",
    },
    minSize: 150,
  },
  {
    accessorKey: "department",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        shouldShowTooltipOnHover={false}
        {...props}
      />
    ),
    header: "Department",
    minSize: 120,
  },
  {
    accessorKey: "status",
    cell: ({ getValue, ...props }) => (
      <CellComponent {...props}>
        <Tag
          label={getValue() as string}
          color={(getValue() as string) === "Active" ? "positive" : "negative"}
          sdsStyle="rounded"
          sdsType="secondary"
          hover={false}
        />
      </CellComponent>
    ),
    header: "Status",
    minSize: 100,
  },
  {
    accessorKey: "lastActive",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        tabularNums
        shouldShowTooltipOnHover={false}
        horizontalAlign="right"
        extraRightPadding={props?.column?.getCanSort() ? 20 : 0}
        {...props}
      />
    ),
    header: "Last Active",
    meta: {
      headerCellProps: {
        horizontalAlign: "right",
      },
    },
    minSize: 120,
  },
  {
    accessorKey: "projects",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        tabularNums
        shouldShowTooltipOnHover={false}
        horizontalAlign="right"
        extraRightPadding={props?.column?.getCanSort() ? 20 : 0}
        {...props}
      />
    ),
    header: "Projects",
    meta: {
      headerCellProps: {
        horizontalAlign: "right",
      },
    },
    minSize: 100,
  },
  {
    accessorKey: "salary",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={`$${(getValue() as number).toLocaleString()}`}
        tabularNums
        extraRightPadding={props?.column?.getCanSort() ? 20 : 0}
        horizontalAlign="right"
        {...props}
      />
    ),
    header: "Salary",
    meta: {
      headerCellProps: {
        horizontalAlign: "right",
      },
    },
    minSize: 120,
  },
  {
    accessorKey: "location",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        shouldShowTooltipOnHover={false}
        tabularNums
        {...props}
      />
    ),
    header: "Location",
    minSize: 150,
  },
  {
    accessorKey: "startDate",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        tabularNums
        shouldShowTooltipOnHover={false}
        horizontalAlign="right"
        extraRightPadding={props?.column?.getCanSort() ? 20 : 0}
        {...props}
      />
    ),
    header: "Start Date",
    meta: {
      headerCellProps: {
        horizontalAlign: "right",
      },
    },
    minSize: 120,
  },
  {
    cell: ({ row, ...props }) => (
      <CellComponent horizontalAlign="center" {...props}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            sdsStyle="minimal"
            sdsType="secondary"
            size="medium"
            aria-label={`Edit ${row.original.name}`}
            onClick={() => console.log("Edit", row.original)}
          >
            <Icon sdsIcon="Edit" sdsSize="s" />
          </Button>
          <Button
            sdsStyle="minimal"
            sdsType="secondary"
            size="medium"
            aria-label={`More options for ${row.original.name}`}
            onClick={() => console.log("Downlaod", row.original)}
          >
            <Icon sdsIcon="Download" sdsSize="s" />
          </Button>
        </div>
      </CellComponent>
    ),
    enableSorting: false,
    header: "Actions",
    id: "actions",
    meta: {
      headerCellProps: {
        horizontalAlign: "right",
      },
      pinning: "right",
      verticalAlign: "middle",
    },
    size: 100,
  },
];

export const COLUMNS_WITH_SELECTIVE_FILTERS: ColumnDef<DataType>[] = [
  {
    accessorKey: "name",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        shouldShowTooltipOnHover={false}
        {...props}
      />
    ),
    header: "Name",
    meta: {
      isGrow: true,
      pinning: "left",
    },
    minSize: 150,
  },
  {
    accessorKey: "email",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        shouldShowTooltipOnHover={false}
        {...props}
      />
    ),
    header: "Email",
    meta: {
      isGrow: true,
    },
    minSize: 200,
  },
  {
    accessorKey: "role",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        shouldShowTooltipOnHover={false}
        {...props}
      />
    ),
    header: "Role",
    minSize: 150,
  },
  {
    accessorKey: "department",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        shouldShowTooltipOnHover={false}
        {...props}
      />
    ),
    header: "Department",
    minSize: 120,
  },
  {
    accessorKey: "status",
    cell: ({ getValue, ...props }) => (
      <CellComponent {...props}>
        <Tag
          label={getValue() as string}
          color={(getValue() as string) === "Active" ? "positive" : "negative"}
          sdsStyle="rounded"
          sdsType="secondary"
          hover={false}
        />
      </CellComponent>
    ),
    filterFn: "equalsString",
    header: "Status",
    meta: {
      filterComponent: ({ column }) => {
        const STATUS_OPTIONS = [
          { name: "All" },
          { name: "Active" },
          { name: "Inactive" },
        ];
        return (
          <Dropdown<{ name: string }, false, false, false>
            label="Status"
            options={STATUS_OPTIONS}
            onChange={(
              _e: React.SyntheticEvent,
              value: AutocompleteValue<{ name: string }, false, false, false>
            ) => {
              column.setFilterValue(
                value?.name === "All" ? undefined : value?.name
              );
            }}
            InputDropdownProps={{
              width: "100%",
            }}
          />
        );
      },
    },
    minSize: 140,
  },
  {
    accessorKey: "salary",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={`$${(getValue() as number).toLocaleString()}`}
        tabularNums
        horizontalAlign="right"
        {...props}
      />
    ),
    enableColumnFilter: false,
    header: "Salary",
    meta: {
      headerCellProps: {
        horizontalAlign: "right",
      },
    },
    minSize: 120,
  },
  {
    accessorKey: "startDate",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        tabularNums
        shouldShowTooltipOnHover={false}
        horizontalAlign="right"
        {...props}
      />
    ),
    enableColumnFilter: false,
    header: "Start Date",
    meta: {
      headerCellProps: {
        horizontalAlign: "right",
      },
      pinning: "right",
    },
    minSize: 120,
  },
];

function NumberRangeFilter<TData extends RowData>({
  column,
}: {
  column: Column<TData, unknown>;
}) {
  const filterValue = (column.getFilterValue() as [number, number]) ?? [
    undefined,
    undefined,
  ];

  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      <InputText
        id={`${column.id}-min`}
        label="Min"
        hideLabel
        placeholder="Min"
        type="number"
        sdsType="textField"
        value={filterValue[0] ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value ? Number(e.target.value) : undefined,
            old?.[1],
          ])
        }
        size="small"
      />
      <span style={{ flexShrink: 0 }}>—</span>
      <InputText
        id={`${column.id}-max`}
        label="Max"
        hideLabel
        placeholder="Max"
        type="number"
        sdsType="textField"
        value={filterValue[1] ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value ? Number(e.target.value) : undefined,
          ])
        }
        size="small"
      />
    </div>
  );
}

export const COLUMNS_WITH_CUSTOM_FILTERS: ColumnDef<DataType>[] = [
  {
    accessorKey: "name",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        shouldShowTooltipOnHover={false}
        {...props}
      />
    ),
    header: "Name",
    meta: {
      isGrow: true,
      pinning: "left",
    },
    minSize: 150,
  },
  {
    accessorKey: "role",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        shouldShowTooltipOnHover={false}
        {...props}
      />
    ),
    header: "Role",
    minSize: 150,
  },
  {
    accessorKey: "status",
    cell: ({ getValue, ...props }) => (
      <CellComponent {...props}>
        <Tag
          label={getValue() as string}
          color={(getValue() as string) === "Active" ? "positive" : "negative"}
          sdsStyle="rounded"
          sdsType="secondary"
          hover={false}
        />
      </CellComponent>
    ),
    filterFn: "equalsString",
    header: "Status",
    meta: {
      filterComponent: ({ column }) => {
        const STATUS_OPTIONS = [
          { name: "All" },
          { name: "Active" },
          { name: "Inactive" },
        ];
        return (
          <Dropdown<{ name: string }, false, false, false>
            label="Status"
            options={STATUS_OPTIONS}
            onChange={(
              _e: React.SyntheticEvent,
              value: AutocompleteValue<{ name: string }, false, false, false>
            ) => {
              column.setFilterValue(
                value?.name === "All" ? undefined : value?.name
              );
            }}
            InputDropdownProps={{
              width: "100%",
            }}
          />
        );
      },
    },
    minSize: 100,
  },
  {
    accessorKey: "salary",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={`$${(getValue() as number).toLocaleString()}`}
        tabularNums
        horizontalAlign="right"
        {...props}
      />
    ),
    filterFn: "inNumberRange",
    header: "Salary",
    meta: {
      filterComponent: NumberRangeFilter,
      headerCellProps: {
        horizontalAlign: "right",
      },
    },
    minSize: 180,
  },
  {
    accessorKey: "projects",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        tabularNums
        horizontalAlign="right"
        {...props}
      />
    ),
    filterFn: "inNumberRange",
    header: "Projects",
    meta: {
      filterComponent: NumberRangeFilter,
      headerCellProps: {
        horizontalAlign: "right",
      },
    },
    minSize: 180,
  },
];

export const TABLE_ON_ROW_SELECT_OPTIONS = [
  (selectedRows: unknown) => {
    console.log(selectedRows);
  },
  undefined,
];
