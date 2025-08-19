# Dropdown Menu

Dropdown Menus are coupled with Dropdown Inputs, Dropdown Buttons, and in some cases Icon Buttons whenever those elements present the user with options to choose from or selections to make.

## Guidelines

## Dropdown Menu Components

| Dropdown Menus offer the user options to adjust or select. The Menu Items found within the Dropdown Menu have multiple format options.  Dropdown Menus can be configured to include a Search Input, have their Menu Items separated out into different sections or groupings, have a built-in title, or any combination of these features.  Dropdown Menus require a trigger element, such as a Dropdown Input, Dropdown Button, or Icon Button, to open the menu.  Dropdown is a component created as a combination of Dropdown Menu and a trigger element to help make Dropdown Menu easier for developers to implement. |   | **Jump to component:** Dropdown Dropdown Menu Menu Item  |
| --- | --- | --- |

### Visual Preview

---

## Dropdown

|  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- |

### Overview

Dropdown is a component that exists only in the codebase (not in Figma) that is a combination of Dropdown Menu and a trigger element to help make Dropdown Menu easier for developers to implement. Trigger elements can be Dropdown Inputs, Dropdown Buttons, or Icon Buttons.

Dropdown bundles Dropdown Input with Dropdown Menu into a single component with all of the necessary React handlers set up to speed up the implementation process. Since there is no equivalent component in Figma, designers must manually combine Dropdown Menu with their chosen trigger element.

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

## Dropdown Menu

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Dropdown Menu Types

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

### Dropdown Menu – Single-select

Use Single-select when users are only able to select one item from the menu. They can be configured to have their Menu Items separated out into different sections or groupings, have a built-in title at the top of the menu, include a Search Input allowing users to easily find specific Menu Items, or a combination of all three.

| Default | Default + Title | Default + Search | Default + Sections |
| --- | --- | --- | --- |

---

### Dropdown Menu – Multi-select 

Use Multi-select when users are able to select one or more items from the menu. They can be configured to have their Menu Items separated out into different sections or groupings, have a built-in title at the top of the menu, include a Search Input allowing users to easily find specific Menu Items, include confirmation and cancel Buttons at the bottom of the menu, or a combination of all four.

| Default | Default + Title | Default + Search | Default + Sections | Default + Buttons |
| --- | --- | --- | --- | --- |

---

### Dropdown Menu – Multi-column

Use Multi-column when there is a need to separate Menu Items across multiple columns. Columns can be dependent or independent of each other. With dependent columns, Menu Item selections made in one column will affect the Menu Items in the others, such as reducing the number of Menu Items visible in neighboring columns; use Indeterminate Menu Items when some, but not all sub-options have been made in a subsequent column. With independent columns, Menu Item selections made in one column will have no effect on the Menu Items in other columns. 

The same configurations are available in the Multi-column variant as the Single-column including a built-in title at the top of the menu, a Search Input, section names at the top of each column, confirmation and cancel Buttons at the bottom of the menu, or a combination of all four. There can only be one section per column. Additionally, a Chevron icon can be placed between columns to help communicate the relationship between them.

Multi-column Dropdown Menus can be Single- or Multi-select.

| Default | Default + Title | Default + Search | Default + Buttons |
| --- | --- | --- | --- |

---

### Dropdown Menu Spacing

These rules establish how much margin should exist between and around elements.

---

## Menu Item

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Menu Item Types

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

### Menu Item – Single-select

Single-select Menu Items are used in Dropdown Menus where only one item can be selected at a time. They can optionally be paired with additional clarifying details or counters that indicate the number of items within that Menu Item's category.

| Default | Hover | Selected | Disabled |
| --- | --- | --- | --- |

---

### Menu Item – Multi-select

#### Determinate

Multi-select Menu Items are used in Dropdown Menus where multiple items can be selected at a time. The determinate variant should be used in Single-column Dropdown Menus or in Multi-column Dropdown Menus to communicate that all possible sub-options have been selected. Optionally They can optionally be paired with additional clarifying details or with counters that indicate the number of items within that Menu Item's category.

| Default | Hover | Selected | Disabled |
| --- | --- | --- | --- |

#### Indeterminate

Indeterminate Multi-select Menu Items are used **only** in Multi-column Dropdown Menus when there is a need to show when some, but not all sub-options have been selected. They can optionally be paired with additional clarifying details or with counters that indicate the number of items within that Menu Item's category.

| Default | Hover | Selected | Disabled |
| --- | --- | --- | --- |

---

### Menu Item with Icon

