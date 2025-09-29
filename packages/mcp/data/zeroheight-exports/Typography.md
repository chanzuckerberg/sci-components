# Typography

Typography encompasses font style, appearance, and structure which together deliver a consistent aesthetic while providing easily readable copy

## Wide

### Typefaces

Inter is the primary typeface to be used throughout product and marketing materials. IBM Plex Mono should only be used when referring to code snippets.

| **Visual** |     | **Typeface**        |     | **Usage**                                                                                                                    |
| ---------- | --- | ------------------- | --- | ---------------------------------------------------------------------------------------------------------------------------- |
|            |     | Inter (600)         |     | All headers throughout the product and marketing materials, and emphasized body copy.                                        |
|            |     | Inter (500)         |     | For text that needs slight emphasis.                                                                                         |
|            |     | Inter (400)         |     | All body copy throughout the product and marketing materials. If emphasized copy is needed, use a font weight of 500 or 600. |
|            |     | IBM Plex Mono (400) |     | Use only when referring to code snippets.                                                                                    |

### Font Weights

Regular (400) and SemiBold (600) are the two font weights primarily used across the product, however additional font weights are available to be selectively used if needed.

| **Visual** |     | **Variable**         |     | **Value**           |
| ---------- | --- | -------------------- | --- | ------------------- |
|            |     | `fontWeightHeavy`    |     | `font-weight: 800;` |
|            |     | `fontWeightBold`     |     | `font-weight: 700;` |
|            |     | `fontWeightSemibold` |     | `font-weight: 600;` |
|            |     | `fontWeightRegular`  |     | `font-weight: 400;` |
|            |     | `fontWeightThin`     |     | `font-weight: 300;` |

---

### Typography Variables

#### TItle

For use with Hero component.

| **Font Title L**                                                                                                                          |     |                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------------------------------------- |
| _Visual_                                                                                                                                  |     | _Figma Variable_                                                  |
|                                                                                                                                           |     | `wide/fontTitleL/700`                                             |
| _CSS / SCSS Variables_                                                                                                                    |     | _Values_                                                          |
| `--sds-font-title-l-700-font` `$sds-font-title-l-700-font` `--sds-font-title-l-700-letter-spacing` `$sds-font-title-l-700-letter-spacing` |     | `font: 700 52px/64px "Inter", sans-serif;` `letter-spacing: 0px;` |
|                                                                                                                                           |     |                                                                   |
| **Font Title M**                                                                                                                          |     |                                                                   |
| _Visual_                                                                                                                                  |     | _Figma Variable_                                                  |
|                                                                                                                                           |     | `wide/fontTitleM/700`                                             |
| _CSS / SCSS Variables_                                                                                                                    |     | _Values_                                                          |
| `--sds-font-title-m-700-font` `$sds-font-title-m-700-font` `--sds-font-title-m-700-letter-spacing` `$sds-font-title-m-700-letter-spacing` |     | `font: 700 40px/50px "Inter", sans-serif;` `letter-spacing: 0px;` |
|                                                                                                                                           |     |                                                                   |
| **Font Tile S**                                                                                                                           |     |                                                                   |
| _Visual_                                                                                                                                  |     | _Figma Variable_                                                  |
|                                                                                                                                           |     | `wide/fontTitleS/700`                                             |
| _CSS / SCSS Variables_                                                                                                                    |     | _Values_                                                          |
| `--sds-font-title-s-700-font` `$sds-font-title-s-700-font` `--sds-font-title-s-700-letter-spacing` `$sds-font-title-s-700-letter-spacing` |     | `font: 700 32px/40px "Inter", sans-serif;` `letter-spacing: 0px;` |

#### Header

For use with `<H1>`, `<H2>`, `<H3>`, `<H4>`, `<H5>`, `<H6>` tags.

| **Font Header XXL**                                                                                                                                       |     |                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | -------------------------------------------------------------------- |
| _Visual_                                                                                                                                                  |     | _Figma Variable_                                                     |
|                                                                                                                                                           |     | `wide/fontHeaderXxl/600`                                             |
| _CSS / SCSS Variables_                                                                                                                                    |     | _Values_                                                             |
| `--sds-font-header-xxl-600-font` `$sds-font-header-xxl-600-font` `--sds-font-header-xxl-600-letter-spacing` `$sds-font-header-xxl-600-letter-spacing`     |     | `font: 600 26px/34px "Inter", sans-serif;` `letter-spacing: 0px;`    |
|                                                                                                                                                           |     |                                                                      |
| **Font Header XL**                                                                                                                                        |     |                                                                      |
| _Visual_                                                                                                                                                  |     | _Figma Variable_                                                     |
|                                                                                                                                                           |     | `wide/fontHeaderXl/600`                                              |
| _CSS / SCSS Variables_                                                                                                                                    |     | _Values_                                                             |
| `--sds-font-header-xl-600-font` `$sds-font-header-xl-600-font` `--sds-font-header-xl-600-letter-spacing` `$sds-font-header-xl-600-letter-spacing`         |     | `font: 600 22px/30px "Inter", sans-serif;` `letter-spacing: 0px;`    |
|                                                                                                                                                           |     |                                                                      |
| **Font Header L**                                                                                                                                         |     |                                                                      |
| _Visual_                                                                                                                                                  |     | _Figma Variable_                                                     |
|                                                                                                                                                           |     | `wide/fontHeaderL/600`                                               |
| _CSS / SCSS Variables_                                                                                                                                    |     | _Values_                                                             |
| `--sds-font-header-l-600-font` `$sds-font-header-l-600-font` `--sds-font-header-l-600-letter-spacing` `$sds-font-header-l-600-letter-spacing`             |     | `font: 600 18px/24px "Inter", sans-serif;` `letter-spacing: 0px;`    |
|                                                                                                                                                           |     |                                                                      |
| **Font Header M**                                                                                                                                         |     |                                                                      |
| _Visual_                                                                                                                                                  |     | _Figma Variable_                                                     |
|                                                                                                                                                           |     | `wide/fontHeaderM/600`                                               |
| _CSS / SCSS Variables_                                                                                                                                    |     | _Values_                                                             |
| `--sds-font-header-m-600-font` `$sds-font-header-m-600-font` `--sds-font-header-m-600-letter-spacing` `$sds-font-header-m-600-letter-spacing`             |     | `font: 600 16px/22px "Inter", sans-serif;` `letter-spacing: 0px;`    |
|                                                                                                                                                           |     |                                                                      |
| **Font Header S**                                                                                                                                         |     |                                                                      |
| _Visual_                                                                                                                                                  |     | _Figma Variable_                                                     |
|                                                                                                                                                           |     | `wide/fontHeaderS/600`                                               |
| _CSS / SCSS Variables_                                                                                                                                    |     | _Values_                                                             |
| `--sds-font-header-s-600-font` `$sds-font-header-s-600-font` `--sds-font-header-s-600-letter-spacing` `$sds-font-header-s-600-letter-spacing`             |     | `font: 600 14px/20px "Inter", sans-serif;` `letter-spacing: 0.08px;` |
|                                                                                                                                                           |     |                                                                      |
| **Font Header XS**                                                                                                                                        |     |                                                                      |
| _Visual_                                                                                                                                                  |     | _Figma Variable_                                                     |
|                                                                                                                                                           |     | `wide/fontHeaderXs/600`                                              |
| _CSS / SCSS Variables_                                                                                                                                    |     | _Values_                                                             |
| `--sds-font-header-xs-600-font` `$sds-font-header-xs-600-font` `--sds-font-header-xs-600-letter-spacing` `$sds-font-header-xs-600-letter-spacing`         |     | `font: 600 13px/18px "Inter", sans-serif;` `letter-spacing: 0.08px;` |
|                                                                                                                                                           |     |                                                                      |
| **Font Header XXS**                                                                                                                                       |     |                                                                      |
| _Visual_                                                                                                                                                  |     | _Figma Variable_                                                     |
|                                                                                                                                                           |     | `wide/fontHeaderXxs/600`                                             |
| _CSS / SCSS Variables_                                                                                                                                    |     | _Values_                                                             |
| `--sds-font-header-xxs-600-font` `$sds-font-header-xxs-600-font` `--sds-font-header-xxs-600-letter-spacing` `$sds-font-header-xxs-600-letter-spacing`     |     | `font: 600 12px/18px "Inter", sans-serif;` `letter-spacing: 0.1px;`  |
|                                                                                                                                                           |     |                                                                      |
| **Font Header XXXS**                                                                                                                                      |     |                                                                      |
| _Visual_                                                                                                                                                  |     | _Figma Variable_                                                     |
|                                                                                                                                                           |     | `wide/fontHeaderXxxs/600`                                            |
| _CSS / SCSS Variables_                                                                                                                                    |     | _Values_                                                             |
| `--sds-font-header-xxxs-600-font` `$sds-font-header-xxxs-600-font` `--sds-font-header-xxxs-600-letter-spacing` `$sds-font-header-xxxs-600-letter-spacing` |     | `font: 600 11px/16px "Inter", sans-serif;` `letter-spacing: 0.1px;`  |

#### Body

For use with `<p>` tags.

