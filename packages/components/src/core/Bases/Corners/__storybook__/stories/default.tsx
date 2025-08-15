import Table from "src/core/Table";
import TableHeader from "src/core/TableHeader";
import CellHeader from "src/core/CellHeader";
import TableRow from "src/core/TableRow";
import CellComponent from "src/core/CellComponent";
import { copyToClipboard } from "src/core/Bases/utils";
import { StyledVariable } from "src/core/Bases/style";
import { useTheme } from "@mui/material";
import { Corners, getCorners } from "src/core/styles";
import { StyledCornerBox, StyledCornerVariable } from "../style";

export const Template = () => {
  const theme = useTheme();
  const corners = getCorners({ theme });

  const RenderTableRow = (size: number, name: keyof Corners) => {
    const sassVariable = "$sds-corner-" + name;
    const cssVariable = "--sds-corner-" + name;

    return (
      <TableRow key={name} hover={false}>
        <CellComponent verticalAlign="center" horizontalAlign="center">
          <StyledCornerBox size={size} />
        </CellComponent>

        <CellComponent verticalAlign="center">
          <StyledVariable
            onClick={() => copyToClipboard(sassVariable)}
            type="sass"
          >
            {sassVariable}
          </StyledVariable>
          <StyledVariable
            onClick={() => copyToClipboard(cssVariable)}
            type="css"
          >
            {cssVariable}
          </StyledVariable>
        </CellComponent>

        <CellComponent verticalAlign="center">
          <StyledCornerVariable>{`${size}px`}</StyledCornerVariable>
        </CellComponent>
      </TableRow>
    );
  };

  if (corners) {
    const TableBodyContent = Object.entries(corners)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => RenderTableRow(value, key as keyof Corners));

    return (
      <Table>
        <TableHeader>
          <CellHeader hideSortIcon>Example</CellHeader>
          <CellHeader hideSortIcon>Variables</CellHeader>
          <CellHeader hideSortIcon>Value</CellHeader>
        </TableHeader>
        <tbody>{TableBodyContent}</tbody>
      </Table>
    );
  }
};
