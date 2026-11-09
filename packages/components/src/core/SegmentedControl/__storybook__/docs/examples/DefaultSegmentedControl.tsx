import {
  GitBranchIcon,
  ListBulletsIcon,
  TableIcon,
} from "@phosphor-icons/react";
import {
  SegmentedControl,
  type SingleButtonDefinition,
} from "@czi-sds/components";

const VIEWS: SingleButtonDefinition[] = [
  { icon: <ListBulletsIcon weight="bold" />, value: "List" },
  { icon: <TableIcon weight="bold" />, value: "Table" },
  { icon: <GitBranchIcon weight="bold" />, value: "Tree" },
];

function App() {
  return (
    <div className="app">
      <SegmentedControl buttonDefinition={VIEWS} />
    </div>
  );
}

export default App;
