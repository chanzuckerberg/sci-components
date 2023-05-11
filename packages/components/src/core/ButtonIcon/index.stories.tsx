import { Args, Meta } from "@storybook/react";
import React from "react";
import RawButtonIcon from "./index";

const SDS_TYPES = ["primary", "secondary", "tertiary"];
const SDS_SIZES = ["large", "medium", "small"];
const ON_OPTIONS = [false, true];
const DISABLED_OPTIONS = [false, true];
// const PSEUDO_STATES = ["default", "hover", "active", "focus-visible"];
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

const topLevel = {
  columnGap: "20px",
  display: "inline-grid",
  fontFamily: "sans-serif",
  marginRight: "50px",
};
const displayContents = {
  display: "contents",
};
const penultimateLevel = {
  display: "contents",
};
const bottomLevel = {
  marginBottom: 10,
};
const fontWeightNormal = {
  fontWeight: "normal",
};
const topLabel = {
  ...fontWeightNormal,
  fontSize: "2em",
  gridColumn: "2 / 6",
  marginBottom: 0,
};
const midLabel = {
  ...fontWeightNormal,
  borderStyle: "solid none none none",
  gridColumn: "2 / 6",
  justifySelf: "stretch",
  paddingTop: 10,
};

const secondLabel = {
  ...midLabel,
  borderWidth: "2px",
  fontSize: "1.17em",
  margin: "20px 0",
};
const thirdLabel = {
  ...midLabel,
  alignSelf: "end",
  borderWidth: "1px",
  fontWeight: "normal",
  margin: "0 0 5px 0",
};
const penultimateLabel = {
  ...fontWeightNormal,
  alignSelf: "end",
  gridColumn: "1 / 2",
  marginTop: 0,
};
const bottomLabel = {
  ...fontWeightNormal,
  margin: "10px 0",
};

