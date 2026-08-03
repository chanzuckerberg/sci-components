# TooltipCondensed

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/TooltipCondensed/index.tsx).

## Import

**React TypeScript**

```tsx
import { TooltipCondensed } from "@czi-sds/components";
```

## Code examples

### Default TooltipCondensed

One line of text on a cell, which is all a condensed tooltip needs. Move across the cell to see it follow the cursor, the behaviour the component locks in and the reason it suits a chart.

**Example: DefaultTooltipCondensed**

```tsx
// The least a condensed tooltip needs: one line of text on something the pointer
// passes over. Move across the cell to see it follow the cursor, which is the
// behaviour the component locks in and the reason it suits a chart.

import {
  TooltipCondensed,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

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
        <TooltipCondensed title="1,284 cells">
          <Cell>A point in a chart</Cell>
        </TooltipCondensed>
      </Stage>
    </div>
  );
}

export default App;
```

### TooltipCondensed with indicator

A condensed tooltip on a table cell, with a coloured dot, and a second one in the lighter scheme. Both follow the pointer as it moves across the cell.

**Example: TooltipCondensedWithIndicator**

```tsx
// TooltipCondensed is the label-sized tooltip for dense surfaces: charts, table
// cells, anywhere a full sentence would be too much. It follows the cursor instead
// of anchoring to the element, and it locks that down: followCursor, placement,
// arrow, and the enter and leave delays are all applied after your props, so passing
// placement or arrow here changes nothing.
//
// indicator draws a 12px dot before the text, coloured by indicatorColor, for tying
// the tooltip to a series in a chart. indicatorColor takes a raw CSS colour rather
// than an SDS name, so read the one you want off the theme. Without it the dot is
// still laid out, just invisible.
//
// The second tooltip below asks for hasInvertedStyle={false}, the lighter scheme the
// design offers for dark backgrounds.

import {
  TooltipCondensed,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";

const Stage = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      gap: ${spaces?.xxl}px;
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
      align-items: center;
      border: 1px solid ${semanticColors?.base?.divider};
      border-radius: 4px;
      color: ${semanticColors?.base?.textPrimary};
      cursor: default;
      display: flex;
      gap: ${spaces?.xs}px;
      padding: ${spaces?.s}px ${spaces?.m}px;
    `;
  }}
`;

function App() {
  const theme = useTheme();
  const semanticColors = getSemanticColors({ theme });

  return (
    <div className="app">
      <Stage>
        <TooltipCondensed
          indicator
          indicatorColor={semanticColors?.info?.fillPrimary}
          title="1,284 cells"
        >
          <Cell>Hover a data point</Cell>
        </TooltipCondensed>

        <TooltipCondensed
          hasInvertedStyle={false}
          indicator
          indicatorColor={semanticColors?.negative?.fillPrimary}
          title="12 failed QC"
        >
          <Cell>Hover a point on a dark background</Cell>
        </TooltipCondensed>
      </Stage>
    </div>
  );
}

export default App;
```

## SDS vs MUI

TooltipCondensed is the SDS Tooltip with tighter padding and a fixed set of behaviors, for labelling something in a dense surface such as a chart or a table cell. It takes every Tooltip prop, including `hasInvertedStyle`, `subtitle` and `componentSlot`, and adds two of its own:

- `indicator`: draws a 12px round dot before the text, for tying the tooltip to a series in a chart or a colour in a legend.

- `indicatorColor`: the dot's colour, given as a CSS colour rather than an SDS name, so read the one you want off the theme. With `indicator` but no colour the dot still takes up its space and stays invisible.

Five props are applied after yours and so cannot be changed: `followCursor`, which is what makes the tooltip track the pointer rather than anchor to the element; `placement="right-end"`; `arrow={false}`; and `enterDelay` and `leaveDelay` of 50ms each, which keep it from flickering as the pointer crosses a dense chart. Passing a placement or an arrow of your own is silently ignored.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-tooltip/).

## Behavior and accessibility

- Because it follows the cursor, this tooltip is a pointer-only affordance. It still opens on focus, but it then appears wherever the pointer happens to be, so anything it says has to exist elsewhere for a keyboard or screen reader user.

- Keep the text to a label: a value, a count, a name. Full sentences belong in a Tooltip, and rows of numbers belong in a TooltipTable passed through `componentSlot`.

- The dot carries no meaning on its own. Whatever it encodes needs to be legible from the text beside it too.

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name               | Type        | Default | Description                                                                                   |
| ------------------ | ----------- | ------- | --------------------------------------------------------------------------------------------- |
| `title`            | `ReactNode` | -       | The label to show. Pass `null` when the content is coming through `componentSlot` instead.    |
| `indicator`        | `boolean`   | `false` | Draws a 12px round dot before the text.                                                       |
| `indicatorColor`   | `string`    | -       | The dot's colour, as a CSS colour. Without it the dot occupies its space but cannot be seen.  |
| `hasInvertedStyle` | `boolean`   | `true`  | Inherited from Tooltip. False gives the lighter scheme, which is what the table tooltip uses. |
| `componentSlot`    | `ReactNode` | -       | Inherited from Tooltip, and how a TooltipTable is placed inside a condensed tooltip.          |
