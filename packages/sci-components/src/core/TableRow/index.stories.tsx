/* eslint-disable no-use-before-define */
import { Args, Meta } from "@storybook/react";
import * as React from "react";
import CellBasic from "../CellBasic";
import TableRowRaw from "./index";

const TableRow = (props: Args): JSX.Element => {
  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        <TableRowRaw {...props}>
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
        </TableRowRaw>
      </tbody>
    </table>
  );
};

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    hover: {
      control: { type: "boolean" },
    },
    rowHeight: {
      control: { type: "number" },
    },
    selected: {
      control: { type: "boolean" },
    },
    shouldShowTooltipOnHover: {
      control: { type: "boolean" },
    },
    tooltipProps: {
      control: { type: "object" },
    },
    tooltipSubtitle: {
      control: { type: "text" },
    },
    tooltipText: {
      control: { type: "text" },
    },
    useDivider: {
      control: { type: "boolean" },
    },
  },
  component: TableRow,
  title: "Table/TableRow",
} as Meta;

export const Default = {
  args: {
    disabled: false,
    hover: true,
    selected: false,
    shouldShowTooltipOnHover: true,
    tooltipProps: { sdsStyle: "dark" },
    tooltipText: "This is a TableRow component",
    useDivider: true,
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
};

// Test

const TestDemo = (): JSX.Element => (
  <table>
    <tbody>
      <TableRowRaw
        data-testid="TableRow"
        hover
        shouldShowTooltipOnHover
        tooltipText="testTooltipTitle"
      >
        <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
      </TableRowRaw>
    </tbody>
  </table>
);

export const Test = {
  render: (args: Args) => <TestDemo {...args} />,
};
