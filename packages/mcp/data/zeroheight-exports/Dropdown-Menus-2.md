---
title: "Dropdown Menus"
id: 7353012
uid: "2157fe"
slug: "2157fe-dropdown-menus"
url: "https://sds.czi.design/009eaf17b/v/latest/p/2157fe-dropdown-menus"
hidden: false
locked: false
created_at: "2025-07-07T20:30:45.342Z"
updated_at: "2025-07-07T20:30:45.830Z"
---

# Dropdown Menus

Dropdown Menus are coupled with Dropdown Inputs, Dropdown Buttons, and in some cases Icon Buttons whenever those elements present the user with options to choose from or selections to make.

## Overview

>**Warning:** The Dropdown Menu and its affiliated components have undergone a major overhaul in their construction and how they have been coded, rendering the documentation below out of date.
>
>While the SDS works on updating the documentation to reflect these changes, see `src/core/Dropdown/index.stories.tsx` within the `sci-components` codebase for example usage of the new Dropdown Menu structure.

## Dropdown Menu Variants

| In their basic form, Dropdown Menus are composed of a Menu Container that is filled with Menu Items offering the user options to adjust or select that are contextually relevant to the [Button](https://sds.czi.design/009eaf17b/p/6196ff) or [Dropdown Input](https://sds.czi.design/009eaf17b/p/24dfce) they are coupled with. Menu Items can be optionally paired with additional details or with counters that indicate the number of items within that Menu Item's category. Dropdown Menus can also be multi-select, allowing the user to choose multiple options from the group of Menu Items.  Additionally, Dropdown Menus can be configured to include a [Search Input](https://sds.czi.design/009eaf17b/v/0/p/700da5-field-inputs/t/156904), have their Menu Items separated out into different sections or groupings, have a built-in title, or any combination of these features. |   | **Jump to section:** [Dropdown Menu](https://sds.czi.design/009eaf17b/v/0/p/2157fe-dropdown-menus/t/01102a) [Common Configurations](https://sds.czi.design/009eaf17b/v/0/p/2157fe-dropdown-menus/t/91c12f) [Menu Item](https://sds.czi.design/009eaf17b/v/0/p/2157fe-dropdown-menus/t/11e6d2) |
| --- | --- | --- |

---

## Dropdown Menu

|  | In Figma |   |  | Meets Accessibility |   |  |  In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Single-select Dropdown Menu

Use the Single-select Dropdown Menu when users are only able to select one item from the menu. They can be configured to have their Menu Items separated out into different sections or groupings, or have a built-in title; both of these features are established by the `[array]` passed into the `options` prop. Additionally, they can be configured to include a [Search Input](https://sds.czi.design/009eaf17b/v/0/p/700da5-field-inputs/t/156904). See the [Data Format](https://sds.czi.design/009eaf17b/v/0/p/2157fe-dropdown-menus/t/20d7fa) section below for details around configuring the `[array]`.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

 

---

---

---

 

### Multi-select Dropdown Menu

Use the Multi-select Dropdown Menu when users are able to select one or more items from the menu. They can be configured to have their Menu Items separated out into different sections or groupings, or have a built-in title; both of these features are established by the `[array]` passed into the `options` prop. Additionally, they can be configured to include a [Search Input](https://sds.czi.design/009eaf17b/v/0/p/700da5-field-inputs/t/156904). See the [Data Format](https://sds.czi.design/009eaf17b/v/0/p/2157fe-dropdown-menus/t/20d7fa) section below for details around configuring the `[array]`.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

 

---

---

---

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
];
```

---

### Dropdown Menu Spacing

These rules establish how much margin should exist between and around elements.

---

## Common Configurations

Dropdown Menus can be thought of as being comprised of different combinations of building blocks all within a Menu Container, ensuring a wide range of flexibility for whatever need a designer has with their designs.

Below are a number of common Dropdown Menu configurations, but by no means is this an exhaustive list:

| **Title + Count** | **Search + Sections + Details** | **Title + Details** |
| --- | --- | --- |

| **Search + Details** | **Title + Search + Count** | **Title + Sections + Details** |
| --- | --- | --- |

---

## Menu Item

|  | In Figma |   |  | Meets Accessibility |   |  |  In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Single-select Menu Item

Menu Items can be optionally paired with additional clarifying details, with counters that indicate the number of items within that Menu Item's category, or be disabled entirely. These details are established within the `[array]` passed into the `options` prop on the Dropdown Menu component.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Selected** | **Disabled** |
| --- | --- | --- | --- |

| **Default + Count** | **Hover** | **Selected** | **Disabled** |
| --- | --- | --- | --- |

| **Default + Details** | **Hover** | **Selected** | **Disabled** |
| --- | --- | --- | --- |

 

### Multi-select Menu Item

Menu Items can be optionally paired with additional clarifying details, with counters that indicate the number of items within that Menu Item's category, or be disabled entirely. These details are established within the `[array]` passed into the `options` prop on the Dropdown Menu component.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Selected** | **Disabled** |
| --- | --- | --- | --- |

| **Default + Count** | **Hover** | **Selected** | **Disabled** |
| --- | --- | --- | --- |

| **Default + Details** | **Hover** | **Selected** | **Disabled** |
| --- | --- | --- | --- |

## Code

## Dropdown Menu Component

| Below you will find interactive Storybook iframes for the Dropdown Menu.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [DropdownMenu](https://sds.czi.design/009eaf17b/v/0/p/2157fe-dropdown-menus/t/6020b8) |
| --- | --- | --- |

---

>**NOTE:** The Dropdown Menu and its affiliated components have undergone a major overhaul in their construction and how they have been coded, rendering the documentation below out of date.
>
>While the SDS works on updating the documentation to reflect these changes, see `src/core/Dropdown/index.stories.tsx` within the `sci-components` codebase for example usage of the new Dropdown Menu structure.

### DropdownMenu

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/dropdowns-dropdownmenu--default)

 

