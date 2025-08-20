# Panels

Panels are elements that contain supplementary information or actions for the page's content they appear on. Where and how they display is determined by the type of content on them.

## Overview

## Basic Panel

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ GEN EPI Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Panels are comprised of containers within which other elements are placed. Use the Basic Panel when the elements contained within it are able to functionally adjust the content on the page next to it. In CZ GEN EPI's case, the Basic Panel is positioned on the left-hand side of the screen and contains Filters. 

### Basic Panel Example

The example below shows where in CZ GEN EPI the Basic Panel is used.

 

## Code

## Panel Components

| Below you will find an interactive Storybook iframe for Panels.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** PanelBasic |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the CZ GEN EPI codebase, use a theme file to enable the CZ GEN EPI visual appearance customization.

### PanelBasic (coming soon) 

---

Panels are elements that contain supplementary information or actions for the page's content they appear on. Where and how they display is determined by the type of content on them.

## Overview

## Panel Variants

| Panels are comprised of containers within which other elements are placed. They come in two different variants for designers to use depending on the type of content and elements contained within them. These variants also establish how the Panel functions and appears on the page, whether within the flow of the page's content or outside of it, on top of other elements.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Panel for any given use case. |   | **Jump to variant:** Basic Overlay |
| --- | --- | --- |

---

## Basic Panel

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Basic Panel

Use the Basic Panel when the elements contained within it are able to functionally adjust the content on the page, such as filters or dataset selectors. Basic Panels can be toggled open or closed using an Icon Button. When toggled open, the page's content is resized to make room for the Panel.

Basic Panels can be positioned on the left or right side of the screen using the `position` prop. If needed, designers can have up to two Panels per page, one of the left and one on the right.

Although Basic Panels can be designed to contain a wide range of elements, there are a few common configurations used within the products today that have been turned into templates: Filter Panel, Info Panel, and Info Panel with Accordions (templates coming soon).

### Basic Panel Examples

The examples below show where in CZ ID the Basic Panel is currently being used.

---

---

## Overlay Panel

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Overlay Panel

Use the Overlay Panel when needing to display supplementary information about the content on the underlying page. The elements on the Overlay Panel cannot functionally adjust the content on the page below it. Overlay Panels can be toggled open or closed using a range of different Button types (Rounded, Square, Minimal, and Icon Buttons). When active, like its name suggests, the Overlay Panel appears on top of the other content on the page, outside of the page's flow.

Overlay Panels can be positioned on the bottom or right side of the screen using the `position` prop. Use the bottom-positioned Overlay Panel when the content contained on it is wider than it is tall. Designers can have as many Overlay Panels per page as needed, but only one can be triggered at any time. If one is currently open and another is triggered, the opened Overlay Panel will close before the newly triggered one opens.

Although Overlay Panels can be designed to contain a wide range of elements, there are a few common configurations used within the products today that have been turned into templates: Sample Details, Taxon Details, Genes Details, and Pipeline Information (templates coming soon).

 

### Overlay Panel Examples

The examples below show where in CZ ID the Overlay Panel is currently being used.

---

## Code

## Panel Components

| Below you will find an interactive Storybook iframe for Panels.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** PanelBasic PanelOverlay |
| --- | --- | --- |

---

### PanelBasic (coming soon)

 

---

### PanelOverlay (coming soon)

 

---

Panels are elements that contain supplementary information or actions for the page's content they appear on. Where and how they display is determined by the type of content on them.

## Guidelines

## Panel Components

| Panels contain containers within which other elements are placed. They come in two different variants depending on the type of content and elements contained within them and their functionality, whether appearing on the page, within the flow of the page's content or outside of it, on top of other elements. |   | **Jump to variant:** Basic Overlay |
| --- | --- | --- |

---

## Panel – Basic

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Panel – Basic Anatomy

---

### Overview

Use Panel – Basic when the elements contained within it are able to make adjustments to the content on the page, such as filters or dataset selectors. Panel – Basic is toggled open or closed using a Button placed on the page (as opposed to contained within the Panel itself). When toggled open, the page's content is resized to make room for the Panel.

Panel – Basic can be positioned on the left or right side of the screen. Both sides can be open at the same time.

| Left | Right |
| :---: | :---: |

---

### Panel – Basic Spacing

These rules establish how much margin should exist to the left or right of an opened Panel – Basic.

---

## Panel – Overlay

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Panel – Overlay Anatomy

