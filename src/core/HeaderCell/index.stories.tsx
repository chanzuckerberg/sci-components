/* eslint-disable no-use-before-define */
import { Args, Story } from "@storybook/react";
import * as React from "react";
import HeaderCellRaw from "./index";

const HeaderCell = (props: Args): JSX.Element => {
  return (
    <table>
      <tbody>
        <tr>
          <HeaderCellRaw
            tooltipProps={{ sdsStyle: "light" }}
            tooltipText="This is a table header"
            {...props}
          >
            Header
          </HeaderCellRaw>
        </tr>
      </tbody>
    </table>
  );
};

export default {
  argTypes: {
    active: {
      control: { type: "boolean" },
    },
    direction: {
      control: { type: "select" },
      options: ["asc", "desc"],
    },
    hideSortIcon: {
      control: { type: "boolean" },
    },
    shouldShowTooltipOnHover: {
      control: { type: "boolean" },
    },
    textPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    tooltipProps: {
      control: { type: "object" },
    },
    tooltipText: {
      control: { type: "text" },
    },
  },
  component: HeaderCell,
  title: "HeaderCell",
};

const Template: Story = (args) => <HeaderCell {...args} />;

export const Default = Template.bind({});

Default.args = {
  active: false,
  direction: "desc",
  hideSortIcon: false,
  shouldShowTooltipOnHover: true,
  tooltipProps: { sdsStyle: "dark" },
  tooltipText: "This is a header cell",
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const TestDemo = (): JSX.Element => (
  <table>
    <tbody>
      <tr>
        <HeaderCellRaw
          data-testid="HeaderCell"
          textPosition="right"
          tooltipText="testTooltipTitle"
        >
          Header
        </HeaderCellRaw>
      </tr>
    </tbody>
  </table>
);

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});
