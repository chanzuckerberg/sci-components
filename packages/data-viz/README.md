# `@czi-sds/data-viz`

Data visualization components for the [Science Design System (SDS)](https://sds.czi.design/), primarily built on [Apache ECharts](https://echarts.apache.org/). Shares the same Material UI v9 peer dependencies as `@czi-sds/components`.

Full documentation (usage, scripts, contributing) lives in the [repository README](https://github.com/chanzuckerberg/sci-components#readme).

## Installation

Peer dependencies:

```
@emotion/css
@emotion/react
@emotion/styled
@mui/icons-material
@mui/material
echarts
lodash
react
react-dom
```

```bash
# npm
npm i @czi-sds/data-viz @czi-sds/components @emotion/css @emotion/react @emotion/styled @mui/material @mui/icons-material echarts lodash react react-dom

# yarn
yarn add @czi-sds/data-viz @czi-sds/components @emotion/css @emotion/react @emotion/styled @mui/material @mui/icons-material echarts lodash react react-dom
```

> **React 18 note:** Material UI ships `react-is@19`. If your app uses React 18, pin `react-is` to match (Yarn `resolutions` / npm `overrides`), e.g. `"react-is": "^18.3.1"`.

## Migrating to SDS 24.0.0

The `@czi-sds/data-viz` release that ships with SDS `24.0.0` also requires Material UI v9. If you are upgrading from an older SDS / data-viz version, follow the step-by-step guide:

→ [MIGRATION.md](https://github.com/chanzuckerberg/sci-components/blob/main/MIGRATION.md)

## Links

- [Design docs (Zeroheight)](https://sds.czi.design/)
- [Full repo docs](https://github.com/chanzuckerberg/sci-components#readme)
- [npm package](https://www.npmjs.com/package/@czi-sds/data-viz)
- [ECharts documentation](https://echarts.apache.org/en/index.html)
