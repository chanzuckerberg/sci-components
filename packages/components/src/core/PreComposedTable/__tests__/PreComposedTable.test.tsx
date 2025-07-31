import React from "react";
import { render, screen } from "@testing-library/react";
import { ColumnDef } from "@tanstack/react-table";
import PreComposedTable from "../index";

// Sample data for testing
const sampleData = [
  {
    age: 30,
    email: "john.doe@example.com",
    id: 1,
    name: "John Doe",
  },
  {
    age: 28,
    email: "jane.smith@example.com",
    id: 2,
    name: "Jane Smith",
  },
];

// Sample columns for testing
const sampleColumns: ColumnDef<(typeof sampleData)[0]>[] = [
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

describe("PreComposedTable", () => {
  it("renders without crashing", () => {
    render(<PreComposedTable data={sampleData} columns={sampleColumns} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("displays data correctly", () => {
    render(<PreComposedTable data={sampleData} columns={sampleColumns} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane.smith@example.com")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("shows global search when enabled", () => {
    render(
      <PreComposedTable
        data={sampleData}
        columns={sampleColumns}
        enableGlobalFiltering={true}
      />
    );
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });

  it("shows pagination when enabled", () => {
    render(
      <PreComposedTable
        data={sampleData}
        columns={sampleColumns}
        enablePagination={true}
        paginationConfig={{
          pageSize: 1,
        }}
      />
    );
    // Check that pagination elements are present
    expect(screen.getByText("1")).toBeInTheDocument(); // Current page number
    expect(screen.getByText("2")).toBeInTheDocument(); // Next page number
  });

  it("shows row selection checkboxes when enabled", () => {
    render(
      <PreComposedTable
        data={sampleData}
        columns={sampleColumns}
        enableRowSelection={true}
      />
    );
    // Checkboxes should be present (they might not have visible text)
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(
      <PreComposedTable
        data={sampleData}
        columns={sampleColumns}
        className="custom-table"
      />
    );
    expect(container.firstChild).toHaveClass("custom-table");
  });

  it("applies custom styles", () => {
    const { container } = render(
      <PreComposedTable
        data={sampleData}
        columns={sampleColumns}
        style={{ border: "2px solid red" }}
      />
    );
    expect(container.firstChild).toHaveStyle("border: 2px solid red");
  });
});
