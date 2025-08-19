---
title: "Field Inputs"
id: 7353069
uid: "1596f8"
slug: "1596f8-field-inputs"
url: "https://sds.czi.design/009eaf17b/v/latest/p/1596f8-field-inputs"
hidden: false
locked: false
created_at: "2025-07-07T20:31:02.547Z"
updated_at: "2025-07-07T20:31:03.190Z"
status_id: "not_applicable"
status_name: "SDS"
---

# Field Inputs

Field Inputs are elements that allow users to type within them, providing an area for users to enter content and information or perform a search.

## Guidelines

## Field Input Components

| There are two Field Input components available to use—Search Inputs allow users to enter text to perform a search and Text Inputs provide a free-form space for users to type in information as needed. |   | **Jump to variant:** [Search Input](https://sds.czi.design/009eaf17b/v/0/p/1596f8-field-inputs/t/74ee84) [Text Input](https://sds.czi.design/009eaf17b/v/0/p/1596f8-field-inputs/t/926c6d) |
| --- | --- | --- |

### Visual Preview

---

## Search Input

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Search Input Styles

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=inputs-inputsearch--default)

---

### Search Input – Rounded

Use Search Input – Rounded as part of top-level or primary application searches such as instances where the user will be searching across the entire product or platform.

After users enter text into the Search field, an `XmarkCircle` icon appears; if clicked the field is reset to default.

| Default | Hover | Focus | Default (user input) | Disabled |
| --- | --- | --- | --- | --- |

---

### Search Input – Square

Use Search Input – Square for searches constrained to the element the Input is placed within such as when used in [Dropdown Menus](https://sds.czi.design/009eaf17b/p/42bdf2) or [Panels](https://sds.czi.design/009eaf17b/p/16422a), or within the body or main content area of applications.

After users enter text into the Search field, an `XmarkCircle` icon appears; if clicked the field is reset to default.

| Default | Hover | Focus | Default (user input) | Disabled |
| --- | --- | --- | --- | --- |

---

### Search Input Spacing

These rules establish how much margin should exist between and around elements.

---

### Intent Variations

Use Default to communicate that the user has yet to enter a response or the response is valid, Negative to communicate when a user has entered an incorrect or incomplete response, and Notice when a user's response needs attention.

Optionally, Intent Messages can be displayed to further communicate why a Negative or Notice intent was triggered. For more information see [Intents](https://sds.czi.design/009eaf17b/p/88e8a7).

Each intent is demonstrated below using the Rounded variant for reference. Regardless of variant, the colors used are the same:

| Default | Negative | Negative + Intent Message | Notice | Notice + Intent Message |
| --- | --- | --- | --- | --- |

---

## Text Input

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Text Input Types

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=inputs-inputtext--default)

---

### Text Input – Field

Text Input – Field is designed to fit one line of text and should be only used when there is a limited amount or a single line's worth of content intended for the user to input. 

| Default | Hover | Focus | Default (user input) | Disabled |
| --- | --- | --- | --- | --- |

---

### Text Input – Area

Text Input – Area is meant to fit multiple lines of text and should be used when there is the potential that the user will want or need to input more than a single line's worth of content.

It includes a handle in the bottom right corner that the user can grab and drag to expand its size.

It can be set to accept a specific number of characters in case there is a need to limit how much content the user can enter.

| Default | Hover | Focus | Default (user input) | Disabled |
| --- | --- | --- | --- | --- |

---

### Text Input Spacing

These rules establish how much margin should exist between and around elements.

---

### Text Input Intent Variations

Use Default to communicate that the user has yet to enter a response or the response is valid, Negative to communicate when a user has entered an incorrect or incomplete response, Notice when a user's response needs attention, and Positive when a user's response is accepted or correct.

Optionally, Intent Messages can be displayed to further communicate why a Negative, Notice, or Positive intent was triggered. For more information see [Intents](https://sds.czi.design/009eaf17b/p/88e8a7).

| Default |  Negative | Negative + Intent Message | Notice | Notice + Intent Message | Positive | Positive + Intent Message |
| :---: | :---: | --- | :---: | --- | :---: | --- |

## Code

## Control Input Components

| There are two Field Input components available to use—`InputSearch` allows users to enter text to perform a search and `InputText` provide a free-form space for users to type in information as needed. |   | **Jump to component:** [InputSearch](https://sds.czi.design/009eaf17b/v/0/p/1596f8-field-inputs/t/09e24e) [InputText](https://sds.czi.design/009eaf17b/v/0/p/1596f8-field-inputs/t/71220e) |
| --- | --- | --- |

### Visual Preview

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

---

## InputSearch

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/InputSearch/index.tsx).

### SDS vs MUI

SDS's `InputSearch` is built on MUI's `TextField` component, with `type="search"`.  It also has the SDS "search" icon automatically included, aligned to the right end of the field. 

The following  props are available to MUI's `TextField` component, but do not work the same way (or at all) for SDS's `InputSearch` component:

* **`variants`****:**  SDS's `InputSearch` component is not set up to support values for this prop (aside from `outlined`,  `InputSearch` default), and using other values available to MUI (`filled`,  `standard`) may  result in unreliable outputs
* **`size`****:**  SDS's `InputSearch` component is not set up to support values for this prop (aside from `small`,  `InputText`'s default), and using other values available to MUI (`medium`,  `large`)  may not have reliable outputs
* **`required`****:**  SDS's `InputSearch` does not render the expected asterisk (*) following the label when this prop is `true`
*  **`select`****:**  SDS's `InputSearch` is not set up to support this boolean prop
* **`hiddenLabel`****:**  The `label` ("Search", by default) for SDS's component is included within the search field, not outside of it, and the MUI `hiddenLabel` prop will not hide the label

The following functionality is available to both MUI's `TextField` component and SDS's `InputText` component, but SDS uses different prop names, shown below:

* **`intent`****:**  This prop is the way you can set colors for SDS's `InputText`,  based on its error state. It takes `default` (default, gray), `error`,  or `warning` as values. The related MUI-color-setting prop, `color`,  has no effect for `InputText` in SDS.

SDS's `InputSearch` has an additional `sdsStyle` prop to help with setting SDS-specific styles, which takes `square` (default) or `rounded` as values.

### MUI Documentation

Documentation for the underlying MUI `TextField`  component can be found [here](https://mui.com/material-ui/react-text-field/).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | When set to `true`, the component becomes disabled and cannot be interacted with. |
| `handleSubmit` | `func` | `function(value: string) => void` | This function is called when the Search icon is clicked, allowing user to handle the search operation. |
| `id` | `string` | `-` | Specifies the unique `id` for the input element,  needed for accessibility. |
| `intent` | `"default"` `| "negative"` `| "notice"` `| "positive"` | `"default"` | Alters the border color and visual intent of the search input. |
| `label` | `string` | `-` | Although hidden, this `label` is provided for accessibility purposes. |
| `onChange` | `func` | `function(event: React.ChangeEvent) => void` | Defines the action to be taken when the input value changes. |
| `placeholder` | `string` | `"Search"` | Sets the `placeholder` text displayed within the input element. |
| `sdsStyle` | `"rounded"` `| "square"` | `"square"`  | Determines the visual style of the component, with options for `rounded` or `square` design. |
| `value` | `string` | `-` | The value of the `input` element, required for a controlled component. |

### Code examples

#### **Default InputSearch**

This example has the minimum props needed for the `InputSearch` component.

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
import { InputSearch } from "@czi-sds/components";
import { Box } from "@mui/material";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 300 }}>
        <InputSearch
          id="search-input"
          label="search"
          placeholder="Search"
        />
      </Box>
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
    <title>Field Inputs</title>
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

