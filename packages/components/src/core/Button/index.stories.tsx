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

// Rounded Live Preview

const placementStyles: React.CSSProperties = {
  display: "grid",
  gridColumnGap: "10px",
  gridRowGap: "0px",
  gridTemplateColumns: "repeat(6, 120px)",
  gridTemplateRows: "1fr",
};

const RoundedLivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={placementStyles}>
      <RawButton {...props} sdsStyle="rounded" sdsType="primary">
        {TEXT}
      </RawButton>
      <RawButton
        {...props}
        startIcon={<Icon sdsIcon="download" sdsSize="s" sdsType="button" />}
        sdsStyle="rounded"
        sdsType="primary"
      >
        {TEXT}
      </RawButton>
      <RawButton {...props} sdsStyle="rounded" sdsType="secondary">
        {TEXT}
      </RawButton>
      <RawButton
        {...props}
        startIcon={<Icon sdsIcon="download" sdsSize="s" sdsType="button" />}
        sdsStyle="rounded"
        sdsType="secondary"
      >
        {TEXT}
      </RawButton>
    </div>
  );
};

export const RoundedLivePreview = {
  args: {
    label: "Label",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <RoundedLivePreviewDemo {...args} />,
};

// Square Live Preview

const SquareLivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={placementStyles as React.CSSProperties}>
      <RawButton {...props} sdsStyle="square" sdsType="primary">
        {TEXT}
      </RawButton>
      <RawButton
        {...props}
        startIcon={<Icon sdsIcon="download" sdsSize="s" sdsType="button" />}
        sdsStyle="square"
        sdsType="primary"
      >
        {TEXT}
      </RawButton>
      <RawButton {...props} sdsStyle="square" sdsType="secondary">
        {TEXT}
      </RawButton>
      <RawButton
        {...props}
        startIcon={<Icon sdsIcon="download" sdsSize="s" sdsType="button" />}
        sdsStyle="square"
        sdsType="secondary"
      >
        {TEXT}
      </RawButton>
    </div>
  );
};

