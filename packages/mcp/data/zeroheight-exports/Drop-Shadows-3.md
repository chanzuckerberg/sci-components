---
title: "Drop Shadows"
id: 7353031
uid: "2848a3"
slug: "2848a3-drop-shadows"
url: "https://sds.czi.design/009eaf17b/v/latest/p/2848a3-drop-shadows"
hidden: false
locked: false
created_at: "2025-07-07T20:30:50.781Z"
updated_at: "2025-07-07T20:30:50.782Z"
---

# Drop Shadows

Drop shadows provide depth to designs via elevation to help users distinguish between overlapping layers of content.

### Types of Drop Shadows

| **Visual** |   | **Shadow Type** |   | **Usage** |
| --- | --- | --- | --- | --- |
|  |   | Large Shadow |   | Containers that layer on top of all other page content (bottom panels, side panels, modals, etc.) |
|  |   | Medium Shadow |   | Containers that are part of a page's content, but appear on user input, layering over primary content (dropdown menus, tooltips, etc.) |
|  |   | Small Shadow |   | Containers that layer closely over content, including images of documents/screens placed in content, and sign up forms |

### Drop Shadow Variables

| **Visual** |   | **Variable** |   | **Value** |
| --- | --- | --- | --- | --- |
|  |   | `shadowL` |   | `box-shadow:` `0 2px 12px 0 rbga (0,0,0, 0.3);` |
|  |   | `shadowM` |   | `box-shadow:` `0 2px 4px 0 rbga (0,0,0, 0.15),` `0 2px 10px 0 rbga (0,0,0, 0.15);` |
|  |   | `shadowS` |   | `box-shadow:` `0 2px 4px 0 rbga (0,0,0, 0.25);` |

