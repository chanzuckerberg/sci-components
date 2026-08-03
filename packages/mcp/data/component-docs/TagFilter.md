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

A row of applied filters, each removing itself from the page's state through `onDelete`. The row is a named group, which gives the identical "Delete Tag" buttons some context.

**Example: DefaultTagFilter**

```tsx
// TagFilter is the tag that comes off: onDelete is required, and removing the tag
// from your own state is what makes it disappear. Everything about how it looks is
// fixed (the accent fill, the square shape, and the small X), so there are no
// style props to pass.
//
// Both the tag and its X are focusable, so each filter is two tab stops: Backspace
// or Delete on the tag removes it, and so does Enter on the X.

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
      min-height: 28px;
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

  return (
    <div className="app">
      <Row aria-label="Applied filters" role="group">
        {filters.map((filter) => (
          <TagFilter
            key={filter}
            label={filter}
            onDelete={() =>
              setFilters((current) => current.filter((item) => item !== filter))
            }
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

TagFilter is built on the SDS Tag, and so on MUI's Chip, but it exists for one job: showing which Filters are applied and letting them be taken off again. It has one appearance and no style props:

- **onDelete is required.** MUI treats it as the switch that decides whether a chip can be deleted; here the delete control is always there, so the handler has to be. Removing the tag from your own state is what makes it disappear.

- **The look is fixed:** the accent fill, the square shape, the small semibold label and the 12px X. Tag's `sdsStyle`, `sdsType`, `sdsSize` and `color` are not part of the type, and MUI's `variant` is not either.

- **The X cannot be swapped:** SDS applies its own `deleteIcon` (an SDS Button holding the XMark icon) after your props, so a `deleteIcon` of your own is ignored without a warning.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-chip/).

## Behavior and accessibility

- There are two ways to remove a filter, and both are reachable from the keyboard: the X is a button that answers Enter, and the tag itself answers Backspace and Delete. That also means each filter tag is two tab stops.

- The X button is named "Delete Tag" on every filter tag, and the name cannot be changed. The label beside it is read as plain text rather than as part of the button, so a row of filters is worth wrapping in a group with a name of its own, to say what the buttons are removing. The example below uses `role="group"` with an `aria-label`.

- The tag carries `role="none presentation"`, so it contributes no semantics of its own. Adding an `onClick` does not change that: the tag becomes clickable to the pointer while still announcing nothing, so leave the clicking to the X.

- Like a Tag, a filter tag does not wrap: a long filter value is cut off with an ellipsis. Keep the values short, or shorten them yourself so the part that survives is the part that matters.

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name       | Type              | Default      | Description                                                                                                                                                              |
| ---------- | ----------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `label`    | `string`          | - (required) | The filter's text. Cut off with an ellipsis when there is not room for it.                                                                                               |
| `onDelete` | `(event) => void` | - (required) | Runs when the X is clicked or activated, and when Backspace or Delete is pressed on the tag. Drop the filter from your state here; the component does not remove itself. |
