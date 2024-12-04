import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBody,
  fontHeader,
  getSemanticColors,
  getSpaces,
} from "../styles";
import Link from "../Link";

interface ExtraFooterProps extends CommonThemeProps {
  hasInvertedStyle?: boolean;
}

export const StyledFooter = styled.footer`
  ${(props: ExtraFooterProps) => {
    const spaces = getSpaces(props);
    const colors = getSemanticColors(props);

    return `
      background: ${props.hasInvertedStyle ? colors?.base.surfaceInverse : colors?.base.surface};
      padding: ${spaces?.xxl}px ${spaces?.xxl}px ${spaces?.xl}px ${spaces?.xxl}px;

      ${props.theme?.breakpoints.down("md")} {
        border-top: 1px solid ${props.hasInvertedStyle ? colors?.base.dividerInverse : colors?.base.divider};
      padding: ${spaces?.xxl}px ${spaces?.xl}px ${spaces?.l}px ${spaces?.xl}px;
      }
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
      const spaces = getSpaces(props);
      const colors = getSemanticColors(props);

      return `
        color: ${props.hasInvertedStyle ? colors?.base.textPrimaryInverse : colors?.base.textPrimary};
        margin: 0 ${spaces?.xs}px 0 ${spaces?.l}px;

        ${props.theme?.breakpoints.down("md")} {
          margin-left: ${spaces?.xs}px;
        }
      `;
    }}
  }

  .MuiChip-root {
    margin: 0;
  }
`;

export const StyledNavSection = styled.div`
  display: flex;
  align-items: center;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      gap: ${spaces?.xxl}px;

      ${props.theme?.breakpoints.down("md")} {
        flex-direction: column;
        gap: ${spaces?.xl}px;
        margin-top: ${spaces?.xl}px;
        width: 100%;
      }
    `;
  }}
`;

export const StyledNavItemLink = styled(Link)`
  ${fontHeader("l")}
  ${fontBody("s", "regular", /* isNarrow */ true)}

  ${(props: ExtraFooterProps) => {
    const colors = getSemanticColors(props);

    return `
      color: ${props.hasInvertedStyle ? colors?.base.textPrimaryInverse : colors?.base.textPrimary};

      &:hover {
        color: ${colors?.accent.textAction};
        text-decoration: none;
      }

      ${props.theme?.breakpoints.down("md")} {
        min-height: 48px;
        text-align: center;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          color: ${props.hasInvertedStyle ? colors?.base.textPrimaryInverse : colors?.base.textPrimary};
          background: ${props.hasInvertedStyle ? colors?.base.backgroundSecondaryInverse : colors?.base.backgroundSecondary};
        }
      }
    `;
  }}
`;

export const StyledTopSection = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;

  a:hover {
    text-decoration: none;
  }

  ${(props: ExtraFooterProps) => {
    const colors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${props.hasInvertedStyle ? colors?.base.textSecondaryInverse : colors?.base.textSecondary};

      &:hover {
        color: ${props.hasInvertedStyle ? colors?.base.textPrimaryInverse : colors?.base.textPrimary};
        text-decoration: none;
      }

      ${props.theme?.breakpoints.down("md")} {
        flex-direction: column;
        margin-bottom: ${spaces?.xl}px;
      }
    `;
  }}
`;

export const StyledLinkItemLink = styled(Link)`
  ${fontBody("xxs", "regular")}

  ${(props: ExtraFooterProps) => {
    const colors = getSemanticColors(props);

    return `
      color: ${props.hasInvertedStyle ? colors?.base.textSecondaryInverse : colors?.base.textSecondary};

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

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      gap: ${spaces?.xxs}px ${spaces?.m}px;

      ${props.theme?.breakpoints.down("md")} {
        margin-top: ${spaces?.xl}px;
        flex-direction: column;
      }
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

      ${props.theme?.breakpoints.down("md")} {
      }
    `;
  }}
`;

export const StyledImageSection = styled.div`
  align-items: center;
  display: flex;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      gap: ${spaces?.xl}px;

      ${props.theme?.breakpoints.down("md")} {
        margin-top:
        gap: ${spaces?.m}px;
        flex-direction: column;
        justify-content: center;
      }
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

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      margin-top: ${spaces?.l}px;

      ${props.theme?.breakpoints.down("md")} {
        flex-direction: column-reverse;
      }
    `;
  }}
`;
