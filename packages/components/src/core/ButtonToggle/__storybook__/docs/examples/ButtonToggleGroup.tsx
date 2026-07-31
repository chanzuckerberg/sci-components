import * as React from "react";
import { ButtonGroup, ButtonToggle, Icon } from "@czi-sds/components";

const TOGGLES = [
  { icon: "Search", label: "Search" },
  { icon: "Copy", label: "Copy" },
  { icon: "Code", label: "Code" },
] as const;

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
            startIcon={<Icon sdsIcon={icon} sdsSize="s" />}
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
