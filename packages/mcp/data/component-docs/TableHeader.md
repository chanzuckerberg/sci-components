# TableHeader

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/TableHeader/index.tsx).

## Props

TableHeader renders the thead and the header row inside it, so its children are header cells rather than a row. It has two props of its own.

| Name      | Type            | Default | Description                                                                                                                                                                                                                               |
| --------- | --------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children  | React.ReactNode | -       | Required. The header cells, normally CellHeaders. They are wrapped in a TableRow with hover and tooltips switched off, so do not pass a tr yourself.                                                                                      |
| filterRow | React.ReactNode | -       | A second row rendered below the header row, inside the same thead, for per-column filter controls. Pass a tr of cells. Supplying it also changes the border on the header row above. PreComposedTable uses this for its column filtering. |

## Code examples

### **Default TableHeader**

This example demonstrates the minimum required props for rendering a TableHeader component.

**Example: DefaultTableHeader**

```tsx
// TableHeader renders the thead and the header row itself, so its children are
// header cells rather than a tr.

import { CellHeader, Table, TableHeader } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Table>
        <TableHeader>
          <CellHeader>Header</CellHeader>
          <CellHeader>Header</CellHeader>
          <CellHeader>Header</CellHeader>
        </TableHeader>
      </Table>
    </div>
  );
}

export default App;
```
