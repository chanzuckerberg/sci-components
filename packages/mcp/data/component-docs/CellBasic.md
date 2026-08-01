# CellBasic

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/CellBasic/index.tsx).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name                           | Type                                          | Default | Description                                                                                                                                                                                                            |
| ------------------------------ | --------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| as                             | React.ElementType                             | "td"    | The element the cell renders as. Use "th" for a row header cell inside tbody.                                                                                                                                          |
| extraRightPadding              | number                                        | 0       | Extra pixels of right padding, added only when horizontalAlign is "right". Useful for leaving room for a scrollbar or a pinned column edge.                                                                            |
| horizontalAlign                | "left" \| "right"                             | "left"  | Horizontal alignment of cell content. There is no "center" — use CellComponent if a cell needs centered content.                                                                                                       |
| icon                           | React.ReactElement<CustomSVGProps>            | -       | Places an icon to the left of the cell text. Expects an SDS Icon or another SVG element.                                                                                                                               |
| link                           | string                                        | -       | Wraps the cell content in an anchor pointing here. The text keeps the cell's own color rather than link styling.                                                                                                       |
| linkComponent                  | React.ElementType                             | -       | The component the link renders as, for routers that supply their own link (React Router's Link, for example).                                                                                                          |
| linkProps                      | React.AnchorHTMLAttributes<HTMLAnchorElement> | -       | Props passed to the anchor rendered by link.                                                                                                                                                                           |
| iconVerticalAlign              | "top" \| "center" \| "bottom"                 | "top"   | Vertical alignment of the icon component.                                                                                                                                                                              |
| primaryText                    | string                                        | -       | Primary text value.                                                                                                                                                                                                    |
| primaryTextWrapLineCount       | number                                        | 3       | Number of text wrap lines for primary text.                                                                                                                                                                            |
| primaryTextComponentSlotBottom | ReactNode                                     | null    | Component slot below primary text. This will only show if there is no secondary or tertiary text. Remove the default values of secondary and tertiary text to see this in action.                                      |
| primaryTextComponentSlotRight  | ReactNode                                     | null    | Component slot to the right of primary text                                                                                                                                                                            |
| secondaryText                  | string                                        | -       | Secondary Text.                                                                                                                                                                                                        |
| secondaryTextWrapLineCount     | number                                        | 1       | Number of text wrap lines for secondary text.                                                                                                                                                                          |
| tertiaryText                   | string                                        | -       | Tertiary Text.                                                                                                                                                                                                         |
| tertiaryTextWrapLineCount      | number                                        | 1       | Number of text wrap lines for tertiary text.                                                                                                                                                                           |
| shouldShowTooltipOnHover       | boolean                                       | true    | When true the cell is wrapped in a Tooltip whose title is primaryText and whose subtitle is secondaryText. Turn it off for cells whose text is already fully visible, otherwise every cell in the table has a tooltip. |
| shouldShowUnderlineOnHover     | boolean                                       | false   | Underlines primaryText on hover. Inside a PreComposedTable the underline also appears when any cell in the row is hovered.                                                                                             |
| shouldTextWrap                 | boolean                                       | true    | When true, each text clamps to its wrap line count. When false, text stays on one line and truncates with an ellipsis instead.                                                                                         |
| tabularNums                    | boolean                                       | false   | Renders digits at a fixed width so numbers line up column to column. Worth turning on for any numeric column.                                                                                                          |
| tooltipProps                   | Partial<TooltipProps>                         | -       | Passed to the Tooltip, and overrides the defaults the cell sets (title, subtitle, arrow, dark style, no leave delay).                                                                                                  |
| verticalAlign                  | "top" \| "center" \| "bottom"                 | "top"   | Vertical alignment of the cell content.                                                                                                                                                                                |

Anything else you pass, such as colSpan, style or a data attribute, lands on the rendered td.

## Code examples

### Default CellBasic

This example demonstrates the minimum required props for rendering a CellBasic component.

**Example: DefaultCellBasic**

```tsx
import { CellBasic } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <table>
        <tbody>
          <tr>
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Secondary Text"
            />
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

### CellBasic with Icon and Text Wrap

This example highlights a CellBasic component featuring an SDS icon and lengthy texts for Primary, Secondary, and Tertiary content, all thoughtfully wrapped for optimal presentation.

**Example: CellBasicWithIconAndTextWrap**

```tsx
import { CellBasic, Icon } from "@czi-sds/components";

function App() {
  const TableCellStyle = {
    maxWidth: 160,
    width: 160,
  };

  return (
    <div className="app">
      <table>
        <tbody>
          <tr>
            <CellBasic
              primaryText="Primary Text that is longer than expected."
              secondaryText="Secondary Text that is londer than expected."
              tertiaryText="Tertiary Text that is lonegrt than expected."
              icon={<Icon sdsIcon="Bacteria" sdsSize="l" color="yellow" />}
              style={TableCellStyle}
              tooltipProps={{
                hasInvertedStyle: false,
                placement: "right",
              }}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
```
