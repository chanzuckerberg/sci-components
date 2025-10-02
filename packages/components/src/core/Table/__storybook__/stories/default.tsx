import { RadioGroup } from "@mui/material";
import { Args } from "@storybook/types";
import CellBasic from "src/core/CellBasic";
import CellComponent from "src/core/CellComponent";
import CellHeader from "src/core/CellHeader";
import Icon from "src/core/Icon";
import InputRadio from "src/core/InputRadio";
import TableHeader from "src/core/TableHeader";
import TableRow from "src/core/TableRow";
import Tag from "src/core/Tag";
import { SdsTagColorType } from "src/core/Tag/style";
import RawTable from "src/core/Table";
import { StyledIconCell } from "../style";

export const Table = (props: Args): JSX.Element => {
  return (
    <RawTable {...props}>
      <TableHeader>
        <CellHeader horizontalAlign="center" hideSortIcon>
          Category
        </CellHeader>
        <CellHeader active hover>
          Active Header
        </CellHeader>
        <CellHeader hover>
          A very long table header title to test sort icon positioning
        </CellHeader>
        <CellHeader hideSortIcon>Component</CellHeader>
        <CellHeader horizontalAlign="right" hideSortIcon>
          Right Aligned and Not sortable
        </CellHeader>
      </TableHeader>
      <tbody>
        <TableRow>
          <CellComponent verticalAlign="center" horizontalAlign="center">
            <StyledIconCell>
              <Icon sdsSize="xl" sdsIcon="Flask" />
              <Tag
                color="info"
                label="Chemistry"
                sdsStyle="rounded"
                sdsType="secondary"
                hover={false}
              />
            </StyledIconCell>
          </CellComponent>
          <CellBasic
            primaryText="Primary Text"
            secondaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            secondaryTextWrapLineCount={2}
            shouldTextWrap
          />
          <CellBasic
            primaryText="Primary Text"
            secondaryText="Secondary Text"
            tertiaryText="Tertiary Text"
            shouldShowTooltipOnHover={false}
          />
          <CellComponent>
            {["info", "notice", "beta", "negative", "positive"].map((item) => (
              <Tag
                key={item}
                color={item as SdsTagColorType}
                label={item as string}
                sdsStyle="rounded"
                sdsType="secondary"
                hover={false}
              />
            ))}
          </CellComponent>
          <CellBasic
            primaryText="356"
            horizontalAlign="right"
            shouldShowTooltipOnHover={false}
          />
        </TableRow>

        <TableRow>
          <CellComponent verticalAlign="center" horizontalAlign="center">
            <StyledIconCell>
              <Icon sdsSize="xl" sdsIcon="Download" />
              <Tag
                color="info"
                label="Downloadable Content"
                sdsStyle="rounded"
                sdsType="secondary"
                hover={false}
              />
            </StyledIconCell>
          </CellComponent>
          <CellBasic
            primaryText="Primary Text"
            secondaryText="Secondary Text"
            tertiaryText="Tertiary Text"
            shouldShowTooltipOnHover={false}
          />
          <CellBasic
            primaryText="Primary Text"
            secondaryText="Secondary Text"
            shouldShowTooltipOnHover={false}
          />
          <CellComponent>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              defaultValue="1"
            >
              <InputRadio label="Option I" caption="Caption I" value="1" />
              <InputRadio label="Option II" caption="Caption II" value="2" />
            </RadioGroup>
          </CellComponent>
          <CellBasic
            primaryText="1,234"
            secondaryText="2,344,000"
            tertiaryText="12.5%"
            horizontalAlign="right"
            shouldShowTooltipOnHover={false}
          />
        </TableRow>

        <TableRow
          disabled
          shouldShowTooltipOnHover
          tooltipText="This row is DISABLED!"
          tooltipSubtitle="Tooltip subtitle"
        >
          <CellComponent verticalAlign="center" horizontalAlign="center">
            <StyledIconCell>
              <Icon sdsSize="xl" sdsIcon="Virus" />
              <Tag
                color="negative"
                label="Disease"
                sdsStyle="rounded"
                sdsType="secondary"
                hover={false}
              />
            </StyledIconCell>
          </CellComponent>
          <CellBasic
            primaryText="Primary Text"
            secondaryText="Secondary Text"
            tertiaryText="Tertiary Text"
            shouldShowTooltipOnHover={false}
            verticalAlign="center"
          />
          <CellBasic
            primaryText="Primary Text"
            shouldShowTooltipOnHover={false}
            verticalAlign="center"
          />
          <CellComponent verticalAlign="center">
            <Icon sdsSize="l" sdsIcon="Bacteria" />
          </CellComponent>
          <CellBasic
            primaryText="0.4"
            horizontalAlign="right"
            verticalAlign="center"
            shouldShowTooltipOnHover={false}
          />
        </TableRow>
      </tbody>
    </RawTable>
  );
};
