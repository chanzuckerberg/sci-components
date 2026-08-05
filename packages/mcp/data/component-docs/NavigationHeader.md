# NavigationHeader

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/NavigationHeader).

## Import

**React TypeScript**

```tsx
import { NavigationHeader } from "@czi-sds/components";
```

## Code examples

**Note:** Most headers below set `isSticky={false}` so they stay inside their example rather than pinning themselves to the top of this page. Because they are narrower than a real page, some collapse to the narrow layout with a hamburger; widen the window to see the wide layout. Overlays such as the narrow layout's drawer expect a real viewport, so they cover this page instead of their example unless the example holds them in, as the drawer-style one below does.

### Default header

A dropdown-style header with a logo, title, tag, a text item and a dropdown item, one secondary item, and two buttons.

**Example: NavigationHeaderDefault**

```tsx
// The default dropdown style: primary items on the left of the search field,
// secondary items and buttons on the right. Nav items are data, not children,
// so the header owns the markup for every row.

import {
  Icon,
  NavigationHeader,
  getSemanticColors,
  type CommonThemeProps,
  type NavigationHeaderPrimaryNavItem,
  type NavigationHeaderSecondaryNavItem,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const Logo = styled.div<CommonThemeProps>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      align-items: center;
      border: 1px dashed ${semanticColors?.base?.borderPrimary};
      color: ${semanticColors?.base?.textSecondary};
      display: flex;
      font-size: 10px;
      height: 24px;
      justify-content: center;
      width: 50px;
    `;
  }}
`;

const primaryNavItems: NavigationHeaderPrimaryNavItem<string>[] = [
  {
    itemType: "text",
    key: "datasets",
    label: "Datasets",
    onClick: () => console.log("Datasets clicked"),
  },
  {
    itemType: "dropdown",
    items: [
      { label: "Cell types", onClick: () => console.log("Cell types clicked") },
      { label: "Genes", onClick: () => console.log("Genes clicked") },
    ],
    key: "explore",
    label: "Explore",
  },
];

const secondaryNavItems: NavigationHeaderSecondaryNavItem<string>[] = [
  {
    itemType: "text",
    key: "docs",
    label: "Docs",
    onClick: () => console.log("Docs clicked"),
  },
];

function App() {
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState("datasets");

  return (
    <div className="app">
      <NavigationHeader
        activePrimaryNavKey={activePrimaryNavKey}
        setActivePrimaryNavKey={setActivePrimaryNavKey}
        buttons={[
          { children: "Sign in", sdsStyle: "outline", sdsType: "primary" },
          {
            children: <Icon sdsIcon="Person" sdsSize="s" />,
            onClick: () => console.log("Profile clicked"),
            sdsStyle: "minimal",
            sdsType: "secondary",
          },
        ]}
        isSticky={false}
        logo={<Logo>Logo slot</Logo>}
        logoUrl="https://chanzuckerberg.com"
        menuProps={{ disablePortal: true, disableScrollLock: true }}
        primaryNavItems={primaryNavItems}
        secondaryNavItems={secondaryNavItems}
        showSearch={false}
        tag="Beta"
        tagColor="beta"
        title="Cell Atlas"
      />
    </div>
  );
}

export default App;
```

### Grouped dropdown items

Giving items a section name groups them under headings with a divider between groups. Only the label and the section are used in this style, so there is no point giving these items icons or details.

**Example: NavigationHeaderSections**

```tsx
// Dropdown items grouped into sections: each item names its section, and the
// menu draws a heading per group with a divider between them. This style uses
// only the label and the section; icons and details need drawer style.

import {
  NavigationHeader,
  type NavigationHeaderPrimaryNavItem,
} from "@czi-sds/components";
import { useState } from "react";

const primaryNavItems: NavigationHeaderPrimaryNavItem<string>[] = [
  {
    itemType: "dropdown",
    items: [
      { label: "Browse datasets", section: "Data" },
      { label: "API reference", section: "Data" },
      { label: "CZ CELLxGENE", section: "Repositories" },
      { label: "CryoET", section: "Repositories" },
    ],
    key: "data",
    label: "Data",
  },
  {
    itemType: "text",
    key: "about",
    label: "About",
    onClick: () => console.log("About clicked"),
  },
];

function App() {
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState("data");

  return (
    <div className="app">
      <NavigationHeader
        activePrimaryNavKey={activePrimaryNavKey}
        setActivePrimaryNavKey={setActivePrimaryNavKey}
        isSticky={false}
        menuProps={{ disablePortal: true, disableScrollLock: true }}
        primaryNavItems={primaryNavItems}
        showSearch={false}
        title="Science Data"
      />
    </div>
  );
}

export default App;
```

