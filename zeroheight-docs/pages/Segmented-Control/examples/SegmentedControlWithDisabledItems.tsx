import { SegmentedControl, SingleButtonDefinition } from "@czi-sds/components";

function App() {
  const buttonDefinition: SingleButtonDefinition[] = [
    {
      icon: "List",
      tooltipText: "List A",
      value: "A",
    },
    {
      disabled: true,
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
      <SegmentedControl buttonDefinition={buttonDefinition} />
    </div>
  );
}

export default App;
