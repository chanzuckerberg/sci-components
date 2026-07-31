// multiple keeps the list open after each pick and marks the chosen options
// with a checkmark. It does not show them in the input: the field always shows
// its label, because that is the parent's job in SDS — a DropdownMenu sits
// under an InputDropdown that reports the selection.
//
// Making it controlled is the way to read the selection out. The handler is
// given the whole value, not the option that changed, so it can be stored as
// is; details.option holds the one that was just added or removed.
//
// keepSearchOnSelect leaves the typed text in place after a pick, so several
// matches for the same search can be selected without retyping it.
//
// open is set here only so the list is visible on the page.

import { useState } from "react";
import {
  Autocomplete,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type AutocompleteSingleColumnOnChange,
  type CommonThemeProps,
  type DefaultAutocompleteOption,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const OPTIONS: DefaultAutocompleteOption[] = [
  { name: "Astrocyte" },
  { name: "B cell" },
  { name: "Endothelial cell" },
  { name: "Fibroblast" },
  { name: "Macrophage" },
  { name: "Neuron" },
  { name: "T cell" },
];

const Readout = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: 0 0 ${spaces?.m}px;
    `;
  }}
`;

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
    <div className="app" style={{ width: 280 }}>
      <Readout>
        {selected.length
          ? selected.map((option) => option.name).join(", ")
          : "Nothing selected."}
      </Readout>

      <Autocomplete<DefaultAutocompleteOption, true, false, false>
        keepSearchOnSelect
        label="Search cell types"
        multiple
        open
        options={OPTIONS}
        search
        value={selected}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
