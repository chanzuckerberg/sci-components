import { Args, Meta } from "@storybook/react";
import React from "react";
import RawInputSlider from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const generateCustomMarks = (min: number, max: number) => {
  return [
    {
      label: min,
      value: min,
    },
    {
      label: ((max - min) / 2 + min).toFixed(0),
      value: (max - min) / 2 + min,
    },
    {
      label: max,
      value: max,
    },
  ];
};

const DemoWrapperStyles = {
  height: 180,
  marginLeft: 20,
  marginTop: 15,
  width: 180,
};

const InputSlider = (props: Args): JSX.Element => {
  const { marks, max, min } = props;

  const customMarks = generateCustomMarks(min, max);

  return (
    <div style={DemoWrapperStyles as React.CSSProperties}>
      <RawInputSlider {...props} marks={marks ? customMarks : false} />
    </div>
  );
};

export default {
  argTypes: {
    defaultValue: {
      control: {
        type: "number",
      },
    },
    disabled: {
      control: { type: "boolean" },
    },
    marks: {
      control: {
        type: "boolean",
      },
    },
    max: {
      control: {
        type: "number",
      },
    },
    min: {
      control: {
        type: "number",
      },
    },
    step: {
      control: {
        type: "number",
      },
    },
    valueLabelDisplay: {
      control: {
        labels: ["auto", "off", "on"],
        type: "select",
      },
      options: ["auto", "off", "on"],
    },
  },
  component: InputSlider,
  parameters: {
    axe: {
      disabledRules: [
        // FIXME - inputs should have labels
        "label",
      ],
    },
    badges: [BADGE.STABLE],
  },
  title: "Components/Inputs/InputSlider",
} as Meta;

const ExcludedControls = [
  "defaultValue",
  "disabled",
  "marks",
  "max",
  "min",
  "step",
  "valueLabelDisplay",
];

// Default

export const Default = {
  args: {
    defaultValue: [15, 85],
    disabled: false,
    marks: true,
    max: 100,
    min: 0,
    step: 5,
    valueLabelDisplay: "on",
  },
};

// Live Preview

const storyRow = {
  display: "grid",
  gridColumnGap: 40,
  gridTemplateColumns: "repeat(2, 180px)",
  margin: "15px 0 0 20px",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  const { marks, max, min } = props;

  const customMarks = generateCustomMarks(min, max);

  return (
    <div style={storyRow as React.CSSProperties}>
      <div>
        <RawInputSlider
          step={5}
          valueLabelDisplay="on"
          {...props}
          defaultValue={85}
          marks={marks ? customMarks : false}
          orientation="horizontal"
        />
      </div>

      <div>
        <RawInputSlider
          step={5}
          valueLabelDisplay="on"
          {...props}
          marks={marks ? customMarks : false}
          orientation="horizontal"
        />
      </div>
    </div>
  );
};

export const LivePreview = {
  args: {
    defaultValue: [15, 85],
    disabled: false,
    marks: true,
    max: 100,
    min: 0,
  },
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
  const { marks, max, min } = props;

  const customMarks = generateCustomMarks(min, max);

  return (
    <div style={DemoWrapperStyles as React.CSSProperties}>
      <RawInputSlider
        {...props}
        data-testid="test-input-slider"
        marks={marks ? customMarks : false}
      />
    </div>
  );
};

export const Test = {
  args: {
    defaultValue: 15,
    max: 100,
    min: 0,
  },
  parameters: {
    controls: {
      exclude: ExcludedControls,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} data-testid="input-slider" />,
};
