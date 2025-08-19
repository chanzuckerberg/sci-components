---
title: "Dropdown Menus"
id: 7352923
uid: "95546f"
slug: "95546f-dropdown-menus"
url: "https://sds.czi.design/009eaf17b/v/latest/p/95546f-dropdown-menus"
hidden: false
locked: false
created_at: "2025-07-07T20:30:26.214Z"
updated_at: "2025-07-07T20:30:26.552Z"
---

# Dropdown Menus

Dropdown Menus are coupled with Dropdown Inputs and in some cases Icon Buttons whenever those elements present the user with options to choose from or selections to make.

## Overview

>**Warning:** The Dropdown Menu and its affiliated components have undergone a major overhaul in their construction and how they have been coded, rendering the documentation below out of date.
>
>While the SDS works on updating the documentation to reflect these changes, see `src/core/Dropdown/index.stories.tsx` within the `sci-components` codebase for example usage of the new Dropdown Menu structure.

## Dropdown Menu Variants

| In their basic form, Dropdown Menus are composed of a Menu Container that is filled with Menu Items offering the user options to adjust or select that are contextually relevant to the [Dropdown Input](https://sds.czi.design/009eaf17b/p/25d75a) they are coupled with. Menu Items can be optionally paired with additional details or with counters that indicate the number of items within that Menu Item's category.  Additionally, Dropdown Menus can be configured to include a [Search Input](https://sds.czi.design/009eaf17b/p/25d43a), have their Menu Items separated out into different sections or groupings, or a combination of these features. |   | **Jump to section:** [Dropdown Menu](https://sds.czi.design/009eaf17b/v/0/p/95546f-dropdown-menus/t/46738e) [Common Configurations](https://sds.czi.design/009eaf17b/v/0/p/95546f-dropdown-menus/t/146f8d) [Menu Item](https://sds.czi.design/009eaf17b/v/0/p/95546f-dropdown-menus/t/614b7e) |
| --- | --- | --- |

---

## Dropdown Menu

|  | In Figma |   |  | Meets Accessibility |   |  |  In napari hub + .org Codebases |
| --- | --- | --- | --- | --- | --- | --- | --- |

Dropdown Menus can be configured to have their Menu Items all in one large list or separated out into different sections or groupings; these Menu Item formats are established by the `[array]` passed into the `options` prop. Additionally, Dropdown Menus can be configured to include a [Search Input](https://sds.czi.design/009eaf17b/p/25d43a). See the [Data Format](https://sds.czi.design/009eaf17b/v/0/p/95546f-dropdown-menus/t/506606) section below for details about configuring the `[array]`.

Dropdown Menus are used in combination with [Dropdown Inputs](https://sds.czi.design/009eaf17b/p/25d75a) on napari hub as part of plugin [Filters](https://sds.czi.design/009eaf17b/p/740252), accessible on the left side of the plugin page.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

 

---

 

---

### Data Format

Use the following configuration for the `[array]` passed into the `options` prop:

```js
data = [
  {
    // section with a Header and Menu Item Details 
    dataRows: [ 
      { 
        name: "Menu Item",
        details: "Details", 
      }, 
      { 
        name: "Menu Item", 
        details: "Details", 
      }, 
      { 
        name: "Menu Item", 
        details: "Details", 
      }, 
    ],
    label: "Section One",
  },
  {
    // section with Menu Item Counts
    dataRows: [ 
      { 
        name: "Menu Item", 
        count: 20,
      }, 
      { 
        name: "Menu Item", 
        count: 40,
      }, 
      { 
        name: "Menu Item", 
        count: 60, 
      }, 
    ],
  },
  {
    // section with disabled Menu Items
    dataRows: [ 
      { 
        name: "Menu Item", 
        disabled: true,
      }, 
      { 
        name: "Menu Item", 
        disabled: true,
      }, 
      { 
        name: "Menu Item", 
        disabled: true, 
      }, 
    ],
  },
];
```

---

### Dropdown Menu Spacing

These rules establish how much margin should exist between and around elements.

---

## Common Configurations

Dropdown Menus can be thought of as being comprised of different combinations of building blocks all within a Menu Container, ensuring a wide range of flexibility for whatever need a designer has with their designs.

Below are a number of common Dropdown Menu configurations, but by no means is this an exhaustive list:

| **Search + Count** | **Search + Sections** | **Search + Details** |
| --- | --- | --- |

| **Sections + Details** | **Search + Sections + Details** | **Search + Sections + Count** |
| --- | --- | --- |

---

## Menu Item

|  | In Figma |   |  | Meets Accessibility |   |  |  In napari hub + .org Codebases |
| --- | --- | --- | --- | --- | --- | --- | --- |

Menu Items can be optionally paired with additional clarifying details, with counters that indicate the number of items within that Menu Item's category, or be disabled entirely. These details are established within the `[array]` passed into the `options` prop on the Dropdown Menu component.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Selected** | **Selected + Hover** | **Disabled** | **Selected + Disabled** |
| --- | --- | --- | --- | --- | --- |

| **Default + Count** | **Hover** | **Selected** | **Selected + Hover** | **Disabled** | **Selected + Disabled** |
| --- | --- | --- | --- | --- | --- |

| **Default + Details** | **Hover** | **Selected** | **Selected + Hover** | **Disabled** |  **Selected + Disabled**  |
| --- | --- | --- | --- | --- | --- |

## Code

## Dropdown Menu Component

| Below you will find interactive Storybook iframes for the Dropdown Menu.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [DropdownMenu](https://sds.czi.design/009eaf17b/v/0/p/95546f-dropdown-menus/t/9774ce) |
| --- | --- | --- |

---

>**Warning:** The Dropdown Menu and its affiliated components have undergone a major overhaul in their construction and how they have been coded, rendering the documentation below out of date.
>
>While the SDS works on updating the documentation to reflect these changes, see `src/core/Dropdown/index.stories.tsx` within the `sci-components` codebase for example usage of the new Dropdown Menu structure.

>This component appears as it is in the default SDS codebase. Once imported into the napari hub or napari.org codebases, use a theme file to enable the napari visual appearance customization.

### DropdownMenu

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/dropdowns-dropdownmenu--default)

 

