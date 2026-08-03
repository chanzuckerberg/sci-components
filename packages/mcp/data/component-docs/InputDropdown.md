# InputDropdown

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/InputDropdown/index.tsx).

## Import

**React TypeScript**

```tsx
import { InputDropdown } from "@czi-sds/components";
```

## Code examples

### Default

This example has the minimum props needed for the InputDropdown component.

**Example: Default**

```tsx
// Most minimal InputDropdown (just has the basic requirements)

import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { InputDropdown } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <InputDropdown label="Label" onClick={() => {}} />
    </div>
  );
}

export default App;
```

**MUI Tip:** To ensure the InputDropdown button expands to fit the width of its container, users can utilize the `fullWidth` prop provided by MUI. When set to `true`, the `fullWidth` prop enables the InputDropdown button to occupy the entire available width within its parent container.

### Square with multi-select

Below is an example demonstrating the combined utilization of the InputDropdown component and a multi-select Dropdown component. The Dropdown allows multiple selections, while the InputDropdown features a square variant.

**Example: SquareWithMultiSelect**

```tsx
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import {
  InputDropdown,
  DropdownMenu,
  DefaultAutocompleteOption,
} from "@czi-sds/components";

const options = [
  {
    details: "Details",
    name: "Menu Item 1",
  },
  {
    details: "A very long Details for the second Menu Item",
    name: "Menu Item 2",
  },
  {
    name: "Menu Item 3",
  },
];

function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [details, setDetials] = useState<string>();
  const [counter, setCounter] = useState<string>();
  const [inputDropdownValue, setInputDropdownValue] = useState<string>();
  const [value, setValue] = useState<DefaultAutocompleteOption[]>([]);
  const [pendingValue, setPendingValue] = useState<DefaultAutocompleteOption[]>(
    []
  );

  return (
    <div className="app">
      <InputDropdown
        label="Label"
        onClick={handleClick}
        sdsStyle="square"
        multiple
        value={inputDropdownValue}
        counter={counter}
      />
      <DropdownMenu<DefaultAutocompleteOption, true, false, false>
        open={open}
        anchorEl={anchorEl}
        onClose={() => {}}
        onChange={handleChange}
        search={false}
        multiple
        disableCloseOnSelect
        options={options}
        value={pendingValue}
        onClickAway={handleClickAway}
      />
    </div>
  );

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (open) {
      setOpen(false);

      if (anchorEl) {
        anchorEl.focus();
      }

      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  }

  function handleChange(
    _: React.SyntheticEvent<Element, Event>,
    newValue: DefaultAutocompleteOption[]
  ) {
    setPendingValue(newValue);
    setCounter(newValue.length.toString());
  }

  function handleClickAway() {
    if (open) {
      setOpen(false);
    }
    setValue(pendingValue);
  }
}

export default App;
```

### Rounded with single-select

Below is an example demonstrating the combined utilization of the default label variant InputDropdown component and a single-select Dropdown component.

**Example: RoundedWithSingleSelect**

```tsx
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import {
  InputDropdown,
  DropdownMenu,
  DefaultAutocompleteOption,
} from "@czi-sds/components";

const options = [
  {
    details: "Details",
    name: "Menu Item 1",
  },
  {
    details: "A very long Details for the second Menu Item",
    name: "Menu Item 2",
  },
  {
    name: "Menu Item 3",
  },
];

function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [details, setDetials] = useState<string>();
  const [inputDropdownValue, setInputDropdownValue] = useState<string>();
  const [value, setValue] = useState<DefaultAutocompleteOption | null>(null);

  return (
    <div className="app">
      <InputDropdown
        label="Label"
        onClick={handleClick}
        sdsStyle="rounded"
        multiple={false}
        value={inputDropdownValue}
      />
      <DropdownMenu<DefaultAutocompleteOption, false, false, false>
        open={open}
        anchorEl={anchorEl}
        onClose={() => {}}
        onChange={handleChange}
        search={false}
        multiple={false}
        disableCloseOnSelect
        options={options}
        value={value}
        onClickAway={handleClickAway}
      />
    </div>
  );

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (open) {
      setOpen(false);

      if (anchorEl) {
        anchorEl.focus();
      }

      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  }

  function handleChange(
    _: React.SyntheticEvent<Element, Event>,
    newValue: DefaultAutocompleteOption | null
  ) {
    setOpen(false);
    setValue(newValue);

    if (newValue) {
      setInputDropdownValue(newValue.name);

      if (newValue?.details) setDetials(newValue?.details);
      else setDetials(undefined);
    } else {
      setDetials(undefined);
      setInputDropdownValue(undefined);
    }
  }

  function handleClickAway() {
    if (open) {
      setOpen(false);
    }
  }
}

export default App;
```

### Minimal with single-select

An example of the combined use of the value variation InputDropdown component and a single-select Dropdown component is shown below.

**Warning:** The value variant can not be used in conjunction with the multi-select Dropdowns. If you set `sdsType="value"` and `multiple="true"`, the component will default to showing a label and a counter instead.

**Example: MinimalWithSingleSelect**