All Menu Item variants can be optionally displayed with an icon.

| Default + Icon | Default + Count + Icon | Default + Details + Icon |
| --- | --- | --- |

## Code

## Dropdown Menu Components

| `DropdownMenu` offers the user options to adjust or select. The `MenuItems` found within `DropdownMenu` have multiple format options.  `DropdownMenu` can be configured to include `InputSearch`, have their `MenuItems` separated out into different sections or groupings, have a built-in title, or any combination of these features.  `DropdownMenu` requires a trigger element, such as `InputDropdown`, `ButtonDropdown`, or `ButtonIcon`, to open the menu.  `Dropdown` is a component created as a combination of `DropdownMenu` and a trigger element to help make `DropdownMenu` easier for developers to implement. |   | **Jump to component:** DropdownMenu MenuItem Dropdown |
| --- | --- | --- |

### Visual Preview

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

---

## Dropdown

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

SDS's `Dropdown` component is a combination of two other SDS components: `DropdownMenu` and `InputDropdown`,  since these would often be used together to create a complete dropdown element in the UI. `DropdownMenu` is built off of MUI's `Autocomplete` component, but `InputDropdown` is built from scratch.

These are a few of the most relevant ways in which SDS's `DropdownMenu` (which is used within `Dropdown`) integrates with`Autocomplete` and other MUI components:

* SDS `Dropdown` uses MUI `Autocomplete` under the hood, so all props passed to `DropdownMenu` are ultimately passed to the Autocomplete component as well. This means MUI's `Autocomplete` props can be used on SDS's `DropdownMenu` if needed.
* SDS `Dropdown` uses MUI `Popper`. A custom `Popper` component can be passed via `props.PopperComponent` and/or `props.PopperBaseProps` to control the popper component.
* Similarly, SDS `Dropdown` uses MUI `Paper`. A custom `Paper` component can be passed via `props.PaperComponent` to enable custom styling.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `buttonPosition` | `"left"` `|"right"` | `left` | Specifies the position of the `Apply`/`Cancel` buttons at the Dropdown footer. |
| `buttons` | `bool` | `false` | When set to `true`, a set of `Apply`/`Cancel` buttons will be displayed at the Dropdown footer. |
| `closeOnBlur` | `bool` | `true` | When set to `true`, the Dropdown will automatically close when a click occurs outside of it. |
| `disabled` | `bool` | `false` | When `true`, the Dropdown is disabled and user interaction is not allowed. |
| `isTriggerChangeOnOptionClick` | `bool` | `false` | When set to `true`, changes in Dropdown selections are applied in real-time to the react state. |
| `label` | `string` | `-` | The label of the Dropdown. |
| `multiple` | `bool` | `true` | Determines whether the Dropdown allows for multiple item selection. |
| `onChange` | `(options: Value<DefaultDropdownMenuOption, Multiple>) => void;` | `-` | Callback fired when the value changes. |
| `onClose` | `func` | `-` | Callback fired when the Dropdown requests to be closed. |
| `search` | `bool` | `true` | When set to `true`, a search input is displayed at the top of the Dropdown for filtering options. |
| `dropdownMenuProps` | `Partial<DropdownMenuProps>` | `-` | These props are directly passed to the underlying DropdownMenu component, customizing its behavior. |
| `options` | `Array<DefaultDropdownMenuOption>` | `-` | An array of options to be displayed as MenuItems within the Dropdown. |
| `InputDropdownProps` | `Partial<InputDropdownPropsType>` | `-` | These props are directly passed to the underlying InputDropdown component, customizing its behavior. |
| `value` | `string | Array<string>` | `-` | The current value of the Dropdown, representing the selected item(s) based on the multi-select status. |
| `PopperComponent` | `element` | `Paper` | The component used to render the wrapper of the inner DropdownMenu. |
| `InputDropdownComponent` | `element` | `InputDropdown` | The component used to render the Dropdown trigger button. |

### Code Examples

#### **Default Dropdown**

This example illustrates the minimum set of props required for rendering a `Dropdown` component.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { Dropdown, DefaultDropdownMenuOption } from "@czi-sds/components";
import "./styles.css";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
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
      <Dropdown
        label="Click Target"
        onChange={() => {}}
        options={MENU_ITEMS}
      />
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dropdown</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### **Multi-select Dropdown with Search**

A search feature can be easily incorporated into the `Dropdown` component by including the `search` prop.

