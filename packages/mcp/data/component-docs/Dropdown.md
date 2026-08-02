# Dropdown

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Dropdown/index.tsx).

## SDS vs MUI

SDS's Dropdown component is a combination of two other SDS components: DropdownMenu and InputDropdown, since these would often be used together to create a complete dropdown element in the UI. DropdownMenu is built off of MUI's Autocomplete component, but InputDropdown is built from scratch.

These are a few of the most relevant ways in which SDS's DropdownMenu (which is used within Dropdown) integrates withAutocomplete and other MUI components:

- SDS Dropdown uses [MUI](https://mui.com/material-ui/react-autocomplete/) [Autocomplete](https://mui.com/material-ui/react-autocomplete/) under the hood, so all props passed to DropdownMenu are ultimately passed to the Autocomplete component as well. This means MUI's Autocomplete props can be used on SDS's DropdownMenu if needed.

- SDS Dropdown uses [MUI](https://mui.com/material-ui/react-popper/) [Popper](https://mui.com/material-ui/react-popper/). A custom Popper component can be passed via `props.PopperComponent` and/or `props.PopperBaseProps` to control the popper component.

- Similarly, SDS Dropdown uses [MUI](https://mui.com/material-ui/react-paper/) [Paper](https://mui.com/material-ui/react-paper/). A custom Paper component can be passed via `props.PaperComponent` to enable custom styling.

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name                           | Type                                                             | Default         | Description                                                                                            |
| ------------------------------ | ---------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------ |
| `buttonPosition`               | `"left"` \| `"right"`                                            | `"left"`        | Specifies the position of the Apply/Cancel buttons at the Dropdown footer.                             |
| `buttons`                      | `bool`                                                           | `false`         | When set to `true`, a set of Apply/Cancel buttons will be displayed at the Dropdown footer.            |
| `closeOnBlur`                  | `bool`                                                           | `true`          | When set to `true`, the Dropdown will automatically close when a click occurs outside of it.           |
| `disabled`                     | `bool`                                                           | `false`         | When `true`, the Dropdown is disabled and user interaction is not allowed.                             |
| `isTriggerChangeOnOptionClick` | `bool`                                                           | `false`         | When set to `true`, changes in Dropdown selections are applied in real-time to the react state.        |
| `label`                        | `string`                                                         | -               | The label of the Dropdown.                                                                             |
| `multiple`                     | `bool`                                                           | `true`          | Determines whether the Dropdown allows for multiple item selection.                                    |
| `onChange`                     | `(options: Value<DefaultDropdownMenuOption, Multiple>) => void;` | -               | Callback fired when the value changes.                                                                 |
| `onClose`                      | `func`                                                           | -               | Callback fired when the Dropdown requests to be closed.                                                |
| `search`                       | `bool`                                                           | `true`          | When set to `true`, a search input is displayed at the top of the Dropdown for filtering options.      |
| `dropdownMenuProps`            | `Partial<DropdownMenuProps>`                                     | -               | These props are directly passed to the underlying DropdownMenu component, customizing its behavior.    |
| `options`                      | `Array<DefaultDropdownMenuOption>`                               | -               | An array of options to be displayed as MenuItems within the Dropdown.                                  |
| `InputDropdownProps`           | `Partial<InputDropdownPropsType>`                                | -               | These props are directly passed to the underlying InputDropdown component, customizing its behavior.   |
| `value`                        | `string \| Array<string>`                                        | -               | The current value of the Dropdown, representing the selected item(s) based on the multi-select status. |
| `PopperComponent`              | `element`                                                        | `Paper`         | The component used to render the wrapper of the inner DropdownMenu.                                    |
| `InputDropdownComponent`       | `element`                                                        | `InputDropdown` | The component used to render the Dropdown trigger button.                                              |

## Code Examples

### **Default Dropdown**

This example illustrates the minimum set of props required for rendering a Dropdown component.

**Example: DefaultDropdown**

```tsx
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { Dropdown, DefaultAutocompleteOption } from "@czi-sds/components";

const MENU_ITEMS: DefaultAutocompleteOption[] = [
  {
    name: "Menu item 1",
  },
  {
    name: "Menu item 2",
  },
  {
    name: "Menu item 3",
  },
  {
    name: "Menu item 4",
  },
];

function App() {
  return (
    <div className="app">
      <Dropdown label="Click Target" onChange={() => {}} options={MENU_ITEMS} />
    </div>
  );
}

export default App;
```

### **Multi-select Dropdown with Search**

A search feature can be easily incorporated into the Dropdown component by including the `search` prop.

The search functionality operates by dynamically filtering out non-matching options as the user types, displaying only the menu items whose text corresponds to that input. If no matching items are found, the Dropdown will automatically present "No options" below the search bar.

To ensure that the search input retains its text even after a user selects a menu item (when multiple selections are allowed), set the `keepSearchOnSelect` prop to `true` within the `DropdownMenuProps` prop. This allows users to conveniently choose multiple menu items that match the searched term without the need to re-enter it for each selection.

**Example: MultiSelectDropdownWithSearch**

```tsx
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
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

const POPPER_BASE_PROPS = { popperOptions: { strategy: "absolute" as const } };

function handleClickAway() {}

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current]);

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
```
