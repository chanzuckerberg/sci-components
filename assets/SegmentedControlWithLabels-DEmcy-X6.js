import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// A segment shows text instead of an icon when it is given a label. Setting both
// on one segment is a mistake: the label wins, the icon never renders, and the
// console carries a warning.
//
// A labelled segment already says what it is, so the tooltip would only repeat
// it. shouldShowTooltip turns that off. The label is also the accessible name
// here, so the value is free to stay a plain identifier.

import {
  SegmentedControl,
  type SingleButtonDefinition,
} from "@czi-sds/components";

const VIEWS: SingleButtonDefinition[] = [
  { label: "Explorer", shouldShowTooltip: false, value: "explorer" },
  { label: "All data", shouldShowTooltip: false, value: "all-data" },
  { label: "Summary", shouldShowTooltip: false, value: "summary" },
];

function App() {
  return (
    <div className="app">
      <SegmentedControl buttonDefinition={VIEWS} />
    </div>
  );
}

export default App;
`}))();export{t as default};