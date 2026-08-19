import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`import { ComplexFilter, DefaultAutocompleteOption } from "@czi-sds/components";

const MENU_ITEMS: DefaultAutocompleteOption[] = [
  {
    name: "Fruit: Apple",
    section: "Fruit",
    count: 10,
  },
  {
    name: "Fruit: Cherry",
    section: "Fruit",
    count: 150,
  },
  {
    name: "Fruit: Orange",
    section: "Fruit",
    count: 15,
  },
  {
    name: "Vegetable: Carrot",
    section: "Vegetable",
    count: 34,
  },
  {
    name: "Vegetable: Kale",
    section: "Vegetable",
  },
  {
    name: "Vegetable: Lettuce",
    section: "Vegetable",
  },
];

function App() {
  return (
    <div className="app">
      <ComplexFilter
        label="Filter Label"
        onChange={() => {}}
        options={MENU_ITEMS}
        DropdownMenuProps={{
          groupBy: (option: DefaultAutocompleteOption) =>
            option.section as string,
        }}
        InputDropdownProps={{
          sdsStyle: "square",
        }}
        multiple
        search
      />
    </div>
  );
}

export default App;
`}))();export{t as default};