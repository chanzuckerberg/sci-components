import { Button } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{ alignItems: "center", display: "flex", gap: "16px" }}
    >
      <Button size="large">Large</Button>
      <Button size="medium">Medium</Button>
      <Button size="small">Small</Button>
    </div>
  );
}

export default App;
