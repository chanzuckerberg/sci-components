import { Args } from "@storybook/react";
import RawHistogramChart from "src/core/HistogramChart";
import { HISTOGRAM_DATA, HISTOGRAM_LABELS } from "../constants";

export const HistogramChart = (props: Args): JSX.Element => {
  const {
    barColor,
    barCategoryGap,
    barGap,
    barWidth,
    tooltip,
    showTitle,
    width = 800,
    height = 400,
    ...rest
  } = props;

  return (
    <RawHistogramChart
      chartTitle="Histogram Chart Title"
      xAxisTitle="X Axis Title"
      yAxisTitle="Y Axis Title"
      showTitle={showTitle}
      width={width}
      height={height}
      data={HISTOGRAM_DATA}
      xAxisData={HISTOGRAM_LABELS}
      barCategoryGap={barCategoryGap}
      barGap={barGap}
      barWidth={barWidth}
      barColor={barColor || "#3366cc"}
      emphasis={{
        itemStyle: {
          color: "#5588ee",
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
      options={{
        tooltip: tooltip,
        // xAxis: { axisLabel: { rotate: 45 } },
        // yAxis: { axisLabel: { rotate: 45 } },
      }}
      {...rest}
    />
  );
};
