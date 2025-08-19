---
title: "Getting Started"
id: 7352994
uid: "405095"
slug: "405095-getting-started"
url: "https://sds.czi.design/009eaf17b/v/latest/p/405095-getting-started"
hidden: false
locked: false
created_at: "2025-07-07T20:30:41.989Z"
updated_at: "2025-07-07T20:30:41.992Z"
---

# Getting Started

Let the following guides serve as starting points for working with the SDS. Understand how to use the design system libraries within Figma, navigate the documentation, contribute new components to the design system, access the SDS codebase, and incorporate coded components into application builds.

## For Designers

## Overview

| The Science Design System (SDS) brings consistency and universal standards to CZI's science products.  Within Figma, the elements of the SDS are accessible to product designers via a collection of published libraries. These libraries have been built to allow for maximum flexibility depending on each product team's component needs.  The SDS Documentation serves as an in-depth guide for both designers and engineers for using elements of the design system within projects.  In instances where the available SDS components don't fulfill a product team's needs, there is a straightforward process for requesting additional elements for the design system. |   | **Jump to section:** [Figma](https://sds.czi.design/009eaf17b/v/0/p/405095-getting-started/t/98f105) [SDS Documentation](https://sds.czi.design/009eaf17b/v/0/p/405095-getting-started/t/9509e7) [Contributing to the SDS](https://sds.czi.design/009eaf17b/v/0/p/405095-getting-started/t/188ca1) |
| --- | --- | --- |

---

### Figma

#### **Library structure**

Instead of consolidating all elements into the same Figma library, the SDS team has broken out each element type into separate libraries—SDS Bases, SDS Typography, SDS Icons, and SDS Components. Each of these libraries can be turned on or off depending on the needs of the individual product team. This ensures product designers' project files aren't cluttered with unnecessary elements and they only see the pieces of the SDS that are relevant to them.

> For example, CZ ID and CZ GEN EPI use the same fonts in both of their products, whereas Single Cell and Napari use their own unique typography and therefore have no need for the SDS Typography library to be enabled in their project files. All four products use the same icon set, meaning all four will have the SDS Icons library enabled in their project files.

The SDS Components library is not intended to be used by itself, but instead feeds into component sub-libraries for each product. This ensures each component is built consistently and has the same functionality and props, while allowing for visual customization of every component to align with each product's look and feel. Each product sub-library contains any product-specific colors (generally Primary and Info colors) and typography.

> For example, designers on CZ ID and CZ GEN EPI will both be using the same Button component and all of its variant options, while CZ ID's primary Button will be blue and pulled from the CZ ID Components library and CZ GEN EPI's will be purple and pulled from the CZ GEN EPI Components library.

#### **Project file set up**

When working on a project, ensure the necessary SDS libraries for your product are enabled. Figma's team settings for CZ GEN EPI have been adjusted to ensure any new project started in the team folder will have the necessary libraries enabled by default.

For reference, below are the libraries that should be enabled for CZ GEN EPI projects:

* SDS Bases
* SDS Typography
* SDS Icons
* CZ GEN EPI Design System

For more details around using and working with libraries in Figma, see this helpful [guide](https://help.figma.com/hc/en-us/articles/360041051154-Guide-to-libraries-in-Figma) from the Figma team.

---

### SDS Documentation

The SDS documentation should be the go-to place to learn about using elements of the design system within projects. It is not intended to be used only by designers, but by anyone on a product team looking to better familiarize themselves with all of the pieces of the design system and how it can be best leveraged in product work.

Below are a few tips around navigating the documentation:

* Visit the [Element Status Tracker](https://sds.czi.design/009eaf17b/p/446102) page for the most up-to-date view of which elements are available for use within the Figma libraries and the SDS codebase; a more detailed status spreadsheet is linked at the bottom of this page for an in-depth look at status by component variant as well as links to implementation tickets for a granular view of when to expect components to be available for use
* Most components have a Live Preview section on their Overview tabs; this displays an interactive instance of the element, providing the ability to engage with it and get a better feel for how it will work when included as part of a product build
* Each variant of every component is viewable on their Overview tabs; aside from displaying all of the available props for each variant, these views are able to be clicked on and inspected to get further design details such as typography and color styles, border radiuses, spacing, etc.
* On every component page there is a Code tab containing individual iframes imported from Storybook of each variant available to that component; each iframe has all of the same functionality found within Storybook, allowing engineers to explore props, adjust colors and text, see any event handlers, etc. all without leaving the documentation site

---

### Contributing to the SDS

If a product need arises for a component that doesn't exist in the SDS, a request can be made to the SDS team to design and add it into the system. To do so, follow the steps below:

1. Take a second look through the SDS Documentation to double check the product need can indeed not be satisfied by an existing SDS component
2. Post the component request to the [#sci-design-system-support](https://czi-sci.slack.com/archives/C032S43KKFV).) channel in Slack using the following request template to ensure all of the necessary details are captured for the SDS team:

Once a request is submitted, the SDS team will conduct an evaluation across all Science products to determine whether the new component would be beneficial to multiple products and should become part of the SDS. If it is determined that the requested component be added into the SDS, the SDS team will work with the requesting team to build, review, test, and incorporate the new component into the system.

If it is determined that the new component should not become part of the SDS, it will become the requesting product team's responsibility to design and maintain the component on their own.

See a more detailed flow of the component request process [here](https://www.figma.com/file/xOilnM2h1jnnrxOpLBPsd8/SDS-Contribution-Flow?node-id=0%3A1).

## For Engineers

## Overview

| The Science Design System (SDS) brings consistency and universal standards to CZI’s science products by offering a library of high quality, reusable components that deliver predictable, accessible and easy to learn experiences. Our goal is to democratize access to tools and technologies for scientists. |   | **Jump to section:** [Getting Started](https://sds.czi.design/009eaf17b/v/0/p/405095-getting-started/t/589d02) [Usage](https://sds.czi.design/009eaf17b/v/0/p/405095-getting-started/t/66e55e) [Contributing to the SDS](https://sds.czi.design/009eaf17b/v/0/p/405095-getting-started/t/68eeb1) |
| --- | --- | --- |

---

### Getting Started

#### **Installation**

NPM Package:

```sh
// with npm

npm i czifui



// with yarn

yarn add czifui
```

 SDS currently uses Material UI v5

czifui installs without direct dependencies to prevent version errors. Please ensure the following peer dependencies are also installed:

```html
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

```sh
// with npm

npm i @emotion/css @emotion/react @emotion/styled @material-ui/core @material-ui/icons @material-ui/lab react react-dom



// with yarn

yarn add @emotion/css @emotion/react @emotion/styled @material-ui/core @material-ui/icons @material-ui/lab react react-dom
```

---

### Usage

`czifui` comes with four main exports that help you build your app:

1. **Components** - Accessible and reusable components

```js
import React from "react";

import { Button } from "czifui";

<Button onClick={actions.onClick} sdsStyle="rounded" sdsType="primary">

 {text}

</Button>;
```

2. **Mixins** - Grouped styles defined by the design system

```js
import styled from "@emotion/styled";

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

3. **Selectors** - Helper functions that return theme variables based on passed props

```js
import { css, SerializedStyles } from "@emotion/react";

import styled from "@emotion/styled";

import { getColors, getCorners } from "czifui";



export const Tag = styled.div`

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

 

4. **CSS & SCSS Variables** - Variables for the `defaultTheme` to use if your app doesn't support `@emotion/styled`

```css
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

#### **Default Theme**

To use the default theme in your React application, complete the following:

1. Add the following HTML to your `index.html` at the `<head>`section:

```html
// installs the sds font from google fonts

<link rel="preconnect" href="https://fonts.gstatic.com" />

<link

  href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400;1,600;1,700&display=swap"

 rel="stylesheet"

/>
```

2. Import the default theme object and use it in Material UI's `<ThemeProvider />`:

```js
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

 

3. If you need to override the default SDS theme, please follow the instructions [here](https://github.com/chanzuckerberg/sci-components/blob/main/docs/how-to-override-default-theme.md).

---

### Contributing to the SDS

If you would like to contribute to the Science Design System by building requested components, please follow the contribution guidelines [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/docs/contribution.md).

If a product need arises for a component that doesn't exist in the SDS, a request can be made to the SDS team to design and add it into the system. To do so, follow the steps below:

1. Take a second look through the SDS Documentation to double check the product need can indeed not be satisfied by an existing SDS component
2. Post the component request to the [#sci-design-system-support](https://czi-sci.slack.com/archives/C032S43KKFV).) channel in Slack using the following request template to ensure all of the necessary details are captured for the SDS team:

Once a request is submitted, the SDS team will conduct an evaluation across all Science products to determine whether the new component would be beneficial to multiple products and should become part of the SDS. If it is determined that the requested component be added into the SDS, the SDS team will work with the requesting team to build, review, test, and incorporate the new component into the system.

If it is determined that the new component should not become part of the SDS, it will become the requesting product team's responsibility to design and maintain the component on their own.

See a more detailed flow of the component request process [here](https://www.figma.com/file/xOilnM2h1jnnrxOpLBPsd8/SDS-Contribution-Flow?node-id=0%3A1).

