/* eslint-disable no-use-before-define */
import { Args, Meta, Story } from "@storybook/react";
import * as React from "react";
import CellHeader from "../CellHeader";
import TableHeaderRaw from "./index";

const TableHeader = (props: Args): JSX.Element => {
  return (
    <table>
      <TableHeaderRaw {...props}>
        <CellHeader active>Column 1</CellHeader>
        <CellHeader>Column 2</CellHeader>
        <CellHeader>Column 3</CellHeader>
      </TableHeaderRaw>
    </table>
  );
};

export default {
  component: TableHeader,
  title: "Table/TableHeader",
} as Meta;

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
      <CellHeader active>Column 1</CellHeader>
      <CellHeader>Column 2</CellHeader>
      <CellHeader>Column 3</CellHeader>
    </TableHeaderRaw>
  </table>
);

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});
