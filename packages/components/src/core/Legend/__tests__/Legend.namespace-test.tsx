import { Legend, LegendProps } from "@czi-sds/components";
import React from "react";

const LegendNameSpaceTest = (props: LegendProps) => {
  return (
    <>
      <Legend
        items={[
          { name: "Item 1", value: 100 },
          { name: "Item 2", value: 200 },
          { name: "Item 3", value: 300 },
        ]}
      />

      <Legend
        items={[
          { name: "Item A", value: 50, color: "#FF0000" },
          { name: "Item B", value: 75, color: "#00FF00" },
          { name: "Item C", value: 100, color: "#0000FF" },
        ]}
        showValues
      />

      <Legend
        items={[
          { name: "Selectable 1", value: 10 },
          { name: "Selectable 2", value: 20 },
          { name: "Disabled Item", value: 30, disabled: true },
        ]}
        selectedIndices={[0]}
        onSelectionChange={(indices) => console.log(indices)}
        showValues
      />

      <Legend
        items={[
          { name: "Interactive 1" },
          { name: "Interactive 2" },
          { name: "Interactive 3" },
        ]}
        colors={["#FF5733", "#33FF57", "#3357FF"]}
        onItemClick={(item, index) => console.log(item, index)}
        onItemMouseEnter={(item, index) => console.log(item, index)}
        onItemMouseLeave={(item, index) => console.log(item, index)}
        hoveredIndex={0}
      />
    </>
  );
};
