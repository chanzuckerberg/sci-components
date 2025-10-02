import { Args } from "@storybook/types";
import {
  HEATMAP_DATA,
  HEATMAP_ENCODE,
  HEATMAP_ITEM_SIZE,
  HEATMAP_ITEM_STYLE,
  HEATMAP_NUMBERS,
  HEATMAP_SIZE,
} from "../constants";
import RawHeatmapChart from "src/core/HeatmapChart";
import { ScatterSeriesOption } from "echarts";

export const HeatmapChart = (props: Args): JSX.Element => {
  const { camera, symbol, tooltip, ...rest } = props;

  const CHART_WIDTH_PX =
    HEATMAP_ITEM_SIZE * (camera && camera.active ? camera.width : HEATMAP_SIZE);
  const CHART_HEIGHT_PX =
    HEATMAP_ITEM_SIZE *
    (camera && camera.active ? camera.height : HEATMAP_SIZE);

  return (
    <>
      <RawHeatmapChart
        width={CHART_WIDTH_PX}
        height={CHART_HEIGHT_PX}
        camera={camera}
        xAxisData={HEATMAP_NUMBERS}
        yAxisData={HEATMAP_NUMBERS}
        data={HEATMAP_DATA}
        encode={HEATMAP_ENCODE}
        symbol={symbol}
        symbolSize={(p) => symbolSize(p, symbol)}
        itemStyle={HEATMAP_ITEM_STYLE as ScatterSeriesOption["itemStyle"]}
        emphasis={{
          itemStyle: {
            borderColor: symbol === "circle" ? "black" : "white",
            borderType: "solid",
            borderWidth: symbol === "circle" ? 2 : 4,
            opacity: 1,
          },
          scale: false,
        }}
        options={{
          series: [
            {
              type: "scatter",
            },
          ],
          tooltip: tooltip,
        }}
        {...rest}
      />
    </>
  );
};

function symbolSize(props: { value: number }, symbol: string) {
  const { value } = props;
  return convertPercentageToDiameter(value, symbol);
}

function convertPercentageToDiameter(
  percentage: number,
  symbol: string
): number {
  if (symbol !== "circle") {
    return HEATMAP_ITEM_SIZE;
  } else {
    return (percentage * HEATMAP_ITEM_SIZE) / 100;
  }
}
