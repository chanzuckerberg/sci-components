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
    disabled: {
      control: { type: "boolean" },
    },
    hideLabel: {
      control: { type: "boolean" },
    },
    id: {
      control: { type: "text" },
      required: true,
    },
    intent: {
      control: { type: "radio" },
      options: ["default", "error", "warning"],
    },
    label: {
      control: { type: "text" },
      required: true,
    },
    placeholder: {
      control: { type: "text" },
    },
    sdsStage: {
      control: { type: "radio" },
      options: ["default", "userInput"],
    },
    sdsType: {
      control: { type: "radio" },
      options: ["textField", "textArea"],
    },
  },
  component: Demo,
  title: "InputText",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  hideLabel: false,
  id: "Test",
  label: "Label",
  placeholder: "Value",
  sdsType: "textField",
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
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={storyRow as React.CSSProperties}>
      <InputText
        {...props}
        id="textFieldPreview"
        sdsType="textField"
        label="Label"
        hideLabel={true}
        placeholder="Value"
        style={{ width: "200px" }}
      />
      <InputText
        {...props}
        id="textAreaPreview"
        sdsType="textArea"
        label="Label"
        hideLabel={true}
        placeholder="Value"
        style={{ minWidth: "200px" }}
        inputProps={{ style: { minWidth: "200px" } }}
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
        {...props}
        id="test-textField"
        sdsType="textField"
        label="Label"
        hideLabel={false}
        placeholder="Value"
        data-testid="inputTextBase"
      />
      {/* @ts-expect-error testing fail state */}
      <InputText
        sdsType="textField"
        hideLabel={false}
        data-testid="inputTextFail"
      />

      <InputText
        id="test-hide-label"
        sdsType="textField"
        label="Hidden Label"
        hideLabel={true}
        data-testid="inputTextHideLabel"
      />

      <InputText
        id="test-textArea"
        sdsType="textArea"
        label="Label"
        hideLabel={false}
        placeholder="Value"
        data-testid="inputTextArea"
      />
    </FormControl>
  );
};

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});
