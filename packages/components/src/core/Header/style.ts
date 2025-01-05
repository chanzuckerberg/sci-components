import { AppBar, Toolbar } from "@mui/material";
import {
  CommonThemeProps,
  getSemanticColors,
  getSpaces,
  getTypography,
} from "../styles";
import Tag from "../Tag";
import InputSearch from "../InputSearch";
import styled from "@emotion/styled";

export const StyledHeader = styled(AppBar)`
  ${(props: CommonThemeProps) => {
    const colors = getSemanticColors(props);

    return `
      background: ${colors?.base.surfacePrimary};
      max-width: 100%;
      overflow-x: auto;
    `;
  }}
`;

export const StyledToolbar = styled(Toolbar)`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      &.MuiToolbar-root {
        padding: ${spaces?.m}px ${spaces?.xl}px;
      }
    `;
  }}
`;

export const StyledLogoWrapper = styled.div`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      margin-right: ${spaces?.l}px;
    `;
  }}
`;

export const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0;
  }

  ${(props: CommonThemeProps) => {
    const colors = getSemanticColors(props);
    const spaces = getSpaces(props);
    const typography = getTypography(props);
    const font = typography?.styles.header.semibold.l;

    return `
      color: ${colors?.base.textPrimary};
      font-size: ${font?.fontSize}px;
      font-weight: ${font?.fontWeight};
      gap: ${spaces?.xs}px;
      line-height: ${font?.lineHeight};
      margin-right: ${spaces?.xxl}px;
    `;
  }}
`;

export const StyledTag = styled(Tag)`
  margin: 0;
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
    `;
  }}
`;

export const StyledSearch = styled(InputSearch)`
  margin: 0;
  max-width: 320px;
  width: 100%;
`;

export const StyledButtonSection = styled.section`
  display: flex;
  items-align: center;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      gap: ${spaces?.m}px;
      margin-left: ${spaces?.xl}px;
    `;
  }}
`;
