// Toggles are designed around the outline and minimal styles. sdsStyle also
// accepts Button's "solid", which has no toggle treatment of its own, so set one
// of these two explicitly rather than taking the inherited default.
//
// sdsType is set explicitly for the same reason: the on stage resolves its colors
// before Button applies its own default, so leaving it out draws the neutral
// treatment over a button that is otherwise primary.
//
// The stages below are fixed rather than driven from state, so both can be seen
// without clicking.

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
        Outline off
      </ButtonToggle>

      <ButtonToggle
        sdsStage="on"
        sdsStyle="outline"
        sdsType="primary"
        startIcon={<Icon sdsIcon="LinesHorizontal3" sdsSize="s" />}
      >
        Outline on
      </ButtonToggle>

      <ButtonToggle
        sdsStage="off"
        sdsStyle="minimal"
        sdsType="primary"
        startIcon={<Icon sdsIcon="LinesHorizontal3" sdsSize="s" />}
      >
        Minimal off
      </ButtonToggle>

      <ButtonToggle
        sdsStage="on"
        sdsStyle="minimal"
        sdsType="primary"
        startIcon={<Icon sdsIcon="LinesHorizontal3" sdsSize="s" />}
      >
        Minimal on
      </ButtonToggle>
    </div>
  );
}

export default App;
