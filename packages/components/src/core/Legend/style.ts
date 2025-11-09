import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyXxxxs,
  getCorners,
  getSpaces,
  getSemanticColors,
} from "../styles";

export const LegendContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    return `
      column-gap: ${spaces?.xxs}px;
      row-gap: ${spaces?.xxxs}px;
    `;
  }};
`;

interface LegendItemProps extends CommonThemeProps {
  isSelected?: boolean;
  disabled?: boolean;
}

export const LegendItem = styled("div")<LegendItemProps>`
  ${(props: LegendItemProps) => {
    const { isSelected, disabled } = props;
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    return `
      display: flex;
      align-items: center;
      cursor: ${disabled ? "not-allowed" : "pointer"} !important;
      transition: background-color 0.2s ease;
      padding: 0 ${spaces?.xxs}px;
      border-radius: ${corners?.s}px;
      background-color: ${isSelected ? semanticColors?.base?.backgroundTertiary : "transparent"};
      pointer-events: ${disabled ? "none" : "auto"};

      &:hover {
        background-color: ${disabled ? "transparent" : isSelected ? semanticColors?.base?.backgroundTertiary : semanticColors?.base?.backgroundSecondary};
      }
    `;
  }}
`;

interface LegendIconProps extends CommonThemeProps {
  color: string;
  isDimmed?: boolean;
}

export const LegendIcon = styled("div")<LegendIconProps>`
  ${(props: LegendIconProps) => {
    const { color, isDimmed } = props;

    const spaces = getSpaces(props);
    const corners = getCorners(props);

    return `
      width: 8px;
      height: 8px;
      border-radius: ${corners?.s}px;
      background-color: ${color};
      flex-shrink: 0;
      opacity: ${isDimmed ? 0.2 : 1};
      transition: opacity 0.2s ease;
      margin-right: ${spaces?.xxs}px;
    `;
  }};
`;

interface LegendTextProps extends CommonThemeProps {
  disabled?: boolean;
}

export const LegendLabel = styled("span")<LegendTextProps>`
  ${fontBodyXxxxs}
  ${(props: LegendTextProps) => {
    const semanticColors = getSemanticColors(props);
    return `
      color: ${semanticColors?.base?.textPrimary};
    `;
  }};
`;

export const LegendValue = styled("span")<LegendTextProps>`
  ${fontBodyXxxxs}
  ${(props: LegendTextProps) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin-left: ${spaces?.xxxs}px;
    `;
  }};
`;
