# Overview

The Science Design System (SDS) brings consistency and universal standards to CZI’s science products by offering a library of high quality, reusable components that deliver predictable, accessible and easy to learn experiences. Our goal is to democratize access to tools and technologies for scientists.

# Getting Started

## Installation

NPM Package

```
// with npm
npm i @czi-sds/components

// with yarn
yarn add @czi-sds/components
```

**Currently SDS uses Material UI v4**

@czi-sds/components installs without direct dependencies to prevent version errors. Please ensure the following peer dependencies are also installed:

```
  "@emotion/css"
  "@emotion/react"
  "@emotion/styled"
  "@mui/base"
  "@mui/icons-material"
  "@mui/lab"
  "@mui/material"
  "react"
  "react-dom"
```

To install the dependencies:

```
// with npm
npm i @czi-sds/components @emotion/css @emotion/react @emotion/styled @mui/base @mui/material @mui/icons-material @mui/lab react react-dom

// with yarn
yarn add @czi-sds/components @emotion/css @emotion/react @emotion/styled @mui/base @mui/material @mui/icons-material @mui/lab react react-dom
```

## Usage

`@czi-sds/components` comes with four main exports that help you build your app:

1. Components - Accessible and reusable components

```javascript
import React from "react";
import { Button } from "@czi-sds/components";
<Button onClick={actions.onClick} sdsStyle="rounded" sdsType="primary">
  {text}
</Button>;
```

2. Mixins - Grouped styles defined by the design system

```javascript
import { styled } from '@mui/material/styles';
import { Typography } from "@material-ui/core";
import { fontHeaderXL } from "@czi-sds/components";

export const Title - styled(Typography)`
  ${fontHeaderXl}

  // which compiles to:
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.3px;
  line-height: 30px;
`;
```

3. Selectors - Helper functions that return theme variables baased on passed props

```ts
import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { getColors, getCorners } from "@czi-sds/components";

export const Tag = styled("div")`
  // This is a callback function that returns more CSS rules, but the only way
  // to access the custom theme object
  ${(props) => {
    //  getColors() is a selector that picks out colors from the theme object
    const colors = getColors(props);
    // getSpaces() is a selector that picks out spaces from the theme object
    const spaces = getSpaces(props);

    return `
          background-color: ${colors?.gray[500]};
          padding-bottom: ${spaces?.m}px;
          margin-bottom: ${spaces?.xxl}px;
        `;
  }}
`;
```

4. CSS & SCSS Variables - Variables for the `defaultTheme` to use if your app doesn't support `@emotion/styled`

```scss
// with SCSS variables
@import "~@czi-sds/components/dist/variables";

.button-primary {
  background-color: $sds-color-primary-400;
  padding: $sds-spaces-xxs;
}

// with CSS variables
.button-primary {
  background-color: var(--sds-color-primary-400);
  padding: var(--sds-spaces-xxs);
}
```

### Default Theme

To use the default theme in your React application, complete the following:

1. Add the following HTML to your `index.html` at the `<head>` section:

```html
// installs the sds font from google fonts
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
```

2. Import the default theme object and use it in Material UI's `<ThemeProvier />`:

```javascript
import { defaultTheme } from "@czi-sds/components";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";

<StylesProvider injectFirst>
  <EmotionThemeProvider theme={defaultTheme}>
    <ThemeProvider theme={defaultTheme}>
      <YourApp />
    </ThemeProvider>
  </EmotionThemeProvider>
</StylesProvider>;
```

3.  If you need to override the default SDS theme, please follow the instructions [here](https://github.com/chanzuckerberg/sci-components/blob/main/docs/how-to-override-default-theme.md).

# Contributing to the SDS

If you would like to contribute to the Science Design System by building requested components, please follow the contribution guidelines [here](https://github.com/chanzuckerberg/sci-components/blob/main/docs/contribution.md).

To request a component, please reach out in the [#sci-design-system-support channel](https://czi-sci.slack.com/archives/C032S43KKFV).
