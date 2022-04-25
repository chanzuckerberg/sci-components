import { Args, Meta, Story } from "@storybook/react";
import React from "react";
import SegmentedControl from "./index";

const Demo = (props: Args): JSX.Element => {
  const { buttonDefinition } = props;

  return (
    <SegmentedControl buttonDefinition={buttonDefinition}></SegmentedControl>
  );
};

const iconOptions = ["list", "infoCircle", "table", "globe", "people"];

export default {
  argTypes: {
    segmentOneIcon: {
      control: { type: "select" },
      options: iconOptions,
    },
    segmentOneTooltipText: {
      control: {
        type: "text",
      },
    },
    segmentTwoIcon: {
      control: { type: "select" },
      options: iconOptions,
    },
    segmentTwoTooltipText: {
      control: {
        type: "text",
      },
    },
    segmentThreeIcon: {
      control: { type: "select" },
      options: iconOptions,
    },
    segmentThreeTooltipText: {
      control: {
        type: "text",
      },
    },
    segmentFourIcon: {
      control: { type: "select" },
      options: iconOptions,
    },
    segmentFourTooltipText: {
      control: {
        type: "text",
      },
    },
  },
  component: Demo,
  title: "SegmentedControl",
} as Meta;

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

// Default
Default.args = {
  buttonDefinition: [
    { iconName: "list", tooltipText: "List A" },
    { iconName: "list", tooltipText: "List B" },
    { iconName: "list", tooltipText: "List C" },
    { iconName: "list", tooltipText: "List D" },
  ],
};

// LivePreview

const livePreviewStyles = {
  columnGap: "24px",
  display: "flex",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  const { buttonDefinition } = props;

  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <div>
        <SegmentedControl
          {...props}
          buttonDefinition={[
            { iconName: "list", tooltipText: "List A" },
            { iconName: "list", tooltipText: "List B" },
            { iconName: "list", tooltipText: "List C" },
            { iconName: "list", tooltipText: "List D" },
          ]}
        />
      </div>
    </div>
  );
};

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = Template.bind({});
LivePreview.args = {
  buttonDefinition: [
    { iconName: "list", tooltipText: "List A" },
    { iconName: "list", tooltipText: "List B" },
    { iconName: "list", tooltipText: "List C" },
    { iconName: "list", tooltipText: "List D" },
  ],
};

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

// Test
const TestDemo = (props: Args): JSX.Element => {
  const { buttonDefinition } = props;
  return (
    <SegmentedControl
      buttonDefinition={buttonDefinition}
      data-testid="segmentedControl"
      {...props}
    />
  );
};

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});

Test.args = {
  buttonDefinition: [
    { iconName: "list", tooltipText: "List A" },
    { iconName: "list", tooltipText: "List B" },
    { iconName: "list", tooltipText: "List C" },
    { iconName: "list", tooltipText: "List D" },
  ],
};
