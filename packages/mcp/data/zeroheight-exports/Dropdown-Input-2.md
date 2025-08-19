---
title: "Dropdown Input"
id: 7353074
uid: "1004b1"
slug: "1004b1-dropdown-input"
url: "https://sds.czi.design/009eaf17b/v/latest/p/1004b1-dropdown-input"
hidden: false
locked: false
created_at: "2025-07-07T20:31:05.402Z"
updated_at: "2025-07-07T20:31:06.565Z"
status_id: "not_applicable"
status_name: "SDS"
---

# Dropdown Input

Dropdown Inputs are elements that trigger Dropdown Menus to open, enabling users to make selections and communicate choices in the UI.

## Guidelines

## Dropdown Input Component

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Dropdown Input Types

There are two Dropdown Input types designers can use depending on whether their design calls for the input field's label to be inside the input itself ([Label](https://sds.czi.design/009eaf17b/v/0/p/1004b1-dropdown-input/t/755eb7) variant) or if an external label will be used with an accompanying Dropdown Input ([Value](https://sds.czi.design/009eaf17b/v/0/p/1004b1-dropdown-input/t/721a06) variant).

On click, Dropdown Inputs always trigger a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/42bdf2) to open.

>**Note:** The external field label shown as part of the Value variant visual below is for demonstration purposes only and is not built into the component itself; a separate label must be added to achieve this in product.

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=inputs-inputdropdown--default)

---

### Dropdown Input – Label

The Label variant functions as both the field label **and** the input field itself from which users make their selections. Before a selection is made, only the field label is displayed inside the input; after the user makes a selection, the selected value appears alongside the label inside the input field.

