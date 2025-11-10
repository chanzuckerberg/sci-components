import { useState } from "react";
import { Args } from "@storybook/react-webpack5";
import { Button } from "@czi-sds/components";
import RawStackedBarChart from "../../index";
import { StackedBarChartDataItem } from "../../StackedBarChart.types";

export default function WithDynamicDataStory(args: Args): JSX.Element {
  const { data: initialData, ...rest } = args;
  const [data, setData] = useState<StackedBarChartDataItem[]>(initialData);

  const handleRemoveRandom = () => {
    if (data.length === 0) return;
    const randomIndex = Math.floor(Math.random() * data.length);
    const removedItem = data[randomIndex];
    const newData = data.filter((_, index) => index !== randomIndex);
    console.log(`Removing: ${removedItem.name}`);
    setData(newData);
  };

  const handleRemoveFirst = () => {
    if (data.length === 0) return;
    console.log(`Removing first item: ${data[0].name}`);
    setData(data.slice(1));
  };

  const handleRemoveLast = () => {
    if (data.length === 0) return;
    console.log(`Removing last item: ${data[data.length - 1].name}`);
    setData(data.slice(0, -1));
  };

  const handleRemoveAll = () => {
    if (data.length === 0) return;
    console.log(`Removing all items`);
    setData([]);
  };

  const handleReset = () => {
    console.log("Resetting to initial data");
    setData(initialData);
  };

  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          <Button
            onClick={handleRemoveFirst}
            sdsStyle="square"
            sdsType="secondary"
            disabled={data.length === 0}
          >
            Remove First
          </Button>
          <Button
            onClick={handleRemoveLast}
            sdsStyle="square"
            sdsType="secondary"
            disabled={data.length === 0}
          >
            Remove Last
          </Button>
          <Button
            onClick={handleRemoveRandom}
            sdsStyle="square"
            sdsType="secondary"
            disabled={data.length === 0}
          >
            Remove Random
          </Button>

          <Button
            onClick={handleRemoveAll}
            sdsStyle="square"
            sdsType="secondary"
            disabled={data.length === 0}
          >
            Remove All
          </Button>
          <Button
            onClick={handleReset}
            sdsStyle="minimal"
            sdsType="secondary"
            disabled={data.length === initialData.length}
          >
            Reset
          </Button>
        </div>
      </div>
      <RawStackedBarChart {...rest} data={data} />
    </div>
  );
}
