# ComplexFilter

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/ComplexFilter/index.tsx).

## Import

**React TypeScript**

```tsx
import { ComplexFilter } from "@czi-sds/components";
```

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
        InputDropdownProps={{
          sdsStyle: "square",
        }}
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
        InputDropdownProps={{
          sdsStyle: "square",
          width: "280px",
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

### ComplexFilter that closes on blur

A single select puts its menu away as soon as something is chosen, but a multi select has no such moment and holds the menu open even when a click lands outside it. `closeOnBlur` gives it one: a click anywhere else closes the menu, keeping whatever had been selected by then. The prop is ignored while the Apply and Cancel buttons are showing, those being that menu's own way out, so the filter here uses `isTriggerChangeOnOptionClick` instead and applies each selection as it is made.

**Example: ComplexFilterThatClosesOnBlur**

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
        InputDropdownProps={{
          sdsStyle: "square",
        }}
        multiple
        isTriggerChangeOnOptionClick
        closeOnBlur
      />
    </div>
  );
}

export default App;
```

## SDS vs MUI

The ComplexFilter is not directly based on any MUI component, but it does use the SDS Dropdown component, which in turn is ultimately based on [MUI's Autocomplete component](https://mui.com/material-ui/react-autocomplete/). As such, props that are available to either SDS's Dropdown and / or MUI's Autocomplete can be passed to ComplexFilter as such:

- `DropdownMenuProps`: use this prop to pass MUIAutocomplete-specific props to ComplexFilter

- `InputDropdownProps`: use this prop to pass SDS InputDropdown-specific props to ComplexFilter

## Props

Any custom SDS props and MUI props required for implementation are found in the table below. See the MUI documentation for additional optional props.

| Name                           | Type                                                                          | Default                   | Description                                                                                                                                                                                                                                                                                                                           |
| ------------------------------ | ----------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `buttonPosition`               | `"left" \| "right"`                                                           | `"right"`                 | Which side of the menu footer the Apply and Cancel buttons sit on. It only applies alongside `buttons`.                                                                                                                                                                                                                               |
| `buttons`                      | `boolean`                                                                     | `false`                   | Puts Apply and Cancel buttons at the foot of the menu, so selections take effect only once Apply is pressed.                                                                                                                                                                                                                          |
| `closeOnBlur`                  | `boolean`                                                                     | `false`                   | Closes the filter when a click lands outside it, which it otherwise does not do. It is ignored while the Apply and Cancel buttons are showing, which is a multi select that has not been given `isTriggerChangeOnOptionClick`. The default follows `buttons`, so a filter given `buttons={false}` closes on blur without being asked. |
| `isTriggerChangeOnOptionClick` | `boolean`                                                                     | `false`                   | Determines whether changes are triggered in real-time upon clicking an option                                                                                                                                                                                                                                                         |
| `keepSearchOnSelect`           | `boolean`                                                                     |                           | Maintains a search input when a user selects an option (only if multiple selections are allowed via the `multiple` prop; otherwise the dropdown closes upon selection)                                                                                                                                                                |
| `label`                        | `ReactNode`                                                                   | `""`                      | Sets the label of filter, shown both when closed and open                                                                                                                                                                                                                                                                             |
| `multiple`                     | `boolean`                                                                     | `false`                   | Defines whether multiple selections or can be made from the filter simultaneously or only one                                                                                                                                                                                                                                         |
| `onChange`                     | `function`                                                                    | -                         | Function to set what happens when a new value is set via the filter                                                                                                                                                                                                                                                                   |
| `options`                      | `AutocompleteSingleColumnOption<T>[]` \| `AutocompleteMultiColumnOption<T>[]` | -                         | The items to filter by. Passing the multi-column shape lays the menu out in named columns instead of one list.                                                                                                                                                                                                                        |
| `search`                       | `boolean`                                                                     | `false`                   | Provides a search bar at the top of the filter from which users can narrow the list of menu items                                                                                                                                                                                                                                     |
| `value`                        | `T \| T[] \| null`                                                            | -                         | The selected option or options. Leaving it out lets the filter keep track of the selection itself, and passing it makes the filter controlled: the tags and menu then only change when a new value comes back in.                                                                                                                     |
| `DropdownMenuProps`            | `Partial<DropdownMenuProps>`                                                  | -                         | Passed straight to the menu, and with it to MUI's Autocomplete underneath.                                                                                                                                                                                                                                                            |
| `InputDropdownProps`           | `Partial<InputDropdownProps>`                                                 | `{ sdsStyle: "minimal" }` | Passed straight to the InputDropdown that opens the filter. Note that supplying it replaces the default, so a filter that should stay minimal needs `sdsStyle` passed again alongside whatever else it sets.                                                                                                                          |
