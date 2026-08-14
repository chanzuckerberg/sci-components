// The group injects its size into every button in it, so a size set on an
// individual button is overwritten and a mixed group stays at one height.

import { Button, ButtonGroup } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{ alignItems: "center", display: "flex", gap: "32px" }}
    >
      <ButtonGroup size="large">
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
      </ButtonGroup>

      <ButtonGroup size="medium">
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
      </ButtonGroup>

      <ButtonGroup size="small">
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
