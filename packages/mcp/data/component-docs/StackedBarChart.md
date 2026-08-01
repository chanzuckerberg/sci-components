# StackedBarChart

A single horizontal bar split into labelled segments, for showing what a total is made of.

**Ships separately:** StackedBarChart comes from @czi-sds/data-viz, not @czi-sds/components. See the Data Viz overview for installation and peer dependencies.

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/data-viz/src/core/StackedBarChart/index.tsx).

## How it is built

Unlike HeatmapChart, this chart does not use ECharts. It is plain DOM: the bar is a flex row of divs whose flex-grow carries each segment's share, so the chart inherits SDS colors and spacing directly and animates with CSS. Two things come from @czi-sds/components: the Legend below the bar, and the TooltipTable a segment opens when its data item carries a tooltip.

## Modes

**mode** decides what the full width of the bar means, and it is the first thing to settle when adding the chart.

- **proportional** (the default) treats the data as the whole. Segments are sized against the sum of the values and always fill the bar, so the chart reads as a breakdown: how the total splits, not how large it is.

- **cumulative** sizes segments against _maxAmount_ instead, so the bar reads as progress towards a known total. When the values add up to less than maxAmount, the gap is drawn as a grey "Remaining" segment, which is labelled with _remainingLabel_ and is never interactive. Leaving maxAmount off makes the mode behave like proportional, since the sum becomes the maximum and no gap is left.

Values are only ever shown in the legend, never on the bar, and only when **showLegendValues** is on. In proportional mode the natural format is the default _percentage_; a cumulative bar usually wants _legendValueFormat="count"_ with a _unit_, so the legend reads "117 datasets" rather than a share of a total the reader cannot see.

## Selection

Selection is controlled: the chart renders whatever **selectedIndices** holds and never changes it itself. Clicking a segment or a legend item calls **onSelectionChange** with the indices it thinks should be selected next, and the parent decides what to do with them. Without that callback the chart is inert — clicks still reach _onSegmentClick_ and _onLegendItemClick_, but nothing is ever selected.

**selectionBehavior** chooses what a selection does to the bar. _dim_ drops everything unselected to 20% opacity, keeping the shape of the whole intact. _hide_ removes unselected segments instead: in proportional mode the remaining ones regrow to fill the bar, and in cumulative mode they keep their size and the Remaining segment absorbs the difference.

The badge beside the title tracks all of this on its own — the total when nothing is selected, "3 of 7" during a partial selection — unless you pass **badge** to say otherwise or **hideBadge** to remove it. It is drawn only when there is a **title** to sit next to.

## Behavior and accessibility

- Legend items are the accessible way into the chart. Each is a _role="button"_ with a tab stop and an accessible name built from its label and value, and it reports its selected state through _aria-pressed_. They do not respond to Enter or Space, though, so keyboard users can reach the legend but cannot select from it. Where selection matters, give the chart a keyboard path of its own, as the example below does with a button.

- Bar segments are pointer-only: they carry no role and take no focus, so everything they offer — hover, click, tooltip — has to be reachable somewhere else too. They are also thin by default (16px), which makes them a small target.

- Nothing about a segment is conveyed by anything except its color, so the legend is what makes the chart readable. Turning **showLegend** off leaves a bar that cannot be interpreted at all unless the surrounding page names the parts.

- Colors are generated when data items do not carry their own, using the cubehelix palette from generateDiscreteColors and adapting to the light and dark themes. The palette is regenerated whenever a new category appears, so a category's color is stable while the data holds still but not across datasets. Pass **color** on each item where a category must always look the same, or tune the generated set with **colorGeneratorOptions**.

- Segments are keyed by **name**, which is what lets them animate in, out, and resize when the data changes. Two items sharing a name confuse that tracking, so names must be unique within a chart.

- A data item may set **disabled** to opt out of every interaction, on both its segment and its legend item. Passing an empty **data** array is safe: the bar is drawn as an empty grey track.

## Props

The chart spreads any remaining props onto its root div, so standard HTML attributes such as className, id, and data-testid work as usual.

