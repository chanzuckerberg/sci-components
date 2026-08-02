# ButtonToggle

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/ButtonToggle).

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-button/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name        | Type                                    | Default     | Description                                                                                                                                                            |
| ----------- | --------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `startIcon` | `ReactElement`                          | -           | **Required.** The icon displayed within the component. Pass the SDS Icon component, for example `<Icon sdsIcon="Search" sdsSize="s" />`.                               |
| `sdsStage`  | `"on"` \| `"off"`                       | `"off"`     | Controls the toggle stage. The component is fully controlled, so keep this value in state and update it from `onClick`.                                                |
| `sdsStyle`  | `"solid"` \| `"outline"` \| `"minimal"` | `"solid"`   | Style of the button. ButtonToggle inherits Button's default of `"solid"`, but toggles are designed around `"outline"` and `"minimal"`, so set one of those explicitly. |
| `sdsType`   | `"primary" \| "secondary"`              | `"primary"` | Color scheme of the button. Primary uses the accent color in the on stage, secondary stays neutral.                                                                    |
| `size`      | `"small"` \| `"medium"` \| `"large"`    | `"large"`   | Size of the button.                                                                                                                                                    |
| `disabled`  | `bool`                                  | `false`     | Disables the toggle button when set to `true`.                                                                                                                         |
| `onClick`   | `(event: React.MouseEvent) => void`     | -           | Callback fired when the button is clicked.                                                                                                                             |

ButtonToggle always renders with `backgroundOnHover` enabled and ignores `endIcon`, which is reserved for the toggle's own styling.

## Code examples

### **Default ButtonToggle**

This example has the minimum props needed for the ButtonToggle component. Because `sdsStage` is controlled, the on and off stages are driven from state.

**Example: DefaultButtonToggle**

```tsx
import * as React from "react";
import { ButtonToggle, Icon } from "@czi-sds/components";

function App() {
  const [toggle, setToggle] = React.useState(false);

  return (
    <div className="app">
      <ButtonToggle
        sdsStyle="outline"
        sdsStage={toggle ? "on" : "off"}
        startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
        onClick={() => setToggle((prev) => !prev)}
      >
        Label
      </ButtonToggle>
    </div>
  );
}

export default App;
```

### Toggles in a ButtonGroup

This example shows icon-only toggles collected into a ButtonGroup, each tracking its own stage.

**Example: ButtonToggleGroup**

```tsx
import * as React from "react";
import { ButtonGroup, ButtonToggle, Icon } from "@czi-sds/components";

const TOGGLES = [
  { icon: "Search", label: "Search" },
  { icon: "Copy", label: "Copy" },
  { icon: "Code", label: "Code" },
] as const;

function App() {
  const [active, setActive] = React.useState<Record<string, boolean>>({});

  return (
    <div className="app">
      <ButtonGroup sdsType="secondary">
        {TOGGLES.map(({ icon, label }) => (
          <ButtonToggle
            key={label}
            aria-label={label}
            sdsStyle="outline"
            sdsType="secondary"
            sdsStage={active[label] ? "on" : "off"}
            startIcon={<Icon sdsIcon={icon} sdsSize="s" />}
            onClick={() =>
              setActive((prev) => ({ ...prev, [label]: !prev[label] }))
            }
          />
        ))}
      </ButtonGroup>
    </div>
  );
}

export default App;
```