| **Font Body L**                                                                                                                                   |     |                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------------------------------------------- |
| _Visual_                                                                                                                                          |     | _Figma Variables_                                                       |
|                                                                                                                                                   |     | `wide/fontBodyL/600` `wide/fontBodyL/500` `wide/fontBodyL/400`          |
| _CSS / SCSS Variables_                                                                                                                            |     | _Values_                                                                |
| `--sds-font-body-l-600-font` `$sds-font-body-l-600-font` `--sds-font-body-l-600-letter-spacing` `$sds-font-body-l-600-letter-spacing`             |     | `font: 600 18px/28px "Inter", sans-serif;` `letter-spacing: 0px;`       |
| `--sds-font-body-l-500-font` `$sds-font-body-l-500-font` `--sds-font-body-l-500-letter-spacing` `$sds-font-body-l-500-letter-spacing`             |     | `font: 500 18px/28px "Inter", sans-serif;` `letter-spacing: 0px;`       |
| `--sds-font-body-l-400-font` `$sds-font-body-l-400-font` `--sds-font-body-l-400-letter-spacing` `$sds-font-body-l-400-letter-spacing`             |     | `font: 400 18px/28px "Inter", sans-serif;` `letter-spacing: 0px;`       |
|                                                                                                                                                   |     |                                                                         |
| **Font Body M**                                                                                                                                   |     |                                                                         |
| _Visual_                                                                                                                                          |     | _Figma Variables_                                                       |
|                                                                                                                                                   |     | `wide/fontBodyM/600` `wide/fontBodyM/500` `wide/fontBodyM/400`          |
| _CSS / SCSS Variables_                                                                                                                            |     | _Values_                                                                |
| `--sds-font-body-m-600-font` `$sds-font-body-m-600-font``--sds-font-body-m-600-letter-spacing``$sds-font-body-m-600-letter-spacing`               |     | `font: 600 16px/26px "Inter", sans-serif;` `letter-spacing: 0px;`       |
| `--sds-font-body-m-500-font` `$sds-font-body-m-500-font``--sds-font-body-m-500-letter-spacing``$sds-font-body-m-500-letter-spacing`               |     | `font: 500 16px/26px "Inter", sans-serif;` `letter-spacing: 0px;`       |
| `--sds-font-body-m-400-font` `$sds-font-body-m-400-font` `--sds-font-body-m-400-letter-spacing` `$sds-font-body-m-400-letter-spacing`             |     | `font: 400 16px/26px "Inter", sans-serif;` `letter-spacing: 0px;`       |
|                                                                                                                                                   |     |                                                                         |
| **Font Body S**                                                                                                                                   |     |                                                                         |
| _Visual_                                                                                                                                          |     | _Figma Variables_                                                       |
|                                                                                                                                                   |     | `wide/fontBodyS/600` `wide/fontBodyS/500` `wide/fontBodyS/400`          |
| _CSS / SCSS Variables_                                                                                                                            |     | _Values_                                                                |
| `--sds-font-body-s-600-font` `$sds-font-body-s-600-font` `--sds-font-body-s-600-letter-spacing` `$sds-font-body-s-600-letter-spacing`             |     | `font: 600 14px/24px "Inter", sans-serif;` `letter-spacing: 0.08px;`    |
| `--sds-font-body-s-500-font` `$sds-font-body-s-500-font` `--sds-font-body-s-500-letter-spacing` `$sds-font-body-s-500-letter-spacing`             |     | `font: 500 14px/24px "Inter", sans-serif;` `letter-spacing: 0.08px;`    |
| `--sds-font-body-s-400-font` `$sds-font-body-s-400-font` `--sds-font-body-s-400-letter-spacing` `$sds-font-body-s-400-letter-spacing`             |     | `font: 400 14px/24px "Inter", sans-serif;` `letter-spacing: 0.08px;`    |
|                                                                                                                                                   |     |                                                                         |
| **Font Body XS**                                                                                                                                  |     |                                                                         |
| _Visual_                                                                                                                                          |     | _Figma Variables_                                                       |
|                                                                                                                                                   |     | `wide/fontBodyXs/600` `wide/fontBodyXs/500` `wide/fontBodyXs/400`       |
| _CSS / SCSS Variables_                                                                                                                            |     | _Values_                                                                |
| `--sds-font-body-xs-600-font` `$sds-font-body-xs-600-font` `--sds-font-body-xs-600-letter-spacing` `$sds-font-body-xs-600-letter-spacing`         |     | `font: 600 13px/20px "Inter", sans-serif;` `letter-spacing: 0.08px;`    |
| `--sds-font-body-xs-500-font` `$sds-font-body-xs-500-font` `--sds-font-body-xs-500-letter-spacing` `$sds-font-body-xs-500-letter-spacing`         |     | `font: 500 13px/20px "Inter", sans-serif;` `letter-spacing: 0.08px;`    |
| `--sds-font-body-xs-400-font` `$sds-font-body-xs-400-font` `--sds-font-body-xs-400-letter-spacing` `$sds-font-body-xs-400-letter-spacing`         |     | `font: 400 13px/20px "Inter", sans-serif;` `letter-spacing: 0.08px;`    |
|                                                                                                                                                   |     |                                                                         |
| **Font Body XXS**                                                                                                                                 |     |                                                                         |
| _Visual_                                                                                                                                          |     | _Figma Variables_                                                       |
|                                                                                                                                                   |     | `wide/fontBodyXxs/600` `wide/fontBodyXxs/500` `wide/fontBodyXxs/400`    |
| _CSS / SCSS Variables_                                                                                                                            |     | _Values_                                                                |
| `--sds-font-body-xxs-600-font` `$sds-font-body-xxs-600-font` `--sds-font-body-xxs-600-letter-spacing` `$sds-font-body-xxs-600-letter-spacing`     |     | `font: 600 12px/18px "Inter", sans-serif;` `letter-spacing: 0.1px;`     |
| `--sds-font-body-xxs-500-font` `$sds-font-body-xxs-500-font` `--sds-font-body-xxs-500-letter-spacing` `$sds-font-body-xxs-500-letter-spacing`     |     | `font: 500 12px/18px "Inter", sans-serif;` `letter-spacing: 0.1px;`     |
| `--sds-font-body-xxs-400-font` `$sds-font-body-xxs-400-font` `--sds-font-body-xxs-400-letter-spacing` `$sds-font-body-xxs-400-letter-spacing`     |     | `font: 400 12px/18px "Inter", sans-serif;` `letter-spacing: 0.1px;`     |
|                                                                                                                                                   |     |                                                                         |
| **Font Body XXXS**                                                                                                                                |     |                                                                         |
| _Visual_                                                                                                                                          |     | _Figma Variables_                                                       |
|                                                                                                                                                   |     | `wide/fontBodyXxxs/600` `wide/fontBodyXxxs/500` `wide/fontBodyXxxs/400` |
| _CSS / SCSS Variables_                                                                                                                            |     | _Values_                                                                |
| `--sds-font-body-xxxs-600-font` `$sds-font-body-xxxs-600-font` `--sds-font-body-xxxs-600-letter-spacing` `$sds-font-body-xxxs-600-letter-spacing` |     | `font: 600 11px/16px "Inter", sans-serif;` `letter-spacing: 0.1px;`     |
| `--sds-font-body-xxxs-500-font` `$sds-font-body-xxxs-500-font` `--sds-font-body-xxxs-500-letter-spacing` `$sds-font-body-xxxs-500-letter-spacing` |     | `font: 500 11px/16px "Inter", sans-serif;` `letter-spacing: 0.1px;`     |
| `--sds-font-body-xxxs-400-font` `$sds-font-body-xxxs-400-font` `--sds-font-body-xxxs-400-letter-spacing` `$sds-font-body-xxxs-400-letter-spacing` |     | `font: 400 11px/16px "Inter", sans-serif;` `letter-spacing: 0.1px;`     |

#### All-caps

Use for emphasis or when there is a need for distinction between fonts on a page or in a component, such as in Minimal Buttons.

| **Font Caps XXS**                                                                                                                                                                                                                          |     |                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | ------------------------------------------------------------------------------------------------ |
| _Visual_                                                                                                                                                                                                                                   |     | _Figma Variable_                                                                                 |
|                                                                                                                                                                                                                                            |     | `wide/fontCapsXxs/600`                                                                           |
| _CSS / SCSS Variables_                                                                                                                                                                                                                     |     | _Values_                                                                                         |
| `--sds-font-caps-xxs-600-font` `$sds-font-caps-xxs-600-font` `--sds-font-caps-xxs-600-letter-spacing` `$sds-font-caps-xxs-600-letter-spacing` `--sds-font-caps-xxs-600-text-transform``$sds-font-caps-xxs-600-text-transform`              |     | `font: 600 12px/18px "Inter", sans-serif;` `letter-spacing: 0.5px;` `text-transform: uppercase;` |
|                                                                                                                                                                                                                                            |     |                                                                                                  |
| **Font Caps XXXS**                                                                                                                                                                                                                         |     |                                                                                                  |
| _Visual_                                                                                                                                                                                                                                   |     | _Figma Variable_                                                                                 |
|                                                                                                                                                                                                                                            |     | `wide/fontCapsXxxs/600`                                                                          |
| _CSS / SCSS Variables_                                                                                                                                                                                                                     |     | _Values_                                                                                         |
| `--sds-font-caps-xxxs-600-font` `$sds-font-caps-xxxs-600-font` `--sds-font-caps-xxxs-600-letter-spacing` `$sds-font-caps-xxxs-600-letter-spacing` `--sds-font-caps-xxxs-600-text-transform` `$sds-font-caps-xxxs-600-text-transform`       |     | `font: 600 11px/16px "Inter", sans-serif;` `letter-spacing: 0.5px;` `text-transform: uppercase;` |
|                                                                                                                                                                                                                                            |     |                                                                                                  |
| **Font Caps XXXXS**                                                                                                                                                                                                                        |     |                                                                                                  |
| _Visual_                                                                                                                                                                                                                                   |     | _Figma Variable_                                                                                 |
|                                                                                                                                                                                                                                            |     | `wide/fontCapsXxxxs/600`                                                                         |
| _CSS / SCSS Variables_                                                                                                                                                                                                                     |     | _Values_                                                                                         |
| `--sds-font-caps-xxxxs-600-font` `$sds-font-caps-xxxxs-600-font` `--sds-font-caps-xxxxs-600-letter-spacing` `$sds-font-caps-xxxxs-600-letter-spacing` `--sds-font-caps-xxxxs-600-text-transform` `$sds-font-caps-xxxxs-600-text-transform` |     | `font: 600 10px/14px "Inter", sans-serif;` `letter-spacing: 0.5px;` `text-transform: uppercase;` |

