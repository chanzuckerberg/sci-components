import * as React from "react";
import { ButtonToggle } from "@czi-sds/components";
import { ListIcon } from "@phosphor-icons/react";

function App() {
  const [toggle, setToggle] = React.useState(false);

  return (
    <div className="app">
      <ButtonToggle
        sdsStyle="outline"
        sdsType="primary"
        sdsStage={toggle ? "on" : "off"}
        startIcon={<ListIcon weight="bold" />}
        onClick={() => setToggle((prev) => !prev)}
      >
        Label
      </ButtonToggle>
    </div>
  );
}

export default App;
