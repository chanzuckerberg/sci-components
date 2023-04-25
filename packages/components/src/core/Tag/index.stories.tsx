import { CheckCircleOutline, WbSunny } from "@mui/icons-material";
import { Args, Meta } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import RawTag from "./index";

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

const SDS_STYLES = ["rounded", "square"];
const COLORS = availableColorOptions.slice(0, 9);
COLORS.splice(7, 1);
const PSEUDO_STATES = ["default", "hover", "active", "focus-visible"];
const HOVERABLE_OPTIONS = [true, false];
const SDS_TYPES = ["primary", "secondary"];
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

const styleLevel = {
  columnGap: "20px",
  display: "inline-grid",
  fontFamily: "sans-serif",
  gridColumnTemplate:
    "min-content min-content min-content min-content min-content",
  marginRight: "50px",
};
const displayContents = {
  display: "contents",
};
const hoverLevel = {
  display: "contents",
};
const stateLevel = {
  marginBottom: 10,
};

const styleLabel = {
  fontSize: "2em",
  fontWeight: "normal",
  gridColumn: "2 / 6",
  marginBottom: 0,
};
const colorLabel = {
  borderStyle: "solid none none none",
  borderWidth: "5px",
  fontSize: "1.5em",
  fontWeight: "normal",
  gridColumn: "2 / 6",
  hyphens: "auto",
  justifySelf: "stretch",
  margin: "20px 0 0 0",
  paddingTop: 10,
};
const typeLabel = {
  borderStyle: "solid none none none",
  borderWidth: "2px",
  fontSize: "1.17em",
  fontWeight: "normal",
  gridColumn: "2 / 6",
  justifySelf: "stretch",
  margin: "20px 0",
  paddingTop: 10,
};
const iconLabel = {
  alignSelf: "end",
  borderStyle: "solid none none none",
  borderWidth: "1px",
  fontWeight: "normal",
  gridColumn: "2 / 6",
  justifySelf: "stretch",
  margin: "0 0 5px 0",
  paddingTop: 10,
};
const hoverLabel = {
  alignSelf: "end",
  fontWeight: "normal",
  gridColumn: "1 / 2",
  marginTop: 0,
};
const stateLabel = {
  fontWeight: "normal",
  margin: "10px 0",
};

export const LivePreview = {
  args: {
    sdsStyle: SDS_STYLES[0],
    color: COLORS[0],
    hover: HOVERABLE_OPTIONS[0],
    sdsType: SDS_TYPES[0],
    label: "Label",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },

  render: (props: Args): JSX.Element => {
    // loop through all SDS_STYLES
    return (
      <>
        {SDS_STYLES.map((sdsStyle) => {
          return <TagStyle sdsStyle={sdsStyle} key={sdsStyle} />;
        })}
      </>
    );

    // loop through all COLORS + create headers for SDS_STYLES
    function TagStyle({ sdsStyle }) {
      return (
        <div style={styleLevel}>
          <h2 style={styleLabel}>
            Style: <b>{sdsStyle}</b>
          </h2>
          {COLORS.map((color) => {
            return <TagColor sdsStyle={sdsStyle} color={color} key={color} />;
          })}
        </div>
      );
    }

    // loop through all SDS_TYPES + create headers for COLORS
    function TagColor({ sdsStyle, color }) {
      return (
        <div style={displayContents}>
          <h3 style={colorLabel}>
            Color: <b>{color[0].length === 1 ? color : "custom"}</b>
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
    function TagType({ sdsStyle, color, sdsType }) {
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
                key={icon}
              />
            );
          })}
        </div>
      );
    }

    // loop through all HOVERABLE_OPTIONS + create headers for ICON_OPTIONS
    function TagIcon({ sdsStyle, color, sdsType, icon }) {
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
                key={hover}
                hoverIndex={hoverIndex}
              />
            );
          })}
        </div>
      );
    }

    // loop through all PSEUDO_STATES + create headers for HOVERABLE_OPTIONS, PSEUDO_STATES
    function TagState({ sdsStyle, color, sdsType, icon, hover, hoverIndex }) {
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
  },
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
