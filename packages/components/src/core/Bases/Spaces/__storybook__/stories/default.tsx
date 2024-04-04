import { useTheme } from "@mui/material";
import { getSpaces } from "src/core/styles";
import {
  StyledInlineSpacingBox,
  StyledInsetSpacingBox,
  StyledSpacingVariable,
  StyledStackedSpacingBox,
} from "../style";
import Table from "src/core/Table";
import TableHeader from "src/core/TableHeader";
import CellHeader from "src/core/CellHeader";
import TableRow from "src/core/TableRow";
import CellComponent from "src/core/CellComponent";
import { copyToClipboard } from "src/core/Bases/utils";
import { StyledVariable } from "src/core/Bases/style";

export const Template = () => {
  const theme = useTheme();
  const spaces = getSpaces({ theme });

  const RenderTableRow = (size: number, name: string) => {
    const sassVariable = "$sds-space-" + name;
    const cssVariable = "--sds-space-" + name;

    return (
      <TableRow key={name} hover={false}>
        <CellComponent verticalAlign="center" horizontalAlign="center">
          <StyledInsetSpacingBox size={size}>{name}</StyledInsetSpacingBox>
        </CellComponent>

        <CellComponent verticalAlign="center" horizontalAlign="center">
          <StyledInlineSpacingBox size={size}>{name}</StyledInlineSpacingBox>
        </CellComponent>

        <CellComponent verticalAlign="center" horizontalAlign="center">
          <StyledStackedSpacingBox size={size}>{name}</StyledStackedSpacingBox>
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
          <StyledSpacingVariable>{`${size}px`}</StyledSpacingVariable>
        </CellComponent>
      </TableRow>
    );
  };

  if (spaces) {
    const TableBodyContent = Object.entries(spaces)
      .sort((a, b) => a[1] - b[1])
      .map(([key, value]) => {
        return RenderTableRow(value, key);
      });

    return (
      <Table>
        <TableHeader>
          <CellHeader hideSortIcon style={{ width: 40 }}>
            Inset Spacing
          </CellHeader>
          <CellHeader hideSortIcon style={{ width: 40 }}>
            Inline Spacing
          </CellHeader>
          <CellHeader hideSortIcon style={{ width: 40 }}>
            Stacked Spacing
          </CellHeader>
          <CellHeader hideSortIcon>Variables</CellHeader>
          <CellHeader hideSortIcon style={{ width: 40 }}>
            Value
          </CellHeader>
        </TableHeader>

        <tbody>{TableBodyContent}</tbody>
      </Table>
    );
  }
};
