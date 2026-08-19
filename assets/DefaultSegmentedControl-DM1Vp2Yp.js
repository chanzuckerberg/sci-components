import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`import {
  SegmentedControl,
  type SingleButtonDefinition,
} from "@czi-sds/components";

const VIEWS: SingleButtonDefinition[] = [
  { icon: "List", value: "List" },
  { icon: "Table", value: "Table" },
  { icon: "TreeVertical", value: "Tree" },
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