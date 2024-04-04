import { Args } from "@storybook/react";
import { useState } from "react";
import RawButtonIcon from "src/core/ButtonIcon";

export const ButtonIcon = (props: Args): JSX.Element => {
  const { icon, ...rest } = props;

  const [on, setOn] = useState(false);
  const handleButtonClick = () => setOn(!on);

  return (
    <RawButtonIcon
      onClick={handleButtonClick}
      on={on}
      icon={icon}
      sdsSize="medium"
      sdsType="primary"
      {...rest}
    />
  );
};
