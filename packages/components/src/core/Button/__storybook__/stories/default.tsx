import { Args } from "@storybook/react-webpack5";
import React from "react";
import RawButton from "src/core/Button";
import { StyledBackgroundAppearanceWrapper } from "../../style";

export const Button = (props: Args): JSX.Element => {
  const { sdsStyle } = props;

  return (
    <StyledBackgroundAppearanceWrapper
      backgroundAppearance={props.backgroundAppearance}
    >
      <RawButton {...props} sdsStyle={sdsStyle} />
    </StyledBackgroundAppearanceWrapper>
  );
};
