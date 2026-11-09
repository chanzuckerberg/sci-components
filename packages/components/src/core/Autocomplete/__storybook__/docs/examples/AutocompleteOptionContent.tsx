// Beyond its name, an option can carry a count, a line of details, and an icon,
// usually a Phosphor or @czi-sds/icons icon. The MenuItem the list renders lays
// all of that out, and draws the icon at its own size, in blue unless the icon
// sets a color of its own.
//
// An option can instead carry a component, and then it renders that in place of
// the label. The two are mutually exclusive by type: an option is either a
// described one or a custom one, never both. It still needs a name, which is
// what search matches against and what selection is tracked by.

import { useTheme } from "@mui/material";
import { GitBranchIcon, ListBulletsIcon } from "@phosphor-icons/react";
import {
  Autocomplete,
  Tag,
  getColors,
  type DefaultAutocompleteOption,
} from "@czi-sds/components";

function App() {
  const colors = getColors({ theme: useTheme() });

  const options: DefaultAutocompleteOption[] = [
    { count: 128, name: "T cell" },
    {
      details: "Includes both classical and non-classical subsets",
      name: "Monocyte",
    },
    {
      icon: <GitBranchIcon weight="bold" />,
      name: "Neuron",
    },
    {
      count: 12,
      details: "Awaiting curation",
      icon: <ListBulletsIcon weight="bold" color={colors?.gray[500]} />,
      name: "Unannotated",
    },
    { disabled: true, name: "Platelet" },
    {
      component: (
        <div>
          Available labels
          <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
            <Tag color="positive" label="curated" sdsStyle="outline" />
            <Tag color="notice" label="draft" sdsStyle="outline" />
          </div>
        </div>
      ),
      name: "Available labels",
    },
  ];

  return (
    <div className="app">
      <Autocomplete
        label="Search cell types"
        multiple
        options={options}
        search
        InputBaseProps={{
          style: {
            width: "320px",
          },
        }}
      />
    </div>
  );
}

export default App;
