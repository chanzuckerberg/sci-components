# Legend

A wrapping row of colored swatches and labels, for naming the parts of a chart and, optionally, filtering it.

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/Legend).

## Import

**React TypeScript**

```tsx
import { Legend } from "@czi-sds/components";
```

## Code examples

### **Default Legend**

The minimum: a list of names, each with a color. Nothing here is interactive, which is how the legend reads when it is only a key.

**Example: DefaultLegend**

```tsx
// A legend on its own is a key: a swatch and a name for each part of whatever it
// sits next to. Items are drawn in the order they are given, and the row wraps
// to as many lines as the container needs, so the container is what decides how
// wide the legend is.
//
// Nothing here is interactive. Items are still buttons for the sake of the
// legends that are, so a click lands on one and does nothing.

import { Legend } from "@czi-sds/components";

const ITEMS = [
  { color: "#0B6CCC", name: "H. sapiens" },
  { color: "#3E8F3E", name: "M. musculus" },
  { color: "#9A54C1", name: "D. rerio" },
  { color: "#C9721A", name: "M. mulatta" },
];

function App() {
  return (
    <div className="app">
      <div style={{ maxWidth: "400px" }}>
        <Legend items={ITEMS} />
      </div>
    </div>
  );
}

export default App;
```

### Values and colors

Values turned on, and the two ways to color the swatches: a palette passed as `colors`, and a color on each item. The last item is disabled, which is how a catch-all category sits in the legend without behaving like the rest.

**Example: LegendValuesAndColors**

```tsx
// Two ways to color a legend, and what showValues does to it.
//
// The colors prop is a palette for the set as a whole, applied by index. It is
// what generateDiscreteColors produces, and it has to be regenerated when the
// theme changes, since the generator reverses its ramp for dark mode. A color on
// the item itself is the opposite case: a category that has to look the same
// everywhere it appears.
//
// Values are formatted for you when they are numbers, and printed as given when
// they are strings, which is how a percentage or a unit gets in. The last item
// on the right is disabled: it is drawn like the others but takes no hover, no
// click, and does not dim when its neighbours are selected, which is what a
// catch-all category usually wants.

import {
  Legend,
  fontBodyXs,
  generateDiscreteColors,
  getMode,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type SDSTheme,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material";

const COUNTS = [
  { name: "H. sapiens", value: 3212 },
  { name: "M. musculus", value: 130 },
  { name: "C. jacchus", value: 89 },
  { name: "D. rerio", value: 65 },
  { name: "M. mulatta", value: 45 },
];

const SHARES = [
  { color: "#0B6CCC", name: "Passed", value: "68%" },
  { color: "#F5C700", name: "Flagged", value: "19%" },
  { color: "#C41E3A", name: "Failed", value: "8%" },
  { disabled: true, name: "Not run", value: "5%" },
];

const Row = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.xxl}px;
    `;
  }}
`;

const Caption = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: 0 0 ${spaces?.s}px;
    `;
  }}
`;

function App() {
  const theme = useTheme() as SDSTheme;
  const colors = generateDiscreteColors(COUNTS.length, {
    isDarkMode: getMode({ theme }) === "dark",
  });

  return (
    <div className="app">
      <Row>
        <div style={{ maxWidth: "320px" }}>
          <Caption>A generated palette, with counts</Caption>
          <Legend colors={colors} items={COUNTS} showValues />
        </div>

        <div style={{ maxWidth: "320px" }}>
          <Caption>A color on each item, with shares</Caption>
          <Legend items={SHARES} showValues />
        </div>
      </Row>
    </div>
  );
}

export default App;
```

### Selection

Selection lives in the parent, so the same state can filter a list beside the legend. The buttons are not just a convenience: clicking an item is pointer-only, so they are how a keyboard reaches the selection at all.

**Example: SelectableLegend**

```tsx
// Selection is controlled: the legend draws whatever selectedIndices holds and
// asks the parent to change it through onSelectionChange, which is called with
// the clicked index toggled in or out. Because the state lives in the parent,
// the same selection can drive something else on the page. Here, that is the
// list of datasets beside it.
//
// Selected items keep a filled background and their swatch at full opacity,
// while everything unselected fades. Hovering wins over that for as long as the
// pointer is on the row.
//
// Clicking an item is pointer-only: items are buttons and take focus, but they
// do not respond to Enter or Space. The buttons below are what let a keyboard
// change the selection at all.

import { useState } from "react";
import {
  Button,
  Legend,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const ITEMS = [
  { color: "#0B6CCC", name: "Transcriptomic", value: 117 },
  { color: "#3E8F3E", name: "Prosthetics", value: 130 },
  { color: "#9A54C1", name: "Epigenomics", value: 100 },
  { color: "#C9721A", name: "Imaging", value: 61 },
];

const Stack = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-direction: column;
      gap: ${spaces?.l}px;
      max-width: 420px;
    `;
  }}
