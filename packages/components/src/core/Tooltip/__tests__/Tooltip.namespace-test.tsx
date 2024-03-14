import { Tooltip, TooltipProps } from "@czi-sds/components";
import React from "react";

const TooltipNameSpaceTest = (props: TooltipProps) => {
  return (
    <Tooltip
      title="Label lorem ipsum tellus ac cursus commodo, tortor mauris."
      subtitle="Subtitle"
      width="wide"
      sdsStyle="light"
      placement="top"
      arrow
      open
    >
      <p>Label</p>
    </Tooltip>
  );
};