```tsx
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import {
  InputDropdown,
  DropdownMenu,
  DefaultAutocompleteOption,
} from "@czi-sds/components";

const options = [
  {
    details: "Details",
    name: "Menu Item 1",
  },
  {
    details: "A very long Details for the second Menu Item",
    name: "Menu Item 2",
  },
  {
    name: "Menu Item 3",
  },
];

function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [details, setDetials] = useState<string>();
  const [inputDropdownValue, setInputDropdownValue] = useState<string>();
  const [value, setValue] = useState<DefaultAutocompleteOption | null>(null);

  return (
    <div className="app">
      <InputDropdown
        label="Label"
        onClick={handleClick}
        sdsType="value"
        sdsStyle="minimal"
        multiple={false}
        details={details}
        value={inputDropdownValue}
        style={{ maxWidth: 250 }}
      />
      <DropdownMenu<DefaultAutocompleteOption, false, false, false>
        open={open}
        anchorEl={anchorEl}
        onClose={() => {}}
        onChange={handleChange}
        search={false}
        multiple={false}
        disableCloseOnSelect
        options={options}
        value={value}
        onClickAway={handleClickAway}
      />
    </div>
  );

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (open) {
      setOpen(false);

      if (anchorEl) {
        anchorEl.focus();
      }

      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  }

  function handleChange(
    _: React.SyntheticEvent<Element, Event>,
    newValue: DefaultAutocompleteOption | null
  ) {
    setOpen(false);
    setValue(newValue);

    if (newValue) {
      setInputDropdownValue(newValue.name);

      if (newValue?.details) setDetials(newValue?.details);
      else setDetials(undefined);
    } else {
      setDetials(undefined);
      setInputDropdownValue(undefined);
    }
  }

  function handleClickAway() {
    if (open) {
      setOpen(false);
    }
  }
}

export default App;
```

## SDS vs MUI

The SDS's InputDropdown component utilizes MUI's Button component as its foundation but introduces some SDS-specific enhancements. Below, the key distinctions between the SDS's InputDropdown and MUI's Button are outlined:

- **Variation**: MUI's Button offers a `variant` prop to define different visual styles for buttons. SDS's InputDropdown, however, uses the `sdsStyle` prop instead, providing the ability to select between three variants: `"square"`, `"rounded"`, or `"minimal"`.

- **Color**: In MUI's Button, the button's color can be modified using the `color` prop. SDS's InputDropdown deviates from this and introduces the `intent` prop. This prop provides the ability to choose between default, warning, and error colors, depending on the state of the InputDropdown.

- **Size**: While MUI's Button provides a `size` prop for adjusting the button's size, SDS's InputDropdown does not offer this capability. The size of the InputDropdown component remains fixed and cannot be altered through props.

- **Icon**: Unlike MUI's Button, which supports custom icons, SDS's InputDropdown does not accept external icon components. Instead, SDS's InputDropdown incorporates a built-in Chevron icon, which is an integral part of the component and cannot be replaced.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-button/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name                           | Type                                                      | Default                                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------ | --------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `counter`                      | `ReactNode`                                               | -                                                | If `multiple` set to `true`, this number shows the number of selected menu items.                                                                                                                                                                                                                                                                                                                                                                                                             |
| `details`                      | `ReactNode`                                               | -                                                | A text showing details for the selected menu item.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `disabled`                     | `bool`                                                    | `false`                                          | If `true`, the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `intent`                       | `"default"` \| `"negative"` \| `"notice"` \| `"positive"` | `"default"`                                      | The color of the component.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `label`                        | `ReactNode`                                               | -                                                | The label of the Input Button.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `multiple`                     | `bool`                                                    | `false`                                          | Allows users to select multiple menu items.`multiple=true` cannot be used with the minimum variant.                                                                                                                                                                                                                                                                                                                                                                                           |
| `onClick`                      | `func`                                                    | `(event: React.MouseEvent<HTMLElement>) => void` | Sets what happens when a user clicks on the component.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `sdsStyle`                     | `"minimal"` \| `"square"` \| `"rounded"`                  | `"square"`                                       | The visual appearance of the component.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `sdsType`                      | `"label"` \| `"value"`                                    | `"label"`                                        | The label variant includes the label within the input field and showcases the selected menu item as additional details or sets the counter when in multi-select mode. The value variant replaces the label with the selected value directly within the input field. The detailed information is then displayed in a separate section dedicated to displaying additional details. However, it's important to note that the value variant cannot be used in conjunction with multi-select mode. |
| `shouldPutAColonAfterLabel`    | `bool`                                                    | `true`                                           | If `true`, a colon (:) will be added after the label or value.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `shouldTruncateMinimalDetails` | `bool`                                                    | `false`                                          | If `true`, the details section of the minimal variant displays a truncated one-liner with an ellipsis (...), if `false` the details section expands to multiple lines for a comprehensive display.                                                                                                                                                                                                                                                                                            |
| `value`                        | `ReactNode`                                               | -                                                | The value that will be displayed in the component for the value variant.                                                                                                                                                                                                                                                                                                                                                                                                                      |

There are more props that can be used with the InputDropdown component, via those available to [MUI's Button component](https://mui.com/material-ui/api/autocomplete/#props).
