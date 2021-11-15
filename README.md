# Purpose

A multi-product design system that offers a library of high quality reusable components, that deliver a predictable, accessible, and easy-to-learn experiences that democratize access to tools & technologies for scientists.

## Components

CZIF Science Initiative Component Library

[Demo Site](https://chanzuckerberg.github.io/sci-components)

## Get Started

### Installation

https://www.npmjs.com/package/czifui

```shell
npm i czifui
```

or

```shell
yarn add czifui
```

NOTE: Please make sure the peer dependencies are installed as well

### Peer Dependencies

#### ⚠️ WARNING: Currently we require [Material UI v4](https://v4.mui.com/), even though Material UI v5 was released in September 2021 ⚠️

In order to avoid installing multiple versions of the same library in the host project, which could cause bugs, the component library does **NOT** have its own dependencies.

Therefore, please kindly ensure your project includes the following dependencies in your project's `package.json`:

```json
  "@emotion/css"
  "@emotion/react"
  "@emotion/styled"
  "@material-ui/core"
  "@material-ui/icons"
  "@material-ui/lab"
  "react"
  "react-dom"
```

Install the peer dependencies in your project:

```shell
npm i @emotion/css @emotion/react @emotion/styled @material-ui/core @material-ui/icons @material-ui/lab react react-dom
```

or

```shell
yarn add @emotion/css @emotion/react @emotion/styled @material-ui/core @material-ui/icons @material-ui/lab react react-dom
```

### Demo

`czifui` comes with [Storybook](https://storybook.js.org/) integration, so you can browse the components locally by following the steps below:

1. Cloning the repo: `git clone git@github.com:chanzuckerberg/sci-components.git`
1. Run: `yarn && yarn start`
1. A new browser tab will be automatically opened with the storybook!

![image](https://user-images.githubusercontent.com/6309723/124010513-c09f0900-d993-11eb-8fc7-f66a0b4ec16e.png)

#### Tips

It's super useful to read the `*.stories.tsx` files to see how the components are used in real examples. You can also find additional examples in [Aspen](https://github.com/chanzuckerberg/aspen), which uses `czifui` extensively

## Default Theme

### Instructions

To use the default theme, please do the following:

1. Add the following HTML to your `index.html` at the `<head>` section:

   ```html
   <link rel="preconnect" href="https://fonts.gstatic.com" />
   <link
     href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400;1,600;1,700&display=swap"
     rel="stylesheet"
   />
   ```

1. Import the default theme object and use it in Material UI's `<ThemeProvider />`:

   ```tsx
     import { defaultTheme } from "czifui";
     import { ThemeProvider } from "@material-ui/core/styles";
      import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";

    <EmotionThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <YourApp />
      </ThemeProvider>
    </EmotionThemeProvider>
   ```

1. Optional: If you want to override the default theme, please use `defaultAppTheme`, override the options, and then call `createTheme` to generate
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

💡 Aspen example available [here](https://github.com/chanzuckerberg/aspen/blob/trunk/src/frontend/pages/_app.tsx)

## Design System

`czifui` implements the Science Initiative Design System as documented in [Figma](https://www.figma.com/file/EaRifXLFs54XTjO1Mlszkg/Science-Design-System-Reference). As a result, it's very useful to get familiar with the available **theme variables**, such as `colors`, `spacings`, `typography`, etc., so you can leverage the theme properly in your application.

![image](https://user-images.githubusercontent.com/6309723/123888574-a53aec00-d908-11eb-96b3-e32381e30c9a.png)
(NOTE: Please use the left panel to find different types of components (Bases, Genes, DNA, and Chromosomes))

## How to Use

`czifui` comes with four main exports that help you build your app following the design system:

1. Components - Components that implement the design system

   E.g., `Alert`, `Button`, `Menu`

   Source: [src/core](src/core)

   NOTE: Since most of the `czifui` components are built on top of Material UI's equivalent, it's also super useful to use their [API documentation](https://v4.mui.com/) (**NOTE: We are still on MUI v4 in the short term**) to learn about what you can do with the components

1. Mixins - Mixins defined by the design system

   E.g., `fontBodyL`, `fontHeaderM`, `fontCapsXxs`

   Source: [src/core/styles/common/mixins](src/core/styles/common/mixins)

1. Selectors - Helper functions that pick out theme variables for you

   E.g., `getSpaces`, `getColors`, `getCorners`, `getFontWeights`

   Source: [src/core/styles/common/selectors](src/core/styles/common/selectors)

1. CSS & SCSS Variables

E.g., CSS: `--sds-color-beta-400`, `--sds-spaces-m`; SCSS: `$sds-color-beta-400`, `$sds-spaces-m`

Source: [src/common/styles-dictionary](src/common/styles-dictionary)

These stylesheets can be imported into the index.js file of your application to make use of czifui's standard styles in projects that use SCSS or CSS modules to style the front end:

```js
// example using create-react-app structure
// index.js

import React from "react";
import ReactDOM from "react-dom";
// If you need css
import "czifui/dist/variables.css";
// If you need scss
import "czifui/dist/_variables.scss";
import "./index.css";
import App from "./App";
```

### Example

```ts
    import { fontBodyM, getColors, getSpaces } from "czifui";

    export const Foo = styled.div`
      // This is the design system's font body medium mixin we import from czifui
      ${fontBodyM}

      // This is the regular css rules
      overflow: auto;

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

NOTE: If you are not familiar with `styled()`, please check out Emotion's `styled()` API [here](https://emotion.sh/docs/styled)

NOTE II: You can find more examples in the repo's `*.stories.tsx` and [Aspen](https://github.com/chanzuckerberg/aspen)

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
     )
   }
   ```

   The fix is:

   ```tsx
   function Foo({className}) {
     return (
       <div className={className}>
         <ChildA />
         <ChildB />
       </div>
     )
   }
   ```

1. To style a sub-component of a `czif` component, typically we export the sub-component for the call site to import and style via `styled`, and then you will be able to pass back the styled sub-component to the `czif` component through prop

   For example, `ComplexFilter` exports `ComplexFilterInputDropdown` sub-component, so if you want to style it, you can do the following:

   ```tsx
   import { ComplexFilter, ComplexFilterInputDropdown } from 'czifui'
   import styled from '@emotion/styled'

   const StyledComplexFilterInputDropdown = styled(ComplexFilterInputDropdown)`
    color: pink;
   `

   function Foo() {
     return <ComplexFilter InputDropdownComponent={StyledComplexFilterInputDropdown} />
   }
   ```

## Project status

This project is under **active development**. Contributions and ideas are welcome! If you would like to contribute, check out the [contribution guidelines](docs/contribution.md) or open an issue.
This project is governed under the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.

## Reporting Security Issues

Please note: If you believe you have found a security issue, please responsibly disclose by contacting us at security@chanzuckerberg.com. More information is in our [Security Readme](docs/SECURITY.md)

## 2021 Plans

[2021 Plans](https://docs.google.com/presentation/d/1ka5BbivcXYuDdkz3N_rpRdeaYE73GPhxfL4Bk8S0u98/edit#slide=id.geb12a33db6_2_4)
