---
title: "Tags"
id: 7353070
uid: "39dc34"
slug: "39dc34-tags"
url: "https://sds.czi.design/009eaf17b/v/latest/p/39dc34-tags"
hidden: false
locked: false
created_at: "2025-07-07T20:31:03.235Z"
updated_at: "2025-07-07T20:31:04.067Z"
status_id: "not_applicable"
status_name: "SDS"
---

# Tags

Tags are used to label the status of certain elements or in conjunction with filters to indicate which have been applied when viewing datasets.

## Guidelines

## Tag Components

| There are two types of Tags—standard and filter. Filter Tags are used in conjunction with the [Filter](https://sds.czi.design/009eaf17b/p/543108) component to indicate which filters have been applied to a given dataset. Standard Tags come in two styles, Rounded and Square, and can be used throughout the UI whenever there's a need to label an element or communicate a status associated with it. |   | **Jump to variant:** [Tag](https://sds.czi.design/009eaf17b/v/0/p/39dc34-tags/t/188d5f)  [Filter Tag](https://sds.czi.design/009eaf17b/v/0/p/39dc34-tags/t/14f23b) |
| --- | --- | --- |

### Visual Preview

---

## Tag

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Tag Styles

The two available Tag styles are shown below, demonstrated here using the primary type. There are five intents that Tags can communicate—see the [Intent Variations](https://sds.czi.design/009eaf17b/v/0/p/39dc34-tags/t/16e473) section below for more details.

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=tag--default)

---

### Tag – Rounded

Tag – Rounded is the default style used across applications, however if an alternate style is needed, use [Tag – Square](https://sds.czi.design/009eaf17b/v/0/p/39dc34-tags/t/37e6b3).

#### Primary

Use Tag – Primary in conjunction with the primary or most important content. Include an icon when needing to provide additional context to users of what content the Tag is connected to.

>**Note:** An icon must be included when using the large variant.

| Default | Hover | Pressed |
| --- | --- | --- |

#### Secondary

Use Tag – Secondary in conjunction with secondary or less important content. Include an icon when needing to provide additional context to users of what content the Tag is connected to.

>**Note:** An icon must be included when using the large variant.

| Default | Hover | Pressed |
| --- | --- | --- |

---

### Tag – Square

Tag – Square is to be used when an alternate Tag style is needed as determined by the product designer.

#### Primary

Use Tag – Primary in conjunction with the primary or most important content. Include an icon when needing to provide additional context to users of what content the Tag is connected to.

>**Note:** An icon must be included when using the large variant.

| Default | Hover | Pressed |
| --- | --- | --- |

#### Secondary

Use Tag – Secondary in conjunction with secondary or less important content. Include an icon when needing to provide additional context to users of what content the Tag is connected to.

>**Note:** An icon must be included when using the large variant.

| Default | Hover | Pressed |
| --- | --- | --- |

---

### Tag Spacing

These rules establish how much margin should exist between and around elements.

---

### Intent Variations

There are six different intents that Tags can communicate—Beta, Info, Negative, None, Notice, and Positive—indicated with the use of color.

Each intent is demonstrated below using the default state of the rounded variant for reference. Regardless of variant, the colors used are the same.

#### Primary

| Beta | Info | Negative | None | Notice | Positive |
| --- | --- | --- | --- | --- | --- |

#### Secondary

| Beta | Info | Negative | None | Notice | Positive |
| --- | --- | --- | --- | --- | --- |

---

## Filter Tag

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=tagfilter--default)

---

### Overview

Used Filter Tag in conjunction with [Filters](https://sds.czi.design/009eaf17b/p/543108) to communicate that the dataset is being filtered on the parameter indicated on the Filter Tag. Users click on the `Xmark` [icon](https://sds.czi.design/009eaf17b/p/529e08) to remove that parameter from the group of filters being applied.

| Default | Hover | Pressed |
| --- | --- | --- |

---

### Filter Tag Spacing

These rules establish how much margin should exist between and around elements.

## Code

## Tag Components

| There are two types of `Tags`—standard and filter. `TagFilter` is used in conjunction with the `Filter` component to indicate which filters have been applied to a given dataset. `Tag` comes in two styles, Rounded and Square, and can be used throughout the UI whenever there's a need to label an element or communicate a status associated with it. |   | **Jump to variant:** [Tag](https://sds.czi.design/009eaf17b/v/0/p/39dc34-tags/t/380d85) [TagFilter](https://sds.czi.design/009eaf17b/v/0/p/39dc34-tags/t/103bb6) |
| --- | --- | --- |

### Visual Preview

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

---

## Tag

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Tag/index.tsx).

### SDS vs MUI

The SDS `Tag` component is built on top of MUI's `Chip` component, though SDS is currently set up with distinct `Tag` and `TagFilter` components. The former is clickable but not deletable (whereas MUI's `Chip` can be either, both, or neither). Additionally, SDS's `Tag` component has a couple of props to help display SDS-specific visual properties:

