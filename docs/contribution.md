# Contribution Guide

Thank you so much for contributing to the Science Component Library! We hope the library will help save you time on your project, and also serve as a way to scale your impact through leveraging your learnings and best practices to all other projects that use this library ๐ช๐

Ready to dive in? ๐คฟ๐ ๐๐ฆ

## Important links

1. [npm Package Page](https://www.npmjs.com/package/czifui)
1. [Design System Figma](https://www.figma.com/file/EaRifXLFs54XTjO1Mlszkg/Science-Design-System-Reference)
1. [Material UI](https://material-ui.com/) (we are using v4, but definitely keeping an eye on v5 as they take shape!)

## Steps to start ๐ฏ

1. Download the repo to your local machine and fire it up with `yarn && yarn start`, it will automatically start a local Storybook instance, and you can browse existing components there as well

1. Take a quick tour of all existing components and see the different ways we use to style the MUI components. We will also cover the different styling strategies in details in the [styling section](#styling)

1. Once youโre ready to test your new shiny component in your product project (IDseq, Aspen, etc.), do the following steps:

   1. Make sure your new component is exported in `src/index.ts`

   1. `yarn build` to compile the components, generate their Typescript definitions, and export them as `index.cjs.js` and `index.esm.js` in `/dist` folder

   1. If you **ARE NOT** using Happy Path (which uses Docker virtual machine as local development environment), you can go to your product project and install your local component library directory like so: `npm install RELATIVE_PATH_TO_COMPONENT_LIBRARY`.

      E.g., `npm install ../sci-components` if your projects look like this: `parentFolder/productProject` and `parentFolder/sci-components`

   1. If you **ARE** using Happy Path, since our local component library directory is **NOT** mounted in the local Docker container, the app wonโt be able to find the directory. So the only way to test out the component library is to publish it to `npm` and then upgrade your `czifui` dependency accordingly.

1. When youโre happy with your component, please submit a [PR](https://github.com/chanzuckerberg/sci-components/pulls) to get a code review

1. Once your PR is merged, congrats and thank you for contributing to the component library ๐๐๐โจโค๏ธ!!

## Styling

When it comes to styling Material UI's components, generally the following strategies should cover the most use cases. However, if none of the strategies work for you, please reach out to CZI Slack channels **#org-tech-frontend** and **#help-frontend** for help!

1. Straight up `styled()` wrapping the component to style the root element

   When to use: Look for the MUI component's CSS API section, if `root` is available, wrapping the component in `styled()` will apply the styles to the root element

   For example, MUI `<Button />` component has `root` CSS API as shown [here](https://material-ui.com/api/button/#css). As a result, the following code will work:

   ```ts
   const StyledButton = styled(Button)`
     // This will change the text color to pink
     color: pink;
   `
   ```

   ๐ก You can find the full `czifui` `<Button />` implementation [here](../src/core/Button/index.tsx)

1. Wrap the component with `styled()` and target `.Mui*` global class names

   When to use: When you need to style a **descendant** of the root element.

   NOTE: If the element is **NOT** a descendant of the root element, such as when the element is rendered in a React Portal, **outside** of the root element's tree, use the `classes` strategy below

   For example, MUI `<Chip />` element renders a descendant element `label` as shown in the screenshot below. As a result, the easiest way to style the `label` element is below:

   ```ts
   const StyledChip = styled(Chip)`
     .MuiChip-label {
       padding: 0;
     }
   `
   ```

   ๐ก You can find the full `czifui` `<Chip />` implementation [here](../src/core/Chip/index.tsx)

   You can also find all the CSS API for the MUI component under the CSS section of its API page.

   E.g., [Chip CSS API section](https://material-ui.com/api/chip/#css)

   ![image](https://user-images.githubusercontent.com/6309723/124043458-e80bcb00-d9bf-11eb-8f4c-96c88556a8b6.png)

1. Use Material UI's `classes` prop to pass css class names to targeted element

   When to use: When the element is **NOT** a descendant of the root element, such as when the element is rendered in a React Portal, **outside** of the root element's tree

   For example, MUI `<Tooltip />` component has an arrow element that's rendered **outside** of the root element's tree as shown in the screenshot below. As a result, the only way to style the `arrow` element is through passing a class name for styling the `arrow` element to `<Tooltip classes={{ arrow: 'class-name-here' }} />`.

   Like so:

   ```tsx
    import { css } from "@emotion/css";

    // css() registers the style and returns a css class name
    const arrowCss = css`
      color: pink;
    `

    <Tooltip classes={{arrow: arrowCss}} />
   ```

   ๐ก You can find the full `czifui` `<Tooltip />` implementation [here](../src/core/Tooltip/index.tsx)

   You can also find all the CSS API for the MUI component under the CSS section of its API page.

   E.g., [Tooltip CSS API section](https://material-ui.com/api/tooltip/#css)

   ![image](https://user-images.githubusercontent.com/6309723/124044319-07a3f300-d9c2-11eb-847e-45d522808b95.png)

## Commit Message

This repo uses [Commitizen](https://github.com/commitizen/cz-cli) to ensure the
commits follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/),
so we can do semantic versioning properly

NOTE: Commitizen command is automatically triggered through [Husky](https://github.com/typicode/husky) when you write a commit message. However, you can always do `^ + C` to skip Commitizen if you're not ready to submit a PR!

## Reporting Security Issues

Please note: If you believe you have found a security issue, please responsibly disclose by contacting us at security@chanzuckerberg.com. More information is in our [Security Readme](docs/SECURITY.md)
