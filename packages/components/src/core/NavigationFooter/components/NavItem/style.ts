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
  const colors = getSemanticColors(props);

  return css`
    min-height: 48px;
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: ${props.hasInvertedStyle
        ? colors?.base.textPrimaryInverse
        : colors?.base.textPrimary};
      background: ${props.hasInvertedStyle
        ? colors?.base.backgroundSecondaryInverse
        : colors?.base.backgroundSecondary};
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

    const colors = getSemanticColors(props);

    return css`
      color: ${props.hasInvertedStyle
        ? colors?.base.textPrimaryInverse
        : colors?.base.textPrimary};
      white-space: nowrap;

      &:hover {
        color: ${colors?.accent.textAction};
        text-decoration: none;
        font-weight: 600;
      }

      ${isNarrow && NarrowNavItemLinkStyles(props)}
    `;
  }}
`;
