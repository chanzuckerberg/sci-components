import { Biotech, CheckCircleOutline } from "@mui/icons-material";
import { Args, Story } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import Tag from "./index";

const Demo = (props: Args): JSX.Element => {
  const { label, sdsStyle, sdsType, color, icon } = props;

  return (
    <Tag
      label={label}
      sdsStyle={sdsStyle}
      sdsType={sdsType}
      icon={icon}
      color={color}
      {...props}
    />
  );
};

const customColorTuples = {
  labelAndBack: ["#ffcc32", "#121212"],
  labelAndBackAndIcon: ["#ffcc32", "#121212", "#ffaa45"],
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

export default {
  argTypes: {
    sdsType: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
    },
    sdsStyle: {
      control: { type: "radio" },
      options: ["rounded", "square"],
    },
    icon: {
      options: [0, 1, 2, 3, 4],
      mapping: [
        undefined,
        <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />,
        <Icon sdsSize="l" sdsIcon="loading" sdsType="button" />,
        <Biotech />,
        <CheckCircleOutline />,
      ],
      control: {
        type: "select",
        labels: [
          "No Icon",
          "SDS Check Circle",
          "SDS Loading",
          "MUI Biotech",
          "MUI Check Circle",
        ],
      },
    },
    color: {
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      mapping: availableColorOptions,
      control: {
        type: "select",
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
      },
    },
    label: {
      control: { type: "text" },
      required: true,
    },
  },
  component: Demo,
  title: "Tag",
};

const Template: Story = (args) => <Demo {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  label: "Label",
  sdsType: "primary",
  sdsStyle: "square",
};

export const RoundedPrimary = Template.bind({});

RoundedPrimary.args = {
  label: "Label",
  sdsType: "primary",
  sdsStyle: "rounded",
};

export const PrimaryWithIcon = Template.bind({});

PrimaryWithIcon.args = {
  label: "Label",
  sdsType: "primary",
  sdsStyle: "square",
  icon: <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />,
};

export const RoundedPrimaryWithIcon = Template.bind({});

RoundedPrimaryWithIcon.args = {
  label: "Label",
  sdsType: "primary",
  sdsStyle: "rounded",
  icon: <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />,
};

export const Secondary = Template.bind({});

Secondary.args = {
  label: "Label",
  sdsType: "secondary",
  sdsStyle: "square",
};

export const RoundedSecondary = Template.bind({});

RoundedSecondary.args = {
  label: "Label",
  sdsType: "secondary",
  sdsStyle: "rounded",
};

export const SecondaryWithIcon = Template.bind({});

SecondaryWithIcon.args = {
  label: "Label",
  sdsType: "secondary",
  sdsStyle: "square",
  icon: <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />,
};

export const RoundedSecondaryWithIcon = Template.bind({});

RoundedSecondaryWithIcon.args = {
  label: "Label",
  sdsType: "secondary",
  sdsStyle: "rounded",
  icon: <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />,
};

export const DoubleColorSecondaryWithoutIcon = Template.bind({});

DoubleColorSecondaryWithoutIcon.args = {
  label: "Label",
  sdsType: "secondary",
  sdsStyle: "rounded",
  color: ["#ffcc23", "#121212"],
};

export const TripleColorSecondaryWithIcon = Template.bind({});

TripleColorSecondaryWithIcon.args = {
  label: "Label",
  sdsType: "secondary",
  sdsStyle: "rounded",
  icon: <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />,
  color: ["#fc3", "#121212", "#ffaa45"],
};

/*
 * Rounded Tag Live Preview
 */

const livePreviewStyles = {
  display: "flex",
  columnGap: "24px",
};

const RoundedTagLivePreviewDemo = (props: Args): JSX.Element => {
  const { label, sdsStyle, color, icon } = props;

  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <div>
        <Tag
          label={label}
          sdsStyle={sdsStyle}
          sdsType="primary"
          color={color}
          {...props}
        />
      </div>
      <div>
        <Tag
          label={label}
          sdsStyle={sdsStyle}
          sdsType="secondary"
          color={color}
          {...props}
        />
      </div>
      <div>
        <Tag
          label={label}
          sdsStyle={sdsStyle}
          sdsType="secondary"
          icon={
            icon || <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />
          }
          color={color}
          {...props}
        />
      </div>
    </div>
  );
};

const RoundedTagLivePreviewTemplate: Story = (args) => (
  <RoundedTagLivePreviewDemo {...args} />
);

export const RoundedTagLivePreview = RoundedTagLivePreviewTemplate.bind({});

RoundedTagLivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

RoundedTagLivePreview.args = {
  label: "Label",
  sdsStyle: "rounded",
};

/*
 * Square Tag Live Preview
 */

const SquareTagLivePreviewDemo = (props: Args): JSX.Element => {
  const { label, sdsStyle, color, icon } = props;

  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <div>
        <Tag
          label={label}
          sdsStyle={sdsStyle}
          sdsType="primary"
          color={color}
          {...props}
        />
      </div>
      <div>
        <Tag
          label={label}
          sdsStyle={sdsStyle}
          sdsType="secondary"
          color={color}
          {...props}
        />
      </div>
      <div>
        <Tag
          label={label}
          sdsStyle={sdsStyle}
          sdsType="secondary"
          icon={
            icon || <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />
          }
          color={color}
          {...props}
        />
      </div>
    </div>
  );
};

const SquareTagLivePreviewTemplate: Story = (args) => (
  <SquareTagLivePreviewDemo {...args} />
);

export const SquareTagLivePreview = SquareTagLivePreviewTemplate.bind({});

SquareTagLivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

SquareTagLivePreview.args = {
  label: "Label",
  sdsStyle: "square",
};

/*
 * Test
 */

const TestDemo = (props: Args): JSX.Element => {
  const { label } = props;
  return <Tag label={label} {...props} />;
};

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});

Test.args = {
  label: "Label",
};
