// 4,800 cells, of which 240 are drawn. The camera is a window onto the grid:
// only the cells inside it are rendered, and dragging moves the window rather
// than the chart. It is what makes a heatmap of tens of thousands of cells
// affordable, and it is worth turning on well before the browser starts to
// struggle.
//
// The container is sized to the window, not to the data — camera.width and
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
