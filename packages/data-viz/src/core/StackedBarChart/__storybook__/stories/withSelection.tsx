import { useState } from "react";
import { Args } from "@storybook/react-webpack5";
import { Button, TagFilter } from "@czi-sds/components";
import RawStackedBarChart from "../../index";
import { DOMAIN_DATA } from "../constants";

export default function WithSelectionStory(args: Args): JSX.Element {
  const { data = DOMAIN_DATA, badge = undefined, ...rest } = args;
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const handleRemoveTag = (indexToRemove: number) => {
    setSelectedIndices((prev) => prev.filter((i) => i !== indexToRemove));
  };

  return (
    <div style={{ marginTop: 120, marginLeft: 120 }}>
      <RawStackedBarChart
        {...rest}
        data={data}
        selectedIndices={selectedIndices}
        onSelectionChange={setSelectedIndices}
        badge={
          selectedIndices.length > 0
            ? `${selectedIndices.length.toString()} of ${data.length.toString()}`
            : badge
        }
      />

      <div style={{ marginTop: "40px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          <Button
            onClick={() =>
              setSelectedIndices(
                data.reduce(
                  (
                    acc: number[],
                    item: (typeof data)[number],
                    index: number
                  ) => {
                    acc.push(index);
                    return acc;
                  },
                  []
                )
              )
            }
            sdsStyle="square"
            sdsType="secondary"
          >
            Select All
          </Button>
          <Button
            onClick={() => setSelectedIndices([])}
            sdsStyle="minimal"
            sdsType="secondary"
            disabled={selectedIndices.length === 0}
          >
            Clear Selection
          </Button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {selectedIndices.length > 0 &&
            selectedIndices.map((i) => (
              <TagFilter
                key={i}
                label={data[i]?.name || ""}
                onDelete={() => handleRemoveTag(i)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
