import { SegmentedControl, SegmentedControlProps } from "@czi-sds/components";
import { ListBulletsIcon, TableIcon, UsersIcon } from "@phosphor-icons/react";
import React from "react";

const SegmentedControlNameSpaceTest = (props: SegmentedControlProps) => {
  return (
    <SegmentedControl
      buttonDefinition={[
        {
          icon: <ListBulletsIcon weight="bold" />,
          tooltipText: "List A",
          value: "A",
        },
        {
          icon: <ListBulletsIcon weight="bold" />,
          tooltipText: "List B",
          value: "B",
        },
        { icon: <TableIcon weight="bold" />, tooltipText: "Table", value: "C" },
        {
          icon: <UsersIcon weight="bold" />,
          tooltipText: "People",
          value: "D",
        },
      ]}
    />
  );
};
