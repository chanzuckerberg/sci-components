import { FormControlLabel, RadioGroup } from "@mui/material";
import { Args, Meta, Story } from "@storybook/react";
import React from "react";
import InputRadio from "./index";

const DefaultDemo = (props: Args): JSX.Element => {
  const { text } = props;

  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="demo"
      name="radio-buttons-group"
    >
      <FormControlLabel
        control={<InputRadio stage="checked" {...props} />}
        label={text}
        value="demo"
      />
    </RadioGroup>
  );
};

export default {
  component: DefaultDemo,
  title: "Inputs/InputRadio",
} as Meta;

const DefaultTemplate: Story = (args) => <DefaultDemo {...args} />;

export const Default = DefaultTemplate.bind({});
Default.parameters = {
  snapshot: {
    skip: true,
  },
};

Default.args = {
  disabled: false,
  text: "Label",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  const { text } = props;

  const [checked, setChecked] = React.useState([true, false, false]);

  const handleCheck1 = () => {
    setChecked([true, false, false]);
  };
  const handleCheck2 = () => {
    setChecked([false, true, false]);
  };
  const handleCheck3 = () => {
    setChecked([false, false, true]);
  };

  return (
    <div>
      <div>
        <FormControlLabel
          control={
            <InputRadio
              onChange={handleCheck1}
              stage={checked[0] ? "checked" : "unchecked"}
              data-testid="InputRadio"
            />
          }
          label={text}
          value="demo1"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <InputRadio
              stage={checked[1] ? "checked" : "unchecked"}
              onChange={handleCheck2}
              data-testid="InputRadio"
            />
          }
          label={text}
          value="demo2"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <InputRadio
              stage={checked[2] ? "checked" : "unchecked"}
              onChange={handleCheck3}
              data-testid="InputRadio"
            />
          }
          label={text}
          value="demo3"
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
  text: "Label",
};

export const Test = LivePreviewTemplate.bind({});

Test.args = {
  text: "Test Label",
};
