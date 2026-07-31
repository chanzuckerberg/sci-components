import { Button, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <Button
        sdsType="secondary"
        startIcon={<Icon sdsIcon="Download" sdsSize="s" />}
      >
        Download
      </Button>
      <Button
        sdsType="secondary"
        endIcon={<Icon sdsIcon="ChevronRight" sdsSize="s" />}
      >
        Next
      </Button>
    </div>
  );
}

export default App;
