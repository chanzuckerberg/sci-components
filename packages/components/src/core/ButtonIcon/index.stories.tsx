import { Args, Meta } from "@storybook/react";
import React from "react";
import { defaultAppTheme } from "../styles";
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

const LivePreviewDemo = (): JSX.Element => {
  const spacings = defaultAppTheme?.spacing;

  const livePreviewStyles: React.CSSProperties = {
    alignItems: "center",
    display: "grid",
    gridColumnGap: "24px",
    gridTemplateColumns: "repeat(7, min-content)",
  };

  return (
    <div style={livePreviewStyles}>
      <div style={{ display: "flex" }}>
        <ButtonIcon
          aria-label="grid"
          style={{ marginRight: spacings?.xxs }}
          sdsIcon="grid"
          sdsSize="large"
          sdsType="primary"
        />
        <ButtonIcon
          aria-label="grid"
          style={{ marginRight: spacings?.xxs }}
          sdsIcon="grid"
          sdsSize="large"
          sdsType="primary"
        />
      </div>
      <div style={{ display: "flex" }}>
        <ButtonIcon
          aria-label="infoSpeechBubble"
          style={{ marginRight: spacings?.m }}
          sdsIcon="infoSpeechBubble"
          sdsSize="large"
          sdsType="secondary"
        />
        <ButtonIcon
          aria-label="infoSpeechBubble"
          style={{ marginRight: spacings?.m }}
          sdsIcon="infoSpeechBubble"
          sdsSize="large"
          sdsType="secondary"
        />
      </div>
      <div>
        <ButtonIcon
          aria-label="xMark"
          style={{ marginRight: spacings?.m }}
          sdsIcon="xMark"
          sdsSize="large"
          sdsType="tertiary"
        />
      </div>
      <div>
        <ButtonIcon
          aria-label="xMark"
          style={{ marginRight: spacings?.m }}
          sdsIcon="xMark"
          sdsSize="medium"
          sdsType="tertiary"
        />
      </div>
      <div style={{ display: "flex" }}>
        <ButtonIcon
          aria-label="barChartVertical3"
          style={{ marginRight: spacings?.s }}
          sdsIcon="barChartVertical3"
          sdsSize="small"
          sdsType="primary"
        />
        <ButtonIcon
          aria-label="barChartVertical3"
          style={{ marginRight: spacings?.s }}
          sdsIcon="barChartVertical3"
          sdsSize="small"
          sdsType="primary"
        />
      </div>
      <div style={{ display: "flex" }}>
        <ButtonIcon
          aria-label="plusCircle"
          style={{ marginRight: spacings?.s }}
          sdsIcon="plusCircle"
          sdsSize="small"
          sdsType="secondary"
        />
        <ButtonIcon
          aria-label="plusCircle"
          style={{ marginRight: spacings?.s }}
          sdsIcon="plusCircle"
          sdsSize="small"
          sdsType="secondary"
        />
      </div>
      <div>
        <ButtonIcon
          aria-label="xMark"
          style={{ marginRight: spacings?.s }}
          sdsIcon="xMark"
          sdsSize="small"
          sdsType="tertiary"
        />
      </div>
    </div>
  );
};

export const LivePreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Screenshot test

const ScreenshotTestDemo = (): JSX.Element => {
  const DISPLAY_CONTENTS: React.CSSProperties = {
    display: "contents",
  };
  const MID_LABEL: React.CSSProperties = {
    borderStyle: "solid none none none",
    gridColumn: "1 / 6",
    justifySelf: "stretch",
    paddingTop: 10,
  };

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
          Type: <b>{sdsType}</b>
        </p>
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
    const ON_LABEL_NEEDED =
      (sdsType === "primary" && sdsSize === "large") ||
      (sdsType === "secondary" && sdsSize === "small");
    const LABEL_STYLE: React.CSSProperties = {
      ...MID_LABEL,
      borderWidth: "2px",
      fontSize: "1.17em",
      margin: "20px 0",
    };

    return (
      <div style={DISPLAY_CONTENTS}>
        <p style={LABEL_STYLE}>
          Size: <b>{sdsSize}</b>
        </p>
        {ON_OPTIONS.map((on) => {
          return (
            // for the combinations with `on` as a prop, loop through all values for `on`(true, false)
            // for the combinations without `on` as a prop, loop through only once
            (ON_LABEL_NEEDED ||
              ((sdsType === "tertiary" ||
                (sdsType === "primary" && sdsSize === "small") ||
                (sdsType === "secondary" && sdsSize === "large")) &&
                on === false)) && (
              <ButtonIconOnOption
                sdsType={sdsType}
                sdsSize={sdsSize}
                on={on}
                key={String(on)}
                onLabelNeeded={ON_LABEL_NEEDED}
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
    const LABEL_STYLE: React.CSSProperties = {
      ...MID_LABEL,
      alignSelf: "end",
      borderWidth: "1px",
      fontSize: "0.83em",
      fontWeight: "normal",
      margin: "0 0 5px 0",
    };
    return (
      <div style={DISPLAY_CONTENTS}>
        {/* only show the "On: ..." label for combinations that have `on` as a prop */}
        {onLabelNeeded && (
          <p style={LABEL_STYLE}>
            On: <b>{on ? "true" : "false"}</b>
          </p>
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
    const DISABLED_LEVEL: React.CSSProperties = {
      display: "contents",
    };
    const PSEUDO_STATE_LEVEL: React.CSSProperties = {
      marginBottom: 10,
    };
    const PSEUDO_STATE_LABEL: React.CSSProperties = {
      fontSize: "0.67em",
      margin: "10px 0",
    };

    return (
      <div style={DISABLED_LEVEL}>
        {PSEUDO_STATES.map((state) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore: invalid `sdsIcon` is skipped in <ButtonIconTypeOption />
          const sdsIcon = SDS_ICONS[sdsType][sdsSize];

          return (
            <div style={PSEUDO_STATE_LEVEL}>
              {/* remove irrelevant disabled iterations: when combined with all pseudo-states except default, `disabled=false` is impossible */}
              {(disabled === false ||
                (disabled === true && state === "default")) && (
                <>
                  <p style={PSEUDO_STATE_LABEL}>
                    {disabled === false ? "State: " : "Disabled: "}
                    <br />
                    <b>{disabled === false ? state : "true"}</b>
                  </p>
                  <ButtonIcon
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

  // }, // close render
}; // close ScreenshotTest

export const ScreenshotTest = {
  parameters: {
    controls: {
      exclude: ["disabled", "on", "sdsIcon", "sdsSize", "sdsType"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />,
};

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
