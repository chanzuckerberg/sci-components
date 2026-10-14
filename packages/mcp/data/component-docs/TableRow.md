# TableRow

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/TableRow/index.tsx).

## Import

**React TypeScript**

```tsx
import { TableRow } from "@czi-sds/components";
```

## Code examples

### **Default TableRow**

This example demonstrates the minimum required props for rendering a TableRow component.

**Example: DefaultTableRow**

```tsx
import { TableRow, CellBasic } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <table>
        <tbody>
          <TableRow>
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Secondary Text"
              shouldShowTooltipOnHover={false}
            />
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Secondary Text"
              shouldShowTooltipOnHover={false}
            />
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Secondary Text"
              shouldShowTooltipOnHover={false}
            />
          </TableRow>
        </tbody>
      </table>
    </div>
  );
}

export default App;
```

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name                       | Type                    | Default | Description                                                                                                                                                 |
| -------------------------- | ----------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`                 | `React.ReactNode`       | -       | Required. The row's cells.                                                                                                                                  |
| `disabled`                 | `boolean`               | `false` | Grays the row out and stops pointer events inside its CellComponents, so controls in the row cannot be used. Tags and icons in the row are dimmed to match. |
| `hover`                    | `boolean`               | `true`  | Gives the row a hover background, and is also required for its tooltip to appear. TableHeader sets it to `false` for the header row.                        |
| `rowHeight`                | `number`                | -       | Caps the row's height, in pixels.                                                                                                                           |
| `selected`                 | `boolean`               | `false` | Gives the row's cells the accent surface used for selection. It is styling only; it sets no ARIA state.                                                     |
| `shouldShowTooltipOnHover` | `boolean`               | `true`  | Wraps the row in a Tooltip, but only while `hover` is also `true`. On its own it shows nothing: a row tooltip needs `tooltipText` as well.                  |
| `tooltipText`              | `string`                | -       | The tooltip's title.                                                                                                                                        |
| `tooltipSubtitle`          | `string`                | -       | A second line below the tooltip's title.                                                                                                                    |
| `tooltipProps`             | `Partial<TooltipProps>` | -       | Passed to the Tooltip, and overrides the defaults the row sets (arrow, dark style).                                                                         |
| `useDivider`               | `boolean`               | `true`  | Draws the 1px divider along the bottom of the row.                                                                                                          |

Anything else you pass, such as `onClick`, `className` or a data attribute, lands on the rendered `tr`. Note that a row tooltip and a cell tooltip will both fire, so turn off `shouldShowTooltipOnHover` on the cells of a row that has its own.
