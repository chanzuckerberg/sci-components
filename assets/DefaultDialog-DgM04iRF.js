import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// A dismissible Dialog: passing \`onClose\` to DialogTitle renders the close
// button, and \`onClose\` on Dialog handles the backdrop click and the Esc key.

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@czi-sds/components";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app" style={{ padding: 20 }}>
      <Button
        sdsStyle="solid"
        sdsType="primary"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle
          title="Learning Resources"
          subtitle="Tutorials, guides, and articles"
          onClose={() => setIsOpen(false)}
        />
        <DialogContent>
          Embark on a journey of continuous improvement with our treasure trove
          of learning materials. This section hosts an array of tutorials,
          guides, and insightful articles designed to enhance your skills and
          deepen your understanding.
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
`}))();export{t as default};