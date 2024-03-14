import { Args } from "@storybook/react";
import RawButton from "src/core/Button";

export const Button = (props: Args): JSX.Element => {
  const { sdsType, sdsStyle, text, startIcon, startIċon, endIcon, endIċon } =
    props;

  const startIconFinal = startIcon || startIċon;
  const endIconFinal = endIcon || endIċon;

  return (
    <RawButton
      sdsType={sdsType}
      sdsStyle={sdsStyle}
      startIcon={startIconFinal}
      endIcon={endIconFinal}
      {...props}
    >
      {text}
    </RawButton>
  );
};
