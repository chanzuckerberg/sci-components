# Tags

Tags are used to help with categorization on plugin pages or in conjunction with filters to indicate which have been applied to the results of a search.

## Overview

| There are two Tag component types—standard Tags and Filter Tags. Tags are used to label the attributes of each plugin, helping users identify relevant plugins to use in their workflows whereas Filter Tags are used in conjunction with the Filter component to indicate which filters have been applied to the list of plugins. Follow the usage criteria accompanying each variant as a guide for selecting the correct Tag for any given use case. |     | **Jump to variant:** Tag Filter Tag |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------- |

### Visual Preview

Use the links below to jump to information on a specific Tag:

**Tag**

---

**TagFilter**

---

---

## Tag

|     | In Figma |     |     | Meets Accessibility |     |     | In napari hub + .org Codebases |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------------------------------ |

Tags are used to label the attributes of each plugin; these attributes are able to be filtered on using the Filter component. On the plugin list page, when a given parameter is filtered on, any matching attributes will appear as `active` Tags at the bottom of each plugin card. Additional attributes will continue to be displayed as `inactive` Tags. Users can click on any `inactive` Tag to add it as a Filter parameter.

If the user has clicked into a plugin's detail page while having one or more Filter parameters applied, all applicable Tags within the filtered category will appear at the top of the page with the Filtered parameter(s) appearing as `active` Tags. Additional attributes will continue to be displayed as `inactive` Tags. Users can click on any `inactive` Tag to bring them back to the plugin list page and add that attribute to their list of parameters being filtered on.

The InfoCircle icons within each Tag can be hovered over to display a Tooltip that will provide a definition of the parameter listed on the Tag.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default (Inactive)** | **Default (Active)** | **Hover** | **Pressed** |
| ---------------------- | -------------------- | --------- | ----------- |

**Tag**

---

**Tag**

---

**Tag**

---

**Tag**

---

---

### Tag Spacing

These rules establish how much margin should exist between and around elements.

**Tag spacing**

---

---

## Filter Tag

|     | In Figma |     |     | Meets Accessibility |     |     | In napari hub + .org Codebases |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------------------------------ |

On the left-side filter panel on the plugin list page, Filter Tags appear underneath each Filter Dropdown Input to communicate that the plugin list is being filtered on the parameter indicated on the Tag. Users can click on the Xmark icon on the tag to remove that parameter from the group of filters being applied.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Pressed** |
| ----------- | --------- | ----------- |

**Tag**

---

**Tag**

---

**Tag**

---

---

### Filter Tag Spacing

These rules establish how much margin should exist between and around elements.

**Filter Tag spacing**

---

## Code

## Tag Components

| Below you will find interactive Storybook iframes for each component within the Tags element group. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** Tag TagFilter |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------ |

---

> This component appears as it is in the default SDS codebase. Once imported into the napari hub or napari.org codebases, use a theme file to enable the napari visual appearance customization.

### Tag

Storybook

---

### TagFilter 

Storybook

---

Tags are used to label the status of certain elements or in conjunction with filters to indicate which have been applied when viewing datasets.

## Overview

## Tag Variants

| There are two primary Tag variants—Filter Tags and standard Tags. Filter Tags are used in conjunction with the Filter component to indicate which filters have been applied to a given dataset. Standard Tags are used throughout the UI whenever there's a need to label an element or communicate a status associated with it. Follow the usage criteria accompanying each variant as a guide for selecting the correct Tag for any given use case. |     | **Jump to variant:** Filter Rounded |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------- |

---

## Filter Tag

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ GEN EPI Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ---------------------- |

### Filter Tag

Used in conjunction with Filters to communicate that the dataset is being filtered on the parameter indicated in the Filter Tag. Users click on the Filter Tag to remove that parameter from the group of filters being applied.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Pressed** |
| ----------- | --------- | ----------- |

**TagFilter**

---

**TagFilter**

---

**TagFilter**

---

---

### Filter Tag Spacing

These rules establish how much margin should exist between and around elements.

**Filter Tag spacing**

---

---

## Rounded Tag

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ GEN EPI Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ---------------------- |

### Secondary Rounded Tag

