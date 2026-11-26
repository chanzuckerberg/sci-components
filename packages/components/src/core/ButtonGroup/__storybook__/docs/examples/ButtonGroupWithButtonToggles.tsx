// A group takes ButtonToggle as readily as Button, which turns it from a row of
// actions into a set of switches. Each toggle owns its state through sdsStage.

import { useState } from "react";
import { ButtonGroup, ButtonToggle } from "@czi-sds/components";
import { CodeIcon, CopyIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";

const TOGGLES = [
  { icon: <MagnifyingGlassIcon weight="bold" />, label: "Search" },
  { icon: <CopyIcon weight="bold" />, label: "Copy" },
  { icon: <CodeIcon weight="bold" />, label: "Code" },
];

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
            startIcon={icon}
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
