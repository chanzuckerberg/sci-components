import { CheckCircleOutline, WbSunny } from "@mui/icons-material";
import { Args } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import RawTag from "./index";
import { ExtraTagProps } from "./style";

const SDS_STYLES: ExtraTagProps["sdsStyle"][] = ["rounded", "square"];
const SDS_TYPES: ExtraTagProps["sdsType"][] = ["primary", "secondary"];

const DISPLAY_CONTENTS: React.CSSProperties = {
  display: "contents",
};

const FONT_WEIGHT_NORMAL: React.CSSProperties = {
  fontWeight: "normal",
};

const MID_LABEL: React.CSSProperties = {
  ...FONT_WEIGHT_NORMAL,
  borderStyle: "solid none none none",
  gridColumn: "1 / 6",
  justifySelf: "stretch",
  paddingTop: 10,
};

export const AVAILABLE_ICON_OPTIONS = [
  undefined,
  <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="button" />,
  <Icon sdsSize="l" sdsIcon="loading" sdsType="button" />,
  <WbSunny />,
  <CheckCircleOutline />,
];

const iconOptions = AVAILABLE_ICON_OPTIONS.slice(0, 2);

export const HOVER_OPTIONS = [true, false];

export function CommonScreenshotTestDemo({
  props,
  colors,
}: {
  props: Args;
  colors: ExtraTagProps["tagColor"][];
}): JSX.Element {
  // loop through all SDS_STYLES
  return (
    <>
      {SDS_STYLES.map((sdsStyle) => {
        return (
          <PrimaryTagStyle
            colors={colors}
            props={props}
            sdsStyle={sdsStyle}
            key={sdsStyle}
          />
        );
      })}
    </>
  );
}

// loop through all COLORS + create headers for SDS_STYLES
function PrimaryTagStyle({
  colors,
  sdsStyle,
  props,
}: {
  colors: ExtraTagProps["tagColor"][];
  sdsStyle: ExtraTagProps["sdsStyle"];
  props: Args;
}) {
  const topLevel: React.CSSProperties = {
    columnGap: "20px",
    display: "inline-grid",
    fontFamily: "sans-serif",
    marginRight: "50px",
  };

  const topLabel: React.CSSProperties = {
    ...FONT_WEIGHT_NORMAL,
    fontSize: "2em",
    gridColumn: "1 / 6",
    marginBottom: 0,
  };

  return (
    <div style={topLevel}>
      <h2 style={topLabel}>
        Style: <b>{sdsStyle}</b>
      </h2>
      {colors.map((color) => {
        return (
          <PrimaryTagColor
            sdsStyle={sdsStyle}
            color={color}
            key={String(color)}
            props={props}
          />
        );
      })}
    </div>
  );
}

// loop through all SDS_TYPES + create headers for COLORS
function PrimaryTagColor({
  sdsStyle,
  color,
  props,
}: {
  sdsStyle: ExtraTagProps["sdsStyle"];
  color: ExtraTagProps["tagColor"];
  props: Args;
}) {
  const h3Label: React.CSSProperties = {
    ...MID_LABEL,
    borderWidth: "5px",
    fontSize: "1.5em",
    margin: "20px 0 0 0",
  };

  return (
    <div style={DISPLAY_CONTENTS}>
      <h3 style={h3Label}>
        Color: <b>{color}</b>
      </h3>
      {SDS_TYPES.map((sdsType) => {
        return (
          <PrimaryTagType
            sdsStyle={sdsStyle}
            color={color}
            sdsType={sdsType}
            key={sdsType}
            props={props}
          />
        );
      })}
    </div>
  );
}

// loop through all ICON_OPTIONS + create headers for SDS_TYPES
function PrimaryTagType({
  sdsStyle,
  color,
  sdsType,
  props,
}: {
  sdsStyle: ExtraTagProps["sdsStyle"];
  color: ExtraTagProps["tagColor"];
  sdsType: ExtraTagProps["sdsType"];
  props: Args;
}) {
  const h4Label: React.CSSProperties = {
    ...MID_LABEL,
    borderWidth: "2px",
    fontSize: "1.17em",
    margin: "20px 0",
  };

  return (
    <div style={DISPLAY_CONTENTS}>
      <h4 style={h4Label}>
        Type: <b>{sdsType}</b>
      </h4>
      {iconOptions.map((icon) => {
        return (
          <PrimaryTagIcon
            sdsStyle={sdsStyle}
            color={color}
            sdsType={sdsType}
            icon={icon}
            key={String(icon)}
            props={props}
          />
        );
      })}
    </div>
  );
}

// loop through all HOVER_OPTIONS + create headers for iconOptions
function PrimaryTagIcon({
  sdsStyle,
  color,
  sdsType,
  icon,
  props,
}: {
  sdsStyle: ExtraTagProps["sdsStyle"];
  color: ExtraTagProps["tagColor"];
  sdsType: ExtraTagProps["sdsType"];
  icon: (typeof iconOptions)[number];
  props: Args;
}) {
  const h5Label: React.CSSProperties = {
    ...MID_LABEL,
    alignSelf: "end",
    borderWidth: "1px",
    margin: "0 0 5px 0",
  };

  return (
    <div style={DISPLAY_CONTENTS}>
      <h5 style={h5Label}>
        Icon: <b>{icon ? "yes" : "no"}</b>
      </h5>
      {HOVER_OPTIONS.map((hover) => {
        return (
          <TagState
            {...props}
            sdsStyle={sdsStyle}
            color={color}
            sdsType={sdsType}
            icon={icon}
            hover={hover}
            key={String(hover)}
          />
        );
      })}
    </div>
  );
}

// loop through all PSEUDO_STATES + create headers for HOVER_OPTIONS, PSEUDO_STATES
function TagState(props: {
  sdsStyle: ExtraTagProps["sdsStyle"];
  color: ExtraTagProps["tagColor"];
  sdsType: ExtraTagProps["sdsType"];
  icon: (typeof iconOptions)[number];
  hover: (typeof HOVER_OPTIONS)[number];
}) {
  const { sdsStyle, color, sdsType, icon, hover } = props;

  const PSEUDO_STATES = ["default", "hover", "active", "focus-visible"];

  const penultimateLevel: React.CSSProperties = {
    display: "contents",
  };

  const bottomLabel: React.CSSProperties = {
    ...FONT_WEIGHT_NORMAL,
    margin: "10px 0",
  };

  const bottomLevel: React.CSSProperties = {
    marginBottom: 10,
  };

  const label = "Label";

  return (
    <div style={penultimateLevel}>
      {PSEUDO_STATES.map((state) => {
        return (
          <div style={bottomLevel}>
            {/* removes irrelevant hover iterations: when combined with all pseudo-states except default, hover=false is impossible */}
            {(hover === true || (hover === false && state === "default")) && (
              <>
                <h6 style={bottomLabel}>
                  {hover ? "State: " : "Hoverable: "}
                  <br />
                  <b>{hover ? state : "false"}</b>
                </h6>
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
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
