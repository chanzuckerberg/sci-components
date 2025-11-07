# Horizontally Stacked Bar Chart - Implementation Guide

## Overview

This guide provides a step-by-step approach to implementing a new **StackedBarChart** component in the `@czi-sds/data-viz` package, following the exact same patterns and architecture used in the existing **HeatmapChart** component.

---

## Analysis of Existing HeatmapChart Architecture

### Component Structure

The HeatmapChart follows this file organization:

```
packages/data-viz/src/core/HeatmapChart/
├── __storybook__/
│   ├── constants.ts              # Story configuration constants
│   ├── index.stories.tsx         # Storybook story definitions
│   └── stories/
│       ├── default.tsx           # Default story component
│       └── heatmapDemo/          # Complex demo story
├── __tests__/
│   └── index.namespace-test.tsx  # Namespace/export verification test
├── hooks/
│   ├── useUpdateChart.ts         # Chart update logic with throttling
│   └── utils.ts                  # Chart options creation & configuration
├── index.tsx                     # Main component implementation
└── style.ts                      # Styled component definitions
```

### Key Architectural Patterns

1. **Main Component (`index.tsx`)**:

   - Uses `forwardRef` for ref forwarding
   - Uses `memo` for performance optimization
   - Manages ECharts instance lifecycle (init, update, dispose)
   - Validates required props (width, height)
   - Uses refs to prevent unnecessary re-renders
   - Binds and unbinds event handlers

2. **Hooks (`hooks/useUpdateChart.ts`)**:

   - Throttles chart updates (100ms by default)
   - Calls `chart.resize()` before `setOption()`
   - Manages event listener updates
   - Dependencies trigger chart updates

3. **Utils (`hooks/utils.ts`)**:

   - Defines TypeScript interfaces for props
   - `createChartOptions()` generates ECharts configuration
   - Merges default options with custom options
   - Provides sensible defaults for axis, grid, etc.

4. **Styling (`style.ts`)**:

   - Uses `@emotion/styled`
   - Simple container with dynamic width/height

5. **Storybook Configuration**:

   - Constants for demo data and configurations
   - Multiple stories (Default, Demo)
   - Interactive controls with Storybook Args
   - Chromatic snapshot disabled for performance

6. **Testing**:

   - Namespace tests ensure proper exports
   - Verifies component can be imported from package

7. **Package Exports (`src/index.ts`)**:
   - Exports both named and default exports
   - Exports type interfaces

---

## Figma Design Analysis

Based on the Figma examples provided, the StackedBarChart has:

### Visual Components

1. **Header Section**:

   - Title text (e.g., "Domain", "Organism", "Tissue")
   - Tag with count (e.g., "5", "24", "80")

2. **Stacked Bar**:

   - Horizontal bar divided into colored segments
   - Each segment represents a category with proportional width
   - Height: 16px
   - Rounded corners on ends (2px border-radius)
   - 2px gap between segments

3. **Legend**:
   - Wraps to multiple lines if needed
   - Each legend item has:
     - 8x8px colored square (2px border-radius)
     - Category name (bold) + percentage (regular, secondary color)
     - 2px gap between name and percentage
     - 4px gap between swatch and label
     - Example: "Transcriptomic 46%"

### SDS Spacing Tokens (CRITICAL)

**All spacing must use SDS theme tokens via `getSpaces(props)` - DO NOT use hardcoded pixel values!**

