import { action } from "@storybook/addon-actions";
import { Args, Story } from "@storybook/react";
import React from "react";
import Notification from "./index";

const Demo = (props: Args): JSX.Element => {
  const { intent, onClose, sdsAction, sdsActionText } = props;
  if (sdsAction) {
    return (
      <>
        <p>
          The text button is not yet implemented in the sds, so the button has
          the correct styles but does not use the sdsProps to set the style.
          This will be patched once the button styles are updated.
        </p>

        <Notification
          intent={intent}
          onClose={onClose ? () => {} : undefined}
          sdsAction={action("onClick")}
          sdsActionText={sdsActionText}
          {...props}
        >
          This is a notification!
          <div>extra content</div>
        </Notification>
      </>
    );
  }
  return (
    <>
      <p>
        The text button is not yet implemented in the sds, so the button has the
        correct styles but does not use the sdsProps to set the style. This will
        be patched once the button styles are updated.
      </p>

      <Notification
        intent={intent}
        onClose={onClose ? () => {} : undefined}
        {...props}
      >
        This is a notification!
      </Notification>
    </>
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
    sdsAction: {
      control: { type: "boolean" },
    },
  },
  component: Demo,
  title: "Notification",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  intent: "success",
  onClose: false,
  sdsAction: false,
  sdsActionText: "click me",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  const { intent } = props;
  return (
    <>
      <Notification intent={intent} {...props}>
        this is a notification
      </Notification>
    </>
  );
};

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.args = {
  intent: "success",
};
