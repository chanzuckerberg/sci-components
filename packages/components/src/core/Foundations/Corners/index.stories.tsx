import { Meta } from "@storybook/react";
import { BADGE } from "../../../common/SDSBadges";
import { useTheme } from "@mui/material";
import { getCorners } from "../../styles";
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

export default {
  parameters: {
    badges: [BADGE.WIP],
  },
  title: "Foundations/Corners",
} as Meta;

// Corners

const Template = () => {
  const theme = useTheme();
  const corners = getCorners({ theme });

  if (corners) {
    return (
      <Table>
        <TableHeader>
          <CellHeader hideSortIcon>Example</CellHeader>
          <CellHeader hideSortIcon>Corner Type</CellHeader>
          <CellHeader hideSortIcon>Variable</CellHeader>
          <CellHeader hideSortIcon>Usage</CellHeader>
        </TableHeader>
        <tbody>
          <TableRow>
            <CellComponent verticalAlign="center" horizontalAlign="center">
              <StyledCornerBox size={corners?.l} />
            </CellComponent>
            <CellBasic
              primaryText="Large Corner"
              secondaryText={`${corners?.l}px`}
              verticalAlign="center"
              shouldShowTooltipOnHover={false}
            />
            <CellComponent
              verticalAlign="center"
              onClick={() => copyToClipboard("$sds-corners-corner-l")}
            >
              <StyledCornerVariable>$sds-corners-corner-l</StyledCornerVariable>
            </CellComponent>
            <CellBasic
              verticalAlign="center"
              primaryText="Rounded elements (buttons and inputs)"
              shouldShowTooltipOnHover={false}
            />
          </TableRow>

          <TableRow>
            <CellComponent verticalAlign="center" horizontalAlign="center">
              <StyledCornerBox size={corners?.m} />
            </CellComponent>
            <CellBasic
              primaryText="Medium Corner"
              secondaryText={`${corners?.m}px`}
              verticalAlign="center"
              shouldShowTooltipOnHover={false}
            />
            <CellComponent
              verticalAlign="center"
              onClick={() => copyToClipboard("$sds-corners-corner-m")}
            >
              <StyledCornerVariable>$sds-corners-corner-m</StyledCornerVariable>
            </CellComponent>
            <CellBasic
              primaryText="Standard, default radius for corners in UI elements (square buttons, form inputs, modals, tooltips, tags, etc.)"
              verticalAlign="center"
              shouldShowTooltipOnHover={false}
            />
          </TableRow>

          <TableRow>
            <CellComponent verticalAlign="center" horizontalAlign="center">
              <StyledCornerBox size={corners?.s} />
            </CellComponent>
            <CellBasic
              primaryText="Small Corner"
              secondaryText={`${corners?.s}px`}
              verticalAlign="center"
              shouldShowTooltipOnHover={false}
            />
            <CellComponent
              verticalAlign="center"
              onClick={() => copyToClipboard("$sds-corners-corner-s")}
            >
              <StyledCornerVariable>$sds-corners-corner-s</StyledCornerVariable>
            </CellComponent>
            <CellBasic
              primaryText="Corners on elements that are smaller than 20px × 20px."
              verticalAlign="center"
              shouldShowTooltipOnHover={false}
            />
          </TableRow>

          <TableRow>
            <CellComponent verticalAlign="center" horizontalAlign="center">
              <StyledCornerBox size={corners?.none} />
            </CellComponent>
            <CellBasic
              primaryText="No Set Corner"
              secondaryText={`${corners?.none}px`}
              verticalAlign="center"
              shouldShowTooltipOnHover={false}
            />
            <CellComponent
              verticalAlign="center"
              onClick={() => copyToClipboard("$sds-corners-corner-none")}
            >
              <StyledCornerVariable>
                $sds-corners-corner-none
              </StyledCornerVariable>
            </CellComponent>
            <CellBasic
              primaryText="Corners on backgrounds for hovered dropdown menus and tables."
              verticalAlign="center"
              shouldShowTooltipOnHover={false}
            />
          </TableRow>
        </tbody>
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