## InputText

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/InputText/index.tsx).

### SDS vs MUI

Like SDS's `InputSearch` (which is also built upon the same MUI component), the following props and options do not work the same way (or at all) for SDS's `InputText` component even though they are available to MUI's `TextField` component.

* **`variants`****:**  SDS's `InputText` component is not set up to support values for this prop (aside from `outlined`,  `InputText`'s default), and using other values available to MUI (`filled`,  `standard`)  may  result in unreliable outputs
* **`size`****:**  SDS's `InputText` component is not set up to support values for this prop (aside from `small`,  `InputText`'s default), and using other values available to MUI (`medium`,  `large`)  may not have reliable outputs
* **`required`****:**  SDS's `InputText` does not render the expected asterisk (*) following the label when this prop is `true`
*  **`select`****:**  SDS's `InputText` is not set up to support this boolean prop

The following functionality is available to both MUI's `TextField` component and SDS's `InputText` component, but SDS uses different prop names, shown below:

* **`sdsType`****:**  This is the SDS-equivalent of MUI's boolean `multiline` prop, and takes `textField` (default) or `textArea` as values
* **`hideLabel`****:**   This is the SDS-equivalent of the `hiddenLabel` prop used in MUI; both are boolean with the default not including them (value of `false`)
* **`intent`****:**  This prop is the way you can set colors for SDS's `InputText`,  based on its error state. It takes `default` (default, gray), `error`,  or `warning` as values. The related MUI-color-setting prop, `color`,  has no effect for `InputText` in SDS.

### MUI Documentation

Documentation for the underlying MUI `TextField`component can be found [here](https://mui.com/material-ui/react-text-field/).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | When set to `true`, the component becomes disabled and cannot be interacted with. |
| `hideLabel` | `boolean` | `false` | If `true`, the label is hidden.  |
| `id` | `string` | `-` | Specifies the unique `id` for the input element,  needed for accessibility. |
| `intent` | `"default"` `| "negative"` `| "notice"` `| "positive"` | `"default"` | Alters the border color and visual intent of the search input. |
| `label` | `string` | `-` | The `label` for the input element. |
| `placeholder` | `string` | `-` | Sets the `placeholder` text displayed within the input element. |
| `sdsType` | `"textField"` `| "textArea"` | `"textField"` | Defines the type of component to render, with options for a text input or text area. |

### Code examples

#### **InputText – Text Field**

This component represents the text field variant of the `InputText` component.

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
import { InputText } from "@czi-sds/components";
import { Box } from "@mui/material"; 
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 300 }}>
        <InputText
          id="search-input"
          label="Label"
          placeholder="Enter your text"
          hideLabel
        />
      </Box>
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
    <title>Field Inputs</title>
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

#### InputText – Text Area

This component represents the text area variant of the `InputText` component.

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
import { InputText } from "@czi-sds/components";
import { Box } from "@mui/material"; 
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 300 }}>
        <InputText
          id="search-input"
          label="Description"
          placeholder="Enter your text"
          sdsType="textArea"
        />
      </Box>
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
    <title>Field Inputs</title>
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

