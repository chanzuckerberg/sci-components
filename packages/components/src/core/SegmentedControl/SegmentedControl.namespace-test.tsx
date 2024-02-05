import { SegmentedControl, SegmentedControlProps } from "@czi-sds/components";
import React from "react";

const SegmentedControlNameSpaceTest = (props: SegmentedControlProps) => {
  return (
    <SegmentedControl
      buttonDefinition={[
        { icon: "list", tooltipText: "List A" },
        { icon: "list", tooltipText: "List B" },
        { icon: "table", tooltipText: "Table" },
        { icon: "people", tooltipText: "People" },
      ]}
    />
  );
};
