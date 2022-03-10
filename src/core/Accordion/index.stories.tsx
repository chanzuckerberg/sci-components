import { Args, Story } from "@storybook/react";
import React from "react";
import Accordion from "./index";

const Template: Story = (props: Args) => {
  const { id } = props;
  return <Accordion id={id}>Test</Accordion>;
};

export default {
  component: Accordion,
  title: "Accordion",
};

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

Default.args = {
  id: "test-story",
};
