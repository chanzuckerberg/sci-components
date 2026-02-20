import React, { useRef, useState } from "react";
import { Args, Meta, StoryObj } from "@storybook/react-webpack5";
import PreComposedTable, { PreComposedTableRef } from "../index";
import {
  COLUMNS_DEFINITION,
  COLUMNS_WITH_CUSTOM_FILTERS,
  COLUMNS_WITH_SELECTIVE_FILTERS,
  DataType,
  SAMPLE_DATA,
  TABLE_ON_ROW_SELECT_OPTIONS,
} from "./constants";
import Button from "src/core/Button";

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
    tableOptions: {
      control: "object",
      description:
        "Pass-through TanStack Table options. Any option from useReactTable can be provided here (e.g. autoResetPageIndex, globalFilterFn, meta, etc.).",
    },
    tableRowProps: {
      control: "object",
      description: "Props to pass to the table row",
    },
  },
  component: PreComposedTable,
  tags: ["beta"],
  title: "Components/Table/PreComposedTable",
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

const ColumnFilteringDemo = () => {
  const [columnFilters, setColumnFilters] = useState<
    { id: string; value: unknown }[]
  >([]);

  return (
    <PreComposedTable<DataType>
      data={SAMPLE_DATA}
      columns={COLUMNS_DEFINITION}
      enableColumnFiltering
      enableSorting
      tableWidth="100%"
      tableOptions={{
        onColumnFiltersChange: (updater) => {
          const next =
            typeof updater === "function" ? updater(columnFilters) : updater;
          setColumnFilters(next);
          console.log("Column filters changed:", next);
        },
        state: { columnFilters },
      }}
    />
  );
};

export const WithColumnFiltering: Story = {
  render: () => <ColumnFilteringDemo />,
};

export const WithSelectiveColumnFiltering: Story = {
  args: {
    columns: COLUMNS_WITH_SELECTIVE_FILTERS,
    data: SAMPLE_DATA,
    enableColumnFiltering: true,
    enablePagination: false,
    enableRowSelection: true,
    enableSorting: true,
    tableWidth: "100%",
  },
  render: ({ data: _data, columns: _columns, ...args }: Args) => (
    <PreComposedTable data={_data} columns={_columns} {...args} />
  ),
};

const TableActionsDemo = () => {
  const tableRef = useRef<PreComposedTableRef<DataType>>(null);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <p style={{ margin: "0 0 8px" }}>
          Use the <code>ref</code> prop to access the underlying TanStack Table
          instance. This gives you full control over sorting, filtering,
          pagination, row selection, and more.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button
            sdsStyle="outline"
            sdsType="primary"
            size="small"
            onClick={() => tableRef.current?.table.resetColumnFilters()}
          >
            Clear All Filters
          </Button>
          <Button
            sdsStyle="outline"
            sdsType="primary"
            size="small"
            onClick={() => tableRef.current?.table.resetSorting()}
          >
            Reset Sorting
          </Button>
          <Button
            sdsStyle="outline"
            sdsType="primary"
            size="small"
            onClick={() => tableRef.current?.table.toggleAllRowsSelected(true)}
          >
            Select All Rows
          </Button>
          <Button
            sdsStyle="outline"
            sdsType="primary"
            size="small"
            onClick={() => tableRef.current?.table.toggleAllRowsSelected(false)}
          >
            Deselect All Rows
          </Button>
          <Button
            sdsStyle="outline"
            sdsType="secondary"
            size="small"
            onClick={() => {
              tableRef.current?.table.resetColumnFilters();
              tableRef.current?.table.resetSorting();
              tableRef.current?.table.toggleAllRowsSelected(false);
            }}
          >
            Reset Everything
          </Button>
        </div>
      </div>
      <PreComposedTable<DataType>
        ref={tableRef}
        data={SAMPLE_DATA}
        columns={COLUMNS_DEFINITION}
        enableColumnFiltering
        enableSorting
        enableRowSelection
        enablePagination
        paginationConfig={{ pageSize: 5 }}
        tableWidth="100%"
      />
    </div>
  );
};

export const WithTableActions: Story = {
  render: () => <TableActionsDemo />,
};

const TableOptionsDemo = () => {
  const tableRef = useRef<PreComposedTableRef<DataType>>(null);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <p style={{ margin: "0 0 8px" }}>
          Use the <code>tableOptions</code> prop to pass any TanStack Table
          option directly to the underlying table instance. This example uses{" "}
          <code>autoResetPageIndex: false</code> so filtering does not jump back
          to page 1, and <code>debugTable: true</code> to show console output.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button
            sdsStyle="outline"
            sdsType="primary"
            size="small"
            onClick={() => tableRef.current?.table.resetColumnFilters()}
          >
            Clear All Filters
          </Button>
          <Button
            sdsStyle="outline"
            sdsType="primary"
            size="small"
            onClick={() => tableRef.current?.table.resetSorting()}
          >
            Reset Sorting
          </Button>
        </div>
      </div>
      <PreComposedTable<DataType>
        ref={tableRef}
        data={SAMPLE_DATA}
        columns={COLUMNS_DEFINITION}
        enableColumnFiltering
        enableSorting
        enableRowSelection
        enablePagination
        paginationConfig={{ pageSize: 3 }}
        tableWidth="100%"
        tableOptions={{
          autoResetPageIndex: false,
          debugTable: true,
        }}
      />
    </div>
  );
};

export const WithTableOptions: Story = {
  render: () => <TableOptionsDemo />,
};

export const WithCustomColumnFilters: Story = {
  args: {
    columns: COLUMNS_WITH_CUSTOM_FILTERS,
    data: SAMPLE_DATA,
    enableColumnFiltering: true,
    enableSorting: true,
    enableRowSelection: true,
    tableWidth: "100%",
  },
  render: ({ data: _data, columns: _columns, ...args }: Args) => (
    <PreComposedTable data={_data} columns={_columns} {...args} />
  ),
};
