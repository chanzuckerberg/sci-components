---
title: "Typography"
id: 7352947
uid: "04622f"
slug: "04622f-typography"
url: "https://sds.czi.design/009eaf17b/v/latest/p/04622f-typography"
hidden: false
locked: false
created_at: "2025-07-07T20:30:30.825Z"
updated_at: "2025-07-07T20:30:30.830Z"
---

# Typography

Typography encompasses font style, appearance, and structure which together deliver a consistent aesthetic while providing easily readable copy.

### Typefaces

Barlow is the primary typeface to be used throughout the product. JetBrains Mono should only be used when referring to code snippets.

| **Visual** |   | **Typeface** |   | **Usage** |
| --- | --- | --- | --- | --- |
|   |   | Barlow (600) |   | All headers and emphasized body copy throughout the product. |
|  |   | Barlow (500) |   | All text used in sidebars. |
|  |   | Barlow (400) |   | All body copy throughout the product. If emphasized copy is needed, use a font weight of 600. |
|  |   | JetBrains Mono (400) |   | Use only when referring to code snippets. |

### Font Weights

Regular (400), Medium (500), and SemiBold (600) are the three font weights primarily used across the product, however additional font weights are available to be selectively used if needed.

| **Visual** |   | **Variable** |   | **Value** |
| --- | --- | --- | --- | --- |
|  |   | `fontWeightHeavy` |   | `font-weight: 800;` |
|  |   | `fontWeightBold` |   | `font-weight: 700;` |
|  |   | `fontWeightSemibold` |   | `font-weight: 600;` |
|  |   | `fontWeightMedium` |   | `font-weight: 500;` |
|  |   | `fontWeightRegular` |   | `font-weight: 400;` |
|  |   | `fontWeightThin` |   | `font-weight: 300;` |

### Header Variables

The width of the user's screen will determine the font values used for any given variable. Wide screens are 495px or wider; narrow screens are 494px or narrower.

| **Visual** |   | **Variable** |   | **Wide screens (≥495px)** |   | **Narrow screens (<494px)** |
| --- | --- | --- | --- | --- | --- | --- |
|  |   | `siteTitle` |   |  `font-size: 51px;` `line-height: 63.8px;` `font-weight: fontWeightSemibold;`  |   | `font-size: 35px;` `line-height: 43.8px;` `font-weight: fontWeightSemibold;` |
|  |   | `h1` |   |  `font-size: 35px;` `line-height: 43.8px;` `font-weight: fontWeightSemibold;`  |   | `font-size: 24px;` `line-height: 38px;` `font-weight: fontWeightSemibold;` |
|  |   | `h2` |   |  `font-size: 24px;` `line-height: 36px;` `font-weight: fontWeightSemibold;`  |   | `font-size: 20px;` `line-height: 27px;` `font-weight: fontWeightSemibold;` |
|  |   | `h3` |   |  `font-size: 20px;` `line-height: 27px;` `font-weight: fontWeightSemibold;`  |   | `font-size: 18px;` `line-height: 26px;` `font-weight: fontWeightSemibold;` |
|  |   | `h4` |   |  `font-size: 17px;` `line-height: 24px;` `font-weight: fontWeightSemibold;`  |   | `font-size: 16px;` `line-height: 23px;` `font-weight: fontWeightSemibold;` |
|  |   | `h5` |   |  `font-size: 14px;` `line-height: 21px;` `font-weight: fontWeightSemibold;`  |   | `font-size: 14px;` `line-height: 21px;` `font-weight: fontWeightSemibold;` |
|  |   | `h6` |   |  `font-size: 12px;` `line-height: 18px;` `font-weight: fontWeightSemibold;`  |   | `font-size: 12px;` `line-height: 18px;` `font-weight: fontWeightSemibold;` |

### Code Variables

The width of the user's screen will determine the font values used for any given variable. Wide screens are 495px or wider; narrow screens are 494px or narrower.

| **Visual** |   | **Variable** |   | **Wide screens (≥495px)** |   | **Narrow screens (<494px)** |
| --- | --- | --- | --- | --- | --- | --- |
|  |   | `code` |   |  `font-size: 16px;` `line-height: 28px;` `font-weight: fontWeightRegular;`  |   | `font-size: 10px;` `line-height: 19.3px;` `font-weight: fontWeightRegular;` |

### Sidebar Variables

The width of the user's screen will determine the font values used for any given variable. Wide screens are 495px or wider; narrow screens are 494px or narrower.

| **Visual** |   | **Variable** |   | **Wide screens (≥595px)** |   | **Narrow screens (<594px)** |
| --- | --- | --- | --- | --- | --- | --- |
|  |   | `fontSidebarHeader` |   |  `font-size: 17px;` `line-height: 29.8px;` `font-weight: fontWeightSemibold;` `text-transform: uppercase;`  |   | `font-size: 11px;` `line-height: 20.4px;` `font-weight: fontWeightSemibold;` `text-transform: uppercase;` |
|  |   | `fontSidebarText` |   |  `font-size: 14px;` `line-height: 24.5px;` `font-weight: fontWeightMedium;`  |   | `font-size: 9px;` `line-height: 15.8px;` `font-weight: fontWeightMedium;` |
|  |   | `fontSidebarCode` |   |  `font-size: 13px;` `line-height: 24.5px;` `font-weight: fontWeightMedium;`  |   | `font-size: 8.5px;` `line-height: 15.8px;` `font-weight: fontWeightMedium;` |

### Body Variables

The same type variables are used for body fonts on both wide and narrow screen widths. For this reason, screen width does not alter the font values used; simply use the variable corresponding to the font size needed.

`BodyM` is the primary font used for wide screens (495px and wider); `bodyS` is the primary font used for narrow screens (494px and narrower).

>**Warning:** `bodyXxs` is being deprecated and should not be used in new designs moving forward.

| **Visual** |   | **Variable** |   | **Value** |
| --- | --- | --- | --- | --- |
|  |   | `bodyM` |   |  `font-size: 17px;` `line-height: 25.5px;` `font-weight: fontWeightRegular;`  |
|  |   | `bodyS` |   |  `font-size: 14px;` `line-height: 17.5px;` `font-weight: fontWeightRegular;`  |
|  |   | `bodyXs` |   |  `font-size: 12px;` `line-height: 16.5px;` `font-weight: fontWeightRegular;`  |
|  |   | `bodyXxs` |   |  `font-size: 9px;` `line-height: 15.8px;` `font-weight: fontWeightRegular;`  |

