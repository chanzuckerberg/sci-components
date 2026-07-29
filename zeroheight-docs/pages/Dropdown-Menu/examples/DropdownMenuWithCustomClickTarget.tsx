// DropdownMenu with custom click target

import React, { SyntheticEvent, useState, useRef } from "react";
import {
  DropdownMenu,
  DefaultDropdownMenuOption,
  InputDropdown,
} from "@czi-sds/components";

function App() {
  const MENU_ITEMS: DefaultDropdownMenuOption[] = [
    {
      name: "Menu item 1",
    },
    {
      name: "Menu item 2",
    },
    {
      name: "Menu item 3",
    },
  ];

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<DefaultDropdownMenuOption | null>(null);

  function handleClick(event: SyntheticEvent<HTMLElement>) {
    if (open) {
      setOpen(false);
      if (anchorEl) {
        anchorEl.focus();
      }
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  }

  function handleChange(
    _: SyntheticEvent,
    newValue: DefaultDropdownMenuOption | null
  ) {
    setOpen(false);
    setValue(newValue);
  }

  function handleClickAway() {
    return open && setOpen(false);
  }

  return (
    <div className="app">
      <InputDropdown
        onClick={handleClick}
        label="Click Target"
        sdsType="label"
        sdsStyle="minimal"
      />
      <DropdownMenu<DefaultDropdownMenuOption, false, false, false>
        options={MENU_ITEMS}
        anchorEl={anchorEl}
        open={!!open}
        onChange={handleChange}
        value={value}
        onClickAway={handleClickAway}
      />
    </div>
  );
}

export default App;
