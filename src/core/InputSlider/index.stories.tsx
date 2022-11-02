import { Args, Story } from "@storybook/react";
import React from "react";
import InputSlider from "./index";

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

const Demo = (props: Args): JSX.Element => {
  const { marks, max, min } = props;

  const customMarks = generateCustomMarks(min, max);

  return (
    <div style={DemoWrapperStyles as React.CSSProperties}>
      <InputSlider {...props} marks={marks ? customMarks : false} />
    </div>
  );
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

Default.args = {
  defaultValue: [15, 85],
  disabled: false,
  marks: true,
  max: 100,
  min: 0,
  orientation: "horizontal",
  step: 5,
  valueLabelDisplay: "on",
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
    orientation: {
      control: {
        type: "radio",
      },
      options: ["horizontal", "vertical"],
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
  component: Demo,
  title: "Inputs/InputSlider",
};

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
      <div style={{ gridArea: "1/1/2/2" }}>
        <InputSlider
          step={5}
          valueLabelDisplay="on"
          {...props}
          defaultValue={85}
          marks={marks ? customMarks : false}
          orientation="horizontal"
        />
      </div>

      <div style={{ gridArea: "1/2/2/3" }}>
        <InputSlider
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

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

LivePreview.args = {
  defaultValue: [15, 85],
  disabled: false,
  marks: true,
  max: 100,
  min: 0,
};

const TestDemo = (props: Args): JSX.Element => {
  const { marks, max, min } = props;

  const customMarks = generateCustomMarks(min, max);

  return (
    <div style={DemoWrapperStyles as React.CSSProperties}>
      <InputSlider
        {...props}
        data-testid="test-input-slider"
        marks={marks ? customMarks : false}
      />
    </div>
  );
};

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});

Test.args = {
  defaultValue: 15,
  max: 100,
  min: 0,
};
