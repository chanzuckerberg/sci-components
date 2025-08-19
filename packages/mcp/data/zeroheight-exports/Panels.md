# Panels

Panels are elements that contain supplementary information or actions for the page's content they appear on. Where and how they display is determined by the type of content on them.

## Overview

## Basic Panel

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ GEN EPI Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Panels are comprised of containers within which other elements are placed. Use the Basic Panel when the elements contained within it are able to functionally adjust the content on the page next to it. In CZ GEN EPI's case, the Basic Panel is positioned on the left-hand side of the screen and contains Filters. 

### Basic Panel Example

The example below shows where in CZ GEN EPI the Basic Panel is used.

 

## Code

## Panel Components

| Below you will find an interactive Storybook iframe for Panels.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** PanelBasic |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the CZ GEN EPI codebase, use a theme file to enable the CZ GEN EPI visual appearance customization.

### PanelBasic (coming soon) 

---

Panels are elements that contain supplementary information or actions for the page's content they appear on. Where and how they display is determined by the type of content on them.

## Overview

## Panel Variants

| Panels are comprised of containers within which other elements are placed. They come in two different variants for designers to use depending on the type of content and elements contained within them. These variants also establish how the Panel functions and appears on the page, whether within the flow of the page's content or outside of it, on top of other elements.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Panel for any given use case. |   | **Jump to variant:** Basic Overlay |
| --- | --- | --- |

---

## Basic Panel

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Basic Panel

Use the Basic Panel when the elements contained within it are able to functionally adjust the content on the page, such as filters or dataset selectors. Basic Panels can be toggled open or closed using an Icon Button. When toggled open, the page's content is resized to make room for the Panel.

Basic Panels can be positioned on the left or right side of the screen using the `position` prop. If needed, designers can have up to two Panels per page, one of the left and one on the right.

Although Basic Panels can be designed to contain a wide range of elements, there are a few common configurations used within the products today that have been turned into templates: Filter Panel, Info Panel, and Info Panel with Accordions (templates coming soon).

### Basic Panel Examples

The examples below show where in CZ ID the Basic Panel is currently being used.

---

---

## Overlay Panel

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Overlay Panel

Use the Overlay Panel when needing to display supplementary information about the content on the underlying page. The elements on the Overlay Panel cannot functionally adjust the content on the page below it. Overlay Panels can be toggled open or closed using a range of different Button types (Rounded, Square, Minimal, and Icon Buttons). When active, like its name suggests, the Overlay Panel appears on top of the other content on the page, outside of the page's flow.

Overlay Panels can be positioned on the bottom or right side of the screen using the `position` prop. Use the bottom-positioned Overlay Panel when the content contained on it is wider than it is tall. Designers can have as many Overlay Panels per page as needed, but only one can be triggered at any time. If one is currently open and another is triggered, the opened Overlay Panel will close before the newly triggered one opens.

Although Overlay Panels can be designed to contain a wide range of elements, there are a few common configurations used within the products today that have been turned into templates: Sample Details, Taxon Details, Genes Details, and Pipeline Information (templates coming soon).

 

### Overlay Panel Examples

The examples below show where in CZ ID the Overlay Panel is currently being used.

---

## Code

## Panel Components

| Below you will find an interactive Storybook iframe for Panels.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** PanelBasic PanelOverlay |
| --- | --- | --- |

---

### PanelBasic (coming soon)

 

---

### PanelOverlay (coming soon)

 

