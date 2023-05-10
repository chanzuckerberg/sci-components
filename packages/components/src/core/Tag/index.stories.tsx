import { CheckCircleOutline, WbSunny } from "@mui/icons-material";
import { Args, Meta } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import RawTag from "./index";
import { ExtraTagProps } from "./style";

const Tag = (props: Args): JSX.Element => {
  const { label } = props;

  return <RawTag label={label} {...props} />;
};

const CUSTOM_COLOR_TUPLES = {
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
  CUSTOM_COLOR_TUPLES.labelAndBack,
  CUSTOM_COLOR_TUPLES.labelAndBackAndIcon,
];

const availableIconOptions = [
  undefined,
  <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />,
  <Icon sdsSize="l" sdsIcon="loading" sdsType="button" />,
  <WbSunny />,
  <CheckCircleOutline />,
];

const SDS_STYLES: ExtraTagProps["sdsStyle"][] = ["rounded", "square"];
const COLORS = availableColorOptions.slice(0, 9) as ExtraTagProps["tagColor"][];
COLORS.splice(7, 1);
const PSEUDO_STATES = ["default", "hover", "active", "focus-visible"];
const HOVERABLE_OPTIONS = [true, false];
const SDS_TYPES: ExtraTagProps["sdsType"][] = ["primary", "secondary"];
const ICON_OPTIONS = availableIconOptions.slice(0, 2);

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

const styleLevel: React.CSSProperties = {
  columnGap: "20px",
  display: "inline-grid",
  fontFamily: "sans-serif",
  marginRight: "50px",
};
const displayContents: React.CSSProperties = {
  display: "contents",
};
const hoverLevel: React.CSSProperties = {
  display: "contents",
};
const stateLevel: React.CSSProperties = {
  marginBottom: 10,
};
const fontWeightNormal: React.CSSProperties = {
  fontWeight: "normal",
};
const styleLabel: React.CSSProperties = {
  ...fontWeightNormal,
  fontSize: "2em",
  gridColumn: "2 / 6",
  marginBottom: 0,
};
const midLevelLabel: React.CSSProperties = {
  ...fontWeightNormal,
  borderStyle: "solid none none none",
  gridColumn: "2 / 6",
  justifySelf: "stretch",
  paddingTop: 10,
};
const colorLabel: React.CSSProperties = {
  ...midLevelLabel,
  borderWidth: "5px",
  fontSize: "1.5em",
  margin: "20px 0 0 0",
};
const typeLabel: React.CSSProperties = {
  ...midLevelLabel,
  borderWidth: "2px",
  fontSize: "1.17em",
  margin: "20px 0",
};
const iconLabel: React.CSSProperties = {
  ...midLevelLabel,
  alignSelf: "end",
  borderWidth: "1px",
  margin: "0 0 5px 0",
};
const hoverLabel: React.CSSProperties = {
  ...fontWeightNormal,
  alignSelf: "end",
  gridColumn: "1 / 2",
  marginTop: 0,
};
const stateLabel: React.CSSProperties = {
  ...fontWeightNormal,
  margin: "10px 0",
};

