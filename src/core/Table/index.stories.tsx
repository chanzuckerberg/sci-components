/* eslint-disable no-use-before-define */
import styled from "@emotion/styled";
import { FormControlLabel, RadioGroup } from "@mui/material";
import { Args, Story } from "@storybook/react";
import * as React from "react";
import CellBasic from "../CellBasic";
import CellComponent from "../CellComponent";
import CellHeader from "../CellHeader";
import Icon from "../Icon";
import RadioButton from "../InputRadio";
import TableHeader from "../TableHeader";
import TableRow from "../TableRow";
import Tag from "../Tag";
import { SdsTagColorType } from "../Tag/style";
import TableRaw from "./index";

const StyledIconCell = styled("div")`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Table = (props: Args): JSX.Element => {
  return (
    <TableRaw {...props}>
      <TableHeader>
        <CellHeader horizontalAlign="center" hideSortIcon>
          Category
        </CellHeader>
        <CellHeader active>Active Header</CellHeader>
        <CellHeader>
          A very long table header title to test sort icon positioning
        </CellHeader>
        <CellHeader horizontalAlign="center">Centered</CellHeader>
        <CellHeader hideSortIcon>Component</CellHeader>
        <CellHeader horizontalAlign="right" hideSortIcon>
          Right Aligned and Not sortable
        </CellHeader>
      </TableHeader>
      <tbody>
        <TableRow>
          <CellComponent verticalAlign="center" horizontalAlign="center">
            <StyledIconCell>
              <Icon sdsSize="xl" sdsIcon="flask" sdsType="static" />
              <Tag
                color="primary"
                label="Chemistry"
                sdsStyle="rounded"
                sdsType="secondary"
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
          <CellBasic
            primaryText="Primary Text"
            secondaryText="Secondary Text"
            tertiaryText="Tertiary Text"
            horizontalAlign="center"
            shouldShowTooltipOnHover={false}
          />
          <CellComponent>
            {["primary", "warning", "beta", "error", "success"].map((item) => (
              <Tag
                key={item}
                color={item as SdsTagColorType}
                label={item as string}
                sdsStyle="rounded"
                sdsType="secondary"
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
              <Icon sdsSize="xl" sdsIcon="download" sdsType="static" />
              <Tag
                color="primary"
                label="Downloadable Content"
                sdsStyle="rounded"
                sdsType="secondary"
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
          <CellBasic
            primaryText="Primary Text"
            secondaryText="Secondary Text"
            horizontalAlign="center"
            shouldShowTooltipOnHover={false}
          />
          <CellComponent>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              <FormControlLabel
                control={<RadioButton stage="unchecked" />}
                label="Option 1"
              />
              <FormControlLabel
                control={<RadioButton stage="checked" />}
                label="Option 2"
              />
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
              <Icon sdsSize="xl" sdsIcon="bacteria" sdsType="static" />
              <Tag
                color="error"
                label="Disease"
                sdsStyle="rounded"
                sdsType="secondary"
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
          <CellBasic
            primaryText="Primary Text"
            horizontalAlign="center"
            verticalAlign="center"
            shouldShowTooltipOnHover={false}
          />
          <CellComponent verticalAlign="center">
            <Icon sdsSize="l" sdsIcon="virus" sdsType="static" />
          </CellComponent>
          <CellBasic
            primaryText="0.4"
            horizontalAlign="right"
            verticalAlign="center"
            shouldShowTooltipOnHover={false}
          />
        </TableRow>
      </tbody>
    </TableRaw>
  );
};

export default {
  component: Table,
  title: "Table/Table",
};

const Template: Story = (args) => <Table {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const TestDemo = (): JSX.Element => (
  <TableRaw data-testid="Table">
    <tbody>
      <TableRow>
        <CellBasic primaryText="Primary 1" shouldShowTooltipOnHover={false} />
        <CellBasic primaryText="Primary 2" shouldShowTooltipOnHover={false} />
        <CellBasic primaryText="Primary 3" shouldShowTooltipOnHover={false} />
        <CellBasic primaryText="Primary 4" shouldShowTooltipOnHover={false} />
      </TableRow>
    </tbody>
  </TableRaw>
);

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});
