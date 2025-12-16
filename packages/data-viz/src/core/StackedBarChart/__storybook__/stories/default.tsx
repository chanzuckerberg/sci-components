import { Args } from "@storybook/react-webpack5";
import RawStackedBarChart from "../../index";
import { STACKED_BAR_CHART_DATA } from "../constants";

export const StackedBarChart = (props: Args): JSX.Element => {
  const {
    data = STACKED_BAR_CHART_DATA,
    width = 360,
    barHeight = 16,
    ...rest
  } = props;

  return (
    <div style={{ margin: 150 }}>
      <RawStackedBarChart
        width={width}
        data={data}
        barHeight={barHeight}
        {...rest}
      />
    </div>
  );
};
