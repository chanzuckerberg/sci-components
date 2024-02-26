import { Meta } from "@storybook/react";
import { BADGE } from "../../../common/SDSBadges";
import { useTheme } from "@mui/material";
import { Corners, getCorners } from "../../styles";
import {
  StyledCornerBox,
  StyledCornerVariable,
  StyledCornersWrapper,
} from "./style";
import Table from "src/core/Table";
import TableHeader from "src/core/TableHeader";
import CellHeader from "src/core/CellHeader";
import TableRow from "src/core/TableRow";
import CellComponent from "src/core/CellComponent";
import CellBasic from "src/core/CellBasic";
import { copyToClipboard } from "../utils";
import { StyledVariable } from "../style";

export default {
  parameters: {
    badges: [BADGE.WIP],
  },
  title: "Bases/Corners",
} as Meta;

// Corners

const Usage: Record<keyof Corners, string> = {
  l: "Rounded elements (buttons and inputs)",
  m: "Standard, default radius for corners in UI elements (square buttons, form inputs, modals, tooltips, tags, etc.)",
  none: "Corners on backgrounds for hovered dropdown menus and tables.",
  s: "Corners on elements that are smaller than 20px × 20px.",
};

const Title: Record<keyof Corners, string> = {
  l: "Large Corner",
  m: "Medium Corner",
  none: "No Set Corner",
  s: "Small Corner",
};

const Template = () => {
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
          primaryText={Title[name]}
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
          primaryText={Usage[name]}
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

export const Default = {
  render: () => (
    <>
      <StyledCornersWrapper>
        <Template />
      </StyledCornersWrapper>
    </>
  ),
};
