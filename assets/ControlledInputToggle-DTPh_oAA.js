import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Passing \`checked\` makes the toggle controlled; without it the component
// tracks its own state.
import { useState } from "react";
import { InputToggle } from "@czi-sds/components";

function App() {
  const [checked, setChecked] = useState(true);

  return (
    <div
      className="app"
      style={{ alignItems: "center", display: "flex", gap: "16px" }}
    >
      <InputToggle
        checked={checked}
        onChange={() => setChecked((previous) => !previous)}
      />
      <span>Notifications are {checked ? "on" : "off"}</span>
    </div>
  );
}

export default App;
`}))();export{t as default};