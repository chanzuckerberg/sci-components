import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// An option needs nothing but a name: it is the label, the key, and what
// equality is judged on. Everything else an option can carry is optional.
//
// search gives the component its visible text field. Without it the input is
// hidden and the list has to be opened by a parent, which is how DropdownMenu
// drives it.
//
// The component fills its container, so the width comes from the wrapper.

import {
  Autocomplete,
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
  return (
    <div className="app">
      <Autocomplete label="Search cell types" options={OPTIONS} search />
    </div>
  );
}

export default App;
`}))();export{t as default};