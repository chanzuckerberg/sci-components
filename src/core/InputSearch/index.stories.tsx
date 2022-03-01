import { Args, Story } from "@storybook/react";
import React from "react";
import InputSearch from "./index";

const Demo = (props: Args): JSX.Element => {
  const { id, placeholder, label, disabled, sdsStyle } = props;
  return (
    <InputSearch
      id={id}
      placeholder={placeholder}
      label={label}
      disabled={disabled}
      sdsStyle={sdsStyle}
    />
  );
};

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    id: {
      control: { type: "text" },
      required: true,
    },
    label: {
      control: { type: "text" },
      required: true,
    },
    placeholder: {
      control: { type: "text" },
    },
    sdsStyle: {
      control: { type: "radio" },
      options: ["rounded", "square"],
    },
  },
  component: Demo,
  title: "InputSearch",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  id: "Test",
  label: "Label",
  placeholder: "Search",
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};
