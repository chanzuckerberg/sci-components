import { Args, Story } from "@storybook/react";
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
  argTypes: {
    sdsStyle: {
      control: { type: "select" },
      options: ["default", "dashed"],
    },
  },
  component: Demo,
  title: "Link",
};

const Template: Story<LinkProps> = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  sdsStyle: "default",
};

const livePreviewStyles = {
  display: "grid",
  fontFamily: "Open Sans",
  gridColumnGap: "24px",
  gridTemplateColumns: "repeat(2, 250px)",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <div>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <Link href="/" sdsStyle="default" {...props}>
          Learn More
        </Link>
      </div>
      <p style={{ backgroundColor: "#EFF2FC", padding: "10px" }}>
        Lorem ipsum{" "}
        <Link href="/" sdsStyle="dashed" {...props}>
          dolor sit apsidy
        </Link>{" "}
        consectetur, adipisicing elit.
      </p>
    </div>
  );
};

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};
