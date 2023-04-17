import { Args, Meta } from "@storybook/react";
import React from "react";
import SegmentedControl, { SegmentedControlProps } from "./index";

const Demo = (props: Args): JSX.Element => {
  const { buttonDefinition } = props;

  return <SegmentedControl buttonDefinition={buttonDefinition} />;
};

const iconOptions = ["list", "infoCircle", "table", "globe", "people"];

export default {
  argTypes: {
    segmentFourIcon: {
      control: { type: "select" },
      options: iconOptions,
    },
    segmentFourTooltipText: {
      control: {
        type: "text",
      },
    },
    segmentOneIcon: {
      control: { type: "select" },
      options: iconOptions,
    },
    segmentOneTooltipText: {
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
    segmentTwoIcon: {
      control: { type: "select" },
      options: iconOptions,
    },
    segmentTwoTooltipText: {
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

export const Default = {
  args: {
    segmentFourIcon: "list",
    segmentFourTooltipText: "List D",
    segmentOneIcon: "list",
    segmentOneTooltipText: "List A",
    segmentThreeIcon: "list",
    segmentThreeTooltipText: "List C",
    segmentTwoIcon: "list",
    segmentTwoTooltipText: "List B",
  },
  render: (props: SegmentedControlArgs) => {
    const {
      segmentOneIcon,
      segmentOneTooltipText,
      segmentTwoIcon,
      segmentTwoTooltipText,
      segmentThreeIcon,
      segmentThreeTooltipText,
      segmentFourIcon,
      segmentFourTooltipText,
    } = props;

    const buttonDefinition = [
      { iconName: segmentOneIcon, tooltipText: segmentOneTooltipText },
      { iconName: segmentTwoIcon, tooltipText: segmentTwoTooltipText },
      { iconName: segmentThreeIcon, tooltipText: segmentThreeTooltipText },
      { iconName: segmentFourIcon, tooltipText: segmentFourTooltipText },
    ];

    return <SegmentedControl buttonDefinition={buttonDefinition} />;
  },
};

// Live Preview

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
        <Demo
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

export const LivePreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
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

export const Test = {
  args: {
    buttonDefinition: [
      { iconName: "list", tooltipText: "List A" },
      { iconName: "list", tooltipText: "List B" },
      { iconName: "table", tooltipText: "Table" },
      { iconName: "people", tooltipText: "People" },
    ],
  },
  render: (args: Args) => <TestDemo {...args} />,
};
