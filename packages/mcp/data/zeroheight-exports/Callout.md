# Callout

Callouts are used within the flow of the page to highlight information to the user whether in response to an action they have completed or to bring their attention to important details.

## Guidelines

## Overview

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Callout Variants

Callouts come in three different variants: Persistent, Dismissible, and Expandable. All Callout variants can be set to automatically dismiss after a designated period of time (8 seconds by default).

Callouts appear within the flow of the page, unlike Notifications which appear outside of the page's flow on top of other elements. They span the full width of their container.

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

### Callout – Persistent

Use Callout – Persistent when communicating information that should remain on the screen and can't be manually dismissed by the user. Additional text may be displayed below the Callout's title.

| Default | Default + Alert Text |
| --- | --- |

---

### Callout – Dismissible

Use when communicating information that doesn't need to remain on the screen and, therefore, may be dismissed by the user. Additional text may be displayed below the Callout's title.

| Default | Default + Alert Text |
| --- | --- |

---

### Callout – Expandable

Use when communicating a lot of information that may be useful, but isn't strictly necessary for the user to see, since the additional content may be hidden by the Accordion. Additional text may be displayed below the Callout's title, outside of the accordion. This Callout variant remains on the screen and can't be manually dismissed by the user.

| Collapsed | Collapsed + Alert Text | Expanded + Content Module | Expanded + Alert Text + Content Module |
| --- | --- | --- | --- |

---

### Callout Spacing

These rules establish how much margin should exist between and around elements.

---

### Intent Variations

There are four different intents that Callouts can communicate: Info, Negative, Notice, and Positive. Each intent is communicated using color and iconography.

Each intent is demonstrated below using the Persistent variant for reference. Regardless of variant, the colors and icons used are the same.

| Info | Negative | Notice | Positive |
| --- | --- | --- | --- |

## Code

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

## Callout

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

The SDS `Callout` component is built upon the MUI `Alert` component (as is the SDS `Notification` component), but there are some important differences: 

