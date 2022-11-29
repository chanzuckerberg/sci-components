import { action } from "@storybook/addon-actions";
import { Args, Meta, Story } from "@storybook/react";
import React from "react";
import InputSearch from "./index";

const Demo = (props: Args): JSX.Element => {
  const { id, placeholder, label, disabled, sdsStyle, sdsStage, intent } =
    props;
  const handleSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };
  return (
    <InputSearch
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
  component: Demo,
  title: "Inputs/InputSearch",
} as Meta;

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  id: "Test",
  label: "Search",
  placeholder: "Search",
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const RoundLivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <InputSearch
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

const RoundLivePreviewTemplate: Story = (args) => (
  <RoundLivePreviewDemo {...args} />
);

export const RoundLivePreview = RoundLivePreviewTemplate.bind({});

RoundLivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

const SquareLivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <InputSearch
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

const SquareLivePreviewTemplate: Story = (args) => (
  <SquareLivePreviewDemo {...args} />
);

export const SquareLivePreview = SquareLivePreviewTemplate.bind({});

SquareLivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

const TestDemo = (props: Args): JSX.Element => {
  return (
    <>
      <InputSearch
        id="test-round"
        sdsStyle="rounded"
        label="Round Search"
        placeholder="Search"
        data-testid="inputSearchRound"
        handleSubmit={action("onSubmit")}
        name="round-search"
        {...props}
      />
      <InputSearch
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
      <InputSearch
        sdsStyle="square"
        placeholder="Search"
        data-testid="inputSearchFail"
        handleSubmit={action("onSubmit")}
        name="with-error"
      />
    </>
  );
};

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});
