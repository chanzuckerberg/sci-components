# MenuItem

> **MenuItem is one row of a dropdown.** You write these yourself to fill a Menu; everywhere else in the family the row is drawn for you, from the options you pass, and you only reach for this component to replace it. The Dropdowns overview covers which component draws which part.

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/MenuItem/index.tsx).

## Import

**React TypeScript**

```tsx
import { MenuItem } from "@czi-sds/components";
```

## Code Examples

### **Default MenuItem**

This example shows the minimum props needed for rendering a MenuItem.

**Example: DefaultMenuItem**

```tsx
import { MenuItem } from "@czi-sds/components";
import { MenuList } from "@mui/material";

function App() {
  return (
    <div className="app">
      <MenuList>
        <MenuItem>MenuItem 1</MenuItem>
      </MenuList>
    </div>
  );
}

export default App;
```

### **Multi-Select MenuItem with Icon**

This example showcases a multi-select MenuItem component featuring an SDS Icon and a distinct column value.

> **SDS Tip:** MenuItem exclusively accepts SDS Icons in xs and s sizes. To explore a comprehensive list of SDS icons and their available sizes, refer to the [IconBank page](https://chanzuckerberg.github.io/sci-components/?path=/story/components-icon--icon-bank) within Storybook.

**Example: MultiSelectMenuItemWithIcon**

```tsx
import { useState } from "react";
import { MenuItem } from "@czi-sds/components";
import { MenuList } from "@mui/material";

function App() {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected((prev) => !prev);
  };

  return (
    <div className="app">
      <MenuList>
        <MenuItem
          isMultiSelect
          column="Column Value"
          sdsIcon="Gear"
          sdsIconProps={{
            color: "purple",
          }}
          selected={selected}
          onClick={handleClick}
        >
          MenuItem 1
        </MenuItem>
      </MenuList>
    </div>
  );
}

export default App;
```

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name            | Type                                 | Default         | Description                                                                                                                                                                             |
| --------------- | ------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `column`        | `ReactNode`                          | -               | The `column` prop determines the content displayed in the right column of the menu item. This content can be customized to provide additional information or context for the menu item. |
| `children`      | `ReactNode`                          | -               | Main content of the MenuItem.                                                                                                                                                           |
| `disabled`      | `boolean`                            | `false`         | When set to `true`, the `disabled` prop indicates that the menu item is disabled and not interactable.                                                                                  |
| `isMultiSelect` | `boolean`                            | `false`         | When `true`, designates that the menu item supports multi-select functionality.                                                                                                         |
| `icon`          | `IconName` \| `ReactElement`         | -               | The icon shown at the start of the item, either the name of an SDS icon or an element of your own. Only icons that come in a small size can be named here.                              |
| `sdsIcon`       | `IconName` \| `ReactElement`         | -               | **Deprecated.** Use `icon` instead. It is the former name of that prop, kept until the next major version, and `icon` wins where both are given.                                        |
| `sdsIconProps`  | `function`                           | -               | Enables you to pass additional props to customize the SDS icon within the menu item.                                                                                                    |
| `sdsStyle`      | `"determinate"` \| `"indeterminate"` | `"determinate"` | Determines the style of the menu item, whether it is determinate or indeterminate.                                                                                                      |
| `sdsType`       | `"default"` \| `"action"`            | `"default"`     | An `"action"` item leaves out the selection mark at its start, for a menu whose items run a command rather than choose a value.                                                         |
| `selected`      | `boolean`                            | `false`         | When set to `true`, the `selected` prop signifies that the menu item is currently selected.                                                                                             |
