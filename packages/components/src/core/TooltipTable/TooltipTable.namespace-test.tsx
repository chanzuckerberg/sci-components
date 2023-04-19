import {
  TooltipTableContent,
  TooltipTableContentProps,
} from "@czi-sds/components";
import React from "react";

const data = [
  {
    dataRows: [
      { label: "Label 1", value: 1 },
      { label: "Label 2", value: 2 },
    ],
    label: "Section 1",
  },
  {
    dataRows: [
      { label: "Label 3", value: 3 },
      { label: "Label 4", value: 4 },
    ],
    label: "Section 2",
  },
];

const TooltipTableContentNameSpaceTest = (props: TooltipTableContentProps) => {
  return (
    <TooltipTableContent contentAlert="String" itemAlign="left" data={data} />
  );
};
