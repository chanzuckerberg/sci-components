import { Args, Meta, Story } from "@storybook/react";
import React from "react";
import { defaultAppTheme } from "../styles";
import LoadingIndicator from "./index";

const Demo = (props: Args): JSX.Element => {
  const { sdsStyle } = props;
  return <LoadingIndicator sdsStyle={sdsStyle} {...props} />;
};

export default {
  argTypes: {
    sdsStyle: {
      control: { type: "select" },
      options: ["minimal", "tag"],
    },
  },
  component: Demo,
  title: "LoadingIndicator",
} as Meta;

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  sdsStyle: "minimal",
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  const spacings = defaultAppTheme?.spacing;

  const livePreviewStyles = {
    display: "grid",
    gridColumnGap: "24px",
    gridRowGap: "0px",
    gridTemplateColumns: "repeat(2, 70px)",
    gridTemplateRows: "1fr",
  };

  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <div
        style={{
          marginBottom: spacings?.l,
          marginRight: spacings?.l,
          marginTop: spacings?.l,
        }}
      >
        <LoadingIndicator sdsStyle="minimal" {...props} />
      </div>
      <div
        style={{
          marginBottom: spacings?.l,
          marginRight: spacings?.l,
          marginTop: spacings?.l,
        }}
      >
        <LoadingIndicator sdsStyle="tag" {...props} />
      </div>
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

const TestTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const Test = TestTemplate.bind({});
