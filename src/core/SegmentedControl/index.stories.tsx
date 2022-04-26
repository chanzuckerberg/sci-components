import { Args, Meta, Story } from "@storybook/react";
import React from "react";
import SegmentedControl, { SegmentedControlProps } from "./index";

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

interface SegmentedControlArgs extends SegmentedControlProps {
  segmentOneIcon: string;
  segmentOneTooltipText: string;
  segmentTwoIcon: string;
  segmentTwoTooltipText: string;
  segmentThreeIcon: string;
  segmentThreeTooltipText: string;
  segmentFourIcon: string;
  segmentFourTooltipText: string;
}

const Template: Story<SegmentedControlArgs> = (props: SegmentedControlArgs) => {
  const {
    segmentOneIcon,
    segmentOneTooltipText,
    segmentTwoIcon,
    segmentTwoTooltipText,
    segmentThreeIcon,
    segmentThreeTooltipText,
    segmentFourIcon,
    segmentFourTooltipText,
    ...args
  } = props;

  const buttonDefinition = [
    { iconName: segmentOneIcon, tooltipText: segmentOneTooltipText },
    { iconName: segmentTwoIcon, tooltipText: segmentTwoTooltipText },
    { iconName: segmentThreeIcon, tooltipText: segmentThreeTooltipText },
    { iconName: segmentFourIcon, tooltipText: segmentFourTooltipText },
  ];

  return (
    <SegmentedControl buttonDefinition={buttonDefinition}></SegmentedControl>
  );
};

// Default
export const Default = Template.bind({});
Default.args = {
  segmentOneIcon: "list",
  segmentOneTooltipText: "List A",
  segmentTwoIcon: "list",
  segmentTwoTooltipText: "List B",
  segmentThreeIcon: "list",
  segmentThreeTooltipText: "List C",
  segmentFourIcon: "list",
  segmentFourTooltipText: "List D",
};

// LivePreview
const livePreviewStyles = {
  columnGap: "24px",
  display: "flex",
};

function LivePreviewDemo(props: Args): JSX.Element {
  const finalProps = {
    ...props,
    style: { width: "250px" },
  };

  return (
    <div style={livePreviewStyles}>
      <div>
        <Template
          segmentOneIcon="list"
          segmentOneTooltipText="List A"
          segmentTwoIcon="list"
          segmentTwoTooltipText="List B"
          segmentThreeIcon="list"
          segmentThreeTooltipText="List C"
          segmentFourIcon="list"
          segmentFourTooltipText="List D"
          buttonDefinition={[]}
          {...finalProps}
        />
      </div>
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
    { iconName: "table", tooltipText: "Table" },
    { iconName: "people", tooltipText: "People" },
  ],
};
