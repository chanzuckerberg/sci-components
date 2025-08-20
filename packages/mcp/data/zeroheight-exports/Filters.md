# Filters

Filters are used to narrow down large amounts of data based on specific criteria, helping users hone in on specific datasets within the product.

## Overview

|  | In Figma |   |  | Meets Accessibility |   |  | In napari hub + .org Codebases |
| --- | --- | --- | --- | --- | --- | --- | --- |

Filters are comprised of a Dropdown Input which serves as a clickable Filter label combined with a Dropdown Menu to show the Filter Input options when the Filter Label is active, and Tags to display which options are currently being filtered on. The Dropdown Menu activated when the Filter Label is clicked displays the Filter Input options available.

Users can filter using any combination of Filter options presented to them—see the Filtering Logic section below for an overview of how applied Filters affect the dataset being filtered on.

| **Closed** | **Open** | **Active** |
| --- | --- | --- |

### Filter Variants

---

### Filter Example

The example below shows Filters being used as part of the plugin search on napari hub.

---

### Filter Spacing

These rules establish how much margin should exist between and around elements. Follow spacing rules for Dropdown Menus for spacing guidance for the Filter Input.

---

## Filtering Logic

Filtering logic is handled at the product level; however, this section offers some suggestions for best practices to consider when establishing filtering logic.

## Code

## Filter Components

| Below you will find an interactive Storybook iframe for Filters.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** FilterComplex |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the napari hub or napari.org codebases, use a theme file to enable the napari visual appearance customization.

### FilterComplex

Note: the Filter component used in napari hub + .org is using the FilterComplex component from the SDS codebase.

Storybook

---

Filters are used to narrow down large amounts of data based on specific criteria, helping users hone in on specific datasets within the product.

## Overview

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ GEN EPI Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Filters are comprised of a Dropdown Input which serves as a clickable Filter label combined with a Dropdown Menu to show the Filter Input options when the Filter Label is active, and Filter Tags to display which options are currently being filtered on.

The Dropdown Menu that is activated when the Filter Label is clicked displays the Filter Input options available and, depending on the needs of the dataset, can be Single-select (Radio Lockup), Multi-select (Checkbox Lockup), or a Range (Slider). Users can filter using any combination of Filter options presented to them—see the Filtering Logic section below for an overview of how applied Filters affect the dataset being filtered on.

| **Closed** | **Open** | **Active** |
| --- | --- | --- |

### Filter Variants

---

---

---

 

### Filter Example

The example below shows Complex Filters being used as part of a Basic Panel in CZ GEN EPI.

---

### Filter Spacing

These rules establish how much margin should exist between and around elements. Follow spacing rules for Dropdown Menus for spacing guidance for the Complex Filter Input.

---

## Filtering Logic

Filtering logic is handled at the product level, however, this section offers some suggestions for best practices to consider when establishing filtering logic.

---

## Code

## Filter Components

| Below you will find an interactive Storybook iframe for Filters.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** FilterComplex |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the CZ GEN EPI codebase, use a theme file to enable the CZ GEN EPI visual appearance customization.

### FilterComplex

Storybook

---

Filters are used to narrow down large amounts of data based on specific criteria, helping users hone in on specific datasets within the product.

## Overview

## Filter Variants

| Filters come in two different variants for designers to use depending on the filtering needs of the dataset the filter applies to. Simple Filters are used when the dataset has few filter options and there is space within the layout to fit them all, whereas Complex Filters are used when there are multiple filters needed to fit into one layout, necessitating a more compact design.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Filter for any given use case. |   | **Jump to variant:** Simple Complex Filtering Logic |
| --- | --- | --- |

---

## Simple Filter

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Use the Simple Filter when there are only a few options to filter on or there are only a few filter categories needed for a given dataset. Simple Filters are comprised of a Filter Label combined with a Filter Input that is Single-select (Radio Lockup), Multi-select (Checkbox Lockup), or a Range (Slider) depending on the filtering needs of the dataset. In contrast to Complex Filters which keep filter options contained within a Dropdown Menu, Simple Filters have all of the options for each filter exposed in the UI and viewable by the user. Users can filter using any combination of Filter options presented to them—see the Filtering Logic section below for an overview of how applied Filters affect the dataset being filtered.

---

---

### Simple Filter Example

