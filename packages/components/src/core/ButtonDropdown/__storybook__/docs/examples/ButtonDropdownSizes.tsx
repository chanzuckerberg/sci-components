import { ButtonDropdown } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{ alignItems: "center", display: "flex", gap: "16px" }}
    >
      <ButtonDropdown size="large">Large</ButtonDropdown>
      <ButtonDropdown size="medium">Medium</ButtonDropdown>
      <ButtonDropdown size="small">Small</ButtonDropdown>
    </div>
  );
}

export default App;
