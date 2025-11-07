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
}

export const LegendItem = styled("div")<LegendItemProps>`
  ${(props: LegendItemProps) => {
    const { isSelected } = props;
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    return `
      display: flex;
      align-items: center;
      gap: ${spaces?.xs}px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      padding: 0 ${spaces?.xxs}px;
      border-radius: ${corners?.s}px;
      background-color: ${isSelected ? semanticColors?.base?.backgroundTertiary : "transparent"};

      &:hover {
        background-color: ${isSelected ? semanticColors?.base?.backgroundTertiary : semanticColors?.base?.backgroundSecondary};
      }
    `;
  }}
`;

interface LegendIconProps extends CommonThemeProps {
  color: string;
  isDimmed?: boolean;
}

export const LegendIcon = styled("div")<LegendIconProps>`
  width: 8px;
  height: 8px;
  border-radius: ${(props) => {
    const corners = getCorners(props);
    return `${corners?.s}px`;
  }};
  background-color: ${(props) => props.color};
  flex-shrink: 0;
  opacity: ${(props) => (props.isDimmed ? 0.2 : 1)};
  transition: opacity 0.2s ease;
`;

export const LegendLabel = styled("span")`
  ${fontBodyXxxxs}
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    return `
      color: ${semanticColors?.base?.textPrimary};
    `;
  }};
`;

export const LegendValue = styled("span")`
  ${fontBodyXxxxs}
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    return `
      color: ${semanticColors?.base?.textSecondary};
    `;
  }};
`;
