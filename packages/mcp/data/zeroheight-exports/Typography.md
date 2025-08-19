---
title: "Typography"
id: 7352910
uid: "62e226"
slug: "62e226-typography"
url: "https://sds.czi.design/009eaf17b/v/latest/p/62e226-typography"
hidden: false
locked: false
created_at: "2025-07-07T20:30:24.601Z"
updated_at: "2025-07-07T20:30:24.627Z"
status_id: "not_applicable"
status_name: "SDS"
---

# Typography

Typography encompasses font style, appearance, and structure which together deliver a consistent aesthetic while providing easily readable copy

## Wide

### Typefaces

Inter is the primary typeface to be used throughout product and marketing materials. IBM Plex Mono should only be used when referring to code snippets.

| **Visual** |   | **Typeface** |   | **Usage** |
| --- | --- | --- | --- | --- |
|  |   | Inter (600) |   | All headers throughout the product and marketing materials, and emphasized body copy. |
|  |   | Inter (500) |   | For text that needs slight emphasis. |
|  |   | Inter (400) |   | All body copy throughout the product and marketing materials. If emphasized copy is needed, use a font weight of 500 or 600. |
|  |   | IBM Plex Mono (400) |   | Use only when referring to code snippets. |

### Font Weights

Regular (400) and SemiBold (600) are the two font weights primarily used across the product, however additional font weights are available to be selectively used if needed.

| **Visual** |   | **Variable** |   | **Value** |
| --- | --- | --- | --- | --- |
|  |   | `fontWeightHeavy` |   | `font-weight: 800;` |
|  |   | `fontWeightBold` |   | `font-weight: 700;` |
|  |   | `fontWeightSemibold` |   | `font-weight: 600;` |
|  |   | `fontWeightRegular` |   | `font-weight: 400;` |
|  |   | `fontWeightThin` |   | `font-weight: 300;` |

---

### Typography Variables

#### TItle

