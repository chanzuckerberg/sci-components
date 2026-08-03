import {
  SegmentedControl,
  type SingleButtonDefinition,
} from "@czi-sds/components";
import styled from "@emotion/styled";

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
