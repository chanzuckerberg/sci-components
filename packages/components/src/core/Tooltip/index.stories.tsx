import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Args, Meta } from "@storybook/react";
import React from "react";
import Button from "../Button";
import ButtonIcon from "../ButtonIcon";
import RawTooltip from "./index";
import { TooltipExtraProps } from "./style";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const Tooltip = (props: Args): JSX.Element => {
  const { title } = props;
  return (
    <div>
      Hover over the info icon to view the tooltip.
      <p>
        ArrowOffset changes the position of the tooltip arrow and can be any
        numeric value within [-120, 120]. Any value value over the width of the
        tooltip will remove the arrow from the tooltip.
      </p>
      <div
        style={{
          margin: "135px 300px",
        }}
      >
        <RawTooltip title={title} {...props}>
          <InfoOutlinedIcon />
        </RawTooltip>
      </div>
    </div>
  );
};

export default {
  argTypes: {
    arrow: {
      control: { type: "boolean" },
    },
    arrowOffset: {
      control: { type: "number" },
    },
    placement: {
      control: { type: "select" },
      options: [
        "bottom-start",
        "bottom",
        "bottom-end",
        "left-start",
        "left",
        "left-end",
        "right-start",
        "right",
        "right-end",
        "top-start",
        "top",
        "top-end",
      ],
    },
    sdsStyle: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
    title: {
      control: { type: "text" },
    },
    width: {
      control: { type: "radio" },
      options: ["default", "wide"],
    },
  },
  component: Tooltip,
  parameters: {
    badges: [BADGE.STABLE],
    // delay allows for font to load and prevents chromatic from constantly creating new baselines
    chromatic: { delay: 5000 },
  },
  title: "Components/Tooltip",
} as Meta;

// Default

export const Default = {
  args: {
    arrow: true,
    placement: "top",
    sdsStyle: "dark",
    subtitle: "dolor sit amet",
    title: "Lorem ipsum",
    width: "default",
  },
};

// Live Preview

const LivePreviewDemo = (): JSX.Element => {
  const livePreviewStyles = {
    alignSelf: "self-start",
    display: "grid",
    gridColumnGap: "80px",
    gridTemplateColumns: "repeat(3, 130px)",
    paddingTop: "80px",
  };

  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <RawTooltip
        title="Label lorem"
        sdsStyle="dark"
        placement="top"
        arrow
        open
      >
        <ButtonIcon
          sdsType="secondary"
          sdsSize="large"
          icon="infoSpeechBubble"
        />
      </RawTooltip>
      <RawTooltip
        title="Label lorem ipsum tellus ac cursus commodo, tortor mauris."
        sdsStyle="light"
        placement="top"
        arrow
        open
      >
        <Button sdsType="primary" sdsStyle="rounded">
          Label
        </Button>
      </RawTooltip>
    </div>
  );
};

export const LivePreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: () => <LivePreviewDemo />,
};

// Placement Demo

const PlacementDemo = (): JSX.Element => {
  const placementStyles = {
    display: "grid",
    gridColumnGap: "50px",
    gridRowGap: "50px",
    gridTemplateColumns: "repeat(3, 130px",
    gridTemplateRows: "repeat(5, 60px)",
    justifyContent: "center",
    padding: "100px",
  };

  return (
    <div style={placementStyles as React.CSSProperties}>
      <RawTooltip title="Text" placement="top-start" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          top-start
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="top" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          top
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="top-end" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          top-end
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="left-start" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          left-start
        </Button>
      </RawTooltip>
      <div />
      <RawTooltip title="Text" placement="right-start" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          right-start
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="left" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          left
        </Button>
      </RawTooltip>
      <div />
      <RawTooltip title="Text" placement="right" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          right
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="left-end" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          left-end
        </Button>
      </RawTooltip>
      <div />
      <RawTooltip title="Text" placement="right-end" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          right-end
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="bottom-start" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          bottom-start
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="bottom" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          bottom
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="bottom-end" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          bottom-end
        </Button>
      </RawTooltip>
    </div>
  );
};

