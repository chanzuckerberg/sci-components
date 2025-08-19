# Loading Indicators

Loading Indicators provide feedback to users that an action is still completing, serving as a visual cue that the page has not stalled out.

## Overview

## Loading Indicator Variants

| There are two variants of Loading Indicator depending on context. The key similarity is looping animation to signal to the user that an action is happening and to wait while it completes.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Loading Indicator for any given use case. |   | **Jump to variant:** Minimal Tag |
| --- | --- | --- |

---

## Loading Indicator

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ GEN EPI Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Minimal Loading Indicator

Used in CZ GEN EPI to indicate when on-page components are loading, such as content within accordions or tables.

Note: icon spins.

### Tag Loading Indicator

Used in CZ GEN EPI to indicate when project pages are loading or when waiting for status message screen to load.

Note: icon spins.

---

### Loading Indicator Spacing

These rules establish how much margin should exist between and around elements.

## Code

## Loading Indicator Component

| Below you will find an interactive Storybook iframe for the Loading Indicator.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** LoadingIndicator |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the CZ GEN EPI codebase, use a theme file to enable the CZ GEN EPI visual appearance customization.

### Loading Indicator

Storybook

---

Loading Indicators provide feedback to users that an action is still completing, serving as a visual cue that the page has not stalled out.

## Overview

## Loading Indicator Variants

| There are two variants of Loading Indicator depending on context. The key similarity is looping animation to signal to the user that an action is happening and to wait while it completes.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Loading Indicator for any given use case. |   | **Jump to variant:** Minimal Tag |
| --- | --- | --- |

---

## Loading Indicator

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Minimal Loading Indicator

Used in CZ ID to indicate when on-page components are loading, such as content within accordions or tables.

Note: icon spins.

### Tag Loading Indicator

Used in CZ ID to indicate when project pages are loading or when waiting for status message screen to load.

Note: icon spins.

---

### Loading Indicator Spacing

These rules establish how much margin should exist between and around elements.

## Code

## Loading Indicator Component

| Below you will find an interactive Storybook iframe for the Loading Indicator.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** LoadingIndicator |
| --- | --- | --- |

---

### Loading Indicator

Storybook

---

Loading Indicators provide feedback to users that an action is still completing, serving as a visual cue that the page has not stalled out.

## Guidelines

## Overview

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Loading Indicator Variants

There are two variants of Loading Indicator available to use depending on context. The key similarity is a looping animation to signal to the user that an action is happening and to wait while it completes.

>**Note:** Icon spins

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

### Loading Indicator – Minimal

Use to indicate when on-page components are loading, such as content within Accordions or Tables.

---

### Loading Indicator – Tag

Use to indicate when entire pages are loading.

---

### Loading Indicator Spacing

These rules establish how much margin should exist between and around elements.

## Code

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

## LoadingIndicator

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `sdsStyle` | `"minimal"` `| "tag"` | `-` | Specifies the style and look of the loading element. |

### Code examples

#### LoadingIndicator – Minimal

This example shows the minimal variant of the `LoadingIndicator`.

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
import { LoadingIndicator } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <LoadingIndicator />
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
    <title>Loading Indicator</title>
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

