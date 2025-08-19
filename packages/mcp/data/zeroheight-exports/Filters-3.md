---
title: "Filters"
id: 7353047
uid: "543108"
slug: "543108-filters"
url: "https://sds.czi.design/009eaf17b/v/latest/p/543108-filters"
hidden: false
locked: false
created_at: "2025-07-07T20:30:53.289Z"
updated_at: "2025-07-07T20:30:53.735Z"
status_id: "not_applicable"
status_name: "SDS"
---

# Filters

Filters are used to narrow down large amounts of data based on specific criteria, helping users hone in on specific datasets within the product.

## Guidelines

## Filter Components

| There are two Filter components available to use depending on the filtering needs of the dataset. Simple Filter is used when the dataset has few filters and there is space within the layout to fit them all, whereas Complex Filter is used when there are many filters needed to fit into one layout, necessitating a more compact design. |   | **Jump to component:** [Simple Filter](https://sds.czi.design/009eaf17b/v/0/p/543108-filters/t/827ed8) [Complex Filter](https://sds.czi.design/009eaf17b/v/0/p/543108-filters/t/862461) |
| --- | --- | --- |

### Visual Preview

---

## Simple Filter

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Live Instance

>**Note:** Live instance for Simple Filter will be added soon.

---

### Overview

Use Simple Filter when there are only a few filter categories or a few options per category needed for a given dataset. Simple Filter is comprised of a label combined with an input that is Single-select ([Radio Input](https://sds.czi.design/009eaf17b/v/0/p/548a3d-control-inputs/t/8537bd)), Multi-select ([Checkbox Input](https://sds.czi.design/009eaf17b/v/0/p/548a3d-control-inputs/t/70fe02)), or a Range ([Slider](https://sds.czi.design/009eaf17b/v/0/p/548a3d-control-inputs/t/21aea3)) depending on the filtering needs of the dataset. It has all of the options for each filter exposed in the UI and viewable by the user. Users can filter using any combination of Filter options presented to them—see the [Filtering Logic](https://sds.czi.design/009eaf17b/v/0/p/543108-filters/t/085e46) section below for an overview of how applied Filters affect the dataset being filtered.

| Single-select | Multi-select | Range |
| --- | --- | --- |

---

### Simple Filter example

The example below shows Simple Filters being used as part of a Basic Panel (documentation to come) in CZ ID.

---

### Simple Filter Spacing

These rules establish how much margin should exist between and around elements.

---

## Complex Filter

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=complexfilter--default)

---

### Overview

Use Complex Filter when there are many filters needed to fit into one layout, necessitating a more compact design than [Simple Filter](https://sds.czi.design/009eaf17b/v/0/p/543108-filters/t/0694ae) allows for. Complex Filter is comprised of a [Dropdown Input](https://sds.czi.design/009eaf17b/p/1004b1), which serves as a trigger, combined with a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/42bdf2) which displays the available filter options. After the user selects a filter option, [Filter Tag](https://sds.czi.design/009eaf17b/v/0/p/39dc34-tags/t/70a4ba)[s](https://sds.czi.design/009eaf17b/v/0/p/39dc34-tags/t/70a4ba) are added below the Dropdown Input to display the active filter selections.

The Dropdown Menu triggered when the Dropdown Input is clicked can be Single-select, Multi-select, or a Range ([Slider](https://sds.czi.design/009eaf17b/v/0/p/548a3d-control-inputs/t/21aea3)) depending on the needs of the dataset. Users can filter using any combination of Filter options presented to them—see the [Filtering Logi](https://sds.czi.design/009eaf17b/v/0/p/543108-filters/t/085e46)[c](https://sds.czi.design/009eaf17b/v/0/p/543108-filters/t/085e46) section below for an overview of how applied Filters affect the dataset being filtered on.

| Single-select | Single-select + Search | Multi-select | Multi-select + Search | Range |
| --- | --- | --- | --- | --- |

#### **Complex Filter states**

| Closed | Open | Active |
| --- | --- | --- |

---

### Complex Filter example

The example below shows Complex Filters being used as part of a Basic Panel (documentation to come) in CZ ID.

---

### Complex Filter Spacing

These rules establish how much margin should exist between and around elements. Follow spacing rules for [Dropdown Menus](https://sds.czi.design/009eaf17b/p/42bdf2) for spacing guidance for the Complex Filter Input.

---

### Filtering Logic

Filtering logic is handled at the product level, however, this section offers some suggestions for best practices to consider when establishing filtering logic.

## Code

## Filter Components

| There are two `Filter` components available to use depending on the filtering needs of the dataset. `SimpleFilter` is used when the dataset has few filters and there is space within the layout to fit them all, whereas `ComplexFilter` is used when there are many filters needed to fit into one layout, necessitating a more compact design. |   | **Jump to component:** [SimpleFilter](https://sds.czi.design/009eaf17b/v/0/p/543108-filters/t/87d16c) [ComplexFilter](https://sds.czi.design/009eaf17b/v/0/p/543108-filters/t/23d380) |
| --- | --- | --- |

### Visual Preview

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

---

## SimpleFilter

>**Note:** Code details for `SimpleFilter` will be added soon.

---

## ComplexFilter

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/ComplexFilter/index.tsx).

### SDS vs MUI

The `ComplexFilter` is not directly based on any MUI component, but it does use the [SDS ](https://czi.zeroheight.com/styleguide/s/66099/p/42bdf2-dropdown-menu/b/177008/t/550be2)`[Dropdown](https://czi.zeroheight.com/styleguide/s/66099/p/42bdf2-dropdown-menu/b/177008/t/550be2)`[ component](https://czi.zeroheight.com/styleguide/s/66099/p/42bdf2-dropdown-menu/b/177008/t/550be2), which in turn is ultimately based on [MUI's ](https://mui.com/material-ui/react-autocomplete/)`[Autocomplete](https://mui.com/material-ui/react-autocomplete/)`[ component](https://mui.com/material-ui/react-autocomplete/). As such, props that are available to either SDS's `Dropdown` and / or MUI's `Autocomplete` can be passed to `ComplexFilter` as such:

* **`DropdownMenuProps`****:** use this prop to pass MUI`Autocomplete`-specific props to `ComplexFilter`  
* **`InputDropdownProps`****:** use this prop to pass SDS `InputDropdown`-specific props to `ComplexFilter`  

### Props

Any custom SDS props and MUI props required for implementation are found in the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `isTriggerChangeOnOptionClick` | `bool` | `false` | Determines whether changes are triggered in real-time upon clicking an option |
| `keepSearchOnSelect` | `bool` |   | Maintains a search input when a user selects an option (only if multiple selections are allowed via the `multiple`  prop; otherwise the dropdown closes upon selection) |
| `label` | `string` | `""` | Sets the label of filter, shown both when closed and open |
| `multiple` | `bool` | `false` | Defines whether multiple selections or can be made from the filter simultaneously or only one |
| `onChange` | `func` | `-` | Function to set what happens when a new value is set via the filter |
| `search` | `bool` | `false` | Provides a search bar at the top of the filter from which users can narrow the list of menu items |

### Code Examples

#### Default ComplexFilter

This examples demonstrates the minimum props needed to render a `ComplexFilter`.

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
import { ComplexFilter, DefaultDropdownMenuOption } from "@czi-sds/components";
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
    <title>Filters</title>
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

#### Multi select ComplexFilter with Search

This example showcases a `ComplexFilter` component featuring `InputSearch` for filtering menu items. Users have the flexibility to select multiple options to refine their selections.

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
import { ComplexFilter, DefaultDropdownMenuOption } from "@czi-sds/components";
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

function App() {
  
  return (
    <div className="app">
      <ComplexFilter
        label="Filter Label"
        onChange={() => {}}
        options={MENU_ITEMS}
        DropdownMenuProps={{
          groupBy: (option: DefaultDropdownMenuOption) =>
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
    <title>Filters</title>
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

#### ComplexFilter with realtime selection changes

This example showcases the functionality that enables the dropdown selections to be instantly reflected in the tags in real-time. This is achieved by utilizing the `isTriggerChangeOnOptionClick` prop.

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
import { ComplexFilter, DefaultDropdownMenuOption } from "@czi-sds/components";
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

function App() {
  
  return (
    <div className="app">
      <ComplexFilter
        label="Filter Label"
        onChange={() => {}}
        options={MENU_ITEMS}
        DropdownMenuProps={{
          groupBy: (option: DefaultDropdownMenuOption) =>
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
    <title>Filters</title>
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

