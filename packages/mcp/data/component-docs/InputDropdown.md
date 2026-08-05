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

### Controlling the width

Left alone, the input is as wide as the text inside it, which means a row of them comes out ragged and the width jumps around as the selection changes. `width` fixes that. A bare number is read as pixels, and any other value is used as the CSS width, so `"100%"` fills the container and `"20rem"` works as written.

**Example: ControllingTheWidth**

```tsx
// The InputDropdown is as wide as its own content until `width` says otherwise.
// A bare number is read as pixels; anything else is used as the CSS width, so a
// percentage sizes the input against whatever contains it. The dashed box below
// is the container the percentages are measured against.

import { InputDropdown } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <div
        style={{
          // Without this the column would stretch every input to its full width,
          // which is the one thing this example is trying to show a difference in.
          alignItems: "flex-start",
          border: "1px dashed #a9a9a9",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "16px",
          width: "400px",
        }}
      >
        <InputDropdown label="Auto" onClick={() => {}} />
        <InputDropdown label="240px" onClick={() => {}} width="240" />
        <InputDropdown label="50%" onClick={() => {}} width="50%" />
        <InputDropdown label="100%" onClick={() => {}} width="100%" />
      </div>
    </div>
  );
}

export default App;
```

**MUI Tip:** MUI's `fullWidth` prop works here too and does the same thing as `width="100%"`. Pass both and `width` is the one that counts. Either way the input keeps a minimum width of 90px, so a smaller value leaves it at 90px rather than shrinking it.

### Anchoring a menu

A DropdownMenu is a popper: it is positioned against an element rather than rendered inside one, so it needs the input's DOM node as its `anchorEl`. InputDropdown forwards its `ref` to the button it renders, and a callback ref keeps that node in state so the menu re-renders once the anchor exists. Reach for this when the Dropdown component below is more than you need, or when the menu has to be driven from state you already own.

**Example: AnchoringAMenu**

```tsx
// A DropdownMenu is positioned against an element rather than nested inside
// one, so it needs the input's DOM node. InputDropdown forwards its ref to the
// button it renders, and a callback ref stores that node in state, which is
// what makes the menu re-render once the anchor exists.

import {
  DropdownMenu,
  InputDropdown,
  type DefaultAutocompleteOption,
} from "@czi-sds/components";
import { useState, type SyntheticEvent } from "react";

const OPTIONS: DefaultAutocompleteOption[] = [
  { name: "Chromosome 1" },
  { name: "Chromosome 2" },
  { name: "Chromosome 3" },
];

function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<DefaultAutocompleteOption | null>(null);

  return (
    <div className="app">
      <InputDropdown
        label="Chromosome"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        ref={setAnchorEl}
        sdsStyle="square"
        sdsType="value"
        state={open ? "open" : "default"}
        value={value?.name}
      />

      <DropdownMenu<DefaultAutocompleteOption, false, false, false>
        anchorEl={anchorEl}
        onChange={(
          _event: SyntheticEvent,
          newValue: DefaultAutocompleteOption | null
        ) => {
          setValue(newValue);
          setOpen(false);
        }}
        onClickAway={() => setOpen(false)}
        open={open}
        options={OPTIONS}
        search={false}
        value={value}
      />
    </div>
  );
}

export default App;
```

### Square with multi-select

Below is an example demonstrating the combined utilization of the InputDropdown component and a multi-select Dropdown component. The Dropdown allows multiple selections, while the InputDropdown features a square variant.

**Example: SquareWithMultiSelect**

```tsx
import { MouseEvent, SyntheticEvent, useState } from "react";
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
  const [counter, setCounter] = useState<string>();
  const [value, setValue] = useState<DefaultAutocompleteOption[]>([]);

  return (
    <div className="app">
      <InputDropdown
        label="Label"
        onClick={handleClick}
        sdsStyle="square"
        multiple
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
        value={value}
        onClickAway={handleClickAway}
      />
    </div>
  );

  function handleClick(event: MouseEvent<HTMLElement>) {
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
    _: SyntheticEvent<Element, Event>,
    newValue: DefaultAutocompleteOption[]
  ) {
    setValue(newValue);
    setCounter(newValue.length.toString());
  }

  function handleClickAway() {
    if (open) {
      setOpen(false);
    }
  }
}

export default App;
```

### Rounded with single-select

Below is an example demonstrating the combined utilization of the default label variant InputDropdown component and a single-select Dropdown component.

**Example: RoundedWithSingleSelect**

