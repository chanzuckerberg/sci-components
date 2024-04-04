import { InfoOutlined } from "@mui/icons-material";
import { Args } from "@storybook/react";
import RawTooltipCondensed from "src/core/TooltipCondensed";
import { TOOLTIP_CONDENSED_LIVE_PREVIEW_STYLES } from "../constants";

export function LivePreviewDemo(props: Args): JSX.Element {
  return (
    <div style={TOOLTIP_CONDENSED_LIVE_PREVIEW_STYLES as React.CSSProperties}>
      <RawTooltipCondensed title="Label" {...props}>
        <InfoOutlined />
      </RawTooltipCondensed>
      <RawTooltipCondensed
        indicator
        indicatorColor="#223F9C"
        title="Label"
        {...props}
      >
        <InfoOutlined />
      </RawTooltipCondensed>
    </div>
  );
}