The search functionality operates by dynamically filtering out non-matching options as the user types, displaying only the menu items whose text corresponds to that input. If no matching items are found, the `Dropdown` will automatically present "No options" below the search bar. 

To ensure that the search input retains its text even after a user selects a menu item (when multiple selections are allowed), set the `keepSearchOnSelect` prop to `true` within the `DropdownMenuProps` prop. This allows users to conveniently choose multiple menu items that match the searched term without the need to re-enter it for each selection.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { Dropdown, DefaultDropdownMenuOption } from "@czi-sds/components";
import "./styles.css";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
  {
    name: "Fruit: Apple",
    section: "Fruit",
    count: 10
  },
  {
    name: "Fruit: Cherry",
    section: "Fruit",
    count: 150
  },
  {
    name: "Fruit: Orange",
    section: "Fruit",
    count: 15
  },
  {
    name: "Vegetable: Carrot",
    section: "Vegetable",
    count: 34
  },
  {
    name: "Vegetable: Kale",
    section: "Vegetable"
  },
  {
    name: "Vegetable: Lettuce",
    section: "Vegetable"
  },
];

const POPPER_BASE_PROPS = {popperOptions: { strategy: "absolute"}};

function handleClickAway(){} 

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current])
  
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
          groupBy: (option: DefaultDropdownMenuOption) =>
            option.section as string,
        }}
      />
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dropdown</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

---

## DropdownMenu

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

Both SDS's `DropdownMenu` and MUI's `Autocomplete` have huge API surfaces, so it is not practical to list every way in which they differ (in part because the list would likely become obsolete quickly!). In summary, these are a few of the most relevant ways in which `DropdownMenu` integrates with `Autocomplete` and other MUI components:

* SDS `DropdownMenu` uses MUI `Autocomplete` under the hood, so all props passed to `DropdownMenu` are ultimately passed to the `Autocomplete` component as well. This means MUI's `Autocomplete` props can be used on SDS's `DropdownMenu` if needed.
* SDS `DropdownMenu` uses MUI `Popper`. A custom `Popper` component can be passed via `props.PopperComponent` and/or `props.PopperBaseProps` to control the popper component.
* Similarly, SDS `DropdownMenu` uses MUI `Paper`. A custom `Paper` component can be passed via `props.PaperComponent` to enable custom styling.

### MUI Documentation

Documentation for the underlying MUI `Autocomplete` component can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| **Name** | **Type** | **Default** | **Description** |
| --- | --- | --- | --- |
| `anchorEl` | `HTML element` `| object` `| func` | `null` | Tells the DropdownMenu which element to use as an anchor; see more in the MUI `Popper` component's API |
| `clickAwayListenerProps` | `func` | `-`  | Passes props to the MUI `ClickAwayListener` |
| `groupBy` | `func` | `-` | Groups menu items according to their assigned `section` |
| `isOptionEqualToValue` | `func` | `(option, val): boolean {`     `return option.name === val.name;`   `}` | Changes how a selected value is compared against the available options; see more in the MUI Autocomplete API or in the DropdownMenu Component Recipes section  |
| `keepSearchOnSelect` | `bool` | `true` | Maintains a search input when a user selects a menu item (only if multiple selections are allowed via the `multiple` prop; otherwise the dropdown closes upon selection) |
| `multiple` | `bool` | `false` | Allows user to select multiple menu items; see more in the MUI Autocomplete API |
| `noOptionsText` | `string` | `"No options"` | Sets the text that displays if there are no matching search results; see more in the MUI Autocomplete API |
| `onClickAway` | `func` | `-` | Sets what happens when a user clicks outside of the DropdownMenu |
| `onInputChange` | `func` | `noop` | Specifies what happens when a new selection is made; see more in the MUI Autocomplete API or in the DropdownMenu Component Recipes section |
| `PopperBaseProps` |   | `-` | Passes custom props to the MUI`Popper` component, which is included as part of the SDS`DropdownMenu` component. Learn more in the Popper documentation, and see all the props available to pass to it on the Popper API page. See an example of `PopperBaseProps`  in use in the DropdownMenu Component Recipes section |
| `PopperComponent` | `func` | SDS's `StyledPopper`; see sci-components/packages/components/src/core/DropdownMenu/style.ts, ~ line 202 | The MUI  `Popper` component is included as part of the SDS `DropdownMenu` component, and its styles can be changed or added to |
| `search` | `bool` | `f``alse` | Provides a search bar at the top of the menu from which users can narrow the list of menu items |
| `title` | `string` | `-` | Sets a heading for the menu |

