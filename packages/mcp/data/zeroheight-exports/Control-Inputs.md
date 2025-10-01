# Control Inputs

Control Inputs are elements that enable users to make selections and communicate choices when presented with various options in the UI.

## Overview

## Control Input Variants

| There are two Control Input components available for designers to use depending on the type of action or response they are needing to elicit from the user. Checkbox and Radio Inputs must always be accompanied by a label that communicates the result of the selection. Follow the usage criteria accompanying each variant as a guide for selecting the correct Control Input for any given use case. |     | **Jump to variant:** Checkbox Radio |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------- |

---

## Checkbox Input

|     | In Figma |     |     | Meets Accessibility |     |     | In napari hub + .org Codebases |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------------------------------ |

Use when the user can select multiple options from a group of choices. Each Checkbox must be coupled with a label to communicate the result of a selection.

Use `sdsStage: indeterminate` to indicate a mixed selection; reserved for cases where "Select All" is an option as part of a group of checkboxes.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Disabled** |
| ----------- | --------- | ------------ |

**InputCheckbox**

---

**InputCheckbox**

---

**InputCheckbox**

---

---

**InputCheckbox**

---

**InputCheckbox**

---

**InputCheckbox**

---

---

**InputCheckbox**

---

**InputCheckbox**

---

**InputCheckbox**

---

### Checkbox Lockups

Each Checkbox must be coupled with a label to communicate the result of a selection.

**InputCheckbox Lockup**

---

**InputCheckbox Lockup**

---



---

### Checkbox Spacing

These rules establish how much margin should exist between and around elements.



**Checkbox spacing**

---

---

## Radio Input

|     | In Figma |     |     | Meets Accessibility |     |     | In napari hub + .org Codebases |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------------------------------ |

Use when the user can select only one option from a group of choices. Each Radio Input must be coupled with a label to communicate the result of a selection.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Disabled** |
| ----------- | --------- | ------------ |

**InputRadio**

---

**InputRadio**

---

**InputRadio**

---

---

**InputRadio**

---

**InputRadio**

---

**InputRadio**

---

### Radio Lockups

Each Radio must be coupled with a label to communicate the result of a selection.

**InputRadio Lockup**

---

**InputRadio Lockup**

---

---

### Radio Spacing

These rules establish how much margin should exist between and around elements.

**Radio spacing**

---



## Code

## Control Input Components

| Below you will find interactive Storybook iframes for each component within the Control Input element group. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** InputCheckbox InputRadio |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------------------- |

---

> These components appear as they are in the default SDS codebase. Once imported into the napari hub or napari.org codebases, use a theme file to enable the napari visual appearance customization.

### InputCheckbox

Storybook

---

### InputRadio

Storybook

---

Control Inputs are elements that enable users to make selections and communicate choices when presented with various options in the UI.

## Overview

## Control Input Variants

| There is a range of Control Input variants available for designers to use depending on the type of action or response they are needing to elicit from the user. Checkbox and Radio Inputs must always be accompanied by a label that communicates the result of the selection. Follow the usage criteria accompanying each variant as a guide for selecting the correct Control Input for any given use case. |     | **Jump to variant:** Checkbox Radio Toggle |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------------ |

### Visual Preview

Use the links below to jump to information on a specific Control Input variant:

**InputCheckbox Lockup**

---

**InputRadio Lockup**

---

**InputToggle**

---

---

## Checkbox Input

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ GEN EPI Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ---------------------- |

Use when the user can select multiple options from a group of choices. Each Checkbox must be coupled with a label (and optional caption) to communicate the result of a selection.

Use `sdsStage: indeterminate` to indicate a mixed selection; reserved for cases where "Select All" is an option as part of a group of checkboxes.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Disabled** |
| ----------- | --------- | ------------ |

**InputCheckbox**

---

**InputCheckbox**

---

**InputCheckbox**

---

---



**InputCheckbox**

---

**InputCheckbox**

---

**InputCheckbox**

---

---



**InputCheckbox**

---

**InputCheckbox**

---

**InputCheckbox**

---

### Checkbox Intent States

Use `intent: default` to communicate that a user has yet to enter a response.

Use `intent: error` to communicate when a user has entered an incorrect or incomplete response.

Use `intent: warning` to communicate when a user needs to be alerted that their response needs attention.

| **Default** | **Error** | **Warning** |
| ----------- | --------- | ----------- |

