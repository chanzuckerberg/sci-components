// A single button carries its own disabled prop; disabled on the group reaches
// every button in it.

import { Button, ButtonGroup } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "32px" }}>
      <ButtonGroup sdsType="secondary">
        <Button>Day</Button>
        <Button disabled>Week</Button>
        <Button>Month</Button>
      </ButtonGroup>

      <ButtonGroup disabled sdsType="secondary">
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
