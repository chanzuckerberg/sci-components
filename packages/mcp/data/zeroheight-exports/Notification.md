# Notifications

Notifications appear outside of the flow of the page to highlight information to the user whether in response to an action they have completed or to bring their attention to important details.

## Overview

## Notification Variants

| Notifications come in two different variants for designers to use depending on the type of information they need to display and whether they want the user to have the ability to manually dismiss them or not. All Notification variants can be set to automatically dismiss after a designated period of time (8 seconds by default). Notifications appear outside of the flow of the page on top of other elements as opposed to Callouts which appear within the page's flow. Follow the usage criteria accompanying each variant as a guide for selecting the correct Notification for any given use case. |     | **Jump to variant:** Persistent Dismissible Intent Variations |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------------------------------- |

---

## Notification

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ GEN EPI Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ---------------------- |

### Persistent Notification

Use when communicating information that is intended to remain persistent on the screen and is not manually dismissible by the user. It can be set to automatically dismiss after a designated period of time using the `autoDismiss` prop; when set to `true`, the automatic dismissal will occur after 8 milliseconds by default, but can be set to a custom length of time by entering a millisecond value into the prop.

A Minimal Button or Text Link can be added to the Notification if additional action from the user is possible or necessary. Most commonly, a Minimal Button with the label "Dismiss" is included to allow users to close out of the Notification. Text Links take users to pages related to the content on the Notification; for example when a user begins building a new tree, a Notification appears alerting them this work has begun that includes a Text Link that navigates them to the tree page for them to view their newly created tree.

Relevant components such as Tables (documentation coming soon) or Charts (documentation coming soon), or additional text can be included in the content module block as necessary.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

**Default**

---

---

**Default + Child Node (content module)**

---

---

**Default + Button**

---

---

**Default + Child Node (content module) + Button**

---

### Dismissible Notification

Use when communicating information that is manually dismissible by the user and does not need to remain persistent on the screen. It can be set to automatically dismiss after a designated period of time using the `autoDismiss` prop; when set to `true`, the automatic dismissal will occur after 8 milliseconds by default, but can be set to a custom length of time by entering a millisecond value into the prop.

A Minimal Button can be added to the Notification if additional action from the user is possible or necessary. Relevant components such as Tables (documentation coming soon) or Charts (documentation coming soon), or additional text can be included in the content module block as necessary.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

**Notification/Notification**

---

---

**Notification**

---

---

**Notification**

---

---

**Notification**

---

---

### Notification Spacing

These rules establish how much margin should exist between and around elements. Because Notifications are positioned in the top-right corner of the UI on top of other elements, the top and right spacing rules below indicate the distance between the component and the edges of the browser window.

**Notification spacing**

---

---

### Intent Variations

There are four different intents that all Notification variants can communicate—Info, Error, Success, and Warning—indicated with the use of color and iconography and selected using the `intent` prop.

Each intent is demonstrated below using the Persistent Notification for reference. Regardless of variant, the colors and icons used are the same:

| **Error** | **Info** |
| --------- | -------- |

**Notification**

---

**Notification**

---

| **Success** | **Warning** |
| ----------- | ----------- |

**Notification**

---

**Notification**

---

## Code

## Notification Component

| Below you will find an interactive Storybook iframe for Notifications. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** Notification |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | ----------------------------------- |

---

> This component appears as it is in the default SDS codebase. Once imported into the CZ GEN EPI codebase, use a theme file to enable the CZ GEN EPI visual appearance customization.

### Notification

Storybook

---

Notifications appear outside of the flow of the page to highlight information to the user whether in response to an action they have completed or to bring their attention to important details.

## Overview

## Notification Variants

| Notifications come in two different variants for designers to use depending on the type of information they need to display and whether they want the user to have the ability to manually dismiss them or not. All Notification variants can be set to automatically dismiss after a designated period of time (8 seconds by default). Notifications appear outside of the flow of the page on top of other elements as opposed to Callouts which appear within the page's flow. Follow the usage criteria accompanying each variant as a guide for selecting the correct Notification for any given use case. |     | **Jump to variant:** Persistent Dismissible Intent Variations |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------------------------------- |

---

## Notification

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ ID Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ----------------- |

### Persistent Notification

Use when communicating information that is intended to remain persistent on the screen and is not manually dismissible by the user. It can be set to automatically dismiss after a designated period of time using the `autoDismiss` prop; when set to `true`, the automatic dismissal will occur after 8 milliseconds by default, but can be set to a custom length of time by entering a millisecond value into the prop.

A Minimal Button can be added to the Notification if additional action from the user is possible or necessary. Relevant components such as Tables (documentation coming soon) or Charts (documentation coming soon), or additional text can be included in the content module block as necessary.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

**Default**

---

---

**Default + Child Node (content module)**

---

---

**Default + Button**

---

---

**Default + Child Node (content module) + Button**

---

### Dismissible Notification

