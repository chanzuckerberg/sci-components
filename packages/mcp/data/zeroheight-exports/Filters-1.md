---
title: "Filters"
id: 7352961
uid: "26758d"
slug: "26758d-filters"
url: "https://sds.czi.design/009eaf17b/v/latest/p/26758d-filters"
hidden: false
locked: false
created_at: "2025-07-07T20:30:34.402Z"
updated_at: "2025-07-07T20:30:34.726Z"
---

# Filters

Filters are used to narrow down large amounts of data based on specific criteria, helping users hone in on specific datasets within the product.

## Overview

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ GEN EPI Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Filters are comprised of a [Dropdown Input](https://sds.czi.design/009eaf17b/p/9800c1) which serves as a clickable Filter label combined with a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/552539) to show the Filter Input options when the Filter Label is active, and [Filter Tag](https://sds.czi.design/009eaf17b/v/0/p/415f47-tags/t/966ade)[s](https://sds.czi.design/009eaf17b/v/0/p/39dc34-tags/t/70a4ba) to display which options are currently being filtered on.

The [Dropdown Menu](https://sds.czi.design/009eaf17b/p/2157fe) that is activated when the Filter Label is clicked displays the Filter Input options available and, depending on the needs of the dataset, can be Single-select ([Radio Lockup](https://sds.czi.design/009eaf17b/v/0/p/735181-control-inputs/t/01b5fb)), Multi-select ([Checkbox Lockup](https://sds.czi.design/009eaf17b/v/0/p/735181-control-inputs/t/502957)), or a Range ([Slider](https://sds.czi.design/009eaf17b/v/0/p/735181-control-inputs/t/837086)). Users can filter using any combination of Filter options presented to them—see the [Filtering Logic](https://sds.czi.design/009eaf17b/v/0/p/26758d-filters/t/982612) section below for an overview of how applied Filters affect the dataset being filtered on.

| **Closed** | **Open** | **Active** |
| --- | --- | --- |

### Filter Variants

---

---

---

 

### Filter Example

The example below shows Complex Filters being used as part of a [Basic Panel](https://sds.czi.design/009eaf17b/v/0/p/77d3cd-panels/t/890e10) in CZ GEN EPI.

---

### Filter Spacing

These rules establish how much margin should exist between and around elements. Follow spacing rules for [Dropdown Menus](https://sds.czi.design/009eaf17b/p/552539) for spacing guidance for the Complex Filter Input.

---

## Filtering Logic

Filtering logic is handled at the product level, however, this section offers some suggestions for best practices to consider when establishing filtering logic.

---

## Code

## Filter Components

| Below you will find an interactive Storybook iframe for Filters.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [FilterComplex](https://sds.czi.design/009eaf17b/v/0/p/26758d-filters/t/58283b) |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the CZ GEN EPI codebase, use a theme file to enable the CZ GEN EPI visual appearance customization.

### FilterComplex

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/complexfilter--default)

