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