#### Tabular

Use when there is a need for numbers to be an equal width such as in Tables.

| **Font Tabular S**                                                                                                                                                                                                                                                 |     |                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | ----------------------------------------------------------------------------------------------------------- |
| _Visual_                                                                                                                                                                                                                                                           |     | _Figma Variables_                                                                                           |
|                                                                                                                                                                                                                                                                    |     | `wide/fontTabularS/600` `wide/fontTabularS/500` `wide/fontTabularS/400`                                     |
| _CSS / SCSS Variables_                                                                                                                                                                                                                                             |     | _Values_                                                                                                    |
| `--sds-font-tabular-s-600-font` `$sds-font-tabular-s-600-font` `--sds-font-tabular-s-600-font-variant-numeric` `$sds-font-tabular-s-600-font-variant-numeric` `--sds-font-tabular-s-600-letter-spacing` `$sds-font-tabular-s-600-letter-spacing`                   |     | `font: 600 14px/24px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: 0px;`     |
| `--sds-font-tabular-s-500-font` `$sds-font-tabular-s-500-font` `--sds-font-tabular-s-500-font-variant-numeric` `$sds-font-tabular-s-500-font-variant-numeric` `--sds-font-tabular-s-500-letter-spacing` `$sds-font-tabular-s-500-letter-spacing`                   |     | `font: 500 14px/24px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: 0px;`     |
| `--sds-font-tabular-s-400-font` `$sds-font-tabular-s-400-font` `--sds-font-tabular-s-400-font-variant-numeric` `$sds-font-tabular-s-400-font-variant-numeric` `--sds-font-tabular-s-400-letter-spacing` `$sds-font-tabular-s-400-letter-spacing`                   |     | `font: 400 14px/24px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: 0px;`     |
|                                                                                                                                                                                                                                                                    |     |                                                                                                             |
| **Font Tabular XS**                                                                                                                                                                                                                                                |     |                                                                                                             |
| _Visual_                                                                                                                                                                                                                                                           |     | _Figma Variables_                                                                                           |
|                                                                                                                                                                                                                                                                    |     | `wide/fontTabularXs/600` `wide/fontTabularXs/500` `wide/fontTabularXs/400`                                  |
| _CSS / SCSS Variables_                                                                                                                                                                                                                                             |     | _Values_                                                                                                    |
| `--sds-font-tabular-xs-600-font` `$sds-font-tabular-xs-600-font` `--sds-font-tabular-xs-600-font-variant-numeric` `$sds-font-tabular-xs-600-font-variant-numeric` `--sds-font-tabular-xs-600-letter-spacing` `$sds-font-tabular-xs-600-letter-spacing`             |     | `font: 600 13px/20px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: 0px;`     |
| `--sds-font-tabular-xs-500-font` `$sds-font-tabular-xs-500-font` `--sds-font-tabular-xs-500-font-variant-numeric` `$sds-font-tabular-xs-500-font-variant-numeric` `--sds-font-tabular-xs-500-letter-spacing` `$sds-font-tabular-xs-500-letter-spacing`             |     | `font: 500 13px/20px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: 0px;`     |
| `--sds-font-tabular-xs-400-font` `$sds-font-tabular-xs-400-font` `--sds-font-tabular-xs-400-font-variant-numeric` `$sds-font-tabular-xs-400-font-variant-numeric` `--sds-font-tabular-xs-400-letter-spacing` `$sds-font-tabular-xs-400-letter-spacing`             |     | `font: 400 13px/20px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: 0px;`     |
|                                                                                                                                                                                                                                                                    |     |                                                                                                             |
| **Font Tabular XXS**                                                                                                                                                                                                                                               |     |                                                                                                             |
| _Visual_                                                                                                                                                                                                                                                           |     | _Figma Variables_                                                                                           |
|                                                                                                                                                                                                                                                                    |     | `wide/fontTabularXxs/600` `wide/fontTabularXxs/500` `wide/fontTabularXxs/400`                               |
| _CSS / SCSS Variables_                                                                                                                                                                                                                                             |     | _Values_                                                                                                    |
| `--sds-font-tabular-xxs-600-font` `$sds-font-tabular-xxs-600-font` `--sds-font-tabular-xxs-600-font-variant-numeric` `$sds-font-tabular-xxs-600-font-variant-numeric` `--sds-font-tabular-xxs-600-letter-spacing` `$sds-font-tabular-xxs-600-letter-spacing`       |     | `font: 600 12px/18px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: -0.25px;` |
| `--sds-font-tabular-xxs-500-font` `$sds-font-tabular-xxs-500-font` `--sds-font-tabular-xxs-500-font-variant-numeric` `$sds-font-tabular-xxs-500-font-variant-numeric` `--sds-font-tabular-xxs-500-letter-spacing` `$sds-font-tabular-xxs-500-letter-spacing`       |     | `font: 500 12px/18px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: -0.25px;` |
| `--sds-font-tabular-xxs-400-font` `$sds-font-tabular-xxs-400-font` `--sds-font-tabular-xxs-400-font-variant-numeric` `$sds-font-tabular-xxs-400-font-variant-numeric` `--sds-font-tabular-xxs-400-letter-spacing` `$sds-font-tabular-xxs-400-letter-spacing`       |     | `font: 400 12px/18px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: -0.25px;` |
|                                                                                                                                                                                                                                                                    |     |                                                                                                             |
| **Font Tabular XXXS**                                                                                                                                                                                                                                              |     |                                                                                                             |
| _Visual_                                                                                                                                                                                                                                                           |     | _Figma Variables_                                                                                           |
|                                                                                                                                                                                                                                                                    |     | `wide/fontTabularXxxs/600` `wide/fontTabularXxxs/500` `wide/fontTabularXxxs/400`                            |
| _CSS / SCSS Variables_                                                                                                                                                                                                                                             |     | _Values_                                                                                                    |
| `--sds-font-tabular-xxxs-600-font` `$sds-font-tabular-xxxs-600-font` `--sds-font-tabular-xxxs-600-font-variant-numeric` `$sds-font-tabular-xxxs-600-font-variant-numeric` `--sds-font-tabular-xxxs-600-letter-spacing` `$sds-font-tabular-xxxs-600-letter-spacing` |     | `font: 600 11px/16px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: -0.25px;` |
| `--sds-font-tabular-xxxs-500-font` `$sds-font-tabular-xxxs-500-font` `--sds-font-tabular-xxxs-500-font-variant-numeric` `$sds-font-tabular-xxxs-500-font-variant-numeric` `--sds-font-tabular-xxxs-500-letter-spacing` `$sds-font-tabular-xxxs-500-letter-spacing` |     | `font: 500 11px/16px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: -0.25px;` |
| `--sds-font-tabular-xxxs-400-font` `$sds-font-tabular-xxxs-400-font` `--sds-font-tabular-xxxs-400-font-variant-numeric` `$sds-font-tabular-xxxs-400-font-variant-numeric` `--sds-font-tabular-xxxs-400-letter-spacing` `$sds-font-tabular-xxxs-400-letter-spacing` |     | `font: 400 11px/16px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: -0.25px;` |

#### Code

Use only when referring to code snippets.

| **Font Code S**                                                                                                                           |     |                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------------------------------------------ |
| _Visual_                                                                                                                                  |     | _Figma Variables_                                                        |
|                                                                                                                                           |     | `wide/fontCodeS/600` `wide/fontCodeS/500` `wide/fontCodeS/400`           |
| _CSS / SCSS Variables_                                                                                                                    |     | _Values_                                                                 |
| `--sds-font-code-s-600-font` `$sds-font-code-s-600-font` `--sds-font-code-s-600-letter-spacing` `$sds-font-code-s-600-letter-spacing`     |     | `font: 600 14px/24px "IBM Plex Mono", monospace;` `letter-spacing: 0px;` |
| `--sds-font-code-s-500-font` `$sds-font-code-s-500-font` `--sds-font-code-s-500-letter-spacing` `$sds-font-code-s-500-letter-spacing`     |     | `font: 500 14px/24px "IBM Plex Mono", monospace;` `letter-spacing: 0px;` |
| `--sds-font-code-s-400-font` `$sds-font-code-s-400-font` `--sds-font-code-s-400-letter-spacing` `$sds-font-code-s-400-letter-spacing`     |     | `font: 400 14px/24px "IBM Plex Mono", monospace;` `letter-spacing: 0px;` |
|                                                                                                                                           |     |                                                                          |
| **Font Code XS**                                                                                                                          |     |                                                                          |
| _Visual_                                                                                                                                  |     | _Figma Variables_                                                        |
|                                                                                                                                           |     | `wide/fontCodeXs/600` `wide/fontCodeXs/500` `wide/fontCodeXs/400`        |
| _CSS / SCSS Variables_                                                                                                                    |     | _Values_                                                                 |
| `--sds-font-code-xs-600-font` `$sds-font-code-xs-600-font` `--sds-font-code-xs-600-letter-spacing` `$sds-font-code-xs-600-letter-spacing` |     | `font: 600 13px/20px "IBM Plex Mono", monospace;` `letter-spacing: 0px;` |
| `--sds-font-code-xs-500-font` `$sds-font-code-xs-500-font` `--sds-font-code-xs-500-letter-spacing` `$sds-font-code-xs-500-letter-spacing` |     | `font: 500 13px/20px "IBM Plex Mono", monospace;` `letter-spacing: 0px;` |
| `--sds-font-code-xs-400-font` `$sds-font-code-xs-400-font` `--sds-font-code-xs-400-letter-spacing` `$sds-font-code-xs-400-letter-spacing` |     | `font: 400 13px/20px "IBM Plex Mono", monospace;` `letter-spacing: 0px;` |

## Narrow

### Typefaces

Inter is the primary typeface to be used throughout product and marketing materials. IBM Plex Mono should only be used when referring to code snippets.

