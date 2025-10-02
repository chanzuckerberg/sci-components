# Tabs

Tabs allow users to switch between different sets of information or content that is related to one overarching category or group while staying on the same page.

## Overview

## Tab Variants

| There are two sizes of Tabs available for use determined by their location in the UI. Individual tabs within each size can optionally include an alert to draw user's attention to something specific on that tab, such as to communicate the content on the tab is newly added or updated. They can also be paired with an underline that spans the width of the entire div the tab group is placed within to provide visual separation between the Tabs and the content beneath them. Follow the usage criteria accompanying each variant as a guide for selecting the correct Tab size for any given use case. |     | **Jump to variant:** Large Small |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | -------------------------------- |

---

## Tabs

|     | In Figma |     |     | Meets Accessibility |     |     | In napari hub + .org Codebases |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------------------------------ |

### Large Tabs

Default Tabs size to be used throughout the UI. Specifically used in napari hub at the top of plugin detail pages allowing users to change between the plugin's description and additional information such as usage activity and related analytics or citation information.

An optional alert can be added on a per Tab basis to communicate additional details about the Tab or the content on it, for example, indicating that the Tab is new or has been recently updated.

Tabs can also optionally be paired with an underline beneath them that spans the width of the entire div the Tab group is placed within.

| **Default** | **Hover** | **Active** | **Disabled** |
| ----------- | --------- | ---------- | ------------ |

**Large_No Underline_No Alert_Default**

---

**Large_No Underline_No Alert_Hover**

---

**Large_No Underline_No Alert_Active**

---

**Large_No Underline_No Alert_Disabled**

---

| **Default + Alert** | **Hover** | **Active** | **Disabled** |
| ------------------- | --------- | ---------- | ------------ |

**Large_No Underline_Alert_Default**

---

**Large_No Underline_Alert_Hover**

---

**Large_No Underline_Alert_Active**

---

**Large_No Underline_Alert_Disabled**

---

| **Default + Underline** | **Hover** | **Active** | **Disabled** |
| ----------------------- | --------- | ---------- | ------------ |

**Large_Underline_No Alert_Default**

---

**Large_Underline_No Alert_Hover**

---

**Large_Underline_No Alert_Active**

---

**Large_Underline_No Alert_Disabled**

---

| **Default + Alert + Underline** | **Hover** | **Active** | **Disabled** |
| ------------------------------- | --------- | ---------- | ------------ |

**Large_Underline_Alert_Default**

---

**Large_Underline_Alert_Hover**

---

**Large_Underline_Alert_Active**

---

**Large_Underline_Alert_Disabled**

---

### Small Tabs

Alternative Tab size to be used in napari hub on plugin detail pages for plugins whose authors are using official formatting for their plugin citations.

| **Default** | **Hover** | **Active** | **Disabled** |
| ----------- | --------- | ---------- | ------------ |

**Small_No Underline_No Alert_Default**

---

**Small_No Underline_No Alert_Hover**

---

**Small_No Underline_No Alert_Active**

---

**Small_No Underline_No Alert_Disabled**

---

| **Default + Alert** | **Hover** | **Active** | **Disabled** |
| ------------------- | --------- | ---------- | ------------ |

**Small_No Underline_Alert_Default**

---

**Small_No Underline_Alert_Hover**

---

**Small_No Underline_Alert_Active**

---

**Small_No Underline_Alert_Disabled**

---

| **Default + Underline** | **Hover** | **Active** | **Disabled** |
| ----------------------- | --------- | ---------- | ------------ |

**Small_Underline_No Alert_Default**

---

**Small_Underline_No Alert_Hover**

---

**Small_Underline_No Alert_Active**

---

**Small_Underline_No Alert_Disabled**

---

| **Default + Alert + Underline** | **Hover** | **Active** | **Disabled** |
| ------------------------------- | --------- | ---------- | ------------ |

**Small_Underline_Alert_Default**

---

**Small_Underline_Alert_Hover**

---

**Small_Underline_Alert_Active**

---

**Small_Underline_Alert_Disabled**

---

---

### Tabs Spacing

These rules establish how much margin should exist between and around elements.

**Tabs spacing**

---



## Code

## Tabs Component

| Below you will find an interactive Storybook iframe for Tabs. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** Tabs |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | --------------------------- |

