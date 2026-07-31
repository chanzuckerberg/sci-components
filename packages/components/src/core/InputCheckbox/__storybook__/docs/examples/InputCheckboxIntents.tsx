// `intent` colors the empty box only; a checked box always uses the accent color.
import { InputCheckbox } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "24px" }}>
      <InputCheckbox label="Default" intent="default" />
      <InputCheckbox label="Positive" intent="positive" />
      <InputCheckbox label="Notice" intent="notice" />
      <InputCheckbox label="Negative" intent="negative" />
    </div>
  );
}

export default App;
