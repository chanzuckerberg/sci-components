# TagFilter

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/TagFilter/index.tsx).

## Import

**React TypeScript**

```tsx
import { TagFilter } from "@czi-sds/components";
```

## Code examples

### Default TagFilter

A row of applied filters, solid and outlined, each removing itself from the page's state through `onDelete`. The row is a named group, which tells screen reader users what the chips are removing.

**Example: DefaultTagFilter**

```tsx
// TagFilter is the chip that comes off: onDelete is required, and removing the
// chip from your own state is what makes it disappear. The whole chip is the
// remove control, so a click anywhere on it, Enter or Space, and Backspace or
// Delete all call onDelete.
//
// Each chip is one tab stop, named "Remove" followed by its label. sdsStyle picks
// between the solid accent fill and the outlined one.

import {
  TagFilter,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const FILTERS = ["Homo sapiens", "Lung", "10x 3' v3", "Healthy"];

const Row = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.s}px;
      margin-bottom: ${spaces?.m}px;
      min-height: 24px;
    `;
  }}
`;

const Readout = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: 0;
    `;
  }}
`;

function App() {
  const [filters, setFilters] = useState(FILTERS);

  const remove = (filter: string) =>
    setFilters((current) => current.filter((item) => item !== filter));

  return (
    <div className="app">
      <Row aria-label="Applied filters" role="group">
        {filters.map((filter, index) => (
          <TagFilter
            key={filter}
            label={filter}
            onDelete={() => remove(filter)}
            sdsStyle={index % 2 === 0 ? "solid" : "outline"}
          />
        ))}
      </Row>

      <Readout>
        {filters.length > 0
          ? `${filters.length} of ${FILTERS.length} filters applied`
          : "No filters applied"}
      </Readout>
    </div>
  );
}

export default App;
```

## SDS vs MUI

TagFilter is the design's Chip. It is built on the SDS Tag, and so on MUI's Chip, but it exists for one job: showing which Filters are applied and letting them be taken off again:

- **onDelete is required.** MUI treats it as the switch that decides whether a chip can be deleted; here removal is the chip's whole purpose, so the handler has to be there. Removing the chip from your own state is what makes it disappear.

- **The whole chip removes it:** a click anywhere on the chip calls `onDelete`, not only a click on the X. An `onClick` of your own runs first.

- `sdsStyle`: `"solid"` (default) fills the chip with the accent color; `"outline"` tints it and draws the label, the X and a 1px border in the accent color. Everything else about the look is fixed: the accent intent, the medium size, the 4px corners and the 12px X. Tag's `color`, `size`, `href` and `showLinkIcon` are not part of the type.

- **The X cannot be swapped:** SDS applies its own `deleteIcon` after your props, so a `deleteIcon` of your own is ignored without a warning.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-chip/).

## Behavior and accessibility

- Each chip is a single button and a single tab stop. It answers a click, Enter and Space, and also Backspace and Delete, and every one of them calls `onDelete`. The X is decorative and hidden from screen readers.

- The chip is named "Remove" followed by its label, such as "Remove Lung", so the name says what activating it does. Pass `aria-label` to word it differently, for instance in another language. A row of filters is still worth wrapping in a group with a name of its own; the example below uses `role="group"` with an `aria-label`.

- Removing a chip takes the focused element out of the page, so move focus somewhere sensible afterwards, such as the next chip or the filter control that added it.

- Like a Tag, a chip does not wrap: a long filter value is cut off with an ellipsis. Keep the values short, or shorten them yourself so the part that survives is the part that matters.

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name         | Type                     | Default            | Description                                                                                                                                                                                                                                         |
| ------------ | ------------------------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`      | `string`                 | - (required)       | The filter's text. Cut off with an ellipsis when there is not room for it.                                                                                                                                                                          |
| `onDelete`   | `function`               | - (required)       | Runs when the chip is clicked or activated with Enter or Space, and when Backspace or Delete is pressed on it. Drop the filter from your state here; the component does not remove itself. **Signature:** `function(event: SyntheticEvent) => void` |
| `sdsStyle`   | `"solid"` \| `"outline"` | `"solid"`          | `solid` fills the chip with the accent color. `outline` tints it and draws the label, the X and a 1px border in the accent color.                                                                                                                   |
| `aria-label` | `string`                 | `"Remove {label}"` | The chip's accessible name, "Remove" followed by the label unless set. Override it to word the removal differently.                                                                                                                                 |