| **Visual** |     | **Typeface**        |     | **Usage**                                                                                                             |
| ---------- | --- | ------------------- | --- | --------------------------------------------------------------------------------------------------------------------- |
|            |     | Inter (600)         |     | All headers throughout the product and marketing materials, and emphasized body copy.                                 |
|            |     | Inter (500)         |     | For text that needs slight emphasis.                                                                                  |
|            |     | Inter (400)         |     | All body copy throughout the product and marketing materials. If emphasized copy is needed, use a font weight of 600. |
|            |     | IBM Plex Mono (400) |     | Use only when referring to code snippets.                                                                             |

### Font Weights

Regular (400) and SemiBold (600) are the two font weights primarily used across the product, however additional font weights are available to be selectively used if needed.

| **Visual** |     | **Variable**         |     | **Value**           |
| ---------- | --- | -------------------- | --- | ------------------- |
|            |     | `fontWeightHeavy`    |     | `font-weight: 800;` |
|            |     | `fontWeightBold`     |     | `font-weight: 700;` |
|            |     | `fontWeightSemibold` |     | `font-weight: 600;` |
|            |     | `fontWeightRegular`  |     | `font-weight: 400;` |
|            |     | `fontWeightThin`     |     | `font-weight: 300;` |

---

### Typography Variables

#### TItle

For use with Hero component.

| **Font Title L**                                                                                                                                                      |     |                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------------------------------------- |
| _Visual_                                                                                                                                                              |     | _Figma Variable_                                                  |
|                                                                                                                                                                       |     | `narrow/fontTitleL/700`                                           |
| _CSS / SCSS Variables_                                                                                                                                                |     | _Values_                                                          |
| `--sds-font-title-l-700-font-narrow` `$sds-font-title-l-700-font-narrow` `--sds-font-title-l-700-letter-spacing-narrow` `$sds-font-title-l-700-letter-spacing-narrow` |     | `font: 700 40px/50x "Inter", sans-serif;` `letter-spacing: 0px;`  |
|                                                                                                                                                                       |     |                                                                   |
| **Font Title M**                                                                                                                                                      |     |                                                                   |
| _Visual_                                                                                                                                                              |     | _Figma Variable_                                                  |
|                                                                                                                                                                       |     | `narrow/fontTitleM/700`                                           |
| _CSS / SCSS Variables_                                                                                                                                                |     | _Values_                                                          |
| `--sds-font-title-m-700-font-narrow` `$sds-font-title-m-700-font-narrow` `--sds-font-title-m-700-letter-spacing-narrow` `$sds-font-title-m-700-letter-spacing-narrow` |     | `font: 700 32px/40px "Inter", sans-serif;` `letter-spacing: 0px;` |
|                                                                                                                                                                       |     |                                                                   |
| **Font Tile S**                                                                                                                                                       |     |                                                                   |
| _Visual_                                                                                                                                                              |     | _Figma Variable_                                                  |
|                                                                                                                                                                       |     | `narrow/fontTitleS/700`                                           |
| _CSS / SCSS Variables_                                                                                                                                                |     | _Values_                                                          |
| `--sds-font-title-s-700-font-narrow` `$sds-font-title-s-700-font-narrow` `--sds-font-title-s-700-letter-spacing-narrow` `$sds-font-title-s-700-letter-spacing-narrow` |     | `font: 700 26px/34px "Inter", sans-serif;` `letter-spacing: 0px;` |

#### Header

For use with `<H1>`, `<H2>`, `<H3>`, `<H4>`, `<H5>`, `<H6>` tags.

| **Font Header XXL**                                                                                                                                                                   |     |                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | -------------------------------------------------------------------- |
| _Visual_                                                                                                                                                                              |     | _Figma Variable_                                                     |
|                                                                                                                                                                                       |     | `narrow/fontHeaderXxl/600`                                           |
| _CSS / SCSS Variables_                                                                                                                                                                |     | _Values_                                                             |
| `--sds-font-header-xxl-600-font-narrow` `$sds-font-header-xxl-600-font-narrow` `--sds-font-header-xxl-600-letter-spacing-narrow` `$sds-font-header-xxl-600-letter-spacing-narrow`     |     | `font: 600 22px/30px "Inter", sans-serif;` `letter-spacing: 0px;`    |
|                                                                                                                                                                                       |     |                                                                      |
| **Font Header XL**                                                                                                                                                                    |     |                                                                      |
| _Visual_                                                                                                                                                                              |     | _Figma Variable_                                                     |
|                                                                                                                                                                                       |     | `narrow/fontHeaderXl/600`                                            |
| _CSS / SCSS Variables_                                                                                                                                                                |     | _Values_                                                             |
| `--sds-font-header-xl-600-font-narrow` `$sds-font-header-xl-600-font-narrow` `--sds-font-header-xl-600-letter-spacing-narrow` `$sds-font-header-xl-600-letter-spacing-narrow`         |     | `font: 600 18px/24px "Inter", sans-serif;` `letter-spacing: 0px;`    |
|                                                                                                                                                                                       |     |                                                                      |
| **Font Header L**                                                                                                                                                                     |     |                                                                      |
| _Visual_                                                                                                                                                                              |     | _Figma Variable_                                                     |
|                                                                                                                                                                                       |     | `narrow/fontHeaderL/600`                                             |
| _CSS / SCSS Variables_                                                                                                                                                                |     | _Values_                                                             |
| `--sds-font-header-l-600-font-narrow` `$sds-font-header-l-600-font-narrow` `--sds-font-header-l-600-letter-spacing-narrow` `$sds-font-header-l-600-letter-spacing-narrow`             |     | `font: 600 16px/22px "Inter", sans-serif;` `letter-spacing: 0px;`    |
|                                                                                                                                                                                       |     |                                                                      |
| **Font Header M**                                                                                                                                                                     |     |                                                                      |
| _Visual_                                                                                                                                                                              |     | _Figma Variable_                                                     |
|                                                                                                                                                                                       |     | `narrow/fontHeaderM/600`                                             |
| _CSS / SCSS Variables_                                                                                                                                                                |     | _Values_                                                             |
| `--sds-font-header-m-600-font-narrow` `$sds-font-header-m-600-font-narrow` `--sds-font-header-m-600-letter-spacing-narrow` `$sds-font-header-m-600-letter-spacing-narrow`             |     | `font: 600 14px/20px "Inter", sans-serif;` `letter-spacing: 0.08px;` |
|                                                                                                                                                                                       |     |                                                                      |
| **Font Header S**                                                                                                                                                                     |     |                                                                      |
| _Visual_                                                                                                                                                                              |     | _Figma Variable_                                                     |
|                                                                                                                                                                                       |     | `narrow/fontHeaderS/600`                                             |
| _CSS / SCSS Variables_                                                                                                                                                                |     | _Values_                                                             |
| `--sds-font-header-s-600-font-narrow` `$sds-font-header-s-600-font-narrow` `--sds-font-header-s-600-letter-spacing-narrow` `$sds-font-header-s-600-letter-spacing-narrow`             |     | `font: 600 14px/20px "Inter", sans-serif;` `letter-spacing: 0.08px;` |
|                                                                                                                                                                                       |     |                                                                      |
| **Font Header XS**                                                                                                                                                                    |     |                                                                      |
| _Visual_                                                                                                                                                                              |     | _Figma Variable_                                                     |
|                                                                                                                                                                                       |     | `narrow/fontHeaderXs/600`                                            |
| _CSS / SCSS Variables_                                                                                                                                                                |     | _Values_                                                             |
| `--sds-font-header-xs-600-font-narrow` `$sds-font-header-xs-600-font-narrow` `--sds-font-header-xs-600-letter-spacing-narrow` `$sds-font-header-xs-600-letter-spacing-narrow`         |     | `font: 600 13px/18px "Inter", sans-serif;` `letter-spacing: 0.08px;` |
|                                                                                                                                                                                       |     |                                                                      |
| **Font Header XXS**                                                                                                                                                                   |     |                                                                      |
| _Visual_                                                                                                                                                                              |     | _Figma Variable_                                                     |
|                                                                                                                                                                                       |     | `narrow/fontHeaderXxs/600`                                           |
| _CSS / SCSS Variables_                                                                                                                                                                |     | _Values_                                                             |
| `--sds-font-header-xxs-600-font-narrow` `$sds-font-header-xxs-600-font-narrow` `--sds-font-header-xxs-600-letter-spacing-narrow` `$sds-font-header-xxs-600-letter-spacing-narrow`     |     | `font: 600 12px/18px "Inter", sans-serif;` `letter-spacing: 0.1px;`  |
|                                                                                                                                                                                       |     |                                                                      |
| **Font Header XXXS**                                                                                                                                                                  |     |                                                                      |
| _Visual_                                                                                                                                                                              |     | _Figma Variable_                                                     |
|                                                                                                                                                                                       |     | `narrow/fontHeaderXxxs/600`                                          |
| _CSS / SCSS Variables_                                                                                                                                                                |     | _Values_                                                             |
| `--sds-font-header-xxxs-600-font-narrow` `$sds-font-header-xxxs-600-font-narrow` `--sds-font-header-xxxs-600-letter-spacing-narrow` `$sds-font-header-xxxs-600-letter-spacing-narrow` |     | `font: 600 12px/18px "Inter", sans-serif;` `letter-spacing: 0.1px;`  |

#### Body

For use with `<p>` tags.

