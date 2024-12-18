import { AppBar, Drawer, Toolbar } from "@mui/material";
import {
  CommonThemeProps,
  fontBody,
  fontHeader,
  getIconSizes,
  getSemanticColors,
  getSpaces,
} from "../styles";
import Tag from "../Tag";
import InputSearch from "../InputSearch";
import styled from "@emotion/styled";
import Link from "../Link";

export interface ExtraHeaderProps extends CommonThemeProps {
  hasInvertedStyle?: boolean;
}

export const StyledHeader = styled(AppBar)`
  ${(props: ExtraHeaderProps) => {
    const colors = getSemanticColors(props);

    return `
      background: ${props.hasInvertedStyle ? colors?.base.surfaceInverse : colors?.base.surface};
      max-width: 100%;
      overflow-x: auto;
    `;
  }}
`;

export const StyledToolbar = styled(Toolbar)`
  ${(props: ExtraHeaderProps) => {
    const spaces = getSpaces(props);
    const colors = getSemanticColors(props);

    return `
      &.MuiToolbar-root {
        padding: ${spaces?.m}px ${spaces?.xl}px;

        ${props.theme?.breakpoints.down("md")} {
          border-bottom: 1px solid ${props.hasInvertedStyle ? colors?.base.dividerInverse : colors?.base.divider}
        }
      }
    `;
  }}
`;

export const StyledLogoLinkWrapper = styled(Link)`
  align-items: center;
  display: flex;

  ${(props: CommonThemeProps) => {
    return `
      ${props.theme?.breakpoints.down("md")} {
        width: 100%;
      }
    `;
  }}
`;

export const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTitleContainer = styled.div`
  ${fontHeader("l")}
  ${fontHeader("l", /* isNarrow */ true)}

  display: flex;
  align-items: center;

  p {
    margin: 0;
  }

  ${(props: ExtraHeaderProps) => {
    const colors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${props.hasInvertedStyle ? colors?.base.textPrimaryInverse : colors?.base.textPrimary};
      margin-right: ${spaces?.xxl}px;

      p {
        margin-left: ${spaces?.l}px;
        margin-right: ${spaces?.xs}px;
      }

      ${props.theme?.breakpoints.down("md")} {
        p {
          margin-left: ${spaces?.xs}px;
        }
      }
    `;
  }}
`;

export const StyledTag = styled(Tag)`
  margin: 0;

  .MuiChip-label {
    ${fontBody("xxxs", "regular")}
    ${fontBody("xxxs", "regular", /* isNarrow */ true)}
  }

  &:hover {
    text-decoration: none;
  }
`;

interface StyledPrimaryNavContainerProps extends CommonThemeProps {
  primaryNavPosition?: "left" | "right";
}

export const StyledPrimaryNavContainer = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;

  ${(props: StyledPrimaryNavContainerProps) => {
    const spaces = getSpaces(props);

    return `
      gap: ${spaces?.xxl}px;
      margin-right: ${spaces?.xxl}px;
      justify-content: ${props.primaryNavPosition === "left" ? "flex-start" : "space-between"};

      ${props.theme?.breakpoints.down("md")} {
        flex-direction: column;
      }
    `;
  }}
`;

export const StyledSearch = styled(InputSearch)`
  margin: 0;
  max-width: 320px;
  width: 100%;

  .MuiInputBase-input {
    ${fontBody("xs", "regular")}
    ${fontBody("m", "regular", /* isNarrow */ true)}
  }

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      ${props.theme?.breakpoints.down("md")} {
        max-width: unset;
        padding: ${spaces?.m}px ${spaces?.xl}px;
      }
    `;
  }}
`;

export const StyledButtonSection = styled.section`
  display: flex;
  align-items: center;

  .MuiButtonBase-root {
    ${fontBody("l", "regular", /* isNarrow */ true)}
  }

  [data-style="minimal"] {
    ${fontBody("m", "regular", /* isNarrow */ true)}
  }

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const sizes = getIconSizes(props);

    return `
      gap: ${spaces?.m}px;
      margin-left: ${spaces?.xl}px;

      ${props.theme?.breakpoints.down("md")} {
        flex-direction: column;
        margin-left: 0;
        margin-top: ${spaces?.xxl}px;
        padding: 0 ${spaces?.xl}px;

        .MuiButton-icon .MuiSvgIcon-root {
          width: ${sizes?.l.width}px;
          height: ${sizes?.l.height}px;
        }
      }
    `;
  }}
`;

export const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 100%;
  }
`;
