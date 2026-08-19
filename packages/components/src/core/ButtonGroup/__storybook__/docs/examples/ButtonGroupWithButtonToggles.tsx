// A group takes ButtonToggle as readily as Button, which turns it from a row of
// actions into a set of switches. Each toggle owns its state through sdsStage.

import { useState } from "react";
import { ButtonGroup, ButtonToggle, Icon } from "@czi-sds/components";

const TOGGLES = [
  { icon: "Search", label: "Search" },
  { icon: "Copy", label: "Copy" },
  { icon: "Code", label: "Code" },
] as const;

function App() {
  const [active, setActive] = useState<Record<string, boolean>>({
    Search: true,
  });

  return (
    <div className="app">
      <ButtonGroup sdsType="secondary">
        {TOGGLES.map(({ icon, label }) => (
          <ButtonToggle
            key={label}
            aria-label={label}
            sdsStage={active[label] ? "on" : "off"}
            sdsStyle="outline"
            startIcon={<Icon sdsIcon={icon} sdsSize="s" />}
            onClick={() =>
              setActive((previous) => ({
                ...previous,
                [label]: !previous[label],
              }))
            }
          />
        ))}
      </ButtonGroup>
    </div>
  );
}

export default App;