| **Font Body L**                                                                                                                                                               |     |                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------------------------------------------------- |
| _Visual_                                                                                                                                                                      |     | _Figma Variables_                                                             |
|                                                                                                                                                                               |     | `narrow/fontBodyL/600` `narrow/fontBodyL/500` `narrow/fontBodyL/400`          |
| _CSS / SCSS Variables_                                                                                                                                                        |     | _Values_                                                                      |
| `--sds-font-body-l-600-font-narrow` `$sds-font-body-l-600-font-narrow` `--sds-font-body-l-600-letter-spacing-narrow` `$sds-font-body-l-600-letter-spacing-narrow`             |     | `font: 600 16px/26px "Inter", sans-serif;` `letter-spacing: 0px;`             |
| `--sds-font-body-l-500-font-narrow` `$sds-font-body-l-500-font-narrow` `--sds-font-body-l-500-letter-spacing-narrow` `$sds-font-body-l-500-letter-spacing-narrow`             |     | `font: 500 16px/26px "Inter", sans-serif;` `letter-spacing: 0px;`             |
| `--sds-font-body-l-400-font-narrow` `$sds-font-body-l-400-font-narrow` `--sds-font-body-l-400-letter-spacing-narrow` `$sds-font-body-l-400-letter-spacing-narrow`             |     | `font: 400 16px/26px "Inter", sans-serif;` `letter-spacing: 0px;`             |
|                                                                                                                                                                               |     |                                                                               |
| **Font Body M**                                                                                                                                                               |     |                                                                               |
| _Visual_                                                                                                                                                                      |     | _Figma Variables_                                                             |
|                                                                                                                                                                               |     | `narrow/fontBodyM/600` `narrow/fontBodyM/500` `narrow/fontBodyM/400`          |
| _CSS / SCSS Variables_                                                                                                                                                        |     | _Values_                                                                      |
| `--sds-font-body-m-600-font-narrow` `$sds-font-body-m-600-font-narrow``--sds-font-body-m-600-letter-spacing-narrow``$sds-font-body-m-600-letter-spacing-narrow`               |     | `font: 600 14px/24px "Inter", sans-serif;` `letter-spacing: 0.08px;`          |
| `--sds-font-body-m-500-font-narrow` `$sds-font-body-m-500-font-narrow``--sds-font-body-m-500-letter-spacing-narrow``$sds-font-body-m-500-letter-spacing-narrow`               |     | `font: 500 14px/24px "Inter", sans-serif;` `letter-spacing: 0.08px;`          |
| `--sds-font-body-m-400-font-narrow` `$sds-font-body-m-400-font-narrow` `--sds-font-body-m-400-letter-spacing-narrow` `$sds-font-body-m-400-letter-spacing-narrow`             |     | `font: 400 14px/24px "Inter", sans-serif;` `letter-spacing: 0.08px;`          |
|                                                                                                                                                                               |     |                                                                               |
| **Font Body S**                                                                                                                                                               |     |                                                                               |
| _Visual_                                                                                                                                                                      |     | _Figma Variables_                                                             |
|                                                                                                                                                                               |     | `narrow/fontBodyS/600` `narrow/fontBodyS/500` `narrow/fontBodyS/400`          |
| _CSS / SCSS Variables_                                                                                                                                                        |     | _Values_                                                                      |
| `--sds-font-body-s-600-font-narrow` `$sds-font-body-s-600-font-narrow` `--sds-font-body-s-600-letter-spacing-narrow` `$sds-font-body-s-600-letter-spacing-narrow`             |     | `font: 600 14px/24px "Inter", sans-serif;` `letter-spacing: 0.08px;`          |
| `--sds-font-body-s-500-font-narrow` `$sds-font-body-s-500-font-narrow` `--sds-font-body-s-500-letter-spacing-narrow` `$sds-font-body-s-500-letter-spacing-narrow`             |     | `font: 500 14px/24px "Inter", sans-serif;` `letter-spacing: 0.08px;`          |
| `--sds-font-body-s-400-font-narrow` `$sds-font-body-s-400-font-narrow` `--sds-font-body-s-400-letter-spacing-narrow` `$sds-font-body-s-400-letter-spacing-narrow`             |     | `font: 400 14px/24px "Inter", sans-serif;` `letter-spacing: 0.08px;`          |
|                                                                                                                                                                               |     |                                                                               |
| **Font Body XS**                                                                                                                                                              |     |                                                                               |
| _Visual_                                                                                                                                                                      |     | _Figma Variables_                                                             |
|                                                                                                                                                                               |     | `narrow/fontBodyXs/600` `narrow/fontBodyXs/500` `narrow/fontBodyXs/400`       |
| _CSS / SCSS Variables_                                                                                                                                                        |     | _Values_                                                                      |
| `--sds-font-body-xs-600-font-narrow` `$sds-font-body-xs-600-font-narrow` `--sds-font-body-xs-600-letter-spacing-narrow` `$sds-font-body-xs-600-letter-spacing-narrow`         |     | `font: 600 13px/20px "Inter", sans-serif;` `letter-spacing: 0.08px;`          |
| `--sds-font-body-xs-500-font-narrow` `$sds-font-body-xs-500-font-narrow` `--sds-font-body-xs-500-letter-spacing-narrow` `$sds-font-body-xs-500-letter-spacing-narrow`         |     | `font: 500 13px/20px "Inter", sans-serif;` `letter-spacing: 0.08px;`          |
| `--sds-font-body-xs-400-font-narrow` `$sds-font-body-xs-400-font-narrow` `--sds-font-body-xs-400-letter-spacing-narrow` `$sds-font-body-xs-400-letter-spacing-narrow`         |     | `font: 400 13px/20px "Inter", sans-serif;` `letter-spacing: 0.08px;`          |
|                                                                                                                                                                               |     |                                                                               |
| **Font Body XXS**                                                                                                                                                             |     |                                                                               |
| _Visual_                                                                                                                                                                      |     | _Figma Variables_                                                             |
|                                                                                                                                                                               |     | `narrow/fontBodyXxs/600` `narrow/fontBodyXxs/500` `narrow/fontBodyXxs/400`    |
| _CSS / SCSS Variables_                                                                                                                                                        |     | _Values_                                                                      |
| `--sds-font-body-xxs-600-font-narrow` `$sds-font-body-xxs-600-font-narrow` `--sds-font-body-xxs-600-letter-spacing-narrow` `$sds-font-body-xxs-600-letter-spacing-narrow`     |     | `font: 600 12px/18px "Inter", sans-serif;` `letter-spacing: 0.1px;`           |
| `--sds-font-body-xxs-500-font-narrow` `$sds-font-body-xxs-500-font-narrow` `--sds-font-body-xxs-500-letter-spacing-narrow` `$sds-font-body-xxs-500-letter-spacing-narrow`     |     | `font: 500 12px/18px "Inter", sans-serif;` `letter-spacing: 0.1px;`           |
| `--sds-font-body-xxs-400-font-narrow` `$sds-font-body-xxs-400-font-narrow` `--sds-font-body-xxs-400-letter-spacing-narrow` `$sds-font-body-xxs-400-letter-spacing-narrow`     |     | `font: 400 12px/18px "Inter", sans-serif;` `letter-spacing: 0.1px;`           |
|                                                                                                                                                                               |     |                                                                               |
| **Font Body XXXS**                                                                                                                                                            |     |                                                                               |
| _Visual_                                                                                                                                                                      |     | _Figma Variables_                                                             |
|                                                                                                                                                                               |     | `narrow/fontBodyXxxs/600` `narrow/fontBodyXxxs/500` `narrow/fontBodyXxxs/400` |
| _CSS / SCSS Variables_                                                                                                                                                        |     | _Values_                                                                      |
| `--sds-font-body-xxxs-600-font-narrow` `$sds-font-body-xxxs-600-font-narrow` `--sds-font-body-xxxs-600-letter-spacing-narrow` `$sds-font-body-xxxs-600-letter-spacing-narrow` |     | `font: 600 12px/18px "Inter", sans-serif;` `letter-spacing: 0.1px;`           |
| `--sds-font-body-xxxs-500-font-narrow` `$sds-font-body-xxxs-500-font-narrow` `--sds-font-body-xxxs-500-letter-spacing-narrow` `$sds-font-body-xxxs-500-letter-spacing-narrow` |     | `font: 500 12px/18px "Inter", sans-serif;` `letter-spacing: 0.1px;`           |
| `--sds-font-body-xxxs-400-font-narrow` `$sds-font-body-xxxs-400-font-narrow` `--sds-font-body-xxxs-400-letter-spacing-narrow` `$sds-font-body-xxxs-400-letter-spacing-narrow` |     | `font: 400 12px/18px "Inter", sans-serif;` `letter-spacing: 0.1px;`           |

#### All-caps

Use for emphasis or when there is a need for distinction between fonts on a page or in a component, such as in Minimal Buttons.

