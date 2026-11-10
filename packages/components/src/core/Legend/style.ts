import styled from "@emotion/styled";
import { popoverClasses } from "@mui/material";
import {
  CommonThemeProps,
  fontBodyMediumXxxxs,
  fontBodyXxxxs,
  getCorners,
  getShadows,
  getSpaces,
  getSemanticColors,
} from "../styles";
import Popover from "../Popover";

export const LegendContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    // Negative margin cancels the item padding so the first swatch and text
    // sit flush with the chart edge while hover backgrounds keep their padding
    return `
      column-gap: ${spaces?.xxs}px;
      row-gap: ${spaces?.xxxs}px;
      margin: -${spaces?.xxxs}px -${spaces?.xxs}px;
    `;
  }}
`;

interface LegendItemProps extends CommonThemeProps {
  isSelected?: boolean;
  disabled?: boolean;
  isHovered?: boolean;
}

export const LegendItem = styled("div")<LegendItemProps>`
  ${(props: LegendItemProps) => {
    const { isSelected, disabled, isHovered } = props;
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    return `
      display: flex;
      align-items: center;
      cursor: ${disabled ? "not-allowed" : "pointer"} !important;
      transition: background-color 0.2s ease-in-out;
      padding: ${spaces?.xxxs}px ${spaces?.xxs}px;
      border-radius: ${corners?.s}px;
      background-color: ${isSelected ? semanticColors?.base?.backgroundTertiary : isHovered ? semanticColors?.base?.backgroundSecondary : "transparent"};
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
      width: ${spaces?.s}px;
      height: ${spaces?.s}px;
      border-radius: ${corners?.s}px;
      background-color: ${color};
      flex-shrink: 0;
      opacity: ${isDimmed ? 0.2 : 1};
      transition: opacity 0.2s ease-in-out;
      margin-right: ${spaces?.xxs}px;
    `;
  }}
`;

interface LegendTextProps extends CommonThemeProps {
  disabled?: boolean;
}

export const LegendLabel = styled("span")<LegendTextProps>`
  ${fontBodyMediumXxxxs}
  ${(props: LegendTextProps) => {
    const semanticColors = getSemanticColors(props);
    return `
      color: ${semanticColors?.base?.textPrimary};
    `;
  }}
`;

export const LegendValue = styled("span")<LegendTextProps>`
  ${fontBodyXxxxs}
  ${(props: LegendTextProps) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin-left: ${spaces?.xxs}px;
    `;
  }}
`;

export const StyledLegendPopover = styled(Popover)`
  & .${popoverClasses.paper} {
    ${(props: CommonThemeProps) => {
      const spaces = getSpaces(props);
      const corners = getCorners(props);
      const shadows = getShadows(props);

      // Adds back the nested legend negative margins so the visual inset
      // stays at spaces.s
      return `
        max-width: 480px;
        padding: ${(spaces?.s ?? 0) + (spaces?.xxxs ?? 0)}px ${(spaces?.s ?? 0) + (spaces?.xxs ?? 0)}px;
        border-radius: ${corners?.xl}px;
        box-shadow: ${shadows?.l};
      `;
    }}
  }
`;
