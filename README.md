# Purpose

The Science Design System (SDS) brings consistency and universal standards to CZI’s science products by offering a library of high quality, reusable components that deliver predictable, accessible and easy to learn experiences. Our goal is to democratize access to tools and technologies for scientists.

## Design System Documentation

`czifui` implements the Science Design System as documented in [Zeroheight](https://sds.czi.design/). As a result, it's very useful to get familiar with the available **theme variables**, such as `colors`, `spacings`, `typography`, etc., so you can leverage the theme properly in your application.

![Science Design System Zeroheight Homepage Snapshot](https://user-images.githubusercontent.com/6309723/155802483-366008aa-7380-4a01-b356-ae0ab02f4f3b.png)

## Installation

[NPM Package](https://www.npmjs.com/package/czifui)

**Currently SDS uses Material UI v5**

NOTE: Since most of the czifui components are built on top of Material UI's equivalent, it's also super useful to use their [API documentation](https://mui.com/) to learn about what you can do with the components. Many czifui components are style wrappers that pass props through to the MUI component without modifying them.

`czifui` installs without direct dependencies to prevent version errors. Please ensure the following peer dependencies are also installed:

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

To install czifui and the dependencies:

```
// with npm
npm i czifui @emotion/css @emotion/react @emotion/styled @mui/base @mui/material @mui/icons-material @mui/lab react react-dom

// with yarn
yarn add czifui @emotion/css @emotion/react @emotion/styled @mui/base @mui/material @mui/icons-material @mui/lab react react-dom
```

## Usage

`czifui` comes with five main exports that help you build your app:

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
import { Typography } from "@mui/material";
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
        // getColors() is a selector that picks out colors from the theme object
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

5. Tailwind - Tailwind compliant configuration for the `defaultTheme` to use if your app uses Tailwind

First you need to import the SDS config into your application's Tailwind config:

```js
// tailwind.config.js

const sds = require("czifui/dist/tailwind.json");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{tsx,scss}"],
  theme: {
    extend: sds,
  },
};
```

If you have existing styles that you'd like to maintain, you can pick and choose
different parts of the SDS config:

```js
// tailwind.config.js

const sds = require("czifui/dist/tailwind.json");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{tsx,scss}"],
  theme: {
    extend: {
      ...sds,

      width: {
        ...sds.width,
        "app-modal-width": "500px",
      },

      height: {
        ...sds.width,
        "app-modal-height": "200px",
      },
    },
  },
};
```

After that, you should be able to use SDS Tailwind classes in your app:

```tsx
export function Hello() {
  return (
    <p className="m-sds-xl px-sds-xs py-sds-s text-sds-error-400">
      Hello, World!
    </p>
  );
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

If you want to override the default theme, please use `defaultAppTheme`, override the options, and then call `createTheme` to generate
the full theme object like below. This is needed because `createTheme` generates
extra theme variables based on the themeOptions provided, so if you override `defaultTheme` directly, some auxillary theme variables will be based on `defaultAppTheme` instead of your own custom options

```tsx
  import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
  import { defaultAppTheme, makeThemeOptions } from "czifui";
  import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
  import createTheme from "@material-ui/core/styles/createTheme";

  const customTheme = {
    ...
  }

  const appTheme = makeThemeOptions({ ...defaultAppTheme, ...customTheme })

  const theme = createTheme(appTheme)

    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <YourApp />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StylesProvider>
```

💡 CZGE example available [here](https://github.com/chanzuckerberg/czgenepi/blob/trunk/src/frontend/src/common/styles/theme.ts).

💡 Material UI docs for custom theming available [here](https://mui.com/material-ui/customization/theming/).

## Q&A

1. Why wrapping a component with `styled()` doesn't style the root element as expected?

   This is likely because the component is **NOT** forwarding the css class name that `styled()` generates to the intended root element. So we likely need to update the `czif` component to make it work

   For example, if a `czif` component `Foo` has the following implementation, `styled(Foo)` won't style the wrapper `<div />` as expected:

   ```tsx
   function Foo() {
     return (
       <div>
         <ChildA />
         <ChildB />
       </div>
     );
   }
   ```

   The fix is:

   ```tsx
   function Foo({ className }) {
     return (
       <div className={className}>
         <ChildA />
         <ChildB />
       </div>
     );
   }
   ```

1. To style a sub-component of a `czifui` component, typically we export the sub-component for the call site to import and style via `styled`, and then you will be able to pass back the styled sub-component to the `czifui` component through prop

   For example, `ComplexFilter` exports `ComplexFilterInputDropdown` sub-component, so if you want to style it, you can do the following:

   ```tsx
   import styled from "@emotion/styled";
   import { ComplexFilter, ComplexFilterInputDropdown } from "czifui";

   const StyledComplexFilterInputDropdown = styled(ComplexFilterInputDropdown)`
     color: pink;
   `;

   function Foo() {
     return (
       <ComplexFilter
         InputDropdownComponent={StyledComplexFilterInputDropdown}
       />
     );
   }
   ```

## Project status

This project is under **active development**. Contributions and ideas are welcome! If you would like to contribute, check out the [contribution guidelines](docs/contribution.md) or open an issue.
This project is governed under the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.

## Reporting Security Issues

Please note: If you believe you have found a security issue, please responsibly disclose by contacting us at security@chanzuckerberg.com. More information is in our [Security Readme](docs/SECURITY.md)

## 2022 Plans

[2022 Plans](https://docs.google.com/presentation/d/1pKAY6Wl3-EHInvOZuf0L3yEDFt2xVvMlO7ZWefQbgjA/edit?usp=sharing)
