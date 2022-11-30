/* eslint-disable no-use-before-define */
import { Args, Meta, Story } from "@storybook/react";
import * as React from "react";
import MenuItem from "./index";
import { DemoWrapper } from "./style";

const Demo = (props: Args): JSX.Element => (
  <DemoWrapper>
    <MenuItem data-testid="MenuItem" {...props} />
  </DemoWrapper>
);

export default {
  argTypes: {
    column: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    isMultiSelect: {
      control: { type: "boolean" },
    },
    selected: {
      control: { type: "boolean" },
    },
  },
  component: Demo,
  parameters: {
    axe: {
      disabledRules: ["aria-required-parent"],
    },
  },
  title: "MenuItem",
} as Meta;

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "text here",
  column: "column value here",
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

export const Test = Template.bind({});

Test.args = {
  children: "test text",
  column: "test column",
};
