// DropdownMenu with search

import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultAutocompleteOption } from "@czi-sds/components";

const MENU_ITEMS: DefaultAutocompleteOption[] = [
  {
    name: "Fruit: Apple",
  },
  {
    name: "Fruit: Orange",
  },
  {
    name: "Vegetable: Carrot",
  },
  {
    name: "Vegetable: Kale",
  },
];

const POPPER_BASE_PROPS = { popperOptions: { strategy: "absolute" as const } };

function handleClickAway() {}

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current]);

  return (
    <div className="app">
      <div ref={ref} />
      {open && (
        // 👇 Only pay attention to the props here, everything else is just Zeroheight glue code
        <DropdownMenu
          PopperBaseProps={POPPER_BASE_PROPS}
          anchorEl={ref.current}
          noOptionsText="No matches found, try again!"
          onClickAway={handleClickAway}
          open
          options={MENU_ITEMS}
          search
        />
      )}
    </div>
  );
}

export default App;
