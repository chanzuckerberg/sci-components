# Menu

A surface of choices that opens from the element the user clicked, for actions and options that do not warrant a permanent place in the layout.

> **Menu is not DropdownMenu.** Menu is the simplest dropdown the system has, a restyling of Material UI's own: its rows are commands you write yourself, and picking one runs an action and leaves nothing behind. DropdownMenu is for choosing a value the app keeps, from options passed as data. If what the user picks has to be read back out afterwards, it is not a Menu; the Dropdowns overview sets the two side by side.

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Menu/index.tsx).

## Import

**React TypeScript**

```tsx
import { Menu } from "@czi-sds/components";
```

## Code examples

### **Default Menu**

The least a menu needs: an anchor kept in state, an `open` derived from it, and an `onClose` that clears it. The items are commands, so each one clears the anchor as well and the menu closes behind it.

**Example: DefaultMenu**

```tsx
// A Menu anchored to the button that opens it: `anchorEl` places the surface,
// `open` drives its visibility, and `onClose` handles the backdrop click and
// the Esc key. Each item closes the Menu itself.

import { useState } from "react";
import { Button, Menu, MenuItem } from "@czi-sds/components";

function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  return (
    <div className="app">
      <Button
        id="default-menu-button"
        sdsStyle="minimal"
        sdsType="primary"
        aria-controls={isOpen ? "default-menu" : undefined}
        aria-expanded={isOpen || undefined}
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        Open Menu
      </Button>

      <Menu
        id="default-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        slotProps={{ list: { "aria-labelledby": "default-menu-button" } }}
      >
        <MenuItem sdsType="action" onClick={handleClose}>
          Contact us
        </MenuItem>
        <MenuItem sdsType="action" onClick={handleClose}>
          Terms of Use
        </MenuItem>
        <MenuItem sdsType="action" onClick={handleClose}>
          Privacy Policy
        </MenuItem>
        <MenuItem sdsType="action" onClick={handleClose}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default App;
```

### **Menu placement**

A menu wider than its trigger, or one opened from something near the edge of the window, often reads better aligned to an edge than centered. Pairing the right edge of the anchor with the right edge of the menu moves it there without any positioning code of your own.

**Example: MenuPlacement**

```tsx
// `anchorOrigin` picks the point on the trigger the Menu grows from, and
// `transformOrigin` the corner of the Menu that meets it. Pairing right edges
// keeps the surface aligned with the end of the button instead of centered
// under it.

import { useState } from "react";
import { Button, Menu, MenuItem } from "@czi-sds/components";

function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  return (
    <div className="app">
      <Button
        id="placement-menu-button"
        sdsStyle="outline"
        sdsType="primary"
        aria-controls={isOpen ? "placement-menu" : undefined}
        aria-expanded={isOpen || undefined}
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        Right aligned Menu
      </Button>

      <Menu
        id="placement-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={isOpen}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        onClose={handleClose}
        slotProps={{ list: { "aria-labelledby": "placement-menu-button" } }}
      >
        <MenuItem sdsType="action" onClick={handleClose}>
          Rename
        </MenuItem>
        <MenuItem sdsType="action" onClick={handleClose}>
          Duplicate
        </MenuItem>
        <MenuItem disabled sdsType="action" onClick={handleClose}>
          Archive
        </MenuItem>
      </Menu>
    </div>
  );
}

export default App;
```

### **Menu with selectable items**

Selection state lives outside the menu. Passing `isMultiSelect` and `selected` to each MenuItem draws the checkmarks, and leaving the close out of the item handlers keeps the menu open so several options can be set in one visit.

**Example: MenuWithSelectableItems**

