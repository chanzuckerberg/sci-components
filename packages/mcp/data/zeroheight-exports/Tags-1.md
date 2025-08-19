---
title: "Tags"
id: 7352972
uid: "415f47"
slug: "415f47-tags"
url: "https://sds.czi.design/009eaf17b/v/latest/p/415f47-tags"
hidden: false
locked: false
created_at: "2025-07-07T20:30:36.294Z"
updated_at: "2025-07-07T20:30:36.574Z"
---

# Tags

Tags are used to label the status of certain elements or in conjunction with filters to indicate which have been applied when viewing datasets.

## Overview

## Tag Variants

| There are two primary Tag variants—Filter Tags and standard Tags. Filter Tags are used in conjunction with the [Filter](https://sds.czi.design/009eaf17b/p/26758d) component to indicate which filters have been applied to a given dataset. Standard Tags are used throughout the UI whenever there's a need to label an element or communicate a status associated with it.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Tag for any given use case. |   | **Jump to variant:** [Filter](https://sds.czi.design/009eaf17b/v/0/p/415f47-tags/t/966ade) [Rounded](https://sds.czi.design/009eaf17b/v/0/p/415f47-tags/t/89154c) |
| --- | --- | --- |

---

## Filter Tag

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ GEN EPI Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Filter Tag

Used in conjunction with [Filters](https://sds.czi.design/009eaf17b/p/26758d) to communicate that the dataset is being filtered on the parameter indicated in the Filter Tag. Users click on the Filter Tag to remove that parameter from the group of filters being applied.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Pressed** |
| --- | --- | --- |

---

### Filter Tag Spacing

These rules establish how much margin should exist between and around elements.

---

## Rounded Tag

|  | In Figma |   |  | Meets Accessibility |   |  |  In CZ GEN EPI Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Secondary Rounded Tag

Used in CZ GEN EPI without an icon to display the status of a sample within tables or trees. Used with an icon on status message screens.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Pressed** |
| --- | --- | --- |

| **Default + Icon** | **Hover** | **Pressed** |
| --- | --- | --- |

---

### Rounded Tag Spacing

These rules establish how much margin should exist between and around elements.

---

### Intent Variations

There are four different intents that Tags can communicate—Info, Error, Success, and Warning—indicated with the use of color and selected using the `intent` prop.

The Info variant is used when the information being communicated is neutral in nature and is meant to draw the user's attention to the element it is placed beside, providing additional context or details. The Error, Success, and Warning variants are meant to be used to communicate the status of the element, feature, or process they are placed beside.

| **Error** | **Info** |
| --- | --- |

| **Success** | **Warning** |
| --- | --- |

## Code

## Tag Components

| Below you will find interactive Storybook iframes for each component within the Tags element group.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [TagFilter](https://sds.czi.design/009eaf17b/v/0/p/415f47-tags/t/18bd3c) [Tag](https://sds.czi.design/009eaf17b/v/0/p/415f47-tags/t/97c831) |
| --- | --- | --- |

---

>These components appear as they are in the default SDS codebase. Once imported into the CZ GEN EPI codebase, use a theme file to enable the CZ GEN EPI visual appearance customization.

### TagFilter

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/tagfilter--default)

---

### Tag

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/tag--default)

