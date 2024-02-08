import { css } from "@emotion/react";
import { Link, LinkProps as RawLinkProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps as StyleProps,
  getBorders,
  getTypography,
} from "../styles";

// (thuang): Support `component` prop
// https://stackoverflow.com/a/66123108
export type LinkProps<C extends React.ElementType = "a"> = RawLinkProps<
  C,
  { component?: C }
> &
  StyleProps & {
    sdsStyle?: "default" | "dashed";
  };

const sdsPropNames = ["sdsStyle"];

const defaultStyle = (props: LinkProps) => {
  const { theme } = props;
  const typography = getTypography(props);

  return css`
    color: ${theme?.app?.colors.primary[400]};
    font-family: ${typography?.fontFamily};

    &:hover,
    &:focus {
      color: ${theme?.app?.colors.primary[500]};
    }

    &:active {
      color: ${theme?.app?.colors.primary[600]};
    }
  `;
};

const dashedStyle = (props: LinkProps) => {
  const border = getBorders(props);
  const typography = getTypography(props);

  return css`
    color: inherit;
    font-family: ${typography?.fontFamily};
    border-bottom: ${border?.link.dashed};

    &:hover,
    &:focus {
      text-decoration: none;
      border-bottom: ${border?.link.solid};
    }
  `;
};

export const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  ${(props: LinkProps) => {
    const { sdsStyle } = props;

    return css`
      ${sdsStyle === "default" && defaultStyle(props)}
      ${sdsStyle === "dashed" && dashedStyle(props)}
    `;
  }}
` as typeof Link;
