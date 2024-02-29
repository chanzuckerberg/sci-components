import { Args, Meta } from "@storybook/react";
import RawSegmentedControl, {
  SegmentedControlProps,
  SingleButtonDefinition,
} from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const SegmentedControl = (props: Args): JSX.Element => {
  const { buttonDefinition } = props;

  return (
    <RawSegmentedControl buttonDefinition={buttonDefinition} color="error" />
  );
};

export default {
  argTypes: {
    buttonDefinition: {
      control: {
        type: "object",
      },
    },
  },
  component: SegmentedControl,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/SegmentedControl",
} as Meta;

const ExcludedControls = ["buttonDefinition"];

interface SegmentedControlArgs extends SegmentedControlProps {
  buttonDefinition: SingleButtonDefinition[];
}

const Template = (props: SegmentedControlArgs) => {
  const { buttonDefinition } = props;

  return <RawSegmentedControl buttonDefinition={buttonDefinition} />;
};

// Default

export const Default = {
  args: {
    buttonDefinition: [
      { icon: "List", tooltipText: "List A", value: "A" },
      { icon: "List", tooltipText: "List B", value: "B" },
      { icon: "List", tooltipText: "List C", value: "C" },
      { icon: "List", tooltipText: "List D", value: "D" },
    ],
  },
  render: Template,
};

// Live Preview

function LivePreviewDemo(): JSX.Element {
  return (
    <Template
      buttonDefinition={[
        { icon: "List", tooltipText: "List A", value: "A" },
        { icon: "List", tooltipText: "List B", value: "B" },
        { icon: "List", tooltipText: "List C", value: "C" },
        { icon: "List", tooltipText: "List D", value: "D" },
      ]}
    />
  );
}

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
      { icon: "List", tooltipText: "List A", value: "A" },
      { icon: "List", tooltipText: "List B", value: "B" },
      { icon: "Table", tooltipText: "Table", value: "Table" },
      { icon: "People", tooltipText: "People", value: "People" },
    ],
  },
  parameters: {
    controls: {
      exclude: ExcludedControls,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
