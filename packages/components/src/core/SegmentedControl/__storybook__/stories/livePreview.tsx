import { SegmentedControl } from "./default";

export function LivePreviewDemo(): JSX.Element {
  return (
    <SegmentedControl
      buttonDefinition={[
        { icon: "List", tooltipText: "List A", value: "A" },
        { icon: "List", tooltipText: "List B", value: "B" },
        { icon: "List", tooltipText: "List C", value: "C" },
        { icon: "List", tooltipText: "List D", value: "D" },
      ]}
    />
  );
}
