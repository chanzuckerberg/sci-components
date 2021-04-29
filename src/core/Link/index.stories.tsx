import { Args, Story } from "@storybook/react";
import React from "react";
import Link from "./index";

const Demo = (props: Args): JSX.Element => {
  return (
    <Link href="/" {...props}>
      Test Link
    </Link>
  );
};

export default {
  component: Demo,
  title: "Link",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {};
