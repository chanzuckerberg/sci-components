import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// \`overline\` sits above the title and is the recommended place for the step
// count in a multi-step workflow.

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@czi-sds/components";

const STEPS = [
  {
    body: "Pick the files you want to include. You can add more later.",
    title: "Select your data",
  },
  {
    body: "Choose the reference genome and the quality thresholds for the run.",
    title: "Configure the analysis",
  },
  {
    body: "Everything looks good. Starting the run will queue it immediately.",
    title: "Review and submit",
  },
];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  function handleClose() {
    setIsOpen(false);
    setStep(0);
  }

  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="app" style={{ padding: 20 }}>
      <Button
        sdsStyle="solid"
        sdsType="primary"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </Button>

      <Dialog
        open={isOpen}
        onClose={handleClose}
        canClickOutsideClose={false}
        sdsSize="s"
      >
        <DialogTitle
          overline={\`Step \${step + 1} of \${STEPS.length}\`}
          title={STEPS[step].title}
          subtitle="New analysis"
        />
        <DialogContent>{STEPS[step].body}</DialogContent>
        <DialogActions>
          <Button
            sdsStyle="outline"
            sdsType="primary"
            onClick={() => (step === 0 ? handleClose() : setStep(step - 1))}
          >
            {step === 0 ? "Cancel" : "Back"}
          </Button>
          <Button
            sdsStyle="solid"
            sdsType="primary"
            onClick={() => (isLastStep ? handleClose() : setStep(step + 1))}
          >
            {isLastStep ? "Start run" : "Next"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
`}))();export{t as default};