### Drawer style on a dark header

Hovering the nav item opens a panel instead of a menu, and this is the style that renders item icons and the section's actions. The panel is a MUI Drawer that fixes itself to the viewport, so this example adds a theme override and some CSS to keep it inside the frame; a page whose header spans the viewport needs neither.

**Example: NavigationHeaderDrawer**

```tsx
// sdsStyle="drawer" opens a full-width panel on hover instead of a menu on
// click. It is the only style that draws item icons and the per-section
// actions, and backgroundAppearance="dark" inverts the whole header.
//
// The panel is a MUI Drawer: it goes to the end of the page and fixes itself to
// the viewport, which here would cover the docs rather than the example. The
// theme below sends it to the box instead, the CSS anchors it there, and the
// focus options stop it from scrolling itself into view. Rendering it in place
// with disablePortal would put it inside the header, where it paints over the
// bar as it slides in. A real page, where the header spans the viewport and the
// panel slides out from under it, needs none of this.

import {
  NavigationHeader,
  fontBodyS,
  getSemanticColors,
  type CommonThemeProps,
  type NavigationHeaderPrimaryNavItem,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { useMemo, useRef, useState } from "react";

const Stage = styled.div`
  min-height: 380px;
  position: relative;

  /* The panel starts above the box it belongs to and slides down into it, which
     on a real page means starting off screen. Here it would cross the docs. */
  overflow: hidden;

  /* The panel, its backdrop, and the modal wrapper are all fixed to the
     viewport by default; anchoring them to this box keeps them in the frame. */
  .MuiModal-root,
  .MuiBackdrop-root,
  .MuiDrawer-paper {
    position: absolute;
  }
`;

const Hint = styled.p<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: 24px;
    `;
  }}
`;

const primaryNavItems: NavigationHeaderPrimaryNavItem<string>[] = [
  {
    itemType: "dropdown",
    items: [
      {
        details: "Every public dataset",
        icon: "Search",
        label: "Browse datasets",
        section: "Data",
      },
      {
        details: "Pull data from the command line",
        icon: "Code",
        label: "API reference",
        section: "Data",
      },
      {
        details: "Single-cell multiomic data",
        icon: "Grid",
        label: "CZ CELLxGENE",
        section: "Repositories",
      },
      {
        details: "3D sub-cellular tomograms",
        icon: "Flask",
        label: "CryoET",
        section: "Repositories",
      },
    ],
    key: "data",
    label: "Data",
    sectionProps: {
      Repositories: {
        actions: [{ href: "/repositories", label: "Browse all" }],
      },
    },
  },
  {
    itemType: "text",
    key: "about",
    label: "About",
    onClick: () => console.log("About clicked"),
  },
];

function App() {
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState("data");
  const stageRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const containedTheme = useMemo(
    () =>
      createTheme(theme, {
        components: {
          MuiModal: {
            defaultProps: {
              container: () => stageRef.current,
              disableAutoFocus: true,
              disableEnforceFocus: true,
              // The docs and the playground render overlays in place by
              // default. This one needs its portal back, aimed at the stage.
              disablePortal: false,
              disableRestoreFocus: true,
            },
          },
        },
      }),
    [theme]
  );

  return (
    <div className="app">
      <ThemeProvider theme={containedTheme}>
        <Stage ref={stageRef}>
          <NavigationHeader
            activePrimaryNavKey={activePrimaryNavKey}
            backgroundAppearance="dark"
            primaryNavItems={primaryNavItems}
            sdsStyle="drawer"
            setActivePrimaryNavKey={setActivePrimaryNavKey}
            showSearch={false}
            title="Science Data"
          />

          <Hint>Hover “Data” to open the panel.</Hint>
        </Stage>
      </ThemeProvider>
    </div>
  );
}

export default App;
```

### Banner above the header

The header sits below whatever `topComponentSlot` holds and re-measures it when it changes, so dismissing this banner closes the gap.

**Example: NavigationHeaderTopSlot**

