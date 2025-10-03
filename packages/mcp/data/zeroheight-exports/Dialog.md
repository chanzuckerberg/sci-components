# Dialogs

A Dialog is a window element that appears on top of content to provide information or prompt the user for an action. When a Dialog is active, it disables all functionality of the page below and remains on the screen until it is either dismissed or action has been taken.

## Overview

|     | In Figma |     |     | Meets Accessibility |     |     | In napari hub + .org Codebases |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------------------------------ |

Dialogs are highly customizable and designed to accommodate a range of product needs and can optionally include overline text above the title, subtitle text below the title, or both. The interior of a Dialog can be filled with any content needed, whether that is to communicate information to the user or collect data from them via a form.

There are five size options, each with a fixed width and minimum height (except for `xs` and `xxs` which have no minimum height):

- `xxs` — `width: 270px`
- `xs` —`width: 400px`
- `s` —`width: 600px`, `min-height: 400px`
- `m` —`width: 900px`, `min-height: 480px`
- `l` —`width: 1200px`, `min-height: 600px`

Dialogs are dismissible in a few different ways. Regardless of how a Dialog is dismissed, it will result in any selections the user has made within it being lost.

Dialogs may be dismissed by:

- Clicking an action Button that is configured to close, cancel, or complete an action occurring in the Dialog
- Pressing the keyboard Esc key
- Clicking the close Icon Button
- Clicking outside of the Dialog. Doing this will result in any selections the user has made being lost, so it is recommended that the `canOutsideClickClose` prop remain set to `false` (the default setting) in instances where losing entered information would be a significant burden to the user

**Dialog**

---

---

### Dialog Spacing

In instances where the length of content contained in the Dialog results in the Dialog filling the entire height of the screen, there must be a minimum of `spaceXxl` margin above and below the Dialog window. The Dialog content scrolls when it exceeds the max-height of the dialog window; the title and any action Buttons are anchored to the top and bottom during scrolling.

**Dialog Spacing (napari hub + .org)**

---

---

### Dialog Backdrop

A backdrop appears behind the active Dialog to bring emphasis to it as well as indicate to users that they cannot interact with the content on the page behind it.

**Dialog Backdrop (napari hub + .org)**

---

## Code

## Dialog Component

| Below you will find an interactive Storybook iframe for Dialogs. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** Dialog |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | ----------------------------- |

---

> This component appears as it is in the default SDS codebase. Once imported into the napari hub or napari.org codebases, use a theme file to enable the napari visual appearance customization.

### Dialog

Storybook

---

A Dialog is a window element that appears on top of content to provide information or prompt the user for an action. When a Dialog is active, it disables all functionality of the page below and remains on the screen until it is either dismissed or action has been taken.

## Overview

## Dialog Variants

| The interior of a Dialog can be filled with any content needed, whether that is to communicate information to the user or collect data from them via a form. They come in four different sizes, each of which can optionally include a close Tertiary Icon Button in the top right corner, artwork above the title, and action Button(s) if the Dialog is prompting the user to take an action. In addition to their title, Dialogs can include overline text above the title, a subtitle below the title, or both. Follow the usage criteria accompanying each variant as a guide for selecting the correct Dialog for any given use case. |     | **Jump to variant:** Persistent Dismissible Use Cases |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------------------------- |

---

## Dialog

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ GEN EPI Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ---------------------- |

Dialogs are highly customizable and designed to accommodate a range of product needs; any combination of the following properties can be used:

- Overline text above the title, subtitle text below the title, or both
- Artwork above the title, whether a logo, icon, or illustration

There are four size options, each with a fixed width and minimum height (except for `xs` which has no minimum height):

- `xs` —`width: 400px`
- `s` —`width: 600px`, `min-height: 400px`
- `m` —`width: 900px`, `min-height: 480px`
- `l` —`width: 1200px`, `min-height: 600px`

Dialogs may be dismissed by:

- Clicking an action Button that is configured to close, cancel, or complete a multi-step workflow occurring in the Dialog
- Pressing the keyboard Esc key
- Clicking the close Tertiary Icon Button on Dismissible Dialogs
- Clicking outside of the Dialog. Doing this will result in any selections the user has made being lost, so it is recommended that the `canOutsideClickClose` prop remain set to `false` (the default setting) in instances where losing entered information would be a significant burden to the user

