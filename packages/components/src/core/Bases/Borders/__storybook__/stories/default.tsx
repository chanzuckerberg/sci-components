import { useTheme } from "@mui/material";
import CellComponent from "src/core/CellComponent";
import CellHeader from "src/core/CellHeader";
import Table from "src/core/Table";
import TableHeader from "src/core/TableHeader";
import TableRow from "src/core/TableRow";
import { Borders, getBorders, getMode } from "src/core/styles";
import { StyledBorderBox } from "../style";
import { StyledVariable } from "src/core/Bases/style";
import { copyToClipboard } from "src/core/Bases/utils";

export const Template = () => {
  const theme = useTheme();
  const borders = getBorders({ theme });
  const mode = getMode({ theme });

  const RenderTableRow = (
    border: string,
    parentKey: string | null,
    currentKey: string
  ) => {
    const sassVariable = parentKey
      ? `$sds-border-${parentKey}-${currentKey}${mode === "dark" ? "-dark" : ""}`
      : `$sds-border-${currentKey}${mode === "dark" ? "-dark" : ""}`;

    const cssVariable = parentKey
      ? "--sds-border-" + parentKey + "-" + currentKey
      : "--sds-border-" + currentKey;

    return (
      <TableRow key={cssVariable} hover={false}>
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
      </TableRow>
    );
  };

  if (borders) {
    const { none, link, base, ...rest } = borders;

    const generateTableBodyContent = (
      border: Borders,
      parentKey: string | null = null
    ): JSX.Element[] => {
      return Object.entries(border).flatMap(([key, value]) => {
        const currentKey = parentKey ? `${parentKey}-${key}` : key;

        if (typeof value === "object") {
          return generateTableBodyContent(value, currentKey);
        } else {
          return RenderTableRow(value, parentKey, key);
        }
      });
    };

    const TableBodyContent = generateTableBodyContent({
      none,
      // eslint-disable-next-line sort-keys, prettier/prettier
      link,
      // eslint-disable-next-line sort-keys, prettier/prettier
      base,
      ...rest,
    });

    return (
      <Table>
        <TableHeader>
          <CellHeader hideSortIcon style={{ width: 120 }}>
            Example
          </CellHeader>
          <CellHeader hideSortIcon>Variables</CellHeader>
          <CellHeader hideSortIcon>Value</CellHeader>
        </TableHeader>
        <tbody>{TableBodyContent}</tbody>
      </Table>
    );
  }
};
