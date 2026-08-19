import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// The Dialog card on the Overview page. See TooltipCard for why the catalog stages
// its components open and MenuCard for what an open modal has to be told not to do
// to the page around it.
//
// The card is the dialog itself, with no trigger behind it: a button that cannot
// be pressed says less about the component than the surface it opens. The backdrop
// is left out for the same reason - over a card it dims the one thing there is to
// look at.

import { Dialog, DialogContent, DialogTitle } from "@czi-sds/components";
import { useState } from "react";

function App() {
  const [host, setHost] = useState<HTMLElement | null>(null);

  return (
    <div className="app">
      <div ref={setHost} />

      <Dialog
        container={host}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        disableScrollLock
        open={Boolean(host)}
        sdsSize="xs"
      >
        <DialogTitle
          subtitle="Tutorials, guides, and articles"
          title="Learning Resources"
        />
        <DialogContent>
          An array of tutorials, guides, and insightful articles for deepening
          your understanding.
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
`}))();export{t as default};