### Persistent Dialog

Use this variant when the user is unable to dismiss the Dialog without making a selection from one of the action Button(s). Because there is no way for the user to manually dismiss the Dialog, this variant must contain at least one action Button.

Persistent Dialogs are generally used in multi-step workflows where dismissing the Dialog would result in a loss of progress or when there is a need for users to confirm they have read the content on the Dialog before proceeding, such as when they are being directed to an external site (see Dialog Use Cases section below for details).

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

**Default (1 button)**

**Default (1 button)**

---

---

**Default (2 buttons)**

---

---

**Default (2 buttons) + Overline + Subtitle**

---

---

**Default (2 buttons) + Child Node (artwork)**

---

### Dismissible Dialog

Use this variant to allow the user the ability to manually dismiss the Dialog by clicking the close Tertiary Icon Button in the Dialog's upper right corner. Dismissing the Dialog will result in any selections the user has made being lost. Dismissible Dialogs should not be used in multi-step workflows where closing the Dialog would result in a loss of progress.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

**Default**

---

---

**Default (1 button)**

---

---

**Default (2 buttons)**

---

---

**Default (2 buttons) + Overline + Subtitle**

---

---

**Default (2 buttons) + Child Node (artwork)**

---

---

### Dialog Spacing

In instances where the length of content contained in the Dialog results in the Dialog filling the entire height of the screen, there must be a minimum of `spaceXxl` margin above and below the Dialog window. The Dialog content scrolls when it exceeds the max-height of the dialog window; title, overline, subtitle, and any action Buttons are anchored to the top and bottom during scrolling.

**Dialog Spacing (CZ GE)**

---

---

### Dialog Backdrop

A backdrop appears behind the active Dialog to bring emphasis to it as well as indicate to users that they cannot interact with the content on the page behind it.

**Dialog Backdrop (CZ GE)**

---

---

## Dialog Use Cases

Details and guidelines around complex Dialog use cases, such as nested Dialogs and multi-step Dialog workflows.

### Nested Dialogs

Nested Dialogs should only be used in specific scenarios, most notably when a user is being directed to an external site and a final confirmation is needed.

Avoid using nested dialogs when possible because it introduces layers of complexity to pages and may make it more difficult for users to anticipate the results of their actions. It may also impede usability by making it more difficult for users to quickly exit a flow. Instead, explore utilizing a multi-step Dialog workflow (see below).

**Nested Dialogs (CZ GE)**

---

**Nested Dialogs (CZ GE)**

---

### Multi-step Dialog Workflow

Dialog workflows should contain no more than three steps. Workflows that are more than three steps should be designed as a full-page experience.

For a flow that takes place inside a Dialog, all steps within that workflow should take place within the same size Dialog for a consistent user experience. Each step of the workflow should also be clearly communicated within the Dialog using the overline text.

The Dialog should not be dismissible and the `canOutsideClickClose` prop should be set to `false` to prevent any accidental loss of progress.

**Multi-step Workflow (CZ GE)**

---

## Code

## Dialog Component

| Below you will find an interactive Storybook iframe for Dialogs. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** Dialog |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | ----------------------------- |

---

> This component appears as it is in the default SDS codebase. Once imported into the CZ GEN EPI codebase, use a theme file to enable the CZ GEN EPI visual appearance customization.

### Dialog

Storybook

---

A Dialog is a window element that appears on top of content to provide information or prompt the user for an action. When a Dialog is active, it disables all functionality of the page below and remains on the screen until it is either dismissed or action has been taken.

## Overview

## Dialog Variants

| The interior of a Dialog can be filled with any content needed, whether that is to communicate information to the user or collect data from them via a form. They come in four different sizes, each of which can optionally include a close Tertiary Icon Button in the top right corner, artwork above the title, and action Button(s) if the Dialog is prompting the user to take an action. In addition to their title, Dialogs can include overline text above the title, a subtitle below the title, or both. Follow the usage criteria accompanying each variant as a guide for selecting the correct Dialog for any given use case. |     | **Jump to variant:** Persistent Dismissible Use Cases |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------------------------- |

---

## Dialog

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ ID Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ----------------- |

Dialogs are highly customizable and designed to accommodate a range of product needs; any combination of the following properties can be used:

- Overline text above the title, subtitle text below the title, or both
- Artwork above the title, whether a logo, icon, or illustration

