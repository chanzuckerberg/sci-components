import { CheckCircleOutline, WbSunny } from "@mui/icons-material";
import { Args, Meta } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import RawTag from "./index";

const Tag = (props: Args): JSX.Element => {
  const { label } = props;

  return <RawTag label={label} {...props} />;
};

const customColorTuples = {
  labelAndBack: ["#A52A2A", "#ffa07a"],
  labelAndBackAndIcon: ["#A52A2A", "#ffa07a", "#ffe74a"],
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
          "Custom colors for Label, Background",
          "Custom colors for Label, Background, Icon",
        ],
        type: "select",
      },
      mapping: availableColorOptions,
      options: Object.keys(availableColorOptions),
    },
    hover: {
      control: { type: "boolean" },
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
    sdsStyle: {
      control: { type: "radio" },
      options: ["rounded", "square"],
    },
    sdsType: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
    },
  },
  component: Tag,
  title: "Tag",
} as Meta;

// Default

export const Default = {
  args: {
    hover: true,
    label: "Label",
    sdsStyle: "square",
    sdsType: "primary",
  },
};

// Live Preview

const livePreviewStyles = {
  display: "inline-grid",
  gridColumnGap: 24,
  gridRowGap: 24,
  gridTemplateColumns: "repeat(3, auto)",
  gridTemplateRows: "repeat(2, auto)",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  const { color, icon, label } = props;

  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <div style={{ gridArea: "1 / 1 / 2 / 2" }}>
        <RawTag
          {...props}
          color={color}
          icon={undefined}
          label={label}
          sdsStyle="square"
          sdsType="primary"
        />
      </div>

      <div style={{ gridArea: "1 / 2 / 2 / 3" }}>
        <RawTag
          {...props}
          color={color}
          icon={undefined}
          label={label}
          sdsStyle="square"
          sdsType="secondary"
        />
      </div>

      <div style={{ gridArea: "1 / 3 / 2 / 4" }}>
        <RawTag
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
        <RawTag
          {...props}
          color={color}
          icon={undefined}
          label={label}
          sdsStyle="rounded"
          sdsType="primary"
        />
      </div>

      <div style={{ gridArea: "2 / 2 / 3 / 3" }}>
        <RawTag
          {...props}
          color={color}
          icon={undefined}
          label={label}
          sdsStyle="rounded"
          sdsType="secondary"
        />
      </div>

      <div style={{ gridArea: "2 / 3 / 3 / 4" }}>
        <RawTag
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

export const LivePreview = {
  args: {
    label: "Label",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Test

const TestDemo = (props: Args): JSX.Element => {
  const { label } = props;
  return <RawTag label={label} {...props} data-testid="tags" />;
};

export const Test = {
  args: {
    label: "Label",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
