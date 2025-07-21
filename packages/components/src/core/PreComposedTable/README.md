# PreComposedTable

A pre-composed table component built on Tanstack Table for logic and SDS components for UI. This component provides a complete table solution with sorting, filtering, pagination, row selection, and column pinning capabilities.

## Features

- **Sorting**: Click column headers to sort data
- **Row Selection**: Select individual rows or all rows with checkboxes (selection column automatically pinned to left)
- **Column Pinning**: Pin columns to the left or right side of the table
- **Pagination**: Navigate through large datasets with configurable page sizes
- **Global Filtering**: Search across all columns
- **Responsive Design**: Horizontal scrolling when content exceeds container width
- **TypeScript Support**: Fully typed with TypeScript

## Usage

```tsx
import { PreComposedTable } from "@czi-sds/components";

const data = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
];

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    pinning: "left", // Pin to left side
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    pinning: "right", // Pin to right side
  },
];

function MyTable() {
  return (
    <PreComposedTable
      data={data}
      columns={columns}
      enableSorting={true}
      enableRowSelection={true} // Selection column will be automatically pinned to left
      enableColumnPinning={true}
      enablePagination={true}
      enableGlobalFiltering={true}
      pageSize={10}
      tableWidth="100%" // Takes full available width
    />
  );
}
```

## Props

| Prop                    | Type             | Default  | Description                                                             |
| ----------------------- | ---------------- | -------- | ----------------------------------------------------------------------- |
| `data`                  | `T[]`            | `[]`     | Array of data objects to display                                        |
| `columns`               | `ColumnDef<T>[]` | `[]`     | Column definitions                                                      |
| `enableSorting`         | `boolean`        | `false`  | Enable column sorting                                                   |
| `enableRowSelection`    | `boolean`        | `false`  | Enable row selection with checkboxes                                    |
| `enableColumnPinning`   | `boolean`        | `false`  | Enable column pinning functionality                                     |
| `enablePagination`      | `boolean`        | `false`  | Enable pagination                                                       |
| `enableGlobalFiltering` | `boolean`        | `false`  | Enable global search filter                                             |
| `pageSize`              | `number`         | `10`     | Number of rows per page                                                 |
| `tableWidth`            | `string`         | `"100%"` | CSS width value for the table container (e.g., "100%", "800px", "50vw") |

## Column Configuration

### Basic Column

```tsx
{
  accessorKey: 'name',
  header: 'Name',
}
```

### Pinned Column

```tsx
{
  accessorKey: 'name',
  header: 'Name',
  pinning: 'left', // or 'right'
}
```

## Horizontal Scrolling

The table automatically handles horizontal scrolling when the content width exceeds the container width. The table wrapper has `overflow-x: auto` which enables horizontal scrolling while maintaining the table's full width.

## Styling

The component uses SDS design tokens and components for consistent styling. The table container respects the parent container's width and will scroll horizontally when needed.

## Dependencies

- `@tanstack/react-table`: Table logic and state management
- SDS Components: UI components for consistent design
- `@emotion/styled`: Styling

## Installation

The PreComposedTable component requires the `@tanstack/react-table` dependency:

```bash
npm install @tanstack/react-table
# or
yarn add @tanstack/react-table
```

## Basic Usage

```tsx
import { PreComposedTable } from "@czi-sds/components";
import { ColumnDef } from "@tanstack/react-table";

// Define your data type
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
}

// Define your columns
const columns: ColumnDef<User>[] = [
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
  {
    accessorKey: "department",
    header: "Department",
  },
];

// Your data
const data: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
    department: "Engineering",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 28,
    department: "Marketing",
  },
];

// Use the component
function MyTable() {
  return (
    <PreComposedTable
      data={data}
      columns={columns}
      enableSorting={true}
      enableRowSelection={true}
      enablePagination={true}
      enableGlobalFiltering={true}
      pageSize={10}
    />
  );
}
```

## Props

### PreComposedTableProps<TData>

