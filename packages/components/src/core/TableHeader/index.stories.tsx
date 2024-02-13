/* eslint-disable no-use-before-define */
import { Args, Meta } from "@storybook/react";
import CellHeader from "../CellHeader";
import RawTableHeader from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const TableHeader = (props: Args): JSX.Element => {
  return (
    <table>
      <RawTableHeader {...props}>
        <CellHeader active>Column 1</CellHeader>
        <CellHeader>Column 2</CellHeader>
        <CellHeader>Column 3</CellHeader>
      </RawTableHeader>
    </table>
  );
};

export default {
  component: TableHeader,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Table/TableHeader",
} as Meta;

export const Default = {};

// Test

const TestDemo = (): JSX.Element => (
  <table>
    <RawTableHeader data-testid="TableHeader">
      <CellHeader active>Column 1</CellHeader>
      <CellHeader>Column 2</CellHeader>
      <CellHeader>Column 3</CellHeader>
    </RawTableHeader>
  </table>
);

export const Test = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} data-testid="table-header" />,
};