There are many more props that can be used with the `DropdownMenu`  component, via those available to MUI's `Autocomplete`  component. 

>**Note for use with SDS** **`Table`** **and other components:**
>
>Each time a table column is shown/hidden a new table object is created. This causes components within the table to remount. *This can be a problem with* *`DropdownMenu`* *if the menu is supposed to stay open while the columns are hidden/shown because the anchor element also gets recreated.* To resolve this, move the `DropdownMenu` anchor element outside of the table or use the `pendingState` and only show/hide the columns when closing the dropdown.

### Code Examples

#### Default DropdownMenu

This example has the minimum props and menu item metadata needed for the `DropdownMenu`.  

Menu item metadata is stored as an array of objects (one per menu item) passed to the `DropdownMenu` component’s `options` prop.  At minimum each `MenuItem` needs a `name` property, which is the text it displays. `MenuItems` can display more metadata, though; see the “DropdownMenu with grouped sections” and “DropdownMenu with menu items that have count, icon, and / or details” examples below. Alternatively, a custom component can be displayed instead of a `MenuItem` component; see the “DropdownMenu with components in place of menu items” example below.

The minimum width for the `DropdownMenu` is 225px, but longer text will automatically widen the `DropdownMenu` up to the length of the text provided. 

Although examples shows the minimum requirements for the `DropdownMenu`, there are many more options available to include; see subsequent code examples further below.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
// Most minimal DropdownMenu (just has the basic requirements)
      
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultDropdownMenuOption } from "@czi-sds/components";
import "./styles.css";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
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
  
const POPPER_BASE_PROPS = {popperOptions: { strategy: "absolute"}};

function handleClickAway(){} 

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current])
  
  return (
    <div className="app" style={{paddingLeft: "10px"}}>
      <div ref={ref} />
      {open && 
        (
          // 👇 Only pay attention to the props here, everything else is just Zeroheight glue code
          <DropdownMenu
            PopperBaseProps={POPPER_BASE_PROPS}
            anchorEl={ref.current}
            onClickAway={handleClickAway}
            open={open}
            options={MENU_ITEMS}
          />
        )
      }
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dropdown</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### DropdownMenu with custom click target

The example below shows how `DropdownMenu` can be used in conjunction with a click target component (in this case, the `InputDropdown` component). When the click target is clicked, the `DropdownMenu` opens, and when a `MenuItem` is clicked, the `DropdownMenu` closes.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
// DropdownMenu with custom click target
      
import React, { SyntheticEvent, useState, useRef } from "react";
import { DropdownMenu, DefaultDropdownMenuOption, InputDropdown } from "@czi-sds/components";
import "./styles.css";

function App() {
  const MENU_ITEMS: DefaultDropdownMenuOption[] = [
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

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  function handleClick(event) {
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

  function handleChange(_, newValue) {
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
      <DropdownMenu
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

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dropdown</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### DropdownMenu with search

An `InputSearch` component can be incorporated into the `DropdownMenu` component by passing it the `search` prop.

The search functions by filtering out non-matches as the user types, leaving only menu items with text that match the input. If no matches are found, the `DropdownMenu` displays “No options” below the `InputSearch` by default. This text can be changed via the `noOptionsText` prop as shown below.

By default, the search’s input text is maintained even when a user selects a `MenuItem` (if multiple selections are allowed; otherwise the dropdown closes upon selection). This way users can select multiple `MenuItems` that match the searched term without needing to re-enter it each time. However, this can be changed so that the search input clears upon making a selection; see the “Dropdown with search and multi-select; does *not* maintain searched query upon selection of a menu item” example below.

1. In the search box, type in "fruit"
2. `DropdownMenu` will display "Fruit: Apple" and "Fruit: Orange"
3. Select "Fruit: Apple"
4. Note that the search text is maintained along with the limited list of items

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
// DropdownMenu with search
      
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultDropdownMenuOption } from "@czi-sds/components";
import "./styles.css";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
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

const POPPER_BASE_PROPS = {popperOptions: { strategy: "absolute"}};

function handleClickAway(){} 

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current])
  
  return (
    <div className="app" style={{paddingLeft: "10px"}}>
      <div ref={ref} />
      {open && 
        (
          // 👇 Only pay attention to the props here, everything else is just Zeroheight glue code
          <DropdownMenu
            PopperBaseProps={POPPER_BASE_PROPS}
            anchorEl={ref.current}
            noOptionsText="No matches found, try again!"
            onClickAway={handleClickAway}
            open
            options={MENU_ITEMS}
            search
          />
        )
      }
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dropdown</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### DropdownMenu with multi-select

You can allow users to select multiple menu items by passing the `DropdownMenu` component the `multiple` prop.  `MenuItems` will be shifted further to the right to make room for checkmarks displayed upon selection.

If the `multiple` prop is not `true`, the `DropdownMenu` allows just one selection. It closes and applies the selection once  a menu item is selected.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
// DropdownMenu with multi-select
      
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultDropdownMenuOption } from "@czi-sds/components";
import "./styles.css";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
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

const POPPER_BASE_PROPS = {popperOptions: { strategy: "absolute"}};

function handleClickAway(){} 

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current])
  
  return (
    <div className="app" style={{paddingLeft: "10px"}}>
      <div ref={ref} />
      {open && 
        (
          // 👇 Only pay attention to the props here, everything else is just Zeroheight glue code
          <DropdownMenu
            PopperBaseProps={POPPER_BASE_PROPS}
            anchorEl={ref.current}
            multiple
            onClickAway={handleClickAway}
            open
            options={MENU_ITEMS}
          />
        )
      }
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dropdown</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### Dropdown with search and multi-select; does *not* maintain searched query upon selection of a menu item

If search is included in the `DropdownMenu`, by default the search input will be maintained when a user selects a `MenuItem` (if multiple selections are allowed; otherwise the dropdown menu closes upon selection). However, the search input can be set to close upon selection by setting the optional `keepSearchOnSelect` prop to `false`.

This setting is intended to be used only when `search` and `multiple` are both set to true (otherwise it will have no noticeable affect since the dropdown menu closes upon selection if multi-select is not allowed, hiding the search bar).

To see how this works:

1. In the search box, type in "fruit"
2. `DropdownMenu` will display "Fruit: Apple" and "Fruit: Orange"
3. Select "Fruit: Apple"
4. Note that the search text is now cleared and all dropdown items reappear

Compare this to the default behavior in the "DropdownMenu with search" example above, or change the `keepSearchOnSelect`  prop in the example below to `true`.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
// Dropdown with multi-select that does not maintain searched query upon selection of a menu item
      
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultDropdownMenuOption } from "@czi-sds/components";
import "./styles.css";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
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
  
