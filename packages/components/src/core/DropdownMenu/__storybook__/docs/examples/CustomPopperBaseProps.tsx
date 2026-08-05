// DropdownMenu with custom `PopperBaseProps`

import { useEffect, useRef, useState } from "react";
import { DropdownMenu, DefaultAutocompleteOption } from "@czi-sds/components";

const MENU_ITEMS: DefaultAutocompleteOption[] = [
  {
    name: "Menu item 1",
  },
  {
    name: "Menu item 2",
  },
  {
    name: "Menu item 3",
  },
  {
    name: "Longer menu item than the others",
  },
];

const POPPER_BASE_PROPS = {
  className: "popper",
  sx: {
    width: 500,
    borderColor: "salmon",
    borderWidth: 10,
  },
  popperOptions: { strategy: "absolute" as const },
};

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
        // 👇 Only pay attention to the props here, everything else is just glue to mount the example
        <DropdownMenu
          PopperBaseProps={POPPER_BASE_PROPS}
          anchorEl={ref.current}
          onClickAway={function handleClickAway() {}}
          open
          options={MENU_ITEMS}
        />
      )}
    </div>
  );
}

export default App;
