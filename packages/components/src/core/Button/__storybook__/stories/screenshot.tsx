import { Args } from "@storybook/react";
import RawButton from "src/core/Button";
import {
  BUTTON_DISABLED_OPTIONS,
  SCREENSHOT_BUTTON_ICON_OPTIONS,
  BUTTON_PSEUDO_STATES,
  SCREENSHOT_BUTTON_SDS_STYLES,
  SCREENSHOT_BUTTON_SDS_TYPES,
  BUTTON_TEXT,
  BUTTON_ICON_DISABLED_OPTIONS,
  BUTTON_ICON_PSEUDO_STATES,
  BUTTON_ICON_SDS_SIZES,
  BUTTON_ICON_SDS_TYPES,
} from "../constants";
import {
  SDSSizes,
  SDSStyles,
  SDSTypes,
} from "src/core/ButtonIcon/__storybook__/types";
import Icon, { IconNameToSizes } from "src/core/Icon";

export const ScreenshotTestDemo = (props: Args): JSX.Element => {
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
  const MID_LABEL: React.CSSProperties = {
    borderStyle: "solid none none none",
    gridColumn: "1 / 6",
    justifySelf: "stretch",
    paddingTop: 10,
  };
  const DISPLAY_CONTENTS: React.CSSProperties = {
    display: "contents",
  };

  // loop through all SCREENSHOT_BUTTON_SDS_STYLES
  return (
    <>
      {SCREENSHOT_BUTTON_SDS_STYLES.map((sdsStyle) => {
        return <ButtonStyleOption sdsStyle={sdsStyle} key={sdsStyle} />;
      })}

      <div>
        {BUTTON_ICON_SDS_TYPES.map((sdsType) => {
          return <ButtonIconTypeOption sdsType={sdsType} key={sdsType} />;
        })}
      </div>
    </>
  );

  // loop through all SCREENSHOT_BUTTON_SDS_TYPES + create headers for SCREENSHOT_BUTTON_SDS_STYLES
  function ButtonStyleOption({
    sdsStyle,
  }: {
    sdsStyle: (typeof SCREENSHOT_BUTTON_SDS_STYLES)[number];
  }) {
    return (
      <div style={topLevel}>
        <h3 style={topLabel}>
          Style: <b>{sdsStyle}</b>
        </h3>
        {SCREENSHOT_BUTTON_SDS_TYPES.map((type) => {
          // (masoudmanson): The minimal style does not have the destructive type.
          if (sdsStyle === "minimal" && type === "destructive") return null;

          return (
            <ButtonTypeOption sdsStyle={sdsStyle} type={type} key={type} />
          );
        })}
      </div>
    );
  }

  // loop through all SCREENSHOT_BUTTON_ICON_OPTIONS + create headers for button types
  function ButtonTypeOption({
    sdsStyle,
    type,
  }: {
    sdsStyle: (typeof SCREENSHOT_BUTTON_SDS_STYLES)[number];
    type: (typeof SCREENSHOT_BUTTON_SDS_TYPES)[number];
  }) {
    return (
      <div style={displayContents}>
        <h4 style={secondLabel}>
          Type: <b>{type}</b>
        </h4>
        {SCREENSHOT_BUTTON_ICON_OPTIONS.map((icon) => {
          return icon !== undefined ? (
            sdsStyle === "minimal" ? (
              <ButtonIconOption
                sdsStyle={sdsStyle}
                type={type}
                icon={
                  <Icon sdsIcon={icon as keyof IconNameToSizes} sdsSize="s" />
                }
                key={String(icon)}
              />
            ) : (
              <ButtonIconOption
                sdsStyle={sdsStyle}
                type={type}
                icon={
                  <Icon sdsIcon={icon as keyof IconNameToSizes} sdsSize="l" />
                }
                key={String(icon)}
              />
            )
          ) : (
            <ButtonIconOption
              sdsStyle={sdsStyle}
              type={type}
              icon={undefined}
              key={String(icon)}
            />
          );
        })}
      </div>
    );
  }

  // loop through all BUTTON_DISABLED_OPTIONS + create headers for BUTTON_ICON_OPTIONS
  function ButtonIconOption({
    sdsStyle,
    type,
    icon,
  }: {
    sdsStyle: (typeof SCREENSHOT_BUTTON_SDS_STYLES)[number];
    type: (typeof SCREENSHOT_BUTTON_SDS_TYPES)[number];
    icon?: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  }) {
    return (
      <div style={displayContents}>
        <h5 style={thirdLabel}>
          Icon: <b>{icon ? "yes" : "no"}</b>
        </h5>
        {BUTTON_DISABLED_OPTIONS.map((disabled) => {
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

  // loop through all BUTTON_PSEUDO_STATES + create headers for BUTTON_DISABLED_OPTIONS, BUTTON_PSEUDO_STATES
  function ButtonDisabledOption({
    sdsStyle,
    type,
    icon,
    disabled,
  }: {
    sdsStyle: (typeof SCREENSHOT_BUTTON_SDS_STYLES)[number];
    type: (typeof SCREENSHOT_BUTTON_SDS_TYPES)[number];
    icon?: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
    disabled: (typeof BUTTON_DISABLED_OPTIONS)[number];
  }) {
    return (
      <div style={penultimateLevel}>
        {BUTTON_PSEUDO_STATES.map((state) => {
          return (
            <div style={bottomLevel} key={state}>
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
                    sdsStyle={sdsStyle as SDSStyles[number]}
                    sdsType={type as SDSTypes[number]}
                    startIcon={icon}
                    icon="Download"
                    disabled={disabled}
                    className={`pseudo-${state}`}
                    key={state}
                  >
                    {BUTTON_TEXT}
                  </RawButton>
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Icon Style

  // loop through all BUTTON_ICON_SDS_SIZES + create headers for SDS_TYPES
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
        {BUTTON_ICON_SDS_SIZES.map((sdsSize) => {
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

  // loop through all BUTTON_ICON_DISABLED_OPTIONS + create headers for SDS_SIZES
  function ButtonIconSizeOption({
    sdsType,
    sdsSize,
  }: {
    sdsType: SDSTypes[number];
    sdsSize: SDSSizes[number];
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
          Size: <b>{sdsSize}</b>
        </p>
        {BUTTON_ICON_DISABLED_OPTIONS.map((disabled) => {
          return (
            <ButtonIconDisabledOption
              sdsType={sdsType}
              sdsSize={sdsSize}
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
    disabled,
  }: {
    sdsType: SDSTypes[number];
    sdsSize: SDSSizes[number];
    disabled: (typeof BUTTON_ICON_DISABLED_OPTIONS)[number];
  }) {
    const SDS_ICONS = {
      primary: {
        large: "Cube",
        medium: "Cube",
        small: "Cube",
      },
      secondary: {
        large: "ExclamationMarkCircle",
        medium: "ExclamationMarkCircle",
        small: "ExclamationMarkCircle",
      },
      tertiary: {
        large: "XMark",
        medium: "XMark",
        small: "XMark",
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
        {BUTTON_ICON_PSEUDO_STATES.map((state) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore: invalid `icon` is skipped in <ButtonIconTypeOption />
          const icon = SDS_ICONS[sdsType][sdsSize];

          return (
            <div style={PSEUDO_STATE_LEVEL} key={`div-${state}`}>
              {/* remove irrelevant disabled iterations: when combined with all pseudo-states except default, `disabled=false` is impossible */}
              {(disabled === false ||
                (disabled === true && state === "default")) && (
                <>
                  <p style={PSEUDO_STATE_LABEL}>
                    {disabled === false ? "State: " : "Disabled: "}
                    <br />
                    <b>{disabled === false ? state : "true"}</b>
                  </p>
                  <RawButton
                    aria-label={icon}
                    icon={icon as keyof IconNameToSizes}
                    data-testid="button-icon"
                    sdsStyle="icon"
                    sdsType={sdsType}
                    sdsSize={sdsSize}
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
};
