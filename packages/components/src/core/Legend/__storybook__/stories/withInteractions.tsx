import { useState } from "react";
import Legend from "../../index";

export default function WithInteractionsStory(
  props: Parameters<typeof Legend>[0]
) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  return (
    <div style={{ width: "400px" }}>
      <Legend
        {...props}
        onItemMouseEnter={(item) => setHoveredItem(item.name)}
        onItemMouseLeave={() => setHoveredItem(null)}
        onItemClick={(item) => setClickedItem(item.name)}
      />
      <div style={{ marginTop: "16px", fontSize: "14px" }}>
        <div>Hovered: {hoveredItem || "None"}</div>
        <div>Clicked: {clickedItem || "None"}</div>
      </div>
    </div>
  );
}
