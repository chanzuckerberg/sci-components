---
title: "Tabs"
id: 7353071
uid: "0887dd"
slug: "0887dd-tabs"
url: "https://sds.czi.design/009eaf17b/v/latest/p/0887dd-tabs"
hidden: false
locked: false
created_at: "2025-07-07T20:31:04.105Z"
updated_at: "2025-07-07T20:31:04.741Z"
status_id: "not_applicable"
status_name: "SDS"
---

# Tabs

Tabs allow users to switch between different sets of information or content that is related to one overarching category while staying on the same page.

## Guidelines

## Overview

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Tabs Sizes

There are two sizes of Tabs available for use which is determined by their location in the UI, the key difference being the size of the text on each Tab. Each size can include a counter to indicate the number of items on that Tab’s screen such as when used as part of [Filter](https://sds.czi.design/009eaf17b/p/543108) results. They can also be paired with an underline that spans the width of the entire div the tab group is placed within to provide visual separation between the Tabs and the content beneath them.

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=tabs--default)

---

### Tabs – Large

Tabs – Large is used at a top level within the UI. If a secondary layer of tabbing is needed, use [Tabs – Small](https://sds.czi.design/009eaf17b/v/0/p/0887dd-tabs/t/21cff3).

Include a counter when necessary to indicate the number of viewable items available when navigating to that Tab's screen.

| Default | Hover | Active | Disabled |
| --- | --- | --- | --- |

---

### Tabs – Small

Tabs – Small is an alternative size to be used only in conjunction with Tabs – Large when a secondary layer of tabbing is needed.

Include a counter when necessary to indicate the number of viewable items available when navigating to that Tab's screen.

| Default | Hover | Active | Disabled |
| --- | --- | --- | --- |

---

### Tabs Spacing

These rules establish how much margin should exist between and around elements.

## Code

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

## Tabs

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Tabs/index.tsx).

### SDS vs MUI

The SDS `Tabs` component is built on the MUI `Tabs` component, but the SDS version has a few additional props to provide stylistic options that fit within the SDS designs:

* **`sdsSize`****:**  Takes `large` (default) or `small` as values, and sizes the Tabs component and its label text accordingly
* **`underlined`****:**  This boolean prop extends a light gray underline beneath the whole of the `Tabs` component when true; without this prop, only the selected tab has an underline of the primary color
* **count, metadata, and / or component:** Each individual tab within the `Tabs` component can be assigned a count, via a prop associated to that tab's position, such as `tabOneCount` for the first tab. These props take a number value to represent a count, but they can also take text or even another component, for example:

		`count={123}`  

		`count={"Hello!"}`

		`tabThreeCount={<Tag />}`  ﻿  ﻿

This [example](https://sds.czi.design/009eaf17b/v/0/p/0887dd-tabs/t/91eda2) demonstrates passing a ReactNode as the count prop to a `Tabs` component.

### MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-tabs/).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `sdsSize` | `"small"` `| "large"` | `"large"` | Specifies the size of the Tab element. |
| `underlined` | `boolean` | `false` | when set to `true`, adds a gray bottom border to the tab group, providing a distinctive visual effect. |

### Code examples

#### Tabs – Large

This example demonstrates a `Tabs` group with a larger visual style.

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
import { useState, SyntheticEvent } from "react";
import { Tabs, Tab } from "@czi-sds/components";
import "./styles.css";

function App() {
  const [value, setValue] = useState(0);

  const handleTabsChange = (_: SyntheticEvent, tabsValue: unknown) => {
    setValue(tabsValue as number);
  };
  
  return (
    <div className="app">
      <Tabs value={value} sdsSize="large" onChange={handleTabsChange}>
        <Tab label="First Tab"/>
        <Tab label="Second Tab"/>
      </Tabs>
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
    <title>Tabs</title>
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

#### Tabs – Small

This example showcases a `Tabs` group with a smaller visual style.

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
import { useState, SyntheticEvent } from "react";
import { Tabs, Tab } from "@czi-sds/components";
import "./styles.css";

function App() {
  const [value, setValue] = useState(0);

  const handleTabsChange = (_: SyntheticEvent, tabsValue: unknown) => {
    setValue(tabsValue as number);
  };
  
  return (
    <div className="app">
      <Tabs value={value} sdsSize="small" onChange={handleTabsChange}>
        <Tab label="First Tab"/>
        <Tab label="Second Tab"/>
      </Tabs>
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
    <title>Tabs</title>
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

#### Tabs with count, text, and component

This example shows an underlined `Tabs` group where the last tab includes a custom `Tag` component alongside the count.

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
import { useState, SyntheticEvent } from "react";
import { Tabs, Tab, Tag } from "@czi-sds/components";
import { styled } from "@mui/material";
import "./styles.css";

function App() {
  const [value, setValue] = useState(0);

  const handleTabsChange = (_: SyntheticEvent, tabsValue: unknown) => {
    setValue(tabsValue as number);
  };

  const CountWrapper = styled("span")`
    margin-right: 5px;
  `;
  
  function BetaTagWithCount() {
    return (
      <>
        <CountWrapper>14</CountWrapper>
        <Tag label="BETA" color="beta" sdsStyle="rounded" sdsType="secondary" />
      </>
    );
  }
  
  return (
    <div className="app">
      <Tabs value={value} sdsSize="large" onChange={handleTabsChange} underlined>
        <Tab label="First Tab" count="4" />
        <Tab label="Second Tab" count="20" />
        <Tab label="Third Tab" count={<BetaTagWithCount />} />
      </Tabs>
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
    <title>Tabs</title>
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