* **`sdsStyle`****:**  This prop allows you specify whether the `Tag` should be `rounded` (default) or `square`.
* **`sdsType`****:**  This prop takes values of `primary` (default) or `secondary`.
* **`size`****:**  This prop is not available to SDS's `Tag`; instead its size changes automatically based on whether it is accommodating an icon via the `icon` prop or not.

### MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-chip/).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `hover` | `bool` | `-` | If `true`,  the component changes color when hovered over. |
| `label` | `string` | `-` | The label of the Tag. |
| `sdsType` | `"primary"` `| "secondary"`  | `primary`  | The `primary` variant has a `400` background color and white text color.   The `secondary` variant has a `100` background color and `500`  text color. |
| `sdsStyle`  | `"square"` `| "rounded"`  | `rounded`  | The shape of the component. |
| `sdsSize` | `"s" | "l"` | `"s"` | The size of the Tag component. The large-size tag must include an icon. |
| `color`  | `| "beta"` `| "info"` `| "negative"` `| "notice"` `| "positive"` `| [string, string]` `| [string, string, string]` | `-` | You have the flexibility to define the color of the component in two ways: 1. Choose from the available theme colors, such as `primary`, `info`, and more. 2. Customize the colors using one of the following syntax options: 			
    1. [`label and icon color`, `background color`]
    2. [`label color`, `background color`, `icon color`] |
| `icon`  | `JSX.Element`   | `-` | The icon that appears on the leading edge of the component. |

### Code examples

#### **Default Tag**

This example has the minimum props needed for the `Tag` component.

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
import { Tag } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Tag label="Science Design System"/>
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
    <title>Tags</title>
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

#### Tag + Icon

This example displays a rounded warning `Tag` component featuring an SDS icon positioned on the left side.

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
import { Icon, Tag } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Tag 
        label="Virus" 
        icon={<Icon sdsSize="l" sdsIcon="Virus" />}
        sdsStyle="rounded"
        color="negative"
        sdsSize="l"
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
    <title>Tags</title>
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

#### Tag with custom colors

This example shows a `Tag` component with customized colors applied to the label, background, and icon for a unique visual presentation.

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
import { Icon, Tag } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Tag 
        label="Star" 
        icon={<Icon sdsSize="l" sdsIcon="Star" />}
        color={["yellow", "#f23", "orange"]}
        sdsStyle="rounded"
        sdsSize="l"
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
    <title>Tags</title>
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

## TagFilter

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/TagFilter/index.tsx).

### SDS vs MUI

SDS's `TagFilter` component is built on top of MUI's `Chip` component and serves one specific purpose: it is meant to be used in conjunction with `Filters`, and does not have any of the stylistic props available to it that MUI's `Chip` or SDS's `Tag` components have.

### MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-chip/).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `-` | The content of the component. |
| `onDelete` | `func` | `-` | Callback fired when the delete icon is clicked. If set, the delete icon will be shown. |

### Code examples

#### Default TagFilter

This example has the minimum props needed for the `TagFilter` component.

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
import { TagFilter } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <TagFilter 
        label="Science Design System"
        onDelete={() => {}}
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
    <title>Tags</title>
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

