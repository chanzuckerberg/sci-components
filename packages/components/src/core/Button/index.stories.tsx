import { action } from "@storybook/addon-actions";
import { Args, Meta } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import RawButton from "./index";

const text = "Label";
const SDS_STYLES = ["rounded", "square", "minimal"];
const SDS_TYPES = ["primary", "secondary"];

const actions = {
  onClick: action("onClick"),
};

const Button = (props: Args): JSX.Element => {
  const { sdsType, sdsStyle } = props;
  return (
    <RawButton sdsType={sdsType} sdsStyle={sdsStyle} {...props}>
      {text}
    </RawButton>
  );
};

export default {
  argTypes: {
    // https://storybook.js.org/docs/react/essentials/actions#action-argtype-annotation
    onClick: { action: actions.onClick },
    sdsStyle: {
      control: { sdsType: "select" },
      options: SDS_STYLES,
    },
    sdsType: {
      control: { sdsType: "select" },
      options: SDS_TYPES,
    },
    text: {
      control: {
        sdsType: "text",
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

const buttonPlacementStyles = {
  display: "grid",
  gridColumnGap: "10px",
  gridRowGap: "0px",
  gridTemplateColumns: "repeat(4, 120px)",
  gridTemplateRows: "1fr",
};

const sectionPlacementStyles = {
  display: "inline-block",
  marginBottom: "60px",
  marginRight: "60px",
  verticalAlign: "text-top",
  alignItems: "stretch",
};

const PSEUDO_STATES = ["default", "hover", "active", "focus-visible"];

export const LivePreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (props: Args): JSX.Element => {
    return (
      <>
        {SDS_STYLES.map((sdsStyle) => {
          return <ButtonStyle sdsStyle={sdsStyle} key={sdsStyle} />;
        })}
      </>
    );

    function ButtonStyle({ sdsStyle }) {
      return (
        <div style={sectionPlacementStyles}>
          <h3>{sdsStyle}</h3>
          {PSEUDO_STATES.map((state) => {
            return (
              <ButtonState state={state} sdsStyle={sdsStyle} key={state} />
            );
          })}
        </div>
      );
    }

    function ButtonState({ sdsStyle, state = "default" }) {
      return (
        <>
          <h5>{state}</h5>
          <div
            style={buttonPlacementStyles as React.CSSProperties}
            id={state}
            className={`pseudo-${state}`}
          >
            {SDS_TYPES.map((sdsType) => {
              return (
                <ButtonType
                  state={state}
                  sdsStyle={sdsStyle}
                  sdsType={sdsType}
                  key={sdsType}
                />
              );
            })}
          </div>
        </>
      );
    }

    function ButtonType({ sdsStyle, sdsType }) {
      return (
        <>
          <RawButton {...props} sdsStyle={sdsStyle} sdsType={sdsType}>
            {text}
          </RawButton>
          {(sdsStyle !== "minimal" || sdsType === "primary") && (
            <RawButton
              {...props}
              startIcon={
                <Icon sdsIcon="download" sdsSize="s" sdsType="button" />
              }
              sdsStyle={sdsStyle}
              sdsType={sdsType}
            >
              {text}
            </RawButton>
          )}
        </>
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
