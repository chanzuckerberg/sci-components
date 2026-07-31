// A segment shows nothing but its size, so anything behind the number belongs
// in a tooltip. Giving a data item tooltip content opens a TooltipTable above
// its segment on hover; the shape is TooltipTable's own, a list of sections
// each holding dataRows of label and value.
//
// Tooltips are per item, so a category with nothing to add simply leaves the
// prop off, as Prosthetics does here.

import { StackedBarChart } from "@czi-sds/data-viz";

const DATA = [
  {
    name: "Transcriptomic",
    tooltip: {
      data: [
        {
          dataRows: [
            { label: "Bulk RNA-seq", value: 48 },
            { label: "Single cell", value: 39 },
            { label: "Single nucleus", value: 30 },
          ],
          label: "Transcriptomic",
        },
      ],
    },
    value: 117,
  },
  {
    name: "Imaging",
    tooltip: {
      data: [
        {
          dataRows: [
            { label: "Fluorescence microscopy", value: 22 },
            { label: "Confocal imaging", value: 15 },
            { label: "Electron microscopy", value: 14 },
            { label: "Light sheet imaging", value: 10 },
          ],
          label: "Imaging",
        },
      ],
    },
    value: 61,
  },
  { name: "Prosthetics", value: 130 },
];

function App() {
  return (
    <div className="app">
      <StackedBarChart
        barHeight={24}
        data={DATA}
        title="Modality"
        width="420px"
      />
    </div>
  );
}

export default App;
