# MenuItem

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/MenuItem/index.tsx).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name            | Type                                 | Default         | Description                                                                                                                                                                             |
| --------------- | ------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `column`        | `string`                             | -               | The `column` prop determines the content displayed in the right column of the menu item. This content can be customized to provide additional information or context for the menu item. |
| `children`      | `node`                               | -               | Main content of the MenuItem.                                                                                                                                                           |
| `disabled`      | `bool`                               | `false`         | When set to `true`, the `disabled` prop indicates that the menu item is disabled and not interactable.                                                                                  |
| `isMultiSelect` | `bool`                               | `false`         | When `true`, designates that the menu item supports multi-select functionality.                                                                                                         |
| `sdsIcon`       | `func`                               | -               | Allows you to provide a custom SDS icon component to be displayed within the menu item.                                                                                                 |
| `sdsIconProps`  | `func`                               | -               | Enables you to pass additional props to customize the SDS icon within the menu item.                                                                                                    |
| `sdsStyle`      | `"determinate"` \| `"indeterminate"` | `"determinate"` | Determines the style of the menu item, whether it is determinate or indeterminate.                                                                                                      |
| `selected`      | `bool`                               | `false`         | When set to `true`, the `selected` prop signifies that the menu item is currently selected.                                                                                             |

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

**SDS Tip:** MenuItem exclusively accepts SDS Icons in xs and s sizes. To explore a comprehensive list of SDS icons and their available sizes, refer to the [IconBank page](https://chanzuckerberg.github.io/sci-components/?path=/story/components-icon--icon-bank) within Storybook.

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
          count={3}
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
