/* eslint-disable no-use-before-define */
import { Args, Story } from "@storybook/react";
import * as React from "react";
import CellHeader from "../CellHeader";
import TableRow from "../TableRow";
import TableHeaderRaw from "./index";

const TableHeader = (props: Args): JSX.Element => {
  return (
    <table>
      <TableHeaderRaw {...props}>
        <TableRow hover={false} shouldShowTooltipOnHover={false}>
          <CellHeader active>Column 1</CellHeader>
          <CellHeader>Column 2</CellHeader>
          <CellHeader>Column 3</CellHeader>
        </TableRow>
      </TableHeaderRaw>
    </table>
  );
};

export default {
  component: TableHeader,
  title: "TableHeader",
};

const Template: Story = (args) => <TableHeader {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const TestDemo = (): JSX.Element => (
  <table>
    <TableHeaderRaw data-testid="TableHeader">
      <TableRow hover={false} shouldShowTooltipOnHover={false}>
        <CellHeader active>Column 1</CellHeader>
        <CellHeader>Column 2</CellHeader>
        <CellHeader>Column 3</CellHeader>
      </TableRow>
    </TableHeaderRaw>
  </table>
);

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});
