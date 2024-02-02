---
name: Functional tests for a component
about: Use this template to create issues for writing functional tests for c...
title: Functional tests for [Component]
labels: ""
assignees: ""
---

- [ ] Align with design, product, other engineers, if necessary, on what functionality to test
- As a starting point, you can find the component in this doc: [Functional tests: Ideas for what to test per component](https://docs.google.com/document/d/1qKFFBWMBq0QMhRrk5-mgrZYI2QqiL-c9YLKi28w94Gg/edit#heading=h.aixehdk039ik)
- [ ] Write the tests in the index.test.tsx for the component.

### Tips for writing functional tests:

- Consider the various types of [queries within the React Testing Library and when to use which](https://testing-library.com/docs/queries/about/#types-of-queries)
- [React Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)
- [Guiding principles](https://testing-library.com/docs/guiding-principles/) from React Testing Library
- Consider when to group test cases into a single test, for example “if search bar included, it appears in menu” can be combined with “if search bar included, entered text filters to exclude non-matches” in the same test

### Tips for running the tests:

- Make sure the test will fail when it should, too (or even make these test cases themselves to keep as permanent tests). For example, write a test such that if there should be an icon but there’s not, it will fail, in addition to writing a test for if there is an icon it will pass
- To save time when running the tests, in Terminal, use the command `lerna run test -- [INSERT LOCAL PATH TO TEST FILE]` to limit the tests that are run to those within a given component’s test file only (e.g. `lerna run test -- /Users/quigley/sci-components/packages/components/src/core/Button/button.test.tsx` for running tests for the Button component only)
- To save even more time and to help isolate an individual test when troubleshooting, you can limit to a single test to run within the component’s suite by adding `.only` directly after `it` for the particular test as such: `it.only(“...`
