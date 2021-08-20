import { Args, Story } from "@storybook/react";
import React from "react";
import InputDropdown from "./index";

const Demo = (props: Args): JSX.Element => {
  return <InputDropdown {...props} />;
};

export default {
  component: Demo,
  title: "InputDropdown",
};

const Template: Story = (args) => <Demo {...args} />;

export const MinimalInputDropdown = Template.bind({});

MinimalInputDropdown.args = {
  disabled: false,
  label: "Dropdown",
  onClick: () => null,
  sdsStyle: "minimal",
};