* **Color:** SDS's `Callout` component has its own `intent` prop designed for setting both the color and default icon, and takes the values of `"info"`, `"error"`, `"success"`, or `"warning"`. MUI's `Alert`  instead uses the `severity` prop for this purpose (`severity` can also be used for SDS's `Notification`,  and will take the same values as `intent`; this is not recommended)
* **Titles:** SDS's `Callout` uses the `CalloutTitle` in place of the `AlertTitle` used by MUI's `Alert` to wrap title text. It is a stylized version of `AlertTitle`, and can be imported with `import { CalloutTitle } from "@czi-sds/components"`
* **Expanding and closing:** SDS's `Callout` introduces a prop called `expandable` that, when `true`,  allows any additional text (beyond the title text) to be visible or hidden by toggling a chevron (automatically added) in the top right of the callout  (`expandable` should ideally only be used if there *is* in fact text in addition to the title text; otherwise the chevron will still appear but will not do anything functional because there will be no extra text to reveal). If the ability to close the Callout is desired, pass a callback function to `onClose`, and SDS will automatically render a close button. SDS uses MUI's Alert `action` prop under the hood, in case there is a need to further override the behavior
* **Transitions:** SDS's `Callout` uses the `Grow` transition component by default
* **Icons:** Like with MUI's `Alert`, SDS's `Callout` also shows an icon to the left of the title text. This can be changed manually (it also changes automatically based on the `intent`  setting; see first bullet). The format for setting the `icon`  prop for SDS's `Notification` is slightly different than for MUI, in that it invokes the `Icon`  component:

	`icon={<Icon sdsSize="l" sdsIcon="download" sdsType="static" />`

	Additionally, setting `icon={false}` has no effect, and `iconMapping` does not work to change icons associated to `intent` or `severity`.  

* **Variants:** The `variant` prop is not available for SDS's `Callout` component.

### MUI Documentation

Documentation for the underlying MUI `Alert` component can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `autoDismiss` | `bool` | `false` | Control the automatic dismissal behavior of `Callouts`. Specify a numeric value in milliseconds to set the duration after which the callout will automatically disappear. Alternatively, set `autoDismiss` to `false` to keep the callout visible until manually dismissed. |
| `intent` | `"info"` `| "negative"` `| "positive"` `| "notice"` | `-` | The color of the component. |
| `icon` | `ReactNode` | `-` | Icon displayed to the left of the `Callout` title. |
| `onClose` | `func` | `function(event: React.SyntheticEvent) => void` | Callback fired when the component requests to be closed. When provided and no action prop is set, a close icon button is displayed that triggers the callback when clicked. |
| `title` | `string` | `-` | Callout title |
| `hideTitle` | `boolean` | `false` | If set to `true`, Hides the Callout title |
| `body` | `string` | `-` | Callout body |
| `hideBody` | `boolean` | `false` | If set to `true`, Hides the Callout body |
| `children` | `ReactNode` | `-` | Extra content to show in the component slot section of the Callout |
| `sdsStyle` | `| "persistent"``| "expandable"``| "dismissible"` | `"persistent"` | Defines the style of the Callout:   - "persistent": Cannot be closed.   - "expandable": Includes a chevron icon to toggle extra content visibility.   - "dismissible": Includes an “x” icon for manual dismissal. |

### Code examples

#### Default Callout

This example has the minimum props needed for the `Callout` component.

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
// Most minimal Callout (just has the basic requirements)
      
import { Callout, CalloutTitle } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Callout
        intent="info"
      >
        <CalloutTitle>Callout box</CalloutTitle>
        The Callout Box component is a versatile UI element designed to draw attention to important 
        information or messages within your interface. With its clean and elegant design, the 
        Callout Box helps highlight key content, alerts, or contextual details. 
      </Callout>
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
    <title>Callout</title>
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

#### Expandable Callout

The Expandable `Callout` component provides an interactive and space-efficient way to present information. By default, it displays a brief summary, however, users can expand it to reveal more detailed content, similar to an accordion. This feature is particularly useful for sharing additional context or insights while keeping the initial interface clutter-free. 

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
// Expandable Callout
      
import { Callout, CalloutTitle } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Callout
        intent="notice"
        expandable
      >
        <CalloutTitle>Attention Required</CalloutTitle>
        The Warning Callout serves as a visual alert to draw immediate attention to critical 
        information that requires action or consideration. Its distinct appearance, coupled 
        with the "Attention Required" message, signals urgency and prompts users to take 
        appropriate steps. Use this component strategically to ensure vital messages are 
        noticed promptly and acted upon, enhancing user awareness and responsiveness.
      </Callout>
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
    <title>Callout</title>
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

#### Dismissible Callout

The dismissible `Callout` variant provides users with the ability to dismiss it at their convenience. It includes a close button located in the top right corner, offering a familiar interaction pattern for users to remove the `Callout` from view. Moreover, the `onClose` prop allows developers to define custom actions that are triggered when the `Callout` is closed. 

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
// Closable Callout
      
import { useState } from "react";
import { Callout, CalloutTitle, Button } from "@czi-sds/components";
import "./styles.css";

function App() {
  const [dismissed, setDismissed] = useState(false);
  const handleClick = () => {
    setDismissed(prev => !prev);
  }
  return (
    <div className="app">
      {
        !dismissed ?
          <Callout
            intent="negative"
            dismissed={dismissed}
            onClose={() => {
              console.log("Callout closed!");
              setDismissed(true);
            }}
          >
            <CalloutTitle>An Error Occurred</CalloutTitle>
            The Error Callout is a crucial component for communicating critical errors or issues 
            to users. With its distinct appearance and the message "An Error Occurred," it 
            ensures that users are immediately informed about unexpected situations that 
            require attention.
          </Callout> : 
          <Button onClick={handleClick} sdsType="primary" sdsStyle="rounded">Reset Callout</Button>
      }
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
    <title>Callout</title>
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

