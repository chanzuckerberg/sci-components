import { useState } from "react";
import { Args } from "@storybook/react-webpack5";
import { Button, TagFilter } from "@czi-sds/components";
import RawStackedBarChart from "../../index";
import { StackedBarChartDataItem } from "../../StackedBarChart.types";

export default function WithSelectionStory(args: Args): JSX.Element {
  const { data, ...rest } = args;
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const handleSelectionChange = (
    newIndices: number[],
    selectedData: StackedBarChartDataItem[]
  ) => {
    setSelectedIndices(newIndices);
    console.log("Selected indices:", newIndices);
    console.log("Selected data:", selectedData);
  };

  const handleSelectAll = () => {
    const allIndices = data.map((_: unknown, index: number) => index);
    handleSelectionChange(allIndices, data);
  };

  const handleClearSelection = () => {
    handleSelectionChange([], []);
  };

  const handleRemoveTag = (indexToRemove: number) => {
    const newIndices = selectedIndices.filter((i) => i !== indexToRemove);
    const newData = data.filter((_: unknown, index: number) =>
      newIndices.includes(index)
    );
    handleSelectionChange(newIndices, newData);
  };

  return (
    <div
      style={{
        margin: 150,
      }}
    >
      <RawStackedBarChart
        {...rest}
        data={data}
        selectedIndices={selectedIndices}
        onSelectionChange={handleSelectionChange}
      />

      <div style={{ marginTop: "40px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          <Button
            onClick={handleSelectAll}
            sdsStyle="square"
            sdsType="secondary"
          >
            Select All
          </Button>
          <Button
            onClick={handleClearSelection}
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
