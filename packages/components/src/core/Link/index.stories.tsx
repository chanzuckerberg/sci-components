import { Args, Meta } from "@storybook/react";
import React from "react";
import RawLink, { LinkProps } from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const Link = (props: LinkProps): JSX.Element => {
  const { sdsStyle } = props;
  return (
    <RawLink href="/" sdsStyle={sdsStyle} {...props}>
      Test Link
    </RawLink>
  );
};

export default {
  argTypes: {
    fontWeight: {
      control: {
        type: "radio",
      },
      options: ["normal", "bold"],
    },
    sdsSize: {
      control: { type: "select" },
      options: ["s", "xs"],
    },
    sdsStyle: {
      control: { type: "select" },
      options: ["default", "dashed"],
    },
  },
  component: Link,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Link",
} as Meta;

const ExcludedControls = ["sdsSize", "sdsStyle", "fontWeight"];

// Default

export const Default = {
  args: {
    fontWeight: "normal",
    sdsSize: "s",
    sdsStyle: "default",
  },
};

// Live Preview

const livePreviewStyles = {
  display: "grid",
  fontFamily: "Inter",
  gridColumnGap: "24px",
  gridTemplateColumns: "repeat(2, 250px)",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <div>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <RawLink href="/" sdsStyle="default" {...props}>
          Learn More
        </RawLink>
      </div>
      <p style={{ backgroundColor: "#EFF2FC", padding: "10px" }}>
        Lorem ipsum{" "}
        <RawLink href="/" sdsStyle="dashed" {...props}>
          dolor sit apsidy
        </RawLink>{" "}
        consectetur, adipisicing elit.
      </p>
      <p style={{ backgroundColor: "#EFF2FC", padding: "10px" }}>
        Lorem ipsum{" "}
        <RawLink href="/" sdsStyle="dashed" component="button" {...props}>
          button element
        </RawLink>{" "}
        consectetur, adipisicing elit.
      </p>
    </div>
  );
};

export const LivePreview = {
  parameters: {
    controls: {
      exclude: ExcludedControls,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Screenshot test
const ScreenshotTestDemo = (): JSX.Element => {
  const FONT_WEIGHTS = ["normal", "bold"];
  const SDS_SIZES = ["xs", "s"];
  const SDS_STYLES = ["default", "dashed"];
  const PSEUDO_STATES = ["default", "hover", "active", "focus"];

  // loop through all SDS_SIZES
  return (
    <>
      {SDS_SIZES.map((sdsSize) => {
        return <LinkSize sdsSize={sdsSize} key={sdsSize} />;
      })}
    </>
  );

  function LinkSize({ sdsSize }: { sdsSize: (typeof SDS_SIZES)[number] }) {
    const STYLE_LEVEL: React.CSSProperties = {
      fontFamily: "sans-serif",
      marginRight: 50,
    };
    const STYLE_LABEL: React.CSSProperties = {
      borderWidth: 2,
      fontSize: "2em",
      marginBottom: 0,
    };
    return (
      <div style={STYLE_LEVEL}>
        <p style={STYLE_LABEL}>
          Size: <b>{sdsSize}</b>
        </p>
        {FONT_WEIGHTS.map((fontWeight) => {
          return (
            <LinkWeight
              fontWeight={fontWeight}
              key={fontWeight}
              sdsSize={sdsSize}
            />
          );
        })}
      </div>
    );
  }

  function LinkWeight({
    fontWeight,
    sdsSize,
  }: {
    fontWeight: (typeof FONT_WEIGHTS)[number];
    sdsSize: (typeof SDS_SIZES)[number];
  }) {
    const STYLE_LEVEL: React.CSSProperties = {
      width: "fit-content",
    };
    const STYLE_LABEL: React.CSSProperties = {
      borderStyle: "solid none none none",
      borderWidth: 2,
      fontSize: "1.17em",
      margin: "20px 0 5px 0",
      paddingTop: "10px",
    };
    return (
      <div style={STYLE_LEVEL}>
        <p style={STYLE_LABEL}>
          Font Weight: <b>{fontWeight}</b>
        </p>
        {SDS_STYLES.map((sdsStyle) => {
          return (
            <LinkStyle
              sdsStyle={sdsStyle}
              sdsSize={sdsSize}
              fontWeight={fontWeight}
              key={sdsStyle}
            />
          );
        })}
      </div>
    );
  }

  // loop through all PSEUDO_STATES + create headers for SDS_STYLES, PSEUDO_STATES
  function LinkStyle({
    fontWeight,
    sdsStyle,
    sdsSize,
  }: {
    fontWeight: (typeof FONT_WEIGHTS)[number];
    sdsStyle: (typeof SDS_STYLES)[number];
    sdsSize: (typeof SDS_SIZES)[number];
  }) {
    const STYLE_LEVEL: React.CSSProperties = {
      columnGap: "20px",
      display: "grid",
      width: "fit-content",
    };
    const STYLE_LABEL: React.CSSProperties = {
      borderStyle: "solid none none none",
      borderWidth: 1,
      fontSize: "0.83em",
      gridColumn: "1 / 5",
      margin: "10px 0 5px 0",
      paddingTop: "10px",
    };
    const PSEUDO_STATE_LABEL: React.CSSProperties = {
      fontSize: "0.67em",
      marginBottom: 15,
    };
    return (
      <div style={STYLE_LEVEL}>
        <p style={STYLE_LABEL}>
          Style: <b>{sdsStyle}</b>
        </p>
        {PSEUDO_STATES.map((state) => {
          return (
            <div key={`div-${state}`}>
              <p style={PSEUDO_STATE_LABEL}>
                State: <b>{state}</b>
              </p>
              <RawLink
                href="/"
                sdsStyle={sdsStyle}
                sdsSize={sdsSize}
                fontWeight={fontWeight}
                className={`pseudo-${state}`}
                key={state}
              >
                Link
              </RawLink>
            </div>
          );
        })}
      </div>
    );
  }
};

export const ScreenshotTest = {
  parameters: {
    controls: {
      exclude: ExcludedControls,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />,
};
