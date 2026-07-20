# `@czi-sds/components`

React component library for the [Science Design System (SDS)](https://sds.czi.design/). Built on **Material UI v9**.

Full documentation (usage, theming, scripts, contributing) lives in the [repository README](https://github.com/chanzuckerberg/sci-components#readme).

## Installation

Peer dependencies:

```
@emotion/css
@emotion/react
@emotion/styled
@mui/icons-material
@mui/material
react
react-dom
```

```bash
# npm
npm i @czi-sds/components @emotion/css @emotion/react @emotion/styled @mui/material @mui/icons-material react react-dom

# yarn
yarn add @czi-sds/components @emotion/css @emotion/react @emotion/styled @mui/material @mui/icons-material react react-dom
```

> **React 18 note:** Material UI ships `react-is@19`. If your app uses React 18, pin `react-is` to match (Yarn `resolutions` / npm `overrides`), e.g. `"react-is": "^18.3.1"`.

## Migrating to SDS 24.0.0

SDS `24.0.0` is a **breaking release** that moves the Material UI peer dependency from v5 to v9. Follow the step-by-step guide to upgrade the SDS version:

→ [Migration guide](https://github.com/chanzuckerberg/sci-components/blob/main/migration-docs/migrate-to-24.0.0.md)

## Links

- [Design docs (Zeroheight)](https://sds.czi.design/)
- [Full repo docs](https://github.com/chanzuckerberg/sci-components#readme)
- [npm package](https://www.npmjs.com/package/@czi-sds/components)
- [Material UI API docs](https://mui.com/)
