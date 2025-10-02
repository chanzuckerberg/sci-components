import { Args } from "@storybook/types";
import RawPanel from "src/core/Panel";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <RawPanel sdsType="basic" open={true} data-testid="panel" {...props}>
      [Panel Content]
    </RawPanel>
  );
};