**InputCheckbox**

---

**InputCheckbox**

---

**InputCheckbox**

---



### Checkbox Lockups

Each Checkbox must be coupled with a label to communicate the result of a selection. If additional details about the selection need to be communicated, an optional caption can be included.

**InputCheckbox Lockup_no caption_enabled**

---

**InputCheckbox Lockup_no caption_disabled**

---

**InputCheckbox Lockup_caption_disabled**

---

**InputCheckbox Lockup_caption_disabled**

---

---

### Checkbox Spacing

These rules establish how much margin should exist between and around elements.

**Checkbox spacing**

---

---

## Radio Input

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ GEN EPI Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ---------------------- |

Use when the user can select only one option from a group of choices. Each Radio must be coupled with a label (and optional caption) to communicate the result of a selection.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Disabled** |
| ----------- | --------- | ------------ |

**InputRadio**

---

**InputRadio**

---

**InputRadio**

---

| **Default** | **Disabled** |
| ----------- | ------------ |

**InputRadio**

---

**InputRadio**

---



### Radio Intent States

Use `intent: default` to communicate that user has yet to enter a response.

Use `intent: error` to communicate when a user has entered an incorrect or incomplete response.

Use `intent: warning` to communicate when a user needs to be alerted that their response needs attention.

| **Default** | **Error** | **Warning** |
| ----------- | --------- | ----------- |

**InputRadio**

---

**InputRadio**

---

**InputRadio**

---

### Radio Lockups

Each Radio must be coupled with a label to communicate the result of a selection. If additional details about the selection need to be communicated, an optional caption can be included.

**InputRadio Lockup_no caption_enabled**

---

**InputRadio Lockup_no caption_disabled**

---

**InputRadio Lockup_caption_disabled**

---

**InputRadio Lockup_caption_disabled**

---

---

### Radio Spacing

These rules establish how much margin should exist between and around elements.

**Radio spacing**

---

---

## Toggle

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ GEN EPI Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ---------------------- |

Use to allow the user to flip a setting or option from off to on and vice versa.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Disabled** |
| ----------- | --------- | ------------ |

**InputToggle**

---

**InputToggle**

---

**InputToggle**

---

---

**InputToggle**

---

**InputToggle**

---

**InputToggle**

---

---

### Toggle Spacing

These rules establish how much margin should exist between and around elements.

**Toggle spacing**

---

## Code

## Control Input Components

| Below you will find interactive Storybook iframes for each component within the Control Input element group. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** InputCheckbox InputRadio InputToggle InputSlider |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------------------------------------------- |

---

> These components appear as they are in the default SDS codebase. Once imported into the CZ GEN EPI codebase, use a theme file to enable the CZ GEN EPI visual appearance customization.

### InputCheckbox

Storybook

---

### InputRadio

Storybook

---

### InputToggle

Storybook

---

Control Inputs are elements that enable users to make selections and communicate choices when presented with various options in the UI.

## Overview

## Control Input Variants

| There is a range of Control Input variants available for designers to use depending on the type of action or response they are needing to elicit from the user. Checkbox and Radio Inputs must always be accompanied by a label that communicates the result of the selection. Follow the usage criteria accompanying each variant as a guide for selecting the correct Control Input for any given use case. |     | **Jump to variant:** Checkbox Radio Toggle Slider |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------------------- |

### Visual Preview

Use the links below to jump to information on a specific Control Input variant:

**InputCheckbox Lockup**

---

**InputRadio Lockup**

---

**InputToggle**

---

**InputSlider**

---

---

## Checkbox Input

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ ID Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ----------------- |

Use when the user can select multiple options from a group of choices. Each Checkbox must be coupled with a label (and optional caption) to communicate the result of a selection.

Use `sdsStage: indeterminate` to indicate a mixed selection; reserved for cases where "Select All" is an option as part of a group of checkboxes.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Disabled** |
| ----------- | --------- | ------------ |

**InputCheckbox**

---

**InputCheckbox**

---

**InputCheckbox**

---

---

**InputCheckbox**

---

**InputCheckbox**

---

**InputCheckbox**

---

---

**InputCheckbox**

---

**InputCheckbox**

---

**InputCheckbox**

---



### Checkbox Intent States

Use `intent: default` to communicate that user has yet to enter a response.

Use `intent: error` to communicate when a user has entered an incorrect or incomplete response.

Use `intent: warning` to communicate when a user needs to be alerted that their response needs attention.

