import { Args, Meta } from "@storybook/react";
import React from "react";
import RawLink, { LinkProps } from "./index";

const Link = (props: LinkProps): JSX.Element => {
  const { sdsStyle } = props;
  return (
    <RawLink href="/" sdsStyle={sdsStyle} {...props}>
      Test Link
    </RawLink>
  );
};

export default {
  argTypes: {
    sdsStyle: {
      control: { type: "select" },
      options: ["default", "dashed"],
    },
  },
  component: Link,
  title: "Link",
} as Meta;

// Default

export const Default = {
  args: {
    sdsStyle: "default",
  },
};

// Live Preview

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
        <RawLink href="/" sdsStyle="default" {...props}>
          Learn More
        </RawLink>
      </div>
      <p style={{ backgroundColor: "#EFF2FC", padding: "10px" }}>
        Lorem ipsum{" "}
        <RawLink href="/" sdsStyle="dashed" {...props}>
          dolor sit apsidy
        </RawLink>{" "}
        consectetur, adipisicing elit.
      </p>
      <p style={{ backgroundColor: "#EFF2FC", padding: "10px" }}>
        Lorem ipsum{" "}
        <RawLink href="/" sdsStyle="dashed" component="button" {...props}>
          button element
        </RawLink>{" "}
        consectetur, adipisicing elit.
      </p>
    </div>
  );
};

export const LivePreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};
