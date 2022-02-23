import { FormControl } from "@material-ui/core";
import { Args, Story } from "@storybook/react";
import React from "react";
import InputText from "./index";

const Demo = (props: Args): JSX.Element => {
  const { id, intent, disabled, hideLabel, placeholder, label, sdsType } =
    props;
  return (
    <InputText
      id={id}
      sdsType={sdsType}
      label={label}
      placeholder={placeholder}
      intent={intent}
      hideLabel={hideLabel}
      disabled={disabled}
    />
  );
};

export default {
  argTypes: {
    placeholder: {
      control: { type: "text" },
      defaultValue: "Value",
    },
    label: {
      control: { type: "text" },
      required: true,
    },
    sdsType: {
      control: { type: "radio" },
      options: ["textField", "textArea"],
    },
    intent: {
      control: { type: "radio" },
      options: ["default", "error", "warning"],
    },
    sdsStage: {
      control: { type: "radio" },
      options: ["default", "userInput"],
    },
    id: {
      control: { type: "text" },
      required: true,
    },
    hideLabel: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
  component: Demo,
  title: "InputText",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  placeholder: "Value",
  label: "Label",
  sdsType: "textField",
  id: "Test",
  hideLabel: false,
  disabled: false,
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const storyRow = {
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "row",
  gap: "24px",
  flex: "0 0 200px",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={storyRow as React.CSSProperties}>
      <InputText
        id="textFieldPreview"
        sdsType="textField"
        label="Label"
        hideLabel={true}
        placeholder="Value"
        style={{ width: "200px" }}
      />
      <InputText
        id="textAreaPreview"
        sdsType="textArea"
        label="Label"
        hideLabel={true}
        placeholder="Value"
        style={{ width: "200px" }}
      />
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

const TestDemo = (props: Args): JSX.Element => {
  return (
    <FormControl>
      <InputText
        id="test"
        sdsType="textField"
        label="Label"
        hideLabel={false}
        placeholder="Value"
        data-testid="inputText"
      />
    </FormControl>
  );
};

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});
