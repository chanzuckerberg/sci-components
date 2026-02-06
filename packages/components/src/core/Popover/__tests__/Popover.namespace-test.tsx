import { Popover, PopoverProps } from "@czi-sds/components";
import React from "react";

const PopoverNameSpaceTest = (props: PopoverProps) => {
  return (
    <Popover {...props}>
      <div>Popover content</div>
    </Popover>
  );
};
