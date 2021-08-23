import { Args, Story } from "@storybook/react";
import React from "react";
import InputDropdown from "./index";

const Demo = (props: Args): JSX.Element => {
  const { disabled, label, onClick, sdsStyle, ...rest } = props;
  return (
    <InputDropdown
      disabled={disabled}
      label={label}
      onClick={onClick}
      sdsStyle={sdsStyle}
      {...rest}
    />
  );
};

export default {
  component: Demo,
  title: "InputDropdown",
};

const Template: Story = (args) => <Demo {...args} />;

export const Minimal = Template.bind({});

Minimal.args = {
  disabled: false,
  label: "Dropdown",
  onClick: () => null,
  sdsStyle: "minimal",
};
