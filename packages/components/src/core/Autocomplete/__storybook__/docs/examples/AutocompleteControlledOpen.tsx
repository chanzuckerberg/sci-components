// Without search there is no visible field, so the list has to be opened from
// outside: pass open, and use onClick and onClickAway to keep it in step with
// whatever does the opening. This is the arrangement DropdownMenu wraps up.
// Reach for it first, and do this only when you need the list somewhere a
// popper cannot go.
//
// onClick fires when the component asks to open, onClickAway when it asks to
// close, and both are advisory. Nothing happens until the state says so.

import { useState } from "react";
import {
  Autocomplete,
  Button,
  type DefaultAutocompleteOption,
} from "@czi-sds/components";

const OPTIONS: DefaultAutocompleteOption[] = [
  { name: "Astrocyte" },
  { name: "B cell" },
  { name: "Endothelial cell" },
  { name: "Fibroblast" },
  { name: "Macrophage" },
  { name: "Neuron" },
];

function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className="app" style={{ width: 280 }}>
      <Button
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        sdsStyle="outline"
        sdsType="secondary"
      >
        {open ? "Hide options" : "Show options"}
      </Button>

      <Autocomplete
        multiple
        open={open}
        options={OPTIONS}
        onClickAway={() => setOpen(false)}
      />
    </div>
  );
}

export default App;
