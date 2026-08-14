# ButtonToggle

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/ButtonToggle).

## Import

**React TypeScript**

```tsx
import { ButtonToggle } from "@czi-sds/components";
```

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
        sdsType="primary"
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

### ButtonToggle styles

This example shows the two styles a toggle is designed around, `"outline"` and `"minimal"`, in both stages. `sdsStyle` also accepts Button's `"solid"`, which has no toggle treatment of its own, so set one of these two explicitly rather than taking the inherited default.

**Example: ButtonToggleStyles**

```tsx
// Toggles are designed around the outline and minimal styles. sdsStyle also
// accepts Button's "solid", which has no toggle treatment of its own, so set one
// of these two explicitly rather than taking the inherited default.
//
// sdsType is set explicitly for the same reason: the on stage resolves its colors
// before Button applies its own default, so leaving it out draws the neutral
// treatment over a button that is otherwise primary.
//
// The stages below are fixed rather than driven from state, so both can be seen
// without clicking.

import { ButtonToggle, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <ButtonToggle
        sdsStage="off"
        sdsStyle="outline"
        sdsType="primary"
        startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
      >
        Outline off
      </ButtonToggle>

      <ButtonToggle
        sdsStage="on"
        sdsStyle="outline"
        sdsType="primary"
        startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
      >
        Outline on
      </ButtonToggle>

      <ButtonToggle
        sdsStage="off"
        sdsStyle="minimal"
        sdsType="primary"
        startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
      >
        Minimal off
      </ButtonToggle>

      <ButtonToggle
        sdsStage="on"
        sdsStyle="minimal"
        sdsType="primary"
        startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
      >
        Minimal on
      </ButtonToggle>
    </div>
  );
}

export default App;
```

### ButtonToggle types

This example shows the two color schemes available through `sdsType`, which is what decides how the on stage reads: primary fills with the accent color, secondary stays neutral.

**Example: ButtonToggleTypes**

```tsx
// The type decides what the on stage looks like: primary fills with the accent
// color, secondary stays neutral. Both stages are shown for each.

import { ButtonToggle, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <ButtonToggle
        sdsStage="off"
        sdsStyle="outline"
        sdsType="primary"
        startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
      >
        Primary off
      </ButtonToggle>

      <ButtonToggle
        sdsStage="on"
        sdsStyle="outline"
        sdsType="primary"
        startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
      >
        Primary on
      </ButtonToggle>

      <ButtonToggle
        sdsStage="off"
        sdsStyle="outline"
        sdsType="secondary"
        startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
      >
        Secondary off
      </ButtonToggle>

      <ButtonToggle
        sdsStage="on"
        sdsStyle="outline"
        sdsType="secondary"
        startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
      >
        Secondary on
      </ButtonToggle>
    </div>
  );
}

export default App;
```

### ButtonToggle sizes

This example shows the three sizes available through the `size` prop.

**Example: ButtonToggleSizes**

```tsx
import { ButtonToggle, Icon } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{ alignItems: "center", display: "flex", gap: "16px" }}
    >
      <ButtonToggle
        size="large"
        sdsStyle="outline"
        startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
      >
        Large
      </ButtonToggle>

      <ButtonToggle
        size="medium"
        sdsStyle="outline"
        startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
      >
        Medium
      </ButtonToggle>

      <ButtonToggle
        size="small"
        sdsStyle="outline"
        startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
      >
        Small
      </ButtonToggle>
    </div>
  );
}

export default App;
```

### Icon-only ButtonToggle

This example shows the form a toggle usually takes. Leaving `children` out is what makes it square, and since there is then no text for a screen reader to announce, each one needs an `aria-label`.

**Example: ButtonToggleIconOnly**

