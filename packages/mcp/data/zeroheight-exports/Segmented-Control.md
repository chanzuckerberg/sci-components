# Segmented Control

Segmented Control allows users to toggle between different views within an on-screen element such as viewing the same set of data in table or tree format.

## Overview

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ ID Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ----------------- |

Segmented Control allows users to toggle between different views of an on-screen element. There must be a minimum of two and can be up to four segments.

The Segmented Control component is comprised of Segmented Control Items each of which has a Default, Hover, and Active state. Designers can swap out default icons for icons relevant to their needed use case.

| **Default / Active** | **Hover** |
| -------------------- | --------- |

**SegmentedControl**

---

**SegmentedControl**

---

---

### Segmented Control Spacing

These rules establish how much margin should exist between and around elements.

**Segmented Control Spacing**

---

---

### Segmented Control Best Practices

Segmented control relies on icons to communicate what’s being shown to the user. Because of this, it should always be coupled with a dark Tooltip that displays the name of the segment item when the user hovers over it.

**Segmented Control Best Practice**

---

## Code

## Segmented Control Component

| Below you will find an interactive Storybook iframe for the Segmented Control. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** SegmentedControl |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | --------------------------------------- |

---

### SegmentedControl

Storybook

---

Segmented Control allows users to toggle between different views within an on-screen element such as viewing the same set of data in table or tree format.

## Guidelines

## Overview

|     | In Figma |     |     | Meets Accessibility |     |     | In Code |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

Segmented Control allows users to switch between different views of an on-screen element. There must be a minimum of two and can be up to four segments.

Icons are used to communicate what will be shown on screen when that segment is clicked. When hovered over, each segment displays Tooltip – Dark to communicate what the icon represents. Any small variant icon can be used as a segment indicator.

| Default / Active | Hover |
| ---------------- | ----- |

**Segmented Control_Default_Active**

---

**Segmented Control_Hover**

---

---

### Segmented Control Spacing

These rules establish how much margin should exist between and around elements.

**Segmented Control Spacing**

---

## Code

> **Note:** The code examples below must install dependencies before displaying and may take extra time to load

## SegmentedControl

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

The following props are available to MUI's `ToggleButtonGroup` but not SDS's `SegementedControl`:

- **`exclusive`\*\***:\*\* This boolean prop determines whether just a single button within the control group can be selected at a time (default) or whether multiple can be. SDS's`SegmentedControl` is an exclusive control only, and setting `exclusive` to `false` has no effect.
- **`size`\*\***:\*\* Has no effect for SDS's `SegmentedControl`

### MUI Documentation

Documentation for the underlying MUI component can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name               | Type                                                                                        | Default | Description                                                   |
| ------------------ | ------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------- |
| `buttonDefinition` | `{` `disabled?: boolean;` `iconName: string;` `tooltipText: string;` `value: string;` `}[]` | `-`     | An array of items containing an icon name and a tooltip text. |

### Code examples

#### **Default SegmentedControl**

This example demonstrates the most basic usage of the `SegmentedControl` component with default props.

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
import { SegmentedControl } from "@czi-sds/components";
import "./styles.css";

function App() {
  const buttonDefinition = [
    {
      icon: "List",
      tooltipText: "List A",
      value: "A",
    },
    {
      icon: "List",
      tooltipText: "List B",
      value: "B",
    },
    {
      icon: "List",
      tooltipText: "List C",
      value: "C",
    },
  ];
  return (
    <div className="app">
      <SegmentedControl buttonDefinition={buttonDefinition} />
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

#### **Controlled SegmentedControl**

This example shows a controlled `SegmentedControl` component.

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
import { useState } from "react";
import { SegmentedControl } from "@czi-sds/components";
import "./styles.css";

function App() {
  const [value, setValue] = useState("B");
  const buttonDefinition = [
    {
      icon: "List",
      tooltipText: "List A",
      value: "A",
    },
    {
      icon: "List",
      tooltipText: "List B",
      value: "B",
    },
    {
      icon: "List",
      tooltipText: "List C",
      value: "C",
    },
  ];
  return (
    <div className="app">
      <SegmentedControl
        buttonDefinition={buttonDefinition}
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
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

#### **SegmentedControl with disabled items**

This example shows a `SegmentedControl` component that has one disabled item.

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
import { SegmentedControl } from "@czi-sds/components";
import "./styles.css";

function App() {
  const buttonDefinition = [
    {
      icon: "List",
      tooltipText: "List A",
      value: "A",
    },
    {
      disabled: true,
      icon: "List",
      tooltipText: "List B",
      value: "B",
    },
    {
      icon: "List",
      tooltipText: "List C",
      value: "C",
    },
  ];
  return (
    <div className="app">
      <SegmentedControl buttonDefinition={buttonDefinition} />
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
