import {
  TOOLTIP_MID_LABEL,
  TOOLTIP_ARROW_OFFSET_OPTIONS,
  TOOLTIP_ARROW_OPTIONS,
  TOOLTIP_DISPLAY_CONTENTS,
  TOOLTIP_SUBTITLE_OPTIONS,
  TOOLTIP_WIDTH_OPTIONS,
} from "../constants";
import RawTooltip from "@components/src/core/Tooltip";
import Button from "@components/src/core/Button";
import Icon from "@components/src/core/Icon";

export const ScreenshotTestDemo = (): JSX.Element => {
  const LEVEL_STYLE: React.CSSProperties = {
    columnGap: "25px",
    display: "inline-grid",
    fontFamily: "sans-serif",
    marginLeft: "50px",
  };

  // loop through all ARROW_OPTIONS
  return (
    <div style={LEVEL_STYLE}>
      {TOOLTIP_ARROW_OPTIONS.map((arrow) => {
        return <TooltipArrow arrow={arrow} key={String(arrow)} />;
      })}
    </div>
  );

  // loop through all ARROW_OFFSET_OPTIONS + create headers for ARROW_OPTIONS
  function TooltipArrow({
    arrow,
  }: {
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
    arrow,
    arrowOffset,
  }: {
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
            <TooltipSubtitle
              arrow={arrow}
              arrowOffset={arrowOffset}
              subtitle={subtitle}
              key={String(subtitle)}
            />
          );
        })}
      </div>
    );
  }

  // loop through all WIDTH_OPTIONS + create headers for SUBTITLE_OPTIONS, WIDTH_OPTIONS
  function TooltipSubtitle({
    arrow,
    arrowOffset,
    subtitle,
  }: {
    arrow: (typeof TOOLTIP_ARROW_OPTIONS)[number];
    arrowOffset: (typeof TOOLTIP_ARROW_OFFSET_OPTIONS)[number];
    subtitle: (typeof TOOLTIP_SUBTITLE_OPTIONS)[number];
  }) {
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
      <div style={TOOLTIP_DISPLAY_CONTENTS}>
        <p style={LABEL_STYLE}>
          Subtitle: <b>{subtitle ? "yes" : "no"}</b>
        </p>
        {TOOLTIP_WIDTH_OPTIONS.map((width) => {
          return (
            <div key={String(width)}>
              <p style={LABEL_STYLE}>
                Width: <b>{width}</b>
              </p>
              <RawTooltip
                // assign special styles depending on width option
                style={
                  width === "default" ? DEFAULT_WIDTH_STYLE : WIDE_WIDTH_STYLE
                }
                title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut et labore dolore"
                subtitle={subtitle}
                arrow={arrow}
                arrowOffset={arrowOffset}
                width={width}
                open
              >
                <Button
                  aria-label="tooltip test button"
                  sdsStyle="minimal"
                  size="large"
                  sdsType="secondary"
                  tabIndex={0}
                >
                  <Icon sdsIcon="ExclamationMarkCircle" sdsSize="s" />
                </Button>
              </RawTooltip>
            </div>
          );
        })}
      </div>
    );
  }
};
