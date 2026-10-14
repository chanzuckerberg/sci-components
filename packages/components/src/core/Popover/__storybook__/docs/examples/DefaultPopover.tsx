// The least a popover needs: the trigger records itself as the anchor, `open` is
// derived from whether there is one, and `onClose` clears it. The popover owns no
// open state of its own, so nothing closes it unless you do.
//
// anchorEl has to be state rather than a ref, because the popover measures the
// anchor as it renders and so needs a render to happen once the element is known.
//
// The paper pads itself by 6px and 12px, which is why the text below is written
// straight onto it. onClose fires for a backdrop click and for Escape; the second
// argument says which, and is ignored here because both should close.

import { useState } from "react";
import { Button, Popover } from "@czi-sds/components";

function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  return (
    <div className="app">
      <Button
        aria-describedby={open ? "default-popover" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sdsStyle="outline"
        sdsType="primary"
      >
        Open Popover
      </Button>

      <Popover
        anchorEl={anchorEl}
        id="default-popover"
        onClose={() => setAnchorEl(null)}
        open={open}
      >
        Sequencing finished at 14:02.
      </Popover>
    </div>
  );
}

export default App;
