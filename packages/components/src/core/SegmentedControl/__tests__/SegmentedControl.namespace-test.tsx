import { SegmentedControl, SegmentedControlProps } from "@czi-sds/components";
import React from "react";

const SegmentedControlNameSpaceTest = (props: SegmentedControlProps) => {
  return (
    <SegmentedControl
      buttonDefinition={[
        { icon: "List", tooltipText: "List A", value: "A" },
        { icon: "List", tooltipText: "List B", value: "B" },
        { icon: "Table", tooltipText: "Table", value: "C" },
        { icon: "People", tooltipText: "People", value: "D" },
      ]}
    />
  );
};
