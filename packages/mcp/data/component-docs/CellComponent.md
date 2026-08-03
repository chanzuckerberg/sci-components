# CellComponent

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/CellComponent/index.tsx).

## Import

**React TypeScript**

```tsx
import { CellComponent } from "@czi-sds/components";
```

## Code examples

### **Default CellComponent**

This example demonstrates the minimum required props for rendering a CellComponent component.

**Example: DefaultCellComponent**

```tsx
import { CellComponent, InputToggle } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <table>
        <tbody>
          <tr>
            <CellComponent>
              <InputToggle />
            </CellComponent>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
```

```css
table {
  border: dashed 1px #eee;
}
```

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name              | Type                                | Default  | Description                                                                                                                 |
| ----------------- | ----------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `as`              | `React.ElementType`                 | `"td"`   | The element the cell renders as.                                                                                            |
| `children`        | `React.ReactNode`                   | -        | The cell's content. Unlike CellBasic, which takes text through `primaryText`, this cell renders whatever you put inside it. |
| `horizontalAlign` | `"left"` \| `"center"` \| `"right"` | `"left"` | Specifies the horizontal alignment of the cell content.                                                                     |
| `verticalAlign`   | `"top"` \| `"center"` \| `"bottom"` | `"top"`  | Specifies the vertical alignment of the cell content.                                                                       |

Anything else you pass, such as `colSpan`, `width`, `onClick` or a data attribute, lands on the rendered `td`. The cell also carries the class name `cell-component`, which TableRow uses to switch off pointer events inside a disabled row.
