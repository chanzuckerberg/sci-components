import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontTabularSemiboldXxxxs,
  fontHeaderS,
  getCorners,
  getSpaces,
  getSemanticColors,
} from "@czi-sds/components";

interface ChartWrapperProps extends CommonThemeProps {
  width: number | string;
}

export const ChartWrapper = styled("div")<ChartWrapperProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) =>
    typeof props.width === "number" ? `${props.width}px` : props.width};
`;

export const TitleContainer = styled("div")`
  display: flex;
  align-items: center;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    return `
      gap: ${spaces?.s}px;
      margin-bottom: ${spaces?.l}px;
    `;
  }}
`;

export const ChartTitle = styled("div")`
  ${fontHeaderS}

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    return `
      color: ${semanticColors?.base?.textPrimary};
    `;
  }}
`;

export const StyledBadge = styled("div")`
  ${fontTabularSemiboldXxxxs}

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const corners = getCorners(props);
    const semanticColors = getSemanticColors(props);

    return `
      padding: ${spaces?.xxxs}px ${spaces?.xxs}px;
      border-radius: ${corners?.m}px;
      background-color: ${semanticColors?.base?.backgroundTertiary};
      color: ${semanticColors?.base?.textSecondary};
    `;
  }}
`;

interface BarContainerProps extends CommonThemeProps {
  width: number | string;
  barHeight: number;
  isEmpty: boolean;
}

export const BarContainer = styled("div")<BarContainerProps>`
  ${(props: BarContainerProps) => {
    const { width, barHeight, isEmpty } = props;

    const corners = getCorners(props);
    const semanticColors = getSemanticColors(props);

    const finalWidth = typeof width === "number" ? `${width}px` : width;

    return `
      display: flex;
      border-radius: ${corners?.s}px;
      width: ${finalWidth};
      height: ${barHeight}px;
      background-color: ${isEmpty ? semanticColors?.base?.backgroundTertiary : "transparent"};
    `;
  }}
`;

interface BarSegmentProps extends CommonThemeProps {
  color: string;
  percentage: number;
  height: number;
  isFirst: boolean;
  isLast: boolean;
  opacity: number;
  disabled?: boolean;
}

export const BarSegment = styled("div")<BarSegmentProps>`
  ${(props: BarSegmentProps) => {
    const { isFirst, isLast, color, height, percentage, opacity, disabled } =
      props;

    const spaces = getSpaces(props);
    const gap = spaces?.xxxs || 0;

    const getBorderRadius = () => {
      const corners = getCorners(props);
      const borderRadius = corners?.s;

      if (isFirst && isLast) {
        return `border-radius: ${borderRadius}px;`;
      }
      if (isFirst) {
        return `
          border-top-left-radius: ${borderRadius}px; 
          border-bottom-left-radius: ${borderRadius}px;
        `;
      }
      if (isLast) {
        return `
          border-top-right-radius: ${borderRadius}px; 
          border-bottom-right-radius: ${borderRadius}px;
        `;
      }
      return "";
    };

    // Add gap as margin-right, except for last item
    // When percentage is 0, margin also becomes 0 (animates away with the segment)
    const marginRight = !isLast && percentage > 0 ? `${gap}px` : 0;

    return `
      background-color: ${color};
      height: ${height}px;
      flex-grow: ${percentage};
      flex-basis: 0;
      flex-shrink: 1;
      margin-right: ${marginRight};
      opacity: ${opacity};
      transition: opacity 0.2s ease-in-out, flex-grow 0.25s ease-in-out, margin-right 0.25s ease-out;
      cursor: ${disabled ? "default" : "pointer"};
      pointer-events: ${disabled ? "none" : "auto"};
      ${getBorderRadius()}
    `;
  }}
`;

export const StyledStackedBarChartWrapper = styled("div")`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-direction: column;
      gap: ${spaces?.m}px;
    `;
  }}
`;
