# TooltipTable

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/TooltipTable/index.tsx).

## SDS vs MUI

TooltipTable is not a tooltip. It is the content that goes inside one: a two-column table of labels and values built on MUI's Table, exported as _TooltipTable_ and named _TooltipTableContent_ in the source. It has no trigger, no hover behavior and no popper of its own, so it does nothing on its own. Pass it to a tooltip's _componentSlot_ and let the tooltip do the showing. What it adds:

- **data:** the sections. Each one takes a _label_, a list of _dataRows_ of label and value, and an optional _disabled_ flag. Sections are separated by a divider, in the order given.

- **itemAlign:** whether the values sit at the right of their column, which lines numbers up, or at the left.

- **showSectionHeader:** whether the section labels are drawn at all. The dividers stay either way.

- **contentAlert:** a line above the whole table, as a string or an element, for a caveat about the numbers below it.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-table/).

## Behavior and accessibility

- Put it in _componentSlot_, not _title_. A tooltip wraps its title in a paragraph, and a table inside a paragraph is invalid HTML that React reports as an error in the console.

- Give the tooltip _hasInvertedStyle={false}_. The table is designed for a light surface, which is what the design shows and what keeps the section labels readable.

- The table asks for at least 224px and a tooltip stops at 250px, so there is almost no slack: long row labels wrap and push the table into a scrollbar. Keeping labels to a word or two matters more here than anywhere else. _width="wide"_ on the tooltip buys room for a table that genuinely needs it.

- A disabled section is drawn in the disabled text colour and nothing more: it is still read out in full, so the reason it is dimmed has to come from somewhere else, such as the contentAlert above it.

- Everything in a tooltip disappears with the pointer, and a real table of numbers is often worth putting on the page instead.

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name              | Type                                                                                                    | Default | Description                                                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| data              | Array<{ label?: string; dataRows: { label: string; value: string \| number; }[]; disabled?: boolean; }> | -       | The sections, drawn in order and separated by dividers. A section's label heads it, its dataRows fill it, and disabled greys the whole block. |
| itemAlign         | "left" \| "right"                                                                                       | "right" | Which side of its column each value sits on. Right lines numbers up with each other.                                                          |
| showSectionHeader | boolean                                                                                                 | true    | Whether section labels are drawn. False hides all of them; the dividers between sections stay.                                                |
| contentAlert      | string \| JSX.Element                                                                                   | -       | A note above the whole table, for a caveat about the numbers. Takes an element, so it can hold a link.                                        |

## Code examples

### Default TooltipTable

The table inside a condensed tooltip in the lighter scheme, which is what pairs it with a chart or a table cell that the pointer moves across.

**Example: DefaultTooltipTable**

```tsx
// TooltipTable is not a tooltip. It is the content (a two-column table of labels
// and values, grouped into sections) that goes inside one.
//
// It belongs in componentSlot rather than title, because title wraps whatever it is
// given in a paragraph, and a table inside a paragraph is invalid HTML that React
// complains about. Pair it with TooltipCondensed so the table follows the cursor,
// which is how it is meant to behave over a chart or a table cell, and with
// hasInvertedStyle={false} so the numbers sit on a light surface.
//
// The table asks for at least 224px and the tooltip caps out at 250px, so the two
// only just fit. Long labels are what break the layout first, so keep them short.

import {
  TooltipCondensed,
  TooltipTable,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const DATA = [
  {
    dataRows: [
      { label: "Cells", value: "1,284" },
      { label: "Median genes", value: "2,105" },
      { label: "Mito. reads", value: "4.2%" },
    ],
    label: "Sample",
  },
  {
    dataRows: [
      { label: "Depth", value: "34x" },
      { label: "Duplicates", value: "8.1%" },
    ],
    label: "Sequencing",
  },
];

const Stage = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      justify-content: center;
      padding: ${spaces?.xl}px 0;
    `;
  }}
`;

const Cell = styled.div<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      border: 1px solid ${semanticColors?.base?.divider};
      border-radius: 4px;
      color: ${semanticColors?.base?.textPrimary};
      cursor: default;
      padding: ${spaces?.s}px ${spaces?.m}px;
    `;
  }}
`;

function App() {
  return (
    <div className="app">
      <Stage>
        <TooltipCondensed
          componentSlot={<TooltipTable data={DATA} itemAlign="right" />}
          hasInvertedStyle={false}
          title={null}
        >
          <Cell>Hover for the sample summary</Cell>
        </TooltipCondensed>
      </Stage>
    </div>
  );
}

export default App;
```