| **Font Caps XXS**                                                                                                                                                                                                                                                                    |     |                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | ------------------------------------------------------------------------------------------------ |
| _Visual_                                                                                                                                                                                                                                                                             |     | _Figma Variable_                                                                                 |
|                                                                                                                                                                                                                                                                                      |     | `narrow/fontCapsXxs/600`                                                                         |
| _CSS / SCSS Variables_                                                                                                                                                                                                                                                               |     | _Values_                                                                                         |
| `--sds-font-caps-xxs-600-font-narrow` `$sds-font-caps-xxs-600-font-narrow` `--sds-font-caps-xxs-600-letter-spacing-narrow` `$sds-font-caps-xxs-600-letter-spacing-narrow` `--sds-font-caps-xxs-600-text-transform-narrow``$sds-font-caps-xxs-600-text-transform-narrow`              |     | `font: 600 12px/18px "Inter", sans-serif;` `letter-spacing: 0.5px;` `text-transform: uppercase;` |
|                                                                                                                                                                                                                                                                                      |     |                                                                                                  |
| **Font Caps XXXS**                                                                                                                                                                                                                                                                   |     |                                                                                                  |
| _Visual_                                                                                                                                                                                                                                                                             |     | _Figma Variable_                                                                                 |
|                                                                                                                                                                                                                                                                                      |     | `narrow/fontCapsXxxs/600`                                                                        |
| _CSS / SCSS Variables_                                                                                                                                                                                                                                                               |     | _Values_                                                                                         |
| `--sds-font-caps-xxxs-600-font-narrow` `$sds-font-caps-xxxs-600-font-narrow` `--sds-font-caps-xxxs-600-letter-spacing-narrow` `$sds-font-caps-xxxs-600-letter-spacing-narrow` `--sds-font-caps-xxxs-600-text-transform-narrow` `$sds-font-caps-xxxs-600-text-transform-narrow`       |     | `font: 600 11px/16px "Inter", sans-serif;` `letter-spacing: 0.5px;` `text-transform: uppercase;` |
|                                                                                                                                                                                                                                                                                      |     |                                                                                                  |
| **Font Caps XXXXS**                                                                                                                                                                                                                                                                  |     |                                                                                                  |
| _Visual_                                                                                                                                                                                                                                                                             |     | _Figma Variable_                                                                                 |
|                                                                                                                                                                                                                                                                                      |     | `narrow/fontCapsXxxxs/600`                                                                       |
| _CSS / SCSS Variables_                                                                                                                                                                                                                                                               |     | _Values_                                                                                         |
| `--sds-font-caps-xxxxs-600-font-narrow` `$sds-font-caps-xxxxs-600-font-narrow` `--sds-font-caps-xxxxs-600-letter-spacing-narrow` `$sds-font-caps-xxxxs-600-letter-spacing-narrow` `--sds-font-caps-xxxxs-600-text-transform-narrow` `$sds-font-caps-xxxxs-600-text-transform-narrow` |     | `font: 600 11px/16px "Inter", sans-serif;` `letter-spacing: 0.5px;` `text-transform: uppercase;` |

#### Tabular

Use when there is a need for numbers to be an equal width such as in Tables.

| **Font Tabular S**                                                                                                                                                                                                                                                                                           |     |                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | ----------------------------------------------------------------------------------------------------------- |
| _Visual_                                                                                                                                                                                                                                                                                                     |     | _Figma Variables_                                                                                           |
|                                                                                                                                                                                                                                                                                                              |     | `narrow/fontTabularS/600` `narrow/fontTabularS/500` `narrow/fontTabularS/400`                               |
| _CSS / SCSS Variables_                                                                                                                                                                                                                                                                                       |     | _Values_                                                                                                    |
| `--sds-font-tabular-s-600-font-narrow` `$sds-font-tabular-s-600-font-narrow` `--sds-font-tabular-s-600-font-variant-numeric-narrow` `$sds-font-tabular-s-600-font-variant-numeric-narrow` `--sds-font-tabular-s-600-letter-spacing-narrow` `$sds-font-tabular-s-600-letter-spacing-narrow`                   |     | `font: 600 14px/24px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: 0px;`     |
| `--sds-font-tabular-s-500-font-narrow` `$sds-font-tabular-s-500-font-narrow` `--sds-font-tabular-s-500-font-variant-numeric-narrow` `$sds-font-tabular-s-500-font-variant-numeric-narrow` `--sds-font-tabular-s-500-letter-spacing-narrow` `$sds-font-tabular-s-500-letter-spacing-narrow`                   |     | `font: 500 14px/24px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: 0px;`     |
| `--sds-font-tabular-s-400-font-narrow` `$sds-font-tabular-s-400-font-narrow` `--sds-font-tabular-s-400-font-variant-numeric-narrow` `$sds-font-tabular-s-400-font-variant-numeric-narrow` `--sds-font-tabular-s-400-letter-spacing-narrow` `$sds-font-tabular-s-400-letter-spacing-narrow`                   |     | `font: 400 14px/24px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: 0px;`     |
|                                                                                                                                                                                                                                                                                                              |     |                                                                                                             |
| **Font Tabular XS**                                                                                                                                                                                                                                                                                          |     |                                                                                                             |
| _Visual_                                                                                                                                                                                                                                                                                                     |     | _Figma Variables_                                                                                           |
|                                                                                                                                                                                                                                                                                                              |     | `narrow/fontTabularXs/600` `narrow/fontTabularXs/500` `narrow/fontTabularXs/400`                            |
| _CSS / SCSS Variables_                                                                                                                                                                                                                                                                                       |     | _Values_                                                                                                    |
| `--sds-font-tabular-xs-600-font-narrow` `$sds-font-tabular-xs-600-font-narrow` `--sds-font-tabular-xs-600-font-variant-numeric-narrow` `$sds-font-tabular-xs-600-font-variant-numeric-narrow` `--sds-font-tabular-xs-600-letter-spacing-narrow` `$sds-font-tabular-xs-600-letter-spacing-narrow`             |     | `font: 600 13px/20px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: 0px;`     |
| `--sds-font-tabular-xs-500-font-narrow` `$sds-font-tabular-xs-500-font-narrow` `--sds-font-tabular-xs-500-font-variant-numeric-narrow` `$sds-font-tabular-xs-500-font-variant-numeric-narrow` `--sds-font-tabular-xs-500-letter-spacing-narrow` `$sds-font-tabular-xs-500-letter-spacing-narrow`             |     | `font: 500 13px/20px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: 0px;`     |
| `--sds-font-tabular-xs-400-font-narrow` `$sds-font-tabular-xs-400-font-narrow` `--sds-font-tabular-xs-400-font-variant-numeric-narrow` `$sds-font-tabular-xs-400-font-variant-numeric-narrow` `--sds-font-tabular-xs-400-letter-spacing-narrow` `$sds-font-tabular-xs-400-letter-spacing-narrow`             |     | `font: 400 13px/20px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: 0px;`     |
|                                                                                                                                                                                                                                                                                                              |     |                                                                                                             |
| **Font Tabular XXS**                                                                                                                                                                                                                                                                                         |     |                                                                                                             |
| _Visual_                                                                                                                                                                                                                                                                                                     |     | _Figma Variables_                                                                                           |
|                                                                                                                                                                                                                                                                                                              |     | `narrow/fontTabularXxs/600` `narrow/fontTabularXxs/500` `narrow/fontTabularXxs/400`                         |
| _CSS / SCSS Variables_                                                                                                                                                                                                                                                                                       |     | _Values_                                                                                                    |
| `--sds-font-tabular-xxs-600-font-narrow` `$sds-font-tabular-xxs-600-font-narrow` `--sds-font-tabular-xxs-600-font-variant-numeric-narrow` `$sds-font-tabular-xxs-600-font-variant-numeric-narrow` `--sds-font-tabular-xxs-600-letter-spacing-narrow` `$sds-font-tabular-xxs-600-letter-spacing-narrow`       |     | `font: 600 12px/18px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: -0.25px;` |
| `--sds-font-tabular-xxs-500-font-narrow` `$sds-font-tabular-xxs-500-font-narrow` `--sds-font-tabular-xxs-500-font-variant-numeric-narrow` `$sds-font-tabular-xxs-500-font-variant-numeric-narrow` `--sds-font-tabular-xxs-500-letter-spacing-narrow` `$sds-font-tabular-xxs-500-letter-spacing-narrow`       |     | `font: 500 12px/18px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: -0.25px;` |
| `--sds-font-tabular-xxs-400-font-narrow` `$sds-font-tabular-xxs-400-font-narrow` `--sds-font-tabular-xxs-400-font-variant-numeric-narrow` `$sds-font-tabular-xxs-400-font-variant-numeric-narrow` `--sds-font-tabular-xxs-400-letter-spacing-narrow` `$sds-font-tabular-xxs-400-letter-spacing-narrow`       |     | `font: 400 12px/18px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: -0.25px;` |
|                                                                                                                                                                                                                                                                                                              |     |                                                                                                             |
| **Font Tabular XXXS**                                                                                                                                                                                                                                                                                        |     |                                                                                                             |
| _Visual_                                                                                                                                                                                                                                                                                                     |     | _Figma Variables_                                                                                           |
|                                                                                                                                                                                                                                                                                                              |     | `narrow/fontTabularXxxs/600` `narrow/fontTabularXxxs/500` `narrow/fontTabularXxxs/400`                      |
| _CSS / SCSS Variables_                                                                                                                                                                                                                                                                                       |     | _Values_                                                                                                    |
| `--sds-font-tabular-xxxs-600-font-narrow` `$sds-font-tabular-xxxs-600-font-narrow` `--sds-font-tabular-xxxs-600-font-variant-numeric-narrow` `$sds-font-tabular-xxxs-600-font-variant-numeric-narrow` `--sds-font-tabular-xxxs-600-letter-spacing-narrow` `$sds-font-tabular-xxxs-600-letter-spacing-narrow` |     | `font: 600 11px/16px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: -0.25px;` |
| `--sds-font-tabular-xxxs-500-font-narrow` `$sds-font-tabular-xxxs-500-font-narrow` `--sds-font-tabular-xxxs-500-font-variant-numeric-narrow` `$sds-font-tabular-xxxs-500-font-variant-numeric-narrow` `--sds-font-tabular-xxxs-500-letter-spacing-narrow` `$sds-font-tabular-xxxs-500-letter-spacing-narrow` |     | `font: 500 11px/16px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: -0.25px;` |
| `--sds-font-tabular-xxxs-400-font-narrow` `$sds-font-tabular-xxxs-400-font-narrow` `--sds-font-tabular-xxxs-400-font-variant-numeric-narrow` `$sds-font-tabular-xxxs-400-font-variant-numeric-narrow` `--sds-font-tabular-xxxs-400-letter-spacing-narrow` `$sds-font-tabular-xxxs-400-letter-spacing-narrow` |     | `font: 400 11px/16px "Inter", sans-serif;` `font-variant-numeric: tabular-nums;` `letter-spacing: -0.25px;` |

#### Code

Use only when referring to code snippets.

