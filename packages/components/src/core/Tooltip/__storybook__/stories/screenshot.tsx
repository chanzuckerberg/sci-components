import {
  TOOLTIP_MID_LABEL,
  TOOLTIP_ARROW_OFFSET_OPTIONS,
  TOOLTIP_ARROW_OPTIONS,
  TOOLTIP_DISPLAY_CONTENTS,
  TOOLTIP_SDS_STYLES,
  TOOLTIP_SUBTITLE_OPTIONS,
  TOOLTIP_WIDTH_OPTIONS,
} from "../constants";
import RawTooltip from "src/core/Tooltip";
import Button from "src/core/Button";

export const ScreenshotTestDemo = (): JSX.Element => {
  // loop through all SDS_STYLES
  return (
    <>
      {TOOLTIP_SDS_STYLES.map((sdsStyle) => {
        return <TooltipStyle sdsStyle={sdsStyle} key={sdsStyle} />;
      })}
    </>
  );

  // loop through all ARROW_OPTIONS + create headers for SDS_STYLES
  function TooltipStyle({
    sdsStyle,
  }: {
    sdsStyle: (typeof TOOLTIP_SDS_STYLES)[number];
  }) {
    const LEVEL_STYLE: React.CSSProperties = {
      columnGap: "25px",
      display: "inline-grid",
      fontFamily: "sans-serif",
      marginLeft: "50px",
    };
    const LABEL_STYLE: React.CSSProperties = {
      fontSize: "2em",
      gridColumn: "1 / 3",
      marginBottom: 0,
    };
    return (
      <div style={LEVEL_STYLE}>
        <p style={LABEL_STYLE}>
          Style: <b>{sdsStyle}</b>
        </p>
        {TOOLTIP_ARROW_OPTIONS.map((arrow) => {
          return (
            <TooltipArrow
              sdsStyle={sdsStyle}
              arrow={arrow}
              key={String(arrow)}
            />
          );
        })}
      </div>
    );
  }

  // loop through all ARROW_OFFSET_OPTIONS + create headers for ARROW_OPTIONS
  function TooltipArrow({
    sdsStyle,
    arrow,
  }: {
    sdsStyle: (typeof TOOLTIP_SDS_STYLES)[number];
    arrow: (typeof TOOLTIP_ARROW_OPTIONS)[number];
  }) {
    const LABEL_STYLE: React.CSSProperties = {
      ...TOOLTIP_MID_LABEL,
      borderWidth: "5px",
      fontSize: "1.5em",
      margin: "20px 0 0 0",
    };
    return (
      <div style={TOOLTIP_DISPLAY_CONTENTS}>
        <p style={LABEL_STYLE}>
          Arrow: <b>{arrow ? "true" : "false"}</b>
        </p>
        {TOOLTIP_ARROW_OFFSET_OPTIONS.map((arrowOffset) => {
          return (
            // arrowOffset is a dependency of arrow, so should only render if arrow is true
            ((arrow === true && arrowOffset !== undefined) ||
              (arrow === false && arrowOffset === undefined)) && (
              <TooltipArrowOffset
                sdsStyle={sdsStyle}
                arrow={arrow}
                arrowOffset={arrowOffset}
                key={String(arrowOffset)}
              />
            )
          );
        })}
      </div>
    );
  }

  // loop through all SUBTITLE_OPTIONS + create headers for ARROW_OFFSET_OPTIONS
  function TooltipArrowOffset({
    sdsStyle,
    arrow,
    arrowOffset,
  }: {
    sdsStyle: (typeof TOOLTIP_SDS_STYLES)[number];
    arrow: (typeof TOOLTIP_ARROW_OPTIONS)[number];
    arrowOffset: (typeof TOOLTIP_ARROW_OFFSET_OPTIONS)[number];
  }) {
    const LABEL_STYLE: React.CSSProperties = {
      ...TOOLTIP_MID_LABEL,
      borderWidth: "2px",
      fontSize: "1.17em",
      margin: "20px 0",
    };
    return (
      <div style={TOOLTIP_DISPLAY_CONTENTS}>
        {/* arrowOffset is a dependency of arrow, so should only render if arrow is true */}
        {arrow === true && (
          <p style={LABEL_STYLE}>
            Arrow offset: <b>{arrowOffset}</b>
          </p>
        )}
        {TOOLTIP_SUBTITLE_OPTIONS.map((subtitle) => {
          return (
            // subtitle is only allowed for dark style
            (sdsStyle === "dark" ||
              (sdsStyle === "light" && subtitle === undefined)) && (
              <TooltipSubtitle
                sdsStyle={sdsStyle}
                arrow={arrow}
                arrowOffset={arrowOffset}
                subtitle={subtitle}
                key={String(subtitle)}
              />
            )
          );
        })}
      </div>
    );
  }

  // loop through all WIDTH_OPTIONS + create headers for SUBTITLE_OPTIONS, WIDTH_OPTIONS
  function TooltipSubtitle({
    sdsStyle,
    arrow,
    arrowOffset,
    subtitle,
  }: {
    sdsStyle: (typeof TOOLTIP_SDS_STYLES)[number];
    arrow: (typeof TOOLTIP_ARROW_OPTIONS)[number];
    arrowOffset: (typeof TOOLTIP_ARROW_OFFSET_OPTIONS)[number];
    subtitle: (typeof TOOLTIP_SUBTITLE_OPTIONS)[number];
  }) {
    const WIDTH_LEVEL: React.CSSProperties = {
      display: "contents",
    };
    const LABEL_STYLE: React.CSSProperties = {
      fontSize: "0.67em",
      margin: "10px 0",
    };
    const DEFAULT_WIDTH_STYLE: React.CSSProperties = {
      margin: "0 125px 100px",
    };
    const WIDE_WIDTH_STYLE: React.CSSProperties = {
      margin: "0 275px 100px",
    };
    return (
      // assign specific styles to light-style Tooltip only, since it's the only one that has width options and needs special style-accommodations
      <div style={sdsStyle === "light" ? WIDTH_LEVEL : undefined}>
        {/* Show "Subtitle" label for dark-style Tooltip only */}
        {sdsStyle === "dark" && (
          <p style={LABEL_STYLE}>
            Subtitle: <b>{subtitle ? "yes" : "no"}</b>
          </p>
        )}
        {TOOLTIP_WIDTH_OPTIONS.map((width) => {
          return (
            // exclude "wide" width option for dark-style Tooltip
            (sdsStyle === "light" ||
              (sdsStyle === "dark" && width === "default")) && (
              <div key={String(sdsStyle) + String(width)}>
                <>
                  {/* Show "Width" label for light-style Tooltip only */}
                  {sdsStyle === "light" && (
                    <p style={LABEL_STYLE}>
                      Width: <b>{width}</b>
                    </p>
                  )}
                  <RawTooltip
                    // assign special styles depending on width option
                    style={
                      width === "default"
                        ? DEFAULT_WIDTH_STYLE
                        : WIDE_WIDTH_STYLE
                    }
                    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut et labore dolore"
                    sdsStyle={sdsStyle}
                    subtitle={subtitle}
                    arrow={arrow}
                    arrowOffset={arrowOffset}
                    width={width}
                    key={String(width)}
                    open
                  >
                    <Button
                      aria-label="tooltip test button"
                      sdsStyle="icon"
                      sdsSize="medium"
                      icon="ExclamationMarkCircle"
                      sdsType="tertiary"
                      tabIndex={0}
                    ></Button>
                  </RawTooltip>
                </>
              </div>
            )
          );
        })}
      </div>
    );
  }
};
