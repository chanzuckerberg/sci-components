import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// The Popover card on the Overview page. See TooltipCard for why the catalog stages
// its components open, and MenuCard for what an open modal has to be told not to
// do to the page, and why it is placed by hand rather than from its anchor.

import { Button, Popover } from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const PopoverHost = styled.div\`
  position: relative;
\`;

function App() {
  const [host, setHost] = useState<HTMLElement | null>(null);

  return (
    <div className="app">
      <Button sdsStyle="outline" sdsType="primary">
        Open Popover
      </Button>

      <PopoverHost ref={setHost} />

      <Popover
        anchorReference="none"
        container={host}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        disableScrollLock
        open={Boolean(host)}
        slotProps={{
          paper: {
            sx: { maxHeight: "none", maxWidth: "none", width: "max-content" },
          },
          root: { sx: { inset: "auto", position: "absolute" } },
        }}
      >
        Sequencing finished at 14:02.
      </Popover>
    </div>
  );
}

export default App;
`}))();export{t as default};