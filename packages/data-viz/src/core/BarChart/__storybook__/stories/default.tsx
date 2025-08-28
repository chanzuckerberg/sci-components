import { Args } from "@storybook/react";
import RawBarChart from "src/core/BarChart";
import { BARCHART_DATA } from "../constants";

export const BarChart = (props: Args): JSX.Element => {
  const { tooltip, ...rest } = props;

  return (
    <>
      <RawBarChart
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
              data: BARCHART_DATA,
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
