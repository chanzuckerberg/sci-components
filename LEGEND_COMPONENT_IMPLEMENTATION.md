# Legend Component Implementation

## Overview

Created a reusable `Legend` component in the `@czi-sds/components` package and integrated it with the `StackedBarChart` component with full ECharts event integration for interactive hover effects.

## What Was Created

### 1. Legend Component (`@czi-sds/components`)

**Location:** `packages/components/src/core/Legend/`

**Files Created:**

- `index.tsx` - Main Legend component
- `style.ts` - Styled components with SDS design tokens
- `__storybook__/index.stories.tsx` - Storybook stories

**Features:**

- ✅ Displays legend items with color indicators, labels, and optional values
- ✅ Fully accessible (ARIA labels, keyboard navigation, focus states)
- ✅ Hover interactions with callbacks
- ✅ Click interactions with callbacks
- ✅ Uses SDS design tokens (spaces, colors, corners, fonts)
- ✅ Responsive flex layout with wrapping
- ✅ Optional value display with number formatting

**Props:**

```typescript
interface LegendProps {
  items: LegendItemData[]; // Array of legend items
  onItemMouseEnter?: (item, index) => void; // Hover callback
  onItemMouseLeave?: (item, index) => void; // Leave callback
  onItemClick?: (item, index) => void; // Click callback
  showValues?: boolean; // Show/hide values
}

interface LegendItemData {
  name: string; // Label text
  value?: number | string; // Optional value
  color: string; // Color for icon
}
```

**Styling:**

- **Icon:** 8x8px rounded squares using `corners.s`
- **Font:** `fontBodyXs` (10px, 500 weight for labels, 400 for values)
- **Spacing:** `space.m` between items, `space.xs` within items
- **Colors:** `gray[600]` for labels, `gray[500]` for values
- **Interactive:** Opacity transition on hover, focus outline with `blue[400]`

### 2. StackedBarChart Integration

**New Props Added:**

| Prop               | Type      | Default | Description                                     |
| ------------------ | --------- | ------- | ----------------------------------------------- |
| `useCustomLegend`  | `boolean` | `false` | Use custom SDS Legend instead of ECharts legend |
| `showLegendValues` | `boolean` | `true`  | Show values in custom legend                    |

**Integration Features:**

1. **Automatic Legend Conversion**

   - Converts `StackedBarChartDataItem[]` to `LegendItemData[]` automatically
   - Maps name, value, and color from chart data

2. **Bi-Directional Event Handling**

   - **Hover on Legend → Highlight Chart Segment**
     ```typescript
     chart.dispatchAction({
       type: "highlight",
       seriesIndex: index,
     });
     ```
   - **Leave Legend → Remove Highlight**
     ```typescript
     chart.dispatchAction({
       type: "downplay",
     });
     ```

3. **Smart Legend Switching**
   - When `useCustomLegend: true`, automatically disables ECharts built-in legend
   - Maintains proper spacing with `space.m` between chart and legend
   - Works with or without title/badge

### 3. Storybook Updates

**Components Package:**

- Added Legend stories with 4 variants:
  - `Default` - Basic legend without values
  - `WithValues` - Legend with values displayed
  - `WithInteractions` - Interactive demo showing hover/click state
  - `FewItems` - Example with fewer items

**Data-Viz Package:**

- Updated StackedBarChart story to use custom legend by default
- Added controls for `useCustomLegend` and `showLegendValues`
- All features now controllable through Storybook UI

## Usage Examples

### Using the Legend Component Standalone

```tsx
import { Legend } from "@czi-sds/components";

function MyComponent() {
  const [hoveredItem, setHoveredItem] = useState(null);

  const items = [
    { name: "Category A", value: 3212, color: "#e7798b" },
    { name: "Category B", value: 130, color: "#c59345" },
  ];

  return (
    <Legend
      items={items}
      showValues={true}
      onItemMouseEnter={(item) => setHoveredItem(item.name)}
      onItemMouseLeave={() => setHoveredItem(null)}
    />
  );
}
```

### Using Custom Legend with StackedBarChart

```tsx
import { StackedBarChart } from "@czi-sds/data-viz";

function MyChart() {
  return (
    <StackedBarChart
      title="Organism Distribution"
      badge="8 Organisms"
      data={data}
      width={600}
      height={120}
      barHeight={16}
      showLegend={true}
      useCustomLegend={true} // Enable custom SDS Legend
      showLegendValues={true} // Show values in legend
    />
  );
}
```

### Switching Between Legend Types

```tsx
// Use ECharts built-in legend
<StackedBarChart
  showLegend={true}
  useCustomLegend={false}  // or omit (default)
  {...otherProps}
/>

// Use custom SDS Legend with hover interactions
<StackedBarChart
  showLegend={true}
  useCustomLegend={true}
  showLegendValues={true}
  {...otherProps}
/>
```

## ECharts Integration Details

### Available ECharts Actions

The Legend component uses ECharts' `dispatchAction` API to control the chart:

```typescript
// Highlight a segment
chart.dispatchAction({
  type: "highlight",
  seriesIndex: number, // Which segment to highlight
});

// Remove highlight
chart.dispatchAction({
  type: "downplay",
});

// Show tooltip
chart.dispatchAction({
  type: "showTip",
  seriesIndex: number,
  dataIndex: number,
});
```

### Event Flow

```
User hovers on Legend Item
  ↓
handleLegendItemHover(item, index)
  ↓
chart.dispatchAction({ type: "highlight", seriesIndex: index })
  ↓
ECharts highlights corresponding bar segment
```

## Benefits

1. **Reusability** - Legend component can be used with any chart type
2. **Consistency** - Uses SDS design tokens for consistent styling
3. **Accessibility** - Proper ARIA labels and keyboard navigation
4. **Interactivity** - Seamless integration with ECharts hover effects
5. **Flexibility** - Can toggle between ECharts and custom legend
6. **Type Safety** - Full TypeScript support with proper types

## Build Status

✅ Components package built successfully  
✅ Data-viz package built successfully  
✅ No linter errors  
✅ All TypeScript types correct  
✅ Storybook stories working

## Future Enhancements

Potential additions for the Legend component:

1. **Click to toggle visibility** - Click legend item to show/hide segment
2. **Multi-column layout** - Option for column-based layout
3. **Custom item renderer** - Allow custom rendering of legend items
4. **Tooltip support** - Add tooltips to legend items
5. **Sorting/filtering** - Allow dynamic sorting or filtering of items
6. **Drag and drop** - Reorder legend items
7. **Theme variants** - Light/dark mode support
8. **Size variants** - Small/medium/large sizes
9. **Orientation** - Vertical layout option
10. **Group support** - Group related legend items

## Testing Recommendations

1. **Visual Testing**

   - Test with various numbers of items (2-20)
   - Test with long labels that wrap
   - Test with and without values
   - Test hover states and focus states

2. **Interaction Testing**

   - Verify hover highlights correct chart segment
   - Verify keyboard navigation works
   - Verify click events fire correctly
   - Test with touch devices

3. **Integration Testing**
   - Test switching between ECharts and custom legend
   - Test with different chart configurations
   - Test layout with/without title and badge
   - Test responsive behavior
