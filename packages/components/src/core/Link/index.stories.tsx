import { Args, Meta } from "@storybook/react";
import React from "react";
import RawLink, { LinkProps } from "./index";

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
    sdsStyle: {
      control: { type: "select" },
      options: ["default", "dashed"],
    },
  },
  component: Link,
  title: "Link",
} as Meta;

// Default

export const Default = {
  args: {
    sdsStyle: "default",
  },
};

// Live Preview

const livePreviewStyles = {
  display: "grid",
  fontFamily: "Open Sans",
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
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Screenshot test
const ScreenshotTestDemo = (): JSX.Element => {
  const SDS_STYLES = ["default", "dashed"];
  const PSEUDO_STATES = ["default", "hover", "active", "focus"];

  // loop through all SDS_STYLES
  return (
    <>
      {SDS_STYLES.map((sdsStyle) => {
        return <LinkStyle sdsStyle={sdsStyle} key={sdsStyle} />;
      })}
    </>
  );

  // loop through all PSEUDO_STATES + create headers for SDS_STYLES, PSEUDO_STATES
  function LinkStyle({ sdsStyle }: { sdsStyle: (typeof SDS_STYLES)[number] }) {
    const STYLE_LEVEL: React.CSSProperties = {
      columnGap: "20px",
      display: "inline-grid",
      fontFamily: "sans-serif",
      marginRight: 50,
    };
    const STYLE_LABEL: React.CSSProperties = {
      fontSize: "2em",
      gridColumn: "1 / 5",
      marginBottom: 10,
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
                className={`pseudo-${state}`}
                key={state}
              >
                Link text
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
      exclude: ["sdsStyle"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />,
};
