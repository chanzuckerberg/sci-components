"use client";

import { styled } from "@mui/material/styles";

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
