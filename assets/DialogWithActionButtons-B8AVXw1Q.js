import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// DialogActions aligns its buttons to the right by default, so the primary
// action goes last.

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@czi-sds/components";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="app" style={{ padding: 20 }}>
      <Button
        sdsStyle="solid"
        sdsType="primary"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </Button>

      <Dialog open={isOpen} onClose={handleClose} sdsSize="s">
        <DialogTitle
          title="Share this collection"
          subtitle="Anyone with the link can view it"
          onClose={handleClose}
        />
        <DialogContent>
          Sharing generates a public link. You can revoke access at any time
          from the collection settings.
        </DialogContent>
        <DialogActions>
          <Button sdsStyle="outline" sdsType="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button sdsStyle="solid" sdsType="primary" onClick={handleClose}>
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
`}))();export{t as default};