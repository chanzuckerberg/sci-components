// Dropdown with grouped sections

import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultDropdownMenuOption } from "@czi-sds/components";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
  {
    name: "Menu item with count",
    count: 3,
  },
  {
    name: "Menu item with details",
    details: "Details",
  },
  {
    name: "Menu item with icon",
    icon: "PuzzlePiece",
  },
  {
    name: "Menu item with icon that has its own props",
    icon: "Copy",
    sdsIconProps: {
      className: "custom-class-name",
      color: "red",
    },
  },
  {
    name: "Menu item with count, details, & icon",
    count: 908,
    details: "Details",
    icon: "LightBulb",
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
    <div className="app" style={{ paddingLeft: "10px" }}>
      <div ref={ref} />
      {open && (
        // 👇 Only pay attention to the props here, everything else is just Zeroheight glue code
        <DropdownMenu
          PopperBaseProps={POPPER_BASE_PROPS}
          anchorEl={ref.current}
          groupBy={(option: DefaultDropdownMenuOption) => {
            return option.section as string;
          }}
          onClickAway={handleClickAway}
          open
          options={MENU_ITEMS}
        />
      )}
    </div>
  );
}

export default App;