| **Default** | **Error** | **Warning** |
| ----------- | --------- | ----------- |

**InputCheckbox**

---

**InputCheckbox**

---

**InputCheckbox**

---

### Checkbox Lockups

Each Checkbox must be coupled with a label to communicate the result of a selection. If additional details about the selection need to be communicated, an optional caption can be included.

**InputCheckbox Lockup_no caption_enabled**

---

**InputCheckbox Lockup_no caption_disabled**

---

**InputCheckbox Lockup_caption_disabled**

---

**InputCheckbox Lockup_caption_disabled**

---

---

### Checkbox Spacing

These rules establish how much margin should exist between and around elements.

**Checkbox spacing**

---

---

## Radio Input

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ ID Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ----------------- |

Use when the user can select only one option from a group of choices. Each Radio must be coupled with a label (and optional caption) to communicate the result of a selection.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Disabled** |
| ----------- | --------- | ------------ |

**InputRadio**

---

**InputRadio**

---

**InputRadio**

---

| **Default** | **Disabled** |
| ----------- | ------------ |

**InputRadio**

---

**InputRadio**

---

### Radio Intent States

Use `intent: default` to communicate that user has yet to enter a response.

Use `intent: error` to communicate when a user has entered an incorrect or incomplete response.

Use `intent: warning` to communicate when a user needs to be alerted that their response needs attention.

| **Default** | **Error** | **Warning** |
| ----------- | --------- | ----------- |

**InputRadio**

---

**InputRadio**

---

**InputRadio**

---



### Radio Lockups

Each Radio must be coupled with a label to communicate the result of a selection. If additional details about the selection need to be communicated, an optional caption can be included.

**InputRadio Lockup_no caption_enabled**

---

**InputRadio Lockup_no caption_disabled**

---

**InputRadio Lockup_caption_disabled**

---

**InputRadio Lockup_caption_disabled**

---

---

### Radio Spacing

These rules establish how much margin should exist between and around elements.

**Radio spacing**

---

---

## Toggle

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ ID Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ----------------- |

Use to allow the user to flip a setting or option from off to on and vice versa.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Disabled** |
| ----------- | --------- | ------------ |

**InputToggle**

---

**InputToggle**

---

**InputToggle**

---

---

**InputToggle**

---

**InputToggle**

---

**InputToggle**

---

---

### Toggle Switch Spacing

These rules establish how much margin should exist between and around elements.

**Toggle spacing**

---

---

## Slider

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ ID Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ----------------- |

### Single-sided Slider

Use when there is a specific datapoint or value within a dataset that the user is able to select.

**InputSlider**

---

---

**InputSlider**

---

### Double-sided Slider

Use when users need the ability to select a range between two values within a dataset.

**InputSlider**

---

---

**InputSlider**

---

---

### Slider Spacing

These rules establish how much margin should exist between and around elements.

**Slider spacing**

---

## Code

## Control Input Components

| Below you will find interactive Storybook iframes for each component within the Control Input element group. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** InputCheckbox InputRadio InputToggle InputSlider |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------------------------------------------- |

---

### InputCheckbox

Storybook

---

### InputRadio

Storybook

---

### InputToggle

Storybook

---

### InputSlider

Storybook

---

Control Inputs are elements that enable users to make selections and communicate choices when presented with various options in the UI.

## Guidelines

## Control Input Components

| There are a range of Control Input components available to use depending on the type of action or response the application needs from the user. |     | **Jump to component:** Checkbox Radio Slider Toggle |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | --- | --------------------------------------------------- |

### Visual Preview

**Preview_Guidelines_InputCheckbox**

---

**Preview_Guidelines_InputRadio**

---

**Preview_Guidelines_InputSlider**

---

**Preview_Guidelines_InputToggle**

---

---

## Checkbox

|     | In Figma |     |     | Meets Accessibility |     |     | In Code |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

### Overview

Use Checkboxes when the user can select multiple options from a group of choices. Each Checkbox should be coupled with a label or other indicator communicating what is being selected by checking the box.

Use the indeterminate variant to indicate a mixed selection; reserved for cases where "Select All" is an option as part of a group of Checkboxes.

#### Checkbox – No Label

Use when Checkbox functionality is needed but a custom label is desired.

| Default | Hover | Disabled |
| ------- | ----- | -------- |

**Checkbox_No label_Unselected_Default**

---

