// The paper is capped at the viewport height, so DialogContent scrolls on its
// own and the title and action buttons stay in place.

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@czi-sds/components";

const PARAGRAPH =
  "Explore a diverse range of topics, from fundamental principles to advanced techniques, as we aim to empower you with knowledge that transcends boundaries. Whether you are a novice eager to build a strong foundation or a seasoned professional staying at the forefront of your industry, this material is your gateway to honing your expertise.";

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
          title="Terms of use"
          subtitle="Last updated January 2025"
          onClose={handleClose}
        />
        <DialogContent>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((section) => (
            <p key={section}>
              {section}. {PARAGRAPH}
            </p>
          ))}
        </DialogContent>
        <DialogActions>
          <Button sdsStyle="outline" sdsType="primary" onClick={handleClose}>
            Decline
          </Button>
          <Button sdsStyle="solid" sdsType="primary" onClick={handleClose}>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
