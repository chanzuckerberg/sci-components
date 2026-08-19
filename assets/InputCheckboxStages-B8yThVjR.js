import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// \`stage\` pins the state, so pair it with \`onChange\` when the checkbox
// needs to respond to clicks.
import { InputCheckbox } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "8px" }}
    >
      <InputCheckbox label="Unchecked" stage="unchecked" />
      <InputCheckbox label="Checked" stage="checked" />
      <InputCheckbox label="Indeterminate" stage="indeterminate" />
      <InputCheckbox label="Disabled" stage="checked" disabled />
    </div>
  );
}

export default App;
`}))();export{t as default};