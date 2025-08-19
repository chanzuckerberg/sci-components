# Banner

Banners are used to communicate product status updates to users, allowing the product teams to provide important information to their users.

## Guidelines

## Overview

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Banner Variants

Banners communicate product status updates such as system maintenance, new features, known product bugs or issues. etc. and should not be used to respond to actions the user has taken within the product; use a Callout or Notification for these purposes.

There are two Banner variants: a primary Banner if only one Banner is needed and a secondary Banner if two or more Banners need to be shown at one time. This allows multiple Banners to be stacked together while maintaining the ability to differentiate between them.

Both Banner variants can optionally be set to be manually dismissible by the user, allowing them to hide the Banner from view once it has been read.

Banners span the full width of the page.

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

### Banner – Primary

Use Banner – Primary in instances where only one Banner will be used on the page. If using multiple, it should be the first or top Banner used, followed by the secondary variant. Continue alternating variants for as many Banners as are needed. This ensures the Banners can be differentiated without the need for space or divider lines between them.

If additional context or information is needed beyond the space available on the Banner, it is recommended that a Link to an additional page with this information is included on the Banner which can be inserted using the optional content slot.

When the information being communicated on the Banner is intended to remain persistent on the screen and is not manually dismissible by the user, use a persistent Banner. To allow the user to manually dismiss the Banner, use a dismissible Banner.

| Default (Persistent) | Default (Dismissible) | Hover (Dismissible) |
| --- | --- | --- |

---

### Banner – Secondary

Use only when accompanied by the primary variant. If using multiple, Banner – Secondary should be the second Banner used, followed by the primary variant. Continue alternating variants for as many Banners as are needed. This ensures the Banners can be differentiated without the need for space or divider lines between them.

If additional context or information is needed beyond the space available on the Banner, it is recommended that a Link to an additional page with this information is included on the Banner which can be inserted using the optional content slot.

When the information being communicated on the Banner is intended to remain persistent on the screen and is not manually dismissible by the user, use a persistent Banner. To allow the user to manually dismiss the Banner, use a dismissible Banner.

| Default (Persistent) | Default (Dismissible) | Hover (Dismissible) |
| --- | --- | --- |

---

### Banner Spacing

These rules establish how much margin should exist between and around elements.

---

### Intent Variations

There are four different intents that Banners can communicate: Info, Negative, Notice, and Positive. Each intent is communicated using color and iconography.

Each intent is demonstrated below using the Dismissible variant for reference. Regardless of variant, the colors and icons used are the same.

#### Primary

| Info | Negative | Notice | Positive |
| --- | --- | --- | --- |

#### Secondary

| Info | Negative | Notice | Positive |
| --- | --- | --- | --- |

## Code

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

## Banner

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `dismissed` | `bool` | `false` | If `true`, the banner has been dismissed by the user.  |
| `dismissible` | `bool` | `true` | If `true`, the banner can be dismissed by the user.  |
| `sdsType` | `"primary"` `| "secondary"` | `primary` | The `primary` variant has a `400` background color and white text color.  The `secondary` variant has a `100` background color and `primary` text color.  |
| `icon` | `ReactNode` | `-` | The icon to be displayed within the banner. If not provided, a`InfoCircle` icon will be displayed. |
| `sdsIconProps` | `Partial<IconProps>` | `-` | Additional props to be passed to the icon component. |
| `onClose` | `fn` | `-` | Callback fired when the component requests to be closed. When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked. **Signature:**`function(event: React.SyntheticEvent) => void` `event`. The event source of the callback. |

### Code examples

#### Default Banner

This example has the minimum props needed for the `Banner` component.

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
import { Banner } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Banner sdsType="primary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
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
    <title>Banner</title>
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

#### Persistent Banner

This example showcases a `Banner` component that cannot be closed or dismissed.

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
import { Banner } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Banner sdsType="primary" dismissible={false}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
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
    <title>Banner</title>
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

#### Banner with a custom background color

This example shows how to implement a `Banner` component with a custom background color. 

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
import { styled } from "@mui/material/styles";
import { Banner } from "@czi-sds/components";
import "./styles.css";

function App() {
  const StyledBanner = styled(Banner)`
    background-color: Crimson;
  `;
  return (
    <div className="app">
      <StyledBanner sdsType="primary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </StyledBanner>
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
    <title>Banner</title>
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

