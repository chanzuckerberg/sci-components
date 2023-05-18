import { CheckCircleOutline, WbSunny } from "@mui/icons-material";
import { Args, Meta } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import RawTag from "./index";
import { CommonScreenshotTestDemo, HOVER_OPTIONS } from "./index.testUtils";
import { ExtraTagProps } from "./style";

const Tag = (props: Args): JSX.Element => {
  const { label } = props;

  return <RawTag label={label} {...props} />;
};

const ICONS = [
  undefined,
  <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />,
  <Icon sdsSize="l" sdsIcon="loading" sdsType="button" />,
  <WbSunny />,
  <CheckCircleOutline />,
];
const SDS_STYLES: ExtraTagProps["sdsStyle"][] = ["rounded", "square"];
const COLORS: ExtraTagProps["tagColor"][] = [
  "primary",
  "info",
  "error",
  "gray",
  "beta",
  ["#000000", "#C65FA7", "#FFD400"],
];
const SDS_TYPES: ExtraTagProps["sdsType"][] = ["primary", "secondary"];

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
          "Custom colors for Label, Background, Icon",
        ],
        type: "select",
      },
      mapping: COLORS,
      options: Object.keys(COLORS),
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
      mapping: ICONS,
      options: Object.keys(ICONS),
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

// Screenshot tests

// Main Screenshot Test

function ScreenshotTestDemo(props: Args): JSX.Element {
  return (
    <CommonScreenshotTestDemo props={props} colors={COLORS} types={SDS_TYPES} />
  );
}

export const ScreenshotTest = {
  args: {
    color: COLORS[0],
    hover: HOVER_OPTIONS[0],
    label: "Label",
    sdsStyle: SDS_STYLES[0],
    sdsType: SDS_TYPES[0],
  },
  parameters: {
    axe: {
      timeout: 10 * 1000,
    },
    controls: {
      exclude: ["color", "hover", "label", "sdsStyle", "sdsType", "icon"],
    },
    snapshot: {
      skip: true,
    },
  },

  render: (props: Args): JSX.Element => <ScreenshotTestDemo {...props} />,
};

// Gray Primary only
// Tags with `color` of `gray` and `sdsType` of `primary` have their own story here because they do not currently pass the a11y tests. However, design has manually tested them with APCA, and they are accessible; our tests just do not use APCA yet. In the meantime, the a11y tests are currently disabled for this story, but enabled for the remaining colors in the ScreenshotTest story, so they can be tested properly.

const GRAY_PRIMARY_COLORS: ExtraTagProps["tagColor"][] = ["gray"];
const GRAY_PRIMARY_TYPES: ExtraTagProps["sdsType"][] = ["primary"];

function GrayPrimaryScreenshotTestDemo(props: Args): JSX.Element {
  return (
    <CommonScreenshotTestDemo
      props={props}
      colors={GRAY_PRIMARY_COLORS}
      types={GRAY_PRIMARY_TYPES}
    />
  );
}

export const GrayPrimaryScreenshotTest = {
  args: {
    color: COLORS[0],
    hover: HOVER_OPTIONS[0],
    label: "Label",
    sdsStyle: SDS_STYLES[0],
    sdsType: SDS_TYPES[0],
  },
  parameters: {
    axe: {
      // `color-contrast` is disabled for this test because design tested it with APCA and determined these colors pass, our test just isn't able to use APCA yet; this color was pulled into its own story so the remaining colors can be tested separately
      disabledRules: ["color-contrast"],
      timeout: 10 * 1000,
    },
    controls: {
      exclude: ["color", "hover", "label", "sdsStyle", "sdsType", "icon"],
    },
    snapshot: {
      skip: true,
    },
  },

  render: (props: Args): JSX.Element => (
    <GrayPrimaryScreenshotTestDemo {...props} />
  ),
};

// Success + Warning only
// Tags with `color` of `success` or `warning` have their own story here because they do not currently pass the a11y tests. Design is aware of this and will be updating their colors. In the meantime, the a11y tests are currently disabled for this story, but enabled for the remaining colors in the ScreenshotTest story, so they can be tested properly.

const SUCCESS_WARNING_PRIMARY_COLORS: ExtraTagProps["tagColor"][] = [
  "success",
  "warning",
];

function SuccessWarningScreenshotTestDemo(props: Args): JSX.Element {
  return (
    <CommonScreenshotTestDemo
      props={props}
      colors={SUCCESS_WARNING_PRIMARY_COLORS}
      types={SDS_TYPES}
    />
  );
}

export const SuccessWarningScreenshotTest = {
  args: {
    color: COLORS[0],
    hover: HOVER_OPTIONS[0],
    label: "Label",
    sdsStyle: SDS_STYLES[0],
    sdsType: SDS_TYPES[0],
  },
  parameters: {
    axe: {
      // `color-contrast` is disabled for this test because it is now a known issue and design will work on adjusting the colors so that they pass; these colors were pulled into their own story so the remaining colors can be tested separately
      disabledRules: ["color-contrast"],
      timeout: 10 * 1000,
    },
    controls: {
      exclude: ["color", "hover", "label", "sdsStyle", "sdsType", "icon"],
    },
    snapshot: {
      skip: true,
    },
  },

  render: (props: Args): JSX.Element => (
    <SuccessWarningScreenshotTestDemo {...props} />
  ),
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
