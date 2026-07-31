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
