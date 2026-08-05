# InputCheckbox

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/InputCheckbox/index.tsx).

## Import

**React TypeScript**

```tsx
import { InputCheckbox } from "@czi-sds/components";
```

## Code examples

### **Default InputCheckbox**

This example has the minimum props needed for the InputCheckbox component.

**Example: DefaultInputCheckbox**

```tsx
import { InputCheckbox } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <InputCheckbox label="Label" />
    </div>
  );
}

export default App;
```

### InputCheckbox + Caption

This example shows the InputCheckbox with an additional caption beneath the label, presented in a lighter text color.

**Example: InputCheckboxCaption**

```tsx
import { InputCheckbox } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <InputCheckbox caption="Caption" label="Label" />
    </div>
  );
}

export default App;
```

### InputCheckbox stages

The three stages a checkbox can be in, plus a disabled one. Because `stage` pins the state, these examples do not respond to clicks.

**Example: InputCheckboxStages**

```tsx
// `stage` pins the state, so pair it with `onChange` when the checkbox
// needs to respond to clicks.
import { InputCheckbox } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "8px" }}
    >
      <InputCheckbox label="Unchecked" stage="unchecked" />
      <InputCheckbox label="Checked" stage="checked" />
      <InputCheckbox label="Indeterminate" stage="indeterminate" />
      <InputCheckbox label="Disabled" stage="checked" disabled />
    </div>
  );
}

export default App;
```

### InputCheckbox intents

Intent colors the border of the empty box. Check any of these and the box turns the same accent color.

**Example: InputCheckboxIntents**

```tsx
// `intent` colors the empty box only; a checked box always uses the accent color.
import { InputCheckbox } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "24px" }}>
      <InputCheckbox label="Default" intent="default" />
      <InputCheckbox label="Positive" intent="positive" />
      <InputCheckbox label="Notice" intent="notice" />
      <InputCheckbox label="Negative" intent="negative" />
    </div>
  );
}

export default App;
```

### Indeterminate Checkbox

This example demonstrates a parent checkbox that is indeterminate while only some of its children are checked, and checked once all of them are. Since it recomputes `stage` from its own state on every change, the checkboxes stay interactive.

**Example: IndeterminateCheckbox**

```tsx
import { useState } from "react";
import { InputCheckbox } from "@czi-sds/components";

const CHILDREN = ["Child 1", "Child 2"];

function App() {
  const [checked, setChecked] = useState([true, false]);

  const allChecked = checked.every(Boolean);
  const someChecked = checked.some(Boolean);

  return (
    <div className="app">
      <InputCheckbox
        label="Parent"
        stage={
          allChecked ? "checked" : someChecked ? "indeterminate" : "unchecked"
        }
        onChange={() => setChecked(checked.map(() => !allChecked))}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "24px",
        }}
      >
        {CHILDREN.map((label, index) => (
          <InputCheckbox
            key={label}
            label={label}
            stage={checked[index] ? "checked" : "unchecked"}
            onChange={() =>
              setChecked((previous) =>
                previous.map((value, position) =>
                  position === index ? !value : value
                )
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

export default App;
```

## SDS vs MUI

The following props and options differ in how they function across the MUI Checkbox component and the SDS InputCheckbox component:

- `size`: Has no effect in SDS. The box is always 16px.

- `color`: Not accepted. SDS derives the color from `intent` instead.

- `intent`: This is an SDS-specific prop that colors the border of the empty box (`"default"`, `"positive"`, `"notice"`, or `"negative"`). It does not change the checked box, which always uses the accent color.

- `labelPlacement`: Has no effect in SDS. The label always sits to the right of the box.

- `icon`: SDS's InputCheckbox is not currently set up to support icons (if you add one as shown in the [MUI documentation](https://mui.com/material-ui/react-checkbox/#icon), it will replace the empty checkbox square, but clicking the icon will result in the checked checkbox square appearing in the icon's place)

- `stage` and checkbox state: This is the SDS prop that sets the checkbox's state as `"unchecked"`, `"checked"`, or `"indeterminate"`. It pins the state, so on its own the checkbox will not respond to clicks; pass an `onChange` handler and recompute `stage` from your own state to make it interactive, as the indeterminate example below does. Leave `stage` out entirely to let the checkbox manage its own state.

- `defaultChecked` and `indeterminate`: Not accepted as top-level props. Use `stage`, or pass them straight to the underlying MUI checkbox through `checkboxProps`.

- `caption`: This is an SDS-specific prop, which takes a string of text that is displayed below the primary label text.

The following props are available for both the MUI and SDS components: `checked`, `onChange`, `required`, `value`, and `disabled`.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-checkbox/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name            | Type                                                      | Default     | Description                                                                                                                                                                                                    |
| --------------- | --------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `caption`       | `string`                                                  | -           | The caption of the InputCheckbox appears beneath the label in a lighter text color.                                                                                                                            |
| `checkboxProps` | `Partial<MUICheckboxProps>`                               | `{}`        | Directly pass these props to the underlying MUI checkbox.                                                                                                                                                      |
| `label`         | `ReactNode`                                               | -           | The label of the InputCheckbox. When omitted, the box renders on its own with no label element.                                                                                                                |
| `stage`         | `"checked"` \| `"unchecked"` \| `"indeterminate"`         | -           | Sets the state of the checkbox. It overrides `checked`, so a checkbox with a `stage` only changes when you recompute the `stage` from an `onChange` handler. Omit it to let the checkbox manage its own state. |
| `intent`        | `"default"` \| `"notice"` \| `"negative"` \| `"positive"` | `"default"` | Colors the border of the empty box. The checked box always uses the accent color.                                                                                                                              |
| `checked`       | `boolean`                                                 | -           | Controls the checkbox, as in MUI. Ignored when `stage` is set.                                                                                                                                                 |
| `onChange`      | `(event, checked) => void`                                | -           | Called when the user toggles the checkbox.                                                                                                                                                                     |
| `disabled`      | `boolean`                                                 | `false`     | If `true`, the component is disabled.                                                                                                                                                                          |
| `classes`       | `object`                                                  | `{}`        | Class names for the internal elements: `root`, `labelCaptionContainer`, `label`, `caption`, `checkbox`, `checkboxCheckedIcon`, `checkboxDefaultIcon`, and `checkboxIndeterminateIcon`.                         |
