import { Args } from "@storybook/react";
import RawHistogramChart from "src/core/HistogramChart";
import { HISTOGRAM_DATA, HISTOGRAM_REFERENCE_DATA } from "../constants";

export const HistogramChart = (props: Args): JSX.Element => {
  const {
    barColor,
    tooltip,
    showTitle,
    width = 800,
    height = 400,
    showYAxisGrid = false,
    showXAxisGrid = false,
    showReference = false,
    referenceColor,
    showThreshold = false,
    thresholdMin = 40,
    thresholdMax = 60,
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
      showXAxisGrid={showXAxisGrid}
      showYAxisGrid={showYAxisGrid}
      barColor={barColor || "#3366cc"}
      referenceData={showReference ? HISTOGRAM_REFERENCE_DATA : undefined}
      referenceColor={referenceColor || "rgba(128, 128, 128, 0.4)"}
      threshold={
        showThreshold ? { min: thresholdMin, max: thresholdMax } : undefined
      }
      emphasis={{
        itemStyle: {
          color: "#5588ee",
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
      options={{
        tooltip: tooltip,
        xAxis: {
          // axisLabel: { rotate: 45 },
          splitLine: { show: showXAxisGrid },
        },
        yAxis: {
          // axisLabel: { rotate: 45 },
          splitLine: { show: showYAxisGrid },
          max: 100,
          boundaryGap: true,
        },
      }}
      {...rest}
    />
  );
};