---

> This component appears as it is in the default SDS codebase. Once imported into the napari hub or napari.org codebases, use a theme file to enable the napari visual appearance customization.

### Tabs 

Storybook

---

Tabs allow users to switch between different sets of information or content that is related to one overarching category or group while staying on the same page.

## Overview

## Tab Variants

| There are two sizes of Tabs available for use determined by their location in the UI. Each size can include a counter to indicate the number of items on that tab’s screen such as search or filter results. They can also be paired with an underline that spans the width of the entire div the tab group is placed within to provide visual separation between the Tabs and the content beneath them. Follow the usage criteria accompanying each variant as a guide for selecting the correct Tab size for any given use case. |     | **Jump to variant:** Large Small |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | -------------------------------- |

---

## Tabs

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ GEN EPI Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ---------------------- |

### Large Tabs

Default Tabs size to be used throughout the CZ GEN EPI UI.

In CZ GEN EPI, Large Tabs holding quantifiable data sets (like a sample table) should include a Count to allow users to be aware of data that isn't currently visible. On the group page for members and group details, Large Tabs without a count are used to separate between sections.

Overall, include a counter when necessary to indicate the number of items on that Tab's screen, whether visible or not visible, such as when displaying search or filter results.

| **Default** | **Hover** | **Active** | **Disabled** |
| ----------- | --------- | ---------- | ------------ |

**Tabs**

---

**Tabs**

---

**Tabs**

---

**Tabs**

---

| **Default + Count** | **Hover** | **Active** | **Disabled** |
| ------------------- | --------- | ---------- | ------------ |

**Tabs**

---

**Tabs**

---

**Tabs**

---

**Tabs**

---

| **Default + Underline** | **Hover** | **Active** | **Disabled** |
| ----------------------- | --------- | ---------- | ------------ |



**Tabs**

---

**Tabs**

---

**Tabs**

---

**Tabs**

---

| **Default + Count + Underline** | **Hover** | **Active** | **Disabled** |
| ------------------------------- | --------- | ---------- | ------------ |

**Tabs**

---

**Tabs**

---

**Tabs**

---

**Tabs**

---

### Small Tabs

Alternative Tab size to be used only in conjunction with Large Tabs when a secondary layer of tabbing is needed.

Include a counter when necessary to indicate the number of items on that Tab's screen, such as in the Members section of CZ GEN EPI, to help delineate between active members and outstanding invitations to the group.

| **Default** | **Hover** | **Active** | **Disabled** |
| ----------- | --------- | ---------- | ------------ |

**Tabs**

---

**Tabs**

---

**Tabs**

---

**Tabs**

---

| **Default + Count** | **Hover** | **Active** | **Disabled** |
| ------------------- | --------- | ---------- | ------------ |

**Tabs**

---

**Tabs**

---

**Tabs**

---

**Tabs**

---

| **Default + Underline** | **Hover** | **Active** | **Disabled** |
| ----------------------- | --------- | ---------- | ------------ |

**Tabs**

---

**Tabs**

---

**Tabs**

---

**Tabs**

---

| **Default + Count + Underline** | **Hover** | **Active** | **Disabled** |
| ------------------------------- | --------- | ---------- | ------------ |

**Tabs**

---

**Tabs**

---

**Tabs**

---

**Tabs**

---

---

### Tabs Spacing

These rules establish how much margin should exist between and around elements.

**Tabs Spacing**

---



## Code

## Tabs Component

| Below you will find an interactive Storybook iframe for Tabs. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** Tabs |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | --------------------------- |

---

> This component appears as it is in the default SDS codebase. Once imported into the CZ GEN EPI codebase, use a theme file to enable the CZ GEN EPI visual appearance customization.

### Tabs 

Storybook



---

Tabs allow users to switch between different sets of information or content that is related to one overarching category or group while staying on the same page.

## Overview

## Tab Variants

| There are two sizes of Tabs available for use determined by their location in the UI. Each size can include a counter to indicate the number of items on that tab’s screen such as search or filter results. They can also be paired with an underline that spans the width of the entire div the tab group is placed within to provide visual separation between the Tabs and the content beneath them. Follow the usage criteria accompanying each variant as a guide for selecting the correct Tab size for any given use case. |     | **Jump to variant:** Large Small |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | -------------------------------- |

