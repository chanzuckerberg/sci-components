import { Args, Story } from "@storybook/react";
import React, { useState } from "react";
import InputDropdown from "./index";

const Demo = (props: Args): JSX.Element => {
  const { disabled, label, sdsStyle, ...rest } = props;

  const [open, setOpen] = useState<boolean>(false);
  const onClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <InputDropdown
        disabled={disabled}
        label={label}
        onClick={onClick}
        open={open}
        sdsStyle={sdsStyle}
        {...rest}
      />
      <br />
      {open && <div>This is a menu.</div>}
    </>
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
  sdsStyle: "minimal",
};

export const Square = Template.bind({});

Square.args = {
  disabled: false,
  label: "Dropdown",
  sdsStyle: "square",
};
