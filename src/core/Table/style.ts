import { styled } from "@mui/material/styles";

export interface TableExtraProps {
  height?: number;
  width?: number;
}

const doNotForwardProps = ["height", "width"];

export const StyledTable = styled("table")`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
`;

export const StyledTableWrapper = styled("div", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: TableExtraProps) => {
    const { height, width } = props;
    return `
      overflow: auto;
      max-width: 100%;
      ${height ? `height: ${height}px;` : null}
      ${width ? `width: ${width}px;` : null}
    `;
  }}
`;
