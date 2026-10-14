# ButtonDropdown

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/ButtonDropdown/index.tsx).

## Import

**React TypeScript**

```tsx
import { ButtonDropdown } from "@czi-sds/components";
```

## Code examples

### **Default ButtonDropdown**

This example has the minimum props needed for the ButtonDropdown component.

**Example: DefaultButtonDropdown**

```tsx
import { ButtonDropdown } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <ButtonDropdown>Label</ButtonDropdown>
    </div>
  );
}

export default App;
```

### ButtonDropdown styles

This example shows the three styles available through `sdsStyle`, from most to least emphasis.

**Example: ButtonDropdownStyles**

```tsx
import { ButtonDropdown } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <ButtonDropdown sdsStyle="solid">Solid</ButtonDropdown>
      <ButtonDropdown sdsStyle="outline">Outline</ButtonDropdown>
      <ButtonDropdown sdsStyle="minimal">Minimal</ButtonDropdown>
    </div>
  );
}

export default App;
```

### ButtonDropdown types

This example shows the two color schemes available through `sdsType`. Each one can be combined with any of the styles above. Unlike Button, there is no `"destructive"` type: a dropdown trigger opens a menu rather than carrying out an action.

**Example: ButtonDropdownTypes**

```tsx
import { ButtonDropdown } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <ButtonDropdown sdsType="primary">Primary</ButtonDropdown>
      <ButtonDropdown sdsType="secondary">Secondary</ButtonDropdown>
    </div>
  );
}

export default App;
```

### ButtonDropdown sizes

This example shows the three sizes available through the `size` prop. The trailing chevron follows the size of the button it sits in.

**Example: ButtonDropdownSizes**

```tsx
import { ButtonDropdown } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{ alignItems: "center", display: "flex", gap: "16px" }}
    >
      <ButtonDropdown size="large">Large</ButtonDropdown>
      <ButtonDropdown size="medium">Medium</ButtonDropdown>
      <ButtonDropdown size="small">Small</ButtonDropdown>
    </div>
  );
}

export default App;
```

### ButtonDropdown with a start icon

This example shows how to incorporate a starting icon within a ButtonDropdown component.

**Example: ButtonDropdownWithAStartIcon**

```tsx
import { ButtonDropdown, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <ButtonDropdown
        sdsType="secondary"
        startIcon={<Icon sdsIcon="Bacteria" sdsSize="s" />}
      >
        Bacteria Types
      </ButtonDropdown>
    </div>
  );
}

export default App;
```

### ButtonDropdown without a background on hover

This example shows `backgroundOnHover`, which only applies to the minimal style. Turning it off drops the button's padding along with its hover and pressed backgrounds, so it sits flush with the text around it.

**Example: ButtonDropdownBackgroundOnHover**

```tsx
// backgroundOnHover only applies to the minimal style. Turning it off drops the
// button's padding along with the hover and pressed backgrounds, which is what
// lets it sit flush with the text around it.

import { ButtonDropdown } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "32px" }}>
      <ButtonDropdown sdsStyle="minimal" sdsType="primary">
        Hover for a background
      </ButtonDropdown>

      <ButtonDropdown
        backgroundOnHover={false}
        sdsStyle="minimal"
        sdsType="primary"
      >
        Flush with the text
      </ButtonDropdown>
    </div>
  );
}

export default App;
```

### ButtonDropdown on a dark background

This example shows `backgroundAppearance="dark"`, which tells the button it sits on a dark surface so it can pick colors with enough contrast. The button paints no background of its own, so the panel is supplied alongside the prop.

**Example: ButtonDropdownOnADarkBackground**

```tsx
// backgroundAppearance tells the button which surface it is on so it can pick
// colors with enough contrast. It paints no background of its own, so the dark
// panel below is the page's to supply.

import {
  ButtonDropdown,
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
          gap: spaces?.xl,
          padding: spaces?.xl,
        }}
      >
        <ButtonDropdown backgroundAppearance="dark" sdsStyle="solid">
          Solid
        </ButtonDropdown>

        <ButtonDropdown backgroundAppearance="dark" sdsStyle="outline">
          Outline
        </ButtonDropdown>

        <ButtonDropdown backgroundAppearance="dark" sdsStyle="minimal">
          Minimal
        </ButtonDropdown>
      </div>
    </div>
  );
}

export default App;
```

## SDS vs MUI

The SDS ButtonDropdown component is the regular Button component with a ChevronDown icon added after the label text, via the MUI `endIcon` prop. The chevron is only added when the button has a label, and its size follows the `size` prop. A `startIcon` is optional; when used, it takes the Icon component, which references the specific icon to call as one of its props, like so:

**React TypeScript**

```tsx
startIcon={<Icon sdsIcon="Download" sdsSize="s" />}
```

whereas MUI expects the prop to receive an individual icon as its own component (for example `startIcon={<DeleteIcon />}`).

The chevron is applied after your props, so an `endIcon` passed to a ButtonDropdown is ignored: the trailing slot belongs to the component. Where a different trailing icon is what you are after, use Button and put it there yourself.

Because ButtonDropdown renders a Button, it accepts every Button prop except `sdsType`, which is narrowed to `"primary"` and `"secondary"`: a dropdown trigger is never a destructive action, and passing `"destructive"` logs a warning and renders nothing. The same MUI caveats as Button apply, so `variant`, `color`, and `disableElevation` are all best avoided.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-button/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name                   | Type                                    | Default             | Description                                                                                                                                                                  |
| ---------------------- | --------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sdsStyle`             | `"solid"` \| `"outline"` \| `"minimal"` | `"solid"`           | Style of the button. Same values as Button.                                                                                                                                  |
| `sdsType`              | `"primary" \| "secondary"`              | `"primary"`         | Color scheme of the button. Unlike Button, `"destructive"` is not supported.                                                                                                 |
| `size`                 | `"small"` \| `"medium"` \| `"large"`    | `"large"`           | Size of the button. Also sets the size of the trailing chevron.                                                                                                              |
| `backgroundOnHover`    | `boolean`                               | `true`              | Only applies when `sdsStyle` is `"minimal"`. When `false`, the button drops its padding and renders no background on hover or press, so it sits flush with surrounding text. |
| `backgroundAppearance` | `"matchBackground" \| "dark"`           | `"matchBackground"` | Tells the button which surface it sits on so it can pick colors with enough contrast. Set it to `"dark"` when the button is placed on a dark background in light mode.       |
| `startIcon`            | `ReactNode`                             | -                   | An optional icon placed before the label. Pass the SDS Icon component, for example `<Icon sdsIcon="Download" sdsSize="s" />`.                                                |
| `children`             | `ReactNode`                             | -                   | The button label. The trailing chevron is only rendered when a label is present.                                                                                             |
| `disabled`             | `boolean`                               | `false`             | Disables the button when set to `true`.                                                                                                                                      |
| `onClick`              | `(event: React.MouseEvent) => void`     | -                   | Callback fired when the button is clicked. Typically used to open the associated menu.                                                                                       |

Everything else Button accepts passes through unchanged and behaves identically here, including its `href` and `target` props and MUI's own, such as `sx` and `className`. The one exception is `endIcon`, which the chevron overwrites, as noted above.
