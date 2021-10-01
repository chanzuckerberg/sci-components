import { Args, Story } from "@storybook/react";
import React from "react";
import LoadingIndicator from "./index";

const Demo = (props: Args): JSX.Element => {
  const { sdsStyle } = props;
  return <LoadingIndicator sdsStyle={sdsStyle} {...props} />;
};

export default {
  component: Demo,
  title: "LoadingIndicator",
};

const Template: Story = (args) => <Demo {...args} />;

export const Minimal = Template.bind({});

Minimal.args = {
  sdsStyle: "minimal",
};

export const Tag = Template.bind({});

Tag.args = {
  sdsStyle: "tag",
};
