# Button

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Button/index.tsx).

## SDS vs MUI

The following props are available to MUI's Button component, but produce no effect (or unexpected effects) for SDS's Button component, so **it is recommended to not use them**:

- `variant`: This prop is intended to set the Button to either text only, contained, or outlined. With SDS's Button, they do not function as described in the MUI documentation; however, similar effects, specific to SDS's styles, can be achieved through a combination of the SDS-only props: `sdsStyle` and `sdsType` (see details below).

- `color`: SDS's Button does not support the colors or intents that would be expected through this prop. However, the `sdsType` prop can be used to set the button color as `"primary"`, `"secondary"`, or `"destructive"`.

- `disableElevation`: The SDS Button component doesn't have a visual "elevation" or shadowed treatment by default (which this prop disables for MUI's Button). Setting `disableElevation={false}` will not render the MUI default elevation treatment.

Icons can be used in both MUI and SDS Button component, but are called in slightly different ways:

- `startIcon` and `endIcon`: Both of these props are supported by both MUI and SDS's Buttons. However, MUI expects the prop to receive an individual icon as its own component (for example `startIcon={<DeleteIcon />}`), whereas SDS takes the Icon component which references which specific icon to call, as one of its props, as such:

**React TypeScript**

```tsx
startIcon={<Icon sdsIcon="Download" sdsSize="s" />}
```

To render an icon-only button, pass a single Icon component as the button's child instead of using `startIcon` or `endIcon`. The Button detects the icon-only child and adjusts its padding to stay square. Remember to give the button an `aria-label`, since it has no text for screen readers to announce:

**React TypeScript**

```tsx
<Button aria-label="Download">
  <Icon sdsIcon="Download" sdsSize="s" />
</Button>
```

SDS's Button has additional props to allow flexibility while maintaining the SDS styles:

- `sdsStyle`: takes `"solid"` (default, filled), `"outline"`, or `"minimal"` as values

- `sdsType`: takes `"primary"` (default), `"secondary"`, or `"destructive"` as values, and sets the color scheme within the chosen style

- `size`: MUI's `size` prop is supported and takes `"small"`, `"medium"`, or `"large"` (default), driving the button's height, padding, type ramp, and icon size

## MUI Documentation

Documentation for the underlying MUI Button component can be found [here](https://mui.com/material-ui/react-button/).

## Props

Any custom SDS props and MUI props required for implementation are found on the tables below. See the MUI documentation for additional optional props.

| Name                   | Type                                            | Default             | Description                                                                                                                                                                  |
| ---------------------- | ----------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sdsStyle`             | `"solid"` \| `"outline"` \| `"minimal"`         | `"solid"`           | Style of the button, in descending order of emphasis. Solid is filled, outline draws a 1px border over a transparent background, and minimal is text only.                   |
| `sdsType`              | `"primary"` \| `"secondary"` \| `"destructive"` | `"primary"`         | Color scheme of the button within the chosen style. Primary uses the accent color, secondary is neutral, and destructive signals an irreversible action.                     |
| `size`                 | `"small"` \| `"medium"` \| `"large"`            | `"large"`           | Size of the button. Drives the height, padding, type ramp, and icon size, each of which also adapts at the `md` breakpoint.                                                  |
| `backgroundOnHover`    | `bool`                                          | `true`              | Only applies when `sdsStyle` is `"minimal"`. When `false`, the button drops its padding and renders no background on hover or press, so it sits flush with surrounding text. |
| `backgroundAppearance` | `"matchBackground" \| "dark"`                   | `"matchBackground"` | Tells the button which surface it sits on so it can pick colors with enough contrast. Set it to `"dark"` when the button is placed on a dark background in light mode.       |
| `startIcon`            | `ReactNode`                                     | -                   | An icon placed before the label. Pass the SDS Icon component, for example `<Icon sdsIcon="Download" sdsSize="s" />`.                                                         |
| `endIcon`              | `ReactNode`                                     | -                   | An icon placed after the label.                                                                                                                                              |
| `children`             | `ReactNode`                                     | -                   | The button label. Passing a single Icon component as the only child renders an icon-only button, which the component detects and pads symmetrically.                         |
| `disabled`             | `bool`                                          | `false`             | Disables the button when set to `true`.                                                                                                                                      |
| `onClick`              | `(event: React.MouseEvent) => void`             | -                   | Callback fired when the button is clicked.                                                                                                                                   |
| `href`                 | `string`                                        | -                   | Renders the button as an anchor pointing at the given URL. Pair it with `target` to control where the link opens.                                                            |

## Code examples

### **Default Button**

This example has the minimum props needed for the Button component. Without any SDS props it renders as a large, solid, primary button.

**Example: DefaultButton**

```tsx
import { Button } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Button>Label</Button>
    </div>
  );
}

export default App;
```

### Button styles

This example shows the three styles available through `sdsStyle`, from most to least emphasis.

**Example: ButtonStyles**

```tsx
import { Button } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <Button sdsStyle="solid">Solid</Button>
      <Button sdsStyle="outline">Outline</Button>
      <Button sdsStyle="minimal">Minimal</Button>
    </div>
  );
}

export default App;
```

### Button types

This example shows the three color schemes available through `sdsType`. Each one can be combined with any of the styles above.

**Example: ButtonTypes**

```tsx
import { Button } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <Button sdsType="primary">Primary</Button>
      <Button sdsType="secondary">Secondary</Button>
      <Button sdsType="destructive">Destructive</Button>
    </div>
  );
}

export default App;
```

### Button sizes

This example shows the three sizes available through the `size` prop.

**Example: ButtonSizes**

```tsx
import { Button } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{ alignItems: "center", display: "flex", gap: "16px" }}
    >
      <Button size="large">Large</Button>
      <Button size="medium">Medium</Button>
      <Button size="small">Small</Button>
    </div>
  );
}

export default App;
```

### Button + Icon

This example shows a Secondary button component with an icon, placed before the label with `startIcon` and after it with `endIcon`.

**Example: ButtonIcon**

```tsx
import { Button, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <Button
        sdsType="secondary"
        startIcon={<Icon sdsIcon="Download" sdsSize="s" />}
      >
        Download
      </Button>
      <Button
        sdsType="secondary"
        endIcon={<Icon sdsIcon="ChevronRight" sdsSize="s" />}
      >
        Next
      </Button>
    </div>
  );
}

export default App;
```

### Icon Button

This example shows icon-only buttons, created by passing a single Icon component as the button's child. Each one needs an `aria-label`, since there is no text for screen readers to announce.

**Example: IconButton**

```tsx
import { Button, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <Button aria-label="Download">
        <Icon sdsIcon="Download" sdsSize="s" />
      </Button>
      <Button sdsStyle="outline" sdsType="secondary" aria-label="Copy">
        <Icon sdsIcon="Copy" sdsSize="s" />
      </Button>
      <Button sdsStyle="minimal" sdsType="secondary" aria-label="Delete">
        <Icon sdsIcon="TrashCan" sdsSize="s" />
      </Button>
    </div>
  );
}

export default App;
```
