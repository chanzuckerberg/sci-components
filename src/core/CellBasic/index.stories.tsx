/* eslint-disable no-use-before-define */
import { Args, Story } from "@storybook/react";
import * as React from "react";
import CellBasicRaw from "./index";

const CellBasic = (props: Args): JSX.Element => {
  return (
    <table>
      <tbody>
        <tr
          style={{
            display: "block",
            maxWidth: "180px",
          }}
        >
          <CellBasicRaw
            data-testid="CellBasic"
            primaryText="Primary Text"
            tooltipProps={{ sdsStyle: "light" }}
            {...props}
          />
        </tr>
      </tbody>
    </table>
  );
};

export default {
  argTypes: {
    horizontalAlign: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    primaryText: {
      control: { type: "text" },
    },
    primaryTextWrapLineCount: {
      control: { type: "number" },
    },
    secondaryText: {
      control: { type: "text" },
    },
    secondaryTextWrapLineCount: {
      control: { type: "number" },
    },
    shouldShowTooltipOnHover: {
      control: { type: "boolean" },
    },
    shouldTextWrap: {
      control: { type: "boolean" },
    },
    tooltipProps: {
      control: { type: "object" },
    },
    verticalAlign: {
      control: { type: "select" },
      options: ["top", "center", "bottom"],
    },
  },
  component: CellBasic,
  title: "CellBasic",
};

const Template: Story = (args) => <CellBasic {...args} />;

export const Default = Template.bind({});

Default.args = {
  primaryText: "Primary Text",
  primaryTextWrapLineCount: 3,
  secondaryText: "Secondary Text",
  secondaryTextWrapLineCount: 1,
  shouldShowTooltipOnHover: true,
  shouldTextWrap: true,
  tooltipProps: { sdsStyle: "dark" },
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
        <CellBasicRaw
          data-testid="CellBasic"
          primaryText="Primary Text"
          secondaryText="Secondary Text"
          horizontalAlign="right"
          tooltipProps={{ sdsStyle: "light", title: "testTooltipTitle" }}
        />
      </tr>
    </tbody>
  </table>
);

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});

Test.args = {
  primaryText: "Primary text",
  secondaryText: "Secondary Text",
};
