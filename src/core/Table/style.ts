import { styled } from "@mui/material/styles";

export interface TableExtraProps {
  height?: number | string;
  width?: number | string;
}

const doNotForwardProps = ["height", "width"];

export const StyledTable = styled("table")`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
`;

const withHeight = (props: TableExtraProps) => {
  const { height } = props;

  if (typeof height === "number") {
    return `height: ${height}px;`;
  }
  return `height: ${height};`;
};

const withWidth = (props: TableExtraProps) => {
  const { width } = props;

  if (typeof width === "number") {
    return `width: ${width}px;`;
  }
  return `width: ${width};`;
};

export const StyledTableWrapper = styled("div", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: TableExtraProps) => {
    const { height, width } = props;
    return `
      overflow: auto;
      max-width: 100%;
      ${height && withHeight(props)}
      ${width && withWidth(props)}
    `;
  }}
`;
