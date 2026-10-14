// The Menu card on the Overview page. See TooltipCard for why the catalog stages
// its components open.
//
// A Menu is a modal underneath, and a card can afford none of a modal's habits: it
// mounts itself at the end of the document, hides everything else there from
// assistive technology, holds the page still, and takes focus. container mounts it
// in the card instead, where the only thing it hides is a div of its own, and the
// rest is turned off. A page of fifty cards has to stay a page.
//
// A Menu also places itself from its anchor's coordinates on screen, which the
// card's scale leaves meaningless - the surface lands somewhere off in the frame.
// anchorReference="none" drops that arithmetic, and the host below is what the
// surface is drawn from instead: a box of no size, in flow under the button. A
// surface measures itself against the box it is drawn in, so this one has to be
// told to take its own size rather than that of a point.

import { Button, Menu, MenuItem } from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const MenuHost = styled.div`
  position: relative;
`;

function App() {
  const [host, setHost] = useState<HTMLElement | null>(null);

  return (
    <div className="app">
      <Button sdsStyle="minimal" sdsType="primary">
        Open Menu
      </Button>

      <MenuHost ref={setHost} />

      <Menu
        anchorReference="none"
        container={host}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        disableScrollLock
        open={Boolean(host)}
        slotProps={{
          list: { autoFocus: false, autoFocusItem: false },
          paper: {
            sx: { maxHeight: "none", maxWidth: "none", width: "max-content" },
          },
          root: { sx: { inset: "auto", position: "absolute" } },
        }}
      >
        <MenuItem sdsType="action">Contact us</MenuItem>
        <MenuItem sdsType="action">Terms of Use</MenuItem>
        <MenuItem sdsType="action">Privacy Policy</MenuItem>
        <MenuItem sdsType="action">Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