```tsx
// Leaving children out is what makes a toggle square, and it is the form a
// toggle usually takes. There is then no text for a screen reader to announce,
// so each one needs an aria-label of its own.

import { useState } from "react";
import { ButtonToggle, Icon } from "@czi-sds/components";

function App() {
  const [labels, setLabels] = useState(true);
  const [filters, setFilters] = useState(false);

  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <ButtonToggle
        aria-label="Show labels"
        sdsStage={labels ? "on" : "off"}
        sdsStyle="outline"
        sdsType="primary"
        startIcon={<Icon sdsIcon="EyeOpen" sdsSize="s" />}
        onClick={() => setLabels((previous) => !previous)}
      />

      <ButtonToggle
        aria-label="Show filters"
        sdsStage={filters ? "on" : "off"}
        sdsStyle="outline"
        sdsType="primary"
        startIcon={<Icon sdsIcon="Filter" sdsSize="s" />}
        onClick={() => setFilters((previous) => !previous)}
      />
    </div>
  );
}

export default App;
```

### ButtonToggle on a dark background

This example shows `backgroundAppearance="dark"`, which tells the toggle it sits on a dark surface so it can pick colors with enough contrast in both stages. The toggle paints no background of its own, so the panel is supplied alongside the prop.

**Example: ButtonToggleOnADarkBackground**

```tsx
// backgroundAppearance tells the toggle which surface it is on so it can pick
// colors with enough contrast, in both stages. It paints no background of its
// own, so the dark panel below is the page's to supply.

import {
  ButtonToggle,
  Icon,
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
          alignItems: "center",
          backgroundColor: semanticColors?.base?.backgroundPrimaryDark,
          borderRadius: corners?.m,
          display: "flex",
          gap: spaces?.l,
          padding: spaces?.xl,
        }}
      >
        <ButtonToggle
          backgroundAppearance="dark"
          sdsStage="off"
          sdsStyle="outline"
          sdsType="primary"
          startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
        >
          Off
        </ButtonToggle>

        <ButtonToggle
          backgroundAppearance="dark"
          sdsStage="on"
          sdsStyle="outline"
          sdsType="primary"
          startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
        >
          On
        </ButtonToggle>

        <ButtonToggle
          backgroundAppearance="dark"
          sdsStage="on"
          sdsStyle="minimal"
          sdsType="primary"
          startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
        >
          Minimal on
        </ButtonToggle>
      </div>
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

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-button/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name                   | Type                                    | Default             | Description                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------- | --------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `startIcon`            | `ReactElement`                          | -                   | **Required.** The icon displayed within the component. Pass the SDS Icon component, for example `<Icon sdsIcon="Search" sdsSize="s" />`.                                                                                                                                                                                                                                                             |
| `sdsStage`             | `"on"` \| `"off"`                       | `"off"`             | Controls the toggle stage. The component is fully controlled, so keep this value in state and update it from `onClick`.                                                                                                                                                                                                                                                                              |
| `sdsStyle`             | `"solid"` \| `"outline"` \| `"minimal"` | `"solid"`           | Style of the button. ButtonToggle inherits Button's default of `"solid"`, but toggles are designed around `"outline"` and `"minimal"`, so set one of those explicitly.                                                                                                                                                                                                                               |
| `sdsType`              | `"primary" \| "secondary"`              | `"primary"`         | Color scheme of the button. Primary uses the accent color in the on stage, secondary stays neutral. Set it explicitly: the on stage resolves its colors before Button applies this default, so an omitted value draws the neutral treatment over a button that is otherwise primary. Button's `"destructive"` is inherited by the type but has no on-stage treatment, so it should not be used here. |
| `size`                 | `"small"` \| `"medium"` \| `"large"`    | `"large"`           | Size of the button.                                                                                                                                                                                                                                                                                                                                                                                  |
| `disabled`             | `boolean`                               | `false`             | Disables the toggle button when set to `true`.                                                                                                                                                                                                                                                                                                                                                       |
| `backgroundAppearance` | `"matchBackground"` \| `"dark"`         | `"matchBackground"` | Button's prop, telling the toggle which surface it sits on so it can pick colors with enough contrast.                                                                                                                                                                                                                                                                                               |
| `children`             | `ReactNode`                             | -                   | Text beside the icon. A toggle is normally icon-only, and leaving this out is what makes it square.                                                                                                                                                                                                                                                                                                  |
| `onClick`              | `(event: React.MouseEvent) => void`     | -                   | Callback fired when the button is clicked.                                                                                                                                                                                                                                                                                                                                                           |

ButtonToggle always renders with `backgroundOnHover` enabled and ignores `endIcon`, which is reserved for the toggle's own styling.
