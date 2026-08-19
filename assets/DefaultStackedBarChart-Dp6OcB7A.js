import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Data and a width are all the chart needs. In the default proportional mode
// the values become shares of their own sum, so the segments always fill the
// bar, and the legend reads them back as rounded percentages.
//
// The title is what makes room for the badge beside it, which counts the
// categories on its own until something is selected.

import { StackedBarChart } from "@czi-sds/data-viz";

const DATA = [
  { name: "Transcriptomic", value: 117 },
  { name: "Prosthetics", value: 130 },
  { name: "Epigenomics", value: 100 },
  { name: "Spatial Transcriptomics", value: 78 },
  { name: "Imaging", value: 61 },
  { name: "Sequencing", value: 34 },
];

function App() {
  return (
    <div className="app">
      <StackedBarChart data={DATA} title="Modality" width="420px" />
    </div>
  );
}

export default App;
`}))();export{t as default};