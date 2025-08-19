# Hero

Hero is located at the top of the page above all other content and features key information and visuals which can include images or videos, headlines, and calls-to-action including Buttons and Links.

## Guidelines

## Overview

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

The Hero component was designed to support a wide range of potential product needs, giving teams flexibility to implement content in their applications as desired. Teams can fill the background with their visual of choice (image, video, color, gradient, etc.), overlay any combination of elements (text, image, buttons, links, etc.) on top of their chosen background, as well as turn on a darkening mask to make text easier to read and / or a darkening vignette positioned at the top of the container to make the transition from Header Navigation to Hero visually smooth.

Hero has been built to ensure any overlay elements (text, images, videos, etc.) are constrained to a content area that is centered on the page; this is especially necessary when viewed on wide screens. Overlay elements can be freely arranged within this content area. The `max-width` of this area and its left and right padding are dictated by Breakpoint. When displayed at Small and Medium Breakpoints, the `max-width` of the content area is `100%` of the screen width with left and right padding of `24px` on Small Breakpoints and `40px` on Medium Breakpoints.

When displayed at Large Breakpoints, the content area has a `max-width` of `1024px` and left and right padding of `120px`. This means that the width of the content area will be dictated by the width of the screen minus the left and right padding of `120px` up until that value is greater than `1024px`. Once the width of the screen goes beyond that value, the viewable area will be set at `1024px`.

For example: if the screen is `1200px` wide, the width of the content area would be `960px` (`1200px-120px-120px = 960px`). If, however, the screen is `1500px` wide, the width of the content area would max out and be `1024px` (`1500px-120px-120px = 1260px`) since `1260px` is larger than `1024px`, and thus a `width` of `1024px` would be used for the content area. This ensures that, even when viewed on extra wide displays, the overlay content will always be viewable by users.

| Breakpoint: Large | Breakpoint: Medium | Breakpoint: Small |
| --- | --- | --- |

#### Background Fill Options

The Hero component background can be filled with any CSS color, including gradients, or any type of media such as images, videos, GIFs, etc.

| Color | Media |
| --- | --- |

#### Darkening Mask

The darkening mask is an overlay element used to subtly dim the Hero's background, thereby enhancing the visibility and focus on the overlay elements; the mask's opacity can be set by the team implementing it.

| Disabled | Enabled |
| --- | --- |

#### Darkening Vignette

The darkening vignette is an overlay element positioned at the top of Hero that subtly fades from solid to transparent, smoothing the transition from the Header Navigation to the Hero background.

| Disabled | Enabled |
| --- | --- |

#### Overlay Content Visibility

Overlay content elements (title text, caption text, and content slot) can be used or not depending on teams' needs; the examples below show one element hidden at a time to demonstrate, but any combination of elements can be used.

| All elements displayed | Title hidden | Caption hidden | Content slot hidden |
| --- | --- | --- | --- |

#### Text Alignment Options

Alignment settings apply to both title and caption text.

| Left-aligned | Center-aligned | Right-aligned |
| --- | --- | --- |

#### Overlay Content Position

| Top-left | Top | Top-right |
| --- | --- | --- |

| Left | Center | Right |
| --- | --- | --- |

| Bottom-left | Bottom | Bottom-right |
| --- | --- | --- |

#### Overlay Media Options

In addition to overlay content, media (images, videos, GIFs, etc.) can be optionally overlayed on top of the Hero component's background; it can take whatever size or shape teams need.

| Overlay media hidden | Overlay media displayed | Larger overlay media | Smaller overlay media |
| --- | --- | --- | --- |

#### Overlay Media Position

| Top-left | Top | Top-right |
| --- | --- | --- |

| Left | Center | Right |
| --- | --- | --- |

| Bottom-left | Bottom | Bottom-right |
| --- | --- | --- |

## Code

>**Note:** Code details coming soon

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

## Hero

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

[update this section]

### MUI Documentation

Documentation for the underlying MUI `[update]` component can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |

### Code examples

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

