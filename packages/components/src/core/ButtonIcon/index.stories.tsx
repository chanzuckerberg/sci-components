import { Args, Meta } from "@storybook/react";
import React from "react";
import RawButtonIcon from "./index";
import { ButtonIconExtraProps, ButtonIconSizeToTypes } from "./style";

type SDSTypes = NonNullable<
  | ButtonIconExtraProps<"small">["sdsType"]
  | ButtonIconExtraProps<"medium">["sdsType"]
  | ButtonIconExtraProps<"large">["sdsType"]
>[];

type SDSSizes = (keyof ButtonIconSizeToTypes)[];

const SDS_TYPES: SDSTypes = ["primary", "secondary", "tertiary"];
const SDS_SIZES: SDSSizes = ["large", "medium", "small"];
const ON_OPTIONS = [false, true];
const DISABLED_OPTIONS = [false, true];
const PSEUDO_STATES = ["default", "hover", "active", "focus"];

const ButtonIcon = (props: Args): JSX.Element => {
  const { sdsIcon, ...rest } = props;

  const [on, setOn] = React.useState(false);
  const handleButtonClick = () => setOn(!on);

  return (
    <RawButtonIcon
      onClick={handleButtonClick}
      on={on}
      sdsIcon={sdsIcon}
      sdsSize="medium"
      sdsType="primary"
      {...rest}
    />
  );
};

export default {
  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
    on: {
      control: {
        type: "boolean",
      },
    },
    sdsIcon: {
      control: {
        type: "select",
      },
      options: [
        "dotsHorizontal",
        "copy",
        "download",
        "people",
        "treeHorizontal",
        "grid",
        "virus",
        "xMark",
      ],
    },
    sdsSize: {
      control: {
        type: "select",
      },
      options: ["small", "medium", "large"],
    },
    sdsType: {
      control: {
        type: "select",
      },
      options: ["primary", "secondary", "tertiary"],
    },
  },
  component: ButtonIcon,
  title: "ButtonIcon",
} as Meta;

// Default

export const Default = {
  args: {
    "aria-label": "info",
    disabled: false,
    sdsIcon: "dotsHorizontal",
    sdsSize: "large",
    sdsType: "primary",
  },
};

// Live Preview

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

export const LivePreview = {
  parameters: {
    controls: {
      exclude: ["disabled", "on", "sdsIcon", "sdsSize", "sdsType"],
    },
    snapshot: {
      skip: true,
    },
  },

  render: (props: Args): JSX.Element => {
    // loop through all SDS_TYPES
    return (
      <>
        {SDS_TYPES.map((sdsType) => {
          return <ButtonIconTypeOption sdsType={sdsType} key={sdsType} />;
        })}
      </>
    );

    // loop through all SDS_SIZES + create headers for SDS_TYPES
    function ButtonIconTypeOption({ sdsType }: { sdsType: SDSTypes[number] }) {
      return (
        <div style={topLevel}>
          <h3 style={topLabel}>
            Type: <b>{sdsType}</b>
          </h3>
          {SDS_SIZES.map((sdsSize) => {
            // primary and secondary types don't have medium size
            if (
              (sdsType === "primary" || sdsType === "secondary") &&
              sdsSize === "medium"
            ) {
              return null;
            }

            return (
              <ButtonIconSizeOption
                sdsType={sdsType}
                sdsSize={sdsSize}
                key={sdsSize}
              />
            );
          })}
        </div>
      );
    }

    // loop through all ON_OPTIONS + create headers for SDS_SIZES
    function ButtonIconSizeOption({
      sdsType,
      sdsSize,
    }: {
      sdsType: SDSTypes[number];
      sdsSize: SDSSizes[number];
    }) {
      // establish which combinations have `on` as a prop (used below and passed to next loop)
      const onLabelNeeded =
        sdsType === "primary" ||
        (sdsType === "secondary" && sdsSize === "small");

      return (
        <div style={displayContents}>
          <h4 style={secondLabel}>
            Size: <b>{sdsSize}</b>
          </h4>
          {ON_OPTIONS.map((on) => {
            return (
              // for the combinations with `on` as a prop, loop through all values for `on` (true, false)
              // for the combinations without `on` as a prop, loop through only once
              (onLabelNeeded ||
                ((sdsType === "tertiary" ||
                  (sdsType === "secondary" && sdsSize === "large")) &&
                  on === false)) && (
                <ButtonIconOnOption
                  sdsType={sdsType}
                  sdsSize={sdsSize}
                  on={on}
                  key={String(on)}
                  onLabelNeeded={onLabelNeeded}
                />
              )
            );
          })}
        </div>
      );
    }

    // loop through all DISABLED_OPTIONS + create headers for ON_OPTIONS
    function ButtonIconOnOption({
      sdsType,
      sdsSize,
      on,
      onLabelNeeded,
    }: {
      sdsType: SDSTypes[number];
      sdsSize: SDSSizes[number];
      on: (typeof ON_OPTIONS)[number];
      onLabelNeeded: boolean;
    }) {
      return (
        <div style={displayContents}>
          {/* only show the "On: ..." label for combinations that have `on` as a prop */}
          {onLabelNeeded && (
            <h5 style={thirdLabel}>
              On: <b>{on ? "true" : "false"}</b>
            </h5>
          )}
          {DISABLED_OPTIONS.map((disabled) => {
            return (
              <ButtonIconDisabledOption
                sdsType={sdsType}
                sdsSize={sdsSize}
                on={on}
                disabled={disabled}
                key={String(disabled)}
              />
            );
          })}
        </div>
      );
    }

    // loop through all PSEUDO_STATES + create headers for DISABLED_OPTIONS, PSEUDO_STATES
    function ButtonIconDisabledOption({
      sdsType,
      sdsSize,
      on,
      disabled,
    }: {
      sdsType: SDSTypes[number];
      sdsSize: SDSSizes[number];
      on: (typeof ON_OPTIONS)[number];
      disabled: (typeof DISABLED_OPTIONS)[number];
    }) {
      const SDS_ICONS = {
        primary: {
          large: "grid",
          small: "barChartVertical3",
        },
        secondary: {
          large: "infoSpeechBubble",
          small: "plusCircle",
        },
        tertiary: {
          large: "xMark",
          medium: "xMark",
          small: "xMark",
        },
      };

      return (
        <div style={penultimateLevel}>
          {PSEUDO_STATES.map((state) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: invalid `sdsIcon` is skipped in <ButtonIconTypeOption />
            const sdsIcon = SDS_ICONS[sdsType][sdsSize];

            return (
              <div style={bottomLevel}>
                {(disabled === false ||
                  (disabled === true && state === "default")) && (
                  <>
                    <h6 style={bottomLabel}>
                      {disabled === false ? "State: " : "Disabled: "}
                      <br />
                      <b>{disabled === false ? state : "true"}</b>
                    </h6>
                    <RawButtonIcon
                      {...props}
                      aria-label={sdsIcon}
                      sdsIcon={sdsIcon}
                      data-testid="button-icon"
                      sdsType={sdsType}
                      sdsSize={sdsSize}
                      on={on}
                      disabled={disabled}
                      className={`pseudo-${state}`}
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
  }, // close render
}; // close LivePreview

// Test

export const Test = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (): JSX.Element => {
    return (
      <RawButtonIcon
        aria-label="dotsHorizontal"
        data-testid="iconButton"
        on
        sdsIcon="dotsHorizontal"
        sdsSize="medium"
        sdsType="primary"
      />
    );
  },
};
