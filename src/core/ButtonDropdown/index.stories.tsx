import { action } from "@storybook/addon-actions";
import { Args, Story } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import ButtonDropdown from "./index";

const text = "Label";

const actions = {
  onClick: action("onClick"),
};

const Demo = (props: Args): JSX.Element => {
  return <ButtonDropdown {...props}>{text}</ButtonDropdown>;
};

export default {
  component: Demo,
  title: "ButtonDropdown",
};

const Template: Story = (args) => <Demo {...args} />;

export const RoundedPrimary = Template.bind({});

RoundedPrimary.args = {
  disabled: false,
  icon: <Icon sdsIcon="download" sdsSize="l" sdsType="button" />,
  onClick: actions.onClick,
  sdsStyle: "rounded",
  sdsType: "primary",
};

export const RoundedSecondary = Template.bind({});

RoundedSecondary.args = {
  disabled: false,
  icon: <Icon sdsIcon="download" sdsSize="l" sdsType="button" />,
  onClick: actions.onClick,
  sdsStyle: "rounded",
  sdsType: "secondary",
};

export const SquarePrimary = Template.bind({});

SquarePrimary.args = {
  disabled: false,
  icon: <Icon sdsIcon="download" sdsSize="l" sdsType="button" />,
  onClick: actions.onClick,
  sdsStyle: "square",
  sdsType: "primary",
};

export const SquareSecondary = Template.bind({});

SquareSecondary.args = {
  disabled: false,
  icon: <Icon sdsIcon="download" sdsSize="l" sdsType="button" />,
  onClick: actions.onClick,
  sdsStyle: "square",
  sdsType: "secondary",
};

// LivePreview
function LivePreviewDemo(props: Args): JSX.Element {
  return (
    <>
      <span style={{ marginRight: "10px" }}>
        <ButtonDropdown
          sdsType="primary"
          icon={<Icon sdsIcon="download" sdsSize="l" sdsType="button" />}
          {...props}
        >
          {text}
        </ButtonDropdown>
      </span>
      <ButtonDropdown
        sdsType="secondary"
        icon={<Icon sdsIcon="download" sdsSize="l" sdsType="button" />}
        {...props}
      >
        {text}
      </ButtonDropdown>
    </>
  );
}

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreviewRounded = LivePreviewTemplate.bind({});

LivePreviewRounded.args = {
  sdsStyle: "rounded",
};

LivePreviewRounded.parameters = {
  snapshot: {
    skip: true,
  },
};

export const LivePreviewSquare = LivePreviewTemplate.bind({});

LivePreviewSquare.args = {
  sdsStyle: "square",
};

LivePreviewSquare.parameters = {
  snapshot: {
    skip: true,
  },
};