| Prop                    | Type                  | Default             | Description                                   |
| ----------------------- | --------------------- | ------------------- | --------------------------------------------- |
| `data`                  | `TData[]`             | -                   | Array of data objects to display in the table |
| `columns`               | `ColumnDef<TData>[]`  | -                   | Column definitions from Tanstack Table        |
| `enableSorting`         | `boolean`             | `false`             | Enable column sorting                         |
| `enableColumnPinning`   | `boolean`             | `false`             | Enable column pinning                         |
| `enableRowSelection`    | `boolean`             | `false`             | Enable row selection with checkboxes          |
| `enablePagination`      | `boolean`             | `false`             | Enable pagination                             |
| `enableColumnFiltering` | `boolean`             | `false`             | Enable column filtering                       |
| `enableGlobalFiltering` | `boolean`             | `false`             | Enable global search                          |
| `pageSize`              | `number`              | `10`                | Number of rows per page                       |
| `pageSizeOptions`       | `number[]`            | `[10, 25, 50, 100]` | Available page size options                   |
| `className`             | `string`              | -                   | Additional CSS class name                     |
| `style`                 | `React.CSSProperties` | -                   | Additional inline styles                      |

## Column Configuration

The component uses Tanstack Table's `ColumnDef` interface. Here are some common column configurations:

### Basic Column

```tsx
{
  accessorKey: "name",
  header: "Name",
}
```

### Column with Custom Cell Renderer

```tsx
{
  accessorKey: "salary",
  header: "Salary",
  cell: ({ getValue }) => {
    const value = getValue() as number;
    return `$${value.toLocaleString()}`;
  },
}
```

### Column with Custom Header

```tsx
{
  accessorKey: "status",
  header: ({ column }) => (
    <div>
      Status
      <button onClick={() => column.toggleSorting()}>
        Sort
      </button>
    </div>
  ),
}
```

### Column Pinning

```tsx
{
  accessorKey: "id",
  header: "ID",
  pinning: "left", // Pin to left side
},
{
  accessorKey: "actions",
  header: "Actions",
  pinning: "right", // Pin to right side
  cell: () => <button>Edit</button>,
},
{
  accessorKey: "name",
  header: "Name",
  // Not pinned (default) - will scroll horizontally
}
```

## Advanced Features

### Custom Cell Rendering

You can customize how cells are rendered by providing a `cell` function in your column definition:

```tsx
{
  accessorKey: "status",
  header: "Status",
  cell: ({ getValue }) => {
    const value = getValue() as string;
    return (
      <span
        style={{
          color: value === "Active" ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        {value}
      </span>
    );
  },
}
```

### Row Selection

When `enableRowSelection` is true, the table will include a checkbox column for selecting rows:

```tsx
<PreComposedTable data={data} columns={columns} enableRowSelection={true} />
```

### Global Filtering

Enable global search across all columns:

```tsx
<PreComposedTable data={data} columns={columns} enableGlobalFiltering={true} />
```

### Pagination

Enable pagination with custom page size:

```tsx
<PreComposedTable
  data={data}
  columns={columns}
  enablePagination={true}
  pageSize={25}
/>
```

## Styling

The component uses SDS design tokens and can be customized using the `className` and `style` props:

```tsx
<PreComposedTable
  data={data}
  columns={columns}
  className="my-custom-table"
  style={{ border: "2px solid #ccc" }}
/>
```

## Accessibility

The component includes several accessibility features:

- Proper ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly structure
- Focus management for sorting and selection

## Performance

For large datasets, consider:

- Using pagination to limit the number of rendered rows
- Implementing virtual scrolling for very large datasets
- Using memoization for expensive cell renderers

## Examples

See the Storybook stories for more examples:

- Basic table
- Table with sorting
- Table with row selection
- Table with pagination
- Table with global filtering
- Full-featured table
- Large dataset example

## Migration from AG Grid

If you're migrating from AG Grid, here are some key differences:

1. **Column Definitions**: Use Tanstack Table's `ColumnDef` instead of AG Grid's column definitions
2. **Data Binding**: Pass data directly as a prop instead of using a data source
3. **Event Handling**: Use React state and callbacks instead of AG Grid's event system
4. **Styling**: Uses SDS design system instead of AG Grid's themes

## Contributing

When contributing to this component:

1. Follow the existing code style
2. Add appropriate TypeScript types
3. Include Storybook stories for new features
4. Add tests for new functionality
5. Update this documentation

## Table Width Examples

The `tableWidth` prop accepts any valid CSS width value:

```tsx
// Full width (default)
<PreComposedTable tableWidth="100%" />

// Fixed width
<PreComposedTable tableWidth="800px" />

// Viewport width
<PreComposedTable tableWidth="80vw" />

// Percentage of container
<PreComposedTable tableWidth="50%" />

// CSS calc function
<PreComposedTable tableWidth="calc(100% - 20px)" />
```
