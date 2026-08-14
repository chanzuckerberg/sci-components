import { ButtonToggle, Icon } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{ alignItems: "center", display: "flex", gap: "16px" }}
    >
      <ButtonToggle
        size="large"
        sdsStyle="outline"
        startIcon={<Icon sdsIcon="LinesHorizontal3" sdsSize="s" />}
      >
        Large
      </ButtonToggle>

      <ButtonToggle
        size="medium"
        sdsStyle="outline"
        startIcon={<Icon sdsIcon="LinesHorizontal3" sdsSize="s" />}
      >
        Medium
      </ButtonToggle>

      <ButtonToggle
        size="small"
        sdsStyle="outline"
        startIcon={<Icon sdsIcon="LinesHorizontal3" sdsSize="s" />}
      >
        Small
      </ButtonToggle>
    </div>
  );
}

export default App;