Use when communicating information that is manually dismissible by the user and does not need to remain persistent on the screen. It can be set to automatically dismiss after a designated period of time using the `autoDismiss` prop; when set to `true`, the automatic dismissal will occur after 8 milliseconds by default, but can be set to a custom length of time by entering a millisecond value into the prop.

A Minimal Button can be added to the Notification if additional action from the user is possible or necessary. Relevant components such as Tables (documentation coming soon) or Charts (documentation coming soon), or additional text can be included in the content module block as necessary.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

**Default**

---

---

**Default + Child Node (content module)**

---

---

**Default + Button**

---

---

**Default + Child Node (content module) + Button**

---

---

### Notification Spacing

These rules establish how much margin should exist between and around elements. Because Notifications are positioned in the top-right corner of the UI on top of other elements, the top and right spacing rules below indicate the distance between the component and the edges of the browser window.

**Notification spacing**

---

---

### Intent Variations

There are four different intents that all Notification variants can communicate—Info, Error, Success, and Warning—indicated with the use of color and iconography and selected using the `intent` prop.

Each intent is demonstrated below using the Persistent Notification for reference. Regardless of variant, the colors and icons used are the same:

| **Error** | **Info** |
| --------- | -------- |

**Notification**

---

**Notification**

---

| **Success** | **Warning** |
| ----------- | ----------- |

**Notification**

---

**Notification**

---

## Code

## Notification Component

| Below you will find an interactive Storybook iframe for Notifications. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** Notification |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | ----------------------------------- |

---

### Notification

Storybook

---

Notifications appear outside of the flow of the page to highlight information to the user whether in response to an action they have completed or to bring their attention to important details.

## Guidelines

## Overview

|     | In Figma |     |     | Meets Accessibility |     |     | In Code |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------- |

### Notification Variants

Notifications come in two different variants distinguished by whether users to have the ability to manually dismiss them or not. All Notification variants can be set to automatically dismiss after a designated period of time (8 seconds by default).

Notifications appear outside of the flow of the page on top of other elements as opposed to Callouts which appear within the page's flow.

**Preview_Guidelines_Notification_persistent**

---

**Preview_Guidelines_Notification_dismissible**

---

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

### Notification – Persistent

Use when communicating information that is intended to remain persistent on the screen and is not manually dismissible by the user.

A Minimal Button can be added to the Notification if additional action from the user is possible or necessary; the Button is positioned to the right by default, but can optionally be positioned to the left. Relevant components or additional text can be included in the content module block as necessary.

| Default | Default + Button | Default + Content Module | Default + Content Module + Button |
| ------- | ---------------- | ------------------------ | --------------------------------- |

**Notification_persistent_default**

---

**Notification_persistent_button**

---

**Notification_persistent_content slot**

---

**Notification_persistent_button + content slot**

---

---

### Notification – Dismissible

Use when communicating information that is manually dismissible by the user and does not need to remain persistent on the screen.

A Minimal Button can be added to the Notification if additional action from the user is possible or necessary; the Button is positioned to the right by default, but can optionally be positioned to the left. Relevant components or additional text can be included in the content module block as necessary.

| Default | Default + Button | Default + Content Module | Default + Content Module + Button |
| ------- | ---------------- | ------------------------ | --------------------------------- |

**Notification_dismissible_default**

---

**Notification_dismissible_button**

---

**Notification_dismissible_content slot**

---

**Notification_dismissible_button + content slot**

---

---

### Notification Spacing

These rules establish how much margin should exist between and around elements.

**Notification spacing**

---

---

### Intent Variations

There are four different intents that all Notifications can communicate—Info, Negative, Notice, and Positive—indicated with the use of color and iconography.

Each intent is demonstrated below using the Persistent variant for reference. Regardless of variant, the colors and icons used are the same:

| Info | Negative | Notice | Positive |
| ---- | -------- | ------ | -------- |

**Notification_intent_info**

---

**Notification_intent_error**

---

**Notification_intent_warning**

---

**Notification_intent_success**

---

## Code

> **Note:** The code examples below must install dependencies before displaying and may take extra time to load

## Notification

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

The SDS `Notification` component is built upon the MUI `Alert` component (as is the SDS `Callout` component), but has some notable differences:

