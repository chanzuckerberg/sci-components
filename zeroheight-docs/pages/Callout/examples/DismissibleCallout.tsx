// Closable Callout

import { useState } from "react";
import { Button, Callout } from "@czi-sds/components";

function App() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="app">
      <Callout
        intent="negative"
        sdsStyle="dismissible"
        dismissed={dismissed}
        onClose={() => setDismissed(true)}
        title="An Error Occurred"
        body="The Error Callout is a crucial component for communicating critical errors or issues to users."
      />
      {dismissed && (
        <Button onClick={() => setDismissed(false)} sdsType="primary">
          Reset Callout
        </Button>
      )}
    </div>
  );
}

export default App;
