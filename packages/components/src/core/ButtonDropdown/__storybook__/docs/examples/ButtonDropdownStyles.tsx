import { ButtonDropdown } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <ButtonDropdown sdsStyle="solid">Solid</ButtonDropdown>
      <ButtonDropdown sdsStyle="outline">Outline</ButtonDropdown>
      <ButtonDropdown sdsStyle="minimal">Minimal</ButtonDropdown>
    </div>
  );
}

export default App;
