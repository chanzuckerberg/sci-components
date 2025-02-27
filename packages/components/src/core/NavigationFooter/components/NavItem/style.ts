import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { css } from "@mui/material";
import Link from "src/core/Link";
import {
  CommonThemeProps,
  fontBody,
  fontHeader,
  getSemanticColors,
} from "src/core/styles";

interface NavItemStyleProps extends CommonThemeProps {
  hasInvertedStyle?: boolean;
  isNarrow?: boolean;
}

const doNotForwardProps = ["hasInvertedStyle", "isNarrow"];

const NarrowNavItemLinkStyles = (
  props: NavItemStyleProps
): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    min-height: 48px;
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: ${props.hasInvertedStyle
        ? semanticColors?.base.textPrimaryInverse
        : semanticColors?.base.textPrimary};
      background: ${props.hasInvertedStyle
        ? semanticColors?.base.backgroundSecondaryInverse
        : semanticColors?.base.backgroundSecondary};
    }
  `;
};

export const StyledNavItemLink = styled(Link, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontHeader("m")}
  ${fontBody("s", "regular", /* isNarrow */ true)}

  ${(props: NavItemStyleProps) => {
    const { isNarrow } = props;

    const semanticColors = getSemanticColors(props);

    return css`
      color: ${props.hasInvertedStyle
        ? semanticColors?.base.textSecondaryInverse
        : semanticColors?.base.textSecondary};
      white-space: nowrap;

      &:hover {
        color: ${props.hasInvertedStyle
          ? semanticColors?.base.textPrimaryInverse
          : semanticColors?.base.textPrimary};
        text-decoration: none;
        font-weight: 600;
      }

      ${isNarrow && NarrowNavItemLinkStyles(props)}
    `;
  }}
`;
