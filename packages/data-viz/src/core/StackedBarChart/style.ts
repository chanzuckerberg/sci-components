import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyMediumXs,
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
      margin-bottom: ${spaces?.s}px;
    `;
  }}
`;

export const ChartTitle = styled("div")`
  ${fontBodyMediumXs}

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    return `
      color: ${semanticColors?.base?.textPrimary};
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
      border-radius: ${corners?.m}px;
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
  opacity: number;
  disabled?: boolean;
  isLast: boolean;
  "data-hide"?: boolean;
}

export const BarSegment = styled("div")<BarSegmentProps>`
  ${(props: BarSegmentProps) => {
    const { color, height, percentage, opacity, disabled, isLast } = props;

    const spaces = getSpaces(props);
    const corners = getCorners(props);
    const gap = spaces?.xxxs || 0;

    // Add gap as margin-right for spacing between segments
    // When percentage is 0, margin also becomes 0 (animates away with the segment)
    // Last visible segment also gets no margin
    const marginRight = percentage > 0 && !isLast ? `${gap}px` : 0;

    return `
      background-color: ${color};
      border-radius: ${corners?.m}px;
      height: ${height}px;
      flex-grow: ${percentage};
      flex-basis: 0;
      flex-shrink: 1;
      margin-right: ${marginRight};
      opacity: ${opacity};
      transition: opacity 0.2s ease-in-out, flex-grow 0.25s ease-in-out, margin-right 0.25s ease-out;
      cursor: ${disabled ? "default" : "pointer"};
      pointer-events: ${disabled ? "none" : "auto"};
    `;
  }}
`;

export const StyledStackedBarChartWrapper = styled("div")`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-direction: column;
      gap: ${spaces?.s}px;
    `;
  }}
`;