Per the [detailed spacing spec in Figma](https://www.figma.com/design/ShO7mo574OQmDlm0yl7Iww/SDS-Charts-%7C-Bar-Chart?node-id=243-7468&m=dev):

```typescript
import { getSpaces, getCorners } from "@czi-sds/components";

// In your styled component:
const spaces = getSpaces(props);
const corners = getCorners(props);
```

#### Spacing Breakdown:

| Element                  | Spacing Token                  | Value     | Usage                                               |
| ------------------------ | ------------------------------ | --------- | --------------------------------------------------- |
| **Title to Tag**         | `spaces?.s`                    | 8px       | Horizontal gap between title text and count tag     |
| **Title Section to Bar** | `spaces?.m`                    | 12px      | Vertical gap from title section to stacked bar      |
| **Bar to Legend**        | `spaces?.m`                    | 12px      | Vertical gap from stacked bar to legend             |
| **Bar Segments Gap**     | `spaces?.xxxs`                 | 2px       | Gap between each colored segment in bar             |
| **Legend Items Gap**     | `spaces?.xxs` & `spaces?.xxxs` | 4px & 2px | Row/column gap between legend items (flex-wrap gap) |
| **Swatch to Label**      | `spaces?.xxs`                  | 4px       | Horizontal gap between color swatch and text        |
| **Label to Percentage**  | `spaces?.xxxs`                 | 2px       | Gap between category name and percentage value      |
| **Legend Item Padding**  | `spaces?.xxs` horizontal       | 4px       | Horizontal padding for each legend item container   |

#### Corner Radius Tokens:

| Element      | Corner Token | Value | Usage                                     |
| ------------ | ------------ | ----- | ----------------------------------------- |
| **Bar Ends** | `corners?.s` | 2px   | Border radius on first/last segments      |
| **Swatch**   | `corners?.s` | 2px   | Border radius for legend color indicators |
| **Tag**      | `corners?.m` | 4px   | Border radius for count tag               |

#### Typography Styles:

| Element         | Style                  | Font  | Size | Weight          | Line Height | Color Token        |
| --------------- | ---------------------- | ----- | ---- | --------------- | ----------- | ------------------ |
| **Title**       | Wide/fontHeaderS/600   | Inter | 14px | 600 (Semi Bold) | 20px        | `--text/primary`   |
| **Tag Count**   | Wide/fontCapsXxxxs/600 | Inter | 10px | 600 (Semi Bold) | 14px        | `--text/secondary` |
| **Legend Name** | Wide/fontBodyXxxxs/500 | Inter | 10px | 500 (Medium)    | 14px        | `--text/primary`   |
| **Legend %**    | Wide/fontBodyXxxxs/500 | Inter | 10px | 500 (Medium)    | 14px        | `--text/secondary` |

#### Color Tokens:

```typescript
import { getColors } from "@czi-sds/components";

const colors = getColors(props);

// Background colors
colors?.gray[100]; // --base/background-tertiary (#ededed) for tag background

// Text colors
colors?.gray[600]; // --text/primary (#000000) for title and legend names
colors?.gray[500]; // --text/secondary (#767676 / #7a7a7a) for tag count and percentages

// Border colors
colors?.gray[300]; // --base/border-secondary (#c3c3c3) for section borders (if applicable)
```

### Data Structure Examples

From Figma:

**Example 1 - Modality (2 categories)**:

- Transcriptomic: 4,591 (green #238444)
- Imaging: 821 (yellow #da9900)

**Example 2 - Organism (8 categories)**:

- H. sapiens: 3,212 (#e7798b)
- M. musculus: 130 (#c59345)
- C. Jacques: 89 (#9aa446)
- D. rerio: 65 (#5baf6d)
- M. mulatta: 45 (#5baba4)
- P. mirabillis: 34 (#59a5cc)
- V. cholerae: 12 (#a08ded)
- Other (17): 40 (#e46bd8)

**Example 3 - Tissue (8 categories shown)**:

- Lung: 712 (#d57dbf)
- Heart: 689 (#8558bd)
- Breast: 494 (#58bbcc)
- Pancreas: 321 (#ef8636)
- Brain: 288 (#7dd889)
- Blood: 175 (#bcbd45)
- Cornea: 77 (#a08ded)
- Other (73): 842 (#e7798b)

---

## Step-by-Step Implementation Plan

### Phase 1: Create Directory Structure

Create the following directory structure:

```
packages/data-viz/src/core/StackedBarChart/
├── __storybook__/
│   ├── constants.ts
│   ├── index.stories.tsx
│   └── stories/
│       └── default.tsx
├── __tests__/
│   └── index.namespace-test.tsx
├── hooks/
│   ├── useUpdateChart.ts
│   └── utils.ts
├── index.tsx
└── style.ts
```

---

### Phase 2: Implement Core Component Files

#### File 1: `packages/data-viz/src/core/StackedBarChart/style.ts`

**Purpose**: Define styled components for the chart container

**Implementation**:

```typescript
import styled from "@emotion/styled";

export const ChartContainer = styled("div")`
  ${getWidthAndHeight}
`;

function getWidthAndHeight({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return `
    width: ${width}px;
    height: ${height}px;
  `;
}
```

**Notes**:

- Identical to HeatmapChart styling
- Simple container with dynamic dimensions

---

#### File 2: `packages/data-viz/src/core/StackedBarChart/hooks/utils.ts`

**Purpose**: Define TypeScript interfaces and create ECharts configuration

**Key Interfaces to Define**:

```typescript
export interface StackedBarChartDataItem {
  name: string; // Category name (e.g., "H. sapiens")
  value: number; // Count/value for the category
  color: string; // Color for this segment
}

export interface CreateChartOptionsProps {
  /**
   * Array of data items to visualize in the stacked bar
   */
  data: StackedBarChartDataItem[];

  /**
   * Width of the chart in pixels
   */
  width: number;

  /**
   * Height of the chart in pixels
   */
  height: number;

  /**
   * Height of the bar in pixels (default: 16)
   */
  barHeight?: number;

  /**
   * Custom grid configuration
   */
  grid?:
    | EChartsOption["grid"]
    | ((defaultOption: EChartsOption["grid"]) => EChartsOption["grid"]);

  /**
   * Additional ECharts options to merge
   */
  options?: EChartsOption;

  /**
   * Event listeners for the chart
   */
  onEvents?: Record<string, (event: unknown, chart: ECharts) => void>;
}
```

**IMPORTANT**: Note that `barGap` and `borderRadius` have been removed from the interface because they should ALWAYS use SDS theme spacing tokens (`spaces?.xxxs` for gap, `corners?.s` for radius), not be configurable via props.

**`createChartOptions()` Function**:

This function should:

1. Calculate total value from data
2. Create a horizontal bar series using ECharts `bar` type
3. Configure stacking behavior
4. Set up colors for each segment
5. Configure grid to position bar correctly
6. Return merged ECharts options

**ECharts Configuration for Stacked Bar**:

- Use `type: 'bar'` series
- Set `stack: 'total'` to enable stacking
- Use `xAxis: { type: 'value' }` for horizontal bars
- Use `yAxis: { type: 'category' }` with single category
- Configure `itemStyle.borderRadius` for rounded corners
- Use `grid` to control positioning

---

#### File 3: `packages/data-viz/src/core/StackedBarChart/hooks/useUpdateChart.ts`

**Purpose**: Handle chart updates with throttling

**Implementation Pattern**:

- Copy the structure from HeatmapChart's `useUpdateChart.ts`
- Adapt the dependency array to match StackedBarChart props
- Call `createChartOptions` from utils.ts
- Use same throttling pattern (100ms)

**Key Logic**:

```typescript
const throttledUpdateChart = useMemo(() => {
  return throttle(
    () => {
      if (!chart || !data) {
        return;
      }

      chart.resize();

      const chartOptions = createChartOptions({
        data,
        width,
        height,
        barHeight,
        barGap,
        borderRadius,
        grid,
        options,
      });

      chart.setOption(chartOptions, {
        replaceMerge: ["series"],
      });

      // Update event listeners if needed
      if (onEvents) {
        // ... event binding logic
      }
    },
    UPDATE_THROTTLE_MS,
    { trailing: true }
  );
}, [chart, data, width, height /* ... other deps */]);
```

---

#### File 4: `packages/data-viz/src/core/StackedBarChart/index.tsx`

**Purpose**: Main component implementation

**Structure**:

```typescript
import { ECharts, init } from "echarts";
import {
  ForwardedRef,
  HTMLAttributes,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { EMPTY_OBJECT } from "src/common/utils";
import { useUpdateChart } from "./hooks/useUpdateChart";
import { CreateChartOptionsProps } from "./hooks/utils";
import { ChartContainer } from "./style";

export interface StackedBarChartProps
  extends HTMLAttributes<HTMLDivElement>,
    CreateChartOptionsProps {
  echartsRendererMode?: "svg" | "canvas";
}

const StackedBarChart = forwardRef(
  (
    props: StackedBarChartProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    // Implementation follows HeatmapChart pattern
    // ... (copy structure from HeatmapChart)
  }
);

export default memo(StackedBarChart);
```

**Key Implementation Details**:

1. Validate `width` and `height` props
2. Initialize ECharts instance with `init()`
3. Use `useUpdateChart` hook for updates
4. Implement `bindEvents()` for event handling
5. Handle ref forwarding with `handleRef()`
6. Dispose chart on unmount

---

### Phase 3: Implement Storybook Stories

#### File 5: `packages/data-viz/src/core/StackedBarChart/__storybook__/constants.ts`

**Purpose**: Define constants for stories

**Content**:

```typescript
// Sample data for different scenarios
export const DOMAIN_DATA = [
  { name: "Transcriptomic", value: 46, color: "#873b63" },
  { name: "Imaging", value: 31, color: "#7c62ca" },
  { name: "Sequencing", value: 19, color: "#40b5ce" },
  { name: "Another", value: 7, color: "#66e673" },
  { name: "Type", value: 4, color: "#e7d574" },
];

export const MODALITY_DATA = [
  { name: "Transcriptomic", value: 4591, color: "#238444" },
  { name: "Imaging", value: 821, color: "#da9900" },
];

export const ORGANISM_DATA = [
  { name: "H. sapiens", value: 3212, color: "#e7798b" },
  { name: "M. musculus", value: 130, color: "#c59345" },
  { name: "C. Jacques", value: 89, color: "#9aa446" },
  { name: "D. rerio", value: 65, color: "#5baf6d" },
  { name: "M. mulatta", value: 45, color: "#5baba4" },
  { name: "P. mirabillis", value: 34, color: "#59a5cc" },
  { name: "V. cholerae", value: 12, color: "#a08ded" },
  { name: "Other (17)", value: 40, color: "#e46bd8" },
];

export const TISSUE_DATA = [
  { name: "Lung", value: 712, color: "#d57dbf" },
  { name: "Heart", value: 689, color: "#8558bd" },
  { name: "Breast", value: 494, color: "#58bbcc" },
  { name: "Pancreas", value: 321, color: "#ef8636" },
  { name: "Brain", value: 288, color: "#7dd889" },
  { name: "Blood", value: 175, color: "#bcbd45" },
  { name: "Cornea", value: 77, color: "#a08ded" },
  { name: "Other (73)", value: 842, color: "#e7798b" },
];

// NOTE: Do NOT export these as they should come from SDS theme tokens
// export const DEFAULT_BAR_HEIGHT = 16;
// export const DEFAULT_BAR_GAP = 2;
// export const DEFAULT_BORDER_RADIUS = 2;
```

**Notes**:

- Added `DOMAIN_DATA` example matching the latest Figma spec
- Values can represent actual counts or percentages depending on use case
- Component should calculate percentages internally if needed
- **DO NOT hardcode spacing values** - always use SDS theme tokens

---

#### File 6: `packages/data-viz/src/core/StackedBarChart/__storybook__/stories/default.tsx`

**Purpose**: Default story component wrapper

**Implementation**:

```typescript
import { Args } from "@storybook/react-webpack5";
import RawStackedBarChart from "src/core/StackedBarChart";
import { DOMAIN_DATA } from "../constants";

export const StackedBarChart = (props: Args): JSX.Element => {
  const {
    data = DOMAIN_DATA,
    width = 240,
    height = 16,
    barHeight = 16,
    ...rest
  } = props;

  return (
    <RawStackedBarChart
      width={width}
      height={height}
      data={data}
      barHeight={barHeight}
      {...rest}
    />
  );
};
```

**Notes**:

- Default width is 240px (matching Figma design)
- Bar height is fixed at 16px
- No barGap or borderRadius props - these use SDS theme tokens internally
- Uses DOMAIN_DATA as the default example

---

#### File 7: `packages/data-viz/src/core/StackedBarChart/__storybook__/index.stories.tsx`

**Purpose**: Storybook story definitions

**Implementation**:

```typescript
import { Args, Meta } from "@storybook/react-webpack5";
import { StackedBarChart } from "./stories/default";
import {
  DOMAIN_DATA,
  MODALITY_DATA,
  ORGANISM_DATA,
  TISSUE_DATA,
} from "./constants";

export default {
  argTypes: {
    data: {
      control: {
        type: "object",
      },
    },
    echartsRendererMode: {
      control: {
        labels: ["Canvas", "SVG"],
        type: "select",
      },
      options: ["canvas", "svg"],
    },
    width: {
      control: {
        type: "number",
      },
    },
    height: {
      control: {
        type: "number",
      },
    },
    barHeight: {
      control: {
        type: "number",
      },
    },
  },
  component: StackedBarChart,
  tags: ["beta"],
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    snapshot: {
      skip: true,
    },
  },
  title: "Data Viz/StackedBarChart",
} as Meta;

// Default story with domain data (matches latest Figma spec)
export const Default = {
  args: {
    data: DOMAIN_DATA,
    width: 240,
    height: 16,
    echartsRendererMode: "svg",
  },
};

// Story with modality data (2 categories)
export const Modality = {
  args: {
    data: MODALITY_DATA,
    width: 525,
    height: 16,
    echartsRendererMode: "svg",
  },
};

// Story with organism data (8 categories)
export const Organism = {
  args: {
    data: ORGANISM_DATA,
    width: 525,
    height: 16,
    echartsRendererMode: "svg",
  },
};

// Story with tissue data (8 categories)
export const Tissue = {
  args: {
    data: TISSUE_DATA,
    width: 525,
    height: 16,
    echartsRendererMode: "svg",
  },
};
```

**Notes**:

- Default story uses DOMAIN_DATA (matching latest Figma design)
- Added separate Organism story
- All stories default to SVG rendering
- Width varies based on expected content (240px for domain, 525px for others)

---

### Phase 4: Implement Tests

#### File 8: `packages/data-viz/src/core/StackedBarChart/__tests__/index.namespace-test.tsx`

**Purpose**: Verify component exports and namespace

**Implementation**:

```typescript
import { StackedBarChart, StackedBarChartProps } from "@czi-sds/data-viz";

const SAMPLE_DATA = [
  { name: "Category A", value: 100, color: "#ff0000" },
  { name: "Category B", value: 200, color: "#00ff00" },
  { name: "Category C", value: 150, color: "#0000ff" },
];

const StackedBarChartNameSpaceTest = (props: StackedBarChartProps) => {
  return (
    <StackedBarChart
      width={500}
      height={16}
      data={SAMPLE_DATA}
      barHeight={16}
    />
  );
};
```

**Notes**:

- This test ensures the component can be imported from the package namespace
- TypeScript compilation will fail if exports are incorrect

---

### Phase 5: Update Package Exports

#### File 9: `packages/data-viz/src/index.ts`

**Purpose**: Export the new component from the package

**Add these lines**:

```typescript
export * from "./core/StackedBarChart";
export { default as StackedBarChart } from "./core/StackedBarChart";
```

**Complete file should look like**:

```typescript
export * from "./core/HeatmapChart";
export { default as HeatmapChart } from "./core/HeatmapChart";
export * from "./core/StackedBarChart";
export { default as StackedBarChart } from "./core/StackedBarChart";
```

---

## ECharts Configuration Details

### Horizontal Stacked Bar Configuration

**CRITICAL**: The bar gap between segments should NOT be configurable - it must always use the SDS theme token `spaces?.xxxs` (2px).

However, ECharts doesn't support gaps between stacked series natively. There are two approaches:

#### Approach 1: Use Individual Bars with Positioning (Recommended)

Instead of using stacked series, create individual bars positioned side-by-side with gaps:

```typescript
// This is a simplified example - actual implementation needs proper calculation
{
  animation: false,
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: `${width}px`,
    height: `${height}px`,
  },
  xAxis: {
    type: 'value',
    show: false,
    max: totalValue, // Sum of all values
  },
  yAxis: {
    type: 'category',
    show: false,
    data: ['bar'], // Single category
  },
  series: data.map((item, index) => {
    // Calculate cumulative offset for positioning
    const offset = data.slice(0, index).reduce((sum, d) => sum + d.value, 0);

    return {
      type: 'bar',
      name: item.name,
      data: [item.value],
      xAxisIndex: 0,
      yAxisIndex: 0,
      // Position this bar segment
      z: index,
      itemStyle: {
        color: item.color,
        borderRadius: index === 0
          ? [2, 0, 0, 2] // Left end - use 2px (corners?.s)
          : index === data.length - 1
          ? [0, 2, 2, 0] // Right end - use 2px (corners?.s)
          : 0, // Middle segments
      },
      barWidth: 16, // Bar height in pixels
    };
  }),
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)',
  },
}
```

#### Approach 2: Use Stacked Series (Simpler but no gaps)

If gaps are not strictly required in the bar itself, use standard stacking:

```typescript
{
  animation: false,
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: `${width}px`,
    height: `${height}px`,
  },
  xAxis: {
    type: 'value',
    show: false,
  },
  yAxis: {
    type: 'category',
    show: false,
    data: ['bar'],
  },
  series: data.map((item, index) => ({
    type: 'bar',
    name: item.name,
    stack: 'total',
    data: [item.value],
    itemStyle: {
      color: item.color,
      borderRadius: index === 0
        ? [2, 0, 0, 2] // corners?.s = 2px
        : index === data.length - 1
        ? [0, 2, 2, 0] // corners?.s = 2px
        : 0,
    },
    barWidth: 16,
  })),
}
```

**Note**: Since the Figma design shows visible gaps between segments, you'll likely need to use a custom rendering approach or create a wrapper component that renders the bar using HTML/CSS with proper SDS spacing tokens, then use ECharts only for tooltips and interactions.

### Alternative: HTML/CSS Implementation with SDS Tokens

Given the strict requirement for SDS spacing tokens and the gaps between segments, consider implementing the bar visualization using styled-components with emotion:

```typescript
import styled from "@emotion/styled";
import { getSpaces, getCorners, getColors } from "@czi-sds/components";

export const BarContainer = styled("div")`
  display: flex;
  gap: ${(props) => {
    const spaces = getSpaces(props);
    return `${spaces?.xxxs}px`; // 2px gap between segments
  }};
  width: 100%;
  height: 16px;
  border-radius: ${(props) => {
    const corners = getCorners(props);
    return `${corners?.s}px`; // 2px border radius
  }};
  overflow: hidden;
`;

export const BarSegment = styled("div")<{
  color: string;
  isFirst: boolean;
  isLast: boolean;
  percentage: number;
}>`
  background-color: ${(props) => props.color};
  height: 100%;
  flex-basis: ${(props) => props.percentage}%;
  flex-grow: 0;
  flex-shrink: 0;
  border-radius: ${(props) => {
    const corners = getCorners(props);
    const radius = `${corners?.s}px`;
    if (props.isFirst) return `${radius} 0 0 ${radius}`;
    if (props.isLast) return `0 ${radius} ${radius} 0`;
    return "0";
  }};
`;
```

### Important Implementation Notes

1. **SDS Spacing Integration**: Since ECharts operates in pixels, but SDS uses theme tokens, you'll need to:

   - Access theme values via `getSpaces(props)`
   - Convert token values to pixels for ECharts configuration
   - OR use HTML/CSS for the bar and ECharts for tooltips/interactions only

2. **Recommended Approach**: Create a hybrid component:

   - Use styled-components for the visual bar (with SDS tokens)
   - Overlay an invisible ECharts instance for tooltips and interactions
   - This ensures perfect adherence to SDS spacing while maintaining rich interactivity

3. **Border Radius**: Apply `corners?.s` (2px) only to the first and last segments

4. **Bar Height**: Fixed at 16px (not a spacing token, just a design constant)

---

## Testing Strategy

### 1. Namespace Test

- Verifies component can be imported from `@czi-sds/data-viz`
- TypeScript type checking ensures prop interfaces are correct

### 2. Manual Testing in Storybook

- Test with different data sets (2, 8, 20+ categories)
- Test with different dimensions
- Test event handlers (onClick, onHover)
- Test SVG vs Canvas rendering
- Test with zero/negative values (edge cases)

### 3. Visual Regression Testing

- Can be enabled later by removing `disableSnapshot: true` from story config
- Chromatic can capture visual snapshots for regression testing

---

## Build & Deployment Checklist

### Before Committing:

1. **TypeScript Compilation**:

   ```bash
   cd packages/data-viz
   yarn type-check
   ```

2. **Namespace Check**:

   ```bash
   yarn namespace-check
   ```

3. **Linting**:

   ```bash
   yarn lint
   ```

4. **Build**:

   ```bash
   yarn build
   ```

5. **Verify Storybook**:
   ```bash
   # From root directory
   yarn start
   # Navigate to "Data Viz > StackedBarChart" in Storybook
   ```

### Verification Steps:

1. ✅ Component renders in Storybook
2. ✅ All three example stories display correctly
3. ✅ Component accepts custom data
4. ✅ Width/height props work correctly
5. ✅ Colors display as specified
6. ✅ No console errors or warnings
7. ✅ TypeScript compilation succeeds
8. ✅ Namespace test passes
9. ✅ Build produces dist files

---

## Common Pitfalls & Solutions

### 1. Chart Not Rendering

**Problem**: Chart container has zero width/height
**Solution**: Ensure container has explicit dimensions; ECharts requires non-zero dimensions

### 2. Stacking Not Working

**Problem**: Bars render side-by-side instead of stacked
**Solution**: Ensure all series have the same `stack` property value (e.g., `stack: 'total'`)

### 3. Colors Not Applying

**Problem**: Default ECharts colors used instead of custom colors
**Solution**: Set `itemStyle.color` in each series configuration

### 4. Rounded Corners on All Segments

**Problem**: All bar segments have rounded corners, not just ends
**Solution**: Apply `borderRadius` only to first and last series

### 5. TypeScript Errors on Import

**Problem**: Cannot import from `@czi-sds/data-viz`
**Solution**:

- Verify exports in `src/index.ts`
- Run `yarn build` to generate type definitions
- Check `dist/index.cjs.d.ts` for exported types

### 6. Event Handlers Not Firing

**Problem**: onClick/onHover events don't trigger
**Solution**: Ensure events are bound in `bindEvents()` function and updated in `useUpdateChart`

---

## Future Enhancements (Optional)

1. **Legend Component**:

   - Could be a separate React component that reads the data prop
   - Displays colored indicators and labels below the bar

2. **Tooltip Customization**:

   - Allow custom tooltip formatters
   - Show percentage and absolute value

3. **Animation Support**:

   - Currently disabled for performance
   - Could add transition animations for data updates

4. **Responsive Sizing**:

   - Auto-calculate dimensions based on container
   - Use ResizeObserver for dynamic sizing

5. **Accessibility**:

   - Add ARIA labels
   - Keyboard navigation support
   - Screen reader announcements

6. **Data Validation**:
   - Validate data structure
   - Handle empty data gracefully
   - Warn about negative values

---

## References

### ECharts Documentation:

- [Bar Chart](https://echarts.apache.org/en/option.html#series-bar)
- [Grid Configuration](https://echarts.apache.org/en/option.html#grid)
- [Item Style](https://echarts.apache.org/en/option.html#series-bar.itemStyle)
- [Stacking](https://echarts.apache.org/en/option.html#series-bar.stack)

### Project Resources:

- HeatmapChart source code: `packages/data-viz/src/core/HeatmapChart/`
- Package documentation: `packages/data-viz/README.md`
- Storybook: Run `yarn start` from root directory

### Figma Designs:

- [Example 1 - Modality](https://www.figma.com/design/soHYIxQ9iyOy0jIJPpWYqu/Multimodal-Data-Discovery?node-id=2833-11710&m=dev)
- [Example 2 - Organism](https://www.figma.com/design/soHYIxQ9iyOy0jIJPpWYqu/Multimodal-Data-Discovery?node-id=2833-11727&m=dev)
- [Example 3 - Tissue](https://www.figma.com/design/soHYIxQ9iyOy0jIJPpWYqu/Multimodal-Data-Discovery?node-id=2833-11769&m=dev)

---

## Summary

This implementation guide provides a complete roadmap for creating a `StackedBarChart` component that:

✅ Follows the exact same architecture as `HeatmapChart`  
✅ Uses Apache ECharts for rendering  
✅ Includes proper TypeScript types  
✅ Has comprehensive Storybook stories  
✅ Includes namespace tests  
✅ Exports correctly from the package  
✅ Matches the Figma design specifications

**Estimated Implementation Time**: 4-6 hours for an experienced developer familiar with the codebase.

**Key Success Factors**:

1. Follow the HeatmapChart patterns exactly
2. Test incrementally in Storybook
3. Validate TypeScript types throughout
4. Verify package exports and namespace
5. Match Figma designs pixel-perfect

---

## Questions or Issues?

If you encounter any problems during implementation:

1. Compare your code with the HeatmapChart implementation
2. Check ECharts documentation for configuration options
3. Verify TypeScript types are correctly defined
4. Test in Storybook frequently
5. Run linting and type checking regularly

Good luck with the implementation! 🚀

---

## Summary of SDS Theme Token Usage

### Critical Requirements ⚠️

**ALL spacing, corners, colors, and typography MUST use SDS theme tokens - NO hardcoded values!**

### Quick Reference: Theme Token Access

```typescript
import {
  getSpaces,
  getCorners,
  getColors,
  fontHeaderS,
  fontCapsXxxxs,
  fontBodyXxxxs,
} from "@czi-sds/components";

// In your styled component:
const StyledComponent = styled("div")`
  ${(props) => {
    const spaces = getSpaces(props);
    const corners = getCorners(props);
    const colors = getColors(props);

    return `
      gap: ${spaces?.xxxs}px;
      padding: ${spaces?.xxs}px ${spaces?.m}px;
      border-radius: ${corners?.s}px;
      color: ${colors?.gray[600]};
      background-color: ${colors?.gray[100]};
    `;
  }}
`;
```

### Spacing Tokens Map

| Token          | Value | Used For                                   |
| -------------- | ----- | ------------------------------------------ |
| `spaces?.xxxs` | 2px   | Bar segment gaps, label-to-percentage gaps |
| `spaces?.xxs`  | 4px   | Swatch-to-label gaps, legend item padding  |
| `spaces?.s`    | 8px   | Title-to-tag gap                           |
| `spaces?.m`    | 12px  | Title-to-bar gap, bar-to-legend gap        |

### Corner Tokens Map

| Token        | Value | Used For                      |
| ------------ | ----- | ----------------------------- |
| `corners?.s` | 2px   | Bar end radius, swatch radius |
| `corners?.m` | 4px   | Tag radius                    |

### Color Tokens Map

| Token               | Hex     | Used For                           |
| ------------------- | ------- | ---------------------------------- |
| `colors?.gray[600]` | #000000 | Primary text (title, legend names) |
| `colors?.gray[500]` | #767676 | Secondary text (tag, percentages)  |
| `colors?.gray[100]` | #ededed | Tertiary backgrounds (tag)         |
| `colors?.gray[300]` | #c3c3c3 | Secondary borders                  |

### Typography Mixins

| Mixin           | Usage                                             |
| --------------- | ------------------------------------------------- |
| `fontHeaderS`   | 14px Semi Bold, line-height 20px - for titles     |
| `fontCapsXxxxs` | 10px Semi Bold, line-height 14px - for tag counts |
| `fontBodyXxxxs` | 10px Medium, line-height 14px - for legend labels |

### Implementation Checklist

Before submitting your implementation:

- ✅ All spacing uses `getSpaces(props)` selector
- ✅ All corners use `getCorners(props)` selector
- ✅ All colors use `getColors(props)` selector
- ✅ All typography uses SDS mixins (fontHeaderS, etc.)
- ✅ No hardcoded pixel values for spacing/corners
- ✅ No hardcoded hex colors
- ✅ Component works with custom SDS themes
- ✅ TypeScript types are correctly exported
- ✅ Storybook stories demonstrate all variants
- ✅ Namespace test passes

### Design Spec References

- **Main Design**: [Figma - Multimodal Data Discovery Examples](https://www.figma.com/design/soHYIxQ9iyOy0jIJPpWYqu/Multimodal-Data-Discovery?node-id=2833-11710&m=dev)
- **Spacing Spec**: [Figma - Bar Chart Spacing Details](https://www.figma.com/design/ShO7mo574OQmDlm0yl7Iww/SDS-Charts-%7C-Bar-Chart?node-id=243-7468&m=dev)

---

**Remember**: The goal is to create a component that seamlessly integrates with the Science Design System, automatically adapting to theme changes and maintaining perfect consistency with other SDS components! 🎨
