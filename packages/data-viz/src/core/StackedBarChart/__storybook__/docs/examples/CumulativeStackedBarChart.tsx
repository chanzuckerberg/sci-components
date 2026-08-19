// The same data read against a known total instead of its own sum. maxAmount
// is what the full bar stands for, so the segments no longer fill it and the
// gap becomes the grey Remaining segment, which nothing can interact with.
//
// A share of a total the reader cannot see means little, so a cumulative bar
// usually counts instead of showing percentages: legendValueFormat="count"
// with a unit to say what is being counted.

import { StackedBarChart } from "@czi-sds/data-viz";

const DATA = [
  { name: "Processed", value: 117 },
  { name: "In review", value: 130 },
  { name: "Queued", value: 100 },
];

function App() {
  return (
    <div className="app">
      <StackedBarChart
        data={DATA}
        legendValueFormat="count"
        maxAmount={500}
        mode="cumulative"
        remainingLabel="Not yet submitted"
        title="Datasets"
        unit="datasets"
        width="420px"
      />
    </div>
  );
}

export default App;
