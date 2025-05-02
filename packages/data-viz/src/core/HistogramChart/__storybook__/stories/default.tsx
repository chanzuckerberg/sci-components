import { Args } from "@storybook/react";
import RawHistogramChart from "src/core/HistogramChart";
import { HISTOGRAM_DATA } from "../constants";

export const HistogramChart = (props: Args): JSX.Element => {
  const { tooltip, ...rest } = props;

  return (
    <>
      <RawHistogramChart
        width={600}
        height={400}
        options={{
          grid: {
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: "#ccc",
            borderWidth: 1,
            bottom: 70,
            containLabel: false,
            left: "10%",
            right: "10%",
            show: false,
            top: 60,
            z: 0,
          },
          series: [
            {
              barCategoryGap: 0,
              data: HISTOGRAM_DATA,
              type: "bar",
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