`;

const Controls = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      gap: ${spaces?.s}px;
    `;
  }}
`;

const Caption = styled.p<CommonThemeProps>`
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
  const [selectedIndices, setSelectedIndices] = useState<number[]>([1]);

  const summary = selectedIndices.length
    ? selectedIndices.map((index) => ITEMS[index].name).join(", ")
    : "Nothing selected: showing all modalities.";

  return (
    <div className="app">
      <Stack>
        <Legend
          items={ITEMS}
          onSelectionChange={setSelectedIndices}
          selectedIndices={selectedIndices}
          showValues
        />

        <Controls>
          <Button
            onClick={() => setSelectedIndices(ITEMS.map((_, index) => index))}
            sdsStyle="outline"
            sdsType="primary"
          >
            Select all
          </Button>
          <Button
            disabled={selectedIndices.length === 0}
            onClick={() => setSelectedIndices([])}
            sdsStyle="minimal"
            sdsType="secondary"
          >
            Clear
          </Button>
        </Controls>

        <Caption>{summary}</Caption>
      </Stack>
    </div>
  );
}

export default App;
```

### Hover synced with a chart

`hoveredIndex` and the hover callbacks wired in both directions, so pointing at a bar highlights its legend item and pointing at a legend item highlights the bar.

**Example: LegendWithChartHover**

```tsx
// The legend describes a chart it knows nothing about, so keeping the two in
// step is the parent's job, and it takes both halves of the hover API.
//
// Pointing at a bar sets hoveredIndex, which highlights the matching legend
// item. Pointing at a legend item fires onItemMouseEnter, which the parent turns
// into a highlight on the bar. hoveredIndex only ever adds a highlight (the
// legend still tracks its own hover, and null means "nothing from outside"
// rather than "clear it"), so the two never fight over the same item.
//
// The bar here is four divs sized by flex-grow, deliberately plain: it stands in
// for whatever chart the legend is a key to. For a real stacked bar, reach for
// StackedBarChart from @czi-sds/data-viz, which renders this legend itself.

import { useState } from "react";
import {
  Legend,
  getCorners,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const ITEMS = [
  { color: "#0B6CCC", name: "Transcriptomic", value: 117 },
  { color: "#3E8F3E", name: "Prosthetics", value: 130 },
  { color: "#9A54C1", name: "Epigenomics", value: 100 },
  { color: "#C9721A", name: "Imaging", value: 61 },
];

const TOTAL = ITEMS.reduce((sum, item) => sum + item.value, 0);

const Stack = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-direction: column;
      gap: ${spaces?.m}px;
      max-width: 420px;
    `;
  }}
`;

const Bar = styled.div<CommonThemeProps>`
  ${(props) => {
    const corners = getCorners(props);
    const spaces = getSpaces(props);

    return `
      display: flex;
      gap: ${spaces?.xxxs}px;
      height: 16px;
      overflow: hidden;
      border-radius: ${corners?.s}px;
    `;
  }}
`;

const Segment = styled.div`
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
`;

function App() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="app">
      <Stack>
        <Bar>
          {ITEMS.map((item, index) => (
            <Segment
              key={item.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                backgroundColor: item.color,
                flexGrow: item.value / TOTAL,
                opacity:
                  hoveredIndex === null || hoveredIndex === index ? 1 : 0.2,
              }}
            />
          ))}
        </Bar>

        <Legend
          hoveredIndex={hoveredIndex}
          items={ITEMS}
          onItemMouseEnter={(_, index) => setHoveredIndex(index)}
          onItemMouseLeave={() => setHoveredIndex(null)}
          showValues
        />
      </Stack>
    </div>
  );
}

