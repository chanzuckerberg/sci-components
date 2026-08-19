import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Beyond its name, an option can carry a count, a line of details, and an icon:
// either an SDS icon name, styled through sdsIconProps, or an element of your
// own. The MenuItem the list renders lays all of that out.
//
// An option can instead carry a component, and then it renders that in place of
// the label. The two are mutually exclusive by type: an option is either a
// described one or a custom one, never both. It still needs a name, which is
// what search matches against and what selection is tracked by.

import {
  Autocomplete,
  Tag,
  type DefaultAutocompleteOption,
} from "@czi-sds/components";

const OPTIONS: DefaultAutocompleteOption[] = [
  { count: 128, name: "T cell" },
  {
    details: "Includes both classical and non-classical subsets",
    name: "Monocyte",
  },
  {
    icon: "TreeVertical",
    name: "Neuron",
    sdsIconProps: { color: "blue", shade: 400 },
  },
  {
    count: 12,
    details: "Awaiting curation",
    icon: "List",
    name: "Unannotated",
    sdsIconProps: { color: "gray", shade: 500 },
  },
  { disabled: true, name: "Platelet" },
  {
    component: (
      <div>
        Available labels
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          <Tag
            color="positive"
            hover={false}
            label="curated"
            sdsStyle="square"
            sdsType="secondary"
          />
          <Tag
            color="notice"
            hover={false}
            label="draft"
            sdsStyle="square"
            sdsType="secondary"
          />
        </div>
      </div>
    ),
    name: "Available labels",
  },
];

function App() {
  return (
    <div className="app">
      <Autocomplete
        label="Search cell types"
        multiple
        options={OPTIONS}
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
`}))();export{t as default};