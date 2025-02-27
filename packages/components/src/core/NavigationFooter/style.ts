import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontHeader,
  getSemanticColors,
  getSpaces,
} from "../styles";
import { css } from "@mui/material";

interface ExtraFooterProps extends CommonThemeProps {
  hasInvertedStyle?: boolean;
  isNarrow?: boolean;
}

const doNotForwardProps = ["hasInvertedStyle", "isNarrow"];

export const StyledFooter = styled("footer", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: ExtraFooterProps) => {
    const { isNarrow } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return css`
      background: ${props.hasInvertedStyle
        ? semanticColors?.base.backgroundPrimaryInverse
        : semanticColors?.base.backgroundPrimary};
      padding: ${spaces?.xxl}px ${spaces?.xxl}px ${spaces?.xl}px
        ${spaces?.xxl}px;

      ${isNarrow &&
      css`
        border-top: 1px solid
          ${props.hasInvertedStyle
            ? semanticColors?.base.dividerInverse
            : semanticColors?.base.divider};
        padding: ${spaces?.xl}px ${spaces?.xl}px ${spaces?.l}px ${spaces?.xl}px;
      `}
    `;
  }}
`;

export const StyledLogoWrapper = styled("div", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: ExtraFooterProps) => {
    const spaces = getSpaces(props);

    return css`
      display: flex;
      align-items: center;
      gap: ${spaces?.s}px;

      a {
        text-decoration: none;
      }

      .MuiChip-root {
        margin: 0;
      }
    `;
  }}

  p {
    ${fontHeader("l")}
    ${fontHeader("l", /* isNarrow */ true)}

    ${(props: ExtraFooterProps) => {
      const semanticColors = getSemanticColors(props);

      return css`
        color: ${props.hasInvertedStyle
          ? semanticColors?.base.textPrimaryInverse
          : semanticColors?.base.textPrimary};
        white-space: nowrap;
      `;
    }}
  }
`;

export const StyledNavSection = styled("div", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: ExtraFooterProps) => {
    const { isNarrow } = props;

    const spaces = getSpaces(props);

    return css`
      display: flex;
      align-items: center;
      padding-left: ${spaces?.l}px;
      gap: ${spaces?.xxl}px;

      ${isNarrow &&
      css`
        flex-direction: column;
        gap: 0;
        margin-top: ${spaces?.xl}px;
        width: 100%;
        padding-left: 0;
      `}
    `;
  }}
`;

export const StyledTopSection = styled("div", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: ExtraFooterProps) => {
    const { isNarrow } = props;

    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return css`
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-bottom: ${spaces?.xl}px;

      a:hover {
        text-decoration: none;
      }

      color: ${props.hasInvertedStyle
        ? semanticColors?.base.textSecondaryInverse
        : semanticColors?.base.textSecondary};

      &:hover {
        color: ${props.hasInvertedStyle
          ? semanticColors?.base.textPrimaryInverse
          : semanticColors?.base.textPrimary};
        text-decoration: none;
      }

      ${isNarrow &&
      css`
        flex-direction: column;
        margin-bottom: ${spaces?.xl}px;
      `}
    `;
  }}
`;

export const StyledLinkSection = styled("div", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  align-items: center;
  display: flex;

  .MuiDivider-root {
    height: 18px;
  }

  ${(props: ExtraFooterProps) => {
    const { isNarrow } = props;

    const spaces = getSpaces(props);

    return css`
      gap: ${spaces?.s}px;

      ${isNarrow &&
      css`
        margin-top: ${spaces?.xl}px;
        flex-direction: column;
      `}
    `;
  }}
`;

export const StyledMobileLinkRow = styled.div`
  align-items: center;
  display: flex;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      gap: ${spaces?.s}px;
    `;
  }}
`;

export const StyledImageSection = styled("div", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  align-items: center;
  display: flex;

  ${(props: ExtraFooterProps) => {
    const { isNarrow } = props;

    const spaces = getSpaces(props);

    return css`
      padding-left: ${spaces?.l}px;
      gap: ${spaces?.xxl}px;

      ${isNarrow &&
      css`
        padding-left: 0;
        gap: ${spaces?.xl}px;
        flex-direction: column;
        justify-content: center;
      `}
    `;
  }}
`;

export const StyledMobileImageRow = styled.div`
  align-items: center;
  display: flex;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      gap: ${spaces?.xl}px;
    `;
  }}
`;

export const StyledBottomSection = styled("div", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  align-items: center;
  display: flex;
  justify-content: space-between;

  a:hover {
    text-decoration: none;
  }

  ${(props: ExtraFooterProps) => {
    const { isNarrow } = props;

    const spaces = getSpaces(props);

    return css`
      margin-top: ${spaces?.l}px;

      ${isNarrow &&
      css`
        flex-direction: column-reverse;
        margin-top: ${spaces?.xl}px;
      `}
    `;
  }}
`;