| **Font Code S**                                                                                                                                                       |     |                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------------------------------------------ |
| _Visual_                                                                                                                                                              |     | _Figma Variables_                                                        |
|                                                                                                                                                                       |     | `narrow/fontCodeS/600` `narrow/fontCodeS/500` `narrow/fontCodeS/400`     |
| _CSS / SCSS Variables_                                                                                                                                                |     | _Values_                                                                 |
| `--sds-font-code-s-600-font-narrow` `$sds-font-code-s-600-font-narrow` `--sds-font-code-s-600-letter-spacing-narrow` `$sds-font-code-s-600-letter-spacing-narrow`     |     | `font: 600 14px/24px "IBM Plex Mono", monospace;` `letter-spacing: 0px;` |
| `--sds-font-code-s-500-font-narrow` `$sds-font-code-s-500-font-narrow` `--sds-font-code-s-500-letter-spacing-narrow` `$sds-font-code-s-500-letter-spacing-narrow`     |     | `font: 500 14px/24px "IBM Plex Mono", monospace;` `letter-spacing: 0px;` |
| `--sds-font-code-s-400-font-narrow` `$sds-font-code-s-400-font-narrow` `--sds-font-code-s-400-letter-spacing-narrow` `$sds-font-code-s-400-letter-spacing-narrow`     |     | `font: 400 14px/24px "IBM Plex Mono", monospace;` `letter-spacing: 0px;` |
|                                                                                                                                                                       |     |                                                                          |
| **Font Code XS**                                                                                                                                                      |     |                                                                          |
| _Visual_                                                                                                                                                              |     | _Figma Variables_                                                        |
|                                                                                                                                                                       |     | `narrow/fontCodeXs/600` `narrow/fontCodeXs/500` `narrow/fontCodeXs/400`  |
| _CSS / SCSS Variables_                                                                                                                                                |     | _Values_                                                                 |
| `--sds-font-code-xs-600-font-narrow` `$sds-font-code-xs-600-font-narrow` `--sds-font-code-xs-600-letter-spacing-narrow` `$sds-font-code-xs-600-letter-spacing-narrow` |     | `font: 600 13px/20px "IBM Plex Mono", monospace;` `letter-spacing: 0px;` |
| `--sds-font-code-xs-500-font-narrow` `$sds-font-code-xs-500-font-narrow` `--sds-font-code-xs-500-letter-spacing-narrow` `$sds-font-code-xs-500-letter-spacing-narrow` |     | `font: 500 13px/20px "IBM Plex Mono", monospace;` `letter-spacing: 0px;` |
| `--sds-font-code-xs-400-font-narrow` `$sds-font-code-xs-400-font-narrow` `--sds-font-code-xs-400-letter-spacing-narrow` `$sds-font-code-xs-400-letter-spacing-narrow` |     | `font: 400 13px/20px "IBM Plex Mono", monospace;` `letter-spacing: 0px;` |

## Code

**Using SDS Typography Variables with Tailwind CSS**

The SDS design tokens for Tailwind are exported via **Style Dictionary** and can be found in the tailwind.json file. These tokens have been updated to adhere to Tailwind’s configuration standards and follow the correct format.

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
const typography = require("@tailwindcss/typography");

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

---

Typography encompasses font style, appearance, and structure which together deliver a consistent aesthetic while providing easily readable copy.

### Typefaces

Barlow is the primary typeface to be used throughout the product. JetBrains Mono should only be used when referring to code snippets.

| **Visual** |     | **Typeface**         |     | **Usage**                                                                                     |
| ---------- | --- | -------------------- | --- | --------------------------------------------------------------------------------------------- |
|            |     | Barlow (600)         |     | All headers and emphasized body copy throughout the product.                                  |
|            |     | Barlow (500)         |     | All text used in sidebars.                                                                    |
|            |     | Barlow (400)         |     | All body copy throughout the product. If emphasized copy is needed, use a font weight of 600. |
|            |     | JetBrains Mono (400) |     | Use only when referring to code snippets.                                                     |

### Font Weights

Regular (400), Medium (500), and SemiBold (600) are the three font weights primarily used across the product, however additional font weights are available to be selectively used if needed.

| **Visual** |     | **Variable**         |     | **Value**           |
| ---------- | --- | -------------------- | --- | ------------------- |
|            |     | `fontWeightHeavy`    |     | `font-weight: 800;` |
|            |     | `fontWeightBold`     |     | `font-weight: 700;` |
|            |     | `fontWeightSemibold` |     | `font-weight: 600;` |
|            |     | `fontWeightMedium`   |     | `font-weight: 500;` |
|            |     | `fontWeightRegular`  |     | `font-weight: 400;` |
|            |     | `fontWeightThin`     |     | `font-weight: 300;` |

### Header Variables

The width of the user's screen will determine the font values used for any given variable. Wide screens are 495px or wider; narrow screens are 494px or narrower.

| **Visual** |     | **Variable** |     | **Wide screens (≥495px)**                                                    |     | **Narrow screens (<494px)**                                                  |
| ---------- | --- | ------------ | --- | ---------------------------------------------------------------------------- | --- | ---------------------------------------------------------------------------- |
|            |     | `siteTitle`  |     | `font-size: 51px;` `line-height: 63.8px;` `font-weight: fontWeightSemibold;` |     | `font-size: 35px;` `line-height: 43.8px;` `font-weight: fontWeightSemibold;` |
|            |     | `h1`         |     | `font-size: 35px;` `line-height: 43.8px;` `font-weight: fontWeightSemibold;` |     | `font-size: 24px;` `line-height: 38px;` `font-weight: fontWeightSemibold;`   |
|            |     | `h2`         |     | `font-size: 24px;` `line-height: 36px;` `font-weight: fontWeightSemibold;`   |     | `font-size: 20px;` `line-height: 27px;` `font-weight: fontWeightSemibold;`   |
|            |     | `h3`         |     | `font-size: 20px;` `line-height: 27px;` `font-weight: fontWeightSemibold;`   |     | `font-size: 18px;` `line-height: 26px;` `font-weight: fontWeightSemibold;`   |
|            |     | `h4`         |     | `font-size: 17px;` `line-height: 24px;` `font-weight: fontWeightSemibold;`   |     | `font-size: 16px;` `line-height: 23px;` `font-weight: fontWeightSemibold;`   |
|            |     | `h5`         |     | `font-size: 14px;` `line-height: 21px;` `font-weight: fontWeightSemibold;`   |     | `font-size: 14px;` `line-height: 21px;` `font-weight: fontWeightSemibold;`   |
|            |     | `h6`         |     | `font-size: 12px;` `line-height: 18px;` `font-weight: fontWeightSemibold;`   |     | `font-size: 12px;` `line-height: 18px;` `font-weight: fontWeightSemibold;`   |

### Code Variables

The width of the user's screen will determine the font values used for any given variable. Wide screens are 495px or wider; narrow screens are 494px or narrower.

| **Visual** |     | **Variable** |     | **Wide screens (≥495px)**                                                 |     | **Narrow screens (<494px)**                                                 |
| ---------- | --- | ------------ | --- | ------------------------------------------------------------------------- | --- | --------------------------------------------------------------------------- |
|            |     | `code`       |     | `font-size: 16px;` `line-height: 28px;` `font-weight: fontWeightRegular;` |     | `font-size: 10px;` `line-height: 19.3px;` `font-weight: fontWeightRegular;` |

### Sidebar Variables

The width of the user's screen will determine the font values used for any given variable. Wide screens are 495px or wider; narrow screens are 494px or narrower.

| **Visual** |     | **Variable**        |     | **Wide screens (≥595px)**                                                                                 |     | **Narrow screens (<594px)**                                                                               |
| ---------- | --- | ------------------- | --- | --------------------------------------------------------------------------------------------------------- | --- | --------------------------------------------------------------------------------------------------------- |
|            |     | `fontSidebarHeader` |     | `font-size: 17px;` `line-height: 29.8px;` `font-weight: fontWeightSemibold;` `text-transform: uppercase;` |     | `font-size: 11px;` `line-height: 20.4px;` `font-weight: fontWeightSemibold;` `text-transform: uppercase;` |
|            |     | `fontSidebarText`   |     | `font-size: 14px;` `line-height: 24.5px;` `font-weight: fontWeightMedium;`                                |     | `font-size: 9px;` `line-height: 15.8px;` `font-weight: fontWeightMedium;`                                 |
|            |     | `fontSidebarCode`   |     | `font-size: 13px;` `line-height: 24.5px;` `font-weight: fontWeightMedium;`                                |     | `font-size: 8.5px;` `line-height: 15.8px;` `font-weight: fontWeightMedium;`                               |

### Body Variables

The same type variables are used for body fonts on both wide and narrow screen widths. For this reason, screen width does not alter the font values used; simply use the variable corresponding to the font size needed.

`BodyM` is the primary font used for wide screens (495px and wider); `bodyS` is the primary font used for narrow screens (494px and narrower).

> **Warning:** `bodyXxs` is being deprecated and should not be used in new designs moving forward.

| **Visual** |     | **Variable** |     | **Value**                                                                   |
| ---------- | --- | ------------ | --- | --------------------------------------------------------------------------- |
|            |     | `bodyM`      |     | `font-size: 17px;` `line-height: 25.5px;` `font-weight: fontWeightRegular;` |
|            |     | `bodyS`      |     | `font-size: 14px;` `line-height: 17.5px;` `font-weight: fontWeightRegular;` |
|            |     | `bodyXs`     |     | `font-size: 12px;` `line-height: 16.5px;` `font-weight: fontWeightRegular;` |
|            |     | `bodyXxs`    |     | `font-size: 9px;` `line-height: 15.8px;` `font-weight: fontWeightRegular;`  |

---

Typography encompasses font style, appearance, and structure which together deliver a consistent aesthetic while providing easily readable copy.

### Typefaces

Open Sans is the primary typeface to be used throughout product and marketing materials. Andale Mono should only be used when referring to code snippets.

