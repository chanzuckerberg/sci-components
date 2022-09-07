/* eslint-disable no-use-before-define */
import { Args, Story } from "@storybook/react";
import * as React from "react";
import CellBasic from "../CellBasic";
import CellHeader from "../CellHeader";
import TableHeader from "../TableHeader";
import TableRow from "../TableRow";
import TableRaw from "./index";

const Table = (props: Args): JSX.Element => {
  return (
    <TableRaw {...props}>
      <TableHeader>
        <TableRow useDivider={false} hover={false}>
          <CellHeader active>Column 1</CellHeader>
          <CellHeader>Column 2</CellHeader>
          <CellHeader horizontalAlign="right" hideSortIcon>
            Column 3
          </CellHeader>
        </TableRow>
      </TableHeader>
      <tbody>
        <TableRow>
          <CellBasic
            primaryText="Primary"
            secondaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            secondaryTextWrapLineCount={3}
            shouldTextWrap
            shouldShowTooltipOnHover={false}
          />
          <CellBasic
            primaryText="Primary"
            secondaryText="Secondary Text"
            shouldShowTooltipOnHover={false}
          />
          <CellBasic
            primaryText="356"
            horizontalAlign="right"
            shouldShowTooltipOnHover={false}
          />
        </TableRow>
        <TableRow>
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
          <CellBasic
            primaryText="1,234"
            secondaryText="2,344,000"
            horizontalAlign="right"
            shouldShowTooltipOnHover={false}
          />
        </TableRow>
      </tbody>
    </TableRaw>
  );
};

export default {
  component: Table,
  title: "Table",
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
        <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
      </TableRow>
    </tbody>
  </TableRaw>
);

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});
