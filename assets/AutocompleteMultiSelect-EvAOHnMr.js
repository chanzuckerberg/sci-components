import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// multiple keeps the list open after each pick and marks the chosen options
// with a checkmark. It does not show them in the input: the field always shows
// its label, because that is the parent's job in SDS: a DropdownMenu sits
// under an InputDropdown that reports the selection.
//
// Making it controlled is the way to read the selection out. The handler is
// given the whole value, not the option that changed, so it can be stored as
// is; details.option holds the one that was just added or removed.
//
// keepSearchOnSelect leaves the typed text in place after a pick, so several
// matches for the same search can be selected without retyping it.

import { useState } from "react";
import {
  Autocomplete,
  type AutocompleteSingleColumnOnChange,
  type DefaultAutocompleteOption,
} from "@czi-sds/components";

const OPTIONS: DefaultAutocompleteOption[] = [
  { name: "Astrocyte" },
  { name: "B cell" },
  { name: "Endothelial cell" },
  { name: "Fibroblast" },
  { name: "Macrophage" },
  { name: "Neuron" },
  { name: "T cell" },
];

function App() {
  const [selected, setSelected] = useState<DefaultAutocompleteOption[]>([]);

  // Pinning the generics is what makes the handler's value typed: multiple,
  // not clearable-disabled, not freeSolo, so the value is an array of options.
  const handleChange: AutocompleteSingleColumnOnChange<
    DefaultAutocompleteOption,
    true,
    false,
    false
  > = (_event, value) => setSelected(value);

  return (
    <div className="app">
      <Autocomplete<DefaultAutocompleteOption, true, false, false>
        keepSearchOnSelect
        label="Search cell types"
        multiple
        options={OPTIONS}
        search
        value={selected}
        onChange={handleChange}
        InputBaseProps={{
          style: {
            width: "280px",
          },
        }}
      />
    </div>
  );
}

export default App;
`}))();export{t as default};