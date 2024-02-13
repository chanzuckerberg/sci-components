import { FormControl } from "@mui/material";
import { Args, Meta } from "@storybook/react";
import React from "react";
import RawInputText from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const InputText = (props: Args): JSX.Element => {
  const {
    id,
    intent,
    disabled,
    hideLabel,
    placeholder,
    label,
    sdsType,
    sdsStage,
  } = props;
  return (
    <RawInputText
      id={id}
      sdsType={sdsType}
      sdsStage={sdsStage}
      label={label}
      placeholder={placeholder}
      intent={intent}
      hideLabel={hideLabel}
      disabled={disabled}
      name="input-text-name"
      autoComplete="off"
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
  component: InputText,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Inputs/InputText",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    hideLabel: false,
    id: "Test",
    label: "Label",
    placeholder: "Value",
    sdsType: "textField",
  },
};

// Live Preview

const storyRow = {
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "row",
  gap: "24px",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={storyRow as React.CSSProperties}>
      <RawInputText
        {...props}
        id="textFieldPreview"
        sdsType="textField"
        label="Label"
        hideLabel
        placeholder="Value"
        style={{ width: "200px" }}
      />
      <RawInputText
        {...props}
        id="textAreaPreview"
        sdsType="textArea"
        label="Label"
        hideLabel
        placeholder="Value"
        style={{ minWidth: "200px" }}
        inputProps={{ style: { minWidth: "200px" } }}
      />
    </div>
  );
};

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
  return (
    <FormControl>
      <RawInputText
        {...props}
        id="test-textField"
        sdsType="textField"
        label="Label"
        hideLabel={false}
        placeholder="Value"
        data-testid="inputTextBase"
      />

      {/* @ts-expect-error testing fail state */}
      <RawInputText
        sdsType="textField"
        hideLabel={false}
        data-testid="inputTextFail"
      />

      <RawInputText
        id="test-hide-label"
        sdsType="textField"
        label="Hidden Label"
        hideLabel
        data-testid="inputTextHideLabel"
      />

      <RawInputText
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

export const Test = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
