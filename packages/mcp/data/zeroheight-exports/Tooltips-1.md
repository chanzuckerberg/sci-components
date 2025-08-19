---
title: "Tooltips"
id: 7352981
uid: "3223ce"
slug: "3223ce-tooltips"
url: "https://sds.czi.design/009eaf17b/v/latest/p/3223ce-tooltips"
hidden: false
locked: false
created_at: "2025-07-07T20:30:39.351Z"
updated_at: "2025-07-07T20:30:39.638Z"
---

# Tooltips

Tooltips are used throughout the UI and appear whenever users hover over elements that require additional context, instructions, or details.

## Overview

## Tooltip Variants

| Tooltips are always used in conjunction with other elements when there is a need to further clarify the element's function, provide instructions, or display additional details to the user. The variant used depends on the element it is tied to and the area in the UI in which it is located.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Tooltip for any given use case. |   | **Jump to variant:** [Dark](https://sds.czi.design/009eaf17b/v/0/p/3223ce-tooltips/t/9756f5) [Light](https://sds.czi.design/009eaf17b/v/0/p/3223ce-tooltips/t/1013e0) [Condensed](https://sds.czi.design/009eaf17b/v/0/p/3223ce-tooltips/t/51b22d) [Table](https://sds.czi.design/009eaf17b/v/0/p/3223ce-tooltips/t/70405f) |
| --- | --- | --- |

### Visual Preview

Use the links below to jump to information on a specific Tooltip variant:

---

## Tooltip

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ GEN EPI Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Dark Tooltip

Use in conjunction with actionary UI elements such as [Icon Buttons](https://sds.czi.design/009eaf17b/v/0/p/4289c6-buttons/t/3287e9) or [Segmented Control](https://sds.czi.design/009eaf17b/p/025431) to display information on what that element does, especially when there is only an icon being used to communicate UI action.

Use the `subtitle` prop to add optional text to the Tooltip to communicate additional usage or clarifying details such as further instructions for using the element the Tooltip is connected to.

Use the `placement` prop to indicate from which direction the Tooltip will appear on hover in relation to the element it is connected to. For example, `placement: top` will result in the Tooltip appearing above the element with its directional arrow in the center of Tooltip, pointing down at the element. See [Placement Variations](https://sds.czi.design/009eaf17b/v/0/p/3223ce-tooltips/t/297242) section for more details.

The Tooltip is positioned relative to the on-screen element as opposed to relative to the user's cursor.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

---

 

 

### Light Tooltip

Use to display supplementary information such as definitions, instructions, or expanded details which require more text in the Tooltip. The white background on the Tooltip makes longer blocks of copy easier for the user to read. Use the `width` prop to expand the width of the Light Tooltip to a max-width of 550px if there is a need to display particularly long blocks of copy.

Use the `placement` prop to indicate from which direction the Tooltip will appear on hover in relation to the element it is connected to. For example, `placement: top` will result in the Tooltip appearing above the element with its directional arrow in the center of Tooltip, pointing down at the element. See [Placement Variations](https://sds.czi.design/009eaf17b/v/0/p/3223ce-tooltips/t/297242) section for more details.

The Tooltip is positioned relative to the on-screen element as opposed to relative to the user's cursor.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

 

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

|  | In Figma |   |  | Meets Accessibility |   |  |  In CZ GEN EPI Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Use to display smaller bits of text, not full sentences or descriptions, similar to a label, but only viewable on hover. Most often used in Charts, Tables, and Data Visualizations.

Use the Condensed Tooltip without an indicator in CZ GEN EPI to display detailed information on Data Visualizations.

A colored indicator can be included using the `indicator` prop when using color will help clarify for users what the label is connected to. Use the Condensed Tooltip with an indicator in CZ GEN EPI to display legend information on Data Visualizations.

The Condensed Tooltip is positioned relative to the user's cursor as opposed to the on-screen element it's connected to.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

---

 

---

### Condensed Tooltip Spacing

These rules establish how much margin should exist between and around elements.

---

## Table Tooltip

|  | In Figma |   |  | Meets Accessibility |   |  |  In CZ GEN EPI Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Used in CZ GEN EPI to display complex, dense information that would benefit from being shown in a table format such as additional data or context connected to datasets in Charts, Tables, and Data Visualizations.

The content in the Table Tooltip is determined by the `[array]` passed into the `data` prop. The `[array]` will determine optional section headers, whether a section is disabled or not, as well as each content row's label and item value. There can be as many sections and content rows per section as needed. See the [Data Format](https://sds.czi.design/009eaf17b/v/0/p/3223ce-tooltips/t/03d0db) section below for details about configuring the `[array]`.

The Table Tooltip is positioned relative to the user's cursor as opposed to the on-screen element it's connected to.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

---

---

---

---

### Data Format

Use the following configuration for the `[array]` passed into the `data` prop:

```js
data = [
  {
    // section with a header
    dataRows: [ 
      {
        label: "Label", 
        value: "Item",
      }, 
      {
        label: "Label", 
        value: "Item",
      }, 
      {
        label: "Label", 
        value: "Item",
      }
    ],
    label: "Section One", // optional
  },
  {
    // section with no header
    dataRows: [ 
      {
        label: "Label", 
        value: "Item",
      }, 
      {
        label: "Label", 
        value: "Item",
      }, 
      {
        label: "Label", 
        value: "Item",
      }
    ], 
  },
    {
    // disabled section with no header
    dataRows: [ 
      {
        label: "Label", 
        value: "Item",
      }, 
      {
        label: "Label", 
        value: "Item",
      }, 
      {
        label: "Label", 
        value: "Item",
      }
    ], 
      disabled: true
  },
];
```

---

### Table Tooltip Spacing

These rules establish how much margin should exist between and around elements.

## Code

## Dropdown Input Component

| Below you will find an interactive Storybook iframe for Tooltips.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [Tooltip](https://sds.czi.design/009eaf17b/v/0/p/3223ce-tooltips/t/71459c) [TooltipCondensed](https://sds.czi.design/009eaf17b/v/0/p/3223ce-tooltips/t/89f9ba) [TooltipTable](https://sds.czi.design/009eaf17b/v/0/p/3223ce-tooltips/t/99a898) |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the CZ GEN EPI codebase, use a theme file to enable the CZ GEN EPI visual appearance customization.

### Tooltip

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/tooltip--default)

---

### TooltipCondensed

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/tooltipcondensed--default)

---

### TooltipTable

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/tooltiptable--default)

