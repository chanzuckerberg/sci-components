import { Args } from "@storybook/react-webpack5";
import React from "react";
import RawButton from "src/core/ButtonV2";

export const Button = (props: Args): JSX.Element => {
  const { sdsStyle } = props;

  return <RawButton {...props} sdsStyle={sdsStyle} />;
};
