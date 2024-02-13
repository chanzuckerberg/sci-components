/* eslint-disable no-use-before-define */
import { Args, Meta } from "@storybook/react";
import CellBasic from "../CellBasic";
import RawTableRow from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const TableRow = (props: Args): JSX.Element => {
  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        <RawTableRow {...props}>
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
        </RawTableRow>
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
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Table/TableRow",
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
};

// Test

const TestDemo = (): JSX.Element => (
  <table>
    <tbody>
      <RawTableRow
        data-testid="TableRow"
        hover
        shouldShowTooltipOnHover
        tooltipText="testTooltipTitle"
      >
        <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
      </RawTableRow>
    </tbody>
  </table>
);

export const Test = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} data-testid="table-row" />,
};
