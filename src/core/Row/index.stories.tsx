/* eslint-disable no-use-before-define */
import { Args, Story } from "@storybook/react";
import * as React from "react";
import BasicCell from "../BasicCell";
import RowRaw from "./index";

const Row = (props: Args): JSX.Element => {
  return (
    <table>
      <tbody>
        <RowRaw {...props}>
          <BasicCell primaryText="Primary" shouldShowTooltipOnHover={false} />
          <BasicCell primaryText="Primary" shouldShowTooltipOnHover={false} />
          <BasicCell primaryText="Primary" shouldShowTooltipOnHover={false} />
          <BasicCell primaryText="Primary" shouldShowTooltipOnHover={false} />
          <BasicCell primaryText="Primary" shouldShowTooltipOnHover={false} />
        </RowRaw>
      </tbody>
    </table>
  );
};

export default {
  argTypes: {
    disabled: {
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
  component: Row,
  title: "Row",
};

const Template: Story = (args) => <Row {...args} />;

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  selected: false,
  shouldShowTooltipOnHover: true,
  tooltipProps: { sdsStyle: "dark" },
  tooltipText: "This is a Row component",
  useDivider: true,
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const TestDemo = (): JSX.Element => (
  <table>
    <tbody>
      <RowRaw data-testid="TableRow" tooltipText="testTooltipTitle">
        <BasicCell primaryText="Primary" shouldShowTooltipOnHover={false} />
      </RowRaw>
    </tbody>
  </table>
);

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});
