import { css } from "@emotion/react";
import { Link, LinkProps as RawLinkProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps as StyleProps,
  fontBodyS,
  fontBodyXs,
  getSemanticTextColors,
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
  const semanticTextColors = getSemanticTextColors(props);

  return css`
    color: ${semanticTextColors?.action?.default};

    &:hover,
    &:focus {
      color: ${semanticTextColors?.action?.hover};
    }

    &:active {
      color: ${semanticTextColors?.action?.pressed};
    }
  `;
};

const dashedStyle = (props: LinkProps) => {
  const { sdsSize = "s" } = props;

  return css`
    color: inherit;
    position: relative;

    &::after {
      content: "";
      display: block;
      position: absolute;
      height: 1px;
      margin-top: ${sdsSize === "s" ? -4 : -3}px;
      width: 100%;
      background-image: linear-gradient(to right, black 60%, transparent 60%);
      background-size: 5px 100%;
    }

    &:hover,
    &:focus {
      text-decoration: none;
      &::after {
        background-image: linear-gradient(to right, black 60%, black 60%);
      }
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

  ${(props: LinkProps) => {
    const { fontWeight = "normal", sdsStyle, sdsSize = "s" } = props;

    return css`
      ${sdsStyle === "default" && defaultStyle(props)}
      ${sdsStyle === "dashed" && dashedStyle(props)}
      ${sdsSize === "s" && smallStyle(props)}
      ${sdsSize === "xs" && extraSmallStyle(props)}

      font-weight: ${fontWeight === "normal" ? "400" : "600"};
      display: inline-block;
      cursor: pointer;
    `;
  }}
` as typeof Link;
