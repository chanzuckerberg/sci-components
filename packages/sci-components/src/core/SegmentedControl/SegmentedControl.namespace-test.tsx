import { SegmentedControl, SegmentedControlProps } from "czifui";
import React from "react";

const SegmentedControlNameSpaceTest = (props: SegmentedControlProps) => {
  return (
    <SegmentedControl
      buttonDefinition={[
        { iconName: "list", tooltipText: "List A" },
        { iconName: "list", tooltipText: "List B" },
        { iconName: "table", tooltipText: "Table" },
        { iconName: "people", tooltipText: "People" },
      ]}
    />
  );
};
