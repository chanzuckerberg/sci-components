import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Notification with an action button beneath its message

import { useState } from "react";
import { Button, Notification } from "@czi-sds/components";

function App() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="app">
      <Notification
        intent="notice"
        slideDirection="left"
        dismissed={dismissed}
        buttonText="Dismiss"
        buttonPosition="right"
        buttonOnClick={() => setDismissed(true)}
      >
        Your session expires in five minutes.
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