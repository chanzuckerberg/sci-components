import { Args, Meta } from "@storybook/react";
import React from "react";
import { SDSAppTheme } from "../styles";
import RawLoadingIndicator from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const LoadingIndicator = (props: Args): JSX.Element => {
  const { sdsStyle } = props;
  return <RawLoadingIndicator sdsStyle={sdsStyle} {...props} />;
};

export default {
  argTypes: {
    sdsStyle: {
      control: { type: "select" },
      options: ["minimal", "tag"],
    },
  },
  component: LoadingIndicator,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/LoadingIndicator",
} as Meta;

const ExcludedControls = ["sdsStyle"];

// Default

export const Default = {
  args: {
    sdsStyle: "minimal",
  },
};

export const CustomAriaLabel = {
  args: {
    "aria-label": "Loading cats list...",
    sdsStyle: "minimal",
  },
  parameters: {
    controls: {
      exclude: ExcludedControls,
    },
  },
};

// Live Preview

const LivePreviewDemo = (props: Args): JSX.Element => {
  const spaces = SDSAppTheme?.spacing;

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
          marginBottom: spaces?.l,
          marginRight: spaces?.l,
          marginTop: spaces?.l,
        }}
      >
        <RawLoadingIndicator sdsStyle="minimal" {...props} />
      </div>
      <div
        style={{
          marginBottom: spaces?.l,
          marginRight: spaces?.l,
          marginTop: spaces?.l,
        }}
      >
        <RawLoadingIndicator sdsStyle="tag" {...props} />
      </div>
    </div>
  );
};

export const LivePreview = {
  parameters: {
    controls: {
      exclude: ExcludedControls,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: ExcludedControls,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};