For use with [Hero](https://sds.czi.design/009eaf17b/p/87f1b1) component.

| **Font Title L** |   |   |
| --- | --- | --- |
| *Visual* |   | *Figma Variable* |
|  |   | `wide/fontTitleL/700` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-title-l-700-font` `$sds-font-title-l-700-font`  `--sds-font-title-l-700-letter-spacing` `$sds-font-title-l-700-letter-spacing` |   | `font: 700 52px/64px "Inter", sans-serif;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Title M** |   |   |
| *Visual* |   | *Figma Variable* |
|  |   | `wide/fontTitleM/700` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-title-m-700-font` `$sds-font-title-m-700-font`  `--sds-font-title-m-700-letter-spacing` `$sds-font-title-m-700-letter-spacing` |   | `font: 700 40px/50px "Inter", sans-serif;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Tile S** |   |   |
| *Visual* |   | *Figma Variable* |
|   |   | `wide/fontTitleS/700` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-title-s-700-font` `$sds-font-title-s-700-font`  `--sds-font-title-s-700-letter-spacing` `$sds-font-title-s-700-letter-spacing` |   | `font: 700 32px/40px "Inter", sans-serif;`  `letter-spacing: 0px;`  |

#### Header

For use with `<H1>`, `<H2>`, `<H3>`, `<H4>`, `<H5>`, `<H6>` tags.

| **Font Header XXL** |   |   |
| --- | --- | --- |
| *Visual* |   | *Figma Variable* |
|  |   | `wide/fontHeaderXxl/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-header-xxl-600-font` `$sds-font-header-xxl-600-font`  `--sds-font-header-xxl-600-letter-spacing` `$sds-font-header-xxl-600-letter-spacing` |   | `font: 600 26px/34px "Inter", sans-serif;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Header XL** |   |   |
| *Visual* |   | *Figma Variable* |
|   |   | `wide/fontHeaderXl/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-header-xl-600-font` `$sds-font-header-xl-600-font`  `--sds-font-header-xl-600-letter-spacing` `$sds-font-header-xl-600-letter-spacing` |   | `font: 600 22px/30px "Inter", sans-serif;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Header L** |   |   |
| *Visual* |   | *Figma Variable* |
|  |   | `wide/fontHeaderL/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-header-l-600-font` `$sds-font-header-l-600-font`  `--sds-font-header-l-600-letter-spacing` `$sds-font-header-l-600-letter-spacing` |   | `font: 600 18px/24px "Inter", sans-serif;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Header M** |   |   |
| *Visual* |   | *Figma Variable* |
|  |   | `wide/fontHeaderM/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-header-m-600-font` `$sds-font-header-m-600-font`  `--sds-font-header-m-600-letter-spacing` `$sds-font-header-m-600-letter-spacing` |   | `font: 600 16px/22px "Inter", sans-serif;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Header S** |   |   |
| *Visual* |   | *Figma Variable* |
|  |   | `wide/fontHeaderS/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-header-s-600-font` `$sds-font-header-s-600-font`  `--sds-font-header-s-600-letter-spacing` `$sds-font-header-s-600-letter-spacing` |   | `font: 600 14px/20px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
|   |   |   |
| **Font Header XS** |   |   |
| *Visual* |   | *Figma Variable* |
|  |   | `wide/fontHeaderXs/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-header-xs-600-font` `$sds-font-header-xs-600-font`  `--sds-font-header-xs-600-letter-spacing` `$sds-font-header-xs-600-letter-spacing` |   | `font: 600 13px/18px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
|   |   |   |
| **Font Header XXS** |   |   |
| *Visual* |   | *Figma Variable* |
|  |   | `wide/fontHeaderXxs/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-header-xxs-600-font` `$sds-font-header-xxs-600-font`  `--sds-font-header-xxs-600-letter-spacing` `$sds-font-header-xxs-600-letter-spacing` |   | `font: 600 12px/18px "Inter", sans-serif;`  `letter-spacing: 0.1px;` |
|   |   |   |
| **Font Header XXXS** |   |   |
| *Visual* |   | *Figma Variable* |
|  |   | `wide/fontHeaderXxxs/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-header-xxxs-600-font` `$sds-font-header-xxxs-600-font`  `--sds-font-header-xxxs-600-letter-spacing` `$sds-font-header-xxxs-600-letter-spacing` |   | `font: 600 11px/16px "Inter", sans-serif;`  `letter-spacing: 0.1px;` |

#### Body

For use with `<p>` tags.

| **Font Body L** |   |   |
| --- | --- | --- |
| *Visual* |   | *Figma Variables* |
|       |   | `wide/fontBodyL/600`  `wide/fontBodyL/500`  `wide/fontBodyL/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-body-l-600-font` `$sds-font-body-l-600-font`  `--sds-font-body-l-600-letter-spacing` `$sds-font-body-l-600-letter-spacing` |   | `font: 600 18px/28px "Inter", sans-serif;`  `letter-spacing: 0px;` |
| `--sds-font-body-l-500-font` `$sds-font-body-l-500-font`  `--sds-font-body-l-500-letter-spacing` `$sds-font-body-l-500-letter-spacing` |   | `font: 500 18px/28px "Inter", sans-serif;`  `letter-spacing: 0px;` |
| `--sds-font-body-l-400-font` `$sds-font-body-l-400-font`  `--sds-font-body-l-400-letter-spacing` `$sds-font-body-l-400-letter-spacing` |   | `font: 400 18px/28px "Inter", sans-serif;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Body M** |   |   |
| *Visual* |   | *Figma Variables* |
|       |   | `wide/fontBodyM/600`  `wide/fontBodyM/500`  `wide/fontBodyM/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-body-m-600-font` `$sds-font-body-m-600-font``--sds-font-body-m-600-letter-spacing``$sds-font-body-m-600-letter-spacing` |   | `font: 600 16px/26px "Inter", sans-serif;`  `letter-spacing: 0px;` |
| `--sds-font-body-m-500-font` `$sds-font-body-m-500-font``--sds-font-body-m-500-letter-spacing``$sds-font-body-m-500-letter-spacing` |   | `font: 500 16px/26px "Inter", sans-serif;`  `letter-spacing: 0px;` |
| `--sds-font-body-m-400-font` `$sds-font-body-m-400-font`  `--sds-font-body-m-400-letter-spacing` `$sds-font-body-m-400-letter-spacing` |   | `font: 400 16px/26px "Inter", sans-serif;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Body S** |   |   |
| *Visual* |   | *Figma Variables* |
|        |   | `wide/fontBodyS/600`  `wide/fontBodyS/500`  `wide/fontBodyS/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-body-s-600-font` `$sds-font-body-s-600-font`  `--sds-font-body-s-600-letter-spacing` `$sds-font-body-s-600-letter-spacing` |   | `font: 600 14px/24px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
| `--sds-font-body-s-500-font` `$sds-font-body-s-500-font`  `--sds-font-body-s-500-letter-spacing` `$sds-font-body-s-500-letter-spacing` |   | `font: 500 14px/24px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
| `--sds-font-body-s-400-font` `$sds-font-body-s-400-font`  `--sds-font-body-s-400-letter-spacing` `$sds-font-body-s-400-letter-spacing` |   | `font: 400 14px/24px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
|   |   |   |
| **Font Body XS** |   |   |
| *Visual* |   | *Figma Variables* |
|       |   | `wide/fontBodyXs/600`  `wide/fontBodyXs/500`  `wide/fontBodyXs/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-body-xs-600-font` `$sds-font-body-xs-600-font`  `--sds-font-body-xs-600-letter-spacing` `$sds-font-body-xs-600-letter-spacing` |   | `font: 600 13px/20px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
| `--sds-font-body-xs-500-font` `$sds-font-body-xs-500-font`  `--sds-font-body-xs-500-letter-spacing` `$sds-font-body-xs-500-letter-spacing` |   | `font: 500 13px/20px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
| `--sds-font-body-xs-400-font` `$sds-font-body-xs-400-font`  `--sds-font-body-xs-400-letter-spacing` `$sds-font-body-xs-400-letter-spacing` |   | `font: 400 13px/20px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
|   |   |   |
| **Font Body XXS** |   |   |
| *Visual* |   | *Figma Variables* |
|       |   | `wide/fontBodyXxs/600`  `wide/fontBodyXxs/500`  `wide/fontBodyXxs/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-body-xxs-600-font` `$sds-font-body-xxs-600-font`  `--sds-font-body-xxs-600-letter-spacing` `$sds-font-body-xxs-600-letter-spacing` |   | `font: 600 12px/18px "Inter", sans-serif;`  `letter-spacing: 0.1px;` |
| `--sds-font-body-xxs-500-font` `$sds-font-body-xxs-500-font`  `--sds-font-body-xxs-500-letter-spacing` `$sds-font-body-xxs-500-letter-spacing` |   | `font: 500 12px/18px "Inter", sans-serif;`  `letter-spacing: 0.1px;` |
| `--sds-font-body-xxs-400-font` `$sds-font-body-xxs-400-font`  `--sds-font-body-xxs-400-letter-spacing` `$sds-font-body-xxs-400-letter-spacing` |   | `font: 400 12px/18px "Inter", sans-serif;`  `letter-spacing: 0.1px;` |
|   |   |   |
| **Font Body XXXS** |   |   |
| *Visual* |   | *Figma Variables* |
|       |   | `wide/fontBodyXxxs/600`  `wide/fontBodyXxxs/500`  `wide/fontBodyXxxs/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-body-xxxs-600-font` `$sds-font-body-xxxs-600-font`  `--sds-font-body-xxxs-600-letter-spacing` `$sds-font-body-xxxs-600-letter-spacing` |   | `font: 600 11px/16px "Inter", sans-serif;`  `letter-spacing: 0.1px;` |
| `--sds-font-body-xxxs-500-font` `$sds-font-body-xxxs-500-font`  `--sds-font-body-xxxs-500-letter-spacing` `$sds-font-body-xxxs-500-letter-spacing` |   | `font: 500 11px/16px "Inter", sans-serif;`  `letter-spacing: 0.1px;` |
| `--sds-font-body-xxxs-400-font` `$sds-font-body-xxxs-400-font`  `--sds-font-body-xxxs-400-letter-spacing` `$sds-font-body-xxxs-400-letter-spacing` |   | `font: 400 11px/16px "Inter", sans-serif;`  `letter-spacing: 0.1px;` |

#### All-caps

Use for emphasis or when there is a need for distinction between fonts on a page or in a component, such as in Minimal [Buttons](https://sds.czi.design/009eaf17b/v/0/p/47778c-buttons/t/page-47778c-78852505-14cb06-62).

| **Font Caps XXS** |   |   |
| --- | --- | --- |
| *Visual* |   | *Figma Variable* |
|  |   | `wide/fontCapsXxs/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-caps-xxs-600-font` `$sds-font-caps-xxs-600-font`  `--sds-font-caps-xxs-600-letter-spacing` `$sds-font-caps-xxs-600-letter-spacing`  `--sds-font-caps-xxs-600-text-transform``$sds-font-caps-xxs-600-text-transform` |   | `font: 600 12px/18px "Inter", sans-serif;`  `letter-spacing: 0.5px;`  `text-transform: uppercase;` |
|   |   |   |
| **Font Caps XXXS** |   |   |
| *Visual* |   | *Figma Variable* |
|  |   | `wide/fontCapsXxxs/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-caps-xxxs-600-font` `$sds-font-caps-xxxs-600-font`  `--sds-font-caps-xxxs-600-letter-spacing` `$sds-font-caps-xxxs-600-letter-spacing`  `--sds-font-caps-xxxs-600-text-transform` `$sds-font-caps-xxxs-600-text-transform` |   | `font: 600 11px/16px "Inter", sans-serif;`  `letter-spacing: 0.5px;`  `text-transform: uppercase;` |
|   |   |   |
| **Font Caps XXXXS** |   |   |
| *Visual* |   | *Figma Variable* |
|   |   | `wide/fontCapsXxxxs/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-caps-xxxxs-600-font` `$sds-font-caps-xxxxs-600-font`  `--sds-font-caps-xxxxs-600-letter-spacing` `$sds-font-caps-xxxxs-600-letter-spacing`  `--sds-font-caps-xxxxs-600-text-transform` `$sds-font-caps-xxxxs-600-text-transform` |   | `font: 600 10px/14px "Inter", sans-serif;`  `letter-spacing: 0.5px;`  `text-transform: uppercase;`  |

#### Tabular

Use when there is a need for numbers to be an equal width such as in [Tables](https://sds.czi.design/009eaf17b/p/1647a1).

| **Font Tabular S** |   |   |
| --- | --- | --- |
| *Visual* |   | *Figma Variables* |
|        |   | `wide/fontTabularS/600`  `wide/fontTabularS/500`  `wide/fontTabularS/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-tabular-s-600-font` `$sds-font-tabular-s-600-font`  `--sds-font-tabular-s-600-font-variant-numeric` `$sds-font-tabular-s-600-font-variant-numeric`  `--sds-font-tabular-s-600-letter-spacing` `$sds-font-tabular-s-600-letter-spacing` |   | `font: 600 14px/24px "Inter", sans-serif;`  `font-variant-numeric: tabular-nums;`  `letter-spacing: 0px;` |
| `--sds-font-tabular-s-500-font` `$sds-font-tabular-s-500-font`  `--sds-font-tabular-s-500-font-variant-numeric` `$sds-font-tabular-s-500-font-variant-numeric`  `--sds-font-tabular-s-500-letter-spacing` `$sds-font-tabular-s-500-letter-spacing` |   | `font: 500 14px/24px "Inter", sans-serif;`  `font-variant-numeric: tabular-nums;`  `letter-spacing: 0px;` |
| `--sds-font-tabular-s-400-font` `$sds-font-tabular-s-400-font`  `--sds-font-tabular-s-400-font-variant-numeric` `$sds-font-tabular-s-400-font-variant-numeric`  `--sds-font-tabular-s-400-letter-spacing` `$sds-font-tabular-s-400-letter-spacing` |   | `font: 400 14px/24px "Inter", sans-serif;`  `font-variant-numeric: tabular-nums;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Tabular XS** |   |   |
| *Visual* |   | *Figma Variables* |
|       |   | `wide/fontTabularXs/600`  `wide/fontTabularXs/500`  `wide/fontTabularXs/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-tabular-xs-600-font` `$sds-font-tabular-xs-600-font`  `--sds-font-tabular-xs-600-font-variant-numeric` `$sds-font-tabular-xs-600-font-variant-numeric`  `--sds-font-tabular-xs-600-letter-spacing` `$sds-font-tabular-xs-600-letter-spacing` |   | `font: 600 13px/20px "Inter", sans-serif;`  `font-variant-numeric: tabular-nums;`  `letter-spacing: 0px;` |
| `--sds-font-tabular-xs-500-font` `$sds-font-tabular-xs-500-font`  `--sds-font-tabular-xs-500-font-variant-numeric` `$sds-font-tabular-xs-500-font-variant-numeric`  `--sds-font-tabular-xs-500-letter-spacing` `$sds-font-tabular-xs-500-letter-spacing` |   | `font: 500 13px/20px "Inter", sans-serif;`  `font-variant-numeric: tabular-nums;`  `letter-spacing: 0px;` |
| `--sds-font-tabular-xs-400-font` `$sds-font-tabular-xs-400-font`  `--sds-font-tabular-xs-400-font-variant-numeric` `$sds-font-tabular-xs-400-font-variant-numeric`  `--sds-font-tabular-xs-400-letter-spacing` `$sds-font-tabular-xs-400-letter-spacing` |   | `font: 400 13px/20px "Inter", sans-serif;`  `font-variant-numeric: tabular-nums;`  `letter-spacing: 0px;` |

#### Code

Use only when referring to code snippets.

| **Font Code S** |   |   |
| --- | --- | --- |
| *Visual* |   | *Figma Variables* |
|        |   | `wide/fontCodeS/600`  `wide/fontCodeS/500`  `wide/fontCodeS/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-code-s-600-font` `$sds-font-code-s-600-font`  `--sds-font-code-s-600-letter-spacing` `$sds-font-code-s-600-letter-spacing` |   | `font: 600 14px/24px "IBM Plex Mono", monospace;`  `letter-spacing: 0px;` |
| `--sds-font-code-s-500-font` `$sds-font-code-s-500-font`  `--sds-font-code-s-500-letter-spacing` `$sds-font-code-s-500-letter-spacing` |   | `font: 500 14px/24px "IBM Plex Mono", monospace;`  `letter-spacing: 0px;` |
| `--sds-font-code-s-400-font` `$sds-font-code-s-400-font`  `--sds-font-code-s-400-letter-spacing` `$sds-font-code-s-400-letter-spacing` |   | `font: 400 14px/24px "IBM Plex Mono", monospace;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Code XS** |   |   |
| *Visual* |   | *Figma Variables* |
|        |   | `wide/fontCodeXs/600`  `wide/fontCodeXs/500`  `wide/fontCodeXs/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-code-xs-600-font` `$sds-font-code-xs-600-font`  `--sds-font-code-xs-600-letter-spacing` `$sds-font-code-xs-600-letter-spacing` |   | `font: 600 13px/20px "IBM Plex Mono", monospace;`  `letter-spacing: 0px;` |
| `--sds-font-code-xs-500-font` `$sds-font-code-xs-500-font`  `--sds-font-code-xs-500-letter-spacing` `$sds-font-code-xs-500-letter-spacing` |   | `font: 500 13px/20px "IBM Plex Mono", monospace;`  `letter-spacing: 0px;` |
| `--sds-font-code-xs-400-font` `$sds-font-code-xs-400-font`  `--sds-font-code-xs-400-letter-spacing` `$sds-font-code-xs-400-letter-spacing` |   | `font: 400 13px/20px "IBM Plex Mono", monospace;`  `letter-spacing: 0px;` |

## Narrow

### Typefaces

Inter is the primary typeface to be used throughout product and marketing materials. IBM Plex Mono should only be used when referring to code snippets.

| **Visual** |   | **Typeface** |   | **Usage** |
| --- | --- | --- | --- | --- |
|  |   | Inter (600) |   | All headers throughout the product and marketing materials, and emphasized body copy. |
|  |   | Inter (500) |   | For text that needs slight emphasis. |
|  |   | Inter (400) |   | All body copy throughout the product and marketing materials. If emphasized copy is needed, use a font weight of 600. |
|  |   | IBM Plex Mono (400) |   | Use only when referring to code snippets. |

### Font Weights

Regular (400) and SemiBold (600) are the two font weights primarily used across the product, however additional font weights are available to be selectively used if needed.

| **Visual** |   | **Variable** |   | **Value** |
| --- | --- | --- | --- | --- |
|  |   | `fontWeightHeavy` |   | `font-weight: 800;` |
|  |   | `fontWeightBold` |   | `font-weight: 700;` |
|  |   | `fontWeightSemibold` |   | `font-weight: 600;` |
|  |   | `fontWeightRegular` |   | `font-weight: 400;` |
|  |   | `fontWeightThin` |   | `font-weight: 300;` |

---

### Typography Variables

#### TItle

For use with [Hero](https://sds.czi.design/009eaf17b/p/87f1b1) component.

| **Font Title L** |   |   |
| --- | --- | --- |
| *Visual* |   | *Figma Variable* |
|  |   | `narrow/fontTitleL/700` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-title-l-700-font-narrow` `$sds-font-title-l-700-font-narrow`  `--sds-font-title-l-700-letter-spacing-narrow` `$sds-font-title-l-700-letter-spacing-narrow` |   | `font: 700 40px/50x "Inter", sans-serif;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Title M** |   |   |
| *Visual* |   | *Figma Variable* |
|  |   | `narrow/fontTitleM/700` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-title-m-700-font-narrow` `$sds-font-title-m-700-font-narrow`  `--sds-font-title-m-700-letter-spacing-narrow` `$sds-font-title-m-700-letter-spacing-narrow` |   | `font: 700 32px/40px "Inter", sans-serif;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Tile S** |   |   |
| *Visual* |   | *Figma Variable* |
|   |   | `narrow/fontTitleS/700` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-title-s-700-font-narrow` `$sds-font-title-s-700-font-narrow`  `--sds-font-title-s-700-letter-spacing-narrow` `$sds-font-title-s-700-letter-spacing-narrow` |   | `font: 700 26px/34px "Inter", sans-serif;`  `letter-spacing: 0px;`  |

#### Header

For use with `<H1>`, `<H2>`, `<H3>`, `<H4>`, `<H5>`, `<H6>` tags.

| **Font Header XXL** |   |   |
| --- | --- | --- |
| *Visual* |   | *Figma Variable* |
|  |   | `narrow/fontHeaderXxl/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-header-xxl-600-font-narrow` `$sds-font-header-xxl-600-font-narrow`  `--sds-font-header-xxl-600-letter-spacing-narrow` `$sds-font-header-xxl-600-letter-spacing-narrow` |   | `font: 600 22px/30px "Inter", sans-serif;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Header XL** |   |   |
| *Visual* |   | *Figma Variable* |
|   |   | `narrow/fontHeaderXl/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-header-xl-600-font-narrow` `$sds-font-header-xl-600-font-narrow`  `--sds-font-header-xl-600-letter-spacing-narrow` `$sds-font-header-xl-600-letter-spacing-narrow` |   | `font: 600 18px/24px "Inter", sans-serif;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Header L** |   |   |
| *Visual* |   | *Figma Variable* |
|  |   | `narrow/fontHeaderL/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-header-l-600-font-narrow` `$sds-font-header-l-600-font-narrow`  `--sds-font-header-l-600-letter-spacing-narrow` `$sds-font-header-l-600-letter-spacing-narrow` |   | `font: 600 16px/22px "Inter", sans-serif;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Header M** |   |   |
| *Visual* |   | *Figma Variable* |
|  |   | `narrow/fontHeaderM/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-header-m-600-font-narrow` `$sds-font-header-m-600-font-narrow`  `--sds-font-header-m-600-letter-spacing-narrow` `$sds-font-header-m-600-letter-spacing-narrow` |   | `font: 600 14px/20px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
|   |   |   |
| **Font Header S** |   |   |
| *Visual* |   | *Figma Variable* |
|  |   | `narrow/fontHeaderS/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-header-s-600-font-narrow` `$sds-font-header-s-600-font-narrow`  `--sds-font-header-s-600-letter-spacing-narrow` `$sds-font-header-s-600-letter-spacing-narrow` |   | `font: 600 14px/20px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
|   |   |   |
| **Font Header XS** |   |   |
| *Visual* |   | *Figma Variable* |
|  |   | `narrow/fontHeaderXs/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-header-xs-600-font-narrow` `$sds-font-header-xs-600-font-narrow`  `--sds-font-header-xs-600-letter-spacing-narrow` `$sds-font-header-xs-600-letter-spacing-narrow` |   | `font: 600 13px/18px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
|   |   |   |
| **Font Header XXS** |   |   |
| *Visual* |   | *Figma Variable* |
|  |   | `narrow/fontHeaderXxs/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-header-xxs-600-font-narrow` `$sds-font-header-xxs-600-font-narrow`  `--sds-font-header-xxs-600-letter-spacing-narrow` `$sds-font-header-xxs-600-letter-spacing-narrow` |   | `font: 600 12px/18px "Inter", sans-serif;`  `letter-spacing: 0.1px;` |
|   |   |   |
| **Font Header XXXS** |   |   |
| *Visual* |   | *Figma Variable* |
|  |   | `narrow/fontHeaderXxxs/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-header-xxxs-600-font-narrow` `$sds-font-header-xxxs-600-font-narrow`  `--sds-font-header-xxxs-600-letter-spacing-narrow` `$sds-font-header-xxxs-600-letter-spacing-narrow` |   | `font: 600 12px/18px "Inter", sans-serif;`  `letter-spacing: 0.1px;` |

#### Body

For use with `<p>` tags.

| **Font Body L** |   |   |
| --- | --- | --- |
| *Visual* |   | *Figma Variables* |
|       |   | `narrow/fontBodyL/600`  `narrow/fontBodyL/500`  `narrow/fontBodyL/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-body-l-600-font-narrow` `$sds-font-body-l-600-font-narrow`  `--sds-font-body-l-600-letter-spacing-narrow` `$sds-font-body-l-600-letter-spacing-narrow` |   | `font: 600 16px/26px "Inter", sans-serif;`  `letter-spacing: 0px;` |
| `--sds-font-body-l-500-font-narrow` `$sds-font-body-l-500-font-narrow`  `--sds-font-body-l-500-letter-spacing-narrow` `$sds-font-body-l-500-letter-spacing-narrow` |   | `font: 500 16px/26px "Inter", sans-serif;`  `letter-spacing: 0px;` |
| `--sds-font-body-l-400-font-narrow` `$sds-font-body-l-400-font-narrow`  `--sds-font-body-l-400-letter-spacing-narrow` `$sds-font-body-l-400-letter-spacing-narrow` |   | `font: 400 16px/26px "Inter", sans-serif;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Body M** |   |   |
| *Visual* |   | *Figma Variables* |
|       |   | `narrow/fontBodyM/600`  `narrow/fontBodyM/500`  `narrow/fontBodyM/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-body-m-600-font-narrow` `$sds-font-body-m-600-font-narrow``--sds-font-body-m-600-letter-spacing-narrow``$sds-font-body-m-600-letter-spacing-narrow` |   | `font: 600 14px/24px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
| `--sds-font-body-m-500-font-narrow` `$sds-font-body-m-500-font-narrow``--sds-font-body-m-500-letter-spacing-narrow``$sds-font-body-m-500-letter-spacing-narrow` |   | `font: 500 14px/24px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
| `--sds-font-body-m-400-font-narrow` `$sds-font-body-m-400-font-narrow`  `--sds-font-body-m-400-letter-spacing-narrow` `$sds-font-body-m-400-letter-spacing-narrow` |   | `font: 400 14px/24px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
|   |   |   |
| **Font Body S** |   |   |
| *Visual* |   | *Figma Variables* |
|        |   | `narrow/fontBodyS/600`  `narrow/fontBodyS/500`  `narrow/fontBodyS/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-body-s-600-font-narrow` `$sds-font-body-s-600-font-narrow`  `--sds-font-body-s-600-letter-spacing-narrow` `$sds-font-body-s-600-letter-spacing-narrow` |   | `font: 600 14px/24px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
| `--sds-font-body-s-500-font-narrow` `$sds-font-body-s-500-font-narrow`  `--sds-font-body-s-500-letter-spacing-narrow` `$sds-font-body-s-500-letter-spacing-narrow` |   | `font: 500 14px/24px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
| `--sds-font-body-s-400-font-narrow` `$sds-font-body-s-400-font-narrow`  `--sds-font-body-s-400-letter-spacing-narrow` `$sds-font-body-s-400-letter-spacing-narrow` |   | `font: 400 14px/24px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
|   |   |   |
| **Font Body XS** |   |   |
| *Visual* |   | *Figma Variables* |
|       |   | `narrow/fontBodyXs/600`  `narrow/fontBodyXs/500`  `narrow/fontBodyXs/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-body-xs-600-font-narrow` `$sds-font-body-xs-600-font-narrow`  `--sds-font-body-xs-600-letter-spacing-narrow` `$sds-font-body-xs-600-letter-spacing-narrow` |   | `font: 600 13px/20px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
| `--sds-font-body-xs-500-font-narrow` `$sds-font-body-xs-500-font-narrow`  `--sds-font-body-xs-500-letter-spacing-narrow` `$sds-font-body-xs-500-letter-spacing-narrow` |   | `font: 500 13px/20px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
| `--sds-font-body-xs-400-font-narrow` `$sds-font-body-xs-400-font-narrow`  `--sds-font-body-xs-400-letter-spacing-narrow` `$sds-font-body-xs-400-letter-spacing-narrow` |   | `font: 400 13px/20px "Inter", sans-serif;`  `letter-spacing: 0.08px;` |
|   |   |   |
| **Font Body XXS** |   |   |
| *Visual* |   | *Figma Variables* |
|       |   | `narrow/fontBodyXxs/600`  `narrow/fontBodyXxs/500`  `narrow/fontBodyXxs/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-body-xxs-600-font-narrow` `$sds-font-body-xxs-600-font-narrow`  `--sds-font-body-xxs-600-letter-spacing-narrow` `$sds-font-body-xxs-600-letter-spacing-narrow` |   | `font: 600 12px/18px "Inter", sans-serif;`  `letter-spacing: 0.1px;` |
| `--sds-font-body-xxs-500-font-narrow` `$sds-font-body-xxs-500-font-narrow`  `--sds-font-body-xxs-500-letter-spacing-narrow` `$sds-font-body-xxs-500-letter-spacing-narrow` |   | `font: 500 12px/18px "Inter", sans-serif;`  `letter-spacing: 0.1px;` |
| `--sds-font-body-xxs-400-font-narrow` `$sds-font-body-xxs-400-font-narrow`  `--sds-font-body-xxs-400-letter-spacing-narrow` `$sds-font-body-xxs-400-letter-spacing-narrow` |   | `font: 400 12px/18px "Inter", sans-serif;`  `letter-spacing: 0.1px;` |
|   |   |   |
| **Font Body XXXS** |   |   |
| *Visual* |   | *Figma Variables* |
|       |   | `narrow/fontBodyXxxs/600`  `narrow/fontBodyXxxs/500`  `narrow/fontBodyXxxs/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-body-xxxs-600-font-narrow` `$sds-font-body-xxxs-600-font-narrow`  `--sds-font-body-xxxs-600-letter-spacing-narrow` `$sds-font-body-xxxs-600-letter-spacing-narrow` |   | `font: 600 12px/18px "Inter", sans-serif;`  `letter-spacing: 0.1px;` |
| `--sds-font-body-xxxs-500-font-narrow` `$sds-font-body-xxxs-500-font-narrow`  `--sds-font-body-xxxs-500-letter-spacing-narrow` `$sds-font-body-xxxs-500-letter-spacing-narrow` |   | `font: 500 12px/18px "Inter", sans-serif;`  `letter-spacing: 0.1px;` |
| `--sds-font-body-xxxs-400-font-narrow` `$sds-font-body-xxxs-400-font-narrow`  `--sds-font-body-xxxs-400-letter-spacing-narrow` `$sds-font-body-xxxs-400-letter-spacing-narrow` |   | `font: 400 12px/18px "Inter", sans-serif;`  `letter-spacing: 0.1px;` |

#### All-caps

Use for emphasis or when there is a need for distinction between fonts on a page or in a component, such as in Minimal [Buttons](https://sds.czi.design/009eaf17b/v/0/p/47778c-buttons/t/page-47778c-78852505-14cb06-62).

| **Font Caps XXS** |   |   |
| --- | --- | --- |
| *Visual* |   | *Figma Variable* |
|  |   | `narrow/fontCapsXxs/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-caps-xxs-600-font-narrow` `$sds-font-caps-xxs-600-font-narrow`  `--sds-font-caps-xxs-600-letter-spacing-narrow` `$sds-font-caps-xxs-600-letter-spacing-narrow`  `--sds-font-caps-xxs-600-text-transform-narrow``$sds-font-caps-xxs-600-text-transform-narrow` |   | `font: 600 12px/18px "Inter", sans-serif;`  `letter-spacing: 0.5px;`  `text-transform: uppercase;` |
|   |   |   |
| **Font Caps XXXS** |   |   |
| *Visual* |   | *Figma Variable* |
|  |   | `narrow/fontCapsXxxs/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-caps-xxxs-600-font-narrow` `$sds-font-caps-xxxs-600-font-narrow`  `--sds-font-caps-xxxs-600-letter-spacing-narrow` `$sds-font-caps-xxxs-600-letter-spacing-narrow`  `--sds-font-caps-xxxs-600-text-transform-narrow` `$sds-font-caps-xxxs-600-text-transform-narrow` |   | `font: 600 11px/16px "Inter", sans-serif;`  `letter-spacing: 0.5px;`  `text-transform: uppercase;` |
|   |   |   |
| **Font Caps XXXXS** |   |   |
| *Visual* |   | *Figma Variable* |
|   |   | `narrow/fontCapsXxxxs/600` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-caps-xxxxs-600-font-narrow` `$sds-font-caps-xxxxs-600-font-narrow`  `--sds-font-caps-xxxxs-600-letter-spacing-narrow` `$sds-font-caps-xxxxs-600-letter-spacing-narrow`  `--sds-font-caps-xxxxs-600-text-transform-narrow` `$sds-font-caps-xxxxs-600-text-transform-narrow` |   | `font: 600 11px/16px "Inter", sans-serif;`  `letter-spacing: 0.5px;`  `text-transform: uppercase;`  |

#### Tabular

Use when there is a need for numbers to be an equal width such as in [Tables](https://sds.czi.design/009eaf17b/p/1647a1).

| **Font Tabular S** |   |   |
| --- | --- | --- |
| *Visual* |   | *Figma Variables* |
|        |   | `narrow/fontTabularS/600`  `narrow/fontTabularS/500`  `narrow/fontTabularS/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-tabular-s-600-font-narrow` `$sds-font-tabular-s-600-font-narrow`  `--sds-font-tabular-s-600-font-variant-numeric-narrow` `$sds-font-tabular-s-600-font-variant-numeric-narrow`  `--sds-font-tabular-s-600-letter-spacing-narrow` `$sds-font-tabular-s-600-letter-spacing-narrow` |   | `font: 600 14px/24px "Inter", sans-serif;`  `font-variant-numeric: tabular-nums;`  `letter-spacing: 0px;` |
| `--sds-font-tabular-s-500-font-narrow` `$sds-font-tabular-s-500-font-narrow`  `--sds-font-tabular-s-500-font-variant-numeric-narrow` `$sds-font-tabular-s-500-font-variant-numeric-narrow`  `--sds-font-tabular-s-500-letter-spacing-narrow` `$sds-font-tabular-s-500-letter-spacing-narrow` |   | `font: 500 14px/24px "Inter", sans-serif;`  `font-variant-numeric: tabular-nums;`  `letter-spacing: 0px;` |
| `--sds-font-tabular-s-400-font-narrow` `$sds-font-tabular-s-400-font-narrow`  `--sds-font-tabular-s-400-font-variant-numeric-narrow` `$sds-font-tabular-s-400-font-variant-numeric-narrow`  `--sds-font-tabular-s-400-letter-spacing-narrow` `$sds-font-tabular-s-400-letter-spacing-narrow` |   | `font: 400 14px/24px "Inter", sans-serif;`  `font-variant-numeric: tabular-nums;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Tabular XS** |   |   |
| *Visual* |   | *Figma Variables* |
|       |   | `narrow/fontTabularXs/600`  `narrow/fontTabularXs/500`  `narrow/fontTabularXs/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-tabular-xs-600-font-narrow` `$sds-font-tabular-xs-600-font-narrow`  `--sds-font-tabular-xs-600-font-variant-numeric-narrow` `$sds-font-tabular-xs-600-font-variant-numeric-narrow`  `--sds-font-tabular-xs-600-letter-spacing-narrow` `$sds-font-tabular-xs-600-letter-spacing-narrow` |   | `font: 600 13px/20px "Inter", sans-serif;`  `font-variant-numeric: tabular-nums;`  `letter-spacing: 0px;` |
| `--sds-font-tabular-xs-500-font-narrow` `$sds-font-tabular-xs-500-font-narrow`  `--sds-font-tabular-xs-500-font-variant-numeric-narrow` `$sds-font-tabular-xs-500-font-variant-numeric-narrow`  `--sds-font-tabular-xs-500-letter-spacing-narrow` `$sds-font-tabular-xs-500-letter-spacing-narrow` |   | `font: 500 13px/20px "Inter", sans-serif;`  `font-variant-numeric: tabular-nums;`  `letter-spacing: 0px;` |
| `--sds-font-tabular-xs-400-font-narrow` `$sds-font-tabular-xs-400-font-narrow`  `--sds-font-tabular-xs-400-font-variant-numeric-narrow` `$sds-font-tabular-xs-400-font-variant-numeric-narrow`  `--sds-font-tabular-xs-400-letter-spacing-narrow` `$sds-font-tabular-xs-400-letter-spacing-narrow` |   | `font: 400 13px/20px "Inter", sans-serif;`  `font-variant-numeric: tabular-nums;`  `letter-spacing: 0px;` |

#### Code

Use only when referring to code snippets.

| **Font Code S** |   |   |
| --- | --- | --- |
| *Visual* |   | *Figma Variables* |
|        |   | `narrow/fontCodeS/600`  `narrow/fontCodeS/500`  `narrow/fontCodeS/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-code-s-600-font-narrow` `$sds-font-code-s-600-font-narrow`  `--sds-font-code-s-600-letter-spacing-narrow` `$sds-font-code-s-600-letter-spacing-narrow` |   | `font: 600 14px/24px "IBM Plex Mono", monospace;`  `letter-spacing: 0px;` |
| `--sds-font-code-s-500-font-narrow` `$sds-font-code-s-500-font-narrow`  `--sds-font-code-s-500-letter-spacing-narrow` `$sds-font-code-s-500-letter-spacing-narrow` |   | `font: 500 14px/24px "IBM Plex Mono", monospace;`  `letter-spacing: 0px;` |
| `--sds-font-code-s-400-font-narrow` `$sds-font-code-s-400-font-narrow`  `--sds-font-code-s-400-letter-spacing-narrow` `$sds-font-code-s-400-letter-spacing-narrow` |   | `font: 400 14px/24px "IBM Plex Mono", monospace;`  `letter-spacing: 0px;` |
|   |   |   |
| **Font Code XS** |   |   |
| *Visual* |   | *Figma Variables* |
|        |   | `narrow/fontCodeXs/600`  `narrow/fontCodeXs/500`  `narrow/fontCodeXs/400` |
| *CSS / SCSS Variables* |   | *Values* |
| `--sds-font-code-xs-600-font-narrow` `$sds-font-code-xs-600-font-narrow`  `--sds-font-code-xs-600-letter-spacing-narrow` `$sds-font-code-xs-600-letter-spacing-narrow` |   | `font: 600 13px/20px "IBM Plex Mono", monospace;`  `letter-spacing: 0px;` |
| `--sds-font-code-xs-500-font-narrow` `$sds-font-code-xs-500-font-narrow`  `--sds-font-code-xs-500-letter-spacing-narrow` `$sds-font-code-xs-500-letter-spacing-narrow` |   | `font: 500 13px/20px "IBM Plex Mono", monospace;`  `letter-spacing: 0px;` |
| `--sds-font-code-xs-400-font-narrow` `$sds-font-code-xs-400-font-narrow`  `--sds-font-code-xs-400-letter-spacing-narrow` `$sds-font-code-xs-400-letter-spacing-narrow` |   | `font: 400 13px/20px "IBM Plex Mono", monospace;`  `letter-spacing: 0px;` |

## Code

**Using SDS Typography Variables with Tailwind CSS**

The SDS design tokens for Tailwind are exported via **Style Dictionary** and can be found in the [tailwind.json](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/common/styles-dictionary/json/tailwind.json) file. These tokens have been updated to adhere to Tailwind’s configuration standards and follow the correct format.

The typography variables in the sds tailwind.json file are defined as objects with detailed CSS properties, for example:

```json
{
  "fontFamily": {
    "sds-body": "\"Inter\", sans-serif",
    ...
  },
  "fontSize": {
    "sds-body-xxxs-400-narrow": "12px",
    "sds-body-xxxs-400-wide": "11px",
    ...
  },
  "fontVariantNumeric": {
    "sds-body-xxxs-400-narrow": "normal",
    "sds-body-xxxs-400-wide": "normal",
    ...
  },
  "letterSpacing": {
    "sds-body-xxxs-400-narrow": "0.1px",
    "sds-body-xxxs-400-wide": "0.1px",
    ...
  },
  "lineHeight": {
    "sds-body-xxxs-400-narrow": "18px",
    "sds-body-xxxs-400-wide": "16px",
    ...
  },
  "textTransform": {
    "sds-body-xxxs-400-narrow": "none",
    "sds-body-xxxs-400-wide": "none",
    ...
  },
  "typography": {
    "sds-body-xxxs-400-narrow": {
      "css": {
        "fontFamily": "Inter, sans-serif",
        "fontSize": "12px",
        "fontStyle": "normal",
        "fontVariantNumeric": "normal",
        "fontWeight": "400",
        "letterSpacing": "0.1px",
        "lineHeight": "18px",
        "textTransform": "none"
      }
    },
    ...
  }
}
```

**Using Font Variables**

To use these variables, import them into your Tailwind configuration file.

```js
const sds = require("@czi-sds/components/dist/tailwind.json");

module.exports = {
  theme: {
    extend: {
      fontFamily: sds.fontFamily,
      fontSize: sds.fontSize,
      lineHeight: sds.lineHeight,
      letterSpacing: sds.letterSpacing,
      textTransform: sds.textTransform,
      ...
    },
  },
};
```

and use them within the tailwind classes to achieve the desired typography styles:

```tsx
<div class="font-sds-header text-sds-header-l-600-wide leading-sds-header-l-600-wide">
  <p>This text uses the SDS header style.</p>
</div>
```

**Using Typography Styles**

Each typography variable includes properties such as fontFamily, fontSize, lineHeight, and others to define a complete typographic style.

To utilize SDS typography variables in your Tailwind CSS setup, follow these steps:

1. **Set Up Your Tailwind Configuration**

To integrate SDS typography variables, import the tailwind.json file from SDS into your tailwind.config.js file:

```js
const sds = require("@czi-sds/components/dist/tailwind.json");
const typography = require('@tailwindcss/typography');

module.exports = {
  theme: {
    extend: {
      typography: sds.typography, // Add the imported typography variables
    },
  },
  plugins: [typography], // Ensure the typography plugin is included
};
```

1. **Apply SDS Typography in Components**

Once the typography variables are integrated, you can apply them in your components using Tailwind’s prose class. To apply a specific SDS typography style, use the corresponding `prose-*` variant:

```tsx
<div class="prose prose-sds-body-xxxs-400-narrow">
  <p>This text uses the custom typography style for narrow body text.</p>
</div>
```

