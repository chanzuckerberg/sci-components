# Data Viz

Charting components for the Science Design System, built on Apache ECharts and themed with the SDS design tokens.

**A separate package:** the components in this section ship as @czi-sds/data-viz, not as part of @czi-sds/components. Charts pull in ECharts, which is large and not needed by most apps, so they are versioned and installed on their own. @czi-sds/data-viz is built on top of @czi-sds/components and requires it at runtime.

## Installation

NPM Package:

**Shell**

```sh
// with npm
npm i @czi-sds/data-viz
// with yarn
yarn add @czi-sds/data-viz
```

Like @czi-sds/components, the package declares its dependencies as peer dependencies to prevent duplicate copies of React, Material UI, and the design system itself. Please ensure the following are also installed:

**JSON**

```json
{
  "@czi-sds/components": "^24.0.0",
  "@emotion/styled": "^11.11.0",
  "@mui/material": "^9.0.0",
  "echarts": "^6.0.0",
  "lodash": "^4.17.21",
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0"
}
```

To install the package together with its peer dependencies:

**Shell**

```sh
// with npm
npm i @czi-sds/data-viz @czi-sds/components @emotion/styled @mui/material echarts lodash react react-dom
// with yarn
yarn add @czi-sds/data-viz @czi-sds/components @emotion/styled @mui/material echarts lodash react react-dom
```

@czi-sds/components brings peer dependencies of its own (@emotion/css, @emotion/react, @mui/icons-material, and @tanstack/react-table). The Getting Started page covers that install and the theme setup both packages rely on.

**Upgrading an existing app?** The data-viz release that ships alongside SDS 24.0.0 moves to Material UI v9 and ECharts v6. The [migration guide](https://github.com/chanzuckerberg/sci-components/blob/main/migration-docs/migrate-to-24.0.0.md) covers the dependency updates and the API changes that come with them.

## Usage

Charts read colors, spacing, and typography from the SDS theme, so they need the same providers as the rest of the design system. Wrap your app once, as described in Getting Started, and then import charts the way you import any other SDS component:

**React TypeScript**

```tsx
import { StackedBarChart } from "@czi-sds/data-viz";

const DATA = [
  { name: "Biology", value: 320 },
  { name: "Chemistry", value: 210 },
  { name: "Physics", value: 170 },
];

export function DomainBreakdown() {
  return (
    <StackedBarChart
      data={DATA}
      title="Domain"
      width="360px"
      showLegend
      showLegendValues
    />
  );
}
```

Charts compose with @czi-sds/components, so surrounding layout and controls come from the main package:

**React TypeScript**

```tsx
import { Button } from "@czi-sds/components";
import { HeatmapChart } from "@czi-sds/data-viz";

export function ExpressionPanel() {
  return (
    <div>
      <Button onClick={handleExport} sdsStyle="rounded" sdsType="primary">
        Export
      </Button>
      <HeatmapChart
        width={800}
        height={600}
        data={data}
        xAxisData={genes}
        yAxisData={cellTypes}
        encode={{ x: "geneIndex", y: "cellTypeIndex" }}
      />
    </div>
  );
}
```

## Components

The package currently ships two charts. Each has its own page in this section with props and interactive stories.

| Component       | Use it for                                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| HeatmapChart    | A matrix of values across two categorical axes, such as gene expression by cell type. Handles very large datasets through a camera that renders only the visible window.       |
| StackedBarChart | A single bar split into labelled segments, for showing the composition of a total either proportionally or against a known maximum. Supports selection and an optional legend. |

## Contributing

The package source lives in [packages/data-viz](https://github.com/chanzuckerberg/sci-components/tree/main/packages/data-viz) of the SDS repository, and the [contribution guidelines](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/docs/contribution.md) apply here as they do to the main package. For a new chart type or a change to an existing one, post in the [#sci-design-system-support](https://czi-sci.slack.com/archives/C032S43KKFV) channel in Slack.
