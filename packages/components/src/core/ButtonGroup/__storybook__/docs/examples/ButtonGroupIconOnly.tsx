// Vertical orientation is only honored when every button is icon-only

import { Button, ButtonGroup, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "32px" }}>
      <ButtonGroup sdsType="secondary">
        <Button aria-label="Search">
          <Icon sdsIcon="Search" sdsSize="s" />
        </Button>
        <Button aria-label="Edit">
          <Icon sdsIcon="Edit" sdsSize="s" />
        </Button>
        <Button aria-label="Delete">
          <Icon sdsIcon="TrashCan" sdsSize="s" />
        </Button>
      </ButtonGroup>

      <ButtonGroup sdsType="secondary" orientation="vertical">
        <Button aria-label="Search">
          <Icon sdsIcon="Search" sdsSize="s" />
        </Button>
        <Button aria-label="Edit">
          <Icon sdsIcon="Edit" sdsSize="s" />
        </Button>
        <Button aria-label="Delete">
          <Icon sdsIcon="TrashCan" sdsSize="s" />
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
