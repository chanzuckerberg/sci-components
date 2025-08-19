---
title: "Tooltips"
id: 7353067
uid: "74af45"
slug: "74af45-tooltips"
url: "https://sds.czi.design/009eaf17b/v/latest/p/74af45-tooltips"
hidden: false
locked: false
created_at: "2025-07-07T20:30:58.792Z"
updated_at: "2025-07-07T20:30:59.373Z"
status_id: "not_applicable"
status_name: "SDS"
---

# Tooltips

Tooltips are used throughout the UI and appear whenever users hover over elements that require additional context, instructions, or details.

## Guidelines

## Tooltip Components

| Tooltips are always used in conjunction with other elements when there is a need to further clarify the element's function, provide instructions, or display additional details to the user. The variant used depends on the element that triggers it and where it's located in the interface. |   | **Jump to variant:** [Tooltip](https://sds.czi.design/009eaf17b/v/0/p/74af45-tooltips/t/337a89) [Condensed Tooltip](https://sds.czi.design/009eaf17b/v/0/p/74af45-tooltips/t/1920a4) [Table Tooltip](https://sds.czi.design/009eaf17b/v/0/p/74af45-tooltips/t/06d7fc) |
| --- | --- | --- |

### Visual Preview

---

## Tooltip

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Tooltip Types

There are two available Tooltip types: Short and Long.

Each Tooltip type can optionally be displayed using an inverted color scheme for better contrast on certain backgrounds.

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=tooltip--default)

---

### Tooltip – Short

Use in conjunction with action UI elements like [Buttons](https://sds.czi.design/009eaf17b/p/47778c) or [Segmented Control](https://sds.czi.design/009eaf17b/p/16c065) to display information about interacting with that element.

A subtitle may be added to communicate additional details, like instructions for using the element connected to the Tooltip.

| Default | Default (inverted) | Default + Subtitle | Default + Subtitle (inverted) |
| --- | --- | --- | --- |

---

### Tooltip – Long

Use to display supplementary information like definitions, instructions, or expanded details which require more space for text. The width can be increased up to `550px`.

| Default | Default (inverted) |
| --- | --- |

---

### Tooltip Spacing

The Tooltip and its triggering element have a standard margin between them.

---

### Placement Variations

A Tooltip appears in one of twelve positions relative to the element it is tied to. For example, a position of `bottom` will appear **below** the trigger element.

| Bottom-start | Bottom | Bottom-end |
| --- | --- | --- |

| Left-start | Left | Left-end |
| --- | --- | --- |

| Right-start | Right | Right-end |
| --- | --- | --- |

| Top-start | Top | Top-end |
| --- | --- | --- |

---

## Condensed Tooltip

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=tooltipcondensed--default)

---

### Overview

Use Condensed Tooltip to display small amounts of text, not full sentences or descriptions. It's similar to a label, but only viewable on hover — most often used in data visualizations and [Tables](https://sds.czi.design/009eaf17b/p/1647a1).

The Condensed Tooltip is positioned relative to the user's cursor rather than its triggering element. A colored indicator can be included in the Tooltip to help clarify what element the Tooltip is related to.

The Condensed Tooltip can optionally be displayed using an inverted color scheme for better contrast on certain backgrounds.

| Default | Default (inverted) | Default + Indicator | Default + Indicator (inverted) |
| --- | --- | --- | --- |

---

### Condensed Tooltip Spacing

The Condensed Tooltip and its triggering element have a standard margin between them.

---

