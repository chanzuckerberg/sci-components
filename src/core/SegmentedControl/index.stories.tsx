import { Args, Meta, Story } from "@storybook/react";
import React from "react";
import SegmentedControl, { SegmentedControlProps } from "./index";

const Demo = () => {
  const buttonDefinition = [
    { iconName: "list", tooltipText: "test tooltip 1" },
    { iconName: "list", tooltipText: "test tooltip 2" },
    { iconName: "list", tooltipText: "test tooltip 3" },
  ];
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
export const LivePreview = Template.bind({});
LivePreview.args = {
  segmentOneIcon: "list",
  segmentOneTooltipText: "List A",
  segmentTwoIcon: "list",
  segmentTwoTooltipText: "List B",
  segmentThreeIcon: "list",
  segmentThreeTooltipText: "List C",
  segmentFourIcon: "list",
  segmentFourTooltipText: "List D",
};

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

// Test
function TestDemo(props: Args): JSX.Element {
  const finalProps = {
    ...props,
    "data-testid": "segmentedControl",
  };

  return (
    <div>
      <Template
        segmentOneIcon="list"
        segmentOneTooltipText="List A"
        segmentTwoIcon="table"
        segmentTwoTooltipText="Table A"
        segmentThreeIcon="people"
        segmentThreeTooltipText="Team"
        segmentFourIcon="globe"
        segmentFourTooltipText="More"
        buttonDefinition={[]}
        {...finalProps}
      />
    </div>
  );
}

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});