There are four size options, each with a fixed width and minimum height (except for `xs` which has no minimum height):

- `xs` —`width: 400px`
- `s` —`width: 600px`, `min-height: 400px`
- `m` —`width: 900px`, `min-height: 480px`
- `l` —`width: 1200px`, `min-height: 600px`

Dialogs may be dismissed by:

- Clicking an action Button that is configured to close, cancel, or complete a multi-step workflow occurring in the Dialog
- Pressing the keyboard Esc key
- Clicking the close Tertiary Icon Button on Dismissible Dialogs
- Clicking outside of the Dialog. Doing this will result in any selections the user has made being lost, so it is recommended that the `canOutsideClickClose` prop remain set to `false` (the default setting) in instances where losing entered information would be a significant burden to the user

### Persistent Dialog

Use this variant when the user is unable to dismiss the Dialog without making a selection from one of the action Button(s). Because there is no way for the user to manually dismiss the Dialog, this variant must contain at least one action Button.

Persistent Dialogs are generally used in multi-step workflows where dismissing the Dialog would result in a loss of progress or when there is a need for users to confirm they have read the content on the Dialog before proceeding, such as when they are being directed to an external site (see Dialog Use Cases section below for details).

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

**Default (1 button)**

**Default (1 button)**

---

---

**Default (2 buttons)**

---

---

**Default (2 buttons) + Overline + Subtitle**

---

---

**Default (2 buttons) + Child Node (artwork)**

---

### Dismissible Dialog

Use this variant to allow the user the ability to manually dismiss the Dialog by clicking the close Tertiary Icon Button in the Dialog's upper right corner. Dismissing the Dialog will result in any selections the user has made being lost. Dismissible Dialogs should not be used in multi-step workflows where closing the Dialog would result in a loss of progress.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

**Default**

---

---

**Default (1 button)**

---

---

**Default (2 buttons)**

---

---

**Default (2 buttons) + Overline + Subtitle**

---

---

**Default (2 buttons) + Child Node (artwork)**

---

---

### Dialog Spacing

In instances where the length of content contained in the Dialog results in the Dialog filling the entire height of the screen, there must be a minimum of `spaceXxl` margin above and below the Dialog window. The Dialog content scrolls when it exceeds the max-height of the dialog window; title, overline, subtitle, and any action Buttons are anchored to the top and bottom during scrolling.

**Dialog Spacing (CZ ID)**

---

**Dialog Spacing (CZ ID)**

---

---

### Dialog Backdrop

A backdrop appears behind the active Dialog to bring emphasis to it as well as indicate to users that they cannot interact with the content on the page behind it.

**Dialog Backdrop (CZ ID)**

---

---

## Dialog Use Cases

Details and guidelines around complex Dialog use cases, such as nested Dialogs and multi-step Dialog workflows.

### Nested Dialogs

Nested Dialogs should only be used in specific scenarios, most notably when a user is being directed to an external site and a final confirmation is needed.

Avoid using nested dialogs when possible because it introduces layers of complexity to pages and may make it more difficult for users to anticipate the results of their actions. It may also impede usability by making it more difficult for users to quickly exit a flow. Instead, explore utilizing a multi-step Dialog workflow (see below).

**Nested Dialogs (SDS + CZ ID)**

---

**Nested Dialogs (SDS + CZ ID)**

---

### Multi-step Dialog Workflow

Dialog workflows should contain no more than three steps. Workflows that are more than three steps should be designed as a full-page experience.

For a flow that takes place inside a Dialog, all steps within that workflow should take place within the same size Dialog for a consistent user experience. Each step of the workflow should also be clearly communicated within the Dialog using the overline text.

The Dialog should not be dismissible and the `canOutsideClickClose` prop should be set to `false` to prevent any accidental loss of progress.

**Multi-step Workflow (CZ ID)**

---

## Code

## Dialog Component

| Below you will find an interactive Storybook iframe for Dialogs. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** Dialog |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | ----------------------------- |

---

### Dialog

Storybook

---

A Dialog is a window element that appears on top of content to provide information or prompt the user for an action. When a Dialog is active, it disables all functionality of the page below and remains on the screen until it is either dismissed or an action has been taken.

## Guidelines

## Overview

|     | In Figma |     |     | Meets Accessibility |     |     | In Code |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------- |