| Name                                          | Type                                                          | Default             | Description                                                                                                                                                |
| --------------------------------------------- | ------------------------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data                                          | StackedBarChartDataItem[]                                     | - (required)        | The segments, in the order they are drawn. See the table below for the shape of an item.                                                                   |
| mode                                          | "proportional" \| "cumulative"                                | "proportional"      | Whether the bar shows a breakdown of the data (segments always fill it) or progress towards maxAmount.                                                     |
| maxAmount                                     | number                                                        | sum of values       | Cumulative mode only. The value the full bar represents. Any difference between it and the sum of the data is drawn as the Remaining segment.              |
| title                                         | string                                                        | -                   | A heading above the bar. It is also what makes room for the badge; with no title, no badge is drawn.                                                       |
| badge                                         | string                                                        | the selection count | Overrides the badge text, which otherwise counts the data and the selection ("7", or "3 of 7").                                                            |
| hideBadge                                     | boolean                                                       | false               | Removes the badge, leaving the title on its own.                                                                                                           |
| width                                         | number \| string                                              | "100%"              | Any CSS width; a number is read as pixels. It sets the width of the whole chart, legend included.                                                          |
| barHeight                                     | number                                                        | 16                  | Height of the bar in pixels. Values below 1 are clamped to 1, so the bar cannot disappear.                                                                 |
| showLegend                                    | boolean                                                       | true                | Draws the legend below the bar. It is the only place segment names appear, and the only part of the chart a keyboard can reach.                            |
| showLegendValues                              | boolean                                                       | true                | Shows each item's value beside its name in the legend.                                                                                                     |
| legendValueFormat                             | "percentage" \| "count"                                       | "percentage"        | percentage shows the segment's share of the bar, rounded. count shows the raw value followed by the item's unit, or the chart's unit if the item has none. |
| unit                                          | string                                                        | -                   | The unit appended to counted values, for items that do not carry one of their own.                                                                         |
| remainingLabel                                | string                                                        | "Remaining"         | Name of the grey gap segment in cumulative mode.                                                                                                           |
| remainingUnit                                 | string                                                        | the chart's unit    | A unit for the Remaining segment's value alone.                                                                                                            |
| selectedIndices                               | number[]                                                      | []                  | Indices into data that are currently selected. The chart is controlled: it draws this and never changes it.                                                |
| onSelectionChange                             | (indices: number[], items: StackedBarChartDataItem[]) => void | -                   | Called with the next selection when a segment or legend item is clicked. Without it, clicking selects nothing.                                             |
| selectionBehavior                             | "dim" \| "hide"                                               | "dim"               | What a selection does to the unselected segments: fade them to 20% opacity, or drop them from the bar and let the rest take the space.                     |
| colorGeneratorOptions                         | DiscreteColorGeneratorOptions                                 | -                   | Tunes the generated palette (start hue, rotations, lightness range, gamma). Items with their own color are untouched by it.                                |
| onSegmentClick                                | (item, index) => void                                         | -                   | Fires on a segment click, alongside any selection change rather than instead of it.                                                                        |
| onLegendItemClick                             | (item, index) => void                                         | -                   | The same, for a click on a legend item.                                                                                                                    |
| onSegmentMouseEnter onSegmentMouseLeave       | (item, index) => void                                         | -                   | Hover on the bar. The chart already syncs its own hover highlight between bar and legend; these are for driving something outside it.                      |
| onLegendItemMouseEnter onLegendItemMouseLeave | (item, index) => void                                         | -                   | The same, for hover on a legend item.                                                                                                                      |

### StackedBarChartDataItem

