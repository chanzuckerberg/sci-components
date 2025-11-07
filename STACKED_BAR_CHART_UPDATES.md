# StackedBarChart Component Updates

## Summary

Updated the StackedBarChart component and its Storybook stories to provide a cleaner, more focused demonstration with proper spacing and defaults.

## Changes Made

### 1. Storybook Stories (`__storybook__/index.stories.tsx`)

**Removed Stories:**

- Removed all 12 additional stories (Modality, Organism, Tissue, WithLegend*, WithTitle*, etc.)
- Kept only the **Default** story

**Updated Default Story:**

- Now showcases ALL features in one story:
  - Title: "Organism Distribution"
  - Badge: `<Tag label="8 Organisms" sdsStyle="rounded" sdsType="primary" />`
  - Legend: Enabled (`showLegend: true`)
  - Data: Uses `ORGANISM_DATA` (8 categories)
  - Width: 525px
  - Height: 120px
  - Bar Height: 16px

**Enhanced Controls:**

- Added descriptions to all argTypes for better documentation
- All features are now controllable through Storybook controls:
  - `title` - Title text
  - `badge` - Custom badge/tag component
  - `showLegend` - Toggle legend visibility
  - `width` - Chart width
  - `barHeight` - Bar segment height
  - `height` - Total container height
  - `data` - Data array
  - `echartsRendererMode` - Canvas or SVG rendering

### 2. Component Implementation (`hooks/utils.ts`)

**Default Bar Height:**

- Set `barHeight` default to **16px** in `createChartOptions` function
- This matches the SDS design specification

**Spacing Improvements:**

- Added `space.m` (8px) spacing between bar segments and legend
- Used `getSpaces(props)` to get the SDS spacing token
- Updated `defaultGrid.bottom` to use `SPACE_M` when legend is shown

**Legend Alignment:**

- Set legend to **left-aligned** by adding `left: 0` to `defaultLegend`
- Legend remains at the bottom (`bottom: 0`)
- Maintains horizontal orientation

### 3. Spacing Architecture

The component now has proper spacing between all elements:

```
┌─────────────────────────────────────┐
│ Title + Badge                       │
├─────────────────────────────────────┤ ← space.m (from ChartWrapper)
│ Bar Segments (height: barHeight)    │
├─────────────────────────────────────┤ ← space.m (from grid.bottom)
│ Legend (left-aligned, bottom)       │
└─────────────────────────────────────┘
```

**Spacing Sources:**

1. **Title to Bar:** Controlled by `ChartWrapper` styled component with `gap: space.m`
2. **Bar to Legend:** Controlled by `defaultGrid.bottom = SPACE_M` when `showLegend` is true

## Component Props

All features are now controllable via props:

| Prop         | Type                        | Default  | Description                        |
| ------------ | --------------------------- | -------- | ---------------------------------- |
| `title`      | `string`                    | -        | Title displayed above the chart    |
| `badge`      | `ReactNode`                 | -        | Badge/tag component next to title  |
| `showLegend` | `boolean`                   | `false`  | Show/hide legend at bottom         |
| `width`      | `number`                    | Required | Chart width in pixels              |
| `height`     | `number`                    | Required | Total container height in pixels   |
| `barHeight`  | `number`                    | `16`     | Height of bar segments in pixels   |
| `data`       | `StackedBarChartDataItem[]` | Required | Data array with name, value, color |

## Design Reference

The implementation follows the Figma design specification:
https://www.figma.com/design/ShO7mo574OQmDlm0yl7Iww/SDS-Charts-%7C-Bar-Chart?node-id=344-7153&m=dev

## Testing

✅ Build successful - no compilation errors
✅ No linter errors
✅ All props properly typed and documented
✅ Default story showcases all features
✅ Proper spacing using SDS tokens (space.m)
✅ Legend left-aligned at bottom
✅ Bar height defaults to 16px

## Usage Example

```tsx
import { StackedBarChart } from "@czi-sds/data-viz";
import { Tag } from "@czi-sds/components";

function MyComponent() {
  return (
    <StackedBarChart
      title="Organism Distribution"
      badge={<Tag label="8 Organisms" sdsStyle="rounded" sdsType="primary" />}
      showLegend={true}
      width={525}
      height={120}
      barHeight={16}
      data={[
        { name: "H. sapiens", value: 3212, color: "#e7798b" },
        { name: "M. musculus", value: 130, color: "#c59345" },
        // ... more data
      ]}
    />
  );
}
```
