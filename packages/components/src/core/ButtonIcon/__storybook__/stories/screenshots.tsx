import { IconNameToSizes } from "src/core/Icon";
import ButtonIcon from "../..";
import {
  BUTTON_ICON_DISABLED_OPTIONS,
  BUTTON_ICON_PSEUDO_STATES,
  BUTTON_ICON_SDS_SIZES,
  BUTTON_ICON_SDS_TYPES,
} from "../constants";
import { SDSSizes, SDSTypes } from "../types";

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
                  <ButtonIcon
                    aria-label={icon}
                    icon={icon as keyof IconNameToSizes}
                    data-testid="button-icon"
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
