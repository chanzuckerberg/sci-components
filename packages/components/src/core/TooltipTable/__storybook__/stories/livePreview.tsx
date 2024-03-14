import { Args } from "@storybook/react";
import {
  TOOLTIP_TABLE_DATA,
  TOOLTIP_TABLE_LIVE_PREVIEW_STYLES,
  TOOLTIP_TABLE_TOOLTIP_STYLE_MOCK,
} from "../constants";
import Tooltip from "src/core/Tooltip";
import RawTooltipTableContent from "src/core/TooltipTable";
import { InfoOutlined } from "@mui/icons-material";

export const LivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={TOOLTIP_TABLE_LIVE_PREVIEW_STYLES as React.CSSProperties}>
      <div style={TOOLTIP_TABLE_TOOLTIP_STYLE_MOCK as React.CSSProperties}>
        <Tooltip
          followCursor
          placement="right-end"
          title={
            <RawTooltipTableContent {...props} data={[TOOLTIP_TABLE_DATA[0]]} />
          }
        >
          <InfoOutlined color="primary" fontSize="small" />
        </Tooltip>
      </div>

      <div style={TOOLTIP_TABLE_TOOLTIP_STYLE_MOCK as React.CSSProperties}>
        <Tooltip
          followCursor
          placement="right-end"
          title={
            <RawTooltipTableContent
              {...props}
              data={[TOOLTIP_TABLE_DATA[0], TOOLTIP_TABLE_DATA[1]]}
            />
          }
        >
          <InfoOutlined color="primary" fontSize="small" />
        </Tooltip>
      </div>

      <div style={TOOLTIP_TABLE_TOOLTIP_STYLE_MOCK as React.CSSProperties}>
        <Tooltip
          followCursor
          placement="right-end"
          title={
            <RawTooltipTableContent {...props} data={TOOLTIP_TABLE_DATA} />
          }
        >
          <InfoOutlined color="primary" fontSize="small" />
        </Tooltip>
      </div>
    </div>
  );
};
