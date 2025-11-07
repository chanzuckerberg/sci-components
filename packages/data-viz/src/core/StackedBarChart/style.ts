import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontCapsXxxxs,
  fontHeaderS,
  getCorners,
  getSpaces,
  getSemanticColors,
} from "@czi-sds/components";

interface ChartWrapperProps extends CommonThemeProps {
  width: number;
}

export const ChartWrapper = styled("div")<ChartWrapperProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width}px;
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
  ${fontCapsXxxxs};

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
  width: number;
}

export const BarContainer = styled("div")<BarContainerProps>`
  display: flex;
  width: ${(props) => props.width}px;

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
}

export const BarSegment = styled("div")<BarSegmentProps>`
  background-color: ${(props) => props.color};
  height: ${(props) => props.height}px;
  flex: ${(props) => props.percentage};
  opacity: ${(props) => props.opacity};
  transition: opacity 0.2s ease;
  cursor: pointer;

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
