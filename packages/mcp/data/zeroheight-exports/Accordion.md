# Accordions

To help control the amount of information presented to the user, Accordions are expandable/collapsable elements that hide and reveal content.

## Overview

|     | In Figma |     |     | Meets Accessibility |     |     | In napari hub + .org Codebases |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------------------------------ |

Accordions are elements that can be used by designers to hide or reveal content. Use the header text to communicate what type of content the user can expect to see when the Accordion is expanded.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.



**Accordion**

---

---

**Accordion**

---

---

### Accordion Spacing

These rules establish how much margin should exist between and around elements.

**Accordion spacing**

---

## Code

## Accordion Component

| Below you will find an interactive Storybook iframe for Accordions. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** Accordion |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | -------------------------------- |

---

> This component appears as it is in the default SDS codebase. Once imported into the napari hub or napari.org codebases, use a theme file to enable the napari visual appearance customization.

### Accordion

Storybook

---

To help control the amount of information presented to the user, Accordions are expandable/collapsable elements that hide and reveal content.

## Overview

|     | In Figma |     |     | Meets Accessibility |     |     | In CZ ID Codebase |
| --- | -------- | --- | --- | ------------------- | --- | --- | ----------------- |

Accordions are elements that can be used by designers to hide or reveal content. Use the header text to communicate what type of content the user can expect to see when the Accordion is expanded. They can optionally include a bottom-positioned divider line to help visually separate an Accordion from the one below it.

Once expanded, the content revealed within the Accordion can be whatever the designer desires, whether basic text or another component or element.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

**Accordion**

---

---

**Accordion**

---

---

**Accordion**

---

---

### Accordion Spacing

These rules establish how much margin should exist between and around elements.

**Accordion spacing**

---

## Code

## Accordion Component

| Below you will find an interactive Storybook iframe for Accordions. Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |     | **Jump to component:** Accordion |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | -------------------------------- |

---

### Accordion

Storybook



---

Accordions are expandable/collapsable elements that hide and reveal content to help control the amount of information presented to the user at one time.

## Guidelines

## Overview

|     | In Figma |     |     | Meets Accessibility |     |     | In Code |
| --- | -------- | --- | --- | ------------------- | --- | --- | ------- |

### Accordion Variants

Accordions are elements that can be used to hide or reveal content. Use the header text to communicate what type of content the user can expect to see when the Accordion is expanded. Accordions can contain anything from — basic text to others components or elements.

The Accordion indicator arrow may appear to the left or the right of the header. Accordions may show a subtitle below the header text. Accordions may show bottom divider lines to help visually separate them from one another.

**Preview_Guidelines_Accordion_toggleLeft**

---

**Preview_Guidelines_Accordion_toggleRight**

---

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

Default

---

### Accordion – Left Toggle

Left-aligned toggles works well when the Accordion's container is wide, because a right-aligned toggle would be far from the header text and it is less obvious that the two elements are related.

| Default | Default + Divider | Default + Subtitle | Expanded |
| ------- | ----------------- | ------------------ | -------- |

**toggleLeft_collapsed_no subtitle_no underline**

---

**toggleLeft_collapsed_no subtitle_underlined**

---

**toggleLeft_collapsed_subtitle_no underline**

---

**toggleLeft_expanded_no subtitle_no underline**

---

---

### Accordion – Right Toggle

Use when there's a preference for the Accordion toggle to appear to the right of its header text. The toggle icon right aligns to the right edge of the Accordion's container.

| Default | Default + Divider | Default + Subtitle | Expanded |
| ------- | ----------------- | ------------------ | -------- |

**toggleRight_collapsed_no subtitle_no underline_n**

---

**toggleRight_collapsed_no subtitle_underlined_n**

---

**toggleRight_collapsed_subtitle_no underline**

---

**toggleRight_expanded_no subtitle_no underline**

---

---

### Accordion Spacing

These rules establish how much margin should exist between and around elements.

**Accordion spacing**

---

## Code

> **Note:** The code examples below must install dependencies before displaying and may take extra time to load

## Accordion

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

The SDS `Accordion` component introduces a couple new props that aren't part of the MUI version, that make it easier to implement options that may be needed in CZI products:

- **`useDivider`\*\***:\*\* this boolean prop adds a horizontal line below the accordion, which can help to visually separate it from other accordions if they are stacked
- **`togglePosition`\*\***:\*\* takes `right` (default) or `left` as values, and specifies where the baked-in Chevron icon that acts as a visual toggle sits

Additionally, there are a couple of MUI props that are not currently supported by the SDS `Accordion` component:

- **`defaultExpanded`\*\***:\*\* this boolean prop has no effect when used
- **`expanded`\*\***:\*\* this boolean prop is not recommended to be used with the SDS `Accordion` component, because it forces the accordion to remain open even when the user clicks it as though to close it
- **`disableGutters`\*\***:\*\* this boolean prop is not needed with the SDS accordion design, and has no effect

### MUI Documentation

