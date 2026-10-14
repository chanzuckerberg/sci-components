# ButtonGroup

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/ButtonGroup).

## Import

**React TypeScript**

```tsx
import { ButtonGroup } from "@czi-sds/components";
```

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

### ButtonGroup types

This example shows the two color schemes available through `sdsType`. The group paints the buttons in it, so an `sdsType` set on an individual button is overridden.

**Example: ButtonGroupTypes**

```tsx
import { Button, ButtonGroup } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "32px" }}>
      <ButtonGroup sdsType="primary">
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
      </ButtonGroup>

      <ButtonGroup sdsType="secondary">
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
```

### ButtonGroup sizes

This example shows the three sizes available through the `size` prop. The group injects it into every Button and ButtonToggle child, which is what keeps a mixed group at one height.

**Example: ButtonGroupSizes**

```tsx
// The group injects its size into every button in it, so a size set on an
// individual button is overwritten and a mixed group stays at one height.

import { Button, ButtonGroup } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{ alignItems: "center", display: "flex", gap: "32px" }}
    >
      <ButtonGroup size="large">
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
      </ButtonGroup>

      <ButtonGroup size="medium">
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
      </ButtonGroup>

      <ButtonGroup size="small">
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
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

### ButtonGroup with ButtonToggles

This example shows a group of ButtonToggle components rather than Buttons, which turns it from a row of actions into a set of independent switches. Each toggle owns its own state through `sdsStage`.

**Example: ButtonGroupWithButtonToggles**

```tsx
// A group takes ButtonToggle as readily as Button, which turns it from a row of
// actions into a set of switches. Each toggle owns its state through sdsStage.

import { useState } from "react";
import { ButtonGroup, ButtonToggle, Icon } from "@czi-sds/components";

const TOGGLES = [
  { icon: "Search", label: "Search" },
  { icon: "Copy", label: "Copy" },
  { icon: "Code", label: "Code" },
] as const;

function App() {
  const [active, setActive] = useState<Record<string, boolean>>({
    Search: true,
  });

  return (
    <div className="app">
      <ButtonGroup sdsType="secondary">
        {TOGGLES.map(({ icon, label }) => (
          <ButtonToggle
            key={label}
            aria-label={label}
            sdsStage={active[label] ? "on" : "off"}
            sdsStyle="outline"
            startIcon={<Icon sdsIcon={icon} sdsSize="s" />}
            onClick={() =>
              setActive((previous) => ({
                ...previous,
                [label]: !previous[label],
              }))
            }
          />
        ))}
      </ButtonGroup>
    </div>
  );
}

export default App;
```

### Disabled ButtonGroup

This example shows one disabled button inside an otherwise active group, beside a group disabled as a whole. `disabled` on the group reaches every button in it.

**Example: ButtonGroupDisabled**

```tsx
// A single button carries its own disabled prop; disabled on the group reaches
// every button in it.

import { Button, ButtonGroup } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "32px" }}>
      <ButtonGroup sdsType="secondary">
        <Button>Day</Button>
        <Button disabled>Week</Button>
        <Button>Month</Button>
      </ButtonGroup>

      <ButtonGroup disabled sdsType="secondary">
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
```

### ButtonGroup on a dark background

This example shows `backgroundAppearance="dark"`, which tells the group it sits on a dark surface so it can pick borders and text with enough contrast. The group paints no background of its own, so the panel is supplied alongside the prop.

**Example: ButtonGroupOnADarkBackground**

```tsx
// backgroundAppearance tells the group which surface it is on so it can pick
// borders and text with enough contrast. It paints no background of its own, so
// the dark panel below is the page's to supply.

import {
  Button,
  ButtonGroup,
  getCorners,
  getSemanticColors,
  getSpaces,
} from "@czi-sds/components";
import { useTheme } from "@mui/material/styles";

function App() {
  const theme = useTheme();
  const corners = getCorners({ theme });
  const semanticColors = getSemanticColors({ theme });
  const spaces = getSpaces({ theme });

  return (
    <div className="app">
      <div
        style={{
          backgroundColor: semanticColors?.base?.backgroundPrimaryDark,
          borderRadius: corners?.m,
          display: "flex",
          gap: spaces?.xl,
          padding: spaces?.xl,
        }}
      >
        <ButtonGroup backgroundAppearance="dark" sdsType="primary">
          <Button>Day</Button>
          <Button>Week</Button>
          <Button>Month</Button>
        </ButtonGroup>

        <ButtonGroup backgroundAppearance="dark" sdsType="secondary">
          <Button>Day</Button>
          <Button>Week</Button>
          <Button>Month</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default App;
```

## SDS vs MUI

ButtonGroup collects related Button or ButtonToggle components into a single segmented control, joining them with shared borders. It sets MUI's `variant` to `"outlined"` and injects its own `size` into every button in the group, which is why `variant` and `size` are removed from the MUI props it accepts.

Vertical orientation is only honored when every button in the group is icon-only. Requesting it for a group that contains labels logs a warning and falls back to horizontal.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-button-group/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name                   | Type                                 | Default             | Description                                                                                                                                                                                                              |
| ---------------------- | ------------------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `sdsStyle`             | `"outline"`                          | `"outline"`         | Style of the button group. Outline is the only value.                                                                                                                                                                    |
| `sdsType`              | `"primary" \| "secondary"`           | `"primary"`         | Color scheme applied to every button in the group.                                                                                                                                                                       |
| `size`                 | `"small"` \| `"medium"` \| `"large"` | `"large"`           | Size of the group. It is injected into each Button and ButtonToggle child, so setting `size` on an individual button has no effect and a mixed group stays at one height. Anything else in the group keeps its own size. |
| `orientation`          | `"horizontal" \| "vertical"`         | `"horizontal"`      | Direction the buttons are stacked in. Vertical is only available when every button is icon-only.                                                                                                                         |
| `backgroundAppearance` | `"matchBackground" \| "dark"`        | `"matchBackground"` | Tells the group which surface it sits on so it can pick colors with enough contrast.                                                                                                                                     |
| `disabled`             | `boolean`                            | `false`             | MUI's prop, passed down through the group so every button in it is disabled at once.                                                                                                                                     |
| `children`             | `ReactNode`                          | -                   | The Button or ButtonToggle components to group.                                                                                                                                                                          |
