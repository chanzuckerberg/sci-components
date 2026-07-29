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
      <Dialog onClose={handleClose} open={isOpen} sdsSize="xs">
        <DialogTitle
          title="Learning"
          subtitle="Learning Resources"
          onClose={handleClose}
        />
        <DialogContent>
          Embark on a journey of continuous improvement with our treasure trove
          of learning materials. This section hosts an array of tutorials,
          guides, and insightful articles designed to enhance your skills and
          deepen your understanding.
        </DialogContent>
        <DialogActions buttonPosition="right">
          <Button sdsType="secondary" onClick={handleClose}>
            Secondary Action
          </Button>
          <Button sdsType="primary" onClick={handleClose}>
            Primary Action
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
