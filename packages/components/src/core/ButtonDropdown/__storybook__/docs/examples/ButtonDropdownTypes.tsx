import { ButtonDropdown } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <ButtonDropdown sdsType="primary">Primary</ButtonDropdown>
      <ButtonDropdown sdsType="secondary">Secondary</ButtonDropdown>
    </div>
  );
}

export default App;
