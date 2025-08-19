---
title: "Link"
id: 7353061
uid: "78d741"
slug: "78d741-link"
url: "https://sds.czi.design/009eaf17b/v/latest/p/78d741-link"
hidden: false
locked: false
created_at: "2025-07-07T20:30:57.115Z"
updated_at: "2025-07-07T20:30:57.340Z"
status_id: "not_applicable"
status_name: "SDS"
---

# Link

Links are interactive elements that, when clicked, navigate the user away from the page they are currently viewing to another page or screen.

## Guidelines

## Overview

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Link Variants

There are two Link variants available to use depending on the background on top of which they are placed and whether that background provides enough contrast for Link – Default to be seen. Links can be used inline or separate from a paragraph of text.

Though visually similar to [Button – Minimal](https://sds.czi.design/009eaf17b/v/0/p/47778c-buttons/t/2224d8), Links navigate the user away from the page they are currently viewing to another page. This is in contrast to Button – Minimal, which keeps the user on the same page and facilitates on-screen actions such as opening [Dialogs](https://sds.czi.design/009eaf17b/p/707b97) or indicating less-emphasized actions.

Links come in two sizes: fontXs and fontS to align with SDS' most common body copy font sizes.

>**Note:** When including an inline Link in your Figma designs, styles must be manually applied as there is no way to save the Link style in Figma as a text style. Use the Link Figma component for links that are not inline. 

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=link--default)

---

### Link – Default

Use Link – Default only when the Link is placed on `surface-primary`, `surface-secondary`, or `surface-tertiary` backgrounds to ensure there is enough contrast to pass visual accessibility standards, otherwise use [Link – Dashed](https://sds.czi.design/009eaf17b/v/0/p/78d741-link/t/75fc4d).

| Default | Hover | Pressed |
| --- | --- | --- |

---

### Link – Dashed

Use Link – Dashed when the Link is placed on a background where the Link – Default does not provide enough contrast to pass visual accessibility standards. The color of the link and its underline should match the color of the text used in the paragraph it is placed within, see [Color R](https://sds.czi.design/009eaf17b/v/0/p/78d741-link/t/36fc01)[ules](https://sds.czi.design/009eaf17b/v/0/p/78d741-link/t/36fc01) below.

See [Borders](https://sds.czi.design/009eaf17b/p/220fd1) section for Link Underline details.

| Default | Hover | Pressed |
| --- | --- | --- |

#### Color Rules

The color of Link – Dashed and its underline should match the color of the text used in the paragraph it is placed within.

| Primary Text | Secondary Text | On-fill Text |
| --- | --- | --- |

---

### Link Spacing Rules

These rules establish how much margin should exist between and around elements.

>**Note:** The underline for Link – Dashed is spaced lower than the default text-decoration underline.

## Code

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

## Link

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/Link).

### MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-link/). There are no differences between the SDS and MUI component. 

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `sdsStyle` | `"default"` `| "dashed"` | `"default"` | The style of underline corresponding to the `text-decoration` CSS property. Default is `underline`. |
| `sdsSize` | `"xs" | "s"` | `"xs"` | The font size of the `Link` component |
| `fontWeight` | `"normal"`  `| "bold"`  | `"normal"` | The font weight of the `Link` component. |

### Code examples

#### Link – Default

This example has the minimum props needed for the `Link` component.

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
import { Link } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Link href="#">
        Science Design System
      </Link>
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
    <title>Link</title>
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

#### Link – Dashed

This example demonstrates the use of a the dashed variant of the `Link` component embedded within a sentence.

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
import { Link, getSemanticColors } from "@czi-sds/components";
import { styled, useTheme } from "@mui/material";
import "./styles.css";

function App() {
  const theme = useTheme();
  const semanticColors = getSemanticColors({theme});
  
  const StyledParagraph = styled("p")`
    background-color: ${semanticColors?.accent?.surfacePrimary};
    padding: 10px;
  `;
  
  return (
    <div className="app">
      <StyledParagraph>
        Lorem ipsum{" "}
        <Link href="#" sdsStyle="dashed">
          dolor sit apsidy
        </Link>{" "}
        consectetur, adipisicing elit.
      </StyledParagraph>
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
    <title>Link</title>
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

