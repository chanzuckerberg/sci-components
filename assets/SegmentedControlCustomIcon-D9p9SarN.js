import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// icon takes an SVG element as well as an SDS icon name, which covers artwork the
// SDS set does not carry and icons it only draws at 24px. The element is rendered
// as it is given, so size it to 16px yourself and fill it with currentColor so it
// picks up the segment's colour as the selection moves.

import {
  SegmentedControl,
  type SingleButtonDefinition,
} from "@czi-sds/components";

const HexagonIcon = (
  <svg fill="currentColor" height={16} viewBox="0 0 16 16" width={16}>
    <path d="M8 1.5l5.5 3.25v6.5L8 14.5 2.5 11.25v-6.5L8 1.5z" />
  </svg>
);

const VIEWS: SingleButtonDefinition[] = [
  { icon: "List", value: "List" },
  { icon: "Table", value: "Table" },
  { icon: HexagonIcon, value: "Cells" },
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