```tsx
// Anything in topComponentSlot renders above the header. The header measures
// that slot and offsets its own sticky top by the slot's height, so dismissing
// the banner moves the header back up on its own.
//
// This one keeps the default sticky position: the offset is applied as a CSS
// top, which a relatively positioned header would read as a second gap below
// the slot.

import {
  Banner,
  NavigationHeader,
  type NavigationHeaderPrimaryNavItem,
} from "@czi-sds/components";
import { useState } from "react";

const primaryNavItems: NavigationHeaderPrimaryNavItem<string>[] = [
  {
    itemType: "text",
    key: "datasets",
    label: "Datasets",
    onClick: () => console.log("Datasets clicked"),
  },
  {
    itemType: "text",
    key: "about",
    label: "About",
    onClick: () => console.log("About clicked"),
  },
];

function App() {
  const [bannerDismissed, setBannerDismissed] = useState(false);

  return (
    <div className="app">
      <NavigationHeader
        primaryNavItems={primaryNavItems}
        showSearch={false}
        title="Cell Atlas"
        topComponentSlot={
          <Banner
            dismissed={bannerDismissed}
            onClose={() => setBannerDismissed(true)}
            sdsType="primary"
          >
            Scheduled maintenance this Saturday from 8am to noon PT.
          </Banner>
        }
      />
    </div>
  );
}

export default App;
```

## Behavior notes

- Nav items are data, not children. Everything in the bar comes from `primaryNavItems`, `secondaryNavItems`, `buttons`, and the logo and title props; the header owns the markup.

- The header switches to its narrow layout on its own. It happens below 512px, and also whenever the bar's content is wider than the space it has, which a ResizeObserver watches for. A crowded header can therefore collapse well above 512px.

- There is no `hasInvertedStyle` prop. Use `backgroundAppearance`: `"dark"` puts the header on a dark surface and inverts its contents while the app is in light mode, and does nothing in dark mode, where the header is dark already.

- `position` is not a prop. The header computes it: drawer style is always sticky, and dropdown style follows `isSticky`, which is sticky by default and relative when `false`.

- `activePrimaryNavKey` works either way round. The header keeps its own copy of the active key, so the prop is optional; pass it and it wins, and `setActivePrimaryNavKey` is called alongside the internal update.

- The narrow drawer does not work that way. Passing `setDrawerOpen` replaces the internal state update rather than running beside it, so the hamburger will never open the drawer unless you also feed `drawerOpen` back in. Pass both or neither.

- `menuProps` replaces the default `{ disableScrollLock: true, disablePortal: true }` wholesale rather than merging into it. Note that dropdown menus force `disablePortal` on regardless of what you pass.

- The logo always renders inside a link element, because the link component defaults to an anchor whether or not `logoUrl` is set. Give it a URL so the anchor has a destination.

- Anything in `topComponentSlot` renders above the header, and the header offsets its sticky top by the slot's measured height, so a banner that is dismissed or resized takes the header with it. Keep the header sticky when you use the slot: the offset is applied as a CSS `top`, which a relatively positioned header reads as a second gap below the slot.

## Dropdown style and drawer style

`sdsStyle` picks between two ways of opening a dropdown nav item, and it changes which parts of the item data are used.

|                        | `"dropdown"` (default)              | `"drawer"`                                       |
| ---------------------- | ----------------------------------- | ------------------------------------------------ |
| Opens                  | A menu, on click                    | A full-width panel, on hover                     |
| Item icons             | Ignored                             | Shown, 24px with a details line and 16px without |
| Item details           | Ignored                             | Shown as a caption under the label               |
| `sectionProps` actions | Ignored                             | Shown under the section                          |
| Section headings       | Shown, with dividers between groups | Shown, as panel columns                          |
| Position               | Follows `isSticky`                  | Always sticky                                    |

