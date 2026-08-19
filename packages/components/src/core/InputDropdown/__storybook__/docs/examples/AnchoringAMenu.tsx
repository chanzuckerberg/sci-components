// A DropdownMenu is positioned against an element rather than nested inside
// one, so it needs the input's DOM node. InputDropdown forwards its ref to the
// button it renders, and a callback ref stores that node in state, which is
// what makes the menu re-render once the anchor exists.

import {
  DropdownMenu,
  InputDropdown,
  type DefaultAutocompleteOption,
} from "@czi-sds/components";
import { useState, type SyntheticEvent } from "react";

const OPTIONS: DefaultAutocompleteOption[] = [
  { name: "Chromosome 1" },
  { name: "Chromosome 2" },
  { name: "Chromosome 3" },
];

function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<DefaultAutocompleteOption | null>(null);

  return (
    <div className="app">
      <InputDropdown
        label="Chromosome"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        ref={setAnchorEl}
        sdsStyle="square"
        sdsType="value"
        state={open ? "open" : "default"}
        value={value?.name}
      />

      <DropdownMenu<DefaultAutocompleteOption, false, false, false>
        anchorEl={anchorEl}
        onChange={(
          _event: SyntheticEvent,
          newValue: DefaultAutocompleteOption | null
        ) => {
          setValue(newValue);
          setOpen(false);
        }}
        onClickAway={() => setOpen(false)}
        open={open}
        options={OPTIONS}
        search={false}
        value={value}
      />
    </div>
  );
}

export default App;
