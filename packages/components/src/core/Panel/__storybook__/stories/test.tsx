import { Args } from "@storybook/react";
import RawPanel from "src/core/Panel";

export const TestDemo = (props: Args): JSX.Element => {
  return <RawPanel data-testid="panel" {...props} />;
};
