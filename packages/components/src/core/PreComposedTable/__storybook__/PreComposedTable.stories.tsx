import React from "react";
import { Args, Meta, StoryObj } from "@storybook/react";
import PreComposedTable from "../index";
import { ColumnDef } from "@tanstack/react-table";
import CellBasic from "src/core/CellBasic";
import Link from "src/core/Link";
import CellHeader from "src/core/CellHeader";
import { TABLE_ON_ROW_SELECT_OPTIONS } from "./constants";

const meta: Meta<typeof PreComposedTable> = {
  argTypes: {
    enableColumnFiltering: {
      control: "boolean",
      description: "Enable column filtering",
    },
    enableGlobalFiltering: {
      control: "boolean",
      description: "Enable global search",
    },
    enablePagination: {
      control: "boolean",
      description: "Enable pagination",
    },
    enableRowSelection: {
      control: "boolean",
      description: "Enable row selection with checkboxes",
    },
    enableSorting: {
      control: "boolean",
      description: "Enable column sorting",
    },
    onRowSelect: {
      control: {
        labels: ["log selected rows", "none"],
        type: "select",
      },
      description: "Callback function when rows are selected",
      mapping: TABLE_ON_ROW_SELECT_OPTIONS,
      options: Object.keys(TABLE_ON_ROW_SELECT_OPTIONS),
    },
    paginationConfig: {
      control: "object",
      description: "Pagination configuration",
    },
    shouldPinSelectRowToLeft: {
      control: "boolean",
      description: "Pin the select row to the left",
    },
    tableRowProps: {
      control: "object",
      description: "Props to pass to the table row",
    },
  },
  component: PreComposedTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  title: "Core/PreComposedTable",
};

export default meta;
type Story = StoryObj<typeof PreComposedTable<DataType>>;

interface DataType {
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

const sampleData: DataType[] = [
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

const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "name",
    cell: ({ getValue, ...props }) => (
      <CellBasic
        primaryText={getValue() as string}
        secondaryText={`${getValue() as string} is a test`}
        shouldShowTooltipOnHover={false}
        shouldShowUndelineOnHover={true}
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
        shouldShowUndelineOnHover={true}
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
      <CellBasic
        primaryText={getValue() as string}
        shouldShowTooltipOnHover={false}
        style={{
          color: (getValue() as string) === "Active" ? "green" : "red",
        }}
        {...props}
      />
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
        extraRightPadding={20}
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
        extraRightPadding={20}
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
        extraRightPadding={20}
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
        extraRightPadding={20}
        {...props}
      />
    ),
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

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
    enableGlobalFiltering: false,
    enablePagination: true,
    enableRowSelection: true,
    enableSorting: true,
    onRowSelect: undefined,
    paginationConfig: { pageSize: 10 },
    shouldPinSelectRowToLeft: true,
    tableWidth: "100%",
  },
  render: ({ data: _data, columns: _columns, ...args }: Args) => (
    <PreComposedTable data={_data} columns={_columns} {...args} />
  ),
};

export const WithPagination: Story = {
  args: {
    columns,
    data: sampleData,
    enableGlobalFiltering: true,
    enablePagination: true,
    enableRowSelection: true,
    enableSorting: true,
    paginationConfig: { pageSize: 3 },
    tableWidth: "100%",
  },
  render: ({ data: _data, columns: _columns, ...args }: Args) => (
    <PreComposedTable data={_data} columns={_columns} {...args} />
  ),
};

export const WithoutPagination: Story = {
  args: {
    columns,
    data: sampleData,
    enableGlobalFiltering: true,
    enablePagination: false,
    enableRowSelection: true,
    enableSorting: true,
    tableWidth: "100%",
  },
  render: ({ data: _data, columns: _columns, ...args }: Args) => (
    <PreComposedTable data={_data} columns={_columns} {...args} />
  ),
};

export const FixedWidth: Story = {
  args: {
    columns,
    data: sampleData,
    enableGlobalFiltering: true,
    enablePagination: true,
    enableRowSelection: true,
    enableSorting: true,
    paginationConfig: { pageSize: 10 },
    tableWidth: "600px",
  },
  render: ({ data: _data, columns: _columns, ...args }: Args) => (
    <PreComposedTable data={_data} columns={_columns} {...args} />
  ),
};

export const ViewportWidth: Story = {
  args: {
    columns,
    data: sampleData,
    enableGlobalFiltering: true,
    enablePagination: true,
    enableRowSelection: true,
    enableSorting: true,
    paginationConfig: { pageSize: 10 },
    tableWidth: "80vw",
  },
  render: ({ data: _data, columns: _columns, ...args }: Args) => (
    <PreComposedTable data={_data} columns={_columns} {...args} />
  ),
};
