---
title: "Panels"
id: 7353006
uid: "93f11a"
slug: "93f11a-panels"
url: "https://sds.czi.design/009eaf17b/v/latest/p/93f11a-panels"
hidden: false
locked: false
created_at: "2025-07-07T20:30:43.593Z"
updated_at: "2025-07-07T20:30:43.796Z"
---

# Panels

Panels are elements that contain supplementary information or actions for the page's content they appear on. Where and how they display is determined by the type of content on them.

## Overview

## Panel Variants

| Panels are comprised of containers within which other elements are placed. They come in two different variants for designers to use depending on the type of content and elements contained within them. These variants also establish how the Panel functions and appears on the page, whether within the flow of the page's content or outside of it, on top of other elements.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Panel for any given use case. |   | **Jump to variant:** [Basic](https://sds.czi.design/009eaf17b/v/0/p/93f11a-panels/t/10a962) [Overlay](https://sds.czi.design/009eaf17b/v/0/p/93f11a-panels/t/1772d5) |
| --- | --- | --- |

---

## Basic Panel

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Basic Panel

Use the Basic Panel when the elements contained within it are able to functionally adjust the content on the page, such as filters or dataset selectors. Basic Panels can be toggled open or closed using an [Icon Button](https://sds.czi.design/009eaf17b/v/0/p/6196ff-buttons/t/396d42). When toggled open, the page's content is resized to make room for the Panel.

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

Use the Overlay Panel when needing to display supplementary information about the content on the underlying page. The elements on the Overlay Panel cannot functionally adjust the content on the page below it. Overlay Panels can be toggled open or closed using a range of different [Button](https://sds.czi.design/009eaf17b/p/6196ff) types (Rounded, Square, Minimal, and Icon Buttons). When active, like its name suggests, the Overlay Panel appears on top of the other content on the page, outside of the page's flow.

Overlay Panels can be positioned on the bottom or right side of the screen using the `position` prop. Use the bottom-positioned Overlay Panel when the content contained on it is wider than it is tall. Designers can have as many Overlay Panels per page as needed, but only one can be triggered at any time. If one is currently open and another is triggered, the opened Overlay Panel will close before the newly triggered one opens.

Although Overlay Panels can be designed to contain a wide range of elements, there are a few common configurations used within the products today that have been turned into templates: Sample Details, Taxon Details, Genes Details, and Pipeline Information (templates coming soon).

 

### Overlay Panel Examples

The examples below show where in CZ ID the Overlay Panel is currently being used.

---

## Code

## Panel Components

| Below you will find an interactive Storybook iframe for Panels.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [PanelBasic](https://sds.czi.design/009eaf17b/v/0/p/93f11a-panels/t/37c8ab) [PanelOverlay](https://sds.czi.design/009eaf17b/v/0/p/93f11a-panels/t/421581) |
| --- | --- | --- |

---

### PanelBasic (coming soon)

 

---

### PanelOverlay (coming soon)

 

