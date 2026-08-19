// The Dropdown card on the Overview page. See TooltipCard for why the catalog
// stages its components open.
//
// Dropdown keeps its own open state and offers no prop to set it, so the menu is
// opened through DropdownMenuProps, which Dropdown spreads over the props it
// passes down. The anchor is the wrapper around the trigger rather than the
// trigger itself, which Dropdown renders and does not hand back.

import { Dropdown, type DefaultAutocompleteOption } from "@czi-sds/components";
import { useState } from "react";

const MENU_ITEMS: DefaultAutocompleteOption[] = [
  { name: "Menu item 1" },
  { name: "Menu item 2" },
  { name: "Menu item 3" },
  { name: "Menu item 4" },
];

function App() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <div className="app">
      <div ref={setAnchor}>
        <Dropdown
          DropdownMenuProps={{
            anchorEl: anchor,
            isSearchAutoFocus: false,
            open: Boolean(anchor),
          }}
          label="Click Target"
          onChange={() => {}}
          options={MENU_ITEMS}
        />
      </div>
    </div>
  );
}

export default App;
