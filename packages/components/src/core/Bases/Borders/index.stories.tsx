import { Meta } from "@storybook/react";
import { BADGE } from "../../../common/storybookBadges";
import { useTheme } from "@mui/material";
import { getBorders } from "../../styles";
import { StyledBorderBox, StyledBordersWrapper } from "./storybook/style";
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
  title: "Bases/Borders",
} as Meta;

// Borders

const Usage: Record<string, string> = {
  "$sds-border-accent-300": "-",
  "$sds-border-accent-400":
    "Secondary buttons, active states of input containers",
  "$sds-border-accent-500": "Hover rounded and square buttons",
  "$sds-border-accent-600": "Active rounded and square buttons",
  "$sds-border-accent-dashed":
    "Hover states for containers with dashed borders",
  "$sds-border-base-100": "Modals and dropdown Menus",
  "$sds-border-base-200": "-",
  "$sds-border-base-300":
    "Disabled or non-interactive containers (buttons/inputs/tooltips)",
  "$sds-border-base-400": "Input borders (default states)",
  "$sds-border-base-500": "-",
  "$sds-border-base-black": "Input and dropdown hover states",
  "$sds-border-base-dashed": "File upload/drag and drop containers",
  "$sds-border-beta-400": "-",
  "$sds-border-info-400": "-",
  "$sds-border-link-dashed":
    "Default bottom-border for Text Links; border color is inherited from the color used in the paragraph it is part of.",
  "$sds-border-link-solid":
    "Hover and Pressed bottom-border for Text Links; border color is inherited from the color used in the paragraph it is part of.",
  "$sds-border-negative-400": "Error state on inputs.",
  "$sds-border-none": "No borders",
  "$sds-border-notice-400": "Warning state on inputs.",
  "$sds-border-positive-400": "Success state on inputs.",
};

const Template = () => {
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
          primaryText={Usage[sassVariable]}
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

export const Default = {
  render: () => (
    <>
      <StyledBordersWrapper>
        <Template />
      </StyledBordersWrapper>
    </>
  ),
};
