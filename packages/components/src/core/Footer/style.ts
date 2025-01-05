import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBody,
  fontBodyXxs,
  fontHeader,
  fontHeaderL,
  getSemanticColors,
  getSpaces,
} from "../styles";
import Link from "../Link";

export const StyledFooter = styled.footer`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const colors = getSemanticColors(props);

    return `
      background: ${colors?.base.surfacePrimary};
      padding: ${spaces?.xxl}px ${spaces?.xxl}px ${spaces?.xl}px ${spaces?.xxl}px;
    `;
  }}
`;

export const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;

  p {
    ${fontHeader("l")}
    ${fontHeader("l", /* isMobile */ true)}

    ${(props: CommonThemeProps) => {
      const spaces = getSpaces(props);

      return `
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
    `;
  }}
`;

export const StyledNavItemLink = styled(Link)`
  ${fontHeaderL}
  ${fontBody("s", "regular", /* isMobile */ true)}

  ${(props: CommonThemeProps) => {
    const colors = getSemanticColors(props);

    return `
      color: ${colors?.base.textPrimary};

      &:hover {
        color: ${colors?.accent.textAction};
        text-decoration: none;
      }
    `;
  }}
`;

export const StyledTopSection = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
`;

export const StyledLinkItemLink = styled(Link)`
  ${fontBodyXxs}

  ${(props: CommonThemeProps) => {
    const colors = getSemanticColors(props);

    return `
      color: ${colors?.base.textSecondary};

      &:hover {
        color: ${colors?.base.textPrimary};
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
      gap: ${spaces?.xxs}px;
    `;
  }}
`;

export const StyledLogoSection = styled.div`
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

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      margin-top: ${spaces?.l}px;
    `;
  }}
`;