export const SquareLivePreview = {
  args: {
    label: "Label",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <SquareLivePreviewDemo {...args} />,
};

// Minimal Live Preview

const MinimalLivePreviewDemo = (props: Args): JSX.Element => {
  const minimalPlacementStyles: React.CSSProperties = {
    display: "grid",
    gridColumnGap: "24px",
    gridRowGap: "0px",
    gridTemplateColumns: "repeat(3, min-content)",
    gridTemplateRows: "1fr",
  };

  return (
    <div style={minimalPlacementStyles}>
      <RawButton {...props} sdsStyle="minimal" sdsType="primary">
        {TEXT}
      </RawButton>
      <RawButton
        {...props}
        startIcon={<Icon sdsIcon="download" sdsSize="s" sdsType="button" />}
        sdsStyle="minimal"
        sdsType="primary"
      >
        {TEXT}
      </RawButton>
      <RawButton {...props} sdsStyle="minimal" sdsType="secondary">
        {TEXT}
      </RawButton>
    </div>
  );
};

export const MinimalLivePreview = {
  args: {
    label: "Label",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <MinimalLivePreviewDemo {...args} />,
};

// Screenshot Test

const ScreenshotTestDemo = (props: Args): JSX.Element => {
  const topLevel: React.CSSProperties = {
    columnGap: "20px",
    display: "inline-grid",
    fontFamily: "sans-serif",
    marginRight: "50px",
  };
  const displayContents: React.CSSProperties = {
    display: "contents",
  };
  const penultimateLevel: React.CSSProperties = {
    display: "contents",
  };
  const bottomLevel: React.CSSProperties = {
    marginBottom: 10,
  };
  const fontWeightNormal: React.CSSProperties = {
    fontWeight: "normal",
  };
  const topLabel: React.CSSProperties = {
    ...fontWeightNormal,
    fontSize: "2em",
    gridColumn: "1 / 6",
    marginBottom: 0,
  };
  const midLabel: React.CSSProperties = {
    ...fontWeightNormal,
    borderStyle: "solid none none none",
    gridColumn: "1 / 6",
    justifySelf: "stretch",
    paddingTop: 10,
  };
  const secondLabel: React.CSSProperties = {
    ...midLabel,
    borderWidth: "2px",
    fontSize: "1.17em",
    margin: "20px 0",
  };
  const thirdLabel: React.CSSProperties = {
    ...midLabel,
    alignSelf: "end",
    borderWidth: "1px",
    fontWeight: "normal",
    margin: "0 0 5px 0",
  };
  const bottomLabel: React.CSSProperties = {
    ...fontWeightNormal,
    margin: "10px 0",
  };

  // loop through all SDS_STYLES
  return (
    <>
      {SDS_STYLES.map((sdsStyle) => {
        return <ButtonStyleOption sdsStyle={sdsStyle} key={sdsStyle} />;
      })}
    </>
  );

  // loop through all SDS_TYPES + create headers for SDS_STYLES
  function ButtonStyleOption({
    sdsStyle,
  }: {
    sdsStyle: (typeof SDS_STYLES)[number];
  }) {
    return (
      <div style={topLevel}>
        <h3 style={topLabel}>
          Style: <b>{sdsStyle}</b>
        </h3>
        {SDS_TYPES.map((type) => {
          return (
            <ButtonTypeOption sdsStyle={sdsStyle} type={type} key={type} />
          );
        })}
      </div>
    );
  }

  // loop through all ICON_OPTIONS + create headers for SDS_TYPES
  function ButtonTypeOption({
    sdsStyle,
    type,
  }: {
    sdsStyle: (typeof SDS_STYLES)[number];
    type: (typeof SDS_TYPES)[number];
  }) {
    return (
      <div style={displayContents}>
        <h4 style={secondLabel}>
          Type: <b>{type}</b>
        </h4>
        {/* Minimal Secondary doesn't have icon button option */}
        {sdsStyle === "minimal" && type === "secondary" ? (
          <ButtonIconOption
            sdsStyle={sdsStyle}
            type={type}
            icon={ICON_OPTIONS[0]}
            key={String(ICON_OPTIONS[0])}
          />
        ) : (
          ICON_OPTIONS.map((icon) => {
            return (
              <ButtonIconOption
                sdsStyle={sdsStyle}
                type={type}
                icon={icon}
                key={String(icon)}
              />
            );
          })
        )}
      </div>
    );
  }

  // loop through all DISABLED_OPTIONS + create headers for ICON_OPTIONS
  function ButtonIconOption({
    sdsStyle,
    type,
    icon,
  }: {
    sdsStyle: (typeof SDS_STYLES)[number];
    type: (typeof SDS_TYPES)[number];
    icon: (typeof ICON_OPTIONS)[number];
  }) {
    return (
      <div style={displayContents}>
        <h5 style={thirdLabel}>
          Icon: <b>{icon ? "yes" : "no"}</b>
        </h5>
        {DISABLED_OPTIONS.map((disabled) => {
          return (
            <ButtonDisabledOption
              sdsStyle={sdsStyle}
              type={type}
              icon={icon}
              disabled={disabled}
              key={String(disabled)}
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
  }: {
    sdsStyle: (typeof SDS_STYLES)[number];
    type: (typeof SDS_TYPES)[number];
    icon: (typeof ICON_OPTIONS)[number];
    disabled: (typeof DISABLED_OPTIONS)[number];
  }) {
    return (
      <div style={penultimateLevel}>
        {PSEUDO_STATES.map((state) => {
          return (
            <div style={bottomLevel}>
              {/* removes irrelevant disabled iterations: when combined with all pseudo-states except default, `disabled=false` is impossible */}
              {(disabled === false ||
                (disabled === true && state === "default")) && (
                <>
                  <h6 style={bottomLabel}>
                    {disabled === false ? "State: " : "Disabled: "}
                    <br />
                    <b>{disabled === false ? state : "true"}</b>
                  </h6>
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
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }
};

export const ScreenshotTest = {
  args: {
    label: "Label",
  },
  parameters: {
    controls: {
      exclude: ["onClick", "sdsStyle", "sdsType", "text"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />,
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
