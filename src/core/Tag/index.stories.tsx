import { CheckCircleOutline, WbSunny } from "@material-ui/icons";
import { Args, Story } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import Tag from "./index";

const Demo = (props: Args): JSX.Element => {
  const { color, icon, label, sdsStyle, sdsType } = props;

  return (
    <Tag
      color={color}
      icon={icon}
      label={label}
      sdsStyle={sdsStyle}
      sdsType={sdsType}
      {...props}
    />
  );
};

const customColorTuples = {
  labelAndBack: ["brown", "lightsalmon"],
  labelAndBackAndIcon: ["brown", "lightsalmon", "crimson"],
};

const availableColorOptions = [
  "primary",
  "info",
  "success",
  "warning",
  "error",
  "gray",
  "beta",
  customColorTuples.labelAndBack,
  customColorTuples.labelAndBackAndIcon,
];

const availableIconOptions = [
  undefined,
  <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />,
  <Icon sdsSize="l" sdsIcon="loading" sdsType="button" />,
  <WbSunny />,
  <CheckCircleOutline />,
];

export default {
  argTypes: {
    color: {
      control: {
        labels: [
          "primary",
          "info",
          "success",
          "warning",
          "error",
          "gray",
          "beta",
          "Label + Background",
          "Label + Background + Icon",
        ],
        type: "select",
      },
      mapping: availableColorOptions,
      options: Object.keys(availableColorOptions),
    },
    icon: {
      control: {
        labels: [
          "No Icon",
          "SDS Check Circle",
          "SDS Loading",
          "MUI WbSunny",
          "MUI Check Circle",
        ],
        type: "select",
      },
      mapping: availableIconOptions,
      options: Object.keys(availableIconOptions),
    },
    label: {
      control: { type: "text" },
      required: true,
    },
    onDelete: {
      control: { labels: ["Undefined", "onDelete: () => {}"], type: "select" },
      mapping: [undefined, () => {}],
      options: [0, 1],
    },
    sdsStyle: {
      control: { type: "radio" },
      options: ["rounded", "square"],
    },
    sdsType: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
    },
  },
  component: Demo,
  title: "Tag",
};

const Template: Story = (args) => <Demo {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  label: "Label",
  sdsStyle: "square",
  sdsType: "primary",
};

export const RoundedPrimary = Template.bind({});

RoundedPrimary.args = {
  label: "Label",
  sdsStyle: "rounded",
  sdsType: "primary",
};

export const PrimaryWithIcon = Template.bind({});

PrimaryWithIcon.args = {
  icon: <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />,
  label: "Label",
  sdsStyle: "square",
  sdsType: "primary",
};

export const RoundedPrimaryWithIcon = Template.bind({});

RoundedPrimaryWithIcon.args = {
  icon: <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />,
  label: "Label",
  sdsStyle: "rounded",
  sdsType: "primary",
};

export const Secondary = Template.bind({});

Secondary.args = {
  label: "Label",
  sdsStyle: "square",
  sdsType: "secondary",
};

export const RoundedSecondary = Template.bind({});

RoundedSecondary.args = {
  label: "Label",
  sdsStyle: "rounded",
  sdsType: "secondary",
};

export const SecondaryWithIcon = Template.bind({});

SecondaryWithIcon.args = {
  icon: <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />,
  label: "Label",
  sdsStyle: "square",
  sdsType: "secondary",
};

export const RoundedSecondaryWithIcon = Template.bind({});

RoundedSecondaryWithIcon.args = {
  icon: <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />,
  label: "Label",
  sdsStyle: "rounded",
  sdsType: "secondary",
};

export const DoubleColorWithoutIcon = Template.bind({});

DoubleColorWithoutIcon.args = {
  color: ["brown", "lightsalmon"],
  label: "Label",
  sdsStyle: "rounded",
  sdsType: "secondary",
};

export const TripleColorWithIcon = Template.bind({});

TripleColorWithIcon.args = {
  color: ["brown", "lightsalmon", "crimson"],
  icon: <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />,
  label: "Label",
  sdsStyle: "rounded",
  sdsType: "secondary",
};

/*
 * Live Preview for Rounded Tag
 */

const livePreviewStyles = {
  columnGap: "24px",
  display: "flex",
};

const TagLivePreviewDemo = (props: Args): JSX.Element => {
  const { color, icon, label, sdsStyle } = props;

  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <div>
        <Tag
          {...props}
          color={color}
          icon={undefined}
          label={label}
          sdsStyle={sdsStyle}
          sdsType="primary"
        />
      </div>
      <div>
        <Tag
          {...props}
          color={color}
          icon={undefined}
          label={label}
          sdsStyle={sdsStyle}
          sdsType="secondary"
        />
      </div>
      <div>
        <Tag
          {...props}
          color={color}
          icon={
            icon || <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />
          }
          label={label}
          sdsStyle={sdsStyle}
          sdsType="secondary"
        />
      </div>
    </div>
  );
};

const LivePreviewRoundedTemplate: Story = (args) => (
  <TagLivePreviewDemo {...args} />
);

export const LivePreviewRounded = LivePreviewRoundedTemplate.bind({});

LivePreviewRounded.parameters = {
  snapshot: {
    skip: true,
  },
};

LivePreviewRounded.args = {
  label: "Label",
  sdsStyle: "rounded",
};

/*
 * Live Preview for Square Tag
 */

const LivePreviewSquareTemplate: Story = (args) => (
  <TagLivePreviewDemo {...args} />
);

export const LivePreviewSquare = LivePreviewSquareTemplate.bind({});

LivePreviewSquare.parameters = {
  snapshot: {
    skip: true,
  },
};

LivePreviewSquare.args = {
  label: "Label",
  sdsStyle: "square",
};

/*
 * Test Story
 */

const TestDemo = (props: Args): JSX.Element => {
  const { label } = props;
  return <Tag label={label} data-testid="tags" {...props} />;
};

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});

Test.args = {
  label: "Label",
};
