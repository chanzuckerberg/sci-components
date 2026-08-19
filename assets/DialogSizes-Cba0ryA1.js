import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// \`sdsSize\` sets a fixed paper width and a minimum height. It is forwarded to
// DialogPaper, DialogTitle, and DialogActions, so padding and type scale with it.

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@czi-sds/components";

const SIZES = ["xs", "s", "m", "l"] as const;

const DIMENSIONS = {
  l: "1200 × 600px",
  m: "900 × 480px",
  s: "600 × 400px",
  xs: "400 × 160px",
};

function App() {
  const [openSize, setOpenSize] = useState<(typeof SIZES)[number] | null>(null);

  return (
    <div className="app" style={{ display: "flex", gap: "8px", padding: 20 }}>
      {SIZES.map((size) => (
        <Button
          key={size}
          sdsStyle="outline"
          sdsType="primary"
          onClick={() => setOpenSize(size)}
        >
          Open {size.toUpperCase()}
        </Button>
      ))}

      <Dialog
        open={openSize !== null}
        onClose={() => setOpenSize(null)}
        sdsSize={openSize ?? "m"}
      >
        <DialogTitle
          title={\`Size \${(openSize ?? "m").toUpperCase()}\`}
          subtitle={DIMENSIONS[openSize ?? "m"]}
          onClose={() => setOpenSize(null)}
        />
        <DialogContent>
          The width is fixed per size and the height grows with the content,
          down to the minimum height.
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
`}))();export{t as default};