### Dialog Variants

The interior of a Dialog can be filled with any content needed, whether that is to communicate information to the user or collect data from them via a form.

There are two Dialog variants available—Persistent and Dismissible. They are highly customizable and designed to accommodate a range of product needs.

Any combination of the following properties can be used:

- One or two Button(s), positioned to the right or left side of the dialog (positioned right by default)
- Overline text above the title
- Subtitle text below the title
- Artwork above the title (logo, icon, or illustration)

There are four size options, each with a fixed width and minimum height (except for `xs` which has no minimum height):

- `xs` —`width: 400px`
- `s` —`width:  600px`, `min-height: 400px`
- `m` —`width: 900px`, `min-height: 480px`
- `l` —`width: 1200px`, `min-height: 600px`

Users can dismiss them by:

- Clicking an action Button that is configured to close, cancel, or complete a multi-step workflow occurring in the Dialog
- Pressing the keyboard `Esc` key
- Clicking the close Tertiary Icon Button (Dismissible variant only)
- Clicking outside of the Dialog. Doing this will result in any selections the user has made being lost, so it is recommended that this be disabled in instances where losing entered information would be a significant burden to the user

**Preview_Guidelines_Dialog_persistent**

---

**Preview_Guidelines_Dialog_dismissible**

---

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

### Dialog – Persistent

Use this variant when the user is unable to dismiss the Dialog without making a selection from one of the action Button(s). Because there is no way for the user to manually dismiss the Dialog, **this variant must contain at least one action Button**.

Persistent Dialogs are generally used:

- In multi-step workflows where dismissing the Dialog would result in a loss of progress
- When there is a need for users to confirm they have read the content on the Dialog before proceeding, such as when they are being directed to an external site (see Dialog Use Cases section below for details).

| 1 Button | 2 Buttons | 2 Buttons, left-aligned |
| -------- | --------- | ----------------------- |

**Dialog_Persistent_1 button**

---

**Dialog_Persistent_2 buttons**

---

**Dialog_Persistent_2 buttons, left**

---

| 2 Buttons, rounded | 2 Buttons + Overline + Subtitle | 2 Buttons + Artwork |
| ------------------ | ------------------------------- | ------------------- |

**Dialog_Persistent_2 buttons, rounded**

---

**Dialog_Persistent_overline, subtitle**

---

**Dialog_Persistent_artwork**

---

---

### Dialog – Dismissible

Use this variant to allow the user the ability to manually dismiss the Dialog by clicking the close Tertiary Icon Button in the Dialog's upper right corner. Dismissing the Dialog will result in any selections the user has made being lost. Dismissible Dialogs should not be used in multi-step workflows where closing the Dialog would result in a loss of progress (see Dialog Use Cases section below for details).

| 0 Buttons | 1 Button | 2 Buttons | 2 Buttons, left-aligned |
| --------- | -------- | --------- | ----------------------- |

**Dialog_Dismissible_0 buttons**

---

**Dialog_Dismissible_1 button**

---

**Dialog_Dismissible_2 buttons**

---

**Dialog_Dismissible_2 buttons, left**

---

| 2 Buttons, rounded | 2 Buttons + Overline + Subtitle | 2 Buttons + Artwork |
| ------------------ | ------------------------------- | ------------------- |

**Dialog_Dismissible_2 buttons, rounded**

---

**Dialog_Dismissible_overline, subtitle**

---

**Dialog_Dismissible_artwork**

---

---

### Dialog Spacing

In instances where the length of content contained in the Dialog results in the Dialog filling the entire height of the screen, there must be a minimum of `spaceXxl` margin above and below the Dialog window. The Dialog content scrolls when it exceeds the max-height of the dialog window; title, overline, subtitle, and any action Buttons are anchored to the top and bottom during scrolling.

**Dialog Spacing (SDS)**

---

---

### Dialog Backdrop

A backdrop appears behind the active Dialog to bring emphasis to it as well as indicate to users that they cannot interact with the content on the page behind it.

The default backdrop is dark and customizable at the product level.

**Dialog Backdrop (SDS)**

---

---

### Dialog Use Cases

Details and guidelines around complex Dialog use cases, such as nested Dialogs and multi-step Dialog workflows.

#### Nested Dialogs

