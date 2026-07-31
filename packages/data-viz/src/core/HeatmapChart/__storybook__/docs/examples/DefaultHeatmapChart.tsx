// A heatmap needs four things: the cells, the two axes they are indexed
// against, and pixel dimensions for the canvas they are drawn on. Each cell is
// an object of whatever shape suits the data, and encode says which of its
// fields places it on each axis — here x and y, but they could just as well be
// geneIndex and cellTypeIndex.
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
