import { Args } from "@storybook/react";
import RawButtonToggle from "src/core/ButtonToggle";

export const ButtonToggle = (props: Args): JSX.Element => {
  const { icon } = props;

  return <RawButtonToggle aria-label="button-toggle" icon={icon} {...props} />;
};