Nested Dialogs should only be used in specific scenarios, most notably when a user is being directed to an external site and a final confirmation is needed.

Avoid using nested dialogs when possible because it introduces layers of complexity to pages and may make it more difficult for users to anticipate the results of their actions. It may also impede usability by making it more difficult for users to quickly exit a flow. Instead, explore utilizing a multi-step Dialog workflow (see below).

**Nested Dialogs (SDS + CZ ID)**

---

#### Multi-step Dialog Workflow

Dialog workflows should contain no more than three steps. Workflows that are more than three steps should be designed as a full-page experience.

For a flow that takes place inside a Dialog, all steps within that workflow should take place within the same size Dialog for a consistent user experience. Each step of the workflow should also be clearly communicated within the Dialog using the overline text.

The Dialog should not be dismissible to prevent any accidental loss of progress.

**Multi-step Workflow (SDS)**

---

## Code

> **Note:** The code examples below must install dependencies before displaying and may take extra time to load

## Dialog

### SDS Source Code

The `Dialog` component's source code in the SDS codebase can be found here.

The `Dialog` component is accompanied by a number of other accessory components that can be used to help compose dialogs, but they are not required:

- Main `Dialog` component source code
- `DialogActions` source code
- `DialogContent` source code
- `DialogPaper` source code
- `DialogTitle` source code

### SDS vs MUI

The SDS `Dialog` component is built on top of MUI's `Dialog` component. SDS's `Dialog` passes a styled version of the `Paper` component (`DialogPaper`) to the `PaperComponent` prop. You can further style this `DialogPaper` component and pass it to your SDS `Dialog` via the `PaperComponent` prop (a prop of SDS `Dialog`) if needed.

The SDS `Dialog` does **not** support the `fullScreen` prop that the MUI component has (which allows dialogs to overtake the full screen).

### MUI Documentation

Documentation for the underlying MUI component can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

#### Dialog Props

Props table for the Dialog component.

| Name                   | Type     | Default                                           | Description                                                                                                                                                                                  |
| ---------------------- | -------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | --- | ------------------------------------------ |
| `canClickOutsideClose` | `bool`   | `false`                                           | A boolean prop that determines whether clicking outside of the Dialog should trigger its closure.                                                                                            |
| `onClose`              | `func`   | `function(event: object, reason: string) => void` | A callback function that is invoked when the Dialog is closed. It receives two parameters: `event`. The event source of the callback. `reason`. Can be: .`escapeKeyDown`., .`backdropClick`. |
| `sdsSize`              | `"xs"` ` | "s"` `                                            | "m"` `                                                                                                                                                                                       | "l"` | `m` | Controls the size of the Dialog component. |

#### DialogTitle Props

Props table for the DialogTitle component.