Used in CZ GEN EPI without an icon to display the status of a sample within tables or trees. Used with an icon on status message screens.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Pressed** |
| ----------- | --------- | ----------- |

**Tag**

---

**Tag**

---

**Tag**

---

| **Default + Icon** | **Hover** | **Pressed** |
| ------------------ | --------- | ----------- |

**Tag**

---

**Tag**

---

**Tag**

---

---

### Rounded Tag Spacing

These rules establish how much margin should exist between and around elements.

**Rounded Tag spacing_CZ GE**

---

---

### Intent Variations

There are four different intents that Tags can communicate—Info, Error, Success, and Warning—indicated with the use of color and selected using the `intent` prop.

The Info variant is used when the information being communicated is neutral in nature and is meant to draw the user's attention to the element it is placed beside, providing additional context or details. The Error, Success, and Warning variants are meant to be used to communicate the status of the element, feature, or process they are placed beside.

| **Error** | **Info** |
| --------- | -------- |

**Error variant**

---

**Info variant**

---

| **Success** | **Warning** |
| ----------- | ----------- |

**Success variant**

---

**Warning variant**

---

## Code

## Tag Components

| Below you will find interactive Storybook iframes for each component within the Tags element group. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** TagFilter Tag |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------ |

---

> These components appear as they are in the default SDS codebase. Once imported into the CZ GEN EPI codebase, use a theme file to enable the CZ GEN EPI visual appearance customization.

### TagFilter

Storybook

---

### Tag

Storybook

---

Tags are used to label the status of certain elements or in conjunction with filters to indicate which have been applied when viewing datasets.

## Overview

## Tag Variants

| There are two primary Tag variants—Filter Tags and standard Tags. Filter Tags are used in conjunction with the Filter component to indicate which filters have been applied to a given dataset. Standard Tags come in two styles, Rounded and Square, and can be used throughout the UI whenever there's a need to label an element or communicate a status associated with it. Follow the usage criteria accompanying each variant as a guide for selecting the correct Tag for any given use case. |     | **Jump to variant:** Filter Rounded Square |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------------ |

---

## Filter Tag

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ ID Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ----------------- |

Used in conjunction with Filters to communicate that the dataset is being filtered on the parameter indicated in the Tag. Users click on the Filter Tag to remove that parameter from the group of filters being applied.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Pressed** |
| ----------- | --------- | ----------- |

**TagFilter**

---

**TagFilter**

---

**TagFilter**

---

---

### Filter Tag Spacing

These rules establish how much margin should exist between and around elements.

**Filter Tag spacing**

---

---

## Rounded Tag

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ ID Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ----------------- |

Secondary Tag option for a primary label.

Used in CZ ID without an icon to display the status of a sample within a Table. Used with an icon on status message screens.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Pressed** |
| ----------- | --------- | ----------- |

**Tag**

---

**Tag**

---

**Tag**

---

| **Default + Icon** | **Hover** | **Pressed** |
| ------------------ | --------- | ----------- |

**Tag**

---

**Tag**

---

**Tag**

---

---

### Rounded Tag Spacing

These rules establish how much margin should exist between and around elements.

**Rounded Tag spacing_CZ ID**

---

---

## Square Tag

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ ID Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ----------------- |

Alternate Tag shape for a label.

Used within CZ ID to label taxons as pathogenic.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Pressed** |
| ----------- | --------- | ----------- |

**Tag**

---

**Tag**

---

**Tag**

---

---

### Square Tag Spacing

These rules establish how much margin should exist between and around elements.

**Square Tag spacing_CZ ID**

---

## Code

## Tag Components

| Below you will find interactive Storybook iframes for each component within the Tags element group. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** TagFilter Tag |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------ |

---

### TagFilter

Storybook

---

### Tag

Storybook

---

Tags are used to label the status of certain elements or in conjunction with filters to indicate which have been applied when viewing datasets.

## Guidelines

## Tag Components

| There are two types of Tags—standard and filter. Filter Tags are used in conjunction with the Filter component to indicate which filters have been applied to a given dataset. Standard Tags come in two styles, Rounded and Square, and can be used throughout the UI whenever there's a need to label an element or communicate a status associated with it. |     | **Jump to variant:** Tag Filter Tag |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------- |

