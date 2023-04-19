import { action } from "@storybook/addon-actions";
import { Args, Meta } from "@storybook/react";
import React from "react";
import RawInputSearch from "./index";

const InputSearch = (props: Args): JSX.Element => {
  const { id, placeholder, label, disabled, sdsStyle, sdsStage, intent } =
    props;
  const handleSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };
  return (
    <RawInputSearch
      id={id}
      placeholder={placeholder}
      label={label}
      disabled={disabled}
      sdsStyle={sdsStyle}
      sdsStage={sdsStage}
      intent={intent}
      handleSubmit={handleSubmit}
      name="input-search-name"
    />
  );
};

export default {
  argTypes: {
    disabled: {
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
    sdsStyle: {
      control: { type: "radio" },
      options: ["rounded", "square"],
    },
  },
  component: InputSearch,
  title: "Inputs/InputSearch",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    id: "Test",
    label: "Search",
    placeholder: "Search",
  },
};

// Live Preview

const RoundLivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <RawInputSearch
      {...props}
      id="squareSearchPreview"
      label="Search"
      sdsStyle="rounded"
      placeholder="Search"
      handleSubmit={action("onSubmit")}
      name="round-input-search"
    />
  );
};

export const RoundLivePreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <RoundLivePreviewDemo {...args} />,
};

const SquareLivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <RawInputSearch
      {...props}
      id="squareSearchPreview"
      label="Search"
      sdsStyle="square"
      placeholder="Search"
      handleSubmit={action("onSubmit")}
      name="square-input-search"
    />
  );
};

export const SquareLivePreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <SquareLivePreviewDemo {...args} />,
};

// Test

const TestDemo = (props: Args): JSX.Element => {
  return (
    <>
      <RawInputSearch
        id="test-round"
        sdsStyle="rounded"
        label="Round Search"
        placeholder="Search"
        data-testid="inputSearchRound"
        handleSubmit={action("onSubmit")}
        name="round-search"
        {...props}
      />
      <RawInputSearch
        id="test-square"
        sdsStyle="square"
        label="Square Search"
        placeholder="Search"
        data-testid="inputSearchSquare"
        handleSubmit={action("onSubmit")}
        name="square-search"
        {...props}
      />
      {/* @ts-expect-error testing fail state */}
      <RawInputSearch
        sdsStyle="square"
        placeholder="Search"
        data-testid="inputSearchFail"
        handleSubmit={action("onSubmit")}
        name="with-error"
      />
    </>
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
