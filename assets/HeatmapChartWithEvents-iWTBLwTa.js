import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// onEvents is a map of ECharts event names to handlers, each called with the
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

const Readout = styled.p<CommonThemeProps>\`
  \${fontBodyXs}

  \${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return \`
      color: \${semanticColors?.base?.textSecondary};
      margin: 0 0 \${spaces?.m}px;
    \`;
  }}
\`;

function App() {
  const [selected, setSelected] = useState<Cell | null>(null);

  return (
    <div className="app">
      <Readout>
        {selected
          ? \`Column \${selected.x}, row \${selected.y}: \${selected.value}\`
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
`}))();export{t as default};