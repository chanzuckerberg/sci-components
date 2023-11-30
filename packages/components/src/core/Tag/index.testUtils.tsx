import { Args } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import RawTag from "./index";
import { ExtraTagProps } from "./style";

const SDS_STYLES: ExtraTagProps["sdsStyle"][] = ["rounded", "square"];
const DISPLAY_CONTENTS: React.CSSProperties = {
  display: "contents",
};
const MID_LABEL: React.CSSProperties = {
  borderStyle: "solid none none none",
  gridColumn: "1 / 6",
  justifySelf: "stretch",
  paddingTop: 10,
};
const ICON_OPTIONS = [
  undefined,
  <Icon sdsSize="l" icon="checkCircle" key="checkCircle" sdsType="button" />,
];
export const HOVER_OPTIONS = [true, false];
export function CommonScreenshotTestDemo({
  props,
  colors,
  types,
}: {
  props: Args;
  colors: ExtraTagProps["tagColor"][];
  types: ExtraTagProps["sdsType"][];
}): JSX.Element {
  // loop through all SDS_STYLES
  return (
    <>
      {SDS_STYLES.map((sdsStyle) => {
        return (
          <TagStyle
            colors={colors}
            types={types}
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
function TagStyle({
  colors,
  types,
  sdsStyle,
  props,
}: {
  colors: ExtraTagProps["tagColor"][];
  types: ExtraTagProps["sdsType"][];
  sdsStyle: ExtraTagProps["sdsStyle"];
  props: Args;
}) {
  const LEVEL_STYLE: React.CSSProperties = {
    columnGap: "20px",
    display: "inline-grid",
    fontFamily: "sans-serif",
    marginRight: "50px",
  };

  const LABEL_STYLE: React.CSSProperties = {
    fontSize: "2em",
    gridColumn: "1 / 6",
    marginBottom: 0,
  };

  return (
    <div style={LEVEL_STYLE}>
      <p style={LABEL_STYLE}>
        Style: <b>{sdsStyle}</b>
      </p>
      {colors.map((color) => {
        return (
          <TagColor
            sdsStyle={sdsStyle}
            color={color}
            key={String(color)}
            types={types}
            props={props}
          />
        );
      })}
    </div>
  );
}

// loop through all SDS_TYPES + create headers for COLORS
function TagColor({
  sdsStyle,
  color,
  types,
  props,
}: {
  sdsStyle: ExtraTagProps["sdsStyle"];
  color: ExtraTagProps["tagColor"];
  types: ExtraTagProps["sdsType"][];
  props: Args;
}) {
  const LABEL_STYLE: React.CSSProperties = {
    ...MID_LABEL,
    borderWidth: "5px",
    fontSize: "1.5em",
    margin: "20px 0 0 0",
  };

  return (
    <div style={DISPLAY_CONTENTS}>
      <p style={LABEL_STYLE}>
        Color: <b>{typeof color === "string" ? color : "custom"}</b>
      </p>
      {types.map((sdsType) => {
        // exclude gray primary from rendering in the main ScreenshotTest story (types.includes("secondary")), but allow gray primary to render in GrayPrimaryScreenshotTest story
        return types.includes("secondary") &&
          sdsType === "primary" &&
          color === "gray" ? null : (
          <TagType
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
function TagType({
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
  const LABEL_STYLE: React.CSSProperties = {
    ...MID_LABEL,
    borderWidth: "2px",
    fontSize: "1.17em",
    margin: "20px 0",
  };

  return (
    <div style={DISPLAY_CONTENTS}>
      <p style={LABEL_STYLE}>
        Type: <b>{sdsType}</b>
      </p>
      {ICON_OPTIONS.map((icon) => {
        return (
          <TagIcon
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

// loop through all HOVER_OPTIONS + create headers for ICON_OPTIONS
function TagIcon({
  sdsStyle,
  color,
  sdsType,
  icon,
  props,
}: {
  sdsStyle: ExtraTagProps["sdsStyle"];
  color: ExtraTagProps["tagColor"];
  sdsType: ExtraTagProps["sdsType"];
  icon: (typeof ICON_OPTIONS)[number];
  props: Args;
}) {
  const LABEL_STYLE: React.CSSProperties = {
    ...MID_LABEL,
    alignSelf: "end",
    borderWidth: "1px",
    fontSize: "0.83em",
    margin: "0 0 5px 0",
  };

  return (
    <div style={DISPLAY_CONTENTS}>
      <p style={LABEL_STYLE}>
        Icon: <b>{icon ? "yes" : "no"}</b>
      </p>
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
  icon: (typeof ICON_OPTIONS)[number];
  hover: (typeof HOVER_OPTIONS)[number];
}) {
  const { sdsStyle, color, sdsType, icon, hover } = props;
  const PSEUDO_STATES = ["default", "hover", "active", "focus-visible"];
  const HOVER_LEVEL: React.CSSProperties = {
    display: "contents",
  };
  const STATE_LABEL: React.CSSProperties = {
    fontSize: "0.67em",
    margin: "10px 0",
  };
  const STATE_LEVEL: React.CSSProperties = {
    marginBottom: 10,
  };

  const LABEL = "Label";

  return (
    <div style={HOVER_LEVEL}>
      {PSEUDO_STATES.map((state) => {
        return (
          <div style={STATE_LEVEL} key={state}>
            {/* removes irrelevant hover iterations: when combined with all pseudo-states except default, hover=false is impossible */}
            {(hover === true || (hover === false && state === "default")) && (
              <>
                <p style={STATE_LABEL}>
                  {hover ? "State: " : "Hoverable: "}
                  <br />
                  <b>{hover ? state : "false"}</b>
                </p>
                <RawTag
                  {...props}
                  label={LABEL}
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
