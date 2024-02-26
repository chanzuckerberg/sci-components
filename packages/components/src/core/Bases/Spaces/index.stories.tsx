import { Meta } from "@storybook/react";
import { BADGE } from "../../../common/SDSBadges";
import { useTheme } from "@mui/material";
import { getSpaces } from "../../styles";
import {
  StyledInlineSpacingBox,
  StyledInsetSpacingBox,
  StyledSpacingVariable,
  StyledSpacingWrapper,
  StyledStackedSpacingBox,
} from "./style";
import Table from "src/core/Table";
import TableHeader from "src/core/TableHeader";
import CellHeader from "src/core/CellHeader";
import TableRow from "src/core/TableRow";
import CellComponent from "src/core/CellComponent";
import { copyToClipboard } from "../utils";

export default {
  parameters: {
    axe: {
      disabledRules: ["color-contrast"],
    },
    badges: [BADGE.WIP],
  },
  title: "Bases/Spaces",
} as Meta;

// Spaces

const Template = () => {
  const theme = useTheme();
  const spaces = getSpaces({ theme });

  const RenderTableRow = (size: number, name: string) => {
    const variable = "$sds-spaces-" + name;

    return (
      <TableRow key={name} hover={false}>
        <CellComponent verticalAlign="center" horizontalAlign="center">
          <StyledInsetSpacingBox size={size}>{name}</StyledInsetSpacingBox>
        </CellComponent>

        <CellComponent verticalAlign="center" horizontalAlign="center">
          <StyledInlineSpacingBox size={size}>{name}</StyledInlineSpacingBox>
        </CellComponent>

        <CellComponent verticalAlign="center" horizontalAlign="center">
          <StyledStackedSpacingBox size={size}>{name}</StyledStackedSpacingBox>
        </CellComponent>

        <CellComponent
          verticalAlign="center"
          onClick={() => copyToClipboard(variable)}
        >
          <StyledSpacingVariable>{variable}</StyledSpacingVariable>
        </CellComponent>

        <CellComponent verticalAlign="center">
          <StyledSpacingVariable>{`${size}px`}</StyledSpacingVariable>
        </CellComponent>
      </TableRow>
    );
  };

  if (spaces) {
    const TableBodyContent = Object.entries(spaces)
      .sort((a, b) => a[1] - b[1])
      .map(([key, value]) => {
        return RenderTableRow(value, key);
      });

    return (
      <Table>
        <TableHeader>
          <CellHeader hideSortIcon style={{ width: 40 }}>
            Inset Spacing
          </CellHeader>
          <CellHeader hideSortIcon style={{ width: 40 }}>
            Inline Spacing
          </CellHeader>
          <CellHeader hideSortIcon style={{ width: 40 }}>
            Stacked Spacing
          </CellHeader>
          <CellHeader hideSortIcon>Variable</CellHeader>
          <CellHeader hideSortIcon style={{ width: 40 }}>
            Value
          </CellHeader>
        </TableHeader>

        <tbody>{TableBodyContent}</tbody>
      </Table>
    );
  }
};

export const Default = {
  render: () => (
    <>
      <StyledSpacingWrapper>
        <Template />
      </StyledSpacingWrapper>
    </>
  ),
};
