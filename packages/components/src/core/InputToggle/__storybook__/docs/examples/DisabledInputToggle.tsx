import { InputToggle } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <InputToggle disabled />
      <InputToggle checked disabled />
    </div>
  );
}

export default App;
