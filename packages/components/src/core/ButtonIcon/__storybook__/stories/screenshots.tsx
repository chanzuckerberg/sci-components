import {
  BUTTON_ICON_DISABLED_OPTIONS,
  BUTTON_ICON_ON_OPTIONS,
  BUTTON_ICON_PSEUDO_STATES,
  BUTTON_ICON_SDS_SIZES,
  BUTTON_ICON_SDS_TYPES,
} from "../constants";
import { SDSSizes, SDSTypes } from "../types";
import { ButtonIcon } from "./default";

export const ScreenshotTestDemo = (): JSX.Element => {
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
      {BUTTON_ICON_SDS_TYPES.map((sdsType) => {
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
        {BUTTON_ICON_SDS_SIZES.map((sdsSize) => {
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
        {BUTTON_ICON_ON_OPTIONS.map((on) => {
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
    on: (typeof BUTTON_ICON_ON_OPTIONS)[number];
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
        {BUTTON_ICON_DISABLED_OPTIONS.map((disabled) => {
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
    on: (typeof BUTTON_ICON_ON_OPTIONS)[number];
    disabled: (typeof BUTTON_ICON_DISABLED_OPTIONS)[number];
  }) {
    const SDS_ICONS = {
      primary: {
        large: "Grid",
        small: "BarChartVertical3",
      },
      secondary: {
        large: "InfoSpeechBubble",
        small: "PlusCircle",
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
                  <ButtonIcon
                    aria-label={icon}
                    icon={icon}
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
};