---

### Overview

Use Panel – Overlay when needing to display supplementary information about a piece of content on the page beneath it; the elements on Panel – Overlay cannot make adjustments to the page's content. When active, like its name suggests, the Panel – Overlay appears on top of the other content on the page, outside of the page's flow. Panel – Overlay is toggled open by any Button on the page and is closed by clicking the same on-page Button or using the close Button built into panel itself.

Panel – Overlay can be positioned on the bottom, left, or right side of the screen; use the bottom-positioned Panel – Overlay when the content contained on it is wider than it is tall. A page can contain as many Panel - Overlays per page as needed, but only one can be open at a time. If one is currently open and another is triggered to open, the currently opened Panel – Overlay will close before the newly triggered one opens.

| Bottom | Left | Right |
| :---: | :---: | :---: |

## Code

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

## Panel

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

The SDS `Panel` component is built upon the MUI `Drawer` component, but with several key differences:

* **Variant vs sdsType:** In MUI’s Drawer, the `variant` prop determines the type of drawer (e.g., persistent, temporary). However, in SDS’s Panel, this is replaced by the `sdsType` prop, which takes two values: `"basic"` and `"overlay"`.
    * `"basic"` corresponds to MUI’s persistent drawer.
    * `"overlay"` corresponds to MUI’s temporary drawer.
* **Position vs Anchor**: Unlike MUI’s Drawer, which uses the `anchor` prop to determine the placement of the drawer (left, right, top, or bottom), the SDS Panel uses a `position` prop.
    * The `"basic"` Panel can only be positioned to the `left` or `right`.
    * The `"overlay"` Panel can be positioned to the `left`, `right`, or `bottom`.
* **Width Prop:** The SDS Panel allows control over the width of the panel using the width prop.
    * The default width is **240px** for the `"basic"` panel.
    * The default width is **320px** for the `"overlay"` panel.
* **Custom Header and Close Button Components:** The `"overlay"` Panel in SDS introduces two additional props that are not available in MUI’s Drawer: `headerComponent` and `closeButtonComponent`. These allow for custom components to be rendered in the panel’s header section, providing greater flexibility for design and functionality.

### MUI Documentation

Documentation for the underlying MUI component can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `sdsType` | `"basic"` | `"overlay"` | `"basic"` | `"basic"` corresponds to a persistent drawer, and `"overlay"` corresponds to a temporary drawer. |
| `position` | `"left"` |  `"right"` |  `"bottom"` (only for overlay) | `"left"` | Determines the panel’s position. The `"basic"` panel supports only `"left"` and `"right"`, while the `"overlay"` panel also supports `"bottom"`. |
| `width` | `number` | `string` | `"240px"` (basic) |  `"320px"` (overlay) | Specifies the `width` of the panel.  |
| `headerComponent` | `React.ReactNode` | `undefined` | For the `"overlay"` panel only, this prop allows you to pass a custom component to be rendered as the panel’s header. |
| `closeButtonComponent` | `React.ReactNode` | <Button  sdsStyle="icon" sdsType="tertiary" icon="XMark" aria-label="Panel Toggle" /> | For the `"overlay"` panel only, this prop allows you to pass a custom component to be rendered as the close button. |
| `closeButtonOnClick` | `React.MouseEventHandler<HTMLDivElement>` | `undefined` | For the `"overlay"` panel only, this is the onClick event handler for the close button. |

### Code examples

#### Basic Panel

This example demonstrates the most basic usage of the `Panel` component with default props.

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
import { useState } from "react";
import { Button, Panel } from "@czi-sds/components";
import { Box } from "@mui/material";
import "./styles.css";

