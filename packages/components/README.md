# Purpose

The Science Design System (SDS) brings consistency and universal standards to CZI’s science products by offering a library of high quality, reusable components that deliver predictable, accessible and easy to learn experiences. Our goal is to democratize access to tools and technologies for scientists.

## Design System Documentation

`@czi-sds/components` implements the Science Design System as documented in [Zeroheight](https://sds.czi.design/). As a result, it's very useful to get familiar with the available **theme variables**, such as `colors`, `spacings`, `typography`, etc., so you can leverage the theme properly in your application.

![Science Design System Zeroheight Homepage Snapshot](https://user-images.githubusercontent.com/6309723/155802483-366008aa-7380-4a01-b356-ae0ab02f4f3b.png)

## Installation

[NPM Package](https://www.npmjs.com/package/czi-sds/components)

**Currently SDS uses Material UI v5**

NOTE: Since most of the czi-sds components are built on top of Material UI's equivalent, it's also super useful to use their [API documentation](https://mui.com/) to learn about what you can do with the components. Many czi-sds components are style wrappers that pass props through to the MUI component without modifying them.

`@czi-sds/components` installs without direct dependencies to prevent version errors. Please ensure the following peer dependencies are also installed:

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

To install @czi-sds/components and the dependencies:

```
// with npm
npm i @czi-sds/components @emotion/css @emotion/react @emotion/styled @mui/base @mui/material @mui/icons-material @mui/lab react react-dom

// with yarn
yarn add @czi-sds/components @emotion/css @emotion/react @emotion/styled @mui/base @mui/material @mui/icons-material @mui/lab react react-dom
```

## Yarn scripts

Common yarn scrips have been moved to the monorepo root. The -- syntax can be used to pass parameters to the underlying yarn scripts. For instance, to update the snapshots, use `lerna run test -- -u` instead of running all tests on both packages with `yarn test`.

- `yarn start`: Starts storybook on the local machine
- `yarn build-storybook`: Builds the storybook in the docs-build folder
- `yarn test-storybook`: Tests current running instance of storybook
- `yarn storybook:axe`: Builds the storybook and runs accessibility tests
- `yarn storybook:axeOnly`: Runs accessibility tests on the latest build of the storybook inside the docs-build folder
- `yarn test`: Runs `jest` tests
- `yarn namespace-check`: Runs typescript type checking on namespace files to ensure that there are no duplicated exports
- `yarn lint`: Runs linter
- `yarn build`: Build the packages
- `yarn ci`: Executes `yarn install --frozen-lockfile` in both packages

- _To execute any script in the inner package, one can simply use the command `lerna run script --scope=<package>`. For instance, to run the linter only on the sci-components package, use the command `lerna run lint --scope=@czi-sds/components`._

## Usage

`@czi-sds/components` comes with five main exports that help you build your app:

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
import { Typography } from "@mui/material";
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
import { styled } from "@mui/material/styles";
import { getColors, getCorners } from "@czi-sds/components";

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

5. Tailwind - Tailwind compliant configuration for the `defaultTheme` to use if your app uses Tailwind

First you need to import the SDS config into your application's Tailwind config:

```js
// tailwind.config.js

const sds = require("@czi-sds/components/dist/tailwind.json");

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

const sds = require("@czi-sds/components/dist/tailwind.json");

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
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "@czi-sds/components";

<StyledEngineProvider injectFirst>
  <ThemeProvider theme={defaultTheme}>
    <EmotionThemeProvider theme={defaultTheme}>
      <YourApp />
    </EmotionThemeProvider>
  </ThemeProvider>
</StyledEngineProvider>;
```

If you want to override the default theme, please use `defaultAppTheme`, override the options, and then call `createTheme` to generate
the full theme object like below. This is needed because `createTheme` generates
extra theme variables based on the themeOptions provided, so if you override `defaultTheme` directly, some auxillary theme variables will be based on `defaultAppTheme` instead of your own custom options

```tsx
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { defaultAppTheme, makeThemeOptions } from "@czi-sds/components";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import createTheme from "@mui/material/styles/createTheme";

const customTheme = {
  ...
}

const appTheme = makeThemeOptions({ ...defaultAppTheme, ...customTheme })

const theme = createTheme(appTheme)

<StyledEngineProvider injectFirst>
  <ThemeProvider theme={theme}>
    <EmotionThemeProvider theme={theme}>
      <YourApp />
    </EmotionThemeProvider>
  </ThemeProvider>
</StyledEngineProvider>
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

1. To style a sub-component of a `@czi-sds/components` component, typically we export the sub-component for the call site to import and style via `styled`, and then you will be able to pass back the styled sub-component to the `@czi-sds/components` component through prop

   For example, `ComplexFilter` exports `ComplexFilterInputDropdown` sub-component, so if you want to style it, you can do the following:

   ```tsx
   import {
     ComplexFilter,
     ComplexFilterInputDropdown,
   } from "@czi-sds/components";
   import styled from "@emotion/styled";

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
