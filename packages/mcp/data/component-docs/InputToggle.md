# InputToggle

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/InputToggle/index.tsx).

## Import

**React TypeScript**

```tsx
import { InputToggle } from "@czi-sds/components";
```

## Code examples

### **Default InputToggle**

This example has the minimum props needed for the InputToggle component.

**Example: DefaultInputToggle**

```tsx
import { InputToggle } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <InputToggle />
    </div>
  );
}

export default App;
```

### **InputToggle with customized on and off labels**

This example shows an InputToggle component with customized on and off labels, widened to fit them.

**Example: InputToggleWithCustomizedOnAndOffLabels**

```tsx
import { InputToggle } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <InputToggle onLabel="Start" offLabel="Finish" width={72} />
    </div>
  );
}

export default App;
```

### **Controlled InputToggle**

Passing `checked` hands control of the toggle to your application, which then updates it from the `onChange` handler.

**Example: ControlledInputToggle**

```tsx
// Passing `checked` makes the toggle controlled; without it the component
// tracks its own state.
import { useState } from "react";
import { InputToggle } from "@czi-sds/components";

function App() {
  const [checked, setChecked] = useState(true);

  return (
    <div
      className="app"
      style={{ alignItems: "center", display: "flex", gap: "16px" }}
    >
      <InputToggle
        checked={checked}
        onChange={() => setChecked((previous) => !previous)}
      />
      <span>Notifications are {checked ? "on" : "off"}</span>
    </div>
  );
}

export default App;
```

### **Disabled InputToggle**

This example shows a disabled InputToggle in both its off and on states.

**Example: DisabledInputToggle**

```tsx
import { InputToggle } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <InputToggle disabled />
      <InputToggle checked disabled />
    </div>
  );
}

export default App;
```

## SDS vs MUI

The following props and options differ and how they function across the MUI Switch component and the SDS InputToggle component:

- `size`: Has no effect in SDS

- `color`: Has no effect in SDS

- `onLabel` and `offLabel`: These are SDS-specific props. The toggle prints one of them inside the track depending on its state, which is why it is wider than a MUI Switch. Longer words may need a larger `width`.

- `value`: Managed by SDS. The component sets it to the active label so the track can render that text, so passing your own `value` replaces the visible on/off text.

- `checked`: Optional. Without it the toggle keeps its own state; pass it (with `onChange`) to control the toggle from your application.

- The `required` prop is available for both the MUI and SDS components.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-switch/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name       | Type              | Default | Description                                                                                          |
| ---------- | ----------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `checked`  | `boolean`         | -       | Controls the toggle. Omit it and the component tracks its own state internally.                      |
| `disabled` | `boolean`         | `false` | If `true`, the component is disabled.                                                                |
| `offLabel` | `string`          | `"Off"` | The text displayed within the InputToggle when it's off.                                             |
| `onLabel`  | `string`          | `"On"`  | The text displayed within the InputToggle when it's on.                                              |
| `onChange` | `(event) => void` | -       | Called whenever the user toggles the component, in either direction.                                 |
| `width`    | `number`          | `62`    | Controls the width of the InputToggle element, in pixels. Increase it when custom labels do not fit. |
