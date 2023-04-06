/* eslint-disable no-use-before-define */
import { Args, Meta, Story } from "@storybook/react";
import * as React from "react";
import MenuItem from "./index";
import { DemoWrapper } from "./style";

const Demo = (props: Args): JSX.Element => {
  const { name } = props;
  return (
    <DemoWrapper>
      <MenuItem data-testid="MenuItem" {...props}>
        {name}
      </MenuItem>
    </DemoWrapper>
  );
};

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
    sdsIcon: {
      control: {
        type: "select",
      },
      options: [
        "bacteria",
        "barChartHorizontal3",
        "checkCircle",
        "gear",
        "flagCheck",
      ],
    },
    sdsIconProps: { control: { type: "object" } },
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
  column: "column value here",
  name: "text here",
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

export const Test = Template.bind({});

Test.args = {
  column: "test column",
  name: "test text",
};
