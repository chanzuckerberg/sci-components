import React from "react";
import { PreComposedTable, PreComposedTableProps } from "@czi-sds/components";

interface PreComposedTableDataType {
  age: number;
  email: string;
  id: number;
  name: string;
}

const PreComposedTableNameSpaceTest = (
  props: PreComposedTableProps<PreComposedTableDataType>
) => {
  const sampleData: PreComposedTableDataType[] = [
    { age: 35, email: "bob@example.com", id: 3, name: "Bob Johnson" },
    { age: 25, email: "jane@example.com", id: 2, name: "Jane Smith" },
    { age: 30, email: "john@example.com", id: 1, name: "John Doe" },
  ];

  const sampleColumns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
  ];

  return (
    <>
      {/* Test with all props enabled */}
      <PreComposedTable
        data={sampleData}
        columns={sampleColumns}
        enableSorting={true}
        enableRowSelection={true}
        shouldPinSelectRowToLeft={true}
        enablePagination={true}
        enableColumnFiltering={true}
        enableGlobalFiltering={true}
        paginationConfig={{
          pageSize: 5,
          placement: "right",
        }}
        className="custom-table-class"
        style={{ border: "1px solid #ccc" }}
        tableWidth="800px"
        tableRowProps={{
          hover: true,
          selected: false,
        }}
        onRowSelect={(selectedRows) => {
          console.log("Selected rows:", selectedRows);
        }}
      />

      {/* Test with minimal props */}
      <PreComposedTable data={sampleData} columns={sampleColumns} />

      {/* Test with mixed configuration */}
      <PreComposedTable
        data={sampleData}
        columns={sampleColumns}
        enableSorting={false}
        enableRowSelection={true}
        shouldPinSelectRowToLeft={false}
        enablePagination={true}
        enableColumnFiltering={false}
        enableGlobalFiltering={true}
        paginationConfig={{
          pageSize: 10,
          placement: "right",
        }}
        tableWidth="100%"
        onRowSelect={(selectedRows) => {
          console.log("Mixed config selected:", selectedRows);
        }}
      />

      {/* Test with left pagination placement */}
      <PreComposedTable
        data={sampleData}
        columns={sampleColumns}
        enablePagination={true}
        paginationConfig={{
          pageSize: 2,
          placement: "left",
        }}
      />

      {/* Test with custom table row props */}
      <PreComposedTable
        data={sampleData}
        columns={sampleColumns}
        enableRowSelection={true}
        tableRowProps={{
          disabled: false,
          hover: false,
          selected: true,
        }}
      />
    </>
  );
};
