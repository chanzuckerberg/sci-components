import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Closable Notification

import { useState } from "react";
import { Button, Notification } from "@czi-sds/components";

function App() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="app">
      <Notification
        intent="negative"
        slideDirection="left"
        dismissed={dismissed}
        onClose={() => setDismissed(true)}
      >
        Something went wrong while saving your changes.
      </Notification>
      {dismissed && (
        <Button onClick={() => setDismissed(false)} sdsType="primary">
          Reset Notification
        </Button>
      )}
    </div>
  );
}

export default App;
`}))();export{t as default};