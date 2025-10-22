import { css } from "@emotion/react";
import { Link } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontBodyS,
  fontBodyXs,
  getSemanticColors,
} from "src/core/styles";
import { LinkProps } from ".";

const doNotForwardProps = ["sdsStyle", "sdsSize", "fontWeight"];

const defaultStyle = (props: LinkProps & CommonThemeProps) => {
  const semanticColors = getSemanticColors(props);

  return css`
    color: ${semanticColors?.accent?.textAction};
    position: relative;
    text-decoration: none;
    text-underline-offset: 2.5px;

    &:hover {
      color: ${semanticColors?.accent?.textActionHover};
      text-decoration: underline;
    }

    &:focus {
      color: ${semanticColors?.accent?.textActionHover};
      text-decoration: underline;
    }

    &:active {
      color: ${semanticColors?.accent?.textActionPressed};
      text-decoration: underline;
    }
  `;
};

const dashedStyle = () => {
  return css`
    color: inherit;
    position: relative;
    text-decoration: underline dashed;
    text-underline-offset: 2.5px;

    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      text-decoration-style: solid;
    }
  `;
};

const smallStyle = (props: LinkProps & CommonThemeProps) => {
  return fontBodyS(props);
};

const extraSmallStyle = (props: LinkProps & CommonThemeProps) => {
  return fontBodyXs(props);
};

export const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => {
    return !doNotForwardProps.includes(prop.toString());
  },
})`
  all: unset;

  ${focusVisibleA11yStyle}

  ${(props: LinkProps & CommonThemeProps) => {
    const {
      fontWeight = "normal",
      sdsStyle = "default",
      sdsSize = "s",
    } = props;

    return css`
      ${sdsStyle === "default" && defaultStyle(props)}
      ${sdsStyle === "dashed" && dashedStyle()}
      ${sdsSize === "s" && smallStyle(props)}
      ${sdsSize === "xs" && extraSmallStyle(props)}

      font-weight: ${fontWeight === "normal" ? "400" : "600"};
      display: inline-block;
      cursor: pointer;
    `;
  }}
` as typeof Link;