---

## Tabs

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ ID Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ----------------- |

### Large Tabs

Default Tabs size to be used throughout the CZ ID UI.

In CZ ID, Large Tabs should include a Count when used in conjunction with header-level searches to allow users to tab between search results.

Include a counter when necessary to indicate the number of items on that Tab's screen such as when displaying search or filter results.

| **Default** | **Hover** | **Active** | **Disabled** |
| ----------- | --------- | ---------- | ------------ |

**Large_No Underline_No Count_Default**

---

**Large_No Underline_No Count_Hover**

---

**Large_No Underline_No Count_Active**

---

**Large_No Underline_No Count_Disabled**

---

| **Default + Count** | **Hover** | **Active** | **Disabled** |
| ------------------- | --------- | ---------- | ------------ |

**Large_No Underline_Count_Default**

---

**Large_No Underline_Count_Hover**

---

**Large_No Underline_Count_Active**

---

**Large_No Underline_Count_Disabled**

---

| **Default + Underline** | **Hover** | **Active** | **Disabled** |
| ----------------------- | --------- | ---------- | ------------ |

**Large_Underline_No Count_Default**

---

**Large_Underline_No Count_Hover**

---

**Large_Underline_No Count_Active**

---

**Large_Underline_No Count_Disabled**

---

| **Default + Count + Underline** | **Hover** | **Active** | **Disabled** |
| ------------------------------- | --------- | ---------- | ------------ |

**Large_Underline_Count_Default**

---

**Large_Underline_Count_Hover**

---

**Large_Underline_Count_Active**

---

**Large_Underline_Count_Disabled**

---



### Small Tabs

Alternative Tab size to be used only in conjunction with Large Tabs when a secondary layer of tabbing is needed.

Include a counter when necessary to indicate the number of items on that Tab's screen such as when displaying search or filter results.

| **Default** | **Hover** | **Active** | **Disabled** |
| ----------- | --------- | ---------- | ------------ |

**Small_No Underline_No Count_Default**

---

**Small_No Underline_No Count_Hover**

---

**Small_No Underline_No Count_Active**

---

**Small_No Underline_No Count_Disabled**

---

| **Default + Count** | **Hover** | **Active** | **Disabled** |
| ------------------- | --------- | ---------- | ------------ |

**Small_No Underline_Count_Default**

---

**Small_No Underline_Count_Hover**

---

**Small_No Underline_Count_Active**

---

**Small_No Underline_Count_Disabled**

---

| **Default + Underline** | **Hover** | **Active** | **Disabled** |
| ----------------------- | --------- | ---------- | ------------ |

**Small_Underline_No Count_Default**

---

**Small_Underline_No Count_Hover**

---

**Small_Underline_No Count_Active**

---

**Small_Underline_No Count_Disabled**

---

| **Default + Count + Underline** | **Hover** | **Active** | **Disabled** |
| ------------------------------- | --------- | ---------- | ------------ |

**Small_Underline_Count_Default**

---

**Small_Underline_Count_Hover**

---

**Small_Underline_Count_Active**

---

**Small_Underline_Count_Disabled**

---

---

### Tabs Spacing

These rules establish how much margin should exist between and around elements.

**Tabs Spacing**

---

## Code

## Tabs Component

| Below you will find an interactive Storybook iframe for Tabs. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** Tabs |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | --------------------------- |

---

### Tabs 

Storybook

---

Tabs allow users to switch between different sets of information or content that is related to one overarching category while staying on the same page.

## Guidelines

## Overview

|     | In Figma |     |     | Meets Accessibility |     |     | In Code |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------- |

### Tabs Sizes

There are two sizes of Tabs available for use which is determined by their location in the UI, the key difference being the size of the text on each Tab. Each size can include a counter to indicate the number of items on that Tab’s screen such as when used as part of Filter results. They can also be paired with an underline that spans the width of the entire div the tab group is placed within to provide visual separation between the Tabs and the content beneath them.

**Tabs_Large**

---

**Tabs_Small**

---

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

### Tabs – Large

Tabs – Large is used at a top level within the UI. If a secondary layer of tabbing is needed, use Tabs – Small.

Include a counter when necessary to indicate the number of viewable items available when navigating to that Tab's screen.