### Visual Preview

**Preview_Guidelines_Tag**

---

**Preview_Guidelines_TagFilter**

---

---

## Tag

|     | In Figma |     |     | Meets Accessibility |     |     | In Code |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------- |

### Tag Styles

The two available Tag styles are shown below, demonstrated here using the primary type. There are five intents that Tags can communicate—see the Intent Variations section below for more details.

**Tag_Rounded**

---

**Tag_Square**

---

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

### Tag – Rounded

Tag – Rounded is the default style used across applications, however if an alternate style is needed, use Tag – Square.

#### Primary

Use Tag – Primary in conjunction with the primary or most important content. Include an icon when needing to provide additional context to users of what content the Tag is connected to.

> **Note:** An icon must be included when using the large variant.

| Default | Hover | Pressed |
| ------- | ----- | ------- |

**Tag_Primary_Rounded_Small_No Icon_Default**

---

**Tag_Primary_Rounded_Small_No Icon_Hover**

---

**Tag_Primary_Rounded_Small_No Icon_Pressed**

---

**Tag_Primary_Rounded_Small_Icon_Default**

---

**Tag_Primary_Rounded_Small_Icon_Hover**

---

**Tag_Primary_Rounded_Small_Icon_Pressed**

---

**Tag_Primary_Rounded_Large_Icon_Default**

---

**Tag_Primary_Rounded_Large_Icon_Hover**

---

**Tag_Primary_Rounded_Large_Icon_Pressed**

---

#### Secondary

Use Tag – Secondary in conjunction with secondary or less important content. Include an icon when needing to provide additional context to users of what content the Tag is connected to.

> **Note:** An icon must be included when using the large variant.

| Default | Hover | Pressed |
| ------- | ----- | ------- |

**Tag_Secondary_Rounded_Small_No Icon_Default**

---

**Tag_Secondary_Rounded_Small_No Icon_Hover**

---

**Tag_Secondary_Rounded_Small_No Icon_Pressed**

---

**Tag_Secondary_Rounded_Small_Icon_Default**

---

**Tag_Secondary_Rounded_Small_Icon_Hover**

---

**Tag_Secondary_Rounded_Small_Icon_Pressed**

---

**Tag_Secondary_Rounded_Large_Icon_Default**

---

**Tag_Secondary_Rounded_Large_Icon_Hover**

---

**Tag_Secondary_Rounded_Large_Icon_Pressed**

---

---

### Tag – Square

Tag – Square is to be used when an alternate Tag style is needed as determined by the product designer.

#### Primary

Use Tag – Primary in conjunction with the primary or most important content. Include an icon when needing to provide additional context to users of what content the Tag is connected to.

> **Note:** An icon must be included when using the large variant.

| Default | Hover | Pressed |
| ------- | ----- | ------- |

**Tag_Primary_Square_Small_No Icon_Default**

---

**Tag_Primary_Square_Small_No Icon_Hover**

---

**Tag_Primary_Square_Small_No Icon_Pressed**

---

**Tag_Primary_Square_Small_Icon_Default**

---

**Tag_Primary_Square_Small_Icon_Hover**

---

**Tag_Primary_Square_Small_Icon_Pressed**

---

**Tag_Primary_Square_Large_Icon_Default**

---

**Tag_Primary_Square_Large_Icon_Hover**

---

**Tag_Primary_Square_Large_Icon_Pressed**

---

#### Secondary

Use Tag – Secondary in conjunction with secondary or less important content. Include an icon when needing to provide additional context to users of what content the Tag is connected to.

> **Note:** An icon must be included when using the large variant.

| Default | Hover | Pressed |
| ------- | ----- | ------- |

**Tag_Secondary_Square_Small_No Icon_Default**

---

**Tag_Secondary_Square_Small_No Icon_Hover**

---

**Tag_Secondary_Square_Small_No Icon_Pressed**

---

**Tag_Secondary_Square_Small_Icon_Default**

---

**Tag_Secondary_Square_Small_Icon_Hover**

---

**Tag_Secondary_Square_Small_Icon_Pressed**

---

**Tag_Secondary_Square_Large_Icon_Default**

