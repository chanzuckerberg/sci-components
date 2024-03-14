import Table from "src/core/Table";
import TableHeader from "src/core/TableHeader";
import CellHeader from "src/core/CellHeader";
import TableRow from "src/core/TableRow";
import CellComponent from "src/core/CellComponent";
import CellBasic from "src/core/CellBasic";
import { copyToClipboard } from "src/core/Bases/utils";
import { StyledVariable } from "src/core/Bases/style";
import { CORNERS_TITLE, CORNERS_USAGE } from "../constants";
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
      <TableRow key={name}>
        <CellComponent verticalAlign="center" horizontalAlign="center">
          <StyledCornerBox size={size} />
        </CellComponent>

        <CellBasic
          primaryText={CORNERS_TITLE[name]}
          verticalAlign="center"
          shouldShowTooltipOnHover={false}
        />

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

        <CellBasic
          verticalAlign="center"
          primaryText={CORNERS_USAGE[name]}
          shouldShowTooltipOnHover={false}
        />
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
          <CellHeader hideSortIcon style={{ width: 40 }}>
            Example
          </CellHeader>
          <CellHeader hideSortIcon style={{ width: 40 }}>
            Corner Type
          </CellHeader>
          <CellHeader hideSortIcon>Variables</CellHeader>
          <CellHeader hideSortIcon style={{ width: 40 }}>
            Value
          </CellHeader>
          <CellHeader hideSortIcon>Usage</CellHeader>
        </TableHeader>
        <tbody>{TableBodyContent}</tbody>
      </Table>
    );
  }
};
