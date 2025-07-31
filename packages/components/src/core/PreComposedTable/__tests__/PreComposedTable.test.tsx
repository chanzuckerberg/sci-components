/* eslint-disable sonarjs/no-duplicate-string */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ColumnDef } from "@tanstack/react-table";
import PreComposedTable from "../index";

// Sample data for testing
const SAMPLE_DATA = [
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
const SAMPLE_COLUMNS: ColumnDef<(typeof SAMPLE_DATA)[0]>[] = [
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
    render(<PreComposedTable data={SAMPLE_DATA} columns={SAMPLE_COLUMNS} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("displays data correctly", () => {
    render(<PreComposedTable data={SAMPLE_DATA} columns={SAMPLE_COLUMNS} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane.smith@example.com")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("shows global search when enabled", () => {
    render(
      <PreComposedTable
        data={SAMPLE_DATA}
        columns={SAMPLE_COLUMNS}
        enableGlobalFiltering={true}
      />
    );
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });

  it("shows pagination when enabled", () => {
    render(
      <PreComposedTable
        data={SAMPLE_DATA}
        columns={SAMPLE_COLUMNS}
        enablePagination={true}
        paginationConfig={{
          pageSize: 1,
        }}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument(); // Current page number
    expect(screen.getByText("2")).toBeInTheDocument(); // Next page number
  });

  it("shows row selection checkboxes when enabled", () => {
    render(
      <PreComposedTable
        data={SAMPLE_DATA}
        columns={SAMPLE_COLUMNS}
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
        data={SAMPLE_DATA}
        columns={SAMPLE_COLUMNS}
        className="custom-table"
      />
    );
    expect(container.firstChild).toHaveClass("custom-table");
  });

  it("applies custom styles", () => {
    const { container } = render(
      <PreComposedTable
        data={SAMPLE_DATA}
        columns={SAMPLE_COLUMNS}
        style={{ border: "2px solid red" }}
      />
    );
    expect(container.firstChild).toHaveStyle("border: 2px solid red");
  });

  it("handles row selection callbacks", async () => {
    const onRowSelect = jest.fn();
    const user = userEvent.setup();

    render(
      <PreComposedTable
        data={SAMPLE_DATA}
        columns={SAMPLE_COLUMNS}
        enableRowSelection={true}
        onRowSelect={onRowSelect}
      />
    );

    const rowCheckbox = screen.getAllByLabelText("Select row")[0];
    await user.click(rowCheckbox);

    await waitFor(() => {
      expect(onRowSelect).toHaveBeenCalledWith([SAMPLE_DATA[0]]);
    });
  });

  it("handles select all functionality", async () => {
    const user = userEvent.setup();

    render(
      <PreComposedTable
        data={SAMPLE_DATA}
        columns={SAMPLE_COLUMNS}
        enableRowSelection={true}
      />
    );

    const selectAllCheckbox = screen.getByLabelText("Select all rows");
    await user.click(selectAllCheckbox);

    const rowCheckboxes = screen.getAllByLabelText("Select row");
    rowCheckboxes.forEach((checkbox) => {
      // Find the actual input element within the FormControlLabel
      const inputElement = checkbox.querySelector('input[type="checkbox"]');
      expect(inputElement).toBeChecked();
    });
  });

  it("handles global filtering", async () => {
    const user = userEvent.setup();

    render(
      <PreComposedTable
        data={SAMPLE_DATA}
        columns={SAMPLE_COLUMNS}
        enableGlobalFiltering={true}
      />
    );

    const searchInput = screen.getByLabelText("Search");
    await user.type(searchInput, "John");

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });

  it("handles sorting when enabled", async () => {
    const user = userEvent.setup();

    render(
      <PreComposedTable
        data={SAMPLE_DATA}
        columns={SAMPLE_COLUMNS}
        enableSorting={true}
      />
    );

    const nameHeader = screen.getByText("Name");
    await user.click(nameHeader);

    // After sorting, Jane should come before John alphabetically
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Jane Smith");
    expect(rows[2]).toHaveTextContent("John Doe");
  });

  it("handles column pinning", () => {
    const pinnedColumns: ColumnDef<(typeof SAMPLE_DATA)[0]>[] = [
      {
        accessorKey: "name",
        header: "Name",
        meta: { pinning: "left" },
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "age",
        header: "Age",
        meta: { pinning: "right" },
      },
    ];

    render(<PreComposedTable data={SAMPLE_DATA} columns={pinnedColumns} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("handles empty data", () => {
    render(<PreComposedTable data={[]} columns={SAMPLE_COLUMNS} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("handles custom cell rendering", () => {
    const customColumns: ColumnDef<(typeof SAMPLE_DATA)[0]>[] = [
      {
        accessorKey: "name",
        cell: ({ getValue }) => (
          <div data-testid="custom-cell">{getValue() as string}</div>
        ),
        header: "Name",
      },
    ];

    render(<PreComposedTable data={SAMPLE_DATA} columns={customColumns} />);

    expect(screen.getAllByTestId("custom-cell")).toHaveLength(2);
  });

  it("handles custom header rendering", () => {
    const customHeaderColumns: ColumnDef<(typeof SAMPLE_DATA)[0]>[] = [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <div data-testid="custom-header">{column.id}</div>
        ),
      },
    ];

    render(
      <PreComposedTable data={SAMPLE_DATA} columns={customHeaderColumns} />
    );

    expect(screen.getByTestId("custom-header")).toBeInTheDocument();
  });

  it("handles row hover states", async () => {
    const user = userEvent.setup();

    render(<PreComposedTable data={SAMPLE_DATA} columns={SAMPLE_COLUMNS} />);

    const rows = screen.getAllByRole("row");
    const dataRow = rows[1]; // First data row (skip header)

    await user.hover(dataRow);
    // Test that hover doesn't break anything
    expect(dataRow).toBeInTheDocument();

    await user.unhover(dataRow);
    expect(dataRow).toBeInTheDocument();
  });

  it("handles vertical alignment in cells", () => {
    const verticalAlignColumns: ColumnDef<(typeof SAMPLE_DATA)[0]>[] = [
      {
        accessorKey: "name",
        header: "Name",
        meta: {
          verticalAlign: "top",
        },
      },
    ];

    render(
      <PreComposedTable data={SAMPLE_DATA} columns={verticalAlignColumns} />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("handles pagination navigation", async () => {
    const user = userEvent.setup();

    render(
      <PreComposedTable
        data={SAMPLE_DATA}
        columns={SAMPLE_COLUMNS}
        enablePagination={true}
        paginationConfig={{ pageSize: 1 }}
      />
    );

    // Should only show first row initially
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();

    // Navigate to next page
    const nextButton = screen.getByText("2");
    await user.click(nextButton);

    // Should now show second row
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});