const POPPER_BASE_PROPS = {popperOptions: { strategy: "absolute"}};

function handleClickAway(){} 

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current])
  
  return (
    <div className="app" style={{paddingLeft: "10px"}}>
      <div ref={ref} />
      {open && 
        (
          // 👇 Only pay attention to the props here, everything else is just Zeroheight glue code
          <DropdownMenu
            PopperBaseProps={POPPER_BASE_PROPS}
            anchorEl={ref.current}
            keepSearchOnSelect={false}
            multiple
            onClickAway={function handleClickAway(){}}
            open
            options={MENU_ITEMS}
            search
          />
        )
      }
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dropdown</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### DropdownMenu with grouped sections

`MenuItems` can be displayed in groups with a label.

This requires passing `DropdownMenu` the `groupBy` prop to group options under the returned string. The `groupBy` value is also used as the text for group headings when `MUI Autocomplete renderGroup` is not provided. For example:

`groupBy={(option) => {`

			`return option.section; // this will group items by section`    

			`// Another example`

			`// this will group items by the last character of their names` 

			`return option.name.at(-1);` 

`}}`

This `groupBy` prop must be provided or the groups will not render, even if all menu items have `section` properties (see below).

>**Warning:** To avoid duplicate headers, please make sure that the options are also sorted with the same dimension that they are grouped by. (See: Issue and example below)

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
// Dropdown with grouped sections
      
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultDropdownMenuOption } from "@czi-sds/components";
import "./styles.css";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
  {
    name: "Menu item A.1",
    section: "Section A"
  },
  {
    name: "Menu item A.2",
    section: "Section A"
  },
  {
    name: "Menu item without a specified section",
  },
  {
    name: "Menu item B.1",
    section: "Section B"
  },
  {
    name: "Menu item C.1",
    section: "Section C"
  },
  {
    name: "Menu item C.2",
    section: "Section C"
  },
  {
    name: "Menu item C.3",
    section: "Section C"
  },
  {
    name: "Menu item B.2",
    section: "Section B"
  },
];

/**
 * Items need to be sorted by the same groupBy dimension
 * In this example, we're grouping by the last character of the item name
 */
