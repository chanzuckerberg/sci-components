import { Dropdown, DefaultAutocompleteOption } from "@czi-sds/components";

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
      <Dropdown
        label="Click Target"
        onChange={() => {}}
        options={MENU_ITEMS}
        search
        multiple
        DropdownMenuProps={{
          keepSearchOnSelect: true,
          groupBy: (option: DefaultAutocompleteOption) =>
            option.section as string,
        }}
      />
    </div>
  );
}

export default App;