```tsx
// Menu itself has no notion of a selected value: MenuItem draws the state and
// the surrounding component owns it. Because closing only happens when
// something calls `onClose`, items that toggle a selection leave the Menu open
// for the next one.

import { useState } from "react";
import { Button, Menu, MenuItem } from "@czi-sds/components";

const ORGANISMS = [
  { count: "12,480", name: "Homo sapiens" },
  { count: "8,213", name: "Mus musculus" },
  { count: "3,006", name: "Danio rerio" },
];

function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selected, setSelected] = useState<string[]>(["Homo sapiens"]);
  const isOpen = Boolean(anchorEl);

  const toggle = (name: string) => {
    setSelected((previous) =>
      previous.includes(name)
        ? previous.filter((item) => item !== name)
        : [...previous, name]
    );
  };

  return (
    <div className="app">
      <Button
        id="selection-menu-button"
        sdsStyle="minimal"
        sdsType="primary"
        aria-controls={isOpen ? "selection-menu" : undefined}
        aria-expanded={isOpen || undefined}
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        {`Organism (${selected.length})`}
      </Button>

      <Menu
        id="selection-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={() => setAnchorEl(null)}
        slotProps={{ list: { "aria-labelledby": "selection-menu-button" } }}
      >
        {ORGANISMS.map((organism) => (
          <MenuItem
            key={organism.name}
            isMultiSelect
            column={organism.count}
            selected={selected.includes(organism.name)}
            onClick={() => toggle(organism.name)}
          >
            {organism.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default App;
```

## SDS vs MUI

SDS Menu is a thin wrapper around MUI's Menu. `MenuProps` is MUI's own type re-exported unchanged, so there are no sds-prefixed props and everything in the MUI documentation applies. What SDS contributes is two positioning defaults and the styling of the paper the items sit on:

- `anchorOrigin`: set to `{ vertical: "bottom", horizontal: "center" }`, where MUI's default is `"top"` / `"left"`. An SDS menu therefore opens below its anchor rather than on top of it.

- `transformOrigin`: set to `{ vertical: "top", horizontal: "center" }`, so the two center points meet and the menu hangs centered under its trigger.

- **Both defaults are spread before your props,** which means each one is replaced whole rather than merged. The two are a pair, so repositioning a menu is a matter of passing both, as the placement example below does.

- **The paper is restyled:** the surface color comes from the theme's `surfacePrimary`, the corners are the `l` radius, and there is an `xs` inset around the items. SDS also sets `background-image: none`, which removes the tint MUI's Paper paints over surfaces in dark mode.

- **The list loses its own padding,** so the space around the items is the paper's inset alone and the first and last item sit as close to the edge as the ones on either side.

- **Its children are SDS MenuItems.** Menu draws the surface and nothing within it, so the appearance of a row (its icon, its right hand column, its selected state) belongs to MenuItem.

