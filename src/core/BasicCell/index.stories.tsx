/* eslint-disable no-use-before-define */
import { Args, Story } from "@storybook/react";
import * as React from "react";
import BasicCell from "./index";

const Demo = (props: Args): JSX.Element => (
  <table>
    <tbody>
      <tr>
        <BasicCell
          data-testid="BasicCell"
          primaryText="Primary Text"
          tooltipProps={{ sdsStyle: "light" }}
          {...props}
        />
      </tr>
    </tbody>
  </table>
);

export default {
  argTypes: {
    primaryText: {
      control: { type: "text" },
    },
    secondaryText: {
      control: { type: "text" },
    },
    shouldShowTooltipOnHover: {
      control: { type: "boolean" },
    },
    shouldTextWrap: {
      control: { type: "boolean" },
    },
    textPosition: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    tooltipProps: {
      control: { type: "object" },
      defaultValue: {
        sdsStyle: "dark",
      },
    },
  },
  component: Demo,
  title: "BasicCell",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  primaryText: "Primary text",
  secondaryText: "Secondary Text",
  shouldShowTooltipOnHover: true,
  shouldTextWrap: true,
  textPosition: "right",
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

export const Test = Template.bind({});

Test.args = {
  primaryText: "Primary text",
  secondaryText: "Secondary Text",
};
