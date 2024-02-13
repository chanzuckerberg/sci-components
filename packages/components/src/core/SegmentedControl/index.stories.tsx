import { Args, Meta } from "@storybook/react";
import RawSegmentedControl, {
  SegmentedControlProps,
  SingleButtonDefinition,
} from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const SegmentedControl = (props: Args): JSX.Element => {
  const { buttonDefinition } = props;

  return <RawSegmentedControl buttonDefinition={buttonDefinition} />;
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
  component: SegmentedControl,
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  title: "Components/SegmentedControl",
} as Meta;

interface SegmentedControlArgs extends SegmentedControlProps {
  segmentOneIcon: SingleButtonDefinition["icon"];
  segmentOneTooltipText: string;
  segmentTwoIcon: SingleButtonDefinition["icon"];
  segmentTwoTooltipText: string;
  segmentThreeIcon: SingleButtonDefinition["icon"];
  segmentThreeTooltipText: string;
  segmentFourIcon: SingleButtonDefinition["icon"];
  segmentFourTooltipText: string;
}

const Template = (props: SegmentedControlArgs) => {
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
    { icon: segmentOneIcon, tooltipText: segmentOneTooltipText },
    { icon: segmentTwoIcon, tooltipText: segmentTwoTooltipText },
    { icon: segmentThreeIcon, tooltipText: segmentThreeTooltipText },
    { icon: segmentFourIcon, tooltipText: segmentFourTooltipText },
  ];

  return <RawSegmentedControl buttonDefinition={buttonDefinition} />;
};

// Default

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
  render: Template,
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
    <RawSegmentedControl
      buttonDefinition={buttonDefinition}
      data-testid="segmentedControl"
      {...props}
    />
  );
};

export const Test = {
  args: {
    buttonDefinition: [
      { icon: "list", tooltipText: "List A" },
      { icon: "list", tooltipText: "List B" },
      { icon: "table", tooltipText: "Table" },
      { icon: "people", tooltipText: "People" },
    ],
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
