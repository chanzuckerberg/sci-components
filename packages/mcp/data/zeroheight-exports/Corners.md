---
title: "Corners"
id: 7352908
uid: "313aae"
slug: "313aae-corners"
url: "https://sds.czi.design/009eaf17b/v/latest/p/313aae-corners"
hidden: false
locked: false
created_at: "2025-07-07T20:30:24.444Z"
updated_at: "2025-07-07T20:30:24.447Z"
status_id: "not_applicable"
status_name: "SDS"
---

# Corners

Corners (border radiuses) provide visual, and often functional, distinction and help differentiate between different types of similar elements.

### Types of Corners

| **Example** |   | **Corner Type** |   | **Usage** |
| --- | --- | --- | --- | --- |
|  |   | Large Corner |   | Rounded elements (for example: rounded [Buttons](https://sds.czi.design/009eaf17b/p/47778c) and rounded [Dropdown Inputs](https://sds.czi.design/009eaf17b/p/1004b1)) |
|  |   | Medium Corner |   | Standard, default radius for corners in UI elements ( for example: square [Buttons](https://sds.czi.design/009eaf17b/p/47778c), [Dialogs](https://sds.czi.design/009eaf17b/p/707b97), square [Tags](https://sds.czi.design/009eaf17b/p/39dc34), etc.) |
|  |   | Small Corner |   | Corners on elements that are smaller than 20px × 20px that need a square corner (for example: [Checkboxes](https://sds.czi.design/009eaf17b/v/0/p/548a3d-control-inputs/t/page-548a3d-79060787-161363-5)) |
|  |   | No Set Corner |   | Corners for elements without any radius (for example: backgrounds on [Menu Items](https://sds.czi.design/009eaf17b/v/0/p/42bdf2-dropdown-menu/t/page-42bdf2-72655966-63b100-47) and [Table Cells](https://sds.czi.design/009eaf17b/p/1647a1)) |

### Corner Variables

| **Visual** |   | **Figma Variable** |   | **CSS / SCSS Variables** |   | **Value** |
| --- | --- | --- | --- | --- | --- | --- |
|  |   | `cornerL` |   | `--sds-corner-l` `$sds-corner-l` |   | `border-radius: 20px;` |
|  |   | `cornerM` |   | `--sds-corner-m` `$sds-corner-m` |   | `border-radius: 4px;` |
|  |   | `cornerS` |   | `--sds-corner-s` `$sds-corner-s` |   | `border-radius: 2px;` |
|  |   | `cornerNone` |   | `--sds-corner-none` `$sds-corner-none` |   | `border-radius: 0px;` |

