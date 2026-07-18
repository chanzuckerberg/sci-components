import { useTheme } from "@mui/material";
import { getShadows } from "@components/src/core/styles";
import { StyledShadowBox, StyledShadowVariable } from "../style";
import Table from "@components/src/core/Table";
import TableHeader from "@components/src/core/TableHeader";
import CellHeader from "@components/src/core/CellHeader";
import TableRow from "@components/src/core/TableRow";
import CellComponent from "@components/src/core/CellComponent";
import CellBasic from "@components/src/core/CellBasic";
import { copyToClipboard } from "@components/src/core/Bases/utils";
import { StyledVariable } from "@components/src/core/Bases/style";
import { DROP_SHADOWS_TITLE, DROP_SHADOWS_USAGE } from "../constants";

export const Template = () => {
  const theme = useTheme();
  const shadows = getShadows({ theme });

  const RenderTableRow = (shadow: string, name: string) => {
    const sassVariable = "$sds-drop-shadow-" + name;
    const cssVariable = "--sds-drop-shadow-" + name;

    return (
      <TableRow key={name} hover={false}>
        <CellComponent verticalAlign="center" horizontalAlign="center">
          <StyledShadowBox shadow={shadow} />
        </CellComponent>
        <CellBasic
          primaryText={DROP_SHADOWS_TITLE[name]}
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
        <CellComponent
          verticalAlign="center"
          onClick={() => copyToClipboard(`box-shadow: ${shadow};`)}
        >
          <StyledShadowVariable>box-shadow: {shadow};</StyledShadowVariable>
        </CellComponent>
        <CellBasic
          verticalAlign="center"
          primaryText={DROP_SHADOWS_USAGE[name]}
          shouldShowTooltipOnHover={false}
          primaryTextWrapLineCount={5}
        />
      </TableRow>
    );
  };

  if (shadows) {
    const { l, m, s, none } = shadows;

    // eslint-disable-next-line sort-keys
    const TableBodyContent = Object.entries({ l, m, s, none }).map(
      ([key, value]) => RenderTableRow(value, key)
    );

    return (
      <Table>
        <TableHeader>
          <CellHeader hideSortIcon style={{ width: 120 }}>
            Example
          </CellHeader>
          <CellHeader hideSortIcon>Shadow Type</CellHeader>
          <CellHeader hideSortIcon>Variables</CellHeader>
          <CellHeader hideSortIcon>Value</CellHeader>
          <CellHeader hideSortIcon>Usage</CellHeader>
        </TableHeader>

        <tbody>{TableBodyContent}</tbody>
      </Table>
    );
  }
};