function App() {
  const [open, setOpen] = useState(true);

  const Main = (
    props: { open: boolean; children?: React.ReactNode }
  ) => {
    const { open, children } = props;
  
    const margin = "0 0 0 250px";
  
    return (
      <Box
        sx={{
          margin: open ? margin : "none",
        }}
      >
        {children}
      </Box>
    );
  };
  
  return (
    <div className="app">
      <Main open={open}>
        <Button
          sdsType="primary"
          sdsStyle="icon"
          icon="InfoCircle"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Panel Toggle"
        >
          Toggle Panel
        </Button>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis tortor et pellentesque pulvinar. Ut at convallis ipsum. Nullam scelerisque tempor arcu, quis pretium magna semper eu. Nam hendrerit lectus in enim scelerisque, sed ornare sapien consequat. Proin sed congue quam. Integer consequat elit tristique sodales rhoncus. In bibendum dolor sit amet erat porta, nec posuere nibh consectetur. Cras scelerisque interdum eros ut porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut in lacus et mi efficitur scelerisque. Pellentesque congue purus eu feugiat cursus. Phasellus urna massa, sollicitudin id elit et, efficitur faucibus nibh.</p>
          <p>Nam sit amet tortor varius, lacinia velit quis, lacinia metus. Quisque dictum, nulla at luctus fringilla, ligula diam fringilla nisl, non consequat nulla turpis at ex. Donec hendrerit facilisis nisl at fringilla. Pellentesque posuere tortor ac ante luctus, at euismod augue vulputate. Vivamus pretium pretium nisi, non convallis nunc volutpat ac. Nam finibus justo leo, vel pellentesque velit gravida vel. Sed in turpis non sem efficitur eleifend vel ac lacus. Sed volutpat feugiat dictum. Pellentesque tristique mollis magna sit amet vestibulum. Nulla ac tellus eu orci volutpat congue. In vitae dolor et est feugiat fringilla. Sed varius neque nunc, sed pulvinar neque lobortis posuere.</p>
        <Panel open={open}>
          [Panel Content]
        </Panel>
      </Main>
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
    <title>Panel</title>
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

**Overlay Panel**

This example shows how to use the `Panel` component as an overlay. The overlay version allows the panel to slide in over the existing content, typically used for side panels or modal-like interactions. It can be triggered by a button or any other interactive element.

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
import { useState } from "react";
import { Button, Panel } from "@czi-sds/components";
import { Box } from "@mui/material";
import "./styles.css";

function App() {
  const [open, setOpen] = useState(true);
  
  return (
    <div className="app">
      <Button
        sdsType="primary"
        sdsStyle="icon"
        icon="InfoCircle"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Panel Toggle"
      >
        Toggle Panel
      </Button>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis tortor et pellentesque pulvinar. Ut at convallis ipsum. Nullam scelerisque tempor arcu, quis pretium magna semper eu. Nam hendrerit lectus in enim scelerisque, sed ornare sapien consequat. Proin sed congue quam. Integer consequat elit tristique sodales rhoncus. In bibendum dolor sit amet erat porta, nec posuere nibh consectetur. Cras scelerisque interdum eros ut porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut in lacus et mi efficitur scelerisque. Pellentesque congue purus eu feugiat cursus. Phasellus urna massa, sollicitudin id elit et, efficitur faucibus nibh.</p>
        <p>Nam sit amet tortor varius, lacinia velit quis, lacinia metus. Quisque dictum, nulla at luctus fringilla, ligula diam fringilla nisl, non consequat nulla turpis at ex. Donec hendrerit facilisis nisl at fringilla. Pellentesque posuere tortor ac ante luctus, at euismod augue vulputate. Vivamus pretium pretium nisi, non convallis nunc volutpat ac. Nam finibus justo leo, vel pellentesque velit gravida vel. Sed in turpis non sem efficitur eleifend vel ac lacus. Sed volutpat feugiat dictum. Pellentesque tristique mollis magna sit amet vestibulum. Nulla ac tellus eu orci volutpat congue. In vitae dolor et est feugiat fringilla. Sed varius neque nunc, sed pulvinar neque lobortis posuere.</p>
      <Panel open={open} sdsType="overlay" closeButtonOnClick={() => setOpen(false)}>
        [Panel Content]
      </Panel>
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
    <title>Panel</title>
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

**Overlay Panel with Custom Header (opens from right)**

This example demonstrates how to implement an overlay `Panel` with a custom header component. The panel still retains the overlay behavior, sliding over the existing content when triggered.

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
import { useState } from "react";
import { Button, Panel } from "@czi-sds/components";
import { Box, Typography } from "@mui/material";
import "./styles.css";

function App() {
  const [open, setOpen] = useState(true);

  const HeaderComponent = (
    <Typography variant="h2">
      Panel Header
    </Typography>
  );
  
  return (
    <div className="app">
      <Button
        sdsType="primary"
        sdsStyle="icon"
        icon="InfoCircle"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Panel Toggle"
      >
        Toggle Panel
      </Button>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis tortor et pellentesque pulvinar. Ut at convallis ipsum. Nullam scelerisque tempor arcu, quis pretium magna semper eu. Nam hendrerit lectus in enim scelerisque, sed ornare sapien consequat. Proin sed congue quam. Integer consequat elit tristique sodales rhoncus. In bibendum dolor sit amet erat porta, nec posuere nibh consectetur. Cras scelerisque interdum eros ut porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut in lacus et mi efficitur scelerisque. Pellentesque congue purus eu feugiat cursus. Phasellus urna massa, sollicitudin id elit et, efficitur faucibus nibh.</p>
        <p>Nam sit amet tortor varius, lacinia velit quis, lacinia metus. Quisque dictum, nulla at luctus fringilla, ligula diam fringilla nisl, non consequat nulla turpis at ex. Donec hendrerit facilisis nisl at fringilla. Pellentesque posuere tortor ac ante luctus, at euismod augue vulputate. Vivamus pretium pretium nisi, non convallis nunc volutpat ac. Nam finibus justo leo, vel pellentesque velit gravida vel. Sed in turpis non sem efficitur eleifend vel ac lacus. Sed volutpat feugiat dictum. Pellentesque tristique mollis magna sit amet vestibulum. Nulla ac tellus eu orci volutpat congue. In vitae dolor et est feugiat fringilla. Sed varius neque nunc, sed pulvinar neque lobortis posuere.</p>
      <Panel 
        open={open} 
        sdsType="overlay" 
        closeButtonOnClick={() => setOpen(false)}
        HeaderComponent={HeaderComponent}
        position="right"
      >
        [Panel Content]
      </Panel>
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
    <title>Panel</title>
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

**Overlay Panel with a Custom Closing Button (opens from bottom)**

This example demonstrates how to implement an overlay `Panel` with a custom close button. Instead of using the default close functionality, the close button can be customized to match specific design requirements or to add additional features, such as custom icons, animations, or styling. The panel will still function as an overlay, sliding over the current content, but with enhanced control over how it is closed.

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
import { useState } from "react";
import { Button, Panel } from "@czi-sds/components";
import { Box, Typography } from "@mui/material";
import "./styles.css";

function App() {
  const [open, setOpen] = useState(true);

  const HeaderComponent = (
    <Typography variant="h2">
      Panel Header
    </Typography>
  );

  const CloseButton = (
    <Button
      sdsStyle="icon"
      sdsSize="small"
      sdsType="secondary"
      icon="ChevronDown"
      aria-label="Panel Toggle"
    />
  );
  
  return (
    <div className="app">
      <Button
        sdsType="primary"
        sdsStyle="icon"
        icon="InfoCircle"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Panel Toggle"
      >
        Toggle Panel
      </Button>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis tortor et pellentesque pulvinar. Ut at convallis ipsum. Nullam scelerisque tempor arcu, quis pretium magna semper eu. Nam hendrerit lectus in enim scelerisque, sed ornare sapien consequat. Proin sed congue quam. Integer consequat elit tristique sodales rhoncus. In bibendum dolor sit amet erat porta, nec posuere nibh consectetur. Cras scelerisque interdum eros ut porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut in lacus et mi efficitur scelerisque. Pellentesque congue purus eu feugiat cursus. Phasellus urna massa, sollicitudin id elit et, efficitur faucibus nibh.</p>
        <p>Nam sit amet tortor varius, lacinia velit quis, lacinia metus. Quisque dictum, nulla at luctus fringilla, ligula diam fringilla nisl, non consequat nulla turpis at ex. Donec hendrerit facilisis nisl at fringilla. Pellentesque posuere tortor ac ante luctus, at euismod augue vulputate. Vivamus pretium pretium nisi, non convallis nunc volutpat ac. Nam finibus justo leo, vel pellentesque velit gravida vel. Sed in turpis non sem efficitur eleifend vel ac lacus. Sed volutpat feugiat dictum. Pellentesque tristique mollis magna sit amet vestibulum. Nulla ac tellus eu orci volutpat congue. In vitae dolor et est feugiat fringilla. Sed varius neque nunc, sed pulvinar neque lobortis posuere.</p>
      <Panel 
        open={open} 
        sdsType="overlay" 
        closeButtonOnClick={() => setOpen(false)}
        HeaderComponent={HeaderComponent}
        CloseButtonComponent={CloseButton}
        position="bottom"
      >
        [Panel Content]
      </Panel>
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
    <title>Panel</title>
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

