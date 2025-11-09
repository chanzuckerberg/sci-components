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
  ${fontTabularSemiboldXxxxs};

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
}

export const BarContainer = styled("div")<BarContainerProps>`
  display: flex;
  width: ${(props) =>
    typeof props.width === "number" ? `${props.width}px` : props.width};

  ${(props: BarContainerProps) => {
    const spaces = getSpaces(props);
    const corners = getCorners(props);
    return `
      gap: ${spaces?.xxxs}px;
      border-radius: ${corners?.s}px;
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
  background-color: ${(props) => props.color};
  height: ${(props) => props.height}px;
  flex: ${(props) => props.percentage};
  opacity: ${(props) => props.opacity};
  transition: opacity 0.2s ease;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  ${(props: BarSegmentProps) => {
    const corners = getCorners(props);
    const borderRadius = corners?.s || 2;

    if (props.isFirst && props.isLast) {
      // Single segment - round all corners
      return `
        border-radius: ${borderRadius}px;
      `;
    }
    if (props.isFirst) {
      // First segment - round left corners
      return `
        border-top-left-radius: ${borderRadius}px;
        border-bottom-left-radius: ${borderRadius}px;
      `;
    }
    if (props.isLast) {
      // Last segment - round right corners
      return `
        border-top-right-radius: ${borderRadius}px;
        border-bottom-right-radius: ${borderRadius}px;
      `;
    }
    // Middle segments - no rounding
    return "";
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
  }};
`;
