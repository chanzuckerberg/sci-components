import { Args } from "@storybook/react";
import RawButton from "src/core/Button";
import {
  BUTTON_DISABLED_OPTIONS,
  BUTTON_ICON_OPTIONS_2,
  BUTTON_PSEUDO_STATES,
  BUTTON_SDS_STYLES,
  BUTTON_SDS_TYPES,
  BUTTON_TEXT,
} from "../constants";

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

  // loop through all BUTTON_SDS_STYLES
  return (
    <>
      {BUTTON_SDS_STYLES.map((sdsStyle) => {
        return <ButtonStyleOption sdsStyle={sdsStyle} key={sdsStyle} />;
      })}
    </>
  );

  // loop through all BUTTON_SDS_TYPES + create headers for BUTTON_SDS_STYLES
  function ButtonStyleOption({
    sdsStyle,
  }: {
    sdsStyle: (typeof BUTTON_SDS_STYLES)[number];
  }) {
    return (
      <div style={topLevel}>
        <h3 style={topLabel}>
          Style: <b>{sdsStyle}</b>
        </h3>
        {BUTTON_SDS_TYPES.map((type) => {
          return (
            <ButtonTypeOption sdsStyle={sdsStyle} type={type} key={type} />
          );
        })}
      </div>
    );
  }

  // loop through all BUTTON_ICON_OPTIONS_2 + create headers for BUTTON_SDS_TYPES
  function ButtonTypeOption({
    sdsStyle,
    type,
  }: {
    sdsStyle: (typeof BUTTON_SDS_STYLES)[number];
    type: (typeof BUTTON_SDS_TYPES)[number];
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
            icon={BUTTON_ICON_OPTIONS_2[0]}
            key={String(BUTTON_ICON_OPTIONS_2[0])}
          />
        ) : (
          BUTTON_ICON_OPTIONS_2.map((icon) => {
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

  // loop through all BUTTON_DISABLED_OPTIONS + create headers for BUTTON_ICON_OPTIONS_2
  function ButtonIconOption({
    sdsStyle,
    type,
    icon,
  }: {
    sdsStyle: (typeof BUTTON_SDS_STYLES)[number];
    type: (typeof BUTTON_SDS_TYPES)[number];
    icon: (typeof BUTTON_ICON_OPTIONS_2)[number];
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
    sdsStyle: (typeof BUTTON_SDS_STYLES)[number];
    type: (typeof BUTTON_SDS_TYPES)[number];
    icon: (typeof BUTTON_ICON_OPTIONS_2)[number];
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
                    sdsStyle={sdsStyle}
                    sdsType={type}
                    startIcon={icon}
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
};
