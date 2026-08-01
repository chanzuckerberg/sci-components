# InputRadio

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/InputRadio/index.tsx).

## SDS vs MUI

The following props and options differ in whether and how they function across MUI versus SDS's InputRadio component:

- **size** **:** Has no effect in SDS

- **color** **:** Has no effect in SDS

- **labelPlacement** **:** Has no effect in SDS

- **intent** **:** This is an SDS-specific prop that colors the border of the empty circle (default, positive, notice, or negative). It does not change the selected radio, which always uses the accent color.

- **caption** **:** This is an SDS-specific prop, which takes text that is displayed below the primary label text.

- **stage** **:** This SDS prop sets the radio as checked or unchecked and overrides **checked**. Inside a RadioGroup, leave it out and let the group drive the selection from each radio's **value**.

- **value** **:** Required in practice: a RadioGroup matches it against its own value to decide which radio is selected, and SDS also derives the label and caption element ids from it for screen readers.

- **row** **:** This boolean prop functions the same for both MUI and SDS's InputRadio component: its presence reformats the radio buttons (and their labels) within the RadioGroup parent component into a horizontal row.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-radio-button/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name       | Type                                              | Default   | Description                                                                                                                                                          |
| ---------- | ------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| caption    | ReactNode                                         | -         | The caption of the InputRadio appears beneath the label in a lighter text color.                                                                                     |
| label      | ReactNode                                         | -         | The label of the InputRadio.                                                                                                                                         |
| value      | string                                            | -         | The value a RadioGroup compares against to decide whether this radio is selected. It also backs the label and caption element ids, so give every radio a unique one. |
| radioProps | Partial<MUIRadioProps>                            | {}        | Directly pass these props to the underlying MUI radio.                                                                                                               |
| stage      | "checked" \| "unchecked"                          | -         | Sets the radio as checked or unchecked, overriding checked. Omit it inside a RadioGroup, which drives the selection itself.                                          |
| intent     | "default" \| "notice" \| "negative" \| "positive" | "default" | Colors the border of the empty circle. The selected radio always uses the accent color.                                                                              |
| disabled   | bool                                              | false     | If true, the component is disabled.                                                                                                                                  |
| classes    | object                                            | {}        | Class names for the internal elements: root, labelCaptionContainer, label, caption, radioButton, radioCheckedIcon, radioCheckedIconDot, and radioDefaultIcon.        |

## Code examples

### **Default InputRadio**

This example has the minimum props needed for the InputRadio component.

**Example: DefaultInputRadio**

```tsx
import { InputRadio } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <InputRadio label="Label" value="label" />
    </div>
  );
}

export default App;
```

### InputRadio + Caption

This example shows the InputRadio with an additional caption beneath the label, presented in a lighter text color.

**Example: InputRadioCaption**

```tsx
import { InputRadio } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <InputRadio caption="Caption" label="Label" value="label" />
    </div>
  );
}

export default App;
```

### InputRadio group

Radios are meant to be used as a set. Wrap them in MUI's RadioGroup, which selects the radio whose value matches the group's and handles arrow-key navigation. Add row to lay the options out horizontally.

**Example: InputRadioGroup**

```tsx
// MUI's RadioGroup owns the selection: each InputRadio is checked when its
// `value` matches the group's. `row` lays the options out horizontally.
import { useState } from "react";
import { InputRadio } from "@czi-sds/components";
import { RadioGroup } from "@mui/material";

const OPTIONS = ["Option 1", "Option 2", "Option 3"];

function App() {
  const [value, setValue] = useState(OPTIONS[0]);

  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "24px" }}
    >
      <RadioGroup
        name="vertical-options"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        {OPTIONS.map((option) => (
          <InputRadio key={option} label={option} value={option} />
        ))}
      </RadioGroup>

      {/* SDS removes the side margin MUI puts on labels, so a row needs its
          own gap. */}
      <RadioGroup
        row
        name="row-options"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        sx={{ gap: "24px" }}
      >
        {OPTIONS.map((option) => (
          <InputRadio key={option} label={option} value={option} />
        ))}
      </RadioGroup>
    </div>
  );
}

export default App;
```

### InputRadio intents

Intent colors the border of the empty circle. Select any of these and the dot turns the same accent color.

**Example: InputRadioIntents**

```tsx
// `intent` colors the empty circle only; a selected radio always uses the
// accent color.
import { InputRadio } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "24px" }}>
      <InputRadio label="Default" value="default" intent="default" />
      <InputRadio label="Positive" value="positive" intent="positive" />
      <InputRadio label="Notice" value="notice" intent="notice" />
      <InputRadio label="Negative" value="negative" intent="negative" />
      <InputRadio label="Disabled" value="disabled" disabled />
    </div>
  );
}

export default App;
```
