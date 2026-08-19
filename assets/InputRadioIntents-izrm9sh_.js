import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// \`intent\` colors the empty circle only; a selected radio always uses the
// accent color.
import { InputRadio } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "24px" }}>
      <InputRadio label="Default" value="default" intent="default" />
      <InputRadio label="Positive" value="positive" intent="positive" />
      <InputRadio label="Notice" value="notice" intent="notice" />
      <InputRadio label="Negative" value="negative" intent="negative" />
      <InputRadio label="Disabled" value="disabled" disabled />
    </div>
  );
}

export default App;
`}))();export{t as default};