function LivePreviewDemo(props: Args): JSX.Element {
  // loop through all SDS_STYLES
  return (
    <>
      {SDS_STYLES.map((sdsStyle) => {
        return <TagStyle sdsStyle={sdsStyle} key={sdsStyle} />;
      })}
    </>
  );

  // loop through all COLORS + create headers for SDS_STYLES
  function TagStyle({ sdsStyle }: { sdsStyle: ExtraTagProps["sdsStyle"] }) {
    return (
      <div style={styleLevel}>
        <h2 style={styleLabel}>
          Style: <b>{sdsStyle}</b>
        </h2>
        {COLORS.map((color) => {
          return (
            <TagColor sdsStyle={sdsStyle} color={color} key={String(color)} />
          );
        })}
      </div>
    );
  }

  // loop through all SDS_TYPES + create headers for COLORS
  function TagColor({
    sdsStyle,
    color,
  }: {
    sdsStyle: ExtraTagProps["sdsStyle"];
    color: ExtraTagProps["tagColor"];
  }) {
    return (
      <div style={displayContents}>
        <h3 style={colorLabel}>
          {/* Color: <b>{color[0].length === 1 ? color : "custom"}</b> */}
          Color: <b>{typeof color === "string" ? color : "custom"}</b>
        </h3>
        {SDS_TYPES.map((sdsType) => {
          return (
            <TagType
              sdsStyle={sdsStyle}
              color={color}
              sdsType={sdsType}
              key={sdsType}
            />
          );
        })}
      </div>
    );
  }

  // loop through all ICON_OPTIONS + create headers for SDS_TYPES
  function TagType({
    sdsStyle,
    color,
    sdsType,
  }: {
    sdsStyle: ExtraTagProps["sdsStyle"];
    color: ExtraTagProps["tagColor"];
    sdsType: ExtraTagProps["sdsType"];
  }) {
    return (
      <div style={displayContents}>
        <h4 style={typeLabel}>
          Type: <b>{sdsType}</b>
        </h4>
        {ICON_OPTIONS.map((icon) => {
          return (
            <TagIcon
              sdsStyle={sdsStyle}
              color={color}
              sdsType={sdsType}
              icon={icon}
              key={String(icon)}
            />
          );
        })}
      </div>
    );
  }

  // loop through all HOVERABLE_OPTIONS + create headers for ICON_OPTIONS
  function TagIcon({
    sdsStyle,
    color,
    sdsType,
    icon,
  }: {
    sdsStyle: ExtraTagProps["sdsStyle"];
    color: ExtraTagProps["tagColor"];
    sdsType: ExtraTagProps["sdsType"];
    icon: (typeof ICON_OPTIONS)[number];
  }) {
    return (
      <div style={displayContents}>
        <h5 style={iconLabel}>
          Icon: <b>{icon ? "yes" : "no"}</b>
        </h5>
        {HOVERABLE_OPTIONS.map((hover, hoverIndex) => {
          return (
            <TagState
              sdsStyle={sdsStyle}
              color={color}
              sdsType={sdsType}
              icon={icon}
              hover={hover}
              key={String(hover)}
              hoverIndex={hoverIndex}
            />
          );
        })}
      </div>
    );
  }

  // loop through all PSEUDO_STATES + create headers for HOVERABLE_OPTIONS, PSEUDO_STATES
  function TagState({
    sdsStyle,
    color,
    sdsType,
    icon,
    hover,
    hoverIndex,
  }: {
    sdsStyle: ExtraTagProps["sdsStyle"];
    color: ExtraTagProps["tagColor"];
    sdsType: ExtraTagProps["sdsType"];
    icon: (typeof ICON_OPTIONS)[number];
    hover: (typeof HOVERABLE_OPTIONS)[number];
    hoverIndex: number;
  }) {
    const { label } = props;

    return (
      <div style={hoverLevel}>
        <h6 style={hoverLabel}>
          Hoverable: <b>{hover ? "true" : "false"}</b>
        </h6>
        {PSEUDO_STATES.map((state) => {
          return (
            <div style={stateLevel}>
              {hoverIndex % 2 ? (
                false
              ) : (
                <h6 style={stateLabel}>
                  State: <b>{state}</b>
                </h6>
              )}
              <RawTag
                {...props}
                label={label}
                data-testid="tag"
                sdsStyle={sdsStyle}
                color={color}
                sdsType={sdsType}
                icon={icon}
                hover={hover}
                className={hover ? `pseudo-${state}` : `pseudo-default`}
                key={state}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export const LivePreview = {
  args: {
    color: COLORS[0],
    hover: HOVERABLE_OPTIONS[0],
    label: "Label",
    sdsStyle: SDS_STYLES[0],
    sdsType: SDS_TYPES[0],
  },
  parameters: {
    axe: {
      timeout: 10 * 1000,
    },
    snapshot: {
      skip: true,
    },
  },

  render: (props: Args): JSX.Element => <LivePreviewDemo {...props} />,
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
