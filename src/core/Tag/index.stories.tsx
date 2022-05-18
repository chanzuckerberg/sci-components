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

export const Default = Template.bind({});

Default.args = {
  label: "Label",
  sdsStyle: "square",
  sdsType: "primary",
};

/*
 * Live Preview
 */

const livePreviewStyles = {
  display: "inline-grid",
  gridColumnGap: 24,
  gridRowGap: 24,
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(2, 1fr)",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  const { color, icon, label } = props;

  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <div style={{ gridArea: "1 / 1 / 2 / 2" }}>
        <Tag
          {...props}
          color={color}
          icon={undefined}
          label={label}
          sdsStyle="square"
          sdsType="primary"
        />
      </div>

      <div style={{ gridArea: "1 / 2 / 2 / 3" }}>
        <Tag
          {...props}
          color={color}
          icon={undefined}
          label={label}
          sdsStyle="square"
          sdsType="secondary"
        />
      </div>

      <div style={{ gridArea: "1 / 3 / 2 / 4" }}>
        <Tag
          {...props}
          color={color}
          icon={
            icon || <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />
          }
          label={label}
          sdsStyle="square"
          sdsType="secondary"
        />
      </div>

      <div style={{ gridArea: "2 / 1 / 3 / 2" }}>
        <Tag
          {...props}
          color={color}
          icon={undefined}
          label={label}
          sdsStyle="rounded"
          sdsType="primary"
        />
      </div>

      <div style={{ gridArea: "2 / 2 / 3 / 3" }}>
        <Tag
          {...props}
          color={color}
          icon={undefined}
          label={label}
          sdsStyle="rounded"
          sdsType="secondary"
        />
      </div>

      <div style={{ gridArea: "2 / 3 / 3 / 4" }}>
        <Tag
          {...props}
          color={color}
          icon={
            icon || <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />
          }
          label={label}
          sdsStyle="rounded"
          sdsType="secondary"
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
  label: "Label",
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

Test.parameters = {
  snapshot: {
    skip: true,
  },
};

Test.args = {
  label: "Label",
};