**Checkbox_No label_Unselected_Hover**

---

**Checkbox_No label_Unselected_Disabled**

---

**Checkbox_No label_Indeterminate_Default**

---

**Checkbox_No label_Indeterminate_Hover**

---

**Checkbox_No label_Indeterminate_Disabled**

---

**Checkbox_No label_Selected_Default**

---

**Checkbox_No label_Selected_Hover**

---

**Checkbox_No label_Selected_Disabled**

---

#### Checkbox – Label

| Default | Hover | Disabled |
| ------- | ----- | -------- |

**Checkbox_Label_Unselected_Default**

---

**Checkbox_Label_Unselected_Hover**

---

**Checkbox_Label_Unselected_Disabled**

---

**Checkbox_Label_Indeterminate_Default**

---

**Checkbox_Label_Indeterminate_Hover**

---

**Checkbox_Label_Indeterminate_Disabled**

---

**Checkbox_Label_Selected_Default**

---

**Checkbox_Label_Selected_Hover**

---

**Checkbox_Label_Selected_Disabled**

---

#### Checkbox – Label + Caption

| Default | Hover | Disabled |
| ------- | ----- | -------- |

**Checkbox_Label + Caption_Unselected_Default**

---

**Checkbox_Label + Caption_Unselected_Hover**

---

**Checkbox_Label + Caption_Unselected_Disabled**

---

**Checkbox_Label + Caption_Indeterminate_Default**

---

**Checkbox_Label + Caption_Indeterminate_Hover**

---

**Checkbox_Label + Caption_Indeterminate_Disabled**

---

**Checkbox_Label + Caption_Selected_Default**

---

**Checkbox_Label + Caption_Selected_Hover**

---

**Checkbox_Label + Caption_Selected_Disabled**

---

---

### Checkbox Spacing

These rules establish how much margin should exist between and around elements.

**Checkbox spacing**

---

---

### Intent Variations

Use Default to communicate that the user has yet to enter a response, Negative to communicate when a user has entered an incorrect or incomplete response, and Notice when a user's response needs attention. Optionally, Intent Messages can be displayed to further communicate why a Negative or Notice intent was triggered. For more information see Intents.

| Default | Negative | Negative + Intent Message | Notice | Notice + Intent Message |
| ------- | -------- | ------------------------- | ------ | ----------------------- |

**Checkbox_Intent_Default**

---

**Checkbox_Intent_Negative**

---

**Checkbox_Intent_Negative + Message**

---

**Checkbox_Intent_Notice**

---

**Checkbox_Intent_Notice + Message**

---

---

## Radio

|     | In Figma |     |     | Meets Accessibility |     |     | In Code |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

### Overview

Use Radios when the user can only select one option from a group of choices. Each Radio must be coupled with a label (and optional caption) to communicate the result of a selection. If using the No Label variant, a custom label must be implemented as a separate element.

#### Radio – No Label

Use when Radio functionality is needed but a custom label is desired.

| Default | Hover | Disabled |
| ------- | ----- | -------- |

**Radio_No Label_Unselected_Default**

---

**Radio_No Label_Unselected_Hover**

---

**Radio_No Label_Unselected_Disabled**

---

| Default | Disabled |
| ------- | -------- |

**Radio_No Label_Selected_Default**

---

**Radio_No Label_Selected_Disabled**

---

#### Radio – Label

| Default | Hover | Disabled |
| ------- | ----- | -------- |

**Radio_Label_Unselected_Default**

---

**Radio_Label_Unselected_Hover**

---

**Radio_Label_Unselected_Disabled**

---

| Default | Disabled |
| ------- | -------- |

**Radio_Label_Selected_Default**

---

**Radio_Label_Selected_Disabled**

---

#### Radio – Label + Caption

| Default | Hover | Disabled |
| ------- | ----- | -------- |

**Radio_Label + Caption_Unselected_Default**

---

**Radio_Label + Caption_Unselected_Hover**

---

**Radio_Label + Caption_Unselected_Disabled**

---

| Default | Disabled |
| ------- | -------- |

**Radio_Label + Caption_Selected_Default**

---

**Radio_Label + Caption_Selected_Disabled**

---

---

### Radio Spacing

These rules establish how much margin should exist between and around elements.

**Radio spacing**

---

---

### Intent Variations

