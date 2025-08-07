import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { css } from "@mui/material";
import Link from "src/core/Link";
import {
  CommonThemeProps,
  fontBody,
  fontBodyMediumS,
  fontHeader,
  getCorners,
  getSemanticColors,
  getSpaces,
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
  const spaces = getSpaces(props);

  return css`
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${spaces?.s}px;

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
  ${fontBodyMediumS}

  ${(props: NavItemStyleProps) => {
    const { isNarrow } = props;

    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);
    const corners = getCorners(props);

    return css`
      color: ${props.hasInvertedStyle
        ? semanticColors?.base.textSecondaryInverse
        : semanticColors?.base.textSecondary};
      background-color: transparent;
      white-space: nowrap;
      padding: ${spaces?.xxxs}px ${spaces?.m}px;
      border-radius: ${corners?.l}px;

      &:hover {
        color: ${props.hasInvertedStyle
          ? semanticColors?.base.textPrimaryInverse
          : semanticColors?.base.textPrimary};
        background-color: ${props.hasInvertedStyle
          ? semanticColors?.base.fillHoverInverse
          : semanticColors?.base.fillHover};
        text-decoration: none;
      }

      ${isNarrow && NarrowNavItemLinkStyles(props)}
    `;
  }}
`;