In the narrow layout both styles collapse to accordions inside the drawer, and the same split applies there: icons and section actions only appear when `sdsStyle` is `"drawer"`.

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name                        | Type                                                                                                                                  | Default                                            | Description                                                                                                                                                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `activePrimaryNavKey`       | `string`                                                                                                                              | -                                                  | The key of the active primary item. Optional, since the header tracks this itself; when given, it overrides the internal value.                                                                                                                                                       |
| `setActivePrimaryNavKey`    | `(key: string) => void`                                                                                                               | -                                                  | Called when a primary item becomes active. The header updates its internal key as well, so this is a notification rather than the only way the value changes.                                                                                                                         |
| `backgroundAppearance`      | `"matchBackground"` \| `"dark"`                                                                                                       | `"matchBackground"`                                | `"dark"` puts the header on a dark surface and inverts its contents. It only changes anything in light mode.                                                                                                                                                                          |
| `buttons`                   | `Partial<ButtonProps>[]` \| `ReactNode[]`                                                                                             | -                                                  | Actions at the right end of the bar. Prop objects render as SDS Buttons; elements are cloned with the header's appearance applied. An icon-only button gets an `aria-label` from its child, and in the narrow layout every button goes full width and closes the drawer when clicked. |
| `sdsStyle`                  | `"dropdown"` \| `"drawer"`                                                                                                            | `"dropdown"`                                       | How dropdown nav items open, and which parts of their data are used. See the comparison above.                                                                                                                                                                                        |
| `drawerOpen`                | `boolean`                                                                                                                             | -                                                  | Controls the narrow layout's drawer. Leave both this and `setDrawerOpen` out to let the hamburger manage it.                                                                                                                                                                          |
| `setDrawerOpen`             | `(open: boolean) => void`                                                                                                             | -                                                  | Replaces the drawer's internal state update, so it has to be paired with `drawerOpen` or the drawer stops opening.                                                                                                                                                                    |
| `isSticky`                  | `boolean`                                                                                                                             | `true`                                             | Whether the header sticks to the top on scroll. Ignored when `sdsStyle` is `"drawer"`, which is always sticky, and best left alone alongside `topComponentSlot`.                                                                                                                      |
| `menuProps`                 | [`Partial<MenuProps>`](https://mui.com/material-ui/api/menu/)                                                                         | `{ disableScrollLock: true, disablePortal: true }` | Props for the dropdown menus. Passing this replaces the default object rather than merging with it.                                                                                                                                                                                   |
| `topComponentSlot`          | `ReactNode`                                                                                                                           | -                                                  | Content rendered above the header, such as a Banner. The header measures it and offsets its own sticky top to match.                                                                                                                                                                  |
| `onDrawerStyleNavItemHover` | `function`                                                                                                                            | -                                                  | `(item: NavigationHeaderPrimaryNavItem<T> \| NavigationHeaderSecondaryNavItem) => void`. Called with the hovered primary or secondary item while `sdsStyle` is `"drawer"`. Useful for prefetching what the panel will show.                                                           |
| `logo`                      | `ReactNode`                                                                                                                           | -                                                  | The logo displayed in the header. Can be an image, icon, svg or any `ReactNode`.                                                                                                                                                                                                      |
| `logoUrl`                   | `string`                                                                                                                              | -                                                  | URL for the logo link. If provided, clicking the logo navigates to this URL.                                                                                                                                                                                                          |
| `logoLinkComponent`         | `ElementType`                                                                                                                         | `"a"`                                              | Specifies the component to use for the logo link.                                                                                                                                                                                                                                     |
| `logoLinkProps`             | [`LinkProps`](https://mui.com/material-ui/api/link/)                                                                                  | -                                                  | Props to pass to the logo link component.                                                                                                                                                                                                                                             |
| `primaryNavItems`           | `NavigationHeaderPrimaryNavItem<T>[]`                                                                                                 | -                                                  | List of items for the primary navigation section.                                                                                                                                                                                                                                     |
| `primaryNavPosition`        | `"left" \|"right"`                                                                                                                    | `"left"`                                           | Position of the `primaryNavItems` list. If set to `"left"`, the items appear to the left of the search bar. If set to `"right"`, they are positioned next to the `secondaryNavItems` on the right.                                                                                    |
| `showSearch`                | `boolean`                                                                                                                             | `true`                                             | Whether to display the search input in the header.                                                                                                                                                                                                                                    |
| `searchProps`               | `Partial<InputSearchProps>`                                                                                                           | -                                                  | Props passed to the search input component.                                                                                                                                                                                                                                           |
| `secondaryNavItems`         | `NavigationHeaderSecondaryNavItem[]`                                                                                                  | -                                                  | List of items for the secondary navigation section.                                                                                                                                                                                                                                   |
| `scrollElevation`           | `boolean`                                                                                                                             | `true`                                             | Controls whether a shadow is shown under the Nav when scrolling.                                                                                                                                                                                                                      |
| `tag`                       | `string`                                                                                                                              | -                                                  | A small label displayed next to the title.                                                                                                                                                                                                                                            |
| `tagColor`                  | `"info"` \| `"positive"` \| `"notice"` \| `"negative"` \| `"neutral"` \| `"beta"` \| `[string, string]` \| `[string, string, string]` | `"neutral"`                                        | The color of the tag label.                                                                                                                                                                                                                                                           |
| `title`                     | `string`                                                                                                                              | -                                                  | The main title displayed in the header.                                                                                                                                                                                                                                               |

NavigationHeader also extends MUI's [AppBar](https://mui.com/material-ui/api/app-bar/) minus its `position` prop, so the remaining AppBar and DOM props reach the underlying element.

## Navigation Header Primary Nav Item and Navigation Header Secondary Nav Item

Primary and secondary items share the same shape. Both are a union keyed on `itemType`: a plain label, or a label that opens a menu.

| Name                         | Type                                | itemType     | Description                                                                                                                                |
| ---------------------------- | ----------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `itemType`                   | `"text"` \| `"dropdown"`            | both         | Which variant this item is. An item without it is treated as text, but TypeScript requires it.                                             |
| `key`                        | `string`                            | both         | Identifies the item. It is what `activePrimaryNavKey` is compared against, so it has to be unique within the list.                         |
| `label`                      | `ReactNode`                         | both         | What the item reads in the bar.                                                                                                            |
| `onClick`                    | `(e: React.SyntheticEvent) => void` | both         | Runs when the item is clicked. On a dropdown item this fires alongside opening the menu, not instead of it.                                |
| `tag`, `tagColor`            | `string`, `SdsTagColorType`         | `"text"`     | A small Tag rendered after the label.                                                                                                      |
| `items`                      | `DropdownItem[]`                    | `"dropdown"` | The contents of the menu. See the table below.                                                                                             |
| `sectionProps`               | `Record<string, SectionProps>`      | `"dropdown"` | Extra configuration per section name, applied only when `sdsStyle` is `"drawer"`.                                                          |
| `defaultUrl`                 | `string`                            | `"dropdown"` | Makes the item itself a link, for when the section has a landing page of its own. Pair it with `component`, `target`, and `rel` as needed. |
| `component`, `target`, `rel` | `ElementType`, `string`, `string`   | `"dropdown"` | Link plumbing for `defaultUrl`.                                                                                                            |

## DropdownItem

| Name        | Type                                      | Default | Description                                                                                                                                                                         |
| ----------- | ----------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`     | `ReactNode`                               | -       | The row's text.                                                                                                                                                                     |
| `details`   | `string`                                  | -       | A caption under the label, drawn only when `sdsStyle` is `"drawer"`. In dropdown style it lands on the element as an attribute and shows nothing.                                   |
| `icon`      | `keyof IconNameToSizes` \| `ReactElement` | -       | An icon for the row, drawn only when `sdsStyle` is `"drawer"`. A named icon renders at 24px when the row has details and 16px when it does not, so the name has to offer that size. |
| `section`   | `string`                                  | -       | Groups rows under a heading. Rows are grouped by this value in the order the sections first appear.                                                                                 |
| `onClick`   | `(event: React.MouseEvent) => void`       | -       | Runs on click, then the menu closes.                                                                                                                                                |
| `href`      | `string`                                  | -       | Turns the row into a link to this URL.                                                                                                                                              |
| `component` | `ElementType`                             | -       | What the link renders as, for routing through something other than an anchor.                                                                                                       |
| `target`    | `string`                                  | -       | Where the link opens, for example `"_blank"`.                                                                                                                                       |
| `rel`       | `string`                                  | -       | The link's relationship to the target, for example `"noreferrer"`.                                                                                                                  |

## SectionProps and ActionItem

Keyed by section name on a dropdown item's `sectionProps`, and used only in drawer style.

| Name      | Type           | Default | Description                                                                                                                                |
| --------- | -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `actions` | `ActionItem[]` | -       | Links rendered under the section, for example a "Browse all". Each takes `label` plus `href`, `onClick`, `component`, `target`, and `rel`. |
| `colSpan` | `number`       | `1`     | How many columns of the panel this section occupies.                                                                                       |
