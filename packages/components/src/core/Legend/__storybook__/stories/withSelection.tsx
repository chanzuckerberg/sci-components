import { useState } from "react";
import Legend from "../../index";
import TagFilter from "src/core/TagFilter";
import Button from "src/core/Button";

export default function WithSelectionStory(
  props: Parameters<typeof Legend>[0]
) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const handleRemoveTag = (indexToRemove: number) => {
    setSelectedIndices((prev) => prev.filter((i) => i !== indexToRemove));
  };

  return (
    <div style={{ width: "400px" }}>
      <Legend
        {...props}
        selectedIndices={selectedIndices}
        onSelectionChange={setSelectedIndices}
      />
      <div style={{ marginTop: "40px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          <Button
            onClick={() =>
              setSelectedIndices(props.items?.map((item, index) => index) || [])
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
          >
            Clear Selection
          </Button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {selectedIndices.length > 0 &&
            selectedIndices.map((i) => (
              <TagFilter
                key={i}
                label={props.items?.[i]?.name || ""}
                onDelete={() => handleRemoveTag(i)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
