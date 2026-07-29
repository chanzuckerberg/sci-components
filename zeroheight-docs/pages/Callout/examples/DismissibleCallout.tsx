// Closable Callout

import { useState } from "react";
import { Callout, CalloutTitle, Button } from "@czi-sds/components";

function App() {
  const [dismissed, setDismissed] = useState(false);
  const handleClick = () => {
    setDismissed((prev) => !prev);
  };
  return (
    <div className="app">
      {!dismissed ? (
        <Callout
          intent="negative"
          dismissed={dismissed}
          onClose={() => {
            console.log("Callout closed!");
            setDismissed(true);
          }}
        >
          <CalloutTitle>An Error Occurred</CalloutTitle>
          The Error Callout is a crucial component for communicating critical
          errors or issues to users. With its distinct appearance and the
          message "An Error Occurred," it ensures that users are immediately
          informed about unexpected situations that require attention.
        </Callout>
      ) : (
        <Button onClick={handleClick} sdsType="primary" sdsStyle="rounded">
          Reset Callout
        </Button>
      )}
    </div>
  );
}

export default App;
