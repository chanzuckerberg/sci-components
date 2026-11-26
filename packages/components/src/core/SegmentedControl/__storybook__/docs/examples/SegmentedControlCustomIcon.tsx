// icon takes any element, so artwork that neither Phosphor nor @czi-sds/icons
// carries works too. The control draws it at 16px; fill it with currentColor so
// it picks up the segment's colour as the selection moves.

import { ListBulletsIcon, TableIcon } from "@phosphor-icons/react";
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
  { icon: <ListBulletsIcon weight="bold" />, value: "List" },
  { icon: <TableIcon weight="bold" />, value: "Table" },
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