const SORTED_ITEMS = [...MENU_ITEMS].sort((a, b) => {
  const aLastLetter = a.name.at(-1);
  const bLastLetter = b.name.at(-1);

  if (aLastLetter < bLastLetter) {
    return -1;
  }
  if (aLastLetter > bLastLetter) {
    return 1;
  }
  return 0;
});

function groupBy(option) {
  return option.name.at(-1)
}

const POPPER_BASE_PROPS = {popperOptions: { strategy: "absolute"}};

function handleClickAway(){} 

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current])
  
  return (
    <div className="app" style={{paddingLeft: "10px"}}>
      <div ref={ref} />
      {open && 
        (
          // 👇 Only pay attention to the props here, everything else is just Zeroheight glue code
          <DropdownMenu
            PopperBaseProps={POPPER_BASE_PROPS}
            anchorEl={ref.current}
            groupBy={groupBy}
            onClickAway={handleClickAway}
            open
            options={SORTED_ITEMS}
         />
        )
      }
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dropdown</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### DropdownMenu with menu items that have count, icon, and / or details

Each `MenuItem` provided to `DropdownMenu` can optionally include `count`, `details` and `sdsIcon` properties. 

The `count` property takes a number which is displayed to the right of the menu item text, with built-in spacing to its left (to prevent the menu item's text from running into it).

Add a text string to the `details` property to display text below the menu item’s main text.

`sdsIcon` can be passed the name of any icon in the SDS codebase and it will automatically render the icon to the left of the menu item’s text; if an invalid name is passed, the menu item will render the same as if no icon were passed to it.  The `sdsIconProps` prop can be added to a menu item with an icon to provide more specifics like a `className`or `color`.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
// Dropdown with grouped sections
      
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultDropdownMenuOption } from "@czi-sds/components";
import "./styles.css";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
  {
    name: "Menu item with count",
    count: 3
  },
  {
    name: "Menu item with details",
    details: "Details"
  },
  {
    name: "Menu item with icon",
    sdsIcon: "puzzlePiece",
  },
  {
    name: "Menu item with icon that has its own props",
    sdsIcon: "copy",
    sdsIconProps: {
      className: "custom-class-name",
      color: "error",
    },
  },
  {
    name: "Menu item with count, details, & icon",
    count: 908,
    details: "Details",
    sdsIcon: "lightBulb",
  },
];

const POPPER_BASE_PROPS = {popperOptions: { strategy: "absolute"}};

function handleClickAway(){} 

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current])
  
  return (
    <div className="app" style={{paddingLeft: "10px"}}>
      <div ref={ref} />
      {open && 
        (
          // 👇 Only pay attention to the props here, everything else is just Zeroheight glue code
          <DropdownMenu
            PopperBaseProps={POPPER_BASE_PROPS}
            anchorEl={ref.current}
            groupBy={(option: DefaultDropdownMenuOption) => {
              return option.section as string;
            }}
            onClickAway={handleClickAway}
            open
            options={MENU_ITEMS}
          />
        )
      }
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dropdown</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### DropdownMenu with components in place of menu items

In place of the text normally shown for a menu item, a custom component can be to displayed instead.

Any existing SDS component (must be imported) can be provided to the menu item's object (within the array passed to the `options` prop), via the `component` property. HTML elements (like the wrapper `<div>` surrounding the three `Tag` components in the example below) can also be used.

These custom menu items can optionally be assigned metadata just like regular menu items, including `section`, `count`, and `sdsIcon` and `sdsIconProps`.

>**Warning:** Currently, there is a bug preventing the `details` property from rendering when used in combination with a custom component in place of a menu item; see issue #522 for *details* (pun intended!).

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
// DropdownMenu with components in place of menu items
      
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultDropdownMenuOption, Tag, Button, ButtonIcon } from "@czi-sds/components";
import "./styles.css";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
  {
    component: (
      <Button
        sdsStyle="square"
        sdsType="primary"
      >
        Button
      </Button>
    ),
    name: "Button component",
    section: "Button component"
  },
  {
    component: (
      <ButtonIcon
        sdsIcon="Copy"
        sdsSize="large"
        sdsType="primary"
      />
    ),
    name: "ButtonIcon component",
    section: "ButtonIcon component",
  },
  {
    component: (
      <div style={{ marginTop: 10 }}>
        <Tag
          label="Tag 1"
          sdsStyle="rounded"
          sdsType="secondary"
          color="negative"
        />
        <Tag
          label="Tag 2"
          sdsStyle="rounded"
          sdsType="secondary"
          color="notice"
        />
        <Tag
          label="Tag 3"
          sdsStyle="rounded"
          sdsType="secondary"
          color="neutral"
        />
      </div>
    ),
    name: "tag components",
    section: "Tag components",
  },
  {
    component: (
      <Tag
        label="Tag"
        sdsStyle="rounded"
        sdsType="secondary"
        color="neutral"
      />
    ),
    name: "Button component",
    section: "Component with count and icon",
    count: 37,
    sdsIcon: "PuzzlePiece",
  },
];

