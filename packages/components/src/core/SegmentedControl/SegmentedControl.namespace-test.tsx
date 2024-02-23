import { SegmentedControl, SegmentedControlProps } from "@czi-sds/components";
import React from "react";

const SegmentedControlNameSpaceTest = (props: SegmentedControlProps) => {
  return (
    <SegmentedControl
      buttonDefinition={[
        { icon: "list", tooltipText: "List A", value: "A" },
        { icon: "list", tooltipText: "List B", value: "B" },
        { icon: "table", tooltipText: "Table", value: "C" },
        { icon: "people", tooltipText: "People", value: "D" },
      ]}
    />
  );
};
