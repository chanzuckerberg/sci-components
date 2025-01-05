import styled from "@emotion/styled";
import Button from "src/core/Button";
import {
  CommonThemeProps,
  getSemanticColors,
  getSpaces,
  getTypography,
} from "src/core/styles";

interface PrimaryNavItemProps extends CommonThemeProps {
  active?: boolean;
}

export const PrimaryNavItem = styled(Button)`
  display: flex;
  align-items: center;
  background: none;

  &:hover {
    background: none;
  }

  ${(props: PrimaryNavItemProps) => {
    const spaces = getSpaces(props);

    return `
      gap: ${spaces?.xs}px;
    `;
  }}
`;

export const StyledLabel = styled.span`
  ${(props: PrimaryNavItemProps) => {
    const semanticColors = getSemanticColors(props);
    const typography = getTypography(props);
    const font = typography?.styles.header.semibold.m;
    const spaces = getSpaces(props);

    return `
      border-bottom: solid 2px transparent;
      border-bottom-color: ${props.active ? semanticColors?.accent.border : "transparent"};
      color: ${props.active ? semanticColors?.base.textPrimary : semanticColors?.base.textSecondary};
      font-size: ${font?.fontSize}px;
      font-weight: ${font?.fontWeight};
      line-height: ${font?.lineHeight};
      padding-bottom: ${spaces?.xxxs}px;

      &:hover {
        border-bottom-color: ${semanticColors?.base.border};
      }
    `;
  }}
`;
