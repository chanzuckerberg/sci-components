import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Args } from "@storybook/react-webpack5";
import React from "react";
import RawButton from "src/core/ButtonV2";
import { CommonThemeProps, getSemanticColors } from "src/core/styles";

export const Button = (props: Args): JSX.Element => {
  const { sdsStyle } = props;

  const StyledButtonWrapper = styled("div")<
    {
      backgroundAppearance: "dark" | "matchBackground";
    } & CommonThemeProps
  >`
    ${(p) => {
      const semanticColors = getSemanticColors(p);
      const { backgroundAppearance } = p;

      return css`
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 0;
        padding: 16px;
        display: block;
        background-color: ${backgroundAppearance === "dark"
          ? semanticColors?.base?.backgroundPrimaryDark
          : semanticColors?.base?.backgroundPrimary};
      `;
    }}
  `;

  return (
    <StyledButtonWrapper backgroundAppearance={props.backgroundAppearance}>
      <RawButton {...props} sdsStyle={sdsStyle} />
    </StyledButtonWrapper>
  );
};
