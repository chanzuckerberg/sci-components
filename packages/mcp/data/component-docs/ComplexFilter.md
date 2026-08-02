# ComplexFilter

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/ComplexFilter/index.tsx).

## SDS vs MUI

The ComplexFilter is not directly based on any MUI component, but it does use the SDS Dropdown component, which in turn is ultimately based on [MUI's Autocomplete component](https://mui.com/material-ui/react-autocomplete/). As such, props that are available to either SDS's Dropdown and / or MUI's Autocomplete can be passed to ComplexFilter as such:

- `DropdownMenuProps`: use this prop to pass MUIAutocomplete-specific props to ComplexFilter

- `InputDropdownProps`: use this prop to pass SDS InputDropdown-specific props to ComplexFilter

## Props

Any custom SDS props and MUI props required for implementation are found in the table below. See the MUI documentation for additional optional props.

| Name                           | Type     | Default | Description                                                                                                                                                            |
| ------------------------------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isTriggerChangeOnOptionClick` | `bool`   | `false` | Determines whether changes are triggered in real-time upon clicking an option                                                                                          |
| `keepSearchOnSelect`           | `bool`   |         | Maintains a search input when a user selects an option (only if multiple selections are allowed via the `multiple` prop; otherwise the dropdown closes upon selection) |
| `label`                        | `string` | `""`    | Sets the label of filter, shown both when closed and open                                                                                                              |
| `multiple`                     | `bool`   | `false` | Defines whether multiple selections or can be made from the filter simultaneously or only one                                                                          |
| `onChange`                     | `func`   | -       | Function to set what happens when a new value is set via the filter                                                                                                    |
| `search`                       | `bool`   | `false` | Provides a search bar at the top of the filter from which users can narrow the list of menu items                                                                      |

## Code Examples

### Default ComplexFilter

This examples demonstrates the minimum props needed to render a ComplexFilter.

**Example: DefaultComplexFilter**

```tsx
import { ComplexFilter, DefaultAutocompleteOption } from "@czi-sds/components";

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
      />
    </div>
  );
}

export default App;
```

### Multi select ComplexFilter with Search

This example showcases a ComplexFilter component featuring InputSearch for filtering menu items. Users have the flexibility to select multiple options to refine their selections.

**Example: MultiSelectComplexFilterWithSearch**

```tsx
import { ComplexFilter, DefaultAutocompleteOption } from "@czi-sds/components";

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
        multiple
        search
      />
    </div>
  );
}

export default App;
```

### ComplexFilter with realtime selection changes

This example showcases the functionality that enables the dropdown selections to be instantly reflected in the tags in real-time. This is achieved by utilizing the `isTriggerChangeOnOptionClick` prop.

**Example: ComplexFilterWithRealtimeSelectionChanges**

```tsx
import { ComplexFilter, DefaultAutocompleteOption } from "@czi-sds/components";

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
        multiple
        search
        isTriggerChangeOnOptionClick
      />
    </div>
  );
}

export default App;
```
