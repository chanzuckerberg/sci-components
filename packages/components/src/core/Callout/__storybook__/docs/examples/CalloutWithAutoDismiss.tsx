// The Callout dismisses itself once the timeout elapses. Remounting it with a
// new key restarts the countdown.

import { useState } from "react";
import { Button, Callout } from "@czi-sds/components";

function App() {
  const [runId, setRunId] = useState(0);

  return (
    <div className="app">
      <Callout
        key={runId}
        intent="positive"
        autoDismiss={4000}
        title="Saved"
        body="This Callout disappears on its own after four seconds."
      />
      <Button onClick={() => setRunId((prev) => prev + 1)} sdsType="primary">
        Show again
      </Button>
    </div>
  );
}

export default App;
