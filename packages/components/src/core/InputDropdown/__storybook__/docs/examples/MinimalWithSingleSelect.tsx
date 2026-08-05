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
  const [details, setDetails] = useState<string>();
  const [inputDropdownValue, setInputDropdownValue] = useState<string>();
  const [value, setValue] = useState<DefaultAutocompleteOption | null>(null);

  return (
    <div className="app">
      <InputDropdown
        label="Label"
        onClick={handleClick}
        sdsType="value"
        sdsStyle="minimal"
        multiple={false}
        details={details}
        value={inputDropdownValue}
        style={{ maxWidth: 250 }}
      />
      <DropdownMenu<DefaultAutocompleteOption, false, false, false>
        open={open}
        anchorEl={anchorEl}
        onClose={() => {}}
        onChange={handleChange}
        search={false}
        multiple={false}
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
    newValue: DefaultAutocompleteOption | null
  ) {
    setOpen(false);
    setValue(newValue);

    if (newValue) {
      setInputDropdownValue(newValue.name);

      if (newValue?.details) setDetails(newValue?.details);
      else setDetails(undefined);
    } else {
      setDetails(undefined);
      setInputDropdownValue(undefined);
    }
  }

  function handleClickAway() {
    if (open) {
      setOpen(false);
    }
  }
}

export default App;
