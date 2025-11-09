import { Args } from "@storybook/react-webpack5";
import RawStackedBarChart from "../../index";
import { BUDGET_DATA } from "../constants";

export const AmountBasedStory = (props: Args): JSX.Element => {
  const {
    data = BUDGET_DATA,
    width = 400,
    barHeight = 16,
    mode = "amount",
    maxAmount = 1200,
    remainingLabel = "Unallocated",
    ...rest
  } = props;

  return (
    <RawStackedBarChart
      width={width}
      data={data}
      barHeight={barHeight}
      mode={mode}
      maxAmount={maxAmount}
      remainingLabel={remainingLabel}
      {...rest}
    />
  );
};
