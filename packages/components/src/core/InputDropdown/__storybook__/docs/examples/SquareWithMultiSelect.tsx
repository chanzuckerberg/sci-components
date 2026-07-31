import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import {
  InputDropdown,
  DropdownMenu,
  DefaultAutocompleteOption,
} from "@czi-sds/components";

const options = [
  {
    details: "Details",
    name: "Menu Item 1",
  },
  {
    details: "A very long Details for the second Menu Item",
    name: "Menu Item 2",
  },
  {
    name: "Menu Item 3",
  },
];

function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [details, setDetials] = useState<string>();
  const [counter, setCounter] = useState<string>();
  const [inputDropdownValue, setInputDropdownValue] = useState<string>();
  const [value, setValue] = useState<DefaultAutocompleteOption[]>([]);
  const [pendingValue, setPendingValue] = useState<DefaultAutocompleteOption[]>(
    []
  );

  return (
    <div className="app">
      <InputDropdown
        label="Label"
        onClick={handleClick}
        sdsStyle="square"
        multiple
        value={inputDropdownValue}
        counter={counter}
      />
      <DropdownMenu<DefaultAutocompleteOption, true, false, false>
        open={open}
        anchorEl={anchorEl}
        onClose={() => {}}
        onChange={handleChange}
        search={false}
        multiple
        disableCloseOnSelect
        options={options}
        value={pendingValue}
        onClickAway={handleClickAway}
      />
    </div>
  );

  function handleClick(event: React.MouseEvent<HTMLElement>) {
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
    _: React.SyntheticEvent<Element, Event>,
    newValue: DefaultAutocompleteOption[]
  ) {
    setPendingValue(newValue);
    setCounter(newValue.length.toString());
  }

  function handleClickAway() {
    if (open) {
      setOpen(false);
    }
    setValue(pendingValue);
  }
}

export default App;
