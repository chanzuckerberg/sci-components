import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// \`hover\` is what makes a header sortable-looking: without it the cell draws no
// chevron and shows no tooltip, however the other sorting props are set. The
// three headers below differ only in that, and in which one is \`active\`.

import { CellHeader } from "@czi-sds/components";
import { useState } from "react";

type Direction = "asc" | "desc";

function App() {
  const [sortedBy, setSortedBy] = useState("Gene");
  const [direction, setDirection] = useState<Direction>("desc");

  function sortBy(column: string) {
    if (column === sortedBy) {
      setDirection(direction === "asc" ? "desc" : "asc");
    } else {
      setSortedBy(column);
      setDirection("desc");
    }
  }

  return (
    <div className="app">
      <table>
        <thead>
          <tr>
            {["Gene", "Organism"].map((column) => (
              <CellHeader
                active={column === sortedBy}
                direction={direction}
                hover
                key={column}
                onClick={() => sortBy(column)}
                shouldShowTooltipOnHover
                tooltipText={\`Sort by \${column.toLowerCase()}\`}
              >
                {column}
              </CellHeader>
            ))}
            <CellHeader hideSortIcon>Notes</CellHeader>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default App;
`}))();export{t as default};