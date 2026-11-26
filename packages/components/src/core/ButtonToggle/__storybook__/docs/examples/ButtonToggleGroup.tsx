import * as React from "react";
import { ButtonGroup, ButtonToggle } from "@czi-sds/components";
import { CodeIcon, CopyIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";

const TOGGLES = [
  { icon: <MagnifyingGlassIcon weight="bold" />, label: "Search" },
  { icon: <CopyIcon weight="bold" />, label: "Copy" },
  { icon: <CodeIcon weight="bold" />, label: "Code" },
];

function App() {
  const [active, setActive] = React.useState<Record<string, boolean>>({});

  return (
    <div className="app">
      <ButtonGroup sdsType="secondary">
        {TOGGLES.map(({ icon, label }) => (
          <ButtonToggle
            key={label}
            aria-label={label}
            sdsStyle="outline"
            sdsType="secondary"
            sdsStage={active[label] ? "on" : "off"}
            startIcon={icon}
            onClick={() =>
              setActive((prev) => ({ ...prev, [label]: !prev[label] }))
            }
          />
        ))}
      </ButtonGroup>
    </div>
  );
}

export default App;
