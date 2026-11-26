import { ButtonToggle } from "@czi-sds/components";
import { ListIcon } from "@phosphor-icons/react";

function App() {
  return (
    <div
      className="app"
      style={{ alignItems: "center", display: "flex", gap: "16px" }}
    >
      <ButtonToggle
        size="large"
        sdsStyle="outline"
        startIcon={<ListIcon weight="bold" />}
      >
        Large
      </ButtonToggle>

      <ButtonToggle
        size="medium"
        sdsStyle="outline"
        startIcon={<ListIcon weight="bold" />}
      >
        Medium
      </ButtonToggle>

      <ButtonToggle
        size="small"
        sdsStyle="outline"
        startIcon={<ListIcon weight="bold" />}
      >
        Small
      </ButtonToggle>
    </div>
  );
}

export default App;
