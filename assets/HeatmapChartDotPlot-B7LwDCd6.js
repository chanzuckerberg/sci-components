import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Cells do not have to be squares that fill their slot. With symbol="circle"
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
`}))();export{t as default};