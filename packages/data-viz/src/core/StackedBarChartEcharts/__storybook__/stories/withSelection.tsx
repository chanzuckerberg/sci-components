import { useState } from "react";
import { Args } from "@storybook/react-webpack5";
import RawStackedBarChart from "../../index";
import { ORGANISM_DATA } from "../constants";

export default function WithSelectionStory(args: Args): JSX.Element {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  return (
    <div style={{ width: "fit-content" }}>
      <RawStackedBarChart
        {...args}
        selectedIndices={selectedIndices}
        onSelectionChange={setSelectedIndices}
      />
      <div style={{ marginTop: "16px", fontSize: "14px" }}>
        <div>
          Selected:{" "}
          {selectedIndices.length > 0
            ? selectedIndices
                .map((i) => ORGANISM_DATA[i]?.name)
                .filter(Boolean)
                .join(", ")
            : "None"}
        </div>
        <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
          Click legend items to select/deselect. Multiple selections supported.
        </div>
      </div>
    </div>
  );
}