export default App;
```

## How it is built

Legend has no MUI base. It is a flex row of divs that wraps, where each item is a swatch, a label, and an optional value, styled from SDS spacing and semantic colors. It draws nothing but itself: it holds no chart, and it is up to the page to keep the legend and whatever it describes in the same order and the same colors.

It is also what StackedBarChart renders below its bar. Reach for Legend directly when the chart is your own (an ECharts plot, a map, a set of swatches in a table) and you want its key to match the rest of the system.

## Items and colors

`items` is the whole content of the legend, drawn in the order given. Each item needs a `name` and may carry a `value`, a `color`, and `disabled`. An item's index is its identity everywhere else in the API: selection, hover, and every callback are indices into this array. Items are therefore positional and names need not be unique.

A swatch takes the first color it finds: the entry at its index in the `colors` prop, then the item's own `color`, then a grey fallback from the theme. The `colors` prop is for a palette computed for the whole set at once, which is what `generateDiscreteColors` produces and what needs regenerating when the theme changes; a color on the item is for a category that must always look the same. A short colors array is fine, since each index falls through on its own.

Values are only drawn when `showValues` is on and the item has one. Numbers go through `toLocaleString`, so 3212 reads as "3,212"; strings are printed as given, which is the way to show a percentage, a unit, or a range.

## Selection and hover

Selection is controlled. The legend draws whatever `selectedIndices` holds and never changes it: clicking an item calls `onSelectionChange` with that index toggled in or out, and the parent decides what to do with it. Without the callback the legend is inert: clicks still reach `onItemClick`, but nothing is ever selected.

Once anything is selected, the swatches of unselected items drop to 20% opacity. Hovering overrides that while the pointer is down the row: the hovered item and the selected ones stay solid, everything else dims. Labels never dim, so the legend stays readable as a list whatever is highlighted.

`hoveredIndex` lets a chart highlight a legend item as the pointer moves over the matching mark, and `onItemMouseEnter` / `onItemMouseLeave` drive the same thing in the other direction. It only ever adds a highlight: the legend keeps its own hover state, and passing `null` is the same as not passing the prop at all rather than a way to clear one.

## Behavior and accessibility

- Each item is a `role="button"` with a tab stop and an accessible name built from its label and value, and it reports its selected state through `aria-pressed`. It does not respond to Enter or Space, though, so a keyboard reaches the legend but cannot select from it. Where selection matters, give the page a keyboard path of its own, as the selection example below does with buttons.

- Every item is a button whether or not anything listens, so a legend used purely as a key still invites a click that does nothing. That is worth weighing against the alternative of drawing the key by hand.

- Color is the only thing tying an item to the mark it names. Where the marks are close in hue, or the chart is read by someone who cannot separate them, the values in the legend are what make it interpretable, which is a reason to turn `showValues` on rather than leave it to the chart.

- A disabled item takes no pointer events at all: no hover, no click, no dimming when its neighbours are selected. It is drawn exactly like the others, so anything a reader should know about it has to be in its name: "Other (17)", "Remaining". It also keeps its tab stop out of the tab order.

- The legend wraps to as many rows as it needs and has no width of its own, so it takes the width of its container. Constrain that container to keep it the same width as the chart it belongs to.

## Props

The legend spreads any remaining props onto its root div, so standard HTML attributes such as `className`, `id`, and `data-testid` work as usual.

| Name                                  | Type                          | Default      | Description                                                                                                                                                       |
| ------------------------------------- | ----------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`                               | `LegendItemData[]`            | - (required) | The items, drawn in order. Their indices are what selection, hover, and the callbacks refer to. See the table below for the shape of an item.                     |
| `colors`                              | `string[]`                    | -            | A palette applied by index, taking priority over the color on an item. Entries past the end of the array fall back to the item's color, then to grey.             |
| `showValues`                          | `boolean`                     | `false`      | Draws each item's value beside its name. Items without a value are unaffected.                                                                                    |
| `selectedIndices`                     | `number[]`                    | `[]`         | Indices of the selected items. The legend is controlled: it draws this and never changes it.                                                                      |
| `onSelectionChange`                   | `(indices: number[]) => void` | -            | Called with the next selection when an item is clicked, with that index toggled. Without it, clicking selects nothing.                                            |
| `hoveredIndex`                        | `number \| null`              | -            | Highlights an item from outside, for syncing with a chart. It adds to the legend's own hover rather than replacing it, and `null` reads as no external highlight. |
| `onItemClick`                         | `(item, index) => void`       | -            | Fires on a click, alongside any selection change rather than instead of it.                                                                                       |
| `onItemMouseEnter` `onItemMouseLeave` | `(item, index) => void`       | -            | Hover on an item. The legend already dims its own swatches; these are for driving something outside it, such as a highlight on the chart.                         |

### LegendItemData

| Name       | Type               | Default      | Description                                                                                                                                  |
| ---------- | ------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`     | `string`           | - (required) | The item's label, and the start of its accessible name. Names need not be unique, since items are addressed by index.                        |
| `value`    | `number \| string` | -            | Shown after the name when `showValues` is on. Numbers are grouped by locale; a string is printed as given, for a unit or a percentage.       |
| `color`    | `string`           | theme grey   | Any CSS color for the swatch. The `colors` prop overrides it, and without either the swatch is drawn in the theme's secondary ornament grey. |
| `disabled` | `boolean`          | `false`      | Takes the item out of every interaction and out of the tab order, and keeps its swatch at full opacity while others dim.                     |
