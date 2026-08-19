import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Left alone, the Banner closes itself and does not come back. Passing
// \`dismissed\` - even as \`false\` - hands that decision over: the close button
// then only fires \`onClose\`, and the Banner stays on screen until you set
// \`dismissed\` yourself, which also means you can bring it back.

import { Banner, Button } from "@czi-sds/components";
import { useState } from "react";

function App() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="app">
      <Banner
        dismissed={dismissed}
        onClose={() => setDismissed(true)}
        sdsType="primary"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
      {dismissed && (
        <Button
          onClick={() => setDismissed(false)}
          sdsStyle="minimal"
          sdsType="primary"
        >
          Bring the banner back
        </Button>
      )}
    </div>
  );
}

export default App;
`}))();export{t as default};