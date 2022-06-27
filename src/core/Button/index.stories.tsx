import { action } from "@storybook/addon-actions";
import { Args, Story } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import Button from "./index";

const text = "Label";
const sdsStyles = ["rounded", "square", "minimal"];
const sdsTypes = ["primary", "secondary"];

const actions = {
  onClick: action("onClick"),
};

const Demo = (props: Args): JSX.Element => {
  const { sdsType, sdsStyle } = props;
  return (
    <Button
      onClick={actions.onClick}
      sdsType={sdsType}
      sdsStyle={sdsStyle}
      {...props}
    >
      {text}
    </Button>
  );
};

export default {
  argTypes: {
    sdsStyle: {
      control: { type: "select" },
      options: sdsStyles,
    },
    sdsType: {
      control: { type: "select" },
      options: sdsTypes,
    },
    text: {
      control: {
        type: "text",
      },
    },
  },
  component: Demo,
  title: "Button",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  snapshot: {
    skip: true,
  },
};

Default.args = {
  disabled: false,
  sdsStyle: "rounded",
  sdsType: "primary",
  text: "Label",
};

export const Test = Template.bind({});

Test.args = {
  disabled: false,
  sdsStyle: "rounded",
  sdsType: "primary",
  text: "Label",
};

const placementStyles = {
  display: "grid",
  gridColumnGap: "10px",
  gridRowGap: "0px",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "1fr",
};

const RoundedLivePreviewDemo = (): JSX.Element => {
  return (
    <div style={placementStyles as React.CSSProperties}>
      <Button onClick={actions.onClick} sdsStyle="rounded" sdsType="primary">
        {text}
      </Button>

      <Button
        startIcon={<Icon sdsIcon="download" sdsSize="s" sdsType="button" />}
        onClick={actions.onClick}
        sdsStyle="rounded"
        sdsType="primary"
      >
        {text}
      </Button>
      <Button onClick={actions.onClick} sdsStyle="rounded" sdsType="secondary">
        {text}
      </Button>
      <Button
        startIcon={<Icon sdsIcon="download" sdsSize="s" sdsType="button" />}
        onClick={actions.onClick}
        sdsStyle="rounded"
        sdsType="secondary"
      >
        {text}
      </Button>
    </div>
  );
};

RoundedLivePreviewDemo.parameters = {
  snapshot: {
    skip: true,
  },
};
export const RoundedLivePreview = RoundedLivePreviewDemo.bind({});

const SquareLivePreviewDemo = (): JSX.Element => {
  return (
    <div style={placementStyles as React.CSSProperties}>
      <Button onClick={actions.onClick} sdsStyle="square" sdsType="primary">
        {text}
      </Button>
      <Button
        startIcon={<Icon sdsIcon="download" sdsSize="s" sdsType="button" />}
        onClick={actions.onClick}
        sdsStyle="square"
        sdsType="primary"
      >
        {text}
      </Button>
      <Button onClick={actions.onClick} sdsStyle="square" sdsType="secondary">
        {text}
      </Button>
      <Button
        startIcon={<Icon sdsIcon="download" sdsSize="s" sdsType="button" />}
        onClick={actions.onClick}
        sdsStyle="square"
        sdsType="secondary"
      >
        {text}
      </Button>
    </div>
  );
};

SquareLivePreviewDemo.parameters = {
  snapshot: {
    skip: true,
  },
};
export const SquareLivePreview = SquareLivePreviewDemo.bind({});

const minimalPlacementStyles = {
  display: "grid",
  gridColumnGap: "24px",
  gridRowGap: "0px",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "1fr",
};

const MinimalLivePreviewDemo = (): JSX.Element => {
  return (
    <div style={minimalPlacementStyles as React.CSSProperties}>
      <Button onClick={actions.onClick} sdsStyle="minimal" sdsType="primary">
        {text}
      </Button>

      <Button
        startIcon={<Icon sdsIcon="download" sdsSize="s" sdsType="button" />}
        onClick={actions.onClick}
        sdsStyle="minimal"
        sdsType="primary"
      >
        {text}
      </Button>
      <Button onClick={actions.onClick} sdsStyle="minimal" sdsType="secondary">
        {text}
      </Button>
    </div>
  );
};

MinimalLivePreviewDemo.parameters = {
  snapshot: {
    skip: true,
  },
};
export const MinimalLivePreview = MinimalLivePreviewDemo.bind({});