The example below shows Simple Filters being used as part of a Basic Panel in CZ ID.

 

---

### Simple Filter Spacing

These rules establish how much margin should exist between and around elements.

---

## Complex Filter

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Use the Complex Filter when there are multiple filters needed to fit into one layout, necessitating a more compact design than a Simple Filter would allow for. Complex Filters are comprised of a Dropdown Input which serves as a clickable Filter Label combined with a Dropdown Menu to show the Filter Input options when the Filter Label is active, and Filter Tags to display which options are currently being filtered on.

The Dropdown Menu that is activated when the Filter Label is clicked displays the Filter Input options available and, depending on the needs of the dataset, can be Single-select (Radio Lockup), Multi-select (Checkbox Lockup), or a Range (Slider). Users can filter using any combination of Filter options presented to them—see the Filtering Logic section below for an overview of how applied Filters affect the dataset being filtered on.

| **Closed** | **Open** | **Active** |
| --- | --- | --- |

### Complex Filter Variants

---

---

---

---

 

### Complex Filter Example

The example below shows Complex Filters being used as part of a Basic Panel in CZ ID.

---

### Complex Filter Spacing

These rules establish how much margin should exist between and around elements. Follow spacing rules for Dropdown Menus for spacing guidance for the Complex Filter Input.

---

## Filtering Logic

Filtering logic is handled at the product level, however, this section offers some suggestions for best practices to consider when establishing filtering logic.

---

## Code

## Filter Components

| Below you will find an interactive Storybook iframe for Panels.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** FilterSimple FilterComplex |
| --- | --- | --- |

---

### FilterSimple (coming soon)

---

### FilterComplex

Storybook

---

Filters are used to narrow down large amounts of data based on specific criteria, helping users hone in on specific datasets within the product.

## Guidelines

## Filter Components

| There are two Filter components available to use depending on the filtering needs of the dataset. Simple Filter is used when the dataset has few filters and there is space within the layout to fit them all, whereas Complex Filter is used when there are many filters needed to fit into one layout, necessitating a more compact design. |   | **Jump to component:** Simple Filter Complex Filter |
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

Use Simple Filter when there are only a few filter categories or a few options per category needed for a given dataset. Simple Filter is comprised of a label combined with an input that is Single-select (Radio Input), Multi-select (Checkbox Input), or a Range (Slider) depending on the filtering needs of the dataset. It has all of the options for each filter exposed in the UI and viewable by the user. Users can filter using any combination of Filter options presented to them—see the Filtering Logic section below for an overview of how applied Filters affect the dataset being filtered.

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

Default

---

### Overview

Use Complex Filter when there are many filters needed to fit into one layout, necessitating a more compact design than Simple Filter allows for. Complex Filter is comprised of a Dropdown Input, which serves as a trigger, combined with a Dropdown Menu which displays the available filter options. After the user selects a filter option, Filter Tags are added below the Dropdown Input to display the active filter selections.

The Dropdown Menu triggered when the Dropdown Input is clicked can be Single-select, Multi-select, or a Range (Slider) depending on the needs of the dataset. Users can filter using any combination of Filter options presented to them—see the Filtering Logic section below for an overview of how applied Filters affect the dataset being filtered on.

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

These rules establish how much margin should exist between and around elements. Follow spacing rules for Dropdown Menus for spacing guidance for the Complex Filter Input.

---

### Filtering Logic

Filtering logic is handled at the product level, however, this section offers some suggestions for best practices to consider when establishing filtering logic.

## Code

## Filter Components

| There are two `Filter` components available to use depending on the filtering needs of the dataset. `SimpleFilter` is used when the dataset has few filters and there is space within the layout to fit them all, whereas `ComplexFilter` is used when there are many filters needed to fit into one layout, necessitating a more compact design. |   | **Jump to component:** SimpleFilter ComplexFilter |
| --- | --- | --- |

### Visual Preview

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

---

## SimpleFilter

>**Note:** Code details for `SimpleFilter` will be added soon.

---

## ComplexFilter

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

The `ComplexFilter` is not directly based on any MUI component, but it does use the SDS `Dropdown` component, which in turn is ultimately based on MUI's `Autocomplete` component. As such, props that are available to either SDS's `Dropdown` and / or MUI's `Autocomplete` can be passed to `ComplexFilter` as such:

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