const POPPER_BASE_PROPS = {popperOptions: { strategy: "absolute"}};

function handleClickAway(){} 

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current])
  
  return (
    <div className="app" style={{paddingLeft: "10px"}}>
      <div ref={ref} />
      {open && 
        (
          // 👇 Only pay attention to the props here, everything else is just Zeroheight glue code
          <DropdownMenu
            PopperBaseProps={POPPER_BASE_PROPS}
            anchorEl={ref.current}
            groupBy={(option: DefaultDropdownMenuOption) => {
              return option.section;
            }}
            onClickAway={handleClickAway}
            open
            options={MENU_ITEMS}
          />
        )
      }
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dropdown</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

---

## MenuItem

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `column` | `string` | `-` | The `column` prop determines the content displayed in the right column of the menu item. This content can be customized to provide additional information or context for the menu item. |
| `children` | `node` | `-` | Main content of the MenuItem. |
| `disabled` | `bool` | `false` | When set to `true`, the disabled prop indicates that the menu item is disabled and not interactable. |
| `isMultiSelect` | `bool` | `false` | When `true`, designates that the menu item supports multi-select functionality. |
| `sdsIcon` | `func` | `-` | Allows you to provide a custom SDS icon component to be displayed within the menu item. |
| `sdsIconProps` | `func` | `-` | Enables you to pass additional props to customize the SDS icon within the menu item. |
| `sdsStyle` | `"determinate"`  `| "indeterminate"` | `"determinate"` | Determines the style of the menu item, whether it is `determinate` or `indeterminate`. |
| `selected` | `bool` | `false` | When set to `true`, the `selected` prop signifies that the menu item is currently selected. |

### Code Examples

#### **Default MenuItem**

This example shows the minimum props needed for rendering a `MenuItem`.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import { MenuItem } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <MenuItem>
        MenuItem 1
      </MenuItem>
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dropdown</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### **Multi-Select MenuItem with Icon**

This example showcases a multi-select `MenuItem` component featuring an SDS `Icon` and a distinct column value.

>**SDS Tip:** MenuItem exclusively accepts SDS Icons in `xs` and `s` sizes. To explore a comprehensive list of SDS icons and their available sizes, refer to the IconBank page within Storybook.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import { useState } from "react";
import { MenuItem } from "@czi-sds/components";
import "./styles.css";

function App() {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(prev => !prev);
  };
  
  return (
    <div className="app">
      <MenuItem 
        isMultiSelect
        column="Column Value"
        sdsIcon="gear"
        count={3}
        sdsIconProps={{
          color: "beta"
        }}
        selected={selected}
        onClick={handleClick}
      >
        MenuItem 1
      </MenuItem>
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dropdown</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

## Component Recipes

## DropdownMenu Recipes

| These component recipes show a few of the more complex approaches available for customizing Dropdown Menus.  |   | **Jump to recipe:** DropdownMenu with customized `isOptionEqualToValue` DropdownMenu with customized `onChange` DropdownMenu with custom `PopperBaseProps` DropdownMenu with custom `Popper` component |
| --- | --- | --- |

#### **DropdownMenu with customized** **`isOptionEqualToValue`**

The `isOptionEqualToValue` prop changes how a selected value is compared against the available options. By default `option.name === val.name` is used. In the custom example below, the `id` property is used instead of the `name` property.

This is a MUI prop; learn more in the Autocomplete API.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
// DropdownMenu with customized `isOptionEqualToValue`
      
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultDropdownMenuOption } from "@czi-sds/components";
import "./styles.css";

function optionIdEqualToValueId(option, value) {
  return option.id === value.id;
}

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
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

const POPPER_BASE_PROPS = {popperOptions: { strategy: "absolute"}};

function handleClickAway() {}

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current])
  
  return (
    <div className="app" style={{paddingLeft: "10px"}}>
      <div ref={ref} />
      {open && 
        (
          // 👇 Only pay attention to the props here, everything else is just Zeroheight glue code
          <DropdownMenu
            PopperBaseProps={POPPER_BASE_PROPS}
            anchorEl={ref.current}
            isOptionEqualToValue={optionIdEqualToValueId}
            onClickAway={handleClickAway}
            open
            options={MENU_ITEMS}
          />
        )
      }
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DropdownMenu</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### **DropdownMenu with customized** **`onChange`** **prop**

The optional `onChange` prop specifies what happens when a new selection is made. 

In the example below, `onChange` has been modified such that making a new selection logs the `value`  and `reason` to the console.

This is a MUI prop; learn more in the Autocomplete API.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
// DropdownMenu with customized `onInputChange`
      
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultDropdownMenuOption } from "@czi-sds/components";
import "./styles.css";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
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

