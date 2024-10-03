import { Args } from "@storybook/react";
import ButtonToggle from "src/core/ButtonToggle";

export const TestDemo = (props: Args): JSX.Element => {
  const { icon } = props;

  return <ButtonToggle data-testid="button-toggle" icon={icon} {...props} />;
};
