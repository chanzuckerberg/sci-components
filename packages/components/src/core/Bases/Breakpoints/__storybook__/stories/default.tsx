import Table from "src/core/Table";
import TableHeader from "src/core/TableHeader";
import CellHeader from "src/core/CellHeader";
import TableRow from "src/core/TableRow";
import CellComponent from "src/core/CellComponent";
import CellBasic from "src/core/CellBasic";
import { copyToClipboard } from "src/core/Bases/utils";
import { StyledVariable } from "src/core/Bases/style";
import { BREAKPOINTS_USAGE } from "../constants";
import { Breakpoint, useTheme } from "@mui/material";
import { getBreakpoints } from "src/core/styles";

export const Template = () => {
  const theme = useTheme();
  const breakpoints = getBreakpoints({ theme })?.values;

  const RenderTableRow = (size: number, name: Breakpoint) => {
    const sassVariable = "$sds-breakpoint-" + name;
    const cssVariable = "--sds-breakpoint-" + name;

    return (
      <TableRow key={name} hover={false}>
        <CellComponent verticalAlign="center" horizontalAlign="left">
          <strong>{name}</strong>
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

        <CellComponent verticalAlign="center">{`${size}px`}</CellComponent>

        <CellBasic
          verticalAlign="center"
          primaryText={BREAKPOINTS_USAGE[name]}
          shouldShowTooltipOnHover={false}
        />
      </TableRow>
    );
  };

  if (breakpoints) {
    const TableBodyContent = Object.entries(breakpoints)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => RenderTableRow(value, key as Breakpoint));

    return (
      <Table>
        <TableHeader>
          <CellHeader hideSortIcon style={{ width: 30 }}>
            Breakpoint
          </CellHeader>
          <CellHeader hideSortIcon style={{ width: 50 }}>
            Variables
          </CellHeader>
          <CellHeader hideSortIcon style={{ width: 30 }}>
            Value
          </CellHeader>
          <CellHeader hideSortIcon>Usage</CellHeader>
        </TableHeader>
        <tbody>{TableBodyContent}</tbody>
      </Table>
    );
  }
};