```tsx
import { MouseEvent, SyntheticEvent, useState } from "react";
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

  function handleClick(event: MouseEvent<HTMLElement>) {
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
    _: SyntheticEvent<Element, Event>,
    newValue: DefaultAutocompleteOption | null
  ) {
    setOpen(false);
    setValue(newValue);
    setInputDropdownValue(newValue?.name);
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
import { MouseEvent, SyntheticEvent, useState } from "react";
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
  const [details, setDetails] = useState<string>();
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

  function handleClick(event: MouseEvent<HTMLElement>) {
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
    _: SyntheticEvent<Element, Event>,
    newValue: DefaultAutocompleteOption | null
  ) {
    setOpen(false);
    setValue(newValue);

    if (newValue) {
      setInputDropdownValue(newValue.name);

      if (newValue?.details) setDetails(newValue?.details);
      else setDetails(undefined);
    } else {
      setDetails(undefined);
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

- **Ref**: Like MUI's Button, InputDropdown forwards a `ref` to the button it renders. That is how it becomes the `anchorEl` a DropdownMenu is positioned against, as in "Anchoring a menu" above.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-button/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name                           | Type                                                      | Default                                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------ | --------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `classes`                      | `object`                                                  | -                                                | A class name for each part of the input, for styling one of them without reaching through the DOM: `root`, `label`, `labelDetailsWrapper`, `contentWrapper`, `details`, `counter`, `iconWrapper`, `chevronIcon` and `minimalDetails`.                                                                                                                                                                                                                                                         |
| `className`                    | `string`                                                  | -                                                | Added to the input's root element, alongside anything `classes.root` puts there.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `counter`                      | `ReactNode`                                               | -                                                | If `multiple` set to `true`, this number shows the number of selected menu items.                                                                                                                                                                                                                                                                                                                                                                                                             |
| `details`                      | `ReactNode`                                               | -                                                | A text showing details for the selected menu item.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `disabled`                     | `boolean`                                                 | `false`                                          | If `true`, the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `intent`                       | `"default"` \| `"negative"` \| `"notice"` \| `"positive"` | `"default"`                                      | The color of the component.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `label`                        | `ReactNode`                                               | -                                                | The label of the Input Button.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `multiple`                     | `boolean`                                                 | `false`                                          | Allows users to select multiple menu items.`multiple=true` cannot be used with the minimum variant.                                                                                                                                                                                                                                                                                                                                                                                           |
| `onClick`                      | `function`                                                | `(event: React.MouseEvent<HTMLElement>) => void` | Sets what happens when a user clicks on the component.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `sdsStyle`                     | `"minimal"` \| `"square"` \| `"rounded"`                  | `"square"`                                       | The visual appearance of the component.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `sdsType`                      | `"label"` \| `"value"`                                    | `"label"`                                        | The label variant includes the label within the input field and showcases the selected menu item as additional details or sets the counter when in multi-select mode. The value variant replaces the label with the selected value directly within the input field. The detailed information is then displayed in a separate section dedicated to displaying additional details. However, it's important to note that the value variant cannot be used in conjunction with multi-select mode. |
| `shouldPutAColonAfterLabel`    | `boolean`                                                 | `true`                                           | If `true`, a colon (:) will be added after the label or value.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `shouldTruncateMinimalDetails` | `boolean`                                                 | `false`                                          | If `true`, the details section of the minimal variant displays a truncated one-liner with an ellipsis (...), if `false` the details section expands to multiple lines for a comprehensive display.                                                                                                                                                                                                                                                                                            |
| `startIcon`                    | `ReactNode`                                               | -                                                | An element placed before the label, passed straight through to the underlying MUI Button.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `state`                        | `"default"` \| `"open"`                                   | `"default"`                                      | Draws the input in its open state. The input has no idea whether its menu is showing, so set this from whatever holds that state.                                                                                                                                                                                                                                                                                                                                                             |
| `style`                        | `CSSProperties`                                           | -                                                | Inline styles for the input's root element.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `value`                        | `ReactNode`                                               | -                                                | The value that will be displayed in the component for the value variant.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `width`                        | `string`                                                  | `"auto"`                                         | How wide the input is. A bare number is read as pixels, so `"240"` means 240px, and any other value is used as the CSS width, such as `"100%"` or `"20rem"`. Values below 90px are ignored, since the input keeps that as its minimum. Left unset, the input is as wide as its content, or as wide as its container if MUI's `fullWidth` is set.                                                                                                                                              |

There are more props that can be used with the InputDropdown component, via those available to [MUI's Button component](https://mui.com/material-ui/api/autocomplete/#props).
