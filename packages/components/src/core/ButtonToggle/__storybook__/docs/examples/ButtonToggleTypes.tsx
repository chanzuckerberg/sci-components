// The type decides what the on stage looks like: primary fills with the accent
// color, secondary stays neutral. Both stages are shown for each.

import { ButtonToggle, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <ButtonToggle
        sdsStage="off"
        sdsStyle="outline"
        sdsType="primary"
        startIcon={<Icon sdsIcon="LinesHorizontal3" sdsSize="s" />}
      >
        Primary off
      </ButtonToggle>

      <ButtonToggle
        sdsStage="on"
        sdsStyle="outline"
        sdsType="primary"
        startIcon={<Icon sdsIcon="LinesHorizontal3" sdsSize="s" />}
      >
        Primary on
      </ButtonToggle>

      <ButtonToggle
        sdsStage="off"
        sdsStyle="outline"
        sdsType="secondary"
        startIcon={<Icon sdsIcon="LinesHorizontal3" sdsSize="s" />}
      >
        Secondary off
      </ButtonToggle>

      <ButtonToggle
        sdsStage="on"
        sdsStyle="outline"
        sdsType="secondary"
        startIcon={<Icon sdsIcon="LinesHorizontal3" sdsSize="s" />}
      >
        Secondary on
      </ButtonToggle>
    </div>
  );
}

export default App;
