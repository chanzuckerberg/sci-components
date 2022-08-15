import { css } from "@emotion/react";
import { Link, LinkProps as RawLinkProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CommonThemeProps as StyleProps, getBorders } from "../styles";

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

  return css`
    color: ${theme?.app?.colors.primary[400]};

    &:hover,
    &:focus {
      color: ${theme?.app?.colors.primary[500]};
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
