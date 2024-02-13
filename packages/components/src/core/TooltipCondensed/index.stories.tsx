import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Args, Meta } from "@storybook/react";
import React from "react";
import RawTooltipCondensed from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const TooltipCondensed = (props: Args): JSX.Element => {
  const { title, indicator } = props;
  return (
    <div>
      Hover over the info icon to view the tooltip.
      <div
        style={{
          margin: "135px 300px",
        }}
      >
        <RawTooltipCondensed indicator={indicator} title={title} {...props}>
          <InfoOutlinedIcon data-testid="tooltip-hover" />
        </RawTooltipCondensed>
      </div>
    </div>
  );
};

export default {
  argTypes: {
    indicator: {
      control: { type: "boolean" },
    },
    indicatorColor: {
      control: { type: "color" },
    },
  },
  component: TooltipCondensed,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/TooltipCondensed",
} as Meta;

// Default

export const Default = {
  args: {
    title: "Label",
  },
};

// Live Preview

const livePreviewStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 80px)",
};

function LivePreviewDemo(props: Args): JSX.Element {
  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <RawTooltipCondensed title="Label" {...props}>
        <InfoOutlinedIcon />
      </RawTooltipCondensed>
      <RawTooltipCondensed
        indicator
        indicatorColor="#223F9C"
        title="Label"
        {...props}
      >
        <InfoOutlinedIcon />
      </RawTooltipCondensed>
    </div>
  );
}

export const LivePreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Test

export const Test = {
  args: {
    title: "Test",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => (
    <TooltipCondensed {...args} data-testid="tooltip-condensed" />
  ),
};
