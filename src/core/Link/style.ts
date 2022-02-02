import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link, LinkProps as Props } from "@material-ui/core";
import { Props as StyleProps } from "../styles";

export type LinkProps = Props &
  StyleProps & {
    sdsStyle?: "default";
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

export const StyledLink = styled(Link)`
  ${(props: LinkProps) => {
    const { sdsStyle } = props;

    return css`
      ${sdsStyle === "default" && defaultStyle(props)}
    `;
  }}
`;
