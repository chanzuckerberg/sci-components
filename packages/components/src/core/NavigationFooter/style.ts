import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBody,
  fontHeader,
  getSemanticColors,
  getSpaces,
} from "../styles";
import Link from "../Link";
import { css, Divider } from "@mui/material";

interface ExtraFooterProps extends CommonThemeProps {
  hasInvertedStyle?: boolean;
  isNarrow?: boolean;
}

export const StyledFooter = styled.footer`
  ${(props: ExtraFooterProps) => {
    const { isNarrow } = props;

    const spaces = getSpaces(props);
    const colors = getSemanticColors(props);

    return css`
      background: ${props.hasInvertedStyle
        ? colors?.base.surfaceInverse
        : colors?.base.surface};
      padding: ${spaces?.xxl}px ${spaces?.xxl}px ${spaces?.xl}px
        ${spaces?.xxl}px;

      ${isNarrow &&
      css`
        border-top: 1px solid
          ${props.hasInvertedStyle
            ? colors?.base.dividerInverse
            : colors?.base.divider};
        padding: ${spaces?.xxl}px ${spaces?.xl}px ${spaces?.l}px ${spaces?.xl}px;
      `}
    `;
  }}
`;

export const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
  }

  p {
    ${fontHeader("l")}
    ${fontHeader("l", /* isNarrow */ true)}

    ${(props: ExtraFooterProps) => {
      const { isNarrow } = props;

      const spaces = getSpaces(props);
      const colors = getSemanticColors(props);

      return css`
        color: ${props.hasInvertedStyle
          ? colors?.base.textPrimaryInverse
          : colors?.base.textPrimary};
        margin: 0 ${spaces?.xs}px 0 ${spaces?.l}px;
        white-space: nowrap;

        ${isNarrow &&
        css`
          margin-left: ${spaces?.xs}px;
        `}
      `;
    }}
  }

  .MuiChip-root {
    margin: 0;
  }
`;

export const StyledNavSection = styled.div`
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

export const StyledNavItemLink = styled(Link)`
  ${fontHeader("m")}
  ${fontBody("s", "regular", /* isNarrow */ true)}

  ${(props: ExtraFooterProps) => {
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

      ${isNarrow &&
      css`
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
      `}
    `;
  }}
`;

export const StyledTopSection = styled.div`
  ${(props: ExtraFooterProps) => {
    const { isNarrow } = props;

    const colors = getSemanticColors(props);
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
        ? colors?.base.textSecondaryInverse
        : colors?.base.textSecondary};

      &:hover {
        color: ${props.hasInvertedStyle
          ? colors?.base.textPrimaryInverse
          : colors?.base.textPrimary};
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

export const StyledLinkItemLink = styled(Link)`
  ${fontBody("xxs", "regular")}

  ${(props: ExtraFooterProps) => {
    const colors = getSemanticColors(props);

    return `
      color: ${props.hasInvertedStyle ? colors?.base.textSecondaryInverse : colors?.base.textSecondary};
      white-space: nowrap;

      &:hover {
        color: ${props.hasInvertedStyle ? colors?.base.textPrimaryInverse : colors?.base.textPrimary};
        text-decoration: none;
      }
    `;
  }}
`;

export const StyledLinkSection = styled.div`
  align-items: center;
  display: flex;

  .MuiDivider-root {
    height: 18px;
  }

  ${(props: ExtraFooterProps) => {
    const { isNarrow } = props;

    const spaces = getSpaces(props);

    return css`
      gap: ${spaces?.xxs}px ${spaces?.m}px;

      ${isNarrow &&
      css`
        gap: ${spaces?.m}px;
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
      gap: ${spaces?.xxs}px;
    `;
  }}
`;

export const StyledImageSection = styled.div`
  align-items: center;
  display: flex;

  ${(props: ExtraFooterProps) => {
    const { isNarrow } = props;

    const spaces = getSpaces(props);

    return css`
      padding-left: ${spaces?.l}px;
      gap: ${spaces?.xl}px;

      ${isNarrow &&
      css`
        padding-left: 0;
        gap: ${spaces?.m}px;
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

export const StyledBottomSection = styled.div`
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

export const StyledDivider = styled(Divider)`
  ${(props: ExtraFooterProps) => {
    const colors = getSemanticColors(props);

    return `
      border-color: ${
        props.hasInvertedStyle
          ? colors?.base.dividerInverse
          : colors?.base.divider
      };
    `;
  }}
`;
