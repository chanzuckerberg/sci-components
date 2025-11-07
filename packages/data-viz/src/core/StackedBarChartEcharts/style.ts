import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontCapsXxxxs,
  fontHeaderS,
  getCorners,
  getSemanticColors,
  getSpaces,
} from "@czi-sds/components";

export const ChartWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    return `${spaces?.m}px`;
  }};
`;

export const TitleContainer = styled("div")`
  display: flex;
  align-items: center;
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      gap: ${spaces?.s}px;
      padding: ${spaces?.xs}px 0;
    `;
  }};
`;

export const ChartTitle = styled("h3")`
  ${fontHeaderS}
  font-weight: 600;
  margin: 0;
`;

export const ChartContainer = styled("div")`
  ${getWidthAndHeight}
`;

function getWidthAndHeight({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return `
    width: ${width}px;
    height: ${height}px;
  `;
}

export const StyledBadge = styled("div")`
  ${fontCapsXxxxs}
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);
    const corners = getCorners(props);

    return `
      border-radius: ${corners?.m}px;
      background-color: ${semanticColors?.base?.backgroundTertiary};
      padding: ${spaces?.xxxs}px ${spaces?.xxs}px;
      color: ${semanticColors?.base?.textSecondary};
    `;
  }}
`;
