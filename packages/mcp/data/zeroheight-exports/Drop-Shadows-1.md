---
title: "Drop Shadows"
id: 7352949
uid: "5837cb"
slug: "5837cb-drop-shadows"
url: "https://sds.czi.design/009eaf17b/v/latest/p/5837cb-drop-shadows"
hidden: false
locked: false
created_at: "2025-07-07T20:30:33.436Z"
updated_at: "2025-07-07T20:30:33.439Z"
---

# Drop Shadows

Drop shadows provide depth to designs via elevation to help users distinguish between overlapping layers of content.

### Types of Drop Shadows

| **Visual** |   | **Shadow Type** |   | **Usage** |
| --- | --- | --- | --- | --- |
|  |   | Large Shadow |   | Containers that layer on top of all other page content (such as [Dialogs](https://sds.czi.design/009eaf17b/p/559d56)) |
|  |   | Medium Shadow |   | Containers that are part of a page's content, but appear on user input, layering over primary content (such as [Dropdown Menus](https://sds.czi.design/009eaf17b/p/95546f) and [Tooltips](https://sds.czi.design/009eaf17b/p/156f2a)) |
|  |   | Small Shadow |   | Containers that layer closely over content, including images of documents/screens placed in content, and sign up forms |

### Drop Shadow Variables

| **Visual** |   | **Variable** |   | **Value** |
| --- | --- | --- | --- | --- |
|  |   | `shadowL` |   | `box-shadow:` `0 2px 12px 0 rbga (0,0,0, 0.3);` |
|  |   | `shadowM` |   | `box-shadow:` `0 2px 4px 0 rbga (0,0,0, 0.15),` `0 2px 10px 0 rbga (0,0,0, 0.15);` |
|  |   | `shadowS` |   | `box-shadow:` `0 2px 4px 0 rbga (0,0,0, 0.25);` |

