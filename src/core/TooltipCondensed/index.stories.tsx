import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Args, Story } from "@storybook/react";
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
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

Default.args = {
  title: "Label",
};

const TestTemplate: Story = (args) => <Demo {...args} />;

export const Test = TestTemplate.bind({});

Test.args = {
  title: "Test",
};

const livePreviewStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 80px)",
};

// LivePreview
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

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};
