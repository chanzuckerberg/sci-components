# ButtonDropdown

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/ButtonDropdown/index.tsx).

## SDS vs MUI

The SDS ButtonDropdown component is the regular Button component with a ChevronDown icon added after the label text, via the MUI endIcon prop. The chevron is only added when the button has a label, and its size follows the size prop. A startIcon is optional; when used, it takes the Icon component, which references the specific icon to call as one of its props, like so:

startIcon={<Icon sdsIcon="Download" sdsSize="s" />}

whereas MUI expects the prop to receive an individual icon as its own component (for example startIcon={<DeleteIcon />}).

Because ButtonDropdown renders a Button, it accepts every Button prop except sdsType, which is narrowed to primary and secondary: a dropdown trigger is never a destructive action, and passing destructive logs a warning and renders nothing. The same MUI caveats as Button apply, so variant, color, and disableElevation are all best avoided.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-button/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name      | Type                              | Default   | Description                                                                                                                 |
| --------- | --------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| sdsStyle  | "solid" \| "outline" \| "minimal" | "solid"   | Style of the button. Same values as Button.                                                                                 |
| sdsType   | "primary" \| "secondary"          | "primary" | Color scheme of the button. Unlike Button, destructive is not supported.                                                    |
| size      | "small" \| "medium" \| "large"    | "large"   | Size of the button. Also sets the size of the trailing chevron.                                                             |
| startIcon | ReactNode                         | -         | An optional icon placed before the label. Pass the SDS Icon component, for example <Icon sdsIcon="Download" sdsSize="s" />. |
| children  | ReactNode                         | -         | The button label. The trailing chevron is only rendered when a label is present.                                            |
| disabled  | bool                              | false     | Disables the button when set to true.                                                                                       |
| onClick   | (event: React.MouseEvent) => void | -         | Callback fired when the button is clicked. Typically used to open the associated menu.                                      |

Every other Button prop, such as backgroundOnHover and backgroundAppearance, is supported and behaves identically here.

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
