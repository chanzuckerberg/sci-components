import { Args } from "@storybook/react-webpack5";
import RawTooltipTableContent from "src/core/TooltipTable";
import { TOOLTIP_TABLE_DATA } from "../constants";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <RawTooltipTableContent
      {...props}
      data={[TOOLTIP_TABLE_DATA[0], TOOLTIP_TABLE_DATA[1]]}
      data-testid="tooltipTable"
    />
  );
};