| Name     | Type                     | Default          | Description                                                                                                                                   |
| -------- | ------------------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| name     | string                   | - (required)     | The segment's label in the legend, and the key the animations track it by. Must be unique within the chart.                                   |
| value    | number                   | - (required)     | The quantity the segment stands for.                                                                                                          |
| color    | string                   | generated        | Any CSS color. Without it the segment takes a generated palette color, which can shift as categories come and go.                             |
| unit     | string                   | the chart's unit | A unit for this item's counted value, for data that mixes units across categories.                                                            |
| disabled | boolean                  | false            | Takes the segment and its legend item out of every interaction: no hover, no tooltip, no selection.                                           |
| tooltip  | TooltipTableContentProps | -                | Content for a TooltipTable shown above the segment on hover. Use it for the breakdown behind the number; a segment without it has no tooltip. |

## Code examples

### **Default StackedBarChart**

A proportional bar: values become shares of the whole, the legend reads them as percentages, and the badge counts the categories.

**Example: DefaultStackedBarChart**

```tsx
// Data and a width are all the chart needs. In the default proportional mode
// the values become shares of their own sum, so the segments always fill the
// bar, and the legend reads them back as rounded percentages.
//
// The title is what makes room for the badge beside it, which counts the
// categories on its own until something is selected.

import { StackedBarChart } from "@czi-sds/data-viz";

const DATA = [
  { name: "Transcriptomic", value: 117 },
  { name: "Prosthetics", value: 130 },
  { name: "Epigenomics", value: 100 },
  { name: "Spatial Transcriptomics", value: 78 },
  { name: "Imaging", value: 61 },
  { name: "Sequencing", value: 34 },
];

function App() {
  return (
    <div className="app">
      <StackedBarChart data={DATA} title="Modality" width="420px" />
    </div>
  );
}

export default App;
```

### Cumulative mode

The same data measured against a known maximum, so the bar reads as progress and the gap left over is drawn as Remaining. Counted values need a unit to mean anything.

**Example: CumulativeStackedBarChart**

```tsx
// The same data read against a known total instead of its own sum. maxAmount
// is what the full bar stands for, so the segments no longer fill it and the
// gap becomes the grey Remaining segment, which nothing can interact with.
//
// A share of a total the reader cannot see means little, so a cumulative bar
// usually counts instead of showing percentages: legendValueFormat="count"
// with a unit to say what is being counted.

import { StackedBarChart } from "@czi-sds/data-viz";

const DATA = [
  { name: "Processed", value: 117 },
  { name: "In review", value: 130 },
  { name: "Queued", value: 100 },
];

function App() {
  return (
    <div className="app">
      <StackedBarChart
        data={DATA}
        legendValueFormat="count"
        maxAmount={500}
        mode="cumulative"
        remainingLabel="Not yet submitted"
        title="Datasets"
        unit="datasets"
        width="420px"
      />
    </div>
  );
}

export default App;
```

### Selection

One selection driving two charts, so the difference between dim and hide is visible in a single pass. Selection lives in the parent; the buttons show how to change it from outside the chart, which is also what gives the keyboard a way in.

**Example: SelectableStackedBarChart**

```tsx
// Selection is controlled, so the chart draws whatever selectedIndices holds
// and asks the parent to change it through onSelectionChange. That makes it
// straightforward to point two charts at one selection, which is the clearest
// way to see what selectionBehavior does: dim keeps the shape of the whole and
// fades what is not selected, while hide drops those segments and lets the
// rest grow into the space.
//
// Clicking a segment or a legend item is pointer-only, so the buttons are not
// just a convenience: they are how a keyboard reaches the selection at all.

import { useState } from "react";
import {
  Button,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import { StackedBarChart } from "@czi-sds/data-viz";
import styled from "@emotion/styled";

const DATA = [
  { name: "Transcriptomic", value: 117 },
  { name: "Prosthetics", value: 130 },
  { name: "Epigenomics", value: 100 },
  { name: "Imaging", value: 61 },
];

const Stack = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-direction: column;
      gap: ${spaces?.xl}px;
    `;
  }}
`;

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
    const spaces = getSpaces(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: 0 0 ${spaces?.s}px;
    `;
  }}
