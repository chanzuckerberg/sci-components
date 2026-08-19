import * as React from "react";
import { ButtonToggle, Icon } from "@czi-sds/components";

function App() {
  const [toggle, setToggle] = React.useState(false);

  return (
    <div className="app">
      <ButtonToggle
        sdsStyle="outline"
        sdsType="primary"
        sdsStage={toggle ? "on" : "off"}
        startIcon={<Icon sdsIcon="LinesHorizontal3" sdsSize="s" />}
        onClick={() => setToggle((prev) => !prev)}
      >
        Label
      </ButtonToggle>
    </div>
  );
}

export default App;
