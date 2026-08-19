// Leaving children out is what makes a toggle square, and it is the form a
// toggle usually takes. There is then no text for a screen reader to announce,
// so each one needs an aria-label of its own.

import { useState } from "react";
import { ButtonToggle, Icon } from "@czi-sds/components";

function App() {
  const [labels, setLabels] = useState(true);
  const [filters, setFilters] = useState(false);

  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <ButtonToggle
        aria-label="Show labels"
        sdsStage={labels ? "on" : "off"}
        sdsStyle="outline"
        sdsType="primary"
        startIcon={<Icon sdsIcon="EyeOpen" sdsSize="s" />}
        onClick={() => setLabels((previous) => !previous)}
      />

      <ButtonToggle
        aria-label="Show filters"
        sdsStage={filters ? "on" : "off"}
        sdsStyle="outline"
        sdsType="primary"
        startIcon={<Icon sdsIcon="Filter" sdsSize="s" />}
        onClick={() => setFilters((previous) => !previous)}
      />
    </div>
  );
}

export default App;
