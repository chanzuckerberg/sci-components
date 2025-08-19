---
title: "Lists"
id: 7353072
uid: "20432e"
slug: "20432e-lists"
url: "https://sds.czi.design/009eaf17b/v/latest/p/20432e-lists"
hidden: false
locked: false
created_at: "2025-07-07T20:31:04.766Z"
updated_at: "2025-07-07T20:31:05.160Z"
status_id: "not_applicable"
status_name: "SDS"
---

# Lists

Utilizing a list to present information makes it easier to digest or act upon when compared to showing that same content in a solid block of text.

## Guidelines

## Overview

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### List Variants

There are two types of Lists—Unordered where the order of content does not matter and Ordered which communicate a specific sequence for the content. Use a header with either list type to help provide context to the content presented in the list.

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=list--default)

---

### List – Ordered

Use when the list's content needs to be presented in a specific order or sequence.

| fontBodyL | fontBodyM | fontBodyS | fontBodyXs | fontBodyXxs | fontBodyXxxs |
| --- | --- | --- | --- | --- | --- |

---

### List – Unordered

Use when the order of the list's content does not matter.

| fontBodyL | fontBodyM | fontBodyS | fontBodyXs | fontBodyXxs | fontBodyXxxs |
| --- | --- | --- | --- | --- | --- |

---

### List Spacing

Spacing between List Items changes based on the font size used. See the table below for spacing reference.

| fontBodyL | fontBodyM | fontBodyS | fontBodyXs | fontBodyXxs | fontBodyXxxs |
| --- | --- | --- | --- | --- | --- |

## Code

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

## List

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/List/index.tsx).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `marginBottom` | `"xxxs"` `| "xxs"` `| "xs"` `| "s"` `| "m"` `| "l"` | `"s"` | Determines the bottom margin size for the list, controlling its spacing from other elements. |
| `ordered` | `boolean` | `false` | Specifies the type of list component to render. When set to `true`, the list will be an ordered `"ol"` tag, while `false` will render an unordered `"ul"` tag. |

## ListItem

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/ListItem/index.tsx).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `fontSize` | `"xxxs"` `| "xxs"` `| "xs"` `| "s"` `| "m"` `| "l"` | `"s"` | Sets the font size for the list items, influencing their text size. |
| `marginBottom` | `"s"` `| "xs"` `| "xxs"` | `"xs"` | Controls the bottom margin size for the list items, affecting the spacing between list items. |
| `ordered` | `boolean` | `false` | Specifies the style and spacings of the list item components based on the parent list element. |

### Code examples

#### Unordered list

This example shows an unordered `List` of items.

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
import { List, ListItem } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <List>
        <ListItem fontSize="l" marginBottom="s">
          fontSize=l marginBottom=s
        </ListItem>
        <ListItem fontSize="m" marginBottom="s">
          fontSize=m marginBottom=s
        </ListItem>
        <ListItem fontSize="s" marginBottom="xs">
          fontSize=s marginBottom=xs
        </ListItem>
        <ListItem fontSize="xs" marginBottom="xs">
          fontSize=xs marginBottom=xs
        </ListItem>
        <ListItem fontSize="xxs" marginBottom="xs">
          fontSize=xxs marginBottom=xs
        </ListItem>
        <ListItem fontSize="xxxs" marginBottom="xxs">
          fontSize=xxxs marginBottom=xxs
        </ListItem>
      </List>
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
    <title>Lists</title>
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

#### Ordered List

This example shows an ordered `List` of items with nested items.

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
import { List, ListItem, ListSubheader } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <List
        ordered
        subheader={
          <ListSubheader disableSticky>
            Font sizes and spacing for a nested ordered list
          </ListSubheader>
        }
      >
        <ListItem ordered>
          <span>
            Nested List 1
            <List ordered>
              <ListItem ordered fontSize="l" marginBottom="s">
                fontSize=l marginBottom=s
              </ListItem>
              <ListItem ordered fontSize="m" marginBottom="s">
                fontSize=m marginBottom=s
              </ListItem>
              <ListItem ordered fontSize="s" marginBottom="xs">
                fontSize=s marginBottom=xs
              </ListItem>
            </List>
          </span>
        </ListItem>
        <ListItem ordered>
          <span>
            Nested List 2
            <List ordered>
              <ListItem ordered fontSize="l">
                <span>
                  Nested List 2
                  <List ordered>
                    <ListItem ordered fontSize="l" marginBottom="s">
                      fontSize=l marginBottom=s
                    </ListItem>
                    <ListItem ordered fontSize="m" marginBottom="s">
                      fontSize=m marginBottom=s
                    </ListItem>
                    <ListItem ordered fontSize="s" marginBottom="xs">
                      fontSize=s marginBottom=xs
                    </ListItem>
                  </List>
                </span>
              </ListItem>
              <ListItem ordered fontSize="m" marginBottom="s">
                fontSize=m marginBottom=s
              </ListItem>
              <ListItem ordered fontSize="s" marginBottom="xs">
                fontSize=s marginBottom=xs
              </ListItem>
            </List>
          </span>
        </ListItem>
        <ListItem ordered>
          <span>
            Nested List 3
            <List ordered>
              <ListItem ordered fontSize="l" marginBottom="s">
                fontSize=l marginBottom=s
              </ListItem>
              <ListItem ordered fontSize="m" marginBottom="s">
                fontSize=m marginBottom=s
              </ListItem>
              <ListItem ordered fontSize="s" marginBottom="xs">
                fontSize=s marginBottom=xs
              </ListItem>
            </List>
          </span>
        </ListItem>
      </List>
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
    <title>Lists</title>
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

