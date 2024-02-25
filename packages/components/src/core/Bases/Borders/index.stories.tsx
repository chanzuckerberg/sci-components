import { Meta } from "@storybook/react";
import { BADGE } from "../../../common/SDSBadges";
import { useTheme } from "@mui/material";
import { getBorders } from "../../styles";
import {
  StyledBorderBox,
  StyledBorderVariable,
  StyledBordersWrapper,
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
  title: "Bases/Borders",
} as Meta;

// Corners

const Usage: Record<string, string> = {
  "$sds-borders-accent-300": "-",
  "$sds-borders-accent-400":
    "Secondary buttons, active states of input containers",
  "$sds-borders-accent-500": "Hover rounded and square buttons",
  "$sds-borders-accent-600": "Active rounded and square buttons",
  "$sds-borders-accent-dashed":
    "Hover states for containers with dashed borders",
  "$sds-borders-base-100": "Modals and dropdown Menus",
  "$sds-borders-base-200": "-",
  "$sds-borders-base-300":
    "Disabled or non-interactive containers (buttons/inputs/tooltips)",
  "$sds-borders-base-400": "Input borders (default states)",
  "$sds-borders-base-500": "-",
  "$sds-borders-base-black": "Input and dropdown hover states",
  "$sds-borders-base-dashed": "File upload/drag and drop containers",
  "$sds-borders-beta-400": "-",
  "$sds-borders-info-400": "-",
  "$sds-borders-link-dashed":
    "Default bottom-border for Text Links; border color is inherited from the color used in the paragraph it is part of.",
  "$sds-borders-link-solid":
    "Hover and Pressed bottom-border for Text Links; border color is inherited from the color used in the paragraph it is part of.",
  "$sds-borders-negative-400": "Error state on inputs.",
  "$sds-borders-none": "No borders",
  "$sds-borders-notice-400": "Warning state on inputs.",
  "$sds-borders-positive-400": "Success state on inputs.",
};

const Template = () => {
  const theme = useTheme();
  const borders = getBorders({ theme });

  const RenderTableRow = (
    border: string,
    group: string | null,
    name: string
  ) => {
    const variable = group
      ? "$sds-borders-" + group + "-" + name
      : "$sds-borders-" + name;

    return (
      <TableRow key={name}>
        <CellComponent verticalAlign="center" horizontalAlign="center">
          <StyledBorderBox border={border} />
        </CellComponent>

        <CellComponent
          verticalAlign="center"
          onClick={() => copyToClipboard(`border: ${border};`)}
        >
          <StyledBorderVariable>border: {border};</StyledBorderVariable>
        </CellComponent>

        <CellComponent
          verticalAlign="center"
          onClick={() => copyToClipboard(variable)}
        >
          <StyledBorderVariable>{variable}</StyledBorderVariable>
        </CellComponent>

        <CellBasic
          verticalAlign="center"
          primaryText={Usage[variable]}
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
          <CellHeader hideSortIcon>Variable</CellHeader>
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
