import { useState } from "react";
import { SegmentedControl, SingleButtonDefinition } from "@czi-sds/components";

function App() {
  const [value, setValue] = useState("B");
  const buttonDefinition: SingleButtonDefinition[] = [
    {
      icon: "List",
      tooltipText: "List A",
      value: "A",
    },
    {
      icon: "List",
      tooltipText: "List B",
      value: "B",
    },
    {
      icon: "List",
      tooltipText: "List C",
      value: "C",
    },
  ];
  return (
    <div className="app">
      <SegmentedControl
        buttonDefinition={buttonDefinition}
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
      />
    </div>
  );
}

export default App;
