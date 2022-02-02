import { Story } from "@storybook/react";
import React from "react";
import Link, { LinkProps } from "./index";

const Demo = (props: LinkProps): JSX.Element => {
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

const Template: Story<LinkProps> = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  sdsStyle: "default",
};
