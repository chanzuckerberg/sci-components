import * as React from "react";
import { ButtonToggle } from "@czi-sds/components";

function App() {
  const [toggle, setToggle] = React.useState(false);

  return (
    <div className="app">
      <ButtonToggle
        startIcon="InfoCircle"
        sdsStage={toggle ? "on" : "off"}
        onClick={() => setToggle((prev) => !prev)}
      >
        Label
      </ButtonToggle>
    </div>
  );
}

export default App;
