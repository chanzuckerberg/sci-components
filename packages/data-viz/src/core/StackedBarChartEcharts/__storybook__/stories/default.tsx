import { Args } from "@storybook/react-webpack5";
import RawStackedBarChart from "src/core/StackedBarChartEcharts";
import { DOMAIN_DATA } from "../constants";

export const StackedBarChart = (props: Args): JSX.Element => {
  const {
    data = DOMAIN_DATA,
    width = 240,
    height = 16,
    barHeight = 16,
    ...rest
  } = props;

  return (
    <RawStackedBarChart
      width={width}
      height={height}
      data={data}
      barHeight={barHeight}
      {...rest}
    />
  );
};
