import { Args, Story } from "@storybook/react";
import React, { useState } from "react";
import InputDropdown from "./index";

const Demo = (props: Args): JSX.Element => {
  const { disabled, label, sdsStyle, sdsType, ...rest } = props;

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
        sdsStage={open ? "userInput" : "default"}
        sdsStyle={sdsStyle}
        sdsType={sdsType}
        {...rest}
      />
      <br />
      {open && <div>This is a menu.</div>}
    </>
  );
};

export default {
  argTypes: {
    details: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    intent: {
      control: { type: "radio" },
      options: ["default", "error", "warning"],
    },
    label: {
      control: { type: "text" },
    },
    sdsStage: {
      control: { type: "radio" },
      options: ["default", "userInput"],
    },
    sdsStyle: {
      control: { type: "select" },
      options: ["square", "rounded", "minimal"],
    },
    sdsType: {
      control: { type: "radio" },
      options: ["singleSelect", "multiSelect"],
    },
  },
  component: Demo,
  title: "InputDropdown",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  label: "Dropdown",
  sdsStyle: "square",
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

// export const Error = Template.bind({});

// Error.args = {
//   disabled: false,
//   intent: "error",
//   label: "Dropdown",
//   sdsStyle: "square",
// };

// export const Disabled = Template.bind({});

// Disabled.args = {
//   disabled: true,
//   label: "Dropdown",
//   sdsStyle: "square",
// };

// export const Minimal = Template.bind({});

// Minimal.args = {
//   disabled: false,
//   label: "Dropdown",
//   sdsStyle: "minimal",
// };

// export const Square = Template.bind({});

// Square.args = {
//   disabled: false,
//   label: "Dropdown",
//   sdsStyle: "square",
// };

// export const Rounded = Template.bind({});

// Rounded.args = {
//   disabled: false,
//   label: "Dropdown",
//   sdsStyle: "rounded",
// };

// export const Warning = Template.bind({});

// Warning.args = {
//   disabled: false,
//   intent: "warning",
//   label: "Dropdown",
//   sdsStyle: "square",
// };