## Table Tooltip

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Live Preview](https://chanzuckerberg.github.io/sci-components/iframe.html?id=tooltiptable--live-preview)

---

### Overview

Use Table Tooltip to display complex information that benefits from being shown in a table format. A Table Tooltip can contain as many sections as necessary and can optionally include section headers.

By default, Item values are aligned right but can be aligned left.

The Table Tooltip is positioned relative to the user's cursor rather than its triggering element

| 1 Section | 1 Section + Section Headers | 2 Sections + Section Headers |
| --- | --- | --- |

---

### Table Tooltip Spacing

The Table Tooltip and its triggering element have a standard margin between them.

## Code

## Tooltip Components

| `Tooltips` are always used in conjunction with other elements when there is a need to further clarify the element's function, provide instructions, or display additional details to the user. The variant used depends on the element that triggers it and where it's located in the interface. |   | **Jump to variant:** [Tooltip](https://sds.czi.design/009eaf17b/v/0/p/74af45-tooltips/t/873716) [TooltipCondensed](https://sds.czi.design/009eaf17b/v/0/p/74af45-tooltips/t/413038) [TooltipTable](https://sds.czi.design/009eaf17b/v/0/p/74af45-tooltips/t/29ba6c) |
| --- | --- | --- |

### Visual Preview

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

---

## Tooltip

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Tooltip/index.tsx).

### SDS vs MUI

The SDS `Tooltip` component has a number of preset options in addition to, or that modify, the MUI options:

* **`sdsStyle`** **:** This prop takes either `light`  (the default if not specified), or `dark`.  Each of these "unlocks" additional options for other props; see below bullets:
    * **`width`****:**  SDS `Tooltip`'s  `width`  prop accepts `"default"`(unsurprisingly, the default!) which limits the maximum width to 250px. Additionally, only if `sdsStyle="light"` then it also accepts a value of  `"wide"`,  which translates to a maximum width of 550px. Compare these string options to MUI's `width`  prop, which takes a number for the width in pixels.
    * **`subtitle`****:**  This SDS-specific prop is only available for dark-styled `Tooltips` (`sdsStyle="dark"`) . It takes a string value that displays below the text set by the `title`  prop.
* **`arrowOffset`****:**  This SDS-only prop takes a negative or positive value equivalent to the number of pixels by which to move the arrow (if `arrow={true}`) either left or right, respectively. It is possible though for this to move the arrow outside of the `Tooltip` edge itself, so be aware of the `width` setting as well as the length of text within the `Tooltip`.

### MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-tooltip/).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `arrow` | `boolean` | `false` | If `true`, adds an arrow to the tooltip. |
| `arrowOffset` | `number` | `0` | ArrowOffset changes the position of the tooltip arrow and can be any numeric value within `[-120, 120]`. Exceeding the tooltip width removes the arrow. |
| `placement` | `"bottom-start"`  `| "bottom"`  `| "bottom-end"`  `| "left-start"`  `| "left"`  `| "left-end"`  `| "right-start"`  `| "right"`  `| "right-end"`  `| "top-start"`  `| "top"`  `| "top-end"` | `"bottom"` | Tooltip placement. |
| `sdsStyle` | `"light" | "dark"` | `"light"` | Style of the component. |
| `subtitle` | `string` | `-` | Tooltip subtitle text. |
| `title` | `Node` | `-` | Tooltip title. Zero-length titles string, undefined, null and false are never displayed. |
| `width` | `"default" | "wide"` | `"default"` | If set to `wide`, the tooltip is wider. |

### Code examples

#### **Tooltip – Dark**

This example demonstrates a dark-themed `Tooltip` that includes both a title and a subtitle.

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
  display: flex;
  justify-content: center;
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
import { ButtonIcon, Tooltip } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Tooltip 
        arrow 
        sdsStyle="dark"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi." 
        title="Tooltip title" 
      >
        <ButtonIcon
          sdsType="secondary"
          sdsSize="large"
          sdsIcon="InfoCircle"
        />
      </Tooltip>
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
    <title>Tooltips</title>
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

#### **Tooltip – Light** 

This example showcases a light-themed `Tooltip`.

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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
import { ButtonIcon, Tooltip } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Tooltip 
        arrow 
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi." 
      >
        <ButtonIcon
          sdsType="secondary"
          sdsSize="large"
          sdsIcon="InfoCircle"
        />
      </Tooltip>
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
    <title>Tooltips</title>
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

**Tooltip for disabled components**

This example demonstrates how to add a tooltip to a disabled component, commonly a button.

>**Note for Tooltips on** **`Disabled`** **elements**
>
>If the tooltip wraps a disabled component, please make sure to wrap the children in a `<span>` tag.
>
>[https://mui.com/components/tooltips/#disabled-elements](https://mui.com/components/tooltips/#disabled-elements)

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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
import { ButtonIcon, Tooltip } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Tooltip 
        arrow 
        title="This Button is disabled!" 
      >
        <span>
          <ButtonIcon
            sdsType="secondary"
            sdsSize="large"
            sdsIcon="Widget"
            disabled
          />
        </span>
      </Tooltip>
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
    <title>Tooltips</title>
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

## TooltipCondensed

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/TooltipCondensed/index.tsx).

### SDS vs MUI

Like the regular SDS `Tooltip` component, the `TooltipCondensed` component is built on MUI's `Tooltip` component, and has its own SDS-specific props and options (which are different from SDS's `Tooltip`  component's SDS-only options):

* **`indicator`****:**  This boolean prop determines whether or not the `Tooltip` text should be preceded by a colored dot.
* **`indicatorColor`****:**  Sets the color of the `indicator`,  if included.
* **`followCursor`****:**  Additionally, `TooltipCondensed` has the `followCursor` behavior, and setting the `followCursor` prop to `false` has no effect.

### MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-tooltip/).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `indicator` | `boolean` | `false` | This boolean prop determines whether or not the Tooltip text should be preceded by a colored dot. |
| `indicatorColor` | `color` | `-` | Sets the color of the indicator,  if included. |
| `title` | `Node` | `-` | Tooltip title. Zero-length titles string, undefined, null and false are never displayed. |

### Code examples

#### TooltipCondensed with indicator

This example illustrates the minimum required props to render `TooltipCondensed` with an indicator.

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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
import { ButtonIcon, TooltipCondensed } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <TooltipCondensed 
        indicator
        indicatorColor="DodgerBlue"
        title="Tooltip title" 
      >
        <ButtonIcon
          sdsType="secondary"
          sdsSize="large"
          sdsIcon="InfoCircle"
        />
      </TooltipCondensed>
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
    <title>Tooltips</title>
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

## TooltipTable

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/TooltipTable/index.tsx).

