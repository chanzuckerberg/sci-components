import { FormControlLabel, Switch } from "@mui/material";
import { action } from "@storybook/addon-actions";
import { Args, Story } from "@storybook/react";
import React from "react";
import Button from "../Button";
import CalloutTitle from "./components/CalloutTitle";
import Callout from "./index";

const Demo = (props: Args): JSX.Element => {
  const { intent, onClose, calloutTitle, autoDismiss } = props;

  const [dismissed, setDismissed] = React.useState(false);

  const handleChange = () => {
    setDismissed((prev) => !prev);
  };

  return (
    <>
      {!autoDismiss && (
        <FormControlLabel
          control={<Switch checked={dismissed} onChange={handleChange} />}
          label="Hide"
        />
      )}
      <Callout
        autoDismiss={autoDismiss}
        intent={intent}
        dismissed={dismissed}
        onClose={onClose}
        {...props}
      >
        {calloutTitle && <CalloutTitle>{calloutTitle}</CalloutTitle>}
        This is a callout!
      </Callout>
      <Button onClick={handleChange} sdsType="primary" sdsStyle="rounded">
        Reset Callout
      </Button>
    </>
  );
};

export default {
  argTypes: {
    autoDismiss: {
      control: { type: "select" },
      options: [true, false, 4000, 12000, 20000],
    },
    intent: {
      control: { type: "radio" },
      options: ["info", "error", "success", "warning"],
    },
    onClose: {
      control: {
        labels: {
          "() => {}": true,
          undefined,
        },
        type: "select",
      },
      options: [action("onClick"), undefined],
    },
  },
  component: Demo,
  title: "Callout",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  autoDismiss: false,
  calloutTitle: "this is a title",
  intent: "success",
  onClose: false,
};

const storyRow = {
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "row",
  gap: "20px",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  // TODO: add accordion
  return (
    <div style={storyRow as React.CSSProperties}>
      <Callout intent="info" {...props}>
        this is a callout
      </Callout>
      <Callout intent="info" {...props}>
        <CalloutTitle>Title</CalloutTitle>
        this is a callout
      </Callout>
    </div>
  );
};

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});
