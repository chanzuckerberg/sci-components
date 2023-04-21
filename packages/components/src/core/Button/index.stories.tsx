import { action } from "@storybook/addon-actions";
import { Args, Meta } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import RawButton from "./index";

const text = "Label";
const sdsStyles = ["rounded", "square", "minimal"];
const sdsTypes = ["primary", "secondary"];

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
      control: { type: "select" },
      options: sdsStyles,
    },
    sdsType: {
      control: { type: "select" },
      options: sdsTypes,
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

const placementStyles = {
  display: "grid",
  gridColumnGap: "10px",
  gridRowGap: "0px",
  gridTemplateColumns: "repeat(6, 120px)",
  gridTemplateRows: "1fr",
};

const PSEUDO_STATES = ["default", "hover", "active", "focus-visible"];

export const RoundedLivePreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (props: Args): JSX.Element => {
    return (
      <>
        {PSEUDO_STATES.map((state) => {
          return <ButtonRow state={state} />;
        })}
      </>
    );

    function ButtonRow({ state = "default" }) {
      return (
        <div id={state} className={`pseudo-${state}`}>
          <h5>{state}</h5>
          <div style={placementStyles as React.CSSProperties}>
            <RawButton {...props} sdsStyle="rounded" sdsType="primary">
              {text}
            </RawButton>

            <RawButton
              {...props}
              startIcon={
                <Icon sdsIcon="download" sdsSize="s" sdsType="button" />
              }
              sdsStyle="rounded"
              sdsType="primary"
            >
              {text}
            </RawButton>
            <RawButton {...props} sdsStyle="rounded" sdsType="secondary">
              {text}
            </RawButton>
            <RawButton
              {...props}
              startIcon={
                <Icon sdsIcon="download" sdsSize="s" sdsType="button" />
              }
              sdsStyle="rounded"
              sdsType="secondary"
            >
              {text}
            </RawButton>
          </div>
        </div>
      );
    }
  },
};

export const SquareLivePreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (props: Args): JSX.Element => {
    return (
      <div style={placementStyles as React.CSSProperties}>
        <RawButton {...props} sdsStyle="square" sdsType="primary">
          {text}
        </RawButton>
        <RawButton
          {...props}
          startIcon={<Icon sdsIcon="download" sdsSize="s" sdsType="button" />}
          sdsStyle="square"
          sdsType="primary"
        >
          {text}
        </RawButton>
        <RawButton {...props} sdsStyle="square" sdsType="secondary">
          {text}
        </RawButton>
        <RawButton
          {...props}
          startIcon={<Icon sdsIcon="download" sdsSize="s" sdsType="button" />}
          sdsStyle="square"
          sdsType="secondary"
        >
          {text}
        </RawButton>
      </div>
    );
  },
};

const minimalPlacementStyles = {
  display: "grid",
  gridColumnGap: "24px",
  gridRowGap: "0px",
  gridTemplateColumns: "repeat(3, min-content)",
  gridTemplateRows: "1fr",
};

export const MinimalLivePreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (props: Args): JSX.Element => {
    return (
      <div style={minimalPlacementStyles as React.CSSProperties}>
        <RawButton {...props} sdsStyle="minimal" sdsType="primary">
          {text}
        </RawButton>

        <RawButton
          {...props}
          startIcon={<Icon sdsIcon="download" sdsSize="s" sdsType="button" />}
          sdsStyle="minimal"
          sdsType="primary"
        >
          {text}
        </RawButton>
        <RawButton {...props} sdsStyle="minimal" sdsType="secondary">
          {text}
        </RawButton>
      </div>
    );
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
