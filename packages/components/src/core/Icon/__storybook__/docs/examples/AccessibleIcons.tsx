// An icon-only control needs an accessible name on the control itself. Beside
// visible text the icon is decorative and adds nothing for a screen reader.

import { Button, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <Button sdsStyle="minimal" sdsType="secondary" aria-label="Delete file">
        <Icon sdsIcon="TrashCan" sdsSize="l" />
      </Button>

      <Button
        sdsStyle="outline"
        sdsType="primary"
        startIcon={<Icon sdsIcon="TrashCan" sdsSize="s" />}
      >
        Delete file
      </Button>
    </div>
  );
}

export default App;
