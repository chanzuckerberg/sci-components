import React from "react";
import { Args, Meta, StoryObj } from "@storybook/react-webpack5";
import PreComposedTable from "../index";
import {
  COLUMNS_DEFINITION,
  DataType,
  SAMPLE_DATA,
  TABLE_ON_ROW_SELECT_OPTIONS,
} from "./constants";

export default {
  argTypes: {
    border: {
      control: "boolean",
      description: "Show border",
    },
    columns: {
      control: false,
      description:
        "Table column definitions with React components - not editable in controls",
    },
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
    sdsStyle: {
      control: "inline-radio",
      description: "Style of the table",
      options: ["lined", "striped"],
    },
    tableRowProps: {
      control: "object",
      description: "Props to pass to the table row",
    },
  },
  component: PreComposedTable,
  tags: ["beta"],
  title: "Components/PreComposedTable",
} as Meta;

type Story = StoryObj<typeof PreComposedTable<DataType>>;

export const Default: Story = {
  args: {
    columns: COLUMNS_DEFINITION,
    data: SAMPLE_DATA,
    enableGlobalFiltering: false,
    enablePagination: true,
    enableRowSelection: true,
    enableSorting: true,
    onRowSelect: undefined,
    paginationConfig: { pageSize: 10 },
    shouldPinSelectRowToLeft: true,
    tableWidth: "100%",
    border: true,
    sdsStyle: "lined",
  },
  render: ({ data: _data, columns: _columns, ...args }: Args) => (
    <PreComposedTable data={_data} columns={_columns} {...args} />
  ),
};

export const WithGlobalFiltering: Story = {
  args: {
    columns: COLUMNS_DEFINITION,
    data: SAMPLE_DATA,
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

export const WithPagination: Story = {
  args: {
    columns: COLUMNS_DEFINITION,
    data: SAMPLE_DATA,
    enableGlobalFiltering: false,
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

export const FixedWidth: Story = {
  args: {
    columns: COLUMNS_DEFINITION,
    data: SAMPLE_DATA,
    enableGlobalFiltering: false,
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
