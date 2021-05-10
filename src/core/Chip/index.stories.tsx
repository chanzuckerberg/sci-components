import { Args, Story } from "@storybook/react";
import React from "react";
import Chip from "./index";

const Demo = (props: Args): JSX.Element => {
  return <Chip size="small" label="default small" {...props} />;
};

export default {
  component: Demo,
  title: "Chip",
};

const Template: Story = (args) => <Demo {...args} />;

export const Success = Template.bind({});

Success.args = {
  label: "success",
  status: "success",
};

export const Error = Template.bind({});

Error.args = {
  label: "error",
  status: "error",
};

export const Warning = Template.bind({});

Warning.args = {
  label: "warning",
  status: "warning",
};

export const Info = Template.bind({});

Info.args = {
  label: "info",
  status: "info",
};

export const Pending = Template.bind({});

Pending.args = {
  label: "pending",
  status: "pending",
};

export const Beta = Template.bind({});

Beta.args = {
  label: "beta",
  status: "beta",
};
