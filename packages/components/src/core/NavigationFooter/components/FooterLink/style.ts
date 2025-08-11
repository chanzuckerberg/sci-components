import styled from "@emotion/styled";
import { css, Divider } from "@mui/material";
import Link from "src/core/Link";
import {
  CommonThemeProps,
  fontBodyXxs,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

interface FooterLinkStyleProps extends CommonThemeProps {
  hasInvertedStyle?: boolean;
  showDivider?: boolean;
}

const doNotForwardProps = ["hasInvertedStyle", "showDivider"];

export const StyledLinkItemLink = styled(Link, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBodyXxs}

  ${(props: FooterLinkStyleProps) => {
    const { showDivider, hasInvertedStyle } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return css`
      color: ${hasInvertedStyle
        ? semanticColors?.base.textSecondaryInverse
        : semanticColors?.base.textSecondary};
      white-space: nowrap;
      position: relative;

      &:hover {
        color: ${hasInvertedStyle
          ? semanticColors?.base.textPrimaryInverse
          : semanticColors?.base.textPrimary};
        text-decoration: none;
      }

      ${showDivider &&
      css`
        &:after {
          content: "";
          position: absolute;
          top: 0;
          right: -${spaces?.s}px;
          display: block;
          height: 100%;
          width: 1px;
          margin-left: ${spaces?.s}px;
          background-color: ${hasInvertedStyle
            ? semanticColors?.base.dividerInverse
            : semanticColors?.base.divider};
        }
      `}
    `;
  }}
`;

export const StyledDivider = styled(Divider, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: FooterLinkStyleProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      border-color: ${
        props.hasInvertedStyle
          ? semanticColors?.base.dividerInverse
          : semanticColors?.base.divider
      };
    `;
  }}
`;
