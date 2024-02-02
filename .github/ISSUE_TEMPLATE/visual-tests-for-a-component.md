---
name: Visual tests for a component
about:
  Use this template to create issues for writing visual (Chromatic) tests for
  components
title: Visual tests for [Component]
labels: Test Cases Epic
assignees: ""
---

- [ ] Align with design, product, and other engineers, if necessary, on what visual traits to include as permutation dimensions for the Chromatic test
- As a starting point, you can find the component in this doc: [Chromatic tests: Which component dimensions to consider looping through](https://docs.google.com/document/d/1i40YV1rX61dNzGsqbhqJAD8PL1puCecX7rnHgD_FawE/edit#heading=h.s63zmnx3lqv1)
- Permutation dimensions may include the component’s props, but it may not always be necessary to include every prop
- If the component can be interacted with, or if part of it can (e.g. an “x” button or similar within it), it may need pseudo state as a permutation dimension. (The SDS codebase already has a [pseudo state addon for Storybook integrated](https://storybook.js.org/addons/storybook-addon-pseudo-states), but each relevant state will need to be looped through, see next bullet for an example.)

- [ ] Write the tests in the index.stories.tsx for the component. See the [index.stories.tsx file for the Button component](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Button/index.stories.tsx) for an example of how to structure the loops within the test, to ensure all relevant permutations are iterated through.
- Name the test `ScreenshotTest`; this will result in a new page called “Screenshot Test” generated in Storybook for the component ()
- `ScreenshotTest` should come after `Default` and `LivePreview` but before `Test`
