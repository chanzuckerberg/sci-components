---
title: "Navigation"
id: 7353045
uid: "5552ba"
slug: "5552ba-navigation"
url: "https://sds.czi.design/009eaf17b/v/latest/p/5552ba-navigation"
hidden: false
locked: false
created_at: "2025-07-07T20:30:52.424Z"
updated_at: "2025-07-07T20:30:52.927Z"
status_id: "not_applicable"
status_name: "SDS"
---

# Navigation

Navigation components enable users to move around an application, either between pages or within the same page, and help facilitate users' abilities to find relevant content and tools.

## Guidelines

## Navigation Components

| Header and Footer Navigation provide the primary means for users to move between the top-level pages of an application as well as access important sections and links to relevant external content; they always sit at the top and bottom of the page respectively.  Jump-to Navigation enables users to move between main sections on a single page, making it easy for users to traverse large amounts of content. |   | **Jump to component:** [Header Navigation](https://sds.czi.design/009eaf17b/v/0/p/5552ba-navigation/t/eb02cec74f) [Footer Navigation](https://sds.czi.design/009eaf17b/v/0/p/5552ba-navigation/t/91dfb4f43f) [Jump-to Navigation](https://sds.czi.design/009eaf17b/v/0/p/5552ba-navigation/t/page-5552ba-73429108-5719df-0)  |
| --- | --- | --- |

### Visual Preview

---

## Header Navigation

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=components-navigationheader-beta--default)

---

### Header Navigation Anatomy

Header Navigation contains the following elements:

* Logo – when clicked, brings users back to the main landing page of the application
* Primary navigation group – contains navigation items that serve as the way users move between the main pages of the application
* Secondary navigation group – contains navigation items that are used to link out to relevant external sites, help or FAQ pages, tutorials, additional resources, etc.
    * Optionally, secondary navigation items can display sub-navigation items when additional navigation options within the same category are needed