- **Color:** SDS's `Notification` component has its own `intent` prop designed for setting both the color and default icon, and takes the values of `"info"`, `"error"`, `"success"`, or `"warning"`. MUI's `Alert` instead uses the `severity` prop for this purpose (although `severity` can also be used for SDS's `Notification`, and will take the same values as `intent`, this is not recommended)
- **Title:** In MUI's `Alert` component, an `AlertTitle` component (that holds the title text) is added within the `Alert` component. However, SDS's `Notification` doesn't need the `AlertTitle` component, although it can take one; doing so won't change the style of the text it wraps. Instead of setting the `Notification`'s title with `AlertTitle`, wrap the title text directly within the `Notification` component, and append any additional (non-title) text using the `extraContent` variable
- **Transition:** The SDS `Notification` component is set up by default to use the `Slide` component, with `"left"` as its default value; alternatively, it accepts `"right"` as a value
- **Icon:** Like with MUI's `Alert`, SDS's `Notification` also shows an icon to the left of the title text; this can be changed manually (it also changes automatically based on the `intent` setting; see first bullet). The format for setting the `icon` prop for SDS's `Notification` is slightly different than for MUI in that it invokes the `Icon` component:

  `icon={<Icon sdsSize="l" sdsIcon="download"` `sdsType="static"` `/>`

  Additionally, the `iconMapping` prop does not work to change icons associated to `intent` or `severity` for SDS's `Notification`.

- **Variant\*\***:\*\* SDS does not support the `variant` prop. However, MUI's `Alert` does, and offers two options: `outlined`, which removes the background color but adds a colored border to the alert, and `filled`, which changes the background color to a more saturated color of the same hue. If the `variant` prop is used in SDS's `Notification` , only `variant="outline"` will have an affect (it will add the colored border, but will also maintain the original background color, whereas MUI's `Alert` removes the background color with this setting)

### MUI Documentation

Documentation for the underlying MUI `Alert` component can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name             | Type                                            | Default                | Description                                                                                                                                                                 |
| ---------------- | ----------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------------------------------------------------- |
| `autoDismiss`    | `bool                                           | number`                | `8000 ms`                                                                                                                                                                   | Determines the auto-dismiss behavior of the component. If set to `true`, the notification will automatically dismiss after `8000 ms`. If set to a number, it specifies the exact duration in milliseconds for auto-dismiss. If set to `false`, the notification will not auto-dismiss. |
| `buttonOnClick`  | `(event: React.SyntheticEvent) => void`         | `-`                    | A callback function to be executed when the button within the notification is clicked.                                                                                      |
| `buttonText`     | `string`                                        | `-`                    | The text displayed on the button within the notification.                                                                                                                   |
| `dismissed`      | `bool`                                          | `-`                    | Controls the dismissed state of the notification. When set to true, the notification will be hidden. You can use this prop to programmatically dismiss the notification.    |
| `onClose`        | `function(event: React.SyntheticEvent) => void` | `-`                    | Callback fired when the component requests to be closed. When provided and no action prop is set, a close icon button is displayed that triggers the callback when clicked. |
| `slideDirection` | `"left"                                         | "right"`               | `"left"`                                                                                                                                                                    | Specifies the direction from which the notification will slide into view when it appears.                                                                                                                                                                                              |
| `intent`         | `"info"` `                                      | "negative"` `          | "positive"` `                                                                                                                                                               | "notice"`                                                                                                                                                                                                                                                                              | `"positive"` | Defines the intent or purpose of the notification. |
| `icon`           | `ReactNode                                      | Partial<SdsIconProps>` | `-`                                                                                                                                                                         | icon displayed to the left of the `Notification` title.                                                                                                                                                                                                                                |
| `sdsIconProps`   | `Partial<SdsIconProps>`                         | `-`                    | The props for the icon if an SDS icon is used.                                                                                                                              |

### Code examples

#### Default Notification

This example demonstrates the most basic usage of the `Notification` component with default props.

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
// Most minimal Notification (just has the basic requirements)

import { Notification } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Notification>
        The Notification component has been rendered successfully!
      </Notification>
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

#### Notification component with additional text beyond the title

In this example, the `Notification` component is utilized to display more information than just a title. It illustrates how to include additional text content within the notification to provide users with more context or details about the notification's purpose.

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
import { Notification } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Notification>
        Notification Title
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet eveniet
          sapiente, officiis aut possimus suscipit assumenda non?
        </div>
      </Notification>
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

#### Dismissible Notification

The dismissible `Notification` component grants users the convenience of dismissing it on their terms. It features a close `ButtonIcon` positioned in the upper-right corner, delivering a familiar interaction pattern for users to effortlessly remove the notification from view. Furthermore, the `onClose` prop empowers developers to define custom actions triggered when the notification is closed.

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
import { Notification } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Notification
        onClose={(event) => {
          console.log("Notification closed!");
        }}
      >
        Notification Title
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet eveniet
          sapiente, officiis aut possimus suscipit assumenda non?
        </div>
      </Notification>
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

#### Notification with Embedded Button

A `Notification` component that has an integrated `Button` that closes the notification when clicked.

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
import { Notification, Button } from "@czi-sds/components";
import "./styles.css";

function App() {
  const [dismissed, setDismissed] = useState(false);
  const handleClick = () => {
    setDismissed((prev) => !prev);
  };
  return (
    <div className="app">
      {!dismissed ? (
        <Notification
          buttonText="Close"
          buttonOnClick={(event) => setDismissed(true)}
          dismissed={dismissed}
          intent="notice"
        >
          Notification Title
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
            eveniet sapiente, officiis aut possimus suscipit assumenda non?
          </div>
        </Notification>
      ) : (
        <Button onClick={handleClick} sdsType="primary" sdsStyle="rounded">
          Reset Notification
        </Button>
      )}
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
