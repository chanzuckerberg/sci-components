import { useTheme } from "@mui/material";
import { getSpaces } from "@components/src/core/styles";
import {
  StyledInlineSpacingBox,
  StyledInsetSpacingBox,
  StyledSpacingVariable,
  StyledStackedSpacingBox,
} from "../style";
import Table from "@components/src/core/Table";
import TableHeader from "@components/src/core/TableHeader";
import CellHeader from "@components/src/core/CellHeader";
import TableRow from "@components/src/core/TableRow";
import CellComponent from "@components/src/core/CellComponent";
import { copyToClipboard } from "@components/src/core/Bases/utils";
import { StyledVariable } from "@components/src/core/Bases/style";

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
          <CellHeader hideSortIcon>Inset Spacing</CellHeader>
          <CellHeader hideSortIcon>Inline Spacing</CellHeader>
          <CellHeader hideSortIcon>Stacked Spacing</CellHeader>
          <CellHeader hideSortIcon>Variables</CellHeader>
          <CellHeader hideSortIcon>Value</CellHeader>
        </TableHeader>

        <tbody>{TableBodyContent}</tbody>
      </Table>
    );
  }
};
