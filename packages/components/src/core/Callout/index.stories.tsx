import { FormControlLabel, Switch } from "@mui/material";
import { action } from "@storybook/addon-actions";
import { Args, Meta } from "@storybook/react";
import React from "react";
import Button from "../Button";
import CalloutTitle from "./components/CalloutTitle";
import RawCallout from "./index";
import CustomSdsIcon from "src/common/customSdsIcon";
import CustomSvgIcon from "src/common/customSvgIcon";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const iconOptions = [
  <CustomSvgIcon key="customSdsIcon" sx={{ height: 22, width: 22 }} />,
  <CustomSdsIcon key="customSvgIcon" />,
  "book",
  "checkCircle",
];

const onCloseOptions = [action("onClick"), undefined];

const Callout = (props: Args): JSX.Element => {
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
      <RawCallout
        autoDismiss={autoDismiss}
        intent={intent}
        dismissed={dismissed}
        onClose={onClose}
        {...props}
      >
        {calloutTitle && <CalloutTitle>{calloutTitle}</CalloutTitle>}
        This is a callout!
      </RawCallout>
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
    expandable: {
      control: {
        type: "boolean",
      },
    },
    icon: {
      control: {
        labels: [
          "Custom SVG Icon",
          "Custom SDS Icon",
          "SDS Icon: Book",
          "SDS Icon: Check Circle",
        ],
        type: "select",
      },
      mapping: iconOptions,
      options: Object.keys(iconOptions),
    },
    intent: {
      control: { type: "radio" },
      options: ["info", "negative", "positive", "notice"],
    },
    onClose: {
      control: {
        labels: ["() => {}", "undefined"],
        type: "select",
      },
      mapping: onCloseOptions,
      options: Object.keys(onCloseOptions),
    },
  },
  component: Callout,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Callout",
} as Meta;

// Default

export const Default = {
  args: {
    autoDismiss: false,
    calloutTitle: "this is a title",
    intent: "positive",
    onClose: false,
  },
};

// Live Preview

const storyRow = {
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "row",
  gap: "20px",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={storyRow as React.CSSProperties}>
      <RawCallout intent="info" {...props} style={{ width: "180px" }}>
        Title
      </RawCallout>
      <RawCallout intent="info" {...props} style={{ width: "180px" }}>
        <CalloutTitle>Title</CalloutTitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </RawCallout>
      <RawCallout
        intent="info"
        expandable
        sdsStage="closed"
        {...props}
        style={{ width: "180px" }}
      >
        <CalloutTitle>Title</CalloutTitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </RawCallout>
      <RawCallout
        intent="info"
        {...props}
        // eslint-disable-next-line no-alert
        onClose={() => alert("callout closed")}
        style={{ width: "180px" }}
      >
        <CalloutTitle>Title</CalloutTitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </RawCallout>
    </div>
  );
};

export const LivePreview = {
  render: (args: Args) => <LivePreviewDemo {...args} />,
};
