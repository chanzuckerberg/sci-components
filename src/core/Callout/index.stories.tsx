import { Args, Story } from "@storybook/react";
import React from "react";
import CalloutTitle from "./components/CalloutTitle";
import Callout from "./index";

const Demo = (props: Args): JSX.Element => {
  const { intent, onClose, calloutTitle } = props;
  return (
    <Callout
      intent={intent}
      onClose={onClose ? () => {} : undefined}
      {...props}
    >
      {calloutTitle && <CalloutTitle>{calloutTitle}</CalloutTitle>}
      This is a callout!
    </Callout>
  );
};

export default {
  argTypes: {
    intent: {
      control: { type: "radio" },
      options: ["info", "error", "success", "warning"],
    },
    onClose: {
      control: { type: "boolean" },
    },
  },
  component: Demo,
  title: "Callout",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  calloutTitle: "this is a title",
  intent: "success",
  onClose: false,
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  // TODO: add accordion
  const { intent } = props;
  return (
    <>
      <Callout intent={intent} {...props}>
        this is a callout
      </Callout>
    </>
  );
};

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.args = {
  intent: "success",
};