---

**Tag_Secondary_Square_Large_Icon_Hover**

---

**Tag_Secondary_Square_Large_Icon_Pressed**

---

---

### Tag Spacing

These rules establish how much margin should exist between and around elements.

**Tag Spacing**

---

---

### Intent Variations

There are six different intents that Tags can communicate—Beta, Info, Negative, None, Notice, and Positive—indicated with the use of color.

Each intent is demonstrated below using the default state of the rounded variant for reference. Regardless of variant, the colors used are the same.

#### Primary

| Beta | Info | Negative | None | Notice | Positive |
| ---- | ---- | -------- | ---- | ------ | -------- |

**Tag_Primary_Small_No Icon_Intent_Beta**

---

**Tag_Primary_Small_No Icon_Intent_Info**

---

**Tag_Primary_Small_No Icon_Intent_Negative**

---

**Tag_Primary_Small_No Icon_Intent_None**

---

**Tag_Primary_Small_No Icon_Intent_Notice**

---

**Tag_Primary_Small_No Icon_Intent_Positive**

---

**Tag_Primary_Small_Icon_Intent_Beta**

---

**Tag_Primary_Small_Icon_Intent_Info**

---

**Tag_Primary_Small_Icon_Intent_Negative**

---

**Tag_Primary_Small_Icon_Intent_None**

---

**Tag_Primary_Small_Icon_Intent_Notice**

---

**Tag_Primary_Small_Icon_Intent_Positive**

---

**Tag_Primary_Large_No Icon_Intent_Beta**

---

**Tag_Primary_Large_No Icon_Intent_Info**

---

**Tag_Primary_Large_No Icon_Intent_Negative**

---

**Tag_Primary_Large_No Icon_Intent_None**

---

**Tag_Primary_Large_No Icon_Intent_Notice**

---

**Tag_Primary_Large_No Icon_Intent_Positive**

---

#### Secondary

| Beta | Info | Negative | None | Notice | Positive |
| ---- | ---- | -------- | ---- | ------ | -------- |

**Tag_Secondary_Small_No Icon_Intent_Beta**

---

**Tag_Secondary_Small_No Icon_Intent_Info**

---

**Tag_Secondary_Small_No Icon_Intent_Negative**

---

**Tag_Secondary_Small_No Icon_Intent_None**

---

**Tag_Secondary_Small_No Icon_Intent_Notice**

---

**Tag_Secondary_Small_No Icon_Intent_Positive**

---

**Tag_Secondary_Small_Icon_Intent_Beta**

---

**Tag_Secondary_Small_Icon_Intent_Info**

---

**Tag_Secondary_Small_Icon_Intent_Negative**

---

**Tag_Secondary_Small_Icon_Intent_None**

---

**Tag_Secondary_Small_Icon_Intent_Notice**

---

**Tag_Secondary_Small_Icon_Intent_Positive**

---

**Tag_Secondary_Large_No Icon_Intent_Beta**

---

**Tag_Secondary_Large_No Icon_Intent_Info**

---

**Tag_Secondary_Large_No Icon_Intent_Negative**

---

**Tag_Secondary_Large_No Icon_Intent_None**

---

**Tag_Secondary_Large_No Icon_Intent_Notice**

---

**Tag_Secondary_Large_No Icon_Intent_Positive**

---

---

## Filter Tag

|     | In Figma |     |     | Meets Accessibility |     |     | In Code |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

### Overview

Used Filter Tag in conjunction with Filters to communicate that the dataset is being filtered on the parameter indicated on the Filter Tag. Users click on the `Xmark` icon to remove that parameter from the group of filters being applied.

| Default | Hover | Pressed |
| ------- | ----- | ------- |

**TagFilter_Default**

---

**TagFilter_Hover**

---

**TagFilter_Pressed**

---

---

### Filter Tag Spacing

These rules establish how much margin should exist between and around elements.

**Filter Tag spacing**

---

## Code

## Tag Components

| There are two types of `Tags`—standard and filter. `TagFilter` is used in conjunction with the `Filter` component to indicate which filters have been applied to a given dataset. `Tag` comes in two styles, Rounded and Square, and can be used throughout the UI whenever there's a need to label an element or communicate a status associated with it. |     | **Jump to variant:** Tag TagFilter |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ---------------------------------- |