`;

function App() {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([1]);

  return (
    <div className="app">
      <Stack>
        <Controls>
          <Button
            onClick={() => setSelectedIndices(DATA.map((_, index) => index))}
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

        <Row>
          <div>
            <Caption>selectionBehavior=&quot;dim&quot;</Caption>
            <StackedBarChart
              data={DATA}
              onSelectionChange={setSelectedIndices}
              selectedIndices={selectedIndices}
              title="Modality"
              width="300px"
            />
          </div>

          <div>
            <Caption>selectionBehavior=&quot;hide&quot;</Caption>
            <StackedBarChart
              data={DATA}
              onSelectionChange={setSelectedIndices}
              selectedIndices={selectedIndices}
              selectionBehavior="hide"
              title="Modality"
              width="300px"
            />
          </div>
        </Row>
      </Stack>
    </div>
  );
}

export default App;
```

### Segment tooltips

A data item carrying tooltip content opens a TooltipTable on hover, which is where the detail behind a segment belongs.

**Example: StackedBarChartWithTooltips**

```tsx
// A segment shows nothing but its size, so anything behind the number belongs
// in a tooltip. Giving a data item tooltip content opens a TooltipTable above
// its segment on hover; the shape is TooltipTable's own, a list of sections
// each holding dataRows of label and value.
//
// Tooltips are per item, so a category with nothing to add simply leaves the
// prop off, as Prosthetics does here.

import { StackedBarChart } from "@czi-sds/data-viz";

const DATA = [
  {
    name: "Transcriptomic",
    tooltip: {
      data: [
        {
          dataRows: [
            { label: "Bulk RNA-seq", value: 48 },
            { label: "Single cell", value: 39 },
            { label: "Single nucleus", value: 30 },
          ],
          label: "Transcriptomic",
        },
      ],
    },
    value: 117,
  },
  {
    name: "Imaging",
    tooltip: {
      data: [
        {
          dataRows: [
            { label: "Fluorescence microscopy", value: 22 },
            { label: "Confocal imaging", value: 15 },
            { label: "Electron microscopy", value: 14 },
            { label: "Light sheet imaging", value: 10 },
          ],
          label: "Imaging",
        },
      ],
    },
    value: 61,
  },
  { name: "Prosthetics", value: 130 },
];

function App() {
  return (
    <div className="app">
      <StackedBarChart
        barHeight={24}
        data={DATA}
        title="Modality"
        width="420px"
      />
    </div>
  );
}

export default App;
```

### Colors

Explicit colors beside a generated palette. Give the categories that must stay recognisable a color of their own, and tune the rest through colorGeneratorOptions.

**Example: StackedBarChartColors**

```tsx
// Segments without a color of their own take one from a generated cubehelix
// palette, which is regenerated whenever a new category appears. That is fine
// for a one-off breakdown, but it means a category is not guaranteed the same
// color across two charts or across a change of data.
//
// Where a category has to stay recognisable, give it a color. Where the set as
// a whole just needs to sit better with the page, leave the colors generated
// and move the palette with colorGeneratorOptions.

import {
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import { StackedBarChart } from "@czi-sds/data-viz";
import styled from "@emotion/styled";

const NAMED_COLORS = [
  { color: "#0B6CCC", name: "Passed", value: 220 },
  { color: "#F5C700", name: "Flagged", value: 60 },
  { color: "#C41E3A", name: "Failed", value: 35 },
];

const GENERATED = [
  { name: "Transcriptomic", value: 117 },
  { name: "Prosthetics", value: 130 },
  { name: "Epigenomics", value: 100 },
  { name: "Imaging", value: 61 },
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
  return (
    <div className="app">
      <Row>
        <div>
          <Caption>A color on each item</Caption>
          <StackedBarChart
            data={NAMED_COLORS}
            title="QC status"
            width="300px"
          />
        </div>

        <div>
          <Caption>A generated palette, starting from green</Caption>
          <StackedBarChart
            colorGeneratorOptions={{ rotations: 0.5, start: 140 }}
            data={GENERATED}
            title="Modality"
            width="300px"
          />
        </div>
      </Row>
    </div>
  );
}

export default App;
```
