import { Meta } from "@storybook/react";
import { BADGE } from "../../../common/SDSBadges";
import { useTheme } from "@mui/material";
import { getShadows } from "../../styles";
import {
  StyledShadowBox,
  StyledShadowVariable,
  StyledShadowsWrapper,
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
  title: "Bases/Drop Shadows",
} as Meta;

// Drop Shadows

const Usage: Record<string, string> = {
  l: "Containers that layer on top of all other page content (bottom panels, side panels, modals, etc.)",
  m: "Containers that are part of a page's content, but appear on user input, layering over primary content (dropdown menus, tooltips, etc.)",
  none: "No shadows.",
  s: "Containers that layer closely over content, including images of documents/screens placed in content, and sign up forms.",
};

const Title: Record<string, string> = {
  l: "Large Shadow",
  m: "Medium Shadow",
  none: "No Shadow",
  s: "Small Shadow",
};

const Template = () => {
  const theme = useTheme();
  const shadows = getShadows({ theme });

  const RenderTableRow = (shadow: string, name: string) => {
    const sassVariable = "$sds-drop-shadow-" + name;
    const cssVariable = "--sds-drop-shadow-" + name;

    return (
      <TableRow key={name}>
        <CellComponent verticalAlign="center" horizontalAlign="center">
          <StyledShadowBox shadow={shadow} />
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
        <CellComponent
          verticalAlign="center"
          onClick={() => copyToClipboard(`box-shadow: ${shadow};`)}
        >
          <StyledShadowVariable>box-shadow: {shadow};</StyledShadowVariable>
        </CellComponent>
        <CellBasic
          verticalAlign="center"
          primaryText={Usage[name]}
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
          <CellHeader hideSortIcon style={{ width: 40 }}>
            Example
          </CellHeader>
          <CellHeader hideSortIcon style={{ width: 40 }}>
            Shadow Type
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

export const Default = {
  render: () => (
    <>
      <StyledShadowsWrapper>
        <Template />
      </StyledShadowsWrapper>
    </>
  ),
};