### Visual Preview

**Preview_Code_Tag**

---

**Preview_Code_TagFilter**

---

> **Note:** The code examples below must install dependencies before displaying and may take extra time to load

---

## Tag

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

The SDS `Tag` component is built on top of MUI's `Chip` component, though SDS is currently set up with distinct `Tag` and `TagFilter` components. The former is clickable but not deletable (whereas MUI's `Chip` can be either, both, or neither). Additionally, SDS's `Tag` component has a couple of props to help display SDS-specific visual properties:

- **`sdsStyle`\*\***:\*\* This prop allows you specify whether the `Tag` should be `rounded` (default) or `square`.
- **`sdsType`\*\***:\*\* This prop takes values of `primary` (default) or `secondary`.
- **`size`\*\***:\*\* This prop is not available to SDS's `Tag`; instead its size changes automatically based on whether it is accommodating an icon via the `icon` prop or not.

### MUI Documentation

Documentation for the underlying MUI component can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name       | Type          | Default      | Description                                               |
| ---------- | ------------- | ------------ | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- | ------------------- | ------------------------- | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hover`    | `bool`        | `-`          | If `true`, the component changes color when hovered over. |
| `label`    | `string`      | `-`          | The label of the Tag.                                     |
| `sdsType`  | `"primary"` ` | "secondary"` | `primary`                                                 | The `primary` variant has a `400` background color and white text color. The `secondary` variant has a `100` background color and `500` text color. |
| `sdsStyle` | `"square"` `  | "rounded"`   | `rounded`                                                 | The shape of the component.                                                                                                                         |
| `sdsSize`  | `"s"          | "l"`         | `"s"`                                                     | The size of the Tag component. The large-size tag must include an icon.                                                                             |
| `color`    | `             | "beta"` `    | "info"` `                                                 | "negative"` `                                                                                                                                       | "notice"` ` | "positive"` ` | [string, string]` ` | [string, string, string]` | `-` | You have the flexibility to define the color of the component in two ways: 1. Choose from the available theme colors, such as `primary`, `info`, and more. 2. Customize the colors using one of the following syntax options: |

    1. [`label and icon color`, `background color`]
    2. [`label color`, `background color`, `icon color`] |

| `icon` | `JSX.Element` | `-` | The icon that appears on the leading edge of the component. |

### Code examples

#### **Default Tag**

This example has the minimum props needed for the `Tag` component.

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
import { Tag } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Tag label="Science Design System" />
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

#### Tag + Icon

This example displays a rounded warning `Tag` component featuring an SDS icon positioned on the left side.

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
import { Icon, Tag } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Tag
        label="Virus"
        icon={<Icon sdsSize="l" sdsIcon="Virus" />}
        sdsStyle="rounded"
        color="negative"
        sdsSize="l"
      />
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

#### Tag with custom colors

This example shows a `Tag` component with customized colors applied to the label, background, and icon for a unique visual presentation.

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
import { Icon, Tag } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Tag
        label="Star"
        icon={<Icon sdsSize="l" sdsIcon="Star" />}
        color={["yellow", "#f23", "orange"]}
        sdsStyle="rounded"
        sdsSize="l"
      />
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

## TagFilter

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

SDS's `TagFilter` component is built on top of MUI's `Chip` component and serves one specific purpose: it is meant to be used in conjunction with `Filters`, and does not have any of the stylistic props available to it that MUI's `Chip` or SDS's `Tag` components have.

### MUI Documentation

Documentation for the underlying MUI component can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name       | Type     | Default | Description                                                                            |
| ---------- | -------- | ------- | -------------------------------------------------------------------------------------- |
| `label`    | `string` | `-`     | The content of the component.                                                          |
| `onDelete` | `func`   | `-`     | Callback fired when the delete icon is clicked. If set, the delete icon will be shown. |

### Code examples

#### Default TagFilter

This example has the minimum props needed for the `TagFilter` component.

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
import { TagFilter } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <TagFilter label="Science Design System" onDelete={() => {}} />
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
