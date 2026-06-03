import { Args } from "@storybook/react";
import {
  SCATTERPLOT_DATA,
  SCATTERPLOT_ENCODE,
  SCATTERPLOT_ITEM_STYLE,
  SCATTERPLOT_NUMBERS,
} from "../constants";
import RawScatterPlot from "src/core/ScatterPlot";
import { ScatterSeriesOption } from "echarts";

export const ScatterPlot = (props: Args): JSX.Element => {
  const { symbol, tooltip, ...rest } = props;

  return (
    <>
      <RawScatterPlot
        width={600}
        height={400}
        xAxisData={SCATTERPLOT_NUMBERS}
        yAxisData={SCATTERPLOT_NUMBERS}
        data={SCATTERPLOT_DATA}
        encode={SCATTERPLOT_ENCODE}
        symbol={symbol}
        symbolSize={10}
        itemStyle={SCATTERPLOT_ITEM_STYLE as ScatterSeriesOption["itemStyle"]}
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
          grid: {
            containLabel: true,
          },
          series: [
            {
              type: "scatter",
            },
          ],
          tooltip: tooltip,
          xAxis: {
            type: "value",
          },
          yAxis: {
            type: "value",
          },
        }}
        {...rest}
      />
    </>
  );
};
