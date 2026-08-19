import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// The Notification dismisses itself once the timeout elapses. Remounting it
// with a new key restarts the countdown.

import { useState } from "react";
import { Button, Notification } from "@czi-sds/components";

function App() {
  const [runId, setRunId] = useState(0);

  return (
    <div className="app">
      <Notification
        key={runId}
        intent="positive"
        slideDirection="left"
        autoDismiss={4000}
      >
        This Notification slides away on its own after four seconds.
      </Notification>
      <Button onClick={() => setRunId((prev) => prev + 1)} sdsType="primary">
        Show again
      </Button>
    </div>
  );
}

export default App;
`}))();export{t as default};