Use Default to communicate that the user has yet to enter a response, Negative to communicate when a user has entered an incorrect or incomplete response, and Notice when a user's response needs attention. Optionally, Intent Messages can be displayed to further communicate why a Negative or Notice intent was triggered. For more information see Intents.

| Default | Negative | Negative + Intent Message | Notice | Notice + intent Message |
| ------- | -------- | ------------------------- | ------ | ----------------------- |

**Radio_Intent_Default**

---

**Radio_Intent_Negative**

---

**Radio_Intent_Negative + Message**

---

**Radio_Intent_Notice**

---

**Radio_Intent_Notice + Message**

---

---

## Slider

|     | In Figma |     |     | Meets Accessibility |     |     | In Code |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

### Overview

Sliders allow users to select specific values or a range of values to input. Optionally, Sliders can include tick marks to provide context to users about the values available for selection.

#### Slider – Single-sided

Use when there is a specific datapoint or value within a dataset that the user is able to select.

| No Tick Marks | Tick Marks |
| ------------- | ---------- |

**Slider_Single-sided_No Tick Marks**

---

**Slider_Single-sided_Tick Marks**

---

#### Slider – Double-sided

Use when users need the ability to select a range between two values within a dataset.

| No Tick Marks | Tick Marks |
| ------------- | ---------- |

**Slider_Double-sided_No Tick Marks**

---

**Slider_Double-sided_Tick Marks**

---

---

### Slider Spacing

These rules establish how much margin should exist between and around elements.

**Slider spacing**

---

---

## Toggle Input

|     | In Figma |     |     | Meets Accessibility |     |     | In Code |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

### Overview

Toggle Inputs allow users to indicate true or false as part of a form or flip a setting or option from off to on (and vise versa). For toggling visibility of UI elements (like Panels), use a Toggle Button.

| Default | Hover | Disabled |
| ------- | ----- | -------- |

**Toggle_Off_Default**

---

**Toggle_Off_Hover**

---

**Toggle_Off_Disabled**

---

**Toggle_On_Default**

---

**Toggle_On_Hover**

---

**Toggle_On_Disabled**

---

---

### Toggle Input Spacing

These rules establish how much margin should exist between and around elements.

**Toggle spacing**

---

## Code

## Control Input Components

| There are a range of Control Input components available to use depending on the type of action or response the application needs from the user. |     | **Jump to component:** InputCheckbox InputRadio InputSlider InputToggle |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------------------------------------------- |

### Visual Preview

**Preview_Code_InputCheckbox**

---

**Preview_Code_InputRadio**

---

**Preview_Code_InputSlider**

---

**Preview_Code_InputToggle**

---

> **Note:** The code examples below must install dependencies before displaying and may take extra time to load

---

## InputCheckbox

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

The following props and options differ in how they function across the MUI `Checkbox` component and the SDS `InputCheckbox` component:

- **`size`\*\***:\*\* Has no effect in SDS
- **`color`\*\***:\*\* Has no effect in SDS
- **`labelPlacement`\*\***:\*\* Has no effect in SDS
- **`icon`\*\***:\*\* SDS's `InputCheckbox` is not currently set up to support icons (if you add one as shown in the MUI documentation, it will replace the empty checkbox square, but clicking the icon will result in the checked checkbox square appearing in the icon's place)
- **`stage`** **and checkbox state :** This is the SDS prop that sets the checkbox's state as `unchecked`, `checked`, or `indeterminate`. If `stage` is set, interacting with the component has no effect in changing the checkbox state. By contrast, MUI has a boolean `defaultChecked` prop that sets the checkbox's state and _does_ allow the user to interact to change the state.
- **`caption`\*\***:\*\* This is an SDS-specific prop, which takes a string of text that is displayed below the primary `label` text.

The following props are available for both the MUI and SDS components: **`required`**, **`disabled`**, and **`indeterminate`\*\***.\*\*

### MUI Documentation

Documentation for the underlying MUI component can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name            | Type                        | Default        | Description                                                                         |
| --------------- | --------------------------- | -------------- | ----------------------------------------------------------------------------------- | ----------- | ------------------------------------------- | ---------------------------------------- |
| `caption`       | `string`                    | `-`            | The caption of the InputCheckbox appears beneath the label in a lighter text color. |
| `checkboxProps` | `Partial<MUICheckboxProps>` | `{}`           | Directly pass these props to the underlying MUI checkbox.                           |
| `label`         | `string`                    | `-`            | The label of the InputCheckbox.                                                     |
| `stage`         | `"checked"` `               | "unchecked"` ` | "indeterminate"`                                                                    |             | Defines the stage or state of the checkbox. |
| `intent`        | `"default"` `               | "notice"`  `   | "negative"` `                                                                       | "positive"` | `"default"`                                 | Defines the color of the `InputCheckbox` |
| `disabled`      | `bool`                      | `false`        | If `true`, the component is disabled.                                               |

