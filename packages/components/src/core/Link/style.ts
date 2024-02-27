import { css } from "@emotion/react";
import { Link, LinkProps as RawLinkProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps as StyleProps,
  fontBodyS,
  fontBodyXs,
  getBorders,
  getSemanticTextColors,
} from "../styles";

// (thuang): Support `component` prop
// https://stackoverflow.com/a/66123108
export type LinkProps<C extends React.ElementType = "a"> = RawLinkProps<
  C,
  { component?: C }
> &
  StyleProps & {
    sdsStyle?: "default" | "dashed";
    sdsSize?: "xs" | "s";
  };

const sdsPropNames = ["sdsStyle"];

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
  const border = getBorders(props);

  return css`
    color: inherit;
    border-bottom: ${border?.link.dashed};

    &:hover,
    &:focus {
      text-decoration: none;
      border-bottom: ${border?.link.solid};
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
    return !sdsPropNames.includes(prop.toString());
  },
})`
  ${(props: LinkProps) => {
    const { sdsStyle, sdsSize = "s" } = props;

    return css`
      ${sdsStyle === "default" && defaultStyle(props)}
      ${sdsStyle === "dashed" && dashedStyle(props)}
      ${sdsSize === "s" && smallStyle(props)}
      ${sdsSize === "xs" && extraSmallStyle(props)}
    `;
  }}
` as typeof Link;
