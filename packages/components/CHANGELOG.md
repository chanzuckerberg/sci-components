# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [19.0.0](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/components@18.1.2...@czi-sds/components@19.0.0) (2023-11-22)

### Bug Fixes

- **defaulttheme:** fix typo in fontWeights, medium = 500 ([#707](https://github.com/chanzuckerberg/sci-components/issues/707)) ([adf650d](https://github.com/chanzuckerberg/sci-components/commit/adf650d84482585a01a9acc6dc48dbfdabab3a50))

### Features

- **multicolumnautocomplete:** first implementation ([#670](https://github.com/chanzuckerberg/sci-components/issues/670)) ([77342c6](https://github.com/chanzuckerberg/sci-components/commit/77342c6745537288d508299629bc1365f51eb446))

### BREAKING CHANGES

- **multicolumnautocomplete:** Autocomplte options type has changed from DefaultDropdownMenuOption to
  DefaultAutocompleteOption.

- refactor(autocomplete): use MUI class names object

- fix(autocomplete): remove dead code

- refactor(autocomplete): update comments and code cleanup

## [18.1.2](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/components@18.1.1...@czi-sds/components@18.1.2) (2023-10-11)

### Bug Fixes

- call onChange in event callback instead of useEffect ([#620](https://github.com/chanzuckerberg/sci-components/issues/620)) ([8d9ffda](https://github.com/chanzuckerberg/sci-components/commit/8d9ffda2992a112f1e489dabcf10315f0561f167))

## [18.1.1](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/components@18.1.0...@czi-sds/components@18.1.1) (2023-10-04)

### Bug Fixes

- **inputsearch:** fix intent and useInput styles ([#618](https://github.com/chanzuckerberg/sci-components/issues/618)) ([11430c1](https://github.com/chanzuckerberg/sci-components/commit/11430c1169391624382e9008a718861f564b4aa5))

# [18.1.0](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/components@18.0.1...@czi-sds/components@18.1.0) (2023-09-27)

### Bug Fixes

- **axe:** remove global timeout configuration ([#611](https://github.com/chanzuckerberg/sci-components/issues/611)) ([619bd82](https://github.com/chanzuckerberg/sci-components/commit/619bd8209ea8714ff6ec44dcf4025aba6ba53cf3))
- **icons:** remove fill attribute from IconQuoteLarge svg ([#614](https://github.com/chanzuckerberg/sci-components/issues/614)) ([b585b0d](https://github.com/chanzuckerberg/sci-components/commit/b585b0d2a68d38d0cdaad4cd546be1d5d9e37cff))

### Features

- **icons:** add IconQuoteLarge ([#613](https://github.com/chanzuckerberg/sci-components/issues/613)) ([b14234f](https://github.com/chanzuckerberg/sci-components/commit/b14234f27b1bb5a44e29bc3cd62f3769e46e0dc7))
- **menuitem:** add determinate/indeterminate variant to the MenuItem ([#602](https://github.com/chanzuckerberg/sci-components/issues/602)) ([7c7e3b3](https://github.com/chanzuckerberg/sci-components/commit/7c7e3b36704121db33818de206adb6c6ec484814))

## [18.0.1](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/components@18.0.0...@czi-sds/components@18.0.1) (2023-09-06)

**Note:** Version bump only for package @czi-sds/components

# [18.0.0](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/components@17.0.4...@czi-sds/components@18.0.0) (2023-09-06)

## 17.0.2 (2023-09-06)

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

## [17.0.4](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/components@17.0.3...@czi-sds/components@17.0.4) (2023-09-06)

### Bug Fixes

- **release:** fix workflow JOb to wait for the previous step ([07cc8e1](https://github.com/chanzuckerberg/sci-components/commit/07cc8e1f10314e47ec4778e20b6e0716ad906964))

## [17.0.3](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/components@17.0.2...@czi-sds/components@17.0.3) (2023-09-06)

### Bug Fixes

- **github:** add GitHub release Jobs to the release workflow ([57940f8](https://github.com/chanzuckerberg/sci-components/commit/57940f8074bb459b91a198b4b87ad73ed4c85573))

## [17.0.2](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/components@17.0.1...@czi-sds/components@17.0.2) (2023-09-05)

### Bug Fixes

- **release:** fix lerna version access token ([c6e2eb1](https://github.com/chanzuckerberg/sci-components/commit/c6e2eb1436d4b96f1c625b6c6b9e2d198f8ef7e4))
- **release:** remove --create-release from lerna version ([f1dd1cf](https://github.com/chanzuckerberg/sci-components/commit/f1dd1cf514f8182ca4bca71c82f7701deec301e5))
- **release:** test github release ([5d5c588](https://github.com/chanzuckerberg/sci-components/commit/5d5c5880efc07c74175c118e23014a6ee8e959bc))

## [14.6.2](https://github.com/chanzuckerberg/sci-components/compare/@czi-sds/components@14.6.1...@czi-sds/components@14.6.2) (2023-04-26)

**Note:** Version bump only for package @czi-sds/components
