---
title: "Filters"
id: 7352927
uid: "740252"
slug: "740252-filters"
url: "https://sds.czi.design/009eaf17b/v/latest/p/740252-filters"
hidden: false
locked: false
created_at: "2025-07-07T20:30:27.216Z"
updated_at: "2025-07-07T20:30:27.443Z"
---

# Filters

Filters are used to narrow down large amounts of data based on specific criteria, helping users hone in on specific datasets within the product.

## Overview

|  | In Figma |   |  | Meets Accessibility |   |  | In napari hub + .org Codebases |
| --- | --- | --- | --- | --- | --- | --- | --- |

Filters are comprised of a [Dropdown Input](https://sds.czi.design/009eaf17b/p/25d75a) which serves as a clickable Filter label combined with a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/95546f) to show the Filter Input options when the Filter Label is active, and [Tag](https://sds.czi.design/009eaf17b/p/66562c)[s](https://sds.czi.design/009eaf17b/v/0/p/39dc34-tags/t/70a4ba) to display which options are currently being filtered on. The Dropdown Menu activated when the Filter Label is clicked displays the Filter Input options available.

Users can filter using any combination of Filter options presented to them—see the [Filtering Logic](https://sds.czi.design/009eaf17b/v/0/p/26758d-filters/t/982612) section below for an overview of how applied Filters affect the dataset being filtered on.

| **Closed** | **Open** | **Active** |
| --- | --- | --- |

### Filter Variants

---

### Filter Example

The example below shows Filters being used as part of the plugin search on napari hub.

---

### Filter Spacing

These rules establish how much margin should exist between and around elements. Follow spacing rules for [Dropdown Menus](https://sds.czi.design/009eaf17b/p/95546f) for spacing guidance for the Filter Input.

---

## Filtering Logic

Filtering logic is handled at the product level; however, this section offers some suggestions for best practices to consider when establishing filtering logic.

## Code

## Filter Components

| Below you will find an interactive Storybook iframe for Filters.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [FilterComplex](https://sds.czi.design/009eaf17b/v/0/p/740252-filters/t/59c8c9) |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the napari hub or napari.org codebases, use a theme file to enable the napari visual appearance customization.

### FilterComplex

Note: the Filter component used in napari hub + .org is using the FilterComplex component from the SDS codebase.

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/complexfilter--default)

