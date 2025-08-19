---
title: "Navigation"
id: 7352934
uid: "106964"
slug: "106964-navigation"
url: "https://sds.czi.design/009eaf17b/v/latest/p/106964-navigation"
hidden: false
locked: false
created_at: "2025-07-07T20:30:29.094Z"
updated_at: "2025-07-07T20:30:29.135Z"
---

# Navigation

Navigation components enable users to move around an application, either between pages or within the same page, and help facilitate user's ability to find relevant content and tools.

## Overview

## Jump-to Navigation

|  | In Figma |   |  | Meets Accessibility |   |  | In napari hub + .org Codebases |
| --- | --- | --- | --- | --- | --- | --- | --- |

The Jump-to Navigation component can contain as many Nav Items as necessary though must have a minimum of two. Each Nav Item is tied to a a section of the page and functions as a jump link to that page section. It is positioned on the right side of the page, anchored to the top of the page’s first paragraph and remains sticky on the page as the user scrolls; once the user scrolls into a new section, the active indicator on that section is highlighted until the user scrolls beyond it and into the next (or previous) at which point the indictor moves again. When the user clicks on any of the Nav Items, the page will smooth scroll to that section of the page.

| **Default / Active** | **Hover** |
| --- | --- |

---

### Jump-to Navigation Spacing

These rules establish how much margin should exist between and around elements.

 

## Code

## Jump-to Navigation Component

| Below you will find an interactive Storybook iframe for the Jump-to Navigation.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [NavigationJumpTo](https://sds.czi.design/009eaf17b/v/0/p/106964-navigation/t/10a784) |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the napari hub or napari.org codebases, use a theme file to enable the napari visual appearance customization.

### NavigationJumpTo

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=navigationjumpto--default)

 

