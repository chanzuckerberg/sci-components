# InputSlider

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/InputSlider/index.tsx).

## Import

**React TypeScript**

```tsx
import { InputSlider } from "@czi-sds/components";
```

## Code examples

### **Default InputSlider**

This example has the minimum props needed for the InputSlider component.

**Example: DefaultInputSlider**

```tsx
import { InputSlider } from "@czi-sds/components";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 200 }}>
        <InputSlider aria-label="Label" defaultValue={50} />
      </Box>
    </div>
  );
}

export default App;
```

### InputSlider with custom Marks

This example shows an InputSlider component that features custom marks precisely positioned at 0%, 50%, and 100% of the slider's value.

**Example: InputSliderWithCustomMarks**

```tsx
import { InputSlider } from "@czi-sds/components";
import { Box } from "@mui/material";

const generateCustomMarks = (min: number, max: number) => {
  return [
    {
      label: min,
      value: min,
    },
    {
      label: ((max - min) / 2 + min).toFixed(0),
      value: (max - min) / 2 + min,
    },
    {
      label: max,
      value: max,
    },
  ];
};

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 200 }}>
        <InputSlider
          aria-label="Label"
          defaultValue={50}
          marks={generateCustomMarks(0, 100)}
          min={0}
          max={100}
          step={5}
          valueLabelDisplay="on"
        />
      </Box>
    </div>
  );
}

export default App;
```

### Range InputSlider

Passing an array of two numbers renders a range with a thumb at each end.

**Example: RangeInputSlider**

```tsx
// An array value turns the slider into a range with two thumbs, which the
// component labels "Minimum value" and "Maximum value" for screen readers.
import { InputSlider } from "@czi-sds/components";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 200 }}>
        <InputSlider
          defaultValue={[15, 85]}
          min={0}
          max={100}
          step={5}
          valueLabelDisplay="on"
        />
      </Box>
    </div>
  );
}

export default App;
```

### Disabled InputSlider

A disabled slider dims the track, thumb, marks, and value label, and ignores pointer and keyboard input.

**Example: DisabledInputSlider**

```tsx
import { InputSlider } from "@czi-sds/components";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 200 }}>
        <InputSlider
          aria-label="Label"
          defaultValue={40}
          marks
          step={20}
          valueLabelDisplay="on"
          disabled
        />
      </Box>
    </div>
  );
}

export default App;
```

## SDS vs MUI

The following props and options differ in how they function across MUI's Slider component versus SDS's InputSlider component:

- `orientation`: Has no effect in SDS. The component always renders horizontally, and overrides anything you pass.

- `size` and `color`: Have no effect in SDS. The rail, track, and thumb are styled from the theme.

- `aria-label` and `getAriaLabel`: SDS labels the thumbs for you. A range slider gets `"Minimum value"` and `"Maximum value"`; a single-thumb slider uses your `aria-label`, falling back to `"Slider value"`. Pass `getAriaLabel` to take over completely.

These are some of the common props that can be used for both the MUI Slider component and the SDS InputSlider component:

- `value` and `defaultValue`: A number renders one thumb. An array of two numbers renders a range with two thumbs, as in the "Range InputSlider" example below.

- `step`: Sets the step distance between selectable stops (and relatedly, if this prop is left out, the slider is continuous, rather than discrete)

- `marks`: When present and set to `true`, invokes the default marks style. When passed a rich array (of objects containing the value and the custom label to show at that value), sets marks and labels only at the positions specified by the array. See the "InputSlider with custom Marks" example below.

- `valueLabelDisplay`: This prop determines whether and when the value label is displayed, and takes the following props: `"auto"` (the value label will display when the thumb is hovered or focused), `"on"` (labels display persistently), or `"off"` (default; labels are never displayed).

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-slider/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name                | Type                                  | Default          | Description                                                                                                                                                                                                                                                                                                   |
| ------------------- | ------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultValue`      | `Array<number> \| number`             | -                | The default value. Use when the component is not controlled. An array of two numbers renders a range slider.                                                                                                                                                                                                  |
| `value`             | `Array<number> \| number`             | -                | The value of the slider. Use with `onChange` to control the component.                                                                                                                                                                                                                                        |
| `onChange`          | `(event, value, activeThumb) => void` | -                | Called as the user drags a thumb.                                                                                                                                                                                                                                                                             |
| `disabled`          | `boolean`                             | `false`          | If `true`, the component is disabled.                                                                                                                                                                                                                                                                         |
| `marks`             | `bool \| Array<{ value, label }>`     | `false`          | Marks indicate predetermined values to which the user can move the slider. If `true` the marks are spaced according the value of the `step` prop. If an array, it should contain objects with `value` and an optional `label` keys.                                                                           |
| `max`               | `number`                              | `100`            | The maximum allowed value of the slider. Should not be equal to `min`.                                                                                                                                                                                                                                        |
| `min`               | `number`                              | `0`              | The minimum allowed value of the slider. Should not be equal to `max`.                                                                                                                                                                                                                                        |
| `orientation`       | `"horizontal"`                        | `"horizontal"`   | Fixed by SDS. The component sets this itself, so a vertical slider is not available.                                                                                                                                                                                                                          |
| `step`              | `number`                              | `1`              | The granularity with which the slider can step through values. (A "discrete" slider.) The `min` prop serves as the origin for the valid values. We recommend `(max - min)` to be evenly divisible by the `step`. When `step` is `null`, the thumb can only be slid onto marks provided with the `marks` prop. |
| `valueLabelDisplay` | `"auto"` \| `"off"` \| `"on"`         | `"off"`          | Controls when the value label is displayed: - `"auto"` the value label will display when the thumb is hovered or focused. - `"on"` will display persistently. - `"off"` will never display.                                                                                                                   |
| `aria-label`        | `string`                              | `"Slider value"` | Labels the thumb of a single-value slider. Range sliders label their two thumbs `"Minimum value"` and `"Maximum value"` instead.                                                                                                                                                                              |
