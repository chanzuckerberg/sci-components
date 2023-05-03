import { action } from "@storybook/addon-actions";
import { Args, Meta } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import RawButton from "./index";

const SDS_STYLES = ["rounded", "square", "minimal"];
const SDS_TYPES = ["primary", "secondary"];
const ICON_OPTIONS = [
  undefined,
  <Icon sdsSize="l" sdsIcon="download" sdsType="button" />,
];
const DISABLED_OPTIONS = [false, true];
const PSEUDO_STATES = ["default", "hover", "active", "focus-visible"];
const TEXT = "Label";

const actions = {
  onClick: action("onClick"),
};

const Button = (props: Args): JSX.Element => {
  const { sdsType, sdsStyle } = props;
  return (
    <RawButton sdsType={sdsType} sdsStyle={sdsStyle} {...props}>
      {TEXT}
    </RawButton>
  );
};

export default {
  argTypes: {
    // https://storybook.js.org/docs/react/essentials/actions#action-argtype-annotation
    onClick: { action: actions.onClick },
    sdsStyle: {
      control: { type: "select" },
      options: SDS_STYLES,
    },
    sdsType: {
      control: { type: "select" },
      options: SDS_TYPES,
    },
    text: {
      control: {
        type: "text",
      },
    },
  },
  component: Button,
  title: "Button",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    sdsStyle: "rounded",
    sdsType: "primary",
    text: "Label",
  },
};

// Live Preview

const styleLevel = {
  fontFamily: "sans-serif",
  display: "inline-grid",
  gridColumnTemplate:
    "min-content min-content min-content min-content min-content",
  columnGap: "20px",
  marginRight: "50px",
};
const displayContents = {
  display: "contents",
};
const disabledLevel = {
  display: "contents",
};
const stateLevel = {
  marginBottom: 10,
};

const styleLabel = {
  fontWeight: "normal",
  gridColumn: "2 / 6",
  marginBottom: 0,
};
const typeLabel = {
  fontWeight: "normal",
  gridColumn: "2 / 6",
  borderStyle: "solid none none none",
  borderWidth: "2px",
  justifySelf: "stretch",
  margin: "20px 0",
  paddingTop: 10,
};
const iconLabel = {
  fontWeight: "normal",
  gridColumn: "2 / 6",
  borderStyle: "solid none none none",
  borderWidth: "1px",
  justifySelf: "stretch",
  alignSelf: "end",
  margin: "0 0 5px 0",
  paddingTop: 10,
};
const disabledLabel = {
  fontWeight: "normal",
  gridColumn: "1 / 2",
  alignSelf: "end",
  marginTop: 0,
};
const stateLabel = {
  fontWeight: "normal",
  margin: "10px 0",
};

export const LivePreview = {
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
          return <ButtonStyleOption sdsStyle={sdsStyle} key={sdsStyle} />;
        })}
      </>
    );

    // loop through all SDS_TYPES + create headers for SDS_STYLES
    function ButtonStyleOption({ sdsStyle }) {
      return (
        <div style={styleLevel}>
          <h1 style={styleLabel}>
            Style: <b>{sdsStyle}</b>
          </h1>
          {SDS_TYPES.map((type) => {
            return (
              <ButtonTypeOption sdsStyle={sdsStyle} type={type} key={type} />
            );
          })}
        </div>
      );
    }

    // loop through all ICON_OPTIONS + create headers for SDS_TYPES
    function ButtonTypeOption({ sdsStyle, type }) {
      return (
        <div style={displayContents}>
          <h3 style={typeLabel}>
            Type: <b>{type}</b>
          </h3>
          {type === "primary" ? (
            ICON_OPTIONS.map((icon) => {
              return (
                <ButtonIconOption
                  sdsStyle={sdsStyle}
                  type={type}
                  icon={icon}
                  key={icon}
                />
              );
            })
          ) : (
            <ButtonIconOption
              sdsStyle={sdsStyle}
              type={type}
              icon={ICON_OPTIONS[0]}
              key={ICON_OPTIONS[0]}
            />
          )}
          {/* {ICON_OPTIONS.map((icon) => {
            return <ButtonIconOption
              sdsStyle={sdsStyle}
              type={type}
              icon={icon} 
              key={icon}
            />;
          })} */}
        </div>
      );
    }

    // loop through all DISABLED_OPTIONS + create headers for ICON_OPTIONS
    function ButtonIconOption({ sdsStyle, type, icon }) {
      return (
        <div style={displayContents}>
          <h5 style={iconLabel}>
            Icon: <b>{icon ? "yes" : "no"}</b>
          </h5>
          {DISABLED_OPTIONS.map((disabled, disabledIndex) => {
            return (
              <ButtonDisabledOption
                sdsStyle={sdsStyle}
                type={type}
                icon={icon}
                disabled={disabled}
                key={disabled}
                disabledIndex={disabledIndex}
              />
            );
          })}
        </div>
      );
    }

    // loop through all PSEUDO_STATES + create headers for DISABLED_OPTIONS, PSEUDO_STATES
    function ButtonDisabledOption({
      sdsStyle,
      type,
      icon,
      disabled,
      disabledIndex,
    }) {
      return (
        <div style={disabledLevel}>
          <h6 style={disabledLabel}>
            Disabled: <b>{disabled ? "true" : "false"}</b>
          </h6>
          {PSEUDO_STATES.map((state) => {
            return (
              <div style={stateLevel}>
                {disabledIndex % 2 ? (
                  false
                ) : (
                  <h6 style={stateLabel}>
                    State: <b>{state}</b>
                  </h6>
                )}
                <RawButton
                  {...props}
                  data-testid="button"
                  sdsStyle={sdsStyle}
                  sdsType={type}
                  startIcon={icon}
                  disabled={disabled}
                  className={`pseudo-${state}`}
                  key={state}
                >
                  {TEXT}
                </RawButton>
              </div>
            );
          })}
        </div>
      );
    }
  },
};

// Test

export const Test = {
  args: {
    disabled: false,
    sdsStyle: "rounded",
    sdsType: "primary",
    text: "Label",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (props: Args) => <Button {...props} data-testid="button" />,
};