| Name       | Type     | Default                                           | Description                                                                                                                                                                                                                                              |
| ---------- | -------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`    | `string` | `-`                                               | This prop represents the title text to be displayed in the Dialog component.                                                                                                                                                                             |
| `subtitle` | `string` | `-`                                               | The subtitle prop allows you to include additional descriptive text beneath the title within the Dialog.                                                                                                                                                 |
| `onClose`  | `func`   | `function(event: object, reason: string) => void` | When the `onClose` prop is set, it results in the appearance of a small `x` icon in the top-right corner of the Dialog. This `x` icon provides users with a visual cue to close the Dialog, and clicking on it invokes the specified `onClose` function. |
| `open`     | `bool`   | `false`                                           | If `true`, the component is shown.                                                                                                                                                                                                                       |

#### DialogActions Props

Props table for the DialogActions component.

| Name             | Type    | Default  | Description |
| ---------------- | ------- | -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `buttonPosition` | `"left" | "right"` | `left`      | Specifies the position of action buttons within the Dialog component. It can be set to either `left` or `right` , allowing you to control the alignment of these buttons. |

### Code examples

#### Default Dialog

This example has the minimum props needed for the `Dialog` component.

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
// Most minimal Dialog (just has the basic requirements)

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@czi-sds/components";
import "./styles.css";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  function handleClick() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="app">
      <Button sdsStyle="minimal" sdsType="primary" onClick={handleClick}>
        Open Dialog
      </Button>
      <Dialog onClose={handleClose} open={isOpen} sdsSize="xs">
        <DialogTitle
          title="Learning"
          subtitle="Learning Resources"
          onClose={handleClose}
        />
        <DialogContent>
          Embark on a journey of continuous improvement with our treasure trove
          of learning materials. This section hosts an array of tutorials,
          guides, and insightful articles designed to enhance your skills and
          deepen your understanding.
        </DialogContent>
      </Dialog>
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

#### Dialog with `canclickOutsideClose` set as `false`

This example demonstrates a `Dialog` component that remains open even when clicked outside of the `Dialog`.

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
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@czi-sds/components";
import "./styles.css";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  function handleClick() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="app">
      <Button sdsStyle="minimal" sdsType="primary" onClick={handleClick}>
        Open Dialog
      </Button>
      <Dialog
        onClose={handleClose}
        open={isOpen}
        sdsSize="xs"
        canClickOutsideClose={false}
      >
        <DialogTitle
          title="Welcome"
          subtitle="New features showcase"
          onClose={handleClose}
        />
        <DialogContent>
          We are thrilled to introduce you to our latest enhancements and
          features. In this interactive showcase, you'll have the opportunity to
          explore a wide range of improvements designed to elevate your user
          experience. Whether it's streamlined navigation, enhanced performance,
          or delightful visual enhancements, we've got something for everyone.
          Dive in and discover what's new!
        </DialogContent>
      </Dialog>
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

#### Dialog with Action Buttons

This example demonstrates a `Dialog` component that features action `Buttons` located in the dialog's footer.

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
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@czi-sds/components";
import "./styles.css";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  function handleClick() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="app">
      <Button sdsStyle="minimal" sdsType="primary" onClick={handleClick}>
        Open Dialog
      </Button>
      <Dialog onClose={handleClose} open={isOpen} sdsSize="xs">
        <DialogTitle
          title="Learning"
          subtitle="Learning Resources"
          onClose={handleClose}
        />
        <DialogContent>
          Embark on a journey of continuous improvement with our treasure trove
          of learning materials. This section hosts an array of tutorials,
          guides, and insightful articles designed to enhance your skills and
          deepen your understanding.
        </DialogContent>
        <DialogActions buttonPosition="right">
          <Button sdsStyle="square" sdsType="secondary" onClick={handleClose}>
            Secondary Action
          </Button>
          <Button sdsStyle="square" sdsType="primary" onClick={handleClose}>
            Primary Action
          </Button>
        </DialogActions>
      </Dialog>
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

#### Dialog with a long content

This example showcases a `Dialog` component with lengthy content. To manage the display of this extended content, SDS intelligently adds scroll functionality to the `dialogContent` area. This ensures that users can easily access any `Dialog` action buttons that may be present.

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
// Most minimal Dialog (just has the basic requirements)

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@czi-sds/components";
import "./styles.css";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  function handleClick() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="app">
      <Button sdsStyle="minimal" sdsType="primary" onClick={handleClick}>
        Open Dialog
      </Button>
      <Dialog onClose={handleClose} open={isOpen} sdsSize="xs">
        <DialogTitle
          title="Learning"
          subtitle="Learning Resources"
          onClose={handleClose}
        />
        <DialogContent>
          Embark on a fulfilling journey of continuous improvement with our vast
          repository of valuable learning resources. Within this dedicated
          section, you'll find an extensive collection of meticulously crafted
          tutorials, comprehensive guides, and thought-provoking articles
          meticulously designed to enrich your skill set and provide profound
          insights into your field of interest. Explore a diverse range of
          topics, from fundamental principles to advanced techniques, as we aim
          to empower you with knowledge that transcends boundaries. Whether
          you're a novice eager to build a strong foundation or a seasoned
          professional seeking to stay at the forefront of your industry, our
          treasure trove of educational materials is your gateway to honing your
          expertise. Unlock your potential, expand your horizons, and stay ahead
          of the curve by immersing yourself in this wealth of knowledge. We
          believe that continuous learning is the key to personal and
          professional growth, and we're excited to accompany you on this
          educational journey, every step of the way.
        </DialogContent>
        <DialogActions buttonPosition="left">
          <Button sdsStyle="square" sdsType="primary" onClick={handleClose}>
            Primary Action
          </Button>
          <Button sdsStyle="square" sdsType="secondary" onClick={handleClose}>
            Secondary Action
          </Button>
        </DialogActions>
      </Dialog>
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
