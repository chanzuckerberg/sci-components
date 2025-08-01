# CLAUDE.md - Data Visualization Package

This file provides specific guidance for working with the `@czi-sds/data-viz` package.

## Architecture Overview

### ECharts-Based Visualization Library

This package provides React components that wrap [Apache ECharts](https://echarts.apache.org/) for scientific data visualization.

### Core Dependencies

- **ECharts 5.6.0** - Core charting library
- **Lodash** - Utility functions (especially throttling)
- **@czi-sds/components** - Shared design system components and theme
- **React** - Component framework

### Package Structure

```
src/
├── common/
│   └── utils.ts              # Shared utilities
├── core/
│   └── HeatmapChart/         # Main chart component
│       ├── __storybook__/    # Storybook stories and demos
│       ├── __tests__/        # Component tests
│       ├── hooks/            # Chart logic hooks
│       ├── index.tsx         # Main component
│       └── style.ts          # Styled components
└── index.ts                  # Package exports
```

## HeatmapChart Component

### Core Features

- **High Performance**: Optimized for large datasets using ECharts' efficient rendering
- **Camera/Viewport System**: Renders only visible portions of large heatmaps for performance
- **Interactive**: Mouse events, zooming, panning, and hover effects
- **Customizable**: Extensive styling and configuration options
- **Responsive**: Handles dynamic sizing and updates

### Key Props Interface

```tsx
interface HeatmapChartProps {
  // Required dimensions
  width: number;
  height: number;

  // Data and encoding
  data: DatasetComponentOption["source"]; // Chart data array
  xAxisData: CategoryAxisData; // X-axis labels
  yAxisData: CategoryAxisData; // Y-axis labels
  encode?: { x: string; y: string }; // Data field mapping

  // Visual customization
  symbol?: "circle" | "rect" | "roundRect";
  symbolSize?: number | number[] | function;
  itemStyle?: ScatterSeriesOption["itemStyle"];
  emphasis?: ScatterSeriesOption["emphasis"];

  // Performance optimization
  camera?: {
    active: boolean;
    height: number;
    width: number;
  };

  // Event handling
  onEvents?: Record<string, (event: unknown, chart: ECharts) => void>;

  // Advanced configuration
  grid?: EChartsOption["grid"] | ((defaultGrid) => EChartsOption["grid"]);
  options?: EChartsOption; // Direct ECharts options override
  axisPointer?: EChartsOption["axisPointer"];
  echartsRendererMode?: "svg" | "canvas";
}
```

### Data Format

The component expects data in a consistent object format that maps to chart coordinates:

```tsx
// Example data structure
const data = [
  { geneIndex: 0, cellTypeIndex: 0, percentage: 0.5 },
  { geneIndex: 1, cellTypeIndex: 0, percentage: 0.8 },
  // ... more data points
];

// Corresponding encode configuration
const encode = {
  x: "geneIndex", // Maps to xAxisData indices
  y: "cellTypeIndex", // Maps to yAxisData indices
};

// Axis data provides labels
const xAxisData = ["Gene1", "Gene2", "Gene3"];
const yAxisData = ["CellType1", "CellType2"];
```

## Performance Architecture

### Camera/Viewport System

For large datasets, the component implements a "camera" system that only renders visible portions:

```tsx
<HeatmapChart
  camera={{
    active: true,
    height: 100, // Render 100 rows at a time
    width: 50, // Render 50 columns at a time
  }}
  // ... other props
/>
```

This system uses ECharts' `dataZoom` functionality to create a sliding window over the dataset.

### Update Optimization

- **Throttled Updates**: Chart updates are throttled (100ms) to prevent excessive re-renders
- **Memoized Options**: Chart options are memoized and only recalculated when dependencies change
- **Efficient Disposal**: Proper cleanup of ECharts instances to prevent memory leaks

## Hooks Architecture

### useUpdateChart Hook

Central hook that manages chart updates and lifecycle:

```tsx
// Located in hooks/useUpdateChart.ts
export function useUpdateChart(props: UpdateChartProps): void {
  // Throttles chart updates to 100ms intervals
  // Handles chart resize before option updates
  // Manages chart option generation and application
}
```

### Chart Options Generation

The `createChartOptions` function in `hooks/utils.ts` generates complete ECharts configurations:

- Merges default options with user-provided options
- Handles complex option merging for arrays vs objects
- Provides sensible defaults for scientific visualization
- Supports function-based grid customization

## Storybook Integration

### Demo Application

The package includes a comprehensive demo application in `__storybook__/stories/heatmapDemo/` that showcases:

- **Redux-style State Management**: Using React context and reducers
- **Interactive Controls**: Real-time chart configuration
- **Performance Testing**: Large dataset handling
- **Integration Patterns**: How to use the component in applications

### Story Structure

```
__storybook__/
├── constants.ts           # Mock data and constants
├── index.stories.tsx      # Main story definitions
└── stories/
    ├── default.tsx        # Basic usage examples
    └── heatmapDemo/       # Full-featured demo app
        ├── App.tsx        # Main demo application
        ├── components/    # Demo UI components
        ├── store/         # State management
        └── helpers/       # Data generation utilities
```

## Build Configuration

### Rollup Setup

Simpler than the components package, focused on ECharts integration:

### Key differences from components package:

- No Style Dictionary build step
- No SCSS/CSS processing
- Focused on TypeScript compilation and SVG handling
- ECharts and lodash as bundled dependencies (not peer deps)

### External Dependencies

- All `@czi-sds/components` peer dependencies are external
- ECharts and lodash are bundled with the package
- React and React DOM are peer dependencies

## Development Patterns

### Adding New Chart Types

1. Create new directory in `src/core/` following HeatmapChart structure
2. Implement component with similar patterns:
   - ECharts instance management
   - Performance optimization hooks
   - Proper TypeScript interfaces
   - Comprehensive prop validation
3. Add to main exports in `src/index.ts`
4. Create Storybook stories demonstrating usage

### Performance Considerations

- Always validate `width` and `height` props (must be > 0)
- Use the camera system for datasets with > 10,000 data points
- Implement proper chart disposal in cleanup functions
- Consider throttling for real-time data updates
- Use ECharts' `useDirtyRect` optimization for better performance

### Event Handling Patterns

```tsx
const onEvents = {
  click: (event, chart) => {
    // Handle click events
    console.log("Clicked data point:", event.data);
  },
  mouseover: (event, chart) => {
    // Handle hover events
    // Access chart instance for complex interactions
  },
};

<HeatmapChart onEvents={onEvents} />;
```

### Styling Integration

- Uses styled-components from `@emotion/styled`
- Inherits theme system from `@czi-sds/components`
- Chart container styling in `style.ts`
- ECharts styling through options prop

## Testing Strategy

### Current State

- Namespace validation tests ensure proper exports
- No component tests yet (marked with `--passWithNoTests`)
- Visual testing through Storybook stories

## Integration Guidelines

### Using with Other SDS Components

```tsx
import { HeatmapChart } from "@czi-sds/data-viz";
import { Panel, Button } from "@czi-sds/components";

function ChartPanel() {
  return (
    <Panel>
      <Button onClick={handleExport}>Export Chart</Button>
      <HeatmapChart
        width={800}
        height={600}
        data={chartData}
        // ... other props
      />
    </Panel>
  );
}
```

### Theme Integration

The package inherits the SDS theme system but primarily uses it for container styling. Chart colors and styling are managed through ECharts' option system rather than styled-components.