* [Buttons](https://sds.czi.design/009eaf17b/p/47778c) – can be used for application-level tasks, account login and management, etc.
* [Search Input](https://sds.czi.design/009eaf17b/v/0/p/1596f8-field-inputs/t/page-1596f8-79141518-5456ee-6) – searches across the entire application

All elements besides the logo section are optional and their usage should be determined by the application's information architecture.

Header Navigation can optionally be displayed using an inverted color scheme for better contrast or for stylistic reasons.

#### Wide

#### Narrow

---

### Header Navigation Types

Once implemented into an application, the Header Navigation type displayed will be automatically determined by the user's viewport width; the point at which one type is displayed over the other can be manually adjusted in code.

---

### Header Navigation – Wide

Use Wide when pages are being displayed at a **Large** or **Medium** breakpoint (though in some cases [Header Navigation – Narrow](https://sds.czi.design/009eaf17b/v/0/p/5552ba-navigation/t/b5bef8c71f) may be preferable for Medium breakpoints; see [Responsive Design](https://sds.czi.design/009eaf17b/p/071935) for more information).

The arrangement of the primary navigation group and the [Search Input](https://sds.czi.design/009eaf17b/v/0/p/1596f8-field-inputs/t/page-1596f8-79141518-5456ee-6) can be flipped depending on the application's navigation needs.

| Default | Default (inverted) |
| --- | --- |

#### Primary Navigation Items

| Default | Default (expandable) | Hover | Hover (expandable) | Selected | Open (expandable) |
| --- | --- | --- | --- | --- | --- |

#### Secondary Navigation Items

| Default | Default (expandable) | Hover | Hover (expandable) | Pressed | Open (expandable) |
| --- | --- | --- | --- | --- | --- |

---

### Header Navigation – Narrow

Use Narrow when pages are being displayed at a **Small** breakpoint (though in some cases a Header Navigation – Narrow may be preferable for Medium breakpoints; see [Responsive Design](https://sds.czi.design/009eaf17b/p/071935) for more information).

| Default (closed) | Default (closed; inverted) | Default (open) | Default (open; inverted) |
| --- | --- | --- | --- |

#### Primary Navigation Items

| Default | Default (collapsed) | Default (expanded) | Hover | Hover (collapsed) | Hover (expanded) | Active |
| --- | --- | --- | --- | --- | --- | --- |

#### Primary Sub-navigation Items

| Default | Hover |
| --- | --- |

#### Secondary Navigation Items

| Default | Default (collapsed) | Default (expanded) | Hover | Hover (collapsed) | Hover (expanded) |
| --- | --- | --- | --- | --- | --- |

#### Secondary Sub-navigation Items

| Default | Hover |
| --- | --- |

---

## Footer Navigation

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=components-navigationfooter-beta--default)

---

### Footer Navigation Anatomy

Footer Navigation contains the following elements:

* Primary logo – when clicked, brings users back to the main landing page of the application
* Secondary logo group – for logos of partner institutions or other entities
* Navigation group – contains navigation items that serve as the way users move between the pages of the application
    * It is recommended, though not required, that the Navigation Items in Navigation Footer match the Navigation Items found in the [Primary Navigation](https://sds.czi.design/009eaf17b/v/0/p/5552ba-navigation/t/4ff89810eb) group in Navigation Header, making for unified navigation across the application
* Link group – contains links to tertiary pages like Terms of Service, Privacy Policies, etc.

All elements besides the logo section are optional and their usage should be determined by the application's information architecture.

Header Navigation can optionally be displayed using an inverted color scheme for better contrast or for stylistic reasons.

#### Wide

#### Narrow

---

### Footer Navigation Types

Once implemented into an application, the Footer Navigation type displayed will be automatically determined by the user's viewport width; the point at which one type is displayed over the other can be manually adjusted in code.

---

### Footer Navigation – Wide

Use Wide when pages are being displayed at a **Large** or **Medium** breakpoint (though in some cases [Footer Navigation – Narrow](https://sds.czi.design/009eaf17b/v/0/p/5552ba-navigation/t/418ccc5feb) may be preferable for Medium breakpoints; see [Responsive Design](https://sds.czi.design/009eaf17b/p/071935) for more information).

| Default | Default (inverted) |
| --- | --- |

#### Navigation Items

| Default | Hover | Pressed |
| --- | --- | --- |

#### Link Items

| Default | Hover | Pressed |
| --- | --- | --- |

---

### Footer Navigation – Narrow

Use Narrow when pages are being displayed at a **Small** breakpoint  (though in some cases a Footer Navigation – Narrow may be preferable for Medium breakpoints; see [Responsive Design](https://sds.czi.design/009eaf17b/p/071935) for more information).

| Default | Default (inverted) |
| --- | --- |

#### Navigation Items

| Default | Hover | Pressed |
| --- | --- | --- |

#### Link Items

| Default | Hover | Pressed |
| --- | --- | --- |

---

## Jump-to Navigation

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=navigationjumpto--default)

---

### Overview

The Jump-to Navigation component can contain as many Nav Items as necessary though must have a minimum of two. Each Nav Item is tied to a a section of the page and functions as a jump link to that page section. It is positioned on the right side of the page, anchored to the top of the page’s first paragraph and remains sticky on the page as the user scrolls; once the user scrolls into a new section, the active indicator on that section is highlighted until the user scrolls beyond it and into the next (or previous) at which point the indictor moves again. When the user clicks on any of the Nav Items, the page will smooth scroll to that section of the page.

| Default / Active | Hover |
| --- | --- |

---

### Jump-to Navigation Spacing

These rules establish how much margin should exist between and around elements.

## Code

## Navigation Components

| Header and Footer Navigation provide the primary means for users to move between the top-level pages of an application as well as access important sections and links to relevant external content; they always sit at the top and bottom of the page respectively.  Jump-to Navigation enables users to move between main sections on a single page, making it easy for users to traverse large amounts of content. |   | **Jump to component:** [NavigationHeader](https://sds.czi.design/009eaf17b/v/0/p/5552ba-navigation/t/d51ba487ea) [NavigationFooter](https://sds.czi.design/009eaf17b/v/0/p/5552ba-navigation/t/97587ea5ec) [NavigationJumpTo](https://sds.czi.design/009eaf17b/v/0/p/5552ba-navigation/t/page-5552ba-76781485-32b19d-0) |
| --- | --- | --- |

### Visual Preview

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

---

## NavigationHeader

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/NavigationHeader).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `activePrimaryNavKey` | `string` | - | The key of the currently active primary navigation item. |
| `setActivePrimaryNavKey` | `(key: string) => void` | - | Callback function to set the active primary navigation key. |
| `buttons` | `ButtonProps[]` | - | An array of buttons displayed in the header. |
| `hasInvertedStyle` | `boolean` | `false` | When set to `true`, applies an inverted color scheme to the header component. |
| `logo` | `ReactNode` | - | The logo displayed in the header. Can be an image, icon, svg or any ReactNode. |
| `logoUrl` | `string` | - | URL for the logo link. If provided, clicking the logo navigates to this URL. |
| `logoLinkComponent` | `ElementType` | `a` | Specifies the component to use for the logo link. |
| `logoLinkProps` | `[LinkProps](https://mui.com/material-ui/api/link/)` | - | Props to pass to the logo link component. |
| `primaryNavItems` | `NavigationHeaderPrimaryNavItem<T>[]` | - | List of items for the primary navigation section. |
| `primaryNavPosition` | `"left"` |`"right"` | `"left"` | Position of the primaryNavItems list. If set to `"left"`, the items appear to the left of the search bar. If set to `"right"`, they are positioned next to the secondaryNavItems on the right. |
| `position` | `string` |  `"sticky"`  | Specifies the CSS position value for the NavigationHeader. Accepts any valid CSS position value (e.g., "relative", "absolute", "fixed"). By default, it uses "sticky" to keep the header fixed at the top of the page while scrolling. |
| `showSearch` | `boolean` | `true` | Whether to display the search input in the header. |
| `searchProps` | `Partial<InputSearchProps>` | - | Props passed to the search input component. |
| `secondaryNavItems` | `NavigationHeaderSecondaryNavItem[]` | - | List of items for the secondary navigation section. |
| `scrollElevation` | `boolean` | `true` | Controls whether a shadow is shown under the Nav when scrolling. |
| `tag` | `string` | - | A small label displayed next to the title. |
| `tagColor` | `| "info"` `| "positive"` `| "notice"` `| "negative"` `| "neutral"` `| "beta"` `| [string, string]` `| [string, string, string]` | `neutral` | The color of the tag label. |
| `title` | `string` | - | The main title displayed in the header. |

>**Important Note!**
>
>The NavigationHeader component automatically switches to a mobile-friendly version when there isn’t enough space to display the full header.

### Code examples

The example below shows a NavigationHeader component with all the possible sections available.

>**Note:** Due to a bug in Zeroheight we are unable to publish code examples at this time; we will update this section once a fix is released.

---

## NavigationFooter

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/NavigationFooter).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `hasInvertedStyle` | `boolean` | `false` | If true, applies an inverted (dark-on-light) color scheme to the footer. |
| `images` | `FooterImage[]` | `-` | An array of images displayed in the footer. Each item includes an image, optional link URL, and component. |
| `logo` | `ReactNode` | `-` | The logo displayed in the footer. Can be any valid React node such as an image, icon, or SVG. |
| `logoUrl` | `string` | `-` | If provided, clicking the logo will navigate to this URL. |
| `logoComponent` | `ElementType` | `"a"` | Specifies the component to use for the logo link. Defaults to an anchor tag. |
| `logoLinkProps` | `Record<string, unknown>` | `-` | Additional props passed to the logo link component. |
| `navItems` | `NavigationFooterNavItem[]` | `-` | List of navigation items displayed next to the logo. |
| `navLinks` | `NavigationFooterNavItem[]` | `-` | List of secondary links shown at the bottom section of the footer.  |
| `tag` | `string` | `-` | A small label displayed next to the title. |
| `tagColor` | `TagProps["tagColor"]` | `"neutral"` | The color of the tag. Accepts predefined tag color values from the Tag component.  |
| `title` | `string` | `-` | The main title displayed in the footer. |

### FooterImage

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `image` | `ReactNode` | `-` | The image element to be displayed. Can be an icon, image, SVG, or any ReactNode.  |
| `url` | `string` | `-` | Optional URL to navigate to when the image is clicked.  |
| `component` | `ElementType` | `"a"` | Custom link component to use for navigation (e.g., a router link).  |
| `linkProps` | `Record<string, unknown>` | `-` | Additional props passed to the link component. |

### NavigationFooterNavItem

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `-` | The text label displayed for the navigation item.  |
| `url` | `string` | `-` | Optional URL the item links to.  |
| `component` | `ElementType` | `"a"` | Custom component to render the link (e.g., Next.js Link).  |
| `linkProps` | `Record<string, unknown>` | `-` | Props forwarded to the link component. |

### Code examples

>**Note:** Due to a bug in Zeroheight we are unable to publish code examples at this time; we will update this section once a fix is released.

---

## NavigationJumpTo

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/NavigationJumpTo/index.tsx).

### SDS vs MUI

SDS's `NavigationJumpTo` uses [MUI's ](https://mui.com/material-ui/react-tabs/)`[Tab](https://mui.com/material-ui/react-tabs/)`[  component](https://mui.com/material-ui/react-tabs/) under the hood. `NavigationJumpTo` acts as an indicator of where a user is on a page as well as allowing them to navigate to different page sections. It differs from MUI's `Tab` component in a few main ways:

**`orientation`****:** SDS's `NavigationJumpTo` design only supports `orientation="vertical"`, which is baked into its code by default, whereas the default `orientation` value for MUI's `Tab`  component is `horizontal`.  Setting `orientation="horizontal"` on `NaviagationJumpTo`  is not recommended.

**`textColor`****:** Changing the text color of a tab within `NavigationJumpTo` is not currently supported. However, you can still change the `indicatorColor`;  it will take any of the SDS colors (`beta`, `error`, `gray`, `info`, `primary`, `success`, `warning`).

**`icon`****:** `NavigationJumpTo` does not support the inclusion of icons.

**`offsetTop`****:** This prop is exclusive to `NavigationJumpTo` and takes a number between 0 to 100. It means that a section indicator will turn on when the top of that section is the specified number of pixels below the top of the window. This is used to adjust when the section indicator moves to a different section based on the preference of a team. 

### MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-tabs/).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `Array<{`     `title: string;`     `elementRef: React.MutableRefObject<HTMLElement | null>;`   `}>;` | `-` | An array of items to be displayed in the NavigationJumpTo component. |
| `offsetTop` | `number` | `-` | The top offset for scrolling, measured in pixels comes before the target element during scrolling. |
| `onChange` | `(`   `value: number,`   `event?: React.SyntheticEvent,`   `type?: "click" | "scroll"``) => void;` | `-` | Defines the action to be taken when the value changes. |

### Code examples

#### Default Navigation Menu

This example shows the default props needed to render `NavigationJumpTo`.

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
import { NavigationJumpTo } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <NavigationJumpTo items={[
        { elementRef: { current: null }, title: "Item 1" },
        { elementRef: { current: null }, title: "Item 2" },
        { elementRef: { current: null }, title: "Item 3" },
        { elementRef: { current: null }, title: "Item 4" },
        { elementRef: { current: null }, title: "Item 5" },
      ]} />
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
    <title>Navigation Jump To</title>
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

#### Full NavigationJumpTo demo with corresponding sections

This comprehensive example demonstrates the functionality of `NavigationJumpTo` within a dynamic web page layout. The example features a series of sections with varying heights, creating a scrolling effect. Users can easily navigate between these sections using the `NavigationJumpTo` component.

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
import { forwardRef, useState, useRef } from "react";
import { InputSlider, NavigationJumpTo, getSemanticColors } from "@czi-sds/components";
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import "./styles.css";

interface TabPanelPropsExtra extends TabPanelProps {
  sdsDemoHeight: number;
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelPropsExtra>(
  (props, ref) => {
    const { children, sdsDemoHeight, ...other } = props;
    const theme = useTheme();
    const semanticColors = getSemanticColors({theme});
    
    return (
      <div
        ref={ref}
        role="tabpanel"
        style={{
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          color: "black",
          display: "flex",
          fontFamily: "Open Sans, sans-serif",
          fontSize: "36px",
          fontWeight: 100,
          justifyContent: "center",
          margin: "0px 22px 22px 6px",
          minHeight: `${sdsDemoHeight}vh`,
          textAlign: "center",
        }}
        {...other}
      >
        <Box sx={{ p: 3 }}>
          {children}
          <p style={{ fontSize: 14, margin: "5px 0 0 0" }}>
            height: {sdsDemoHeight} vh
          </p>
        </Box>
      </div>
    );
  }
);

function App() {
 const [navPanelHeight, setNavPanelHeight] = useState(100);
  const sectionRef0 = useRef(null);
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const sectionRef3 = useRef(null);
  const sectionRef4 = useRef(null);

  return (
    <div className="app">
      <Box
        sx={{
          fontFamily: "Open Sans, sans-serif",
          margin: "0 0 30px 6px",
          width: 250,
        }}
      >
        <p id="nav-item-height-slider" style={{ marginBottom: "5px" }}>
          Section panel height:
        </p>
        <InputSlider
          aria-labelledby="nav-item-height-slider"
          min={20}
          max={120}
          step={1}
          onChange={(_, value) => {
            setNavPanelHeight(value as number);
          }}
          defaultValue={100}
          marks={[
            { label: "20", value: 20 },
            { label: "40", value: 40 },
            { label: "60", value: 60 },
            { label: "80", value: 80 },
            { label: "100", value: 100 },
            { label: "120", value: 120 },
          ]}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          position: "relative",
          width: "100%",
        }}
      >
        <Box sx={{ width: 150 }}>
          <NavigationJumpTo
            items={[
              { elementRef: sectionRef0, title: "Section 1" },
              { elementRef: sectionRef1, title: "Section 2" },
              { elementRef: sectionRef2, title: "Section 3" },
              { elementRef: sectionRef3, title: "Section 4" },
              { elementRef: sectionRef4, title: "Section 5" },
            ]}
          />
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          <TabPanel
            id="navigation-panel-1"
            ref={sectionRef0}
            sdsDemoHeight={navPanelHeight}
          >
            Section #1
          </TabPanel>
          <TabPanel
            id="navigation-panel-2"
            ref={sectionRef1}
            sdsDemoHeight={navPanelHeight}
          >
            Section #2
          </TabPanel>
          <TabPanel
            id="navigation-panel-3"
            ref={sectionRef2}
            sdsDemoHeight={navPanelHeight}
          >
            Section #3
          </TabPanel>
          <TabPanel
            id="navigation-panel-4"
            ref={sectionRef3}
            sdsDemoHeight={navPanelHeight}
          >
            Section #4
          </TabPanel>
          <TabPanel
            id="navigation-panel-5"
            ref={sectionRef4}
            sdsDemoHeight={navPanelHeight}
          >
            Section #5
          </TabPanel>
        </Box>
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
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Navigation Jump To</title>
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

