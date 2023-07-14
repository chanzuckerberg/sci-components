# How to add an icon to the SDS codebase

## 1. Obtain the icon SVG(s)

- The GitHub issue should contain a link from which you can download the SVG file(s). If not, reach out the relevant designer.
- If the icon is needed for size `extraSmall` and/or size `small`, that will be its own file, and if it’s needed for size `large` and/or `extraLarge`, that will also be its own distinct file. (This is because a single icon design cannot serve both xtraSmall/small and serve large/extraLarge, due to the design conventions and line weights, etc).
  - Follow up with the designer if it’s not clear what sizes the icon can be used for

## 2. If needed, rename the SVG file(s)

- Icon SVG files should follow these naming conventions:
  - `Icon**InsertIconNameHere**Small` (for size `extraSmall` and `small`)
  - `Icon**InsertIconNameHere**Large` (for size `large` and `extraLarge`)
- Replace `**InsertIconNameHere**` with the name of the icon, but be sure to align on this name with design and product if it isn’t already clear
- The file names should start with `Icon` and end with `Small`, as in the naming templates above

## 3. Move the SVG file(s) into the SDS codebase

- Be sure to make a new branch first
- Then you can drag the SVG file(s) using the Finder app into **sci-components/packages/components/src/common/svgs** folder

## 4. Add the icon to the map.ts file

- Navigate to **sci-components/packages/components/src/core/Icon/map.ts** in your code editor
- Import the icon(s), adding the import code line(s) where it fits alphabetically with the other icon imports, e.g.
  `import { ReactComponent as IconInsertIconNameHereSmall } from "../../common/svgs/IconInsertIconNameHereSmall.svg";`
  - If there are multiple SVG(s) for the icon (small and large), both will need to be imported separately
- Add the icon to the `IconNameToSizes` object (the next chunk of code within map.ts, below the import statements) where it fits in alphabetically
  - Use the icon’s name as the key, which should match its SVG file name(s), sans the prefixed `Icon` and `Small` or `Large` parts
  - List the sizes it can be used for as strings for the value, as in the following example:
    `virusCircleS: "l" | "xl";`
- Add the new icon to the `iconMap` object (the last chunk of code at the bottom of map.ts) where it fits in alphabetically
  - Follow the same pattern used for existing icons, giving your new icon object keys for both `largeIcon` and `smallIcon` respectively
  - If the icon doesn’t have a large or extraLarge size, give `largeIcon` a value of `null`; otherwise pass it the full name of the icon’s large SVG file name, e.g.
    `**IconInsertIconNameHereLarge.svg**`. Repeat for `smallIcon`.

## 5. Remove unnecessary `fill`s from `path` elements

- Open Storybook and find the new icon on the Icon / Icon Bank page (they’re alphabetical)
- Use the Storybook control panel to change the icon’s color to `warning`. (This is a lighter color, which will make it easier to see unwanted dark outlines.) Examine the icon closely, and hover on it to invert its color with the background: look for any black outlines that shouldn’t be part of the icon, or if any parts of it don’t invert properly
- If needed, remove the `fill` attributes from the `path` elements to fix the problem.
- If this doesn't work, it's possible that the designer will need to makes changes to the SVG itself within Figma, such as uniting all elements.

## 6. Once the icon is ready, push your code and make a PR

- Include screenshots of the icon pre-hover and hover, from the Storybook Icon Bank, and tag the relavant designer to verify the design (and the SVG paths, visually).
- Also tag a(n) engineer(s) to review.