const POPPER_BASE_PROPS = {popperOptions: { strategy: "absolute"}};

function handleClickAway() {};

function Message({message}) {
  return (
    <div style={{ position: "absolute", top: "170px", fontFamily: "sans-serif" }}>
      <p>{JSON.stringify(message)}</p>
    </div>
  );
}

function App() {

  const [message, setMessage] = useState();
  
const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current])
  
  return (
    <div className="app" style={{paddingLeft: "10px"}}>
      <div ref={ref} />
      {open && 
        (
          // 👇 Only pay attention to the props here, everything else is just Zeroheight glue code
          <>
            <DropdownMenu
              PopperBaseProps={POPPER_BASE_PROPS}
              anchorEl={ref.current}
              keepSearchOnSelect
              onClickAway={handleClickAway}
              onChange={(_, value, reason) => setMessage({value, reason})}
              open
              options={MENU_ITEMS}
            />
            <Message message={message} />
          </>
        )
      }
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DropdownMenu</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### **DropdownMenu with custom** **`PopperBaseProps`**

`PopperBaseProps` is an SDS-specific prop made for passing custom props to the `Popper` component, which is included as part of the `DropdownMenu` component. 

The `Popper` component is part of MUI; learn more in the Popper documentation, and see all the props available to pass to it on the Popper API page.

The example below passes the Popper a `className` prop to make some style changes (see the styles.css tab in the code window below) and additionally uses the `sx` prop to make more style changes (learn more on the MUI `sx`  documentation page).

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
// DropdownMenu with custom `PopperBaseProps`
      
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultDropdownMenuOption } from "@czi-sds/components";
import "./styles.css";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
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
  popperOptions: { strategy: "absolute"},
}

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current])
  
  return (
    <div className="app" style={{paddingLeft: "10px"}}>
      <div ref={ref} />
      {open && 
        (
          // 👇 Only pay attention to the props here, everything else is just Zeroheight glue code
          <DropdownMenu
            PopperBaseProps={POPPER_BASE_PROPS}
            anchorEl={ref.current}
            onClickAway={function handleClickAway(){}}
            open
            options={MENU_ITEMS}
            PopperBaseProps={POPPER_BASE_PROPS}
          />
        )
      }
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DropdownMenu</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### **DropdownMenu with custom Popper component**

In addition to modifying the `Popper`'s  styles via `PopperBaseProps`,  the styles for the `Popper`  component can be overwritten more directly with `styled()`.  

To get all the default SDS styles used for `Popper`,  first copy them into a custom-styled `Popper`  (from within sci-components/packages/components/src/core/DropdownMenu/style.ts file). Then replace and / or follow up those styles with custom styles. The example below includes comments for each of these steps within `CustomPopper`.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
// DropdownMenu with custom Popper component
      
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { Popper, styled } from "@mui/material";
import { DropdownMenu, DefaultDropdownMenuOption } from "@czi-sds/components";
import "./styles.css";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
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

  // Step 2/3: Modify or add to the Popper component's base styles (copied in above) 
  // by putting your custom styles at the end:
  
  border-color: rebeccapurple;
  border-style: dotted;
  border-width: 15px !important;
`;

const POPPER_BASE_PROPS = {popperOptions: { strategy: "absolute"}};

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) setOpen(true);
  }, [ref.current])
  
  return (
    <div className="app" style={{paddingLeft: "10px"}}>
      <div ref={ref} />
      {open && 
        (
          // 👇 Only pay attention to the props here, everything else is just Zeroheight glue code
          <DropdownMenu
            PopperBaseProps={POPPER_BASE_PROPS}
            anchorEl={ref.current}
            onClickAway={function handleClickAway(){}}
            open
            options={MENU_ITEMS}
            // Step 3/3: Pass the new CustomPopper to PopperComponent prop
            PopperComponent={CustomPopper}
          />
        )
      }
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DropdownMenu</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