| **Visual** |     | **Typeface**      |     | **Usage**                                                                                                             |
| ---------- | --- | ----------------- | --- | --------------------------------------------------------------------------------------------------------------------- |
|            |     | Open Sans (600)   |     | All headers throughout the product and marketing materials and emphasized body copy.                                  |
|            |     | Open Sans (400)   |     | All body copy throughout the product and marketing materials. If emphasized copy is needed, use a font weight of 600. |
|            |     | Andale Mono (400) |     | Use only when referring to code snippets.                                                                             |

### Font Weights

Regular (400) and SemiBold (600) are the two font weights primarily used across the product, however additional font weights are available to be selectively used if needed.

| **Visual** |     | **Variable**         |     | **Value**           |
| ---------- | --- | -------------------- | --- | ------------------- |
|            |     | `fontWeightHeavy`    |     | `font-weight: 800;` |
|            |     | `fontWeightBold`     |     | `font-weight: 700;` |
|            |     | `fontWeightSemibold` |     | `font-weight: 600;` |
|            |     | `fontWeightRegular`  |     | `font-weight: 400;` |
|            |     | `fontWeightThin`     |     | `font-weight: 300;` |

### Header Variables

<H1>, <H2>, <H3>, <H4>, <H5>, <H6>

| **Visual** |     | **Variable**     |     | **Value**                                                                                           |
| ---------- | --- | ---------------- | --- | --------------------------------------------------------------------------------------------------- |
|            |     | `fontHeaderXxl`  |     | `font-size: 26px;` `line-height: 34px;` `letter-spacing: 0.3px;` `font-weight: fontWeightSemibold;` |
|            |     | `fontHeaderXl`   |     | `font-size: 22px;` `line-height: 30px;` `letter-spacing: 0.3px;` `font-weight: fontWeightSemibold;` |
|            |     | `fontHeaderL`    |     | `font-size: 18px;` `line-height: 24px;` `letter-spacing: 0.3px;` `font-weight: fontWeightSemibold;` |
|            |     | `fontHeaderM`    |     | `font-size: 16px;` `line-height: 22px;` `letter-spacing: 0.3px;` `font-weight: fontWeightSemibold;` |
|            |     | `fontHeaderS`    |     | `font-size: 14px;` `line-height: 20px;` `letter-spacing: 0.3px;` `font-weight: fontWeightSemibold;` |
|            |     | `fontHeaderXs`   |     | `font-size: 13px;` `line-height: 18px;` `letter-spacing: 0.3px;` `font-weight: fontWeightSemibold;` |
|            |     | `fontHeaderXxs`  |     | `font-size: 12px;` `line-height: 18px;` `letter-spacing: 0.3px;` `font-weight: fontWeightSemibold;` |
|            |     | `fontHeaderXxxs` |     | `font-size: 11px;` `line-height: 16px;` `letter-spacing: 0.3px;` `font-weight: fontWeightSemibold;` |

### Body Variables

<p>

| **Visual** |     | **Variable**   |     | **Value**                                                                                          |
| ---------- | --- | -------------- | --- | -------------------------------------------------------------------------------------------------- |
|            |     | `fontBodyL`    |     | `font-size: 18px;` `line-height: 28px;` `letter-spacing: 0.3px;` `font-weight: fontWeightRegular;` |
|            |     | `fontBodyM`    |     | `font-size: 16px;` `line-height: 26px;` `letter-spacing: 0.3px;` `font-weight: fontWeightRegular;` |
|            |     | `fontBodyS`    |     | `font-size: 14px;` `line-height: 24px;` `letter-spacing: 0.3px;` `font-weight: fontWeightRegular;` |
|            |     | `fontBodyXs`   |     | `font-size: 13px;` `line-height: 20px;` `letter-spacing: 0.3px;` `font-weight: fontWeightRegular;` |
|            |     | `fontBodyXxs`  |     | `font-size: 12px;` `line-height: 18px;` `letter-spacing: 0.3px;` `font-weight: fontWeightRegular;` |
|            |     | `fontBodyXxxs` |     | `font-size: 11px;` `line-height: 16px;` `letter-spacing: 0.3px;` `font-weight: fontWeightRegular;` |

### All Caps Variables

| **Visual** |     | **Variable**    |     | **Value**                                                                                                                      |
| ---------- | --- | --------------- | --- | ------------------------------------------------------------------------------------------------------------------------------ |
|            |     | `fontCapsXxs`   |     | `font-size: 12px;` `line-height: 18px;` `letter-spacing: 1px;` `font-weight: fontWeightSemibold;` `text-transform: uppercase;` |
|            |     | `fontCapsXxxs`  |     | `font-size: 11px;` `line-height: 16px;` `letter-spacing: 1px;` `font-weight: fontWeightSemibold;` `text-transform: uppercase;` |
|            |     | `fontCapsXxxxs` |     | `font-size: 10px;` `line-height: 14px;` `letter-spacing: 1px;` `font-weight: fontWeightSemibold;` `text-transform: uppercase;` |

---

Typography encompasses font style, appearance, and structure which together deliver a consistent aesthetic while providing easily readable copy.

### Typefaces

Open Sans is the primary typeface to be used throughout product and marketing materials. Andale Mono should only be used when referring to code snippets.

| **Visual** |     | **Typeface**      |     | **Usage**                                                                                                             |
| ---------- | --- | ----------------- | --- | --------------------------------------------------------------------------------------------------------------------- |
|            |     | Open Sans (600)   |     | All headers throughout the product and marketing materials and emphasized body copy.                                  |
|            |     | Open Sans (400)   |     | All body copy throughout the product and marketing materials. If emphasized copy is needed, use a font weight of 600. |
|            |     | Andale Mono (400) |     | Use only when referring to code snippets.                                                                             |

### Font Weights

Regular (400) and SemiBold (600) are the two font weights primarily used across the product, however additional font weights are available to be selectively used if needed.

| **Visual** |     | **Variable**         |     | **Value**           |
| ---------- | --- | -------------------- | --- | ------------------- |
|            |     | `fontWeightHeavy`    |     | `font-weight: 800;` |
|            |     | `fontWeightBold`     |     | `font-weight: 700;` |
|            |     | `fontWeightSemibold` |     | `font-weight: 600;` |
|            |     | `fontWeightRegular`  |     | `font-weight: 400;` |
|            |     | `fontWeightThin`     |     | `font-weight: 300;` |

### Header Variables

<H1>, <H2>, <H3>, <H4>, <H5>, <H6>

| **Visual** |     | **Variable**     |     | **Value**                                                                                           |
| ---------- | --- | ---------------- | --- | --------------------------------------------------------------------------------------------------- |
|            |     | `fontHeaderXxl`  |     | `font-size: 26px;` `line-height: 34px;` `letter-spacing: 0.3px;` `font-weight: fontWeightSemibold;` |
|            |     | `fontHeaderXl`   |     | `font-size: 22px;` `line-height: 30px;` `letter-spacing: 0.3px;` `font-weight: fontWeightSemibold;` |
|            |     | `fontHeaderL`    |     | `font-size: 18px;` `line-height: 24px;` `letter-spacing: 0.3px;` `font-weight: fontWeightSemibold;` |
|            |     | `fontHeaderM`    |     | `font-size: 16px;` `line-height: 22px;` `letter-spacing: 0.3px;` `font-weight: fontWeightSemibold;` |
|            |     | `fontHeaderS`    |     | `font-size: 14px;` `line-height: 20px;` `letter-spacing: 0.3px;` `font-weight: fontWeightSemibold;` |
|            |     | `fontHeaderXs`   |     | `font-size: 13px;` `line-height: 18px;` `letter-spacing: 0.3px;` `font-weight: fontWeightSemibold;` |
|            |     | `fontHeaderXxs`  |     | `font-size: 12px;` `line-height: 18px;` `letter-spacing: 0.3px;` `font-weight: fontWeightSemibold;` |
|            |     | `fontHeaderXxxs` |     | `font-size: 11px;` `line-height: 16px;` `letter-spacing: 0.3px;` `font-weight: fontWeightSemibold;` |

### Body Variables

<p>

| **Visual** |     | **Variable**   |     | **Value**                                                                                          |
| ---------- | --- | -------------- | --- | -------------------------------------------------------------------------------------------------- |
|            |     | `fontBodyL`    |     | `font-size: 18px;` `line-height: 28px;` `letter-spacing: 0.3px;` `font-weight: fontWeightRegular;` |
|            |     | `fontBodyM`    |     | `font-size: 16px;` `line-height: 26px;` `letter-spacing: 0.3px;` `font-weight: fontWeightRegular;` |
|            |     | `fontBodyS`    |     | `font-size: 14px;` `line-height: 24px;` `letter-spacing: 0.3px;` `font-weight: fontWeightRegular;` |
|            |     | `fontBodyXs`   |     | `font-size: 13px;` `line-height: 20px;` `letter-spacing: 0.3px;` `font-weight: fontWeightRegular;` |
|            |     | `fontBodyXxs`  |     | `font-size: 12px;` `line-height: 18px;` `letter-spacing: 0.3px;` `font-weight: fontWeightRegular;` |
|            |     | `fontBodyXxxs` |     | `font-size: 11px;` `line-height: 16px;` `letter-spacing: 0.3px;` `font-weight: fontWeightRegular;` |

### All Caps Variables

| **Visual** |     | **Variable**    |     | **Value**                                                                                                                      |
| ---------- | --- | --------------- | --- | ------------------------------------------------------------------------------------------------------------------------------ |
|            |     | `fontCapsXxs`   |     | `font-size: 12px;` `line-height: 18px;` `letter-spacing: 1px;` `font-weight: fontWeightSemibold;` `text-transform: uppercase;` |
|            |     | `fontCapsXxxs`  |     | `font-size: 11px;` `line-height: 16px;` `letter-spacing: 1px;` `font-weight: fontWeightSemibold;` `text-transform: uppercase;` |
|            |     | `fontCapsXxxxs` |     | `font-size: 10px;` `line-height: 14px;` `letter-spacing: 1px;` `font-weight: fontWeightSemibold;` `text-transform: uppercase;` |
