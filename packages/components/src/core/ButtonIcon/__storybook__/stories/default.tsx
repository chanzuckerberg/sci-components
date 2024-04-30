import { Args } from "@storybook/react";
import RawButtonIcon from "src/core/ButtonIcon";

export const ButtonIcon = (props: Args): JSX.Element => {
  const { icon, ...rest } = props;

  return (
    <RawButtonIcon icon={icon} sdsSize="medium" sdsType="primary" {...rest} />
  );
};
