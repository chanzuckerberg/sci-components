---
title: "Tooltips"
id: 7352930
uid: "156f2a"
slug: "156f2a-tooltips"
url: "https://sds.czi.design/009eaf17b/v/latest/p/156f2a-tooltips"
hidden: false
locked: false
created_at: "2025-07-07T20:30:27.885Z"
updated_at: "2025-07-07T20:30:28.197Z"
---

# Tooltips

Tooltips are used throughout the UI and appear whenever users hover over elements that require additional context, instructions, or details.

## Overview

## Tooltip Variants

| Tooltips are always used in conjunction with other elements when there is a need to clarify the element's function further, provide instructions, or display additional details to the user. The variant used depends on the element it is tied to and the area in the UI in which it is located.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Tooltip for any given use case. |   | **Jump to variant:** [Tooltip](https://sds.czi.design/009eaf17b/v/0/p/156f2a-tooltips/t/44feb7) [Condensed](https://sds.czi.design/009eaf17b/v/0/p/156f2a-tooltips/t/98a7fb) |
| --- | --- | --- |

---

## Tooltip

|  | In Figma |   |  | Meets Accessibility |   |  | In napari hub + .org Codebases |
| --- | --- | --- | --- | --- | --- | --- | --- |

Use to display supplementary information such as definitions, instructions, or expanded details for elements, such as in combination with [Tags](https://sds.czi.design/009eaf17b/p/66562c) to provide definitions of the parameter on the Tag.

Use the `title` and `footer` props to add optional text to the Tooltip to communicate additional usage or clarifying details such as further instructions for using the element the Tooltip is connected to.

Use the `placement` prop to indicate from which direction the Tooltip will appear on hover in relation to the element it is connected to. For example, `placement: top` will result in the Tooltip appearing above the element with its directional arrow in the center of the Tooltip, pointing down at the element. See the [Placement Variations](https://sds.czi.design/009eaf17b/v/0/p/156f2a-tooltips/t/9095e7) section for more details.

The Tooltip is positioned relative to the on-screen element as opposed to relative to the user's cursor.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

---

---

---

---

---

### Tooltip Spacing

These rules establish how much margin should exist between and around elements.

---

### Placement Variations

The `placement` prop indicates from which direction the Tooltip will appear on hover in relation to the element it is connected to. For example, `placement: top` will result in the Tooltip appearing above the element with its directional arrow in the center of the Tooltip, pointing down at the element. There are 12 possible variations to choose from depending on the design's need.

The Tooltip is positioned relative to the on-screen element as opposed to relative to the user's cursor.

| **Bottom-start** | **Bottom** | **Bottom-End** |
| --- | --- | --- |

| **Left-start** | **Left** | **Left-end** |
| --- | --- | --- |

| **Right-start** | **Right** | **Right-end** |
| --- | --- | --- |

| **Top-Start** | **Top** | **Top-end** |
| --- | --- | --- |

---

## Condensed Tooltip

|  | In Figma |   |  | Meets Accessibility |   |  |  In napari hub + .org Codebases |
| --- | --- | --- | --- | --- | --- | --- | --- |

Use to display smaller bits of text, not full sentences or descriptions, similar to a label, but only viewable on hover. Most often used in Charts, Tables, and Data Visualizations (documentation coming soon).

A colored indicator can be included using the `indicator` prop when using color will help clarify for users what the label is connected to.

The Condensed Tooltip is positioned relative to the user's cursor as opposed to the on-screen element it's connected to.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

---

---

### Condensed Tooltip Spacing

These rules establish how much margin should exist between and around elements.

## Code

## Dropdown Input Component

| Below you will find an interactive Storybook iframe for Tooltips.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [Tooltip](https://sds.czi.design/009eaf17b/v/0/p/156f2a-tooltips/t/4903ff) [TooltipCondensed](https://sds.czi.design/009eaf17b/v/0/p/156f2a-tooltips/t/22c02c) |
| --- | --- | --- |

---

>These components appear as they are in the default SDS codebase. Once imported into the napari hub or napari.org codebases, use a theme file to enable the napari visual appearance customization.

### Tooltip

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/tooltip--default)

---

### TooltipCondensed

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/tooltipcondensed--default)