Documentation for the underlying MUI component can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name             | Type        | Default | Description                                                                                                                  |
| ---------------- | ----------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `id`             | `string`    | `-`     | A unique id for each accordion item.                                                                                         |
| `disabled`       | `bool`      | `false` | The `disabled` prop, when set to true, prevents user interaction with the Accordion component, keeping it in a static state. |
| `togglePosition` | `"right"` ` | "left"` | `right`                                                                                                                      | Position of the toggle chevron icon. |
| `subtitle`       | `string`    | `-`     | A text that will be displayed as a subtitle beneath the accordion title.                                                     |
| `useDivider`     | `bool`      | `false` | Display a divider line between accordion items.                                                                              |

There are more props that can be used with the `InputDropdown` component, via those available to MUI's `Accordion` component.

### Code examples

#### Default Accordion

This example has the minimum props needed for the `Accordion` component.

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
// Most minimal Accordion (just has the basic requirements)

import {
  Accordion,
  AccordionHeader,
  AccordionDetails,
} from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Accordion id="accordion-1" useDivider={false} togglePosition="right">
        <AccordionHeader>Accordion Header</AccordionHeader>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
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

#### Accordion with subtitles

This example show a group of `Accordions`, each with its own subtitle and dividing line.

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
// Most minimal InputDropdown (just has the basic requirements)

import {
  Accordion,
  AccordionHeader,
  AccordionDetails,
} from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Accordion id="accordion-1" useDivider={true} togglePosition="right">
        <AccordionHeader subtitle="Explore the functionalities of our amazing product">
          Product Features
        </AccordionHeader>
        <AccordionDetails>
          Unveil the multitude of features that make our product stand out. From
          seamless integration with your existing workflow to advanced
          customization options, each feature has been meticulously crafted to
          empower you. Navigate through this section to discover how our product
          can revolutionize the way you work.
        </AccordionDetails>
      </Accordion>
      <Accordion id="accordion-2" useDivider={true} togglePosition="right">
        <AccordionHeader
          id={`accordion-2-header`}
          subtitle="Answers to commonly asked questions about our service"
        >
          FAQ Section
        </AccordionHeader>
        <AccordionDetails>
          Delve into a comprehensive compilation of frequently asked questions
          and their detailed answers. This section is your go-to resource for
          clarifying any doubts you might have about our service. Whether it's
          about pricing, compatibility, or functionality, we've got you covered
          with clear and concise explanations, ensuring a smooth and informed
          experience.
        </AccordionDetails>
      </Accordion>

      <Accordion id="accordion-3" useDivider={false} togglePosition="right">
        <AccordionHeader
          id={`accordion-3-header`}
          subtitle="Enhance your skills with our collection of educational materials"
        >
          Learning Resources
        </AccordionHeader>
        <AccordionDetails>
          Embark on a journey of continuous improvement with our treasure trove
          of learning materials. This section hosts an array of tutorials,
          guides, and insightful articles designed to enhance your skills and
          deepen your understanding. Whether you're a beginner or an expert,
          these resources offer valuable insights to help you grow and excel in
          your endeavors.
        </AccordionDetails>
      </Accordion>
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

#### Accordion with disabled item

This example shows a group of multiple `Accordions`, one of which is disabled and cannot be opened.

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
// Most minimal InputDropdown (just has the basic requirements)

import {
  Accordion,
  AccordionHeader,
  AccordionDetails,
} from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Accordion id="accordion-1" useDivider={true} togglePosition="right">
        <AccordionHeader subtitle="Explore the functionalities of our amazing product">
          Product Features
        </AccordionHeader>
        <AccordionDetails>
          Unveil the multitude of features that make our product stand out. From
          seamless integration with your existing workflow to advanced
          customization options, each feature has been meticulously crafted to
          empower you. Navigate through this section to discover how our product
          can revolutionize the way you work.
        </AccordionDetails>
      </Accordion>
      <Accordion
        disabled={true}
        id="accordion-2"
        useDivider={true}
        togglePosition="right"
      >
        <AccordionHeader
          id={`accordion-2-header`}
          subtitle="Answers to commonly asked questions about our service"
        >
          FAQ Section
        </AccordionHeader>
        <AccordionDetails>
          Delve into a comprehensive compilation of frequently asked questions
          and their detailed answers. This section is your go-to resource for
          clarifying any doubts you might have about our service. Whether it's
          about pricing, compatibility, or functionality, we've got you covered
          with clear and concise explanations, ensuring a smooth and informed
          experience.
        </AccordionDetails>
      </Accordion>

      <Accordion id="accordion-3" useDivider={false} togglePosition="right">
        <AccordionHeader
          id={`accordion-3-header`}
          subtitle="Enhance your skills with our collection of educational materials"
        >
          Learning Resources
        </AccordionHeader>
        <AccordionDetails>
          Embark on a journey of continuous improvement with our treasure trove
          of learning materials. This section hosts an array of tutorials,
          guides, and insightful articles designed to enhance your skills and
          deepen your understanding. Whether you're a beginner or an expert,
          these resources offer valuable insights to help you grow and excel in
          your endeavors.
        </AccordionDetails>
      </Accordion>
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
