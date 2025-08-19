---
title: "Navigation"
id: 7353025
uid: "041822"
slug: "041822-navigation"
url: "https://sds.czi.design/009eaf17b/v/latest/p/041822-navigation"
hidden: false
locked: false
created_at: "2025-07-07T20:30:49.384Z"
updated_at: "2025-07-07T20:30:49.491Z"
---

# Navigation

Navigation components enable users to move around an application, either between pages or within the same page, and help facilitate user's ability to find relevant content and tools.

## Overview

## Jump-to Navigation

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

The Jump-to Navigation component can contain as many Nav Items as necessary though must have a minimum of two. Each Nav Item is tied to a a section of the page and functions as a jump link to that page section. It is positioned on the right side of the page, anchored to the top of the page’s first paragraph and remains sticky on the page as the user scrolls; once the user scrolls into a new section, the active indicator on that section is highlighted until the user scrolls beyond it and into the next (or previous) at which point the indictor moves again. When the user clicks on any of the Nav Items, the page will smooth scroll to that section of the page.

Use a positive pixel value in the `offset` prop to adjust where on the page the user is navigated to in relation to the top of each section.

| **Default / Active** | **Hover** |
| --- | --- |

---

### Jump-to Navigation Spacing

These rules establish how much margin should exist between and around elements.

 

---

### Indicator Variations

The color of the position indicator can be adjusted using the `indicatorColor` prop, allowing designers to customize the designs based on their needs.

Each color option is demonstrated below:

| **Beta** | **Error** | **Gray** | **Info** |
| --- | --- | --- | --- |

| **Primary** | **Success** | **Warning** |
| --- | --- | --- |

## Code

## Jump-to Navigation Component

| Below you will find an interactive Storybook iframe for the Jump-to Navigation.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [NavigationJumpTo](https://sds.czi.design/009eaf17b/v/0/p/041822-navigation/t/925b46) |
| --- | --- | --- |

---

### NavigationJumpTo

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=navigationjumpto--default)

