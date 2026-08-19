import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Each segment builds its own tooltip, so tooltipProps is set per segment rather
// than on the control. Anything the SDS Tooltip takes belongs there: a title, a
// subtitle underneath it, a placement other than the default above the control.
//
// Only the tooltip changes. The accessible name still comes from the segment's
// value, not from tooltipProps.title, so the values here stay readable.
//
// tooltipText is the older way to set a bare title. It is deprecated, warns in
// the console, and overrides tooltipProps.title when both are set.

import {
  SegmentedControl,
  type SingleButtonDefinition,
} from "@czi-sds/components";

const VIEWS: SingleButtonDefinition[] = [
  {
    icon: "List",
    tooltipProps: {
      subtitle: "One row per sample, sorted by collection date",
      title: "List",
    },
    value: "List",
  },
  {
    icon: "Table",
    tooltipProps: {
      subtitle: "Every measured field, side by side",
      title: "Table",
    },
    value: "Table",
  },
  {
    icon: "TreeVertical",
    tooltipProps: { placement: "bottom", title: "Tree, explained below" },
    value: "Tree",
  },
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