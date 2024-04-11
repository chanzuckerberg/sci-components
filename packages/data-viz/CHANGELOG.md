# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.7.0](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/data-viz@0.6.0...@czi-sds/data-viz@0.7.0) (2024-04-11)

### Features

- Controlled InputToggle ([#760](https://github.com/chanzuckerberg/sci-components/issues/760)) ([3f79600](https://github.com/chanzuckerberg/sci-components/commit/3f7960086d369cf505f42838553561c10ad50593))
- **theme:** Update design tokens and defaultTheme ([#748](https://github.com/chanzuckerberg/sci-components/issues/748)) ([c86af1d](https://github.com/chanzuckerberg/sci-components/commit/c86af1da3cd2fedf68e5ece961338980d97d5bf7))

### BREAKING CHANGES

- **theme:** All SDS Icon names have been converted from camelCase to PascalCase. Some Icon
  names has changed and the full list will be available on the migration documentation

- fix(icons): add xml schema to svg icons + Add ExcludedControls to all stories

- fix(icons): fix case-sensitive icon names

- feat(link): add fontWeight prop to the link component

- fix(inputcheckbox): fix checkbox icon

- fix(inputcheckbox): fix icon fill

- fix(checkbox): fix fill

- fix(table): fix table demo

fix navigationJumpTo demo

- fix(refactor): fix code review bugs

- chore(snapshots): update test snapshots

- refactor(stories): organize storybook files and breakdown large stories into smaller files

- fix(components): fix design review bugs in all components

- fix(a11y): fix a11y errors

- fix(linter): fix lint errors

- refactor(cellbasic): exclude new props form non-default stories

- refactor(colors): show semantic names in color component

- fix(borders): change borders semantic names

- fix(autocomplete): fix Autocomplete section titles + tagFilter deleteIcon size

- refactor(tag): add sdsSize to tag and fix Dialog close button styles

- fix(tag): fix icon sizes in the storybook default demo

- feat(icon): add IconCubeSmall

- fix(cube icon): fix icon fill

- fix(filtertag): fix onDelete

- fix(filtertag): fix a11y errors

- fix(tagfilter): update test snapshots

# [0.6.0](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/data-viz@0.5.0...@czi-sds/data-viz@0.6.0) (2024-02-15)

### Features

- **heatmap:** Base Heatmap Built ([#737](https://github.com/chanzuckerberg/sci-components/issues/737)) ([90bab28](https://github.com/chanzuckerberg/sci-components/commit/90bab2809d560e5d8835b97f89a4f421c85ebed3))

# [0.5.0](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/data-viz@0.4.2...@czi-sds/data-viz@0.5.0) (2024-02-15)

### Features

- **icons:** adds hub icons ([#525](https://github.com/chanzuckerberg/sci-components/issues/525)) ([3fc888b](https://github.com/chanzuckerberg/sci-components/commit/3fc888b80f526adc38359eee7792fac133fa1944)), closes [#458](https://github.com/chanzuckerberg/sci-components/issues/458)

## [0.4.2](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/data-viz@0.4.0...@czi-sds/data-viz@0.4.2) (2024-01-10)

**Note:** Version bump only for package @czi-sds/data-viz

## [0.4.1](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/data-viz@0.4.0...@czi-sds/data-viz@0.4.1) (2023-12-13)

**Note:** Version bump only for package @czi-sds/data-viz

# [0.4.0](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/data-viz@0.3.5...@czi-sds/data-viz@0.4.0) (2023-09-06)

### chore

- **release:** Merge changes from prod to main ([#585](https://github.com/chanzuckerberg/sci-components/issues/585)) ([74d464f](https://github.com/chanzuckerberg/sci-components/commit/74d464f9a543e1b8f8b2e9e477acc742710258f3))

### BREAKING CHANGES

- **release:** Testing breaking changes workflow with new release structure

- Publish

* @czi-sds/components@16.0.0

- fix(release): debugg release workflow
- **release:** Test

- Publish

* @czi-sds/components@17.0.0

- fix(debug): debug

- fix(debug): debug

- fix(debug): debug

- fix(debug): debug

- fix(debug): debug

- fix(debug): debug

- fix(debug): debug

- fix(debug): debug

- fix(debug): debug

- fix(debug): debug

- fix(debug): debug

- fix(slack): fix slack workflow's condition
- **release:** test slack workflow with the new release structure

- fix(slack): fix slack workflow

fix the workflow condition

- **release:** This is only to test the new release structure

- fix(d): d

- fix(workflows): update GitHub workflows

Update and optimize all GitHub workflows to the latest versions of actions

- **release:** Test slack web hook

- fix(github): fix github release workflow

- fix(comments): add comments to all yaml files

- fix(slack): change Slack Web Hook Url
- **release:** This is only for test purposes

- fix(slack): change slack action config
- **release:** This is only for testing purposes.

- fix(github): move slack config file to config directory to avoid github errors
- **release:** This is only for testing purposes!

- fix(slack): revert to Default config
- **release:** This is only for testing purposes.

- fix(config): copy slack config file in the Workflows directory
- **release:** This is only for testing purposes!

- fix(slack): fix config directory
- **release:** This is for testing purposes only!

- fix(actions): add a tip on pull request body to help with stucked checks

## [0.3.5](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/data-viz@0.3.4...@czi-sds/data-viz@0.3.5) (2023-09-06)

### Bug Fixes

- **release:** fix workflow JOb to wait for the previous step ([07cc8e1](https://github.com/chanzuckerberg/sci-components/commit/07cc8e1f10314e47ec4778e20b6e0716ad906964))

## [0.3.4](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/data-viz@0.3.3...@czi-sds/data-viz@0.3.4) (2023-09-06)

### Bug Fixes

- **github:** add GitHub release Jobs to the release workflow ([57940f8](https://github.com/chanzuckerberg/sci-components/commit/57940f8074bb459b91a198b4b87ad73ed4c85573))

## [0.1.2](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/data-viz@0.1.1...@czi-sds/data-viz@0.1.2) (2023-04-26)

**Note:** Version bump only for package @czi-sds/data-viz
