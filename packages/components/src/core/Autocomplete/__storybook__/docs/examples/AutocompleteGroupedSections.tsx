// groupBy sorts the list into labelled sections. It reads whatever the callback
// returns, so section is only a convention: any field, or a value computed on
// the spot, will do.
//
// The list is not reordered for you: options are grouped in the order they
// arrive, so an option that repeats a section already passed starts a second
// section with the same heading. Sort the options the way the sections should
// read before handing them over.
//
// open is set here only so the sections are visible on the page; normally the
// field opens itself when it is clicked.

import {
  Autocomplete,
  type DefaultAutocompleteOption,
} from "@czi-sds/components";

const OPTIONS: DefaultAutocompleteOption[] = [
  { name: "Astrocyte", section: "Nervous" },
  { name: "Neuron", section: "Nervous" },
  { name: "Oligodendrocyte", section: "Nervous" },
  { name: "B cell", section: "Immune" },
  { name: "Macrophage", section: "Immune" },
  { name: "T cell", section: "Immune" },
  { name: "Endothelial cell", section: "Structural" },
  { name: "Fibroblast", section: "Structural" },
];

function App() {
  return (
    <div className="app" style={{ width: 280 }}>
      <Autocomplete
        groupBy={(option) => option.section as string}
        label="Search cell types"
        multiple
        open
        options={OPTIONS}
        search
      />
    </div>
  );
}

export default App;
