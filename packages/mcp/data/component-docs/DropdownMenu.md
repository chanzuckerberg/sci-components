# DropdownMenu

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/DropdownMenu/index.tsx).

## SDS vs MUI

Both SDS's DropdownMenu and MUI's Autocomplete have huge API surfaces, so it is not practical to list every way in which they differ (in part because the list would likely become obsolete quickly!). In summary, these are a few of the most relevant ways in which DropdownMenu integrates with Autocomplete and other MUI components:

- SDS DropdownMenu uses [MUI Autocomplete](https://mui.com/material-ui/react-autocomplete/) under the hood, so all props passed to DropdownMenu are ultimately passed to the Autocomplete component as well. This means MUI's Autocomplete props can be used on SDS's DropdownMenu if needed.

- SDS DropdownMenu uses [MUI Popper](https://mui.com/material-ui/react-popper/). A custom Popper component can be passed via `props.PopperComponent` and/or `props.PopperBaseProps` to control the popper component.

- Similarly, SDS DropdownMenu uses [MUI Paper](https://mui.com/material-ui/react-paper/). A custom Paper component can be passed via `props.PaperComponent` to enable custom styling.

## MUI Documentation

Documentation for the underlying MUI Autocomplete component can be found [here](https://mui.com/material-ui/react-autocomplete/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| **Name**                 | **Type**                             | **Default**                                                                                               | **Description**                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------ | ------------------------------------ | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `anchorEl`               | `HTML element` \| `object` \| `func` | `null`                                                                                                    | Tells the DropdownMenu which element to use as an anchor; see more in the [MUI Popper component's API](https://mui.com/base-ui/react-popper/components-api/#popper-props)                                                                                                                                                                                                           |
| `clickAwayListenerProps` | `func`                               | -                                                                                                         | Passes props to the [MUI ClickAwayListener](https://mui.com/base-ui/react-click-away-listener/components-api/)                                                                                                                                                                                                                                                                      |
| `groupBy`                | `func`                               | -                                                                                                         | Groups menu items according to their assigned section                                                                                                                                                                                                                                                                                                                               |
| `isOptionEqualToValue`   | `func`                               | `(option, val): boolean {` `return option.name === val.name;` `}`                                         | Changes how a selected value is compared against the available options; see more in the [MUI Autocomplete API](https://mui.com/material-ui/api/autocomplete/#props) or in the Recipes section                                                                                                                                                                                       |
| `keepSearchOnSelect`     | `bool`                               | `true`                                                                                                    | Maintains a search input when a user selects a menu item (only if multiple selections are allowed via the `multiple` prop; otherwise the dropdown closes upon selection)                                                                                                                                                                                                            |
| `multiple`               | `bool`                               | `false`                                                                                                   | Allows user to select multiple menu items; see more in the [MUI Autocomplete API](https://mui.com/material-ui/api/autocomplete/#props)                                                                                                                                                                                                                                              |
| `noOptionsText`          | `string`                             | `"No options"`                                                                                            | Sets the text that displays if there are no matching search results; see more in the [MUI Autocomplete API](https://mui.com/material-ui/api/autocomplete/#props)                                                                                                                                                                                                                    |
| `onClickAway`            | `func`                               | -                                                                                                         | Sets what happens when a user clicks outside of the DropdownMenu                                                                                                                                                                                                                                                                                                                    |
| `onInputChange`          | `func`                               | `noop`                                                                                                    | Specifies what happens when a new selection is made; see more in the [MUI Autocomplete API](https://mui.com/material-ui/api/autocomplete/#props) or in the Recipes section                                                                                                                                                                                                          |
| `PopperBaseProps`        |                                      | -                                                                                                         | Passes custom props to the MUIPopper component, which is included as part of the SDSDropdownMenu component. Learn more in the [Popper documentation](https://mui.com/material-ui/react-popper/), and see all the props available to pass to it on the [Popper API page](https://mui.com/material-ui/api/popper/). See an example of `PopperBaseProps` in use in the Recipes section |
| `PopperComponent`        | `func`                               | SDS's `StyledPopper`; see `sci-components/packages/components/src/core/DropdownMenu/style.ts`, ~ line 202 | The [MUI Popper component](https://mui.com/material-ui/react-popper/) is included as part of the SDS DropdownMenu component, and its styles can be changed or added to                                                                                                                                                                                                              |
| `search`                 | `bool`                               | `false`                                                                                                   | Provides a search bar at the top of the menu from which users can narrow the list of menu items                                                                                                                                                                                                                                                                                     |
| `title`                  | `string`                             | -                                                                                                         | Sets a heading for the menu                                                                                                                                                                                                                                                                                                                                                         |

There are many more props that can be used with the DropdownMenu component, via those available to [MUI's Autocomplete component](https://mui.com/material-ui/api/autocomplete/#props).

**Note for use with SDS** **Table** **and other components:**

Each time a table column is shown/hidden a new table object is created. This causes components within the table to remount. _This can be a problem with_ _DropdownMenu_ _if the menu is supposed to stay open while the columns are hidden/shown because the anchor element also gets recreated._ To resolve this, move the DropdownMenu anchor element outside of the table or use the `pendingState` and only show/hide the columns when closing the dropdown.

## Code examples

### Default

This example has the minimum props and menu item metadata needed for the DropdownMenu. The examples that follow build on it.

Menu item metadata is stored as an array of objects (one per menu item) passed to the DropdownMenu component’s `options` prop. At minimum each MenuItem needs a `name` property, which is the text it displays. MenuItems can display more metadata, though; see the “Grouped sections” and “Menu items with count, icon, and details” examples below. Alternatively, a custom component can be displayed instead of a MenuItem component; see the “Components in place of menu items” example below.

The minimum width for the DropdownMenu is 225px, but longer text will automatically widen the DropdownMenu up to the length of the text provided.

**Example: Default**

```tsx
// Most minimal DropdownMenu (just has the basic requirements)

import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultAutocompleteOption } from "@czi-sds/components";

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
    name: "Longer menu item than the others",
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
      <div ref={ref} />
      {open && (
        // 👇 Only pay attention to the props here, everything else is just glue to mount the example
        <DropdownMenu
          PopperBaseProps={POPPER_BASE_PROPS}
          anchorEl={ref.current}
          onClickAway={handleClickAway}
          open={open}
          options={MENU_ITEMS}
        />
      )}
    </div>
  );
}

export default App;
```

### Custom click target

The example below shows how DropdownMenu can be used in conjunction with a click target component (in this case, the InputDropdown component). When the click target is clicked, the DropdownMenu opens, and when a MenuItem is clicked, the DropdownMenu closes.

**Example: CustomClickTarget**

```tsx
// DropdownMenu with custom click target

import React, { SyntheticEvent, useState, useRef } from "react";
import {
  DropdownMenu,
  DefaultAutocompleteOption,
  InputDropdown,
} from "@czi-sds/components";

function App() {
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
  ];

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<DefaultAutocompleteOption | null>(null);

  function handleClick(event: SyntheticEvent<HTMLElement>) {
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
    _: SyntheticEvent,
    newValue: DefaultAutocompleteOption | null
  ) {
    setOpen(false);
    setValue(newValue);
  }

  function handleClickAway() {
    return open && setOpen(false);
  }

  return (
    <div className="app">
      <InputDropdown
        onClick={handleClick}
        label="Click Target"
        sdsType="label"
        sdsStyle="minimal"
      />
      <DropdownMenu<DefaultAutocompleteOption, false, false, false>
        options={MENU_ITEMS}
        anchorEl={anchorEl}
        open={!!open}
        onChange={handleChange}
        value={value}
        onClickAway={handleClickAway}
      />
    </div>
  );
}

export default App;
```

### Search

An InputSearch component can be incorporated into the DropdownMenu component by passing it the `search` prop.

The search functions by filtering out non-matches as the user types, leaving only menu items with text that match the input. If no matches are found, the DropdownMenu displays “No options” below the InputSearch by default. This text can be changed via the `noOptionsText` prop as shown below.

By default, the search’s input text is maintained even when a user selects a MenuItem (if multiple selections are allowed; otherwise the dropdown closes upon selection). This way users can select multiple MenuItems that match the searched term without needing to re-enter it each time. However, this can be changed so that the search input clears upon making a selection; see the “Search cleared on select” example below.

1. In the search box, type in "fruit"

2. DropdownMenu will display "Fruit: Apple" and "Fruit: Orange"

3. Select "Fruit: Apple"

4. Note that the search text is maintained along with the limited list of items

**Example: Search**

```tsx
// DropdownMenu with search

import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultAutocompleteOption } from "@czi-sds/components";

const MENU_ITEMS: DefaultAutocompleteOption[] = [
  {
    name: "Fruit: Apple",
  },
  {
    name: "Fruit: Orange",
  },
  {
    name: "Vegetable: Carrot",
  },
  {
    name: "Vegetable: Kale",
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
      <div ref={ref} />
      {open && (
        // 👇 Only pay attention to the props here, everything else is just glue to mount the example
        <DropdownMenu
          PopperBaseProps={POPPER_BASE_PROPS}
          anchorEl={ref.current}
          noOptionsText="No matches found, try again!"
          onClickAway={handleClickAway}
          open
          options={MENU_ITEMS}
          search
        />
      )}
    </div>
  );
}

export default App;
```

### Multi-select

You can allow users to select multiple menu items by passing the DropdownMenu component the `multiple` prop. MenuItems will be shifted further to the right to make room for checkmarks displayed upon selection.

If the `multiple` prop is not `true`, the DropdownMenu allows just one selection. It closes and applies the selection once a menu item is selected.

**Example: MultiSelect**

```tsx
// DropdownMenu with multi-select

import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultAutocompleteOption } from "@czi-sds/components";

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
      <div ref={ref} />
      {open && (
        // 👇 Only pay attention to the props here, everything else is just glue to mount the example
        <DropdownMenu
          PopperBaseProps={POPPER_BASE_PROPS}
          anchorEl={ref.current}
          multiple
          onClickAway={handleClickAway}
          open
          options={MENU_ITEMS}
        />
      )}
    </div>
  );
}

export default App;
```

### Search cleared on select

If search is included in the DropdownMenu, by default the search input will be maintained when a user selects a MenuItem (if multiple selections are allowed; otherwise the dropdown menu closes upon selection). However, the search input can be set to close upon selection by setting the optional `keepSearchOnSelect` prop to `false`.

This setting is intended to be used only when `search` and `multiple` are both set to `true` (otherwise it will have no noticeable affect since the dropdown menu closes upon selection if multi-select is not allowed, hiding the search bar).

To see how this works:

1. In the search box, type in "fruit"

2. DropdownMenu will display "Fruit: Apple" and "Fruit: Orange"

3. Select "Fruit: Apple"

4. Note that the search text is now cleared and all dropdown items reappear

Compare this to the default behavior in the " Search " example above, or change the `keepSearchOnSelect` prop in the example below to `true`.

**Example: ClearSearchOnSelect**

```tsx
// Dropdown with multi-select that does not maintain searched query upon selection of a menu item

import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultAutocompleteOption } from "@czi-sds/components";

const MENU_ITEMS: DefaultAutocompleteOption[] = [
  {
    name: "Fruit: Apple",
  },
  {
    name: "Fruit: Orange",
  },
  {
    name: "Vegetable: Carrot",
  },
  {
    name: "Vegetable: Kale",
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
      <div ref={ref} />
      {open && (
        // 👇 Only pay attention to the props here, everything else is just glue to mount the example
        <DropdownMenu
          PopperBaseProps={POPPER_BASE_PROPS}
          anchorEl={ref.current}
          keepSearchOnSelect={false}
          multiple
          onClickAway={function handleClickAway() {}}
          open
          options={MENU_ITEMS}
          search
        />
      )}
    </div>
  );
}

export default App;
```

### Grouped sections

MenuItems can be displayed in groups with a label.

This requires passing DropdownMenu the `groupBy` prop to group options under the returned string. The `groupBy` value is also used as the text for group headings when [MUI Autocomplete renderGroup](https://mui.com/material-ui/api/autocomplete/#props) is not provided. For example:

**React TypeScript**

```tsx
// group items by section
groupBy={(option) => option.section}

// group items by the last character of their names
groupBy={(option) => option.name.at(-1)}
```

This `groupBy` prop must be provided or the groups will not render, even if all menu items have `section` properties (see below).

**Warning:** To avoid duplicate headers, please make sure that the options are also sorted with the same dimension that they are grouped by. (See: [Issue](https://github.com/mui/material-ui/issues/21967#issuecomment-665006321) and example below)

**Example: GroupedSections**

```tsx
// Dropdown with grouped sections

import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultAutocompleteOption } from "@czi-sds/components";

const MENU_ITEMS: DefaultAutocompleteOption[] = [
  {
    name: "Menu item A.1",
    section: "Section A",
  },
  {
    name: "Menu item A.2",
    section: "Section A",
  },
  {
    name: "Menu item without a specified section",
  },
  {
    name: "Menu item B.1",
    section: "Section B",
  },
  {
    name: "Menu item C.1",
    section: "Section C",
  },
  {
    name: "Menu item C.2",
    section: "Section C",
  },
  {
    name: "Menu item C.3",
    section: "Section C",
  },
  {
    name: "Menu item B.2",
    section: "Section B",
  },
];

/**
 * Items need to be sorted by the same groupBy dimension
 * In this example, we're grouping by the last character of the item name
 */
const SORTED_ITEMS = [...MENU_ITEMS].sort((a, b) => {
  const aLastLetter = a.name.slice(-1);
  const bLastLetter = b.name.slice(-1);

  if (aLastLetter < bLastLetter) {
    return -1;
  }
  if (aLastLetter > bLastLetter) {
    return 1;
  }
  return 0;
});

function groupBy(option: DefaultAutocompleteOption) {
  return option.name.slice(-1);
}

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
      <div ref={ref} />
      {open && (
        // 👇 Only pay attention to the props here, everything else is just glue to mount the example
        <DropdownMenu
          PopperBaseProps={POPPER_BASE_PROPS}
          anchorEl={ref.current}
          groupBy={groupBy}
          onClickAway={handleClickAway}
          open
          options={SORTED_ITEMS}
        />
      )}
    </div>
  );
}

export default App;
```

## Recipes

These recipes show a few of the more complex approaches available for customizing Dropdown Menus.

### Custom isOptionEqualToValue

The `isOptionEqualToValue` prop changes how a selected value is compared against the available options. By default `option.name === val.name` is used. In the custom example below, the `id` property is used instead of the `name` property.

This is a MUI prop; learn more in the [Autocomplete API](https://mui.com/material-ui/api/autocomplete/#props).

**Example: CustomIsOptionEqualToValue**

```tsx
// DropdownMenu with customized `isOptionEqualToValue`

import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultAutocompleteOption } from "@czi-sds/components";

type MenuItem = DefaultAutocompleteOption & { id: string };

function optionIdEqualToValueId(option: MenuItem, value: MenuItem) {
  return option.id === value.id;
}

const MENU_ITEMS: MenuItem[] = [
  {
    name: "Menu item 1",
    id: "one",
  },
  {
    name: "Menu item 2",
    id: "two",
  },
  {
    name: "Menu item 3",
    id: "three",
  },
  {
    name: "Longer menu item than the others",
    id: "four",
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
      <div ref={ref} />
      {open && (
        // 👇 Only pay attention to the props here, everything else is just glue to mount the example
        <DropdownMenu<MenuItem, false, false, false>
          PopperBaseProps={POPPER_BASE_PROPS}
          anchorEl={ref.current}
          isOptionEqualToValue={optionIdEqualToValueId}
          onClickAway={handleClickAway}
          open
          options={MENU_ITEMS}
        />
      )}
    </div>
  );
}

export default App;
```

### Custom onChange

The optional `onChange` prop specifies what happens when a new selection is made.

In the example below, `onChange` has been modified such that making a new selection logs the value and reason to the console.

This is a MUI prop; learn more in the [Autocomplete API](https://mui.com/material-ui/api/autocomplete/#props).

**Example: CustomOnChange**

```tsx
// DropdownMenu with customized `onInputChange`

import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultAutocompleteOption } from "@czi-sds/components";

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
    name: "Longer menu item than the others",
  },
];

const POPPER_BASE_PROPS = { popperOptions: { strategy: "absolute" as const } };

function handleClickAway() {}

type ChangeMessage = { reason: string; value: unknown };

function Message({ message }: { message?: ChangeMessage }) {
  return (
    <div
      style={{ position: "absolute", top: "170px", fontFamily: "sans-serif" }}
    >
      <p>{JSON.stringify(message)}</p>
    </div>
  );
}

function App() {
  const [message, setMessage] = useState<ChangeMessage>();

  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current]);

  return (
    <div className="app">
      <div ref={ref} />
      {open && (
        // 👇 Only pay attention to the props here, everything else is just glue to mount the example
        <>
          <DropdownMenu
            PopperBaseProps={POPPER_BASE_PROPS}
            anchorEl={ref.current}
            keepSearchOnSelect
            onClickAway={handleClickAway}
            onChange={(_: SyntheticEvent, value: unknown, reason: string) =>
              setMessage({ reason, value })
            }
            open
            options={MENU_ITEMS}
          />
          <Message message={message} />
        </>
      )}
    </div>
  );
}

export default App;
```

### Custom PopperBaseProps

`PopperBaseProps` is an SDS-specific prop made for passing custom props to the Popper component, which is included as part of the DropdownMenu component.

The Popper component is part of MUI; learn more in the [Popper documentation](https://mui.com/material-ui/api/popper/), and see all the props available to pass to it on the [Popper API page](https://mui.com/material-ui/api/popper/).

The example below passes the Popper a `className` prop and additionally uses the `sx` prop to make style changes (learn more on the [MUI sx documentation page](https://mui.com/system/getting-started/the-sx-prop/)).

**Example: CustomPopperBaseProps**

```tsx
// DropdownMenu with custom `PopperBaseProps`

import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultAutocompleteOption } from "@czi-sds/components";

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
    name: "Longer menu item than the others",
  },
];

const POPPER_BASE_PROPS = {
  className: "popper",
  sx: {
    width: 500,
    borderColor: "salmon",
    borderWidth: 10,
  },
  popperOptions: { strategy: "absolute" as const },
};

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current]);

  return (
    <div className="app">
      <div ref={ref} />
      {open && (
        // 👇 Only pay attention to the props here, everything else is just glue to mount the example
        <DropdownMenu
          PopperBaseProps={POPPER_BASE_PROPS}
          anchorEl={ref.current}
          onClickAway={function handleClickAway() {}}
          open
          options={MENU_ITEMS}
        />
      )}
    </div>
  );
}

export default App;
```

### Custom Popper component

In addition to modifying the Popper's styles via `PopperBaseProps` above, the styles for the Popper component can be overwritten more directly with `styled()`.

To get all the default SDS styles used for Popper, first copy them into a custom-styled Popper (from within `sci-components/packages/components/src/core/DropdownMenu/style.ts` file). Then replace and / or follow up those styles with custom styles. The example below includes comments for each of these steps within `CustomPopper`.

**Example: CustomPopperComponent**

```tsx
// DropdownMenu with custom Popper component

import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { Popper, styled } from "@mui/material";
import {
  DropdownMenu,
  DefaultAutocompleteOption,
  Borders,
  CommonThemeProps,
  Corners,
  Shadows,
  Spaces,
} from "@czi-sds/components";

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
    name: "Longer menu item than the others",
  },
];

// Step 1/3: Copy existing base styles for the Popper component from
// sci-components/packages/components/src/core/DropdownMenu/style.ts, ~lines 206-229:
const getBorders = ({ theme }: CommonThemeProps): Borders | null => {
  return theme?.app?.borders || null;
};

const getCorners = ({ theme }: CommonThemeProps): Corners | null => {
  return theme?.app?.corners || null;
};

const getShadows = ({ theme }: CommonThemeProps): Shadows | null => {
  return theme?.app?.shadows || null;
};

const getSpaces = ({ theme }: CommonThemeProps): Spaces | null => {
  return theme?.app?.spacing || null;
};

const CustomPopper = styled(Popper)`
  .MuiAutocomplete-popperDisablePortal {
    position: relative;
    width: 100% !important;
    box-shadow: none;
    padding: 0;
    border: none;
  }

  ${(props) => {
    const borders = getBorders(props);
    const corners = getCorners(props);
    const shadows = getShadows(props);
    const spacings = getSpaces(props);

    return `
      background-color: white;
      border: ${borders?.base?.divider};
      border-radius: ${corners?.m}px;
      box-shadow: ${shadows?.m};
      padding: ${spacings?.xs}px;
      box-sizing: border-box;
      z-index: 1400;
    `;
  }}

  border-color: purple;
  border-style: dotted;
  border-width: 15px !important;
`;

const POPPER_BASE_PROPS = { popperOptions: { strategy: "absolute" as const } };

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current]);

  return (
    <div className="app">
      <div ref={ref} />
      {open && (
        // 👇 Only pay attention to the props here, everything else is just glue to mount the example
        <DropdownMenu
          PopperBaseProps={POPPER_BASE_PROPS}
          anchorEl={ref.current}
          onClickAway={function handleClickAway() {}}
          open
          options={MENU_ITEMS}
          // Step 3/3: Pass the new CustomPopper to PopperComponent prop
          PopperComponent={CustomPopper}
        />
      )}
    </div>
  );
}

export default App;
```

---
