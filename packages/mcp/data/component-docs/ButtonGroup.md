# ButtonGroup

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/ButtonGroup).

## SDS vs MUI

ButtonGroup collects related Button or ButtonToggle components into a single segmented control, joining them with shared borders. It sets MUI's `variant` to `"outlined"` and injects its own `size` into every Button child, which is why `variant` and `size` are removed from the MUI props it accepts.

Vertical orientation is only honored when every button in the group is icon-only. Requesting it for a group that contains labels logs a warning and falls back to horizontal.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-button-group/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name                   | Type                                 | Default             | Description                                                                                                          |
| ---------------------- | ------------------------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `sdsStyle`             | `"outline"`                          | `"outline"`         | Style of the button group. Outline is the only value.                                                                |
| `sdsType`              | `"primary" \| "secondary"`           | `"primary"`         | Color scheme applied to every button in the group.                                                                   |
| `size`                 | `"small"` \| `"medium"` \| `"large"` | `"large"`           | Size of the group. It is injected into each Button child, so setting `size` on the individual buttons has no effect. |
| `orientation`          | `"horizontal" \| "vertical"`         | `"horizontal"`      | Direction the buttons are stacked in. Vertical is only available when every button is icon-only.                     |
| `backgroundAppearance` | `"matchBackground" \| "dark"`        | `"matchBackground"` | Tells the group which surface it sits on so it can pick colors with enough contrast.                                 |
| `children`             | `ReactNode`                          | -                   | The Button or ButtonToggle components to group.                                                                      |

## Code examples

### **Default ButtonGroup**

This example has the minimum props needed for the ButtonGroup component. Buttons can mix icon-only, icon plus label, and label-only content.

**Example: DefaultButtonGroup**

```tsx
import { Button, ButtonGroup, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <ButtonGroup>
        <Button aria-label="Download">
          <Icon sdsIcon="Download" sdsSize="s" />
        </Button>
        <Button startIcon={<Icon sdsIcon="Copy" sdsSize="s" />}>Copy</Button>
        <Button>Label</Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
```

### Icon-only ButtonGroup

This example shows an icon-only group in both orientations. Vertical is only available because none of the buttons carry a label.

**Example: ButtonGroupIconOnly**

```tsx
// Vertical orientation is only honored when every button is icon-only

import { Button, ButtonGroup, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "32px" }}>
      <ButtonGroup sdsType="secondary">
        <Button aria-label="Search">
          <Icon sdsIcon="Search" sdsSize="s" />
        </Button>
        <Button aria-label="Edit">
          <Icon sdsIcon="Edit" sdsSize="s" />
        </Button>
        <Button aria-label="Delete">
          <Icon sdsIcon="TrashCan" sdsSize="s" />
        </Button>
      </ButtonGroup>

      <ButtonGroup sdsType="secondary" orientation="vertical">
        <Button aria-label="Search">
          <Icon sdsIcon="Search" sdsSize="s" />
        </Button>
        <Button aria-label="Edit">
          <Icon sdsIcon="Edit" sdsSize="s" />
        </Button>
        <Button aria-label="Delete">
          <Icon sdsIcon="TrashCan" sdsSize="s" />
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
```
