import { css } from "@emotion/react";
import { Link, LinkProps as RawLinkProps } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps as StyleProps,
  focusVisibleA11yStyle,
  fontBodyS,
  fontBodyXs,
  getSemanticColors,
} from "src/core/styles";

// (thuang): Support `component` prop
// https://stackoverflow.com/a/66123108
export type LinkProps<C extends React.ElementType = "a"> = RawLinkProps<
  C,
  { component?: C }
> &
  StyleProps & {
    fontWeight?: "normal" | "bold";
    sdsStyle?: "default" | "dashed";
    sdsSize?: "xs" | "s";
  };

const doNotForwardProps = ["sdsStyle", "sdsSize", "fontWeight"];

const defaultStyle = (props: LinkProps) => {
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

const smallStyle = (props: LinkProps) => {
  return fontBodyS(props);
};

const extraSmallStyle = (props: LinkProps) => {
  return fontBodyXs(props);
};

export const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => {
    return !doNotForwardProps.includes(prop.toString());
  },
})`
  all: unset;

  ${focusVisibleA11yStyle}

  ${(props: LinkProps) => {
    const { fontWeight = "normal", sdsStyle, sdsSize = "s" } = props;

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
