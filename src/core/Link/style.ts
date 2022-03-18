import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link, LinkProps as RawLinkProps } from "@material-ui/core";
import { CommonThemeProps as StyleProps } from "../styles";

export type LinkProps = RawLinkProps &
  StyleProps & {
    sdsStyle?: "default" | "dashed";
  };

const defaultStyle = (props: LinkProps) => {
  const { theme } = props;

  return css`
    color: ${theme?.app?.colors.primary[400]};

    &:hover,
    &:focus {
      color: ${theme?.app?.colors.primary[600]};
    }
  `;
};

const dashedStyle = (_props: LinkProps) => {
  return css`
    color: inherit;
    border-bottom: 1px dashed;

    &:hover,
    &:focus {
      text-decoration: none;
      border-bottom: 1px solid;
    }
  `;
};

export const StyledLink = styled(Link)`
  ${(props: LinkProps) => {
    const { sdsStyle } = props;

    return css`
      ${sdsStyle === "default" && defaultStyle(props)}
      ${sdsStyle === "dashed" && dashedStyle(props)}
    `;
  }}
`;
