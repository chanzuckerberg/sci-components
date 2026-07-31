// Children replace DialogTitle's built-in layout, including the close button.
// DialogTitleTitle and DialogTitleSubtitle keep the SDS type styles, but they
// need their own `sdsSize` because only DialogTitle receives it from Dialog.

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogTitleSubtitle,
  DialogTitleTitle,
  Icon,
} from "@czi-sds/components";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="app">
      <Button
        sdsStyle="solid"
        sdsType="primary"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </Button>

      <Dialog open={isOpen} onClose={handleClose} sdsSize="s">
        <DialogTitle>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              textAlign: "center",
            }}
          >
            <Icon
              sdsIcon="CheckCircle"
              sdsSize="xl"
              color="green"
              shade={400}
            />
            <DialogTitleTitle sdsSize="s">Upload complete</DialogTitleTitle>
            <DialogTitleSubtitle sdsSize="s">
              24 files processed
            </DialogTitleSubtitle>
          </div>
        </DialogTitle>
        <DialogContent>
          Your files are ready. Results will appear in the project as soon as
          the analysis finishes.
        </DialogContent>
        <DialogActions>
          <Button sdsStyle="solid" sdsType="primary" onClick={handleClose}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