In instances where users can select more than one value, a counter showing the number of selections made is shown beside the label (this feature is limited to the rounded and square variants only). In cases where the designer does not want the value to appear in the input field after a selection is made (such as when using in combination with [Filter Tags](https://sds.czi.design/009eaf17b/v/0/p/39dc34-tags/t/70a4ba)), this feature can be disabled.

Optionally, Intent Messages can be displayed to further communicate why a Negative or Notice intent was triggered.

#### Rounded

| Default | Hover | Open | Disabled |
| :---: | :---: | :---: | :---: |

*Intent Variations*

Use Negative to communicate when a user has entered an incorrect or incomplete response and Notice when a user's response needs attention. Optionally, Intent Messages can be displayed to further communicate why a Negative or Notice intent was triggered. For more information see [Intents](https://sds.czi.design/009eaf17b/p/88e8a7).

| Negative | Negative + Intent Message | Notice | Notice + Intent Message |
| :---: | --- | :---: | --- |

#### Square

| Default | Hover | Open | Disabled |
| :---: | :---: | :---: | :---: |

*Intent Variations*

Use Negative to communicate when a user has entered an incorrect or incomplete response and Notice when a user's response needs attention. Optionally, Intent Messages can be displayed to further communicate why a Negative or Notice intent was triggered. For more information see [Intents](https://sds.czi.design/009eaf17b/p/88e8a7).

| Negative | Negative + Intent Message | Notice | Notice + Intent Message |
| :---: | --- | :---: | --- |

#### Minimal

| Default | Hover | Open | Disabled |
| :---: | :---: | :---: | :---: |

---

### Dropdown Input – Value

Use the Value variant when designs call for the input label to be a separate (external) HTML element from the input itself. Before a selection is made, the input should display a prompt instructing users to make a selection; after the user makes a selection, the selected value replaces the prompt in the input field.

Additionally, detail text can be included with each value to communicate additional information to the user such as providing a sub-label or clarifying information.

Optionally, Intent Messages can be displayed to further communicate why a Negative or Notice intent was triggered.

#### **Rounded**

| Default | Hover | Open | Disabled |
| :---: | :---: | :---: | :---: |

*Intent Variations*

Use Negative to communicate when a user has entered an incorrect or incomplete response and Notice when a user's response needs attention. Optionally, Intent Messages can be displayed to further communicate why a Negative or Notice intent was triggered. For more information see [Intents](https://sds.czi.design/009eaf17b/p/88e8a7).

| Negative | Negative + Intent Message | Notice | Notice + Intent Message |
| :---: | --- | :---: | --- |

#### **Square**

| Default | Hover | Open | Disabled |
| :---: | :---: | :---: | :---: |

*Intent Variations*

Use Negative to communicate when a user has entered an incorrect or incomplete response and Notice when a user's response needs attention. Optionally, Intent Messages can be displayed to further communicate why a Negative or Notice intent was triggered. For more information see [Intents](https://sds.czi.design/009eaf17b/p/88e8a7).

| Negative | Negative + Intent Message | Notice | Notice + Intent Message |
| :---: | --- | :---: | --- |

#### **Minimal**

| Default | Hover | Open | Disabled |
| :---: | :---: | :---: | :---: |

---

### Dropdown Input Spacing

These rules establish how much margin should exist between and around elements.

 

## Code

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

## InputDropdown

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/InputDropdown/index.tsx).

### SDS vs MUI

The SDS's `InputDropdown` component utilizes MUI's `Button` component as its foundation but introduces some SDS-specific enhancements. Below, the key distinctions between the SDS's `InputDropdown` and MUI's `Button` are outlined:

* **Variation**: MUI's `Button` offers a `variant` prop to define different visual styles for buttons. SDS's `InputDropdown`, however, uses the `sdsStyle` prop instead, providing the ability to select between three variants: `square`, `rounded`, or `minimal`.
* **Color**: In MUI's `Button`, the button's color can be modified using the `color` prop. SDS's `InputDropdown` deviates from this and introduces the `intent` prop. This prop provides the ability to choose between `default`, `warning`, and `error` colors, depending on the state of the `InputDropdown`.
* **Size**: While MUI's `Button` provides a `size` prop for adjusting the button's size, SDS's `InputDropdown` does not offer this capability. The size of the `InputDropdown` component remains fixed and cannot be altered through props.
* **Icon**: Unlike MUI's `Button`, which supports custom icons, SDS's `InputDropdown` does not accept external icon components. Instead, SDS's `InputDropdown` incorporates a built-in Chevron icon, which is an integral part of the component and cannot be replaced.

### MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-button/).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `counter` | `ReactNode` | `-` | If multiple set to `true`, this number shows the number of selected menu items. |
| `details` | `ReactNode` | `-` | A text showing details for the selected menu item. |
| `disabled` | `bool` | `false` | If `true`, the component is disabled. |
| `intent` | `"default"`  `| "negative"`  `| "notice"` `| "positive"` | `default` | The color of the component. |
| `label` | `ReactNode` | `-`	 | The label of the Input Button. |
| `multiple` | `bool` | `false` | Allows users to select multiple menu items.`multiple=true` cannot be used with the `minimum` variant. |
| `onClick` | `func` | `(event: React.MouseEvent<HTMLElement>) => void` | Sets what happens when a user clicks on the component. |
| `sdsStyle`     | `"minimal"`  `| "square"`  `| "rounded"` | `square` | The visual appearance of the component. |
| `sdsType` | `"label"`  `| "value"` | `label` | The `label` variant includes the label within the input field and showcases the selected menu item as additional details or sets the counter when in multi-select mode.  The `value` variant replaces the label with the selected value directly within the input field. The detailed information is then displayed in a separate section dedicated to displaying additional details. However, it's important to note that the value variant cannot be used in conjunction with multi-select mode.  |
| `shouldPutAColonAfterLabel` | `bool` | `true` | If `true`, a colon (:) will be added after the label or value. |
| `shouldTruncateMinimalDetails` | `bool` | `false` | If `true`, the details section of the minimal variant displays a truncated one-liner with an ellipsis (...), if `false` the details section expands to multiple lines for a comprehensive display. |
| `value` | `ReactNode` | `-` | The value that will be displayed in the component for the `value` variant. |

There are more props that can be used with the `InputDropdown`  component, via those available to [MUI's ](https://mui.com/material-ui/api/autocomplete/#props)`[Button](https://mui.com/material-ui/api/autocomplete/#props)`[ component](https://mui.com/material-ui/api/autocomplete/#props).

### Code Examples

#### Default InputDropdown

This example has the minimum props needed for the `InputDropdown` component.

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
// Most minimal InputDropdown (just has the basic requirements)
      
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { InputDropdown } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <InputDropdown label="Label"/>
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
    <title>Dropdown Inputs</title>
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

>**MUI Tip:** To ensure the InputDropdown button expands to fit the width of its container, users can utilize the `fullWidth` prop provided by MUI. When set to `true`, the `fullWidth` prop enables the InputDropdown button to occupy the entire available width within its parent container.

#### InputDropdown combined with a multi-select Dropdown

Below is an example demonstrating the combined utilization of the `InputDropdown` component and a multi-select `Dropdown` component. The `Dropdown` allows multiple selections, while the `InputDropdown` features a `square` variant.

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
import { InputDropdown, DropdownMenu, noop } from "@czi-sds/components";
import "./styles.css";

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
  const [value, setValue] = useState<
    DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  >([]);
  const [pendingValue, setPendingValue] = useState<
    DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  >([]);

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
      <DropdownMenu
        open={open}
        anchorEl={anchorEl}
        onClose={noop}
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
  };

  function handleChange(
    _: React.SyntheticEvent<Element, Event>,
    newValue: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  ){
    setPendingValue(newValue);
    setCounter((newValue as DefaultDropdownMenuOption[])?.length.toString());
  };

  function handleClickAway(){
    if (open) {
      setOpen(false);
    }
    setValue(pendingValue);
  };
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
    <title>Dropdown Inputs</title>
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

#### Rounded InputDropdown combined with a single select Dropdown

Below is an example demonstrating the combined utilization of the default `label` variant `InputDropdown` component and a single-select `Dropdown` component. 

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
import { InputDropdown, DropdownMenu, noop } from "@czi-sds/components";
import "./styles.css";

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
  const [value, setValue] = useState<
    DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  >(null);

  return (
    <div className="app">
      <InputDropdown 
        label="Label"
        onClick={handleClick}
        sdsStyle="rounded"
        multiple={false}
        value={inputDropdownValue}
      />
      <DropdownMenu
        open={open}
        anchorEl={anchorEl}
        onClose={noop}
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
  };

  function handleChange(
    _: React.SyntheticEvent<Element, Event>,
    newValue: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  ){
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
  };

  function handleClickAway(){
    if (open) {
      setOpen(false);
    }
  };
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
    <title>Dropdown Inputs</title>
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

#### Minimal InputDropdown combined with a single-select Dropdown

An example of the combined use of the value variation `InputDropdown` component and a single-select `Dropdown` component is shown below. 

>**Warning:** The `value` variant can not be used in conjunction with the multi-select Dropdowns. If you set `sdsType="value"` and `multiple="true"`, the component will default to showing a label and a counter instead.

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
import { InputDropdown, DropdownMenu, noop } from "@czi-sds/components";
import "./styles.css";

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
  const [value, setValue] = useState<
    DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  >(null);

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
      <DropdownMenu
        open={open}
        anchorEl={anchorEl}
        onClose={noop}
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
  };

  function handleChange(
    _: React.SyntheticEvent<Element, Event>,
    newValue: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  ){
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
  };

  function handleClickAway(){
    if (open) {
      setOpen(false);
    }
  };
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
    <title>Dropdown Inputs</title>
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

