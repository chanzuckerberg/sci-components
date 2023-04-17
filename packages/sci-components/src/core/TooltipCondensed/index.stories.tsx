import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Args, Meta } from "@storybook/react";
import React from "react";
import TooltipCondensed from "./index";

const Demo = (props: Args): JSX.Element => {
  const { title, indicator } = props;
  return (
    <div>
      Hover over the info icon to view the tooltip.
      <div
        style={{
          margin: "135px 300px",
        }}
      >
        <TooltipCondensed indicator={indicator} title={title} {...props}>
          <InfoOutlinedIcon data-testid="tooltip-hover" />
        </TooltipCondensed>
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
  component: Demo,
  title: "TooltipCondensed",
} as Meta;

export const Default = {
  args: {
    title: "Label",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
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
      <TooltipCondensed title="Label" {...props}>
        <InfoOutlinedIcon />
      </TooltipCondensed>
      <TooltipCondensed
        indicator
        indicatorColor="#223F9C"
        title="Label"
        {...props}
      >
        <InfoOutlinedIcon />
      </TooltipCondensed>
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
};
