import { Args } from "@storybook/react-webpack5";
import RawPanel from "src/core/Panel";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <RawPanel sdsType="basic" open={true} data-testid="panel" {...props}>
      [Panel Content]
    </RawPanel>
  );
};
