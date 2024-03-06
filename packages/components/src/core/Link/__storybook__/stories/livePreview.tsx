import { EXTRA_SHORT_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import { LINK_LIVE_PREVIEW_STYLES } from "../constants";
import { Args } from "@storybook/react";
import RawLink from "src/core/Link";
import { useTheme } from "@mui/material";
import { getTypography } from "src/core/styles";

export const LivePreviewDemo = (props: Args): JSX.Element => {
  const theme = useTheme();
  const typography = getTypography({ theme });

  return (
    <div
      style={
        {
          ...LINK_LIVE_PREVIEW_STYLES,
          fontSize: typography?.styles?.body?.regular?.s?.fontSize,
        } as React.CSSProperties
      }
    >
      <div>
        <p>{EXTRA_SHORT_LOREM_IPSUM}</p>
        <RawLink href="/" sdsStyle="default" {...props}>
          Learn More
        </RawLink>
      </div>
      <p style={{ backgroundColor: "#EFF2FC", padding: "10px" }}>
        Lorem ipsum{" "}
        <RawLink href="/" sdsStyle="dashed" sdsSize="s" {...props}>
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
