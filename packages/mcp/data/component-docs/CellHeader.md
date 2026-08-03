# CellHeader

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/CellHeader/index.tsx).

## Import

**React TypeScript**

```tsx
import { CellHeader } from "@czi-sds/components";
```

## Code examples

### **Default CellHeader**

This example demonstrates the minimum required props for rendering a CellHeader component.

**Example: DefaultCellHeader**

```tsx
import { CellHeader } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <table>
        <thead>
          <tr>
            <CellHeader>Header</CellHeader>
          </tr>
        </thead>
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

| Name                       | Type                                    | Default  | Description                                                                                                                                                                                                                                                                  |
| -------------------------- | --------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active`                   | `boolean`                               | `false`  | Marks this column as the one currently sorted: the label and chevron take the accent color. It does not sort anything on its own.                                                                                                                                            |
| `as`                       | `React.ElementType`                     | `"th"`   | The element the header cell renders as.                                                                                                                                                                                                                                      |
| `children`                 | `React.ReactNode`                       | -        | Required. A string or number is wrapped in the header's own text styling; anything else is rendered as given.                                                                                                                                                                |
| `direction`                | `CellHeaderDirection ("asc" \| "desc")` | `"desc"` | Which chevron to draw: up for `"asc"`, down for `"desc"`. It also sets the icon's `aria-label`.                                                                                                                                                                              |
| `hideSortIcon`             | `boolean`                               | `false`  | Leaves the chevron out for columns that cannot be sorted. An active header keeps its chevron even with this set.                                                                                                                                                             |
| `horizontalAlign`          | `"left"` \| `"center"` \| `"right"`     | `"left"` | Horizontally aligns the label and its chevron.                                                                                                                                                                                                                               |
| `hover`                    | `boolean`                               | `false`  | Makes the header interactive: it takes a pointer cursor, reacts to hover, renders the sort chevron and allows the tooltip. A header left at the default draws no chevron and shows no tooltip even if the other sorting props are set, so set this on every sortable column. |
| `onClick`                  | `React.MouseEventHandler`               | -        | Where sorting is actually wired up: with TanStack Table, pass `column.getToggleSortingHandler()`.                                                                                                                                                                            |
| `shouldShowTooltipOnHover` | `boolean`                               | `false`  | Wraps the header in a Tooltip. It only takes effect while `hover` is also `true`.                                                                                                                                                                                            |
| `shouldTruncate`           | `boolean`                               | `false`  | Keeps a long label on one line and truncates it with an ellipsis instead of wrapping.                                                                                                                                                                                        |
| `tooltipText`              | `string`                                | `""`     | The tooltip's title.                                                                                                                                                                                                                                                         |
| `tooltipSubtitle`          | `string`                                | -        | A second line below the tooltip's title.                                                                                                                                                                                                                                     |
| `tooltipProps`             | `Partial<TooltipProps>`                 | -        | Passed to the Tooltip, and overrides the defaults the header sets (arrow, top-start placement, dark style).                                                                                                                                                                  |

Anything else you pass, such as `colSpan`, `scope` or a data attribute, lands on the rendered `th`.