| Default | Hover | Active | Disabled |
| ------- | ----- | ------ | -------- |

**Large_No Underline_No Count_Default**

---

**Large_No Underline_No Count_Hover**

---

**Large_No Underline_No Count_Active**

---

**Large_No Underline_No Count_Disabled**

---

**Large_No Underline_Count_Default**

---

**Large_No Underline_Count_Hover**

---

**Large_No Underline_Count_Active**

---

**Large_No Underline_Count_Disabled**

---

**Large_Underline_No Count_Default**

---

**Large_Underline_No Count_Hover**

---

**Large_Underline_No Count_Active**

---

**Large_Underline_No Count_Disabled**

---

**Large_Underline_Count_Default**

---

**Large_Underline_Count_Hover**

---

**Large_Underline_Count_Active**

---

**Large_Underline_Count_Disabled**

---

---

### Tabs – Small

Tabs – Small is an alternative size to be used only in conjunction with Tabs – Large when a secondary layer of tabbing is needed.

Include a counter when necessary to indicate the number of viewable items available when navigating to that Tab's screen.

| Default | Hover | Active | Disabled |
| ------- | ----- | ------ | -------- |

**Small_No Underline_No Count_Default**

---

**Small_No Underline_No Count_Hover**

---

**Small_No Underline_No Count_Active**

---

**Small_No Underline_No Count_Disabled**

---

**Small_No Underline_Count_Default**

---

**Small_No Underline_Count_Hover**

---

**Small_No Underline_Count_Active**

---

**Small_No Underline_Count_Disabled**

---

**Small_Underline_No Count_Default**

---

**Small_Underline_No Count_Hover**

---

**Small_Underline_No Count_Active**

---

**Small_Underline_No Count_Disabled**

---

**Small_Underline_Count_Default**

---

**Small_Underline_Count_Hover**

---

**Small_Underline_Count_Active**

---

**Small_Underline_Count_Disabled**

---

---

### Tabs Spacing

These rules establish how much margin should exist between and around elements.

**Tabs Spacing**

---

## Code

> **Note:** The code examples below must install dependencies before displaying and may take extra time to load

## Tabs

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

The SDS `Tabs` component is built on the MUI `Tabs` component, but the SDS version has a few additional props to provide stylistic options that fit within the SDS designs:

- **`sdsSize`\*\***:\*\* Takes `large` (default) or `small` as values, and sizes the Tabs component and its label text accordingly
- **`underlined`\*\***:\*\* This boolean prop extends a light gray underline beneath the whole of the `Tabs` component when true; without this prop, only the selected tab has an underline of the primary color
- **count, metadata, and / or component:** Each individual tab within the `Tabs` component can be assigned a count, via a prop associated to that tab's position, such as `tabOneCount` for the first tab. These props take a number value to represent a count, but they can also take text or even another component, for example:

      `count={123}`

      `count={"Hello!"}`

      `tabThreeCount={<Tag />}`  ﻿  ﻿

This example demonstrates passing a ReactNode as the count prop to a `Tabs` component.

### MUI Documentation

Documentation for the underlying MUI component can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name         | Type        | Default  | Description                                                                                            |
| ------------ | ----------- | -------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| `sdsSize`    | `"small"` ` | "large"` | `"large"`                                                                                              | Specifies the size of the Tab element. |
| `underlined` | `boolean`   | `false`  | when set to `true`, adds a gray bottom border to the tab group, providing a distinctive visual effect. |

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
  "include": ["./**/*"],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": ["dom", "es2015"],
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
        <Tab label="First Tab" />
        <Tab label="Second Tab" />
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
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap"
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
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-scripts": "^4.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^4.0.0"
  },
  "main": "/index.tsx"
}
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
  "include": ["./**/*"],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": ["dom", "es2015"],
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
        <Tab label="First Tab" />
        <Tab label="Second Tab" />
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
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap"
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
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-scripts": "^4.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^4.0.0"
  },
  "main": "/index.tsx"
}
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
  "include": ["./**/*"],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": ["dom", "es2015"],
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
      <Tabs
        value={value}
        sdsSize="large"
        onChange={handleTabsChange}
        underlined
      >
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
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap"
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
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-scripts": "^4.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^4.0.0"
  },
  "main": "/index.tsx"
}
```

---
