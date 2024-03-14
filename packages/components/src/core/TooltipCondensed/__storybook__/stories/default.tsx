import { InfoOutlined } from "@mui/icons-material";
import { Args } from "@storybook/react";
import RawTooltipCondensed from "src/core/TooltipCondensed";

export const TooltipCondensed = (props: Args): JSX.Element => {
  const { title, indicator } = props;
  return (
    <div>
      Hover over the info icon to view the tooltip.
      <div
        style={{
          margin: "135px 300px",
        }}
      >
        <RawTooltipCondensed indicator={indicator} title={title} {...props}>
          <InfoOutlined data-testid="tooltip-hover" />
        </RawTooltipCondensed>
      </div>
    </div>
  );
};
