import { FormControlLabel, Switch } from "@material-ui/core";
import { action } from "@storybook/addon-actions";
import { Args, Story } from "@storybook/react";
import React from "react";
import Notification from "./index";

const Demo = (props: Args): JSX.Element => {
  const {
    intent,
    onClose,
    buttonOnClick,
    buttonText,
    dismissDirection,
    extraContent,
    autoDismiss,
  } = props;

  const [dismissed, setDismissed] = React.useState(false);
  // TODO autodismiss, waiting on design feedback
  const handleChange = () => {
    setDismissed((prev) => !prev);
  };

  if (buttonOnClick) {
    return (
      <>
        <FormControlLabel
          control={<Switch checked={dismissed} onChange={handleChange} />}
          label="Hide"
        />
        <Notification
          autoDismiss={autoDismiss}
          dismissed={dismissed}
          dismissDirection={dismissDirection}
          intent={intent}
          onClose={onClose ? () => {} : undefined}
          buttonOnClick={action("onClick")}
          buttonText={buttonText}
          {...props}
        >
          This is a notification!
          {extraContent && (
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
              eveniet sapiente, officiis aut possimus suscipit assumenda non?
            </div>
          )}
        </Notification>
      </>
    );
  }
  return (
    <>
      <FormControlLabel
        control={<Switch checked={dismissed} onChange={handleChange} />}
        label="Hide"
      />
      <Notification
        autoDismiss={autoDismiss}
        dismissed={dismissed}
        dismissDirection={dismissDirection}
        intent={intent}
        onClose={onClose ? () => {} : undefined}
        {...props}
      >
        This is a notification!
        {extraContent && (
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
            eveniet sapiente, officiis aut possimus suscipit assumenda non?
          </div>
        )}
      </Notification>
    </>
  );
};

export default {
  argTypes: {
    autoDismiss: {
      control: { type: "boolean" },
    },
    buttonOnClick: {
      control: { type: "boolean" },
    },
    dismissDirection: {
      control: { type: "radio" },
      options: ["left", "right"],
    },
    extraContent: {
      control: { type: "boolean" },
    },
    intent: {
      control: { type: "radio" },
      options: ["info", "error", "success", "warning"],
    },
    onClose: {
      control: { type: "boolean" },
    },
  },
  component: Demo,
  title: "Notification",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  autoDismiss: true,
  buttonOnClick: false,
  buttonText: "click me",
  dismissDirection: "right",
  extraContent: false,
  intent: "success",
  onClose: false,
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  const { intent } = props;
  return (
    <>
      <Notification dismissDirection="left" intent={intent} {...props}>
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
