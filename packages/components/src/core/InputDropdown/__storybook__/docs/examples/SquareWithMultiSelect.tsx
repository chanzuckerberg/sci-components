import { MouseEvent, SyntheticEvent, useState } from "react";
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
  const [counter, setCounter] = useState<string>();
  const [value, setValue] = useState<DefaultAutocompleteOption[]>([]);

  return (
    <div className="app">
      <InputDropdown
        label="Label"
        onClick={handleClick}
        sdsStyle="square"
        multiple
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
        value={value}
        onClickAway={handleClickAway}
      />
    </div>
  );

  function handleClick(event: MouseEvent<HTMLElement>) {
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
    _: SyntheticEvent<Element, Event>,
    newValue: DefaultAutocompleteOption[]
  ) {
    setValue(newValue);
    setCounter(newValue.length.toString());
  }

  function handleClickAway() {
    if (open) {
      setOpen(false);
    }
  }
}

export default App;
