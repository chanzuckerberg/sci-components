import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// The DropdownMenu card on the Overview page. See TooltipCard for why the catalog
// stages its components open.
//
// The menu is a popper rather than a modal, so it needs nothing beyond an anchor
// and open: the previews' theme keeps poppers in place, and there is no page state
// to protect.

import {
  DropdownMenu,
  InputDropdown,
  type DefaultAutocompleteOption,
} from "@czi-sds/components";
import { useState } from "react";

const MENU_ITEMS: DefaultAutocompleteOption[] = [
  { name: "Menu item 1" },
  { name: "Menu item 2" },
  { name: "Menu item 3" },
];

function App() {
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  return (
    <div className="app">
      <InputDropdown
        label="Click Target"
        onClick={() => {}}
        ref={setTrigger}
        sdsStyle="minimal"
        sdsType="label"
      />

      <DropdownMenu<DefaultAutocompleteOption, false, false, false>
        anchorEl={trigger}
        isSearchAutoFocus={false}
        onChange={() => {}}
        open={Boolean(trigger)}
        options={MENU_ITEMS}
        value={null}
      />
    </div>
  );
}

export default App;
`}))();export{t as default};