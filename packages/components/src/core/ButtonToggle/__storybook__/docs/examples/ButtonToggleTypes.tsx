// The type decides what the on stage looks like: primary fills with the accent
// color, secondary stays neutral. Both stages are shown for each.

import { ButtonToggle } from "@czi-sds/components";
import { ListIcon } from "@phosphor-icons/react";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <ButtonToggle
        sdsStage="off"
        sdsStyle="outline"
        sdsType="primary"
        startIcon={<ListIcon weight="bold" />}
      >
        Primary off
      </ButtonToggle>

      <ButtonToggle
        sdsStage="on"
        sdsStyle="outline"
        sdsType="primary"
        startIcon={<ListIcon weight="bold" />}
      >
        Primary on
      </ButtonToggle>

      <ButtonToggle
        sdsStage="off"
        sdsStyle="outline"
        sdsType="secondary"
        startIcon={<ListIcon weight="bold" />}
      >
        Secondary off
      </ButtonToggle>

      <ButtonToggle
        sdsStage="on"
        sdsStyle="outline"
        sdsType="secondary"
        startIcon={<ListIcon weight="bold" />}
      >
        Secondary on
      </ButtonToggle>
    </div>
  );
}

export default App;