export const PlacementPreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: () => <PlacementDemo />,
};

// Screenshot Test

const ScreenshotTestDemo = (): JSX.Element => {
  const SDS_STYLES = ["light", "dark"];
  const SUBTITLE_OPTIONS = ["Lorem ipsum dolor sit amet", undefined];
  const ARROW_OPTIONS = [false, true];
  const ARROW_OFFSET_OPTIONS = [undefined, -120, -60, 0, 60, 120];
  const WIDTH_OPTIONS: TooltipExtraProps["width"][] = ["default", "wide"];

  const DISPLAY_CONTENTS: React.CSSProperties = {
    display: "contents",
  };
  const MID_LABEL: React.CSSProperties = {
    borderStyle: "solid none none none",
    gridColumn: "1 / 3",
    justifySelf: "stretch",
    paddingTop: 10,
  };

  // loop through all SDS_STYLES
  return (
    <>
      {SDS_STYLES.map((sdsStyle) => {
        return <TooltipStyle sdsStyle={sdsStyle} key={sdsStyle} />;
      })}
    </>
  );

  // loop through all ARROW_OPTIONS + create headers for SDS_STYLES
  function TooltipStyle({
    sdsStyle,
  }: {
    sdsStyle: (typeof SDS_STYLES)[number];
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
        {ARROW_OPTIONS.map((arrow) => {
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
    sdsStyle: (typeof SDS_STYLES)[number];
    arrow: (typeof ARROW_OPTIONS)[number];
  }) {
    const LABEL_STYLE: React.CSSProperties = {
      ...MID_LABEL,
      borderWidth: "5px",
      fontSize: "1.5em",
      margin: "20px 0 0 0",
    };
    return (
      <div style={DISPLAY_CONTENTS}>
        <p style={LABEL_STYLE}>
          Arrow: <b>{arrow ? "true" : "false"}</b>
        </p>
        {ARROW_OFFSET_OPTIONS.map((arrowOffset) => {
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
    sdsStyle: (typeof SDS_STYLES)[number];
    arrow: (typeof ARROW_OPTIONS)[number];
    arrowOffset: (typeof ARROW_OFFSET_OPTIONS)[number];
  }) {
    const LABEL_STYLE: React.CSSProperties = {
      ...MID_LABEL,
      borderWidth: "2px",
      fontSize: "1.17em",
      margin: "20px 0",
    };
    return (
      <div style={DISPLAY_CONTENTS}>
        {/* arrowOffset is a dependency of arrow, so should only render if arrow is true */}
        {arrow === true && (
          <p style={LABEL_STYLE}>
            Arrow offset: <b>{arrowOffset}</b>
          </p>
        )}
        {SUBTITLE_OPTIONS.map((subtitle) => {
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
    sdsStyle: (typeof SDS_STYLES)[number];
    arrow: (typeof ARROW_OPTIONS)[number];
    arrowOffset: (typeof ARROW_OFFSET_OPTIONS)[number];
    subtitle: (typeof SUBTITLE_OPTIONS)[number];
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
        {WIDTH_OPTIONS.map((width) => {
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
                    <InfoOutlinedIcon />
                  </RawTooltip>
                </>
              </div>
            )
          );
        })}
      </div>
    );
  }
}; // close ScreenshotTestDemo

export const ScreenshotTest = {
  parameters: {
    controls: {
      exclude: [
        "arrow",
        "arrowOffset",
        "placement",
        "sdsStyle",
        "title",
        "width",
      ],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />,
};

// Test

const TestDemo = (props: Args): JSX.Element => {
  const { title, ...rest } = props;
  return (
    <RawTooltip title={title} {...rest} data-testid="tooltip">
      <div>I am a tooltip child element</div>
    </RawTooltip>
  );
};

export const Test = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => (
    <TestDemo title="test" {...args} data-testid="tooltip" />
  ),
};
