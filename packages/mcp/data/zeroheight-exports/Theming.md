# Theming

Themes enable visual changes to be made across the UI, affecting all elements in a consistent way such as in the case of Light and Dark Mode or individual product themes

## Guidelines

## Dark Mode

SDS supports both Light and Dark Mode and they can be implemented to allow users to toggle between them or set either as the application's primary color mode. Every primitive color variable has a Dark Mode equivalent and each semantic color variable has a Dark Mode primitive mapped to it; for specific hex codes and primitive color mappings, see the Semantic Colors and Primitive Colors documentation.

> **Note:** the semantic color variable mappings in the Bases color set are not always one-to-one between Light and Dark Modes, see Differences in Light Mode vs Dark Mode for more details.

### Color Indexes

The color indexes used in SDS primitive color names (e.g., `gray100`, `gray200`, etc.) refer to the level of contrast of that color against the background it is viewed upon. As a result, primitive colors have a different appearance between Light and Dark Mode, but they have a consistent _functional_ appearance relative to their backgrounds. This is why `gray100` in Light Mode is a light gray color, whereas `gray100` in Dark Mode is a dark gray color—both have low contrasts when viewed in relation to their corresponding background colors.

| Light Mode | Dark Mode |
| :--------: | :-------: |

**Color_Dark Mode_Color Indexes_gray100_Light**

---

**Color_Dark Mode_Color Indexes_gray100_Dark**

---

In most cases, each semantic variable will have the same primitive value mapped to it regardless of the mode of that primitive value. For example, the semantic variable `Base.text-primary` has `gray900` mapped to it; in Light Mode `gray900` = `#000000`(black), but in Dark Mode `gray900` = `#ffffff` (white). This means that in both modes primary text is highly visible against the background it is placed on top of, whether a light background in Light Mode or a dark background in Dark Mode.

| Light Mode | Dark Mode |
| :--------: | :-------: |

**Color_Dark Mode_Color Indexes_text-primary_Light**

---

**Color_Dark Mode_Color Indexes_text-primary_Dark**

---

### Differences in Light Mode vs Dark Mode

The only instances where the primitive variables mapped to semantic variables differ between modes is `background-primary`, `surface`, and `fill-primary`. Where Light Mode uses `gray50` (white) for all of these, Dark Mode has to use two separate shades of dark gray to adhere to visual accessibility best practices.

In Dark Mode, `background-primary` is `gray75` (not quite pure black which has poor visual accessibility when used across large areas) and `surface` and `fill-primary` are both `gray100` (shades of dark gray that are visible when viewed on top of `gray75` backgrounds). One of the main reasons for this is that drop shadows can't be leveraged in Dark Mode to separate layers in the same way that they can be in Light Mode since shadows are not nearly as visible when viewed on dark backgrounds.

| Light Mode | Dark Mode |
| :--------: | :-------: |

**Color_Dark Mode_Differences_Light**

---

**Color_Dark Mode_Differences_Dark**

---

### Inverted Style

There are a few components (Header Navigation, Footer Navigation, Tooltip, and Condensed Tooltip) that can be displayed with light or dark backgrounds regardless of which color mode the user's application is set to. Enable this using the prop `hasInvertedStyle` which by default is set to `false`. In Light Mode the component will have a light background and in Dark Mode the component will have a dark background. When set to `true`, the colors will be inverted and in Light Mode the component will have a dark background and in Dark Mode the component will have a light background.

See the individual component pages for more details and visual examples.

| Default (Light Mode) | Inverted (Light Mode) |
| :------------------: | :-------------------: |

**Color_Inverted Style_Default**

---

**Color_Inverted Style_Inverted**

---

## Code

## Dark Mode

SDS supports both Light and Dark Mode and they can be implemented to allow users to toggle between them or set either as the application's primary color mode. Every primitive color variable has a Dark Mode equivalent and each semantic color variable has a Dark Mode primitive mapped to it; for specific hex codes and primitive color mappings, see the Semantic Colors and Primitive Colors documentation.

> **Note:** the semantic color variable mappings in the Bases color set are not always one-to-one between Light and Dark Modes, see Differences in Light Mode vs Dark Mode for more details.

### Dark Mode by Default

You can make your application use Dark Mode as the default theme—regardless of the user's preference—by passing `'dark'` to the `Theme` helper.

Adding `<CssBaseline />` inside of the `<ThemeProvider>` component will also enable dark mode for the app's background.

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
import { Button } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Button sdsType="primary" sdsStyle="square">
        Label
      </Button>
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

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={Theme("dark")}>
        <EmotionThemeProvider theme={Theme("dark")}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
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

### Dark Mode Based on System Preference

Users might have a preference for Light or Dark Mode set through their operating system—either systemwide, or for a single user agent.

You can ensure this preference is used in your application with the useMediaQuery hook and the prefers-color-scheme media query.

The following demo shows how to enable Dark Mode automatically by checking for the user's preference in their OS or browser settings:

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
import { Button } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Button sdsType="primary" sdsStyle="square">
        Label
      </Button>
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

// Create a wrapper component to handle theme and useMediaQuery
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