> **SDS Tip:** Reach for Menu when the choices are commands, or a short list of options anchored to a trigger. When the user is picking a value that the trigger should then display, and especially when the list needs search, sections, or Apply and Cancel buttons, use Dropdown instead.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-menu/), and its full API [here](https://mui.com/material-ui/api/menu/).

## Anchoring and state

Menu is controlled: it renders when `open` is `true`, positions itself against the element passed as `anchorEl`, and asks to be dismissed through `onClose`. Holding the anchor element in state covers all three, since whether there is an anchor is also whether the menu is open.

**React TypeScript**

```tsx
const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

<Button onClick={(event) => setAnchorEl(event.currentTarget)}>Open Menu</Button>

<Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={() => setAnchorEl(null)}
>
  <MenuItem sdsType="action" onClick={() => setAnchorEl(null)}>
    Rename
  </MenuItem>
</Menu>
```

## Behavior and accessibility

- A Menu is a Popover holding a list, and a Popover is built on MUI's Modal. It renders in a portal at the end of the document, traps focus while it is open, hides the rest of the page from assistive technology, and locks the page's scroll.

- `onClose` is called with the event and a reason: `"backdropClick"`, `"escapeKeyDown"`, or `"tabKeyDown"`. It is never called for a click on an item. Closing on selection is the item's own `onClick`, which is what lets a menu of toggles stay open while several are set.

- **anchorEl has to be state, not a ref.** The menu measures the anchor while rendering, so it needs a render to happen once the element is known. Storing the trigger in a ref leaves the menu with nothing to measure on the first open.

- Opening a menu moves focus into it. The arrow keys walk the items, Home and End jump to the ends, and typing a letter moves to the next item whose text starts with it. Disabled items are skipped.

- `variant` decides where that focus lands. The default, `"selectedMenu"`, starts on the selected item, which is right for a menu that reflects a current value; pass `"menu"` to always start at the top.

- Give the trigger `aria-haspopup`, `aria-controls` pointing at the menu's id, and `aria-expanded` while it is open, then name the list with `slotProps.list` and an `aria-labelledby` that points back at the trigger.

- The list is a `role="menu"` of `role="menuitem"` children, which describes a set of commands. A menu used to choose values instead is a listbox: pass `role="listbox"` through `slotProps.list` and give each MenuItem `role="option"` with an `aria-selected`.

- Nothing is rendered while `open` is `false`, so the items are mounted fresh on each open. Pass `keepMounted` to keep them in the document instead, which is worth it when the list is expensive to build or has to stay findable by an in-page search.

- A menu longer than the window scrolls within its own paper. Where the number of items is unbounded, cap the height through `slotProps.paper` so the surface is the same size whatever it holds.

## Props

Menu takes MUI's props and adds none of its own. The ones needed to get a menu working, and those whose SDS defaults differ from MUI's, are listed below. See the MUI documentation for the rest.

| Name                 | Type                                                                                                           | Default                                        | Description                                                                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`               | `boolean`                                                                                                      | -                                              | Required. Whether the menu is shown. Usually derived from whether an anchor has been recorded.                                                                       |
| `anchorEl`           | `HTMLElement \| (() => HTMLElement) \| null`                                                                   | -                                              | The element the menu is positioned against. Keep it in state so that setting it causes the render the menu needs in order to measure it.                             |
| `children`           | `ReactNode`                                                                                                    | -                                              | The contents of the menu, normally SDS MenuItems, placed into the list the menu renders.                                                                             |
| `onClose`            | `(event, reason) => void`                                                                                      | -                                              | Called on a backdrop click, on Escape, and on Tab, with the reason as its second argument. Closing the menu is up to you.                                            |
| `anchorOrigin`       | `{ vertical: "top" \| "center" \| "bottom" \| number,` `horizontal: "left" \| "center" \| "right" \| number }` | `{ vertical: "bottom", horizontal: "center" }` | The point on the anchor the menu attaches to. SDS changes MUI's default from the anchor's top left corner.                                                           |
| `transformOrigin`    | `{ vertical: "top" \| "center" \| "bottom" \| number,` `horizontal: "left" \| "center" \| "right" \| number }` | `{ vertical: "top", horizontal: "center" }`    | The point on the menu that meets the anchor's. Passing your own replaces the SDS default rather than merging with it.                                                |
| `variant`            | `"menu" \| "selectedMenu"`                                                                                     | `"selectedMenu"`                               | Where focus lands when the menu opens: on the selected item, or on the first one.                                                                                    |
| `autoFocus`          | `boolean`                                                                                                      | `true`                                         | Whether focus moves into the menu when it opens. Turning it off has severe accessibility implications unless focus is managed some other way.                        |
| `slotProps`          | `{ root, paper, list, transition, backdrop }`                                                                  | -                                              | Props for the parts the menu is made of. `slotProps.list` is where the list's label and role belong, and `slotProps.paper` is where a width or a max height belongs. |
| `keepMounted`        | `boolean`                                                                                                      | `false`                                        | Keeps the items in the document while the menu is closed, preserving their state at the cost of rendering them up front.                                             |
| `disablePortal`      | `boolean`                                                                                                      | `false`                                        | Renders the menu where it is written rather than at the end of the document, which puts it back within reach of an ancestor's overflow.                              |
| `transitionDuration` | `number \| { appear, enter, exit } \| "auto"`                                                                  | `"auto"`                                       | How long the grow transition runs. `"auto"` scales it to the size of the menu.                                                                                       |
