---
title: "Filters"
id: 7353009
uid: "332c08"
slug: "332c08-filters"
url: "https://sds.czi.design/009eaf17b/v/latest/p/332c08-filters"
hidden: false
locked: false
created_at: "2025-07-07T20:30:44.057Z"
updated_at: "2025-07-07T20:30:44.470Z"
---

# Filters

Filters are used to narrow down large amounts of data based on specific criteria, helping users hone in on specific datasets within the product.

## Overview

## Filter Variants

| Filters come in two different variants for designers to use depending on the filtering needs of the dataset the filter applies to. Simple Filters are used when the dataset has few filter options and there is space within the layout to fit them all, whereas Complex Filters are used when there are multiple filters needed to fit into one layout, necessitating a more compact design.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Filter for any given use case. |   | **Jump to variant:** [Simple](https://sds.czi.design/009eaf17b/v/0/p/332c08-filters/t/43cdfb) [Complex](https://sds.czi.design/009eaf17b/v/0/p/332c08-filters/t/910b43) [Filtering Logic](https://sds.czi.design/009eaf17b/v/0/p/332c08-filters/t/3920c7) |
| --- | --- | --- |

---

## Simple Filter

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Use the Simple Filter when there are only a few options to filter on or there are only a few filter categories needed for a given dataset. Simple Filters are comprised of a Filter Label combined with a Filter Input that is Single-select ([Radio Lockup](https://sds.czi.design/009eaf17b/v/0/p/727b9c-control-inputs/t/411239)), Multi-select ([Checkbox Lockup](https://sds.czi.design/009eaf17b/v/0/p/727b9c-control-inputs/t/13bceb)), or a Range ([Slider](https://sds.czi.design/009eaf17b/v/0/p/727b9c-control-inputs/t/756e41)) depending on the filtering needs of the dataset. In contrast to [Complex Filters](https://sds.czi.design/009eaf17b/v/0/p/332c08-filters/t/910b43) which keep filter options contained within a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/2157fe), Simple Filters have all of the options for each filter exposed in the UI and viewable by the user. Users can filter using any combination of Filter options presented to them—see the [Filtering Logic](https://sds.czi.design/009eaf17b/v/0/p/332c08-filters/t/3920c7) section below for an overview of how applied Filters affect the dataset being filtered.

---

---

### Simple Filter Example

The example below shows Simple Filters being used as part of a [Basic Panel](https://sds.czi.design/009eaf17b/v/0/p/93f11a-panels/t/10a962) in CZ ID.

 

---

### Simple Filter Spacing

These rules establish how much margin should exist between and around elements.

---

## Complex Filter

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Use the Complex Filter when there are multiple filters needed to fit into one layout, necessitating a more compact design than a [Simple Filter](https://sds.czi.design/009eaf17b/v/0/p/332c08-filters/t/43cdfb) would allow for. Complex Filters are comprised of a [Dropdown Input](https://sds.czi.design/009eaf17b/p/24dfce) which serves as a clickable Filter Label combined with a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/2157fe) to show the Filter Input options when the Filter Label is active, and [Filter Tag](https://sds.czi.design/009eaf17b/v/0/p/8717f1-tags/t/22e0eb)[s](https://sds.czi.design/009eaf17b/v/0/p/39dc34-tags/t/70a4ba) to display which options are currently being filtered on.

The [Dropdown Menu](https://sds.czi.design/009eaf17b/p/2157fe) that is activated when the Filter Label is clicked displays the Filter Input options available and, depending on the needs of the dataset, can be Single-select ([Radio Lockup](https://sds.czi.design/009eaf17b/v/0/p/727b9c-control-inputs/t/411239)), Multi-select ([Checkbox Lockup](https://sds.czi.design/009eaf17b/v/0/p/727b9c-control-inputs/t/13bceb)), or a Range ([Slider](https://sds.czi.design/009eaf17b/v/0/p/727b9c-control-inputs/t/756e41)). Users can filter using any combination of Filter options presented to them—see the [Filtering Logic](https://sds.czi.design/009eaf17b/v/0/p/332c08-filters/t/3920c7) section below for an overview of how applied Filters affect the dataset being filtered on.

| **Closed** | **Open** | **Active** |
| --- | --- | --- |

### Complex Filter Variants

---

---

---

---

 

### Complex Filter Example

The example below shows Complex Filters being used as part of a [Basic Panel](https://sds.czi.design/009eaf17b/v/0/p/16422a-panels/t/78d696) in CZ ID.

---

### Complex Filter Spacing

These rules establish how much margin should exist between and around elements. Follow spacing rules for [Dropdown Menus](https://sds.czi.design/009eaf17b/p/2157fe) for spacing guidance for the Complex Filter Input.

---

## Filtering Logic

Filtering logic is handled at the product level, however, this section offers some suggestions for best practices to consider when establishing filtering logic.

---

## Code

## Filter Components

| Below you will find an interactive Storybook iframe for Panels.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [FilterSimple](https://sds.czi.design/009eaf17b/v/0/p/332c08-filters/t/54a2f5) [FilterComplex](https://sds.czi.design/009eaf17b/v/0/p/332c08-filters/t/55ad1c) |
| --- | --- | --- |

---

### FilterSimple (coming soon)

---

### FilterComplex

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/complexfilter--default)

