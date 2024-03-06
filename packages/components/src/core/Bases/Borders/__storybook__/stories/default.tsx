import { useTheme } from "@mui/material";
import CellComponent from "src/core/CellComponent";
import CellHeader from "src/core/CellHeader";
import Table from "src/core/Table";
import TableHeader from "src/core/TableHeader";
import TableRow from "src/core/TableRow";
import { getBorders } from "src/core/styles";
import { StyledBorderBox } from "../style";
import { StyledVariable } from "src/core/Bases/style";
import { copyToClipboard } from "src/core/Bases/utils";
import CellBasic from "src/core/CellBasic";
import { BORDER_USAGE } from "../constants";

export const Template = () => {
  const theme = useTheme();
  const borders = getBorders({ theme });

  const RenderTableRow = (
    border: string,
    group: string | null,
    name: string
  ) => {
    const sassVariable = group
      ? "$sds-border-" + group + "-" + name
      : "$sds-border-" + name;

    const cssVariable = group
      ? "--sds-border-" + group + "-" + name
      : "--sds-border-" + name;

    return (
      <TableRow key={name}>
        <CellComponent verticalAlign="center" horizontalAlign="center">
          <StyledBorderBox border={border} />
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

        <CellComponent
          verticalAlign="center"
          onClick={() => copyToClipboard(`border: ${border};`)}
        >
          <StyledVariable>border: {border};</StyledVariable>
        </CellComponent>

        <CellBasic
          verticalAlign="center"
          primaryText={BORDER_USAGE[sassVariable]}
          shouldShowTooltipOnHover={false}
        />
      </TableRow>
    );
  };

  if (borders) {
    const { none, link, base, ...rest } = borders;

    // eslint-disable-next-line sort-keys
    const TableBodyContent = Object.entries({ none, link, base, ...rest }).map(
      ([key, value]) => {
        if (typeof value === "object") {
          return Object.entries(value).map(([k, v]) => {
            return RenderTableRow(v as string, key, k);
          });
        } else {
          return RenderTableRow(value, null, key);
        }
      }
    );

    return (
      <Table>
        <TableHeader>
          <CellHeader hideSortIcon style={{ width: 40 }}>
            Example
          </CellHeader>
          <CellHeader hideSortIcon>Variables</CellHeader>
          <CellHeader hideSortIcon>Value</CellHeader>
          <CellHeader hideSortIcon>Usage</CellHeader>
        </TableHeader>
        <tbody>{TableBodyContent}</tbody>
      </Table>
    );
  }
};
