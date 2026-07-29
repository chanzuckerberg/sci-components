import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@czi-sds/components";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  function handleClick() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="app">
      <Button sdsStyle="minimal" sdsType="primary" onClick={handleClick}>
        Open Dialog
      </Button>
      <Dialog
        onClose={handleClose}
        open={isOpen}
        sdsSize="xs"
        canClickOutsideClose={false}
      >
        <DialogTitle
          title="Welcome"
          subtitle="New features showcase"
          onClose={handleClose}
        />
        <DialogContent>
          We are thrilled to introduce you to our latest enhancements and
          features. In this interactive showcase, you'll have the opportunity to
          explore a wide range of improvements designed to elevate your user
          experience. Whether it's streamlined navigation, enhanced performance,
          or delightful visual enhancements, we've got something for everyone.
          Dive in and discover what's new!
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
