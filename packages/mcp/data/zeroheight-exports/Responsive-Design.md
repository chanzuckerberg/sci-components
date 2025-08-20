# Responsive Design

Applications that are built responsively visually adapt to the screen size that they are viewed on for a better user experience

## Guidelines

## Overview

Designing and building applications responsively helps ensure a positive viewing experience for users regardless of which device they are accessing from. There are a number of adjustments that can be made to page elements to better display on various screen sizes ranging from implementing font sizes that are better suited for small-screen viewing to making smart adjustments to page layouts so only the most crucial elements are displayed as screen sizes shrink.

### Breakpoints

What we know about users of scientific software is that they tend to access their applications in one of three ways:

1. On small laptops with lower resolution
2. On large monitors that they plug their laptops into
3. Occasionally on their phones when learning about new apps at conferences or following links from marketing campaigns posted to social media sites

Insight into these use cases has resulted in SDS implementing three distinct breakpoints that roughly map to these device types for teams to consider when designing and building scientific software. At each size, layout changes should be made to better utilize the amount of screen real estate available to ensure the most important UI elements remain accessible to users.

#### Small

_Screens <512px wide_

Small breakpoint will be used when applications are viewed on mobile devices and small-screened tablets. At this breakpoint only the main content should be displayed as there is not enough screen real estate to fit non-primary elements.

Header Navigation has been designed to collapse into a hamburger menu on narrow screens. Other navigation elements like Panels, Jump-to-Navigation, as well as supplemental pieces of UI will likely need to be accessed via alternative methods. This could mean tucking them away within a Dropdown Menu or an Accordion, adding them as additional menu items within the hamburger menu, or hiding them altogether. For this reason, designers should take special care to consider how these non-primary elements will be used on narrow screens.

| CSS                   | SCSS                 | Tailwind             |
| --------------------- | -------------------- | -------------------- |
| `--sds-breakpoint-sm` | `$sds-breakpoint-sm` | `breakpoints.sds-sm` |

#### Medium

_Screens between 512px-1023px wide_

Medium breakpoint will be used when applications are viewed on small laptops and large-screened tablets. At this breakpoint there is enough space to show both main content as well as a few non-primary elements, though likely not all.

Depending on the number of nav items in the Header Navigation it will either collapse into a hamburger menu or remain fully visible. This breakpoint gives designers control over which UI elements are displayed and which need to be accessed via alternative methods, offering more flexibility around how users interact with the application. Designing for this breakpoint still requires specific consideration to determine which non-primary elements remain visible vs which must be accessed elsewhere in the UI.

| CSS                   | SCSS                 | Tailwind             |
| --------------------- | -------------------- | -------------------- |
| `--sds-breakpoint-md` | `$sds-breakpoint-md` | `breakpoints.sds-md` |

#### Large

_Screens >1024px wide_

Large breakpoint will be used when applications are viewed on large laptops, desktop monitors, and other large displays. At this breakpoint there is enough space to show all content as intended. Considerations should be made for viewing on ultra-wide displays, such as implementing a max-width on pages to ensure UI elements are not stretched out of proportion.

| CSS                   | SCSS                 | Tailwind             |
| --------------------- | -------------------- | -------------------- |
| `--sds-breakpoint-lg` | `$sds-breakpoint-lg` | `breakpoints.sds-lg` |

### Typography

SDS has two sets of typography, one for narrow screens and one for wide. Narrow screen typography is used when applications are viewed at the Small breakpoint (screen widths of less than 512px) and wide screen typography is used when applications are viewed at Medium or Large breakpoints (screen widths of 512px or greater).

Each typography variable from one set has a corresponding variable in the other, delineated by the word "narrow" or "wide" in its name (e.g., `narrow/fontBodyS`, `wide/fontBodyS`, etc.). This makes it easy to translate from one screen width to the other—simply use the variable with the same name but the opposite width (e.g., `narrow/fontBodyS` should be used for the same text on narrow screens that `wide/fontBodyS` is used for on wide screens).

Below are a few visual examples of the differences. See the Typography section for a detailed breakdown of the typography variables for each set.

| Header XXL – wide | Header XXL – narrow |
| :---------------- | :------------------ |

| Body L – wide | Body L – narrow |
| :------------ | :-------------- |

| Caps XXS – wide | Caps XXS – narrow |
| :-------------- | :---------------- |

| Tabular S – wide | Tabular S – narrow |
| :--------------- | :----------------- |

| Code S – wide | Code S – narrow |
| :------------ | :-------------- |

## Code

## Overview

Designing and building applications responsively helps ensure a positive viewing experience for users regardless of which device they are accessing from. There are a number of adjustments that can be made to page elements to better display on various screen sizes ranging from implementing font sizes that are better suited for small-screen viewing to making smart adjustments to page layouts so only the most crucial elements are displayed as screen sizes shrink.

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### SDS vs MUI

In SDS, we utilize MUI’s breakpoint system with custom values to better align with our design requirements. Notably, we’ve streamlined the breakpoint options by removing the `xs` and `xl` breakpoints, as they are not used in SDS. As a result, SDS only supports `sm`, `md`, and `lg` breakpoints, ensuring more focused and relevant responsive behavior.

### MUI Documentation

For more information on breakpoints, please refer to the MUI documentation.

### Code examples

#### **Accessing SDS breakpoints**

This example demonstrates how to access SCS breakpoints to adjust component styling dynamically based on different screen sizes.

> **Note:** Use the resize handle to the right of the preview section below to adjust the container width. The background color will change dynamically based on the window width and the styles assigned to each breakpoint.

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
import { useLayoutEffect, useState } from "react";
import { styled } from "@mui/material";
import { Callout, CalloutTitle } from "@czi-sds/components";
import "./styles.css";

const StyledDiv = styled("div")`
  ${(props) => {
    return `
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: yellow;
      
      ${props?.theme?.breakpoints.down("lg")} {
        background-color: skyblue;
      }
      
      ${props?.theme?.breakpoints.down("md")} {
        background-color: pink;
      }
      
      ${props?.theme?.breakpoints.down("sm")} {
        background-color: green;
      }
    `;
  }}
`;

function App() {
  const [width, setWidth] = useState(0);

  const handleWidth = () => {
    setWidth(window.innerWidth);
  };

  useLayoutEffect(() => {
    handleWidth();

    window.addEventListener("resize", () => handleWidth());

    return () => {
      window.removeEventListener("resize", () => handleWidth());
    };
  }, []);

  return <StyledDiv>Current width is: {width}</StyledDiv>;
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
    <title>Button</title>
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
