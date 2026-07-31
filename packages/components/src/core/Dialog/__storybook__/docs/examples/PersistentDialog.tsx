// `canClickOutsideClose={false}` blocks both the backdrop click and the Esc
// key. Leaving `onClose` off DialogTitle hides the close button, so an action
// button is the only way out.

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

  return (
    <div className="app">
      <Button
        sdsStyle="solid"
        sdsType="primary"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        canClickOutsideClose={false}
        sdsSize="s"
      >
        <DialogTitle
          title="Leaving this site"
          subtitle="You are about to open an external resource"
        />
        <DialogContent>
          The link opens a site that is not maintained by us. Any data you enter
          there is subject to that site&apos;s privacy policy.
        </DialogContent>
        <DialogActions>
          <Button
            sdsStyle="outline"
            sdsType="primary"
            onClick={() => setIsOpen(false)}
          >
            Stay here
          </Button>
          <Button
            sdsStyle="solid"
            sdsType="primary"
            onClick={() => setIsOpen(false)}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
