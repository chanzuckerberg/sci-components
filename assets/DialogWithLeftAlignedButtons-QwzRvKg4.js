import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// \`buttonPosition="left"\` flips the alignment, so the primary action is listed
// first to keep it closest to the left edge.

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
          title="Delete this analysis?"
          subtitle="This action cannot be undone"
          onClose={handleClose}
        />
        <DialogContent>
          The analysis and all of its results will be permanently removed from
          the project.
        </DialogContent>
        <DialogActions buttonPosition="left">
          <Button sdsStyle="solid" sdsType="destructive" onClick={handleClose}>
            Delete
          </Button>
          <Button sdsStyle="outline" sdsType="primary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
`}))();export{t as default};