import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// The TooltipCondensed card on the Overview page. See TooltipCard for why the
// catalog stages its components open rather than leaving them to the pointer.
//
// This tooltip follows the cursor and has no anchor of its own to fall back on,
// so held open with no cursor to follow it would sit in the corner of the window.
// anchorEl points it at the cell instead, which is where a pointer over the cell
// would have put it. The popper options are there for the reason given in
// TooltipCard: without them the tooltip creeps off the cell as the page scrolls.

import { CARD_POPPER_OPTIONS } from "@sds-docs/cardPopper";
import {
  TooltipCondensed,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const Stage = styled.div<CommonThemeProps>\`
  \${(props) => {
    const spaces = getSpaces(props);

    return \`
      display: flex;
      justify-content: center;
      padding: \${spaces?.xl}px 0;
    \`;
  }}
\`;

const Cell = styled.div<CommonThemeProps>\`
  \${fontBodyXs}

  \${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return \`
      border: 1px solid \${semanticColors?.base?.divider};
      border-radius: 4px;
      color: \${semanticColors?.base?.textPrimary};
      cursor: default;
      padding: \${spaces?.s}px \${spaces?.m}px;
    \`;
  }}
\`;

function App() {
  const [cell, setCell] = useState<HTMLElement | null>(null);

  return (
    <div className="app">
      <Stage>
        <TooltipCondensed
          open={Boolean(cell)}
          slotProps={{
            popper: { anchorEl: cell, popperOptions: CARD_POPPER_OPTIONS },
          }}
          title="1,284 cells"
        >
          <Cell ref={setCell}>A point in a chart</Cell>
        </TooltipCondensed>
      </Stage>
    </div>
  );
}

export default App;
`}))();export{t as default};