### Code examples

#### **Default InputCheckbox**

This example has the minimum props needed for the `InputCheckbox` component.

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
import { InputCheckbox } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <InputCheckbox label="Label" />
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

#### InputCheckbox + Caption

This example shows the `InputCheckbox` with an additional caption beneath the label, presented in a lighter text color.

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
import { InputCheckbox } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <InputCheckbox caption="Caption" label="Label" />
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

#### Indeterminate Checkbox

This example demonstrates a parent checkbox initially set to an indeterminate stage. When all the child checkboxes are checked, the parent checkbox transitions to a checked state.

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
import { Box } from "@mui/material";
import { InputCheckbox } from "@czi-sds/components";
import "./styles.css";

function App() {
  const [checked, setChecked] = useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 6 }}>
      <InputCheckbox
        label="Child 1"
        checkboxProps={{
          checked: checked[0],
          onChange: handleChange2,
        }}
      />
      <InputCheckbox
        label="Child 2"
        checkboxProps={{
          checked: checked[1],
          onChange: handleChange3,
        }}
      />
    </Box>
  );

  return (
    <div className="app">
      <InputCheckbox
        label="Parent"
        checkboxProps={{
          checked: checked[0] && checked[1],
          indeterminate: checked[0] !== checked[1],
          onChange: handleChange1,
        }}
      />
      {children}
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

---

## InputRadio

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

The following props and options differ in whether and how they function across MUI versus SDS's `InputRadio` component:

- **`size`\*\***:\*\* Has no effect in SDS
- **`color`\*\***:\*\* Has no effect in SDS
- **`labelPlacement`\*\***:\*\* Has no effect in SDS
- **`caption`\*\***:\*\* This is an SDS-specific prop, which takes a string of text that is desplayed below the primary `label` text.
- **`row`\*\***:\*\* This boolean prop functions the same for both MUI and SDS's `InputRadio` component: its presence reformats the radio buttons (and their labels) within the `RadioGroup` parent component into a horizontal row.

### MUI Documentation

Documentation for the underlying MUI component can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name         | Type                     | Default      | Description                                                                      |
| ------------ | ------------------------ | ------------ | -------------------------------------------------------------------------------- | ----------------------------- | ----------- | ------------------------------------- |
| `caption`    | `string`                 | -            | The caption of the InputRadio appears beneath the label in a lighter text color. |
| `label`      | `string`                 | -            | The label of the InputCheckbox.                                                  |
| `radioProps` | `Partial<MUIRadioProps>` | `{}`         | Directly pass these props to the underlying MUI radio.                           |
| `stage`      | `"checked"               | "unchecked"` | `unchecked`                                                                      | The stage of the radio input. |
| `intent`     | `"default"` `            | "notice"`  ` | "negative"` `                                                                    | "positive"`                   | `"default"` | Defines the color of the `InputRadio` |
| `disabled`   | `bool`                   | `false`      | If `true`, the component is disabled.                                            |

### Code examples

#### **Default InputRadio**

This example has the minimum props needed for the `InputRadio` component.

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
import { InputRadio } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <InputRadio label="Label" />
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

#### InputRadio + Caption

This example shows the `InputRadio` with an additional caption beneath the label, presented in a lighter text color.

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
import { InputRadio } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <InputRadio caption="Caption" label="Label" />
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

---

## InputSlider

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

The following props and options differ in how they function across MUI's `Switch` component versus SDS's `InputToggle` component:

- **`size`\*\***:\*\* Has no effect in SDS
- **`color`\*\***:\*\* Has no effect in SDS

These are some of the common props that can be used for both the MUI `Switch` component and the SDS `InputToggle` component:

- **`step`\*\***:\*\* Sets the step distance between selectable stops (and relatedly, if this prop is left out, the toggle is continuous, rather than discrete)
- **`marks`\*\***:\*\* When present and set to true, invokes the default marks style. When passed a rich array (of objects containing the value and the custom label to show at that value), sets marks and labels only at the positions specified by the array. See the "InputSlider with custom Marks" example below.
- **`valueLabelDisplay`\*\***:\*\* This prop determines whether and when the value label is displayed, and takes the following props: `auto` (the value label will display when the thumb is hovered or focused), `on` (default; labels display persistently), or `off` (labels are never displayed).
- **`orientation`\*\***:\*\* This prop controls which direction the slider is shown: `horizontal` (default) or `vertical`

### MUI Documentation

Documentation for the underlying MUI component can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name                | Type           | Default      | Description                                                                                                                                                                                                                                                                                             |
| ------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultValue`      | `Array<number> |  number`     | -                                                                                                                                                                                                                                                                                                       | The default value. Use when the component is not controlled. |
| `disabled`          | `bool`         | `false`      | If `true`, the component is disabled.                                                                                                                                                                                                                                                                   |
| `marks`             | `bool`         | `false`      | Marks indicate predetermined values to which the user can move the slider. If true the marks are spaced according the value of the step prop. If an array, it should contain objects with value and an optional label keys.                                                                             |
| `max`               | `number`       | `100`        | The maximum allowed value of the slider. Should not be equal to min.                                                                                                                                                                                                                                    |
| `min`               | `number`       | `0`          | The minimum allowed value of the slider. Should not be equal to max.                                                                                                                                                                                                                                    |
| `orientation`       | `"horizontal"` | `horizontal` | The component orientation.                                                                                                                                                                                                                                                                              |
| `step`              | `number`       | `1`          | The granularity with which the slider can step through values. (A "discrete" slider.) The `min` prop serves as the origin for the valid values. We recommend (max - min) to be evenly divisible by the step. When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop. |
| `valueLabelDisplay` | `"auto"` `     |  "off"` `    |  "on"`                                                                                                                                                                                                                                                                                                  | `off`                                                        | Controls when the value label is displayed: `auto`. the value label will display when the thumb is hovered or focused. . `on`. will display persistently. . `off`. will never display. |

### Code examples

#### **Default InputSlider**

This example has the minimum props needed for the `InputRadio` component.

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
import { InputSlider } from "@czi-sds/components";
import { Box } from "@mui/material";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 200 }}>
        <InputSlider label="Label" />
      </Box>
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

#### InputSlider with custom Marks

This example shows an `InputSlider` component that features custom marks precisely positioned at `0%`, `50%`, and `100%` of the slider's value.

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
import { InputSlider } from "@czi-sds/components";
import { Box } from "@mui/material";
import "./styles.css";

const generateCustomMarks = (min: number, max: number) => {
  return [
    {
      label: min,
      value: min,
    },
    {
      label: ((max - min) / 2 + min).toFixed(0),
      value: (max - min) / 2 + min,
    },
    {
      label: max,
      value: max,
    },
  ];
};

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 200 }}>
        <InputSlider
          label="Label"
          marks={generateCustomMarks(0, 100)}
          min={0}
          max={100}
          step={5}
          valueLabelDisplay
        />
      </Box>
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

---

## InputToggle

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

The following props and options differ and how they function across the MUI `Switch` component and the SDS `InputToggle` component:

- **`size`\*\***:\*\* Has no effect in SDS
- **`color`\*\***:\*\* Has no effect in SDS
- **`label`** **and** **`labelPlacement`\*\***:\*\* Has no effect in SDS
- The **`required`** prop is available for both the MUI and SDS components.

### MUI Documentation

Documentation for the underlying MUI component can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name       | Type     | Default | Description                                             |
| ---------- | -------- | ------- | ------------------------------------------------------- |
| `disabled` | `bool`   | `false` | If `true`, the component is disabled.                   |
| `offLabel` | `string` | `"Off"` | The text displayed within the InputToggle when it's off |
| `onChange` | `func`   |         | Sets what happens when a user toggles on the component. |
| `onLabel`  | `string` | `"On"`  | The text displayed within the InputToggle when it's off |
| `width`    | `number` | `62`    | Controls the `width` of the InputToggle element.        |

### Code examples

#### **Default InputToggle**

This example has the minimum props needed for the `InputToggle` component.

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
import { InputToggle } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <InputToggle />
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

#### **InputToggle with customized on and off labels**

This example shows an `InputToggle` component with customized on and off labels.

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
import { InputToggle } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <InputToggle onLabel="Start" offLabel="Finish" width={72} />
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
