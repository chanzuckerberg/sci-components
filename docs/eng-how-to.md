# Overview

The Science Design System (SDS) brings consistency and universal standards to CZI’s science products by offering a library of high quality, reusable components that deliver predictable, accessible and easy to learn experiences. Our goal is to democratize access to tools and technologies for scientists.

# Getting Started

## Installation

NPM Package

```
// with npm
npm i czifui

// with yarn
yarn add czifui
```

**Currently SDS uses Material UI v4**

czifui installs without direct dependencies to prevent version errors. Please ensure the following peer dependencies are also installed:

```
  "@emotion/css"
  "@emotion/react"
  "@emotion/styled"
  "@material-ui/core"
  "@material-ui/icons"
  "@material-ui/lab"
  "react"
  "react-dom"
```

To install the dependencies:

```
// with npm
npm i @emotion/css @emotion/react @emotion/styled @material-ui/core @material-ui/icons @material-ui/lab react react-dom

// with yarn
yarn add @emotion/css @emotion/react @emotion/styled @material-ui/core @material-ui/icons @material-ui/lab react react-dom
```

## Usage

`czifui` comes with four main exports that help you build your app:

1. Components - Accessible and reusable components

```javascript
import React from "react";
import { Button } from "czifui";
<Button onClick={actions.onClick} sdsStyle="rounded" sdsType="primary">
  {text}
</Button>;
```

2. Mixins - Grouped styles defined by the design system

```javascript
import { styled } from '@mui/material/styles';
import { Typography } from "@material-ui/core";
import { fontHeaderXL } from "czifui";

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
import { styled } from '@mui/material/styles';
import { getColors, getCorners } from "czifui";

export const Tag = styled("div")`
  // This is a callback function that returns more CSS rules, but the only way
  // to access the custom theme object
      ${(props) => {
        //  getColors() is a selector that picks out colors from the theme object
        const colors = getColors(props);
        // getSpaces() is a selector that picks out spacings from the theme object
        const spacings = getSpaces(props);

        return `
          background-color: ${colors?.gray[500]};
          padding-bottom: ${spacings?.m}px;
          margin-bottom: ${spacings?.xxl}px;
        `;
      }}
`;
```

4. CSS & SCSS Variables - Variables for the `defaultTheme` to use if your app doesn't support `@emotion/styled`

```scss
// with SCSS variables
@import "~czifui/dist/variables";

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
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400;1,600;1,700&display=swap"
  rel="stylesheet"
/>
```

2. Import the default theme object and use it in Material UI's `<ThemeProvier />`:

```javascript
import { defaultTheme } from "czifui";
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
