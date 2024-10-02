import { Args } from "@storybook/react";
import RawButtonToggle from "src/core/ButtonToggle";

export const TestDemo = (props: Args): JSX.Element => {
  const { icon } = props;

  return <RawButtonToggle data-testid="button-toggle" icon={icon} {...props} />;
};