export const LivePreview = {
  parameters: {
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
    function ButtonIconTypeOption({ sdsType }) {
      return (
        <div style={topLevel}>
          <h3 style={topLabel}>
            Type: <b>{sdsType}</b>
          </h3>
          {SDS_SIZES.map((sdsSize) => {
            return (
              (((sdsType === "primary" || sdsType === "secondary") &&
                sdsSize !== "medium") ||
                sdsType === "tertiary") && (
                <ButtonIconSizeOption
                  sdsType={sdsType}
                  sdsSize={sdsSize}
                  key={sdsSize}
                />
              )
            );
          })}
        </div>
      );
    }

    // loop through all ON_OPTIONS + create headers for SDS_SIZES
    function ButtonIconSizeOption({ sdsType, sdsSize }) {
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
              // ((sdsType === "primary" || (sdsType === "secondary" && sdsSize === "small")) || (((sdsType === "tertiary") || (sdsType === "secondary" && sdsSize === "large")) && on === true)) &&
              (onLabelNeeded ||
                ((sdsType === "tertiary" ||
                  (sdsType === "secondary" && sdsSize === "large")) &&
                  on === true)) && (
                <ButtonIconOnOption
                  sdsType={sdsType}
                  sdsSize={sdsSize}
                  on={on}
                  key={on}
                  onLabelNeeded={onLabelNeeded}
                />
              )
            );
          })}
        </div>
      );
    }

    // loop through all DISABLED_OPTIONS + create headers for ON_OPTIONS
    function ButtonIconOnOption({ sdsType, sdsSize, on, onLabelNeeded }) {
      return (
        <div style={displayContents}>
          {/* {(sdsType === "primary" || (sdsType === "secondary" && sdsSize === "small")) && */}
          {onLabelNeeded && (
            <h5 style={thirdLabel}>
              On: <b>{on ? "true" : "false"}</b>
            </h5>
          )}
          {DISABLED_OPTIONS.map((disabled, disabledIndex) => {
            return (
              <ButtonIconDisabledOption
                sdsType={sdsType}
                sdsSize={sdsSize}
                on={on}
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
    function ButtonIconDisabledOption({
      sdsType,
      sdsSize,
      on,
      disabled,
      disabledIndex,
    }) {
      const iconToShow =
        sdsType === "primary" && sdsSize === "large"
          ? "grid"
          : sdsType === "primary" && sdsSize === "small"
          ? "barChartVertical3"
          : sdsType === "secondary" && sdsSize === "large"
          ? "infoSpeechBubble"
          : sdsType === "secondary" && sdsSize === "small"
          ? "plusCircle"
          : "xMark";

      return (
        <div style={penultimateLevel}>
          <h6 style={penultimateLabel}>
            Disabled: <br />
            <b>{disabled ? "true" : "false"}</b>
          </h6>
          {PSEUDO_STATES.map((state) => {
            return (
              <div style={bottomLevel}>
                {disabledIndex % 2 ? (
                  false
                ) : (
                  <h6 style={bottomLabel}>
                    State: <br />
                    <b>{state}</b>
                  </h6>
                )}
                <RawButtonIcon
                  {...props}
                  aria-label={iconToShow}
                  // sdsIcon="xMark"
                  sdsIcon={iconToShow}
                  data-testid="button-icon"
                  sdsType={sdsType}
                  sdsSize={sdsSize}
                  on={on}
                  disabled={disabled}
                  className={`pseudo-${state}`}
                  key={state}
                />
              </div>
            );
          })}
        </div>
      );
    }
  }, // close render
}; // close LivePreview

// const LivePreviewDemo = (): JSX.Element => {
//   const spacings = defaultAppTheme?.spacing;

//   const livePreviewStyles = {
//     alignItems: "center",
//     display: "grid",
//     gridColumnGap: "24px",
//     gridTemplateColumns: "repeat(7, min-content)",
//   };

//   return (
//     <div style={livePreviewStyles as React.CSSProperties}>
//       <div style={{ display: "flex" }}>
//         <ButtonIcon
//           aria-label="grid"
//           style={{ marginRight: spacings?.xxs }}
//           sdsIcon="grid"
//           sdsSize="large"
//           sdsType="primary"
//         />
//         <ButtonIcon
//           aria-label="grid"
//           style={{ marginRight: spacings?.xxs }}
//           sdsIcon="grid"
//           sdsSize="large"
//           sdsType="primary"
//         />
//       </div>
//       <div style={{ display: "flex" }}>
//         <ButtonIcon
//           aria-label="infoSpeechBubble"
//           style={{ marginRight: spacings?.m }}
//           sdsIcon="infoSpeechBubble"
//           sdsSize="large"
//           sdsType="secondary"
//         />
//         <ButtonIcon
//           aria-label="infoSpeechBubble"
//           style={{ marginRight: spacings?.m }}
//           sdsIcon="infoSpeechBubble"
//           sdsSize="large"
//           sdsType="secondary"
//         />
//       </div>
//       <div>
//         <ButtonIcon
//           aria-label="xMark"
//           style={{ marginRight: spacings?.m }}
//           sdsIcon="xMark"
//           sdsSize="large"
//           sdsType="tertiary"
//         />
//       </div>
//       <div>
//         <ButtonIcon
//           aria-label="xMark"
//           style={{ marginRight: spacings?.m }}
//           sdsIcon="xMark"
//           sdsSize="medium"
//           sdsType="tertiary"
//         />
//       </div>
//       <div style={{ display: "flex" }}>
//         <ButtonIcon
//           aria-label="barChartVertical3"
//           style={{ marginRight: spacings?.s }}
//           sdsIcon="barChartVertical3"
//           sdsSize="small"
//           sdsType="primary"
//         />
//         <ButtonIcon
//           aria-label="barChartVertical3"
//           style={{ marginRight: spacings?.s }}
//           sdsIcon="barChartVertical3"
//           sdsSize="small"
//           sdsType="primary"
//         />
//       </div>
//       <div style={{ display: "flex" }}>
//         <ButtonIcon
//           aria-label="plusCircle"
//           style={{ marginRight: spacings?.s }}
//           sdsIcon="plusCircle"
//           sdsSize="small"
//           sdsType="secondary"
//         />
//         <ButtonIcon
//           aria-label="plusCircle"
//           style={{ marginRight: spacings?.s }}
//           sdsIcon="plusCircle"
//           sdsSize="small"
//           sdsType="secondary"
//         />
//       </div>
//       <div>
//         <ButtonIcon
//           aria-label="xMark"
//           style={{ marginRight: spacings?.s }}
//           sdsIcon="xMark"
//           sdsSize="small"
//           sdsType="tertiary"
//         />
//       </div>
//     </div>
//   );
// };

// export const LivePreview = {
//   parameters: {
//     snapshot: {
//       skip: true,
//     },
//   },
//   render: (args: Args) => <LivePreviewDemo {...args} />,
// };

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
