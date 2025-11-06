import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { css } from "@mui/material";
import Link from "src/core/Link";
import {
  CommonThemeProps,
  fontBodyMediumS,
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
        ? semanticColors?.base.textPrimaryOnDark
        : semanticColors?.base.textPrimary};
      background: ${props.hasInvertedStyle
        ? semanticColors?.base.backgroundSecondaryOnDark
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
        ? semanticColors?.base.textSecondaryOnDark
        : semanticColors?.base.textSecondary};
      background-color: transparent;
      white-space: nowrap;
      padding: ${spaces?.xxxs}px ${spaces?.m}px;
      border-radius: ${corners?.l}px;

      &:hover {
        color: ${props.hasInvertedStyle
          ? semanticColors?.base.textPrimaryOnDark
          : semanticColors?.base.textPrimary};
        background-color: ${props.hasInvertedStyle
          ? semanticColors?.base.fillHoverOnDark
          : semanticColors?.base.fillHover};
        text-decoration: none;
      }

      &:active,
      &:focus {
        color: ${props.hasInvertedStyle
          ? semanticColors?.base.textPrimaryOnDark
          : semanticColors?.accent.textActionPressed};
      }

      ${isNarrow && NarrowNavItemLinkStyles(props)}
    `;
  }}
`;
