# HeatmapChart

A grid of cells coloured by value, for matrices too large to read as a table.

**Ships separately:** HeatmapChart comes from `@czi-sds/data-viz`, not `@czi-sds/components`, and it needs ECharts alongside it. See the Data Viz overview for installation and peer dependencies.

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/data-viz/src/core/HeatmapChart/index.tsx).

## How it is built

HeatmapChart is a thin React wrapper around an [Apache ECharts](https://echarts.apache.org/en/index.html) instance. It is not ECharts' heatmap series: it is a scatter series drawn on two category axes, one symbol per cell. That is what lets a cell be a square, a rounded square, or a circle whose diameter carries a second measurement, as a dot plot.

Three consequences of that design are worth knowing before you start:

- **The props are ECharts' vocabulary, not the SDS one.** `itemStyle`, `emphasis`, `symbolSize`, `grid`, and `axisPointer` are passed through to the underlying option object, and the ECharts documentation is the reference for each of them. The chart takes nothing from the SDS theme: color scales are yours to supply.

- **It renders to SVG by default.** That keeps text crisp and elements inspectable, and is the right choice up to a few thousand cells. Beyond that, switch `echartsRendererMode` to `"canvas"`, and reach for the camera below.

- **Animation is off and updates are throttled to 100ms.** The component is memoised and resizes the chart before each update, so passing new data on every frame is safe; it will coalesce.

## Sizing

`width` and `height` are required, in pixels, and the component throws if either is missing or zero: ECharts cannot initialise into a box with no area. The chart does not measure its container, so a responsive heatmap means measuring the container yourself and passing the result down.

The grid fills those dimensions exactly, which makes cell size a matter of arithmetic: pick the pixel size a cell should be and multiply by the number of categories on each axis. Sizing the container to anything else stretches the cells rather than clipping them.

## Data and encoding

`data` is a flat array of cells, one per position in the grid, and each cell is an object of whatever shape suits the data. `encode` names the two fields that place it:

**React TypeScript**

```tsx
const data = [
  { geneIndex: 0, cellTypeIndex: 0, percentage: 0.5 },
  { geneIndex: 1, cellTypeIndex: 0, percentage: 0.8 },
];

<HeatmapChart
  data={data}
  encode={{ x: "geneIndex", y: "cellTypeIndex" }}
  xAxisData={genes}
  yAxisData={cellTypes}
  width={genes.length * 20}
  height={cellTypes.length * 20}
/>;
```

`xAxisData` and `yAxisData` are the categories themselves, as strings, numbers, or objects with a `value` and a `textStyle`. The values a cell is encoded on are indices into them, so the two must line up: a cell whose `geneIndex` is 4 lands on the fifth entry of `xAxisData`.

Everything else a cell carries (an expression level, a count, a p-value) is invisible until something draws it. That is the job of `itemStyle` and `symbolSize`, both of which accept a callback that receives the data item, so the color scale and the size scale are yours to define. Without an `itemStyle` every cell is black, and `symbolSize` defaults to 5 pixels.

## The camera

A heatmap of any real size cannot be rendered whole. `camera` turns on a window over the grid, given in cells rather than pixels, and only the cells inside it are drawn:

**React TypeScript**

```tsx
<HeatmapChart
  camera={{ active: true, width: 40, height: 20 }}
  width={40 * CELL_PX}
  height={20 * CELL_PX}
  {...rest}
/>
```

Underneath it is ECharts' `dataZoom` with the zoom locked, which is why the interactions are the ones `dataZoom` provides: dragging pans the window, and the wheel scrolls it vertically. The window starts at the origin of the grid, and defaults to 40 cells wide by 20 tall when the sizes are left out. Size the container to the window, not to the data.

## Escape hatches

The named props cover the common cases; everything else in ECharts is reached through `options`, which is merged into the generated option object. Tooltips, visual maps, and axis labels all arrive this way. The merge is shallow and treats a few keys specially, which is worth knowing when an option appears to be ignored:

- `xAxis`, `yAxis` and `series` are merged one level deep over the chart's defaults, and only the first entry of each is read. Passing an object replaces the matching default key outright, so `axisLabel` given to `xAxis` replaces the whole default `axisLabel` rather than adding to it.

- `axisPointer` and `dataZoom` accept either a single object, applied to both axes, or a two-entry array for the x and y axes separately. `dataZoom` is only applied when the camera is active, since otherwise there is no window for it to describe.

- `grid` has a prop of its own, which takes either an option object or a function receiving the computed default. That is useful for insetting the grid to make room for axis labels while keeping the sizing the chart worked out.

- Every other key in `options` is spread over the result untouched, and wins.

**Do not use the dataZoom prop.** The type still advertises it, but the component never forwards it and it ends up on the container div instead, where React will warn about an unknown attribute. Pass `dataZoom` inside `options`, with the camera active.

## Downloading the chart

There is no download prop. Exporting is something the ECharts instance does, so the work is getting hold of it: the ref the component forwards points at the container ECharts was initialised on, and `getInstanceByDom` trades that element for the chart. From there, `getDataURL` returns the picture as a data URL and an anchor turns it into a file:

**React TypeScript**

```tsx
import { useRef } from "react";
import { getInstanceByDom } from "echarts";
import { HeatmapChart } from "@czi-sds/data-viz";

const containerRef = useRef<HTMLDivElement>(null);

function download() {
  const container = containerRef.current;
  const chart = container && getInstanceByDom(container);

  if (!chart) return;

  const url = chart.getDataURL({ pixelRatio: 2, type: "png" });

  if (!url) return;

  const link = document.createElement("a");
  link.download = "heatmap.png";
  link.href = url;
  link.click();
}

<HeatmapChart ref={containerRef} {...rest} />;
```

Look the instance up when the download is triggered rather than caching it. Changing `echartsRendererMode` disposes the chart and builds a new one on the same element, and a cached reference would be exporting one that no longer exists.

Three things decide what comes out:

- **The renderer decides the format, not the type option.** An SVG chart can only export SVG, and a canvas chart can only export a raster; asking a canvas chart for `type: "svg"` produces a PNG with a misleading name. Derive the file extension from `echartsRendererMode`, as the example below does, or fix the renderer and the extension together.

- `pixelRatio` and `backgroundColor` only apply on the canvas path: 2 or 3 for a print-resolution PNG, and a colour if the default transparent background will not do. An SVG export ignores both and keeps the chart's own background. `excludeComponents` takes the names of components to hide while exporting, such as a toolbox.

- **Only what is rendered is exported.** With the camera active, the export contains the window, not the whole grid. Exporting everything means rendering everything: turn the camera off for the export, and expect it to cost what drawing the full grid costs.

A heatmap is often assembled from more than one chart: the grid, plus the separate charts drawing its axis labels. ECharts can composite them into a single image, but only once they are in a connected group:

**React TypeScript**

```tsx
import { connect, getInstanceByDom } from "echarts";

// Once, after every chart has been initialised.
connect([heatmap, xAxisChart, yAxisChart]);

// Lays the group out by where each chart sits on screen.
const url = heatmap.getConnectedDataURL({
  connectedBackgroundColor: "white",
  pixelRatio: 2,
  type: "png",
});
```

`getConnectedDataURL` falls back to `getDataURL` when the chart is not in a connected group, so a single chart can call either. That is what the heatmap demo does: its download button calls `getConnectedDataURL` on the grid alone.

## Behavior and accessibility

- The chart is a single SVG or canvas element with no accessible name, no roles, and no tab stop. Assistive technology can see nothing in it, and a keyboard cannot reach a cell, so a heatmap needs a text equivalent alongside it: a summary of what it shows, or the same numbers reachable as a table.

- Axis labels are drawn at font size 0 by default, and the x axis is rotated 90 degrees. The charts this was built for pair the grid with their own scrollable axis components, which is why the built-in labels start hidden; a small heatmap can turn them back on through `options`, as the example below does.

- Hover draws a border around the cell under the pointer (white and 4px on a square, black and 2px on a circle) and never scales it. Pass `emphasis` to change that.

- Tooltips are ECharts' own HTML tooltips, positioned over the chart and built from a formatter you write. They are pointer-only, and they are not the SDS Tooltip.

- Handlers in `onEvents` are rebound whenever the chart updates, and rebinding removes every listener registered for that event name. If you also attach listeners to the ECharts instance yourself, expect them to be dropped; attach them through `onEvents` instead.

- Color is the whole message in a heatmap. Pick a sequential scale that survives being read by someone with a color vision deficiency, keep it consistent between charts that will be compared, and make the scale itself visible (a legend or a `visualMap` through `options`), since the component does not draw one.

## Props

Any remaining props are spread onto the container div, so `className`, `id`, and `data-testid` work as usual, and the component forwards its ref to that div. Every option below that names an ECharts concept links to the ECharts documentation for the shape it takes.

| Name                  | Type                                                                  | Default             | Description                                                                                                                                        |
| --------------------- | --------------------------------------------------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                | `DatasetComponentOption["source"]`                                    | - (required)        | The cells, as a flat array of objects whose fields are named by `encode`.                                                                          |
| `xAxisData`           | `(string \| number \| { value, textStyle })[]`                        | - (required)        | The categories along the x axis. A cell's encoded x value is an index into this array.                                                             |
| `yAxisData`           | `(string \| number \| { value, textStyle })[]`                        | - (required)        | The categories along the y axis.                                                                                                                   |
| `width`               | `number`                                                              | - (required)        | Width of the chart in pixels. Must be greater than zero; the component throws otherwise.                                                           |
| `height`              | `number`                                                              | - (required)        | Height of the chart in pixels, under the same rule.                                                                                                |
| `encode`              | `{ x: string; y: string }`                                            | -                   | Which fields of a data item place it on each axis. Omitting it leaves ECharts to guess from the field order.                                       |
| `symbol`              | `"rect"` \| `"roundRect"` \| `"circle"`                               | `"rect"`            | The shape of a cell. Circles turn the grid into a dot plot, where diameter can carry a second measurement.                                         |
| `symbolSize`          | `number` \| `number[]` \| `((value, params) => number \| number[])`   | `5`                 | Cell size in pixels: one number, a `[width, height]` pair, or a callback given the data item. Set it to the cell pitch for a solid grid.           |
| `itemStyle`           | `ScatterSeriesOption["itemStyle"]`                                    | solid black         | How a cell is painted. Its `color` accepts a callback receiving the data item, which is how a value becomes a color.                               |
| `emphasis`            | `ScatterSeriesOption["emphasis"]`                                     | a 2–4px border      | How a cell is drawn while the pointer is over it.                                                                                                  |
| `camera`              | `{ active: boolean; width: number; height: number }`                  | 40 × 20 when active | Renders only a window of the grid, measured in cells, and lets the pointer pan it. Sizes are ignored unless `active` is `true`.                    |
| `axisPointer`         | `EChartsOption["axisPointer"]`                                        | hidden              | The crosshair following the pointer. One object applies to both axes; a two-entry array configures them separately.                                |
| `grid`                | `EChartsOption["grid"]` \| `((defaultGrid) => EChartsOption["grid"])` | fills the container | Where the plotting area sits inside the container. The function form receives the computed default, for insetting it without recomputing the size. |
| `options`             | `EChartsOption`                                                       | -                   | Anything else ECharts understands, merged over the generated options. See the merge rules above.                                                   |
| `onEvents`            | `Record<string, (event: unknown,` `chart: ECharts) => void>`          | -                   | ECharts event listeners by name. Each handler gets the raw event, whose `data` property is the cell, and the chart instance.                       |
| `echartsRendererMode` | `"svg"` \| `"canvas"`                                                 | `"svg"`             | Which renderer ECharts initialises with. Canvas copes better with very large grids. Changing it rebuilds the chart.                                |

## Code examples

### **Default HeatmapChart**

The smallest complete heatmap: cells, two axes, a size, and an `itemStyle` that turns each value into a color.

**Example: DefaultHeatmapChart**

```tsx
// A heatmap needs four things: the cells, the two axes they are indexed
// against, and pixel dimensions for the canvas they are drawn on. Each cell is
// an object of whatever shape suits the data, and encode says which of its
// fields places it on each axis. Here they are x and y, but they could just as
// well be geneIndex and cellTypeIndex.
//
// Nothing about a cell's value reaches the chart on its own. The value becomes
// visible because itemStyle colors each symbol from it, which is also why the
// scale below is the example's own rather than something the chart provides.

import { type ScatterSeriesOption } from "echarts";
import { HeatmapChart } from "@czi-sds/data-viz";

const COLUMNS = 12;
const ROWS = 8;
const CELL_PX = 24;

interface Cell {
  value: number;
  x: number;
  y: number;
}

const DATA: Cell[] = [];
for (let x = 0; x < COLUMNS; x += 1) {
  for (let y = 0; y < ROWS; y += 1) {
    DATA.push({
      value: Math.round(50 + 50 * Math.sin(x / 2.5) * Math.cos(y / 3)),
      x,
      y,
    });
  }
}

// A sequential scale, low to high. ECharts has no opinion about this.
const SCALE = [
  "#eff6fc",
  "#cfe3f6",
  "#a5cbee",
  "#74aee3",
  "#4a8fd4",
  "#2c6fb8",
  "#175193",
];

const ITEM_STYLE = {
  borderColor: "white",
  borderType: "solid",
  borderWidth: 1,
  color: ({ data }: { data: Cell }) =>
    SCALE[
      Math.min(SCALE.length - 1, Math.floor((data.value / 100) * SCALE.length))
    ],
} as ScatterSeriesOption["itemStyle"];

function App() {
  return (
    <div className="app">
      <HeatmapChart
        data={DATA}
        encode={{ x: "x", y: "y" }}
        height={ROWS * CELL_PX}
        itemStyle={ITEM_STYLE}
        symbol="rect"
        symbolSize={CELL_PX}
        width={COLUMNS * CELL_PX}
        xAxisData={Array.from({ length: COLUMNS }, (_, index) => index)}
        yAxisData={Array.from({ length: ROWS }, (_, index) => index)}
      />
    </div>
  );
}

export default App;
```

### Dot plot

Circles sized by one measurement and coloured by another, which is the form this chart is most often used in: expression by cell type, with the diameter carrying the share of cells expressing the gene.

**Example: HeatmapChartDotPlot**

```tsx
// Cells do not have to be squares that fill their slot. With symbol="circle"
// and a symbolSize callback, the grid becomes a dot plot, where a cell can
// carry two measurements at once: one in the color and one in the diameter.
//
// symbolSize is given the data item, so the arithmetic that turns a value into
// a diameter is yours. Keep the largest dot at or below the cell size, or
// neighbouring dots start to overlap.

import { type ScatterSeriesOption } from "echarts";
import { HeatmapChart } from "@czi-sds/data-viz";

const GENES = ["CD3E", "CD8A", "MS4A1", "NKG7", "LYZ", "PPBP", "FCGR3A"];
const CELL_TYPES = ["T cell", "B cell", "NK cell", "Monocyte", "Platelet"];
const CELL_PX = 32;

interface Cell {
  cellTypeIndex: number;
  geneIndex: number;
  // Color carries mean expression, diameter the share of cells expressing.
  percentage: number;
  value: number;
}

const DATA: Cell[] = [];
GENES.forEach((_, geneIndex) => {
  CELL_TYPES.forEach((__, cellTypeIndex) => {
    DATA.push({
      cellTypeIndex,
      geneIndex,
      percentage: Math.round(
        20 + 80 * Math.abs(Math.sin(geneIndex + cellTypeIndex))
      ),
      value: Math.round(
        50 + 50 * Math.sin(geneIndex / 1.7) * Math.cos(cellTypeIndex / 1.3)
      ),
    });
  });
});

const SCALE = ["#e9e3f5", "#c9bce8", "#a694d8", "#7f68c4", "#57419f"];

const ITEM_STYLE = {
  color: ({ data }: { data: Cell }) =>
    SCALE[
      Math.min(SCALE.length - 1, Math.floor((data.value / 100) * SCALE.length))
    ],
  opacity: 1,
} as ScatterSeriesOption["itemStyle"];

const symbolSize = (cell: Cell) => (cell.percentage / 100) * CELL_PX;

function App() {
  return (
    <div className="app">
      <HeatmapChart
        data={DATA}
        encode={{ x: "geneIndex", y: "cellTypeIndex" }}
        height={CELL_TYPES.length * CELL_PX}
        itemStyle={ITEM_STYLE}
        symbol="circle"
        symbolSize={symbolSize as ScatterSeriesOption["symbolSize"]}
        width={GENES.length * CELL_PX}
        xAxisData={GENES}
        yAxisData={CELL_TYPES}
      />
    </div>
  );
}

export default App;
```

### Axis labels and a tooltip

Labels turned back on through `options`, with the grid inset to make room for them, and an ECharts tooltip naming the cell under the pointer.

**Example: HeatmapChartWithAxesAndTooltip**

```tsx
// Axis labels are drawn at font size 0 by default, because the charts this was
// built for render their axes as separate, scrollable components beside the
// grid. For a heatmap small enough to label in place, turn them back on
// through options.xAxis and options.yAxis.
//
// The labels need somewhere to go. The grid fills the whole container unless
// told otherwise, so inset it and make the container big enough to hold both
// the grid and the gutters the labels sit in.
//
// options is passed to ECharts more or less directly, which is also how the
// tooltip gets here: there is no tooltip prop, just ECharts' own.

import { type EChartsOption, type ScatterSeriesOption } from "echarts";
import { HeatmapChart } from "@czi-sds/data-viz";

const GENES = ["CD3E", "CD8A", "MS4A1", "NKG7", "LYZ", "PPBP"];
const CELL_TYPES = ["T cell", "B cell", "NK cell", "Monocyte"];

const CELL_PX = 28;
const GRID_WIDTH = GENES.length * CELL_PX;
const GRID_HEIGHT = CELL_TYPES.length * CELL_PX;
const LABEL_GUTTER = 72;

interface Cell {
  cellTypeIndex: number;
  geneIndex: number;
  value: number;
}

const DATA: Cell[] = [];
GENES.forEach((_, geneIndex) => {
  CELL_TYPES.forEach((__, cellTypeIndex) => {
    DATA.push({
      cellTypeIndex,
      geneIndex,
      value: Math.round(
        50 + 50 * Math.sin(geneIndex / 1.4) * Math.cos(cellTypeIndex / 1.6)
      ),
    });
  });
});

const SCALE = ["#eff6fc", "#c3ddf3", "#8ab8e6", "#4a8fd4", "#175193"];

const ITEM_STYLE = {
  borderColor: "white",
  borderWidth: 1,
  color: ({ data }: { data: Cell }) =>
    SCALE[
      Math.min(SCALE.length - 1, Math.floor((data.value / 100) * SCALE.length))
    ],
} as ScatterSeriesOption["itemStyle"];

const TOOLTIP: EChartsOption["tooltip"] = {
  formatter: (params) => {
    const { data } = params as unknown as { data: Cell };

    return `${GENES[data.geneIndex]} in ${CELL_TYPES[data.cellTypeIndex]}<br/><strong>${data.value}</strong>`;
  },
  show: true,
};

function App() {
  return (
    <div className="app">
      <HeatmapChart
        data={DATA}
        encode={{ x: "geneIndex", y: "cellTypeIndex" }}
        grid={{
          height: `${GRID_HEIGHT}px`,
          left: LABEL_GUTTER,
          top: 0,
          width: `${GRID_WIDTH}px`,
        }}
        height={GRID_HEIGHT + LABEL_GUTTER}
        itemStyle={ITEM_STYLE}
        options={{
          tooltip: TOOLTIP,
          xAxis: { axisLabel: { fontSize: 11, rotate: 45 } },
          yAxis: { axisLabel: { fontSize: 11 } },
        }}
        symbolSize={CELL_PX}
        width={GRID_WIDTH + LABEL_GUTTER}
        xAxisData={GENES}
        yAxisData={CELL_TYPES}
      />
    </div>
  );
}

export default App;
```

### Large grids and the camera

A 4,800-cell grid rendered 240 cells at a time. Drag to move the window, or use the wheel to travel down it.

**Example: HeatmapChartWithCamera**

```tsx
// 4,800 cells, of which 240 are drawn. The camera is a window onto the grid:
// only the cells inside it are rendered, and dragging moves the window rather
// than the chart. It is what makes a heatmap of tens of thousands of cells
// affordable, and it is worth turning on well before the browser starts to
// struggle.
//
// The container is sized to the window, not to the data: camera.width and
// camera.height are counted in cells, so the pixel size is that count times
// whatever a cell should measure. Get this wrong and the cells stretch: the
// grid always fills the container it is given.

import { type ScatterSeriesOption } from "echarts";
import { HeatmapChart } from "@czi-sds/data-viz";

const COLUMNS = 80;
const ROWS = 60;
const CELL_PX = 20;

const CAMERA = { active: true, height: 12, width: 20 };

interface Cell {
  value: number;
  x: number;
  y: number;
}

const DATA: Cell[] = [];
for (let x = 0; x < COLUMNS; x += 1) {
  for (let y = 0; y < ROWS; y += 1) {
    DATA.push({
      value: Math.round(50 + 50 * Math.sin(x / 6) * Math.cos(y / 5)),
      x,
      y,
    });
  }
}

const SCALE = ["#fff5cc", "#ffd99b", "#fdae61", "#f46d43", "#c9302c"];

const ITEM_STYLE = {
  borderColor: "white",
  borderWidth: 1,
  color: ({ data }: { data: Cell }) =>
    SCALE[
      Math.min(SCALE.length - 1, Math.floor((data.value / 100) * SCALE.length))
    ],
} as ScatterSeriesOption["itemStyle"];

function App() {
  return (
    <div className="app">
      <HeatmapChart
        camera={CAMERA}
        data={DATA}
        encode={{ x: "x", y: "y" }}
        height={CAMERA.height * CELL_PX}
        itemStyle={ITEM_STYLE}
        symbolSize={CELL_PX}
        width={CAMERA.width * CELL_PX}
        xAxisData={Array.from({ length: COLUMNS }, (_, index) => index)}
        yAxisData={Array.from({ length: ROWS }, (_, index) => index)}
      />
    </div>
  );
}

export default App;
```

### Downloading

A download button that exports the chart itself, and a renderer switch to show the format following it: SVG out of the SVG renderer, PNG out of the canvas one.

**Example: DownloadHeatmapChart**

```tsx
// Exporting is ECharts' job, so the work is getting hold of the instance: the
// ref HeatmapChart forwards points at the container ECharts was initialised
// on, and getInstanceByDom trades that element for the chart.
//
// Look it up when the button is clicked rather than caching it. Changing the
// renderer disposes the instance and builds a new one on the same element, so
// a cached reference would be exporting a chart that no longer exists.
//
// The renderer decides the format: an SVG chart can only produce SVG, a canvas
// chart can only produce a raster. Keeping the two in step is the whole reason
// the file type is derived from the renderer below.

import { useRef, useState } from "react";
import { getInstanceByDom, type ScatterSeriesOption } from "echarts";
import {
  Button,
  Icon,
  SegmentedControl,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import { HeatmapChart } from "@czi-sds/data-viz";
import styled from "@emotion/styled";

const COLUMNS = 12;
const ROWS = 8;
const CELL_PX = 24;

interface Cell {
  value: number;
  x: number;
  y: number;
}

const DATA: Cell[] = [];
for (let x = 0; x < COLUMNS; x += 1) {
  for (let y = 0; y < ROWS; y += 1) {
    DATA.push({
      value: Math.round(50 + 50 * Math.sin(x / 2.5) * Math.cos(y / 3)),
      x,
      y,
    });
  }
}

const SCALE = ["#eff6fc", "#c3ddf3", "#8ab8e6", "#4a8fd4", "#175193"];

const ITEM_STYLE = {
  borderColor: "white",
  borderWidth: 1,
  color: ({ data }: { data: Cell }) =>
    SCALE[
      Math.min(SCALE.length - 1, Math.floor((data.value / 100) * SCALE.length))
    ],
} as ScatterSeriesOption["itemStyle"];

const Controls = styled.div<CommonThemeProps>`
  display: flex;
  align-items: center;

  ${(props) => {
    const spaces = getSpaces(props);

    return `
      gap: ${spaces?.m}px;
      margin-bottom: ${spaces?.l}px;
    `;
  }}
`;

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderer, setRenderer] = useState<"svg" | "canvas">("svg");

  const fileType = renderer === "svg" ? "svg" : "png";

  function download() {
    const container = containerRef.current;
    const chart = container && getInstanceByDom(container);

    if (!chart) return;

    const url = chart.getConnectedDataURL({
      // Both are ignored on the SVG path, which has no pixels to scale and
      // keeps the chart's own background.
      backgroundColor: "white",
      pixelRatio: 2,
      type: fileType,
    });

    if (!url) return;

    const link = document.createElement("a");
    link.download = `heatmap.${fileType}`;
    link.href = url;
    link.click();
  }

  return (
    <div className="app">
      <Controls>
        <SegmentedControl
          buttonDefinition={[
            { label: "SVG", value: "svg" },
            { label: "Canvas", value: "canvas" },
          ]}
          value={renderer}
          onChange={(_, value) => {
            if (value) setRenderer(value as "svg" | "canvas");
          }}
        />

        <Button
          sdsStyle="solid"
          sdsType="primary"
          endIcon={<Icon sdsIcon="Download" sdsSize="l" />}
          onClick={download}
        >
          Download .{fileType}
        </Button>
      </Controls>

      <HeatmapChart
        ref={containerRef}
        data={DATA}
        echartsRendererMode={renderer}
        encode={{ x: "x", y: "y" }}
        height={ROWS * CELL_PX}
        itemStyle={ITEM_STYLE}
        symbolSize={CELL_PX}
        width={COLUMNS * CELL_PX}
        xAxisData={Array.from({ length: COLUMNS }, (_, index) => index)}
        yAxisData={Array.from({ length: ROWS }, (_, index) => index)}
      />
    </div>
  );
}

export default App;
```

### Events

A click handler through `onEvents`, reading the cell back out of the ECharts event.

**Example: HeatmapChartWithEvents**

```tsx
// onEvents is a map of ECharts event names to handlers, each called with the
// raw ECharts event and the chart instance. The event's data property is the
// data item the interaction landed on, in the shape you passed in, so a click
// hands back the cell itself rather than a pair of indices.
//
// Because the value arrives as unknown, narrowing it is the caller's job.

import { useState } from "react";
import { type ScatterSeriesOption } from "echarts";
import {
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import { HeatmapChart } from "@czi-sds/data-viz";
import styled from "@emotion/styled";

const COLUMNS = 10;
const ROWS = 6;
const CELL_PX = 28;

interface Cell {
  value: number;
  x: number;
  y: number;
}

const DATA: Cell[] = [];
for (let x = 0; x < COLUMNS; x += 1) {
  for (let y = 0; y < ROWS; y += 1) {
    DATA.push({
      value: Math.round(50 + 50 * Math.sin(x / 2) * Math.cos(y / 2.5)),
      x,
      y,
    });
  }
}

const SCALE = ["#e6f4ea", "#b7e0c4", "#7fc79b", "#43a56f", "#1b7a48"];

const ITEM_STYLE = {
  borderColor: "white",
  borderWidth: 1,
  color: ({ data }: { data: Cell }) =>
    SCALE[
      Math.min(SCALE.length - 1, Math.floor((data.value / 100) * SCALE.length))
    ],
} as ScatterSeriesOption["itemStyle"];

const Readout = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: 0 0 ${spaces?.m}px;
    `;
  }}
`;

function App() {
  const [selected, setSelected] = useState<Cell | null>(null);

  return (
    <div className="app">
      <Readout>
        {selected
          ? `Column ${selected.x}, row ${selected.y}: ${selected.value}`
          : "Click a cell."}
      </Readout>

      <HeatmapChart
        data={DATA}
        encode={{ x: "x", y: "y" }}
        height={ROWS * CELL_PX}
        itemStyle={ITEM_STYLE}
        onEvents={{
          click: (event) => setSelected((event as { data: Cell }).data),
        }}
        symbolSize={CELL_PX}
        width={COLUMNS * CELL_PX}
        xAxisData={Array.from({ length: COLUMNS }, (_, index) => index)}
        yAxisData={Array.from({ length: ROWS }, (_, index) => index)}
      />
    </div>
  );
}

export default App;
```