### SDS vs MUI

The SDS `TooltipTable` is built off of the MUI `Tooltip` component, but it has a built-in way to add tabular data:

*  **`data`****:** This prop takes an array of objects to be formatted within the `TooltipTable` with two columns, one for `label` and one for `value`.  
* **`itemAlign`****:**  This prop specific to SDS positions the `value` contents of each row either the `right` or `left` of their column.
* **`contentAlert`****:** This SDS-specific prop takes a value of `String` (a message),  `Element` (such as a link),  or `None` (the default).

### MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-tooltip/).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `contentAlert` | `string | JSX.Element` | `-` | This SDS-specific prop takes a value of String (a message),  Element (such as a link),  or None (the default) |
| `data` | `Array<{`     `label?: string;`     `dataRows: {`       `label: string;`       `value: string | number;`     `}[];`     `disabled?: boolean;`   `}>` | `-` | This prop takes an array of objects to be formatted within the TooltipTable with two columns, one for label  and one for value.   |
| `itemAlign` | `"left" | "right"` | `"right"` | This prop specific to SDS positions the value  contents of each row either the `right` or `left` of their column. |

### Code examples

#### Default TooltipTable

This example showcases the implementation of a `TooltipTable` component.

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
  display: flex;
  justify-content: center;
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
import { ButtonIcon, Tooltip, TooltipTable } from "@czi-sds/components";
import "./styles.css";

function App() {
  const data = [
    {
      dataRows: [
        { label: "First", value: 1 },
        { label: "Second", value: 2 },
      ],
      label: "Section 1",
    },
    {
      dataRows: [
        { label: "Third", value: 3 },
      ],
      label: "Section 2",
    }
  ];
  return (
    <div className="app">
      <Tooltip 
        arrow 
        title={
          <TooltipTable itemAlign="right" data={data} />
        } 
        placement="right-end"
      >
        <ButtonIcon
          sdsType="secondary"
          sdsSize="large"
          sdsIcon="InfoCircle"
        />
      </Tooltip>
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
    <title>Tooltips</title>
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

