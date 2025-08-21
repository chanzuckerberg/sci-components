# Borders

Borders are the lines that go around elements to help contain them while visually communicating to users an element's usage, status, or intent.

### Types of Borders

| **Visual** |     | **Border Type** |     | **Usage**                                                                                                     |
| ---------- | --- | --------------- | --- | ------------------------------------------------------------------------------------------------------------- |
|            |     | Standard Border |     | Base style for all borders. Borders are used on secondary buttons, input fields, modals, dropdown menus, etc. |
|            |     | Dashed Border   |     | Dashed borders are used in file upload/drag and drop containers and Dashed Links.                             |

### Base Borders

These borders are used throughout the SDS whenever borders in Base colors are needed.

| **Visual** |     | **Usage**              |     | **CSS / SCSS Variables**                                 |     | **Value**           |
| ---------- | --- | ---------------------- | --- | -------------------------------------------------------- | --- | ------------------- |
|            |     | Default                |     | `--sds-border-base-default` `$sds-border-base-default`   |     | `1px solid #999999` |
|            |     | Hover                  |     | `--sds-border-base-hover` `$sds-border-base-hover`       |     | `1px solid #000000` |
|            |     | Disabled               |     | `--sds-border-base-disabled` `$sds-border-base-disabled` |     | `1px solid #cccccc` |
|            |     | Table borders only     |     | `--sds-border-base-table` `$sds-border-base-table`       |     | `1px solid #cccccc` |
|            |     | Dividers only (`<hr>`) |     | `--sds-border-base-divider` `$sds-border-base-divider`   |     | `1px solid #eaeaea` |

### Link Borders

Use this border type when implementing links with a dashed underline.

| **Visual** |     | **Usage**                              |     | **CSS / SCSS Variables**                             |     | **Value**    |
| ---------- | --- | -------------------------------------- | --- | ---------------------------------------------------- | --- | ------------ |
|            |     | Dashed link (default state)            |     | `--sds-border-link-dashed` `$sds-border-link-dashed` |     | `1px dashed` |
|            |     | Dashed link (hover and pressed states) |     | `--sds-border-link-solid` `$sds-border-link-solid`   |     | `1px solid`  |

### Accent Borders

These borders are used throughout the SDS whenever borders in Accent colors are needed.

| **Visual** |     | **Usage**        |     | **CSS / SCSS Variables**                                     |     | **Value**            |
| ---------- | --- | ---------------- | --- | ------------------------------------------------------------ | --- | -------------------- |
|            |     | Default          |     | `--sds-border-accent-default` `$sds-border-accent-default`   |     | `1px solid #0b68f8`  |
|            |     | Hover            |     | `--sds-border-accent-hover` `$sds-border-accent-hover`       |     | `1px solid #0142a4`  |
|            |     | Disabled         |     | `--sds-border-accent-disabled` `$sds-border-accent-disabled` |     | `1px solid #a6c9ff`  |
|            |     | Default (dashed) |     | `--sds-border-accent-dashed` `$sds-border-accent-dashed`     |     | `1px dashed #0b68f8` |

### Intent Borders

These borders are used on elements when needing to communicate a specific intent as indicated in the _Intent_ column.

| **Visual** |     | **Intent** |     | **CSS / SCSS Variables**                                       |     | **Value**           |
| ---------- | --- | ---------- | --- | -------------------------------------------------------------- | --- | ------------------- |
|            |     | Beta       |     | `--sds-border-beta-default` `$sds-border-beta-default`         |     | `1px solid #7a41ce` |
|            |     | Info       |     | `--sds-border-info-default` `$sds-border-info-default`         |     | `1px solid #0b68f8` |
|            |     | Negative   |     | `--sds-border-negative-default` `$sds-border-negative-default` |     | `1px solid #dc132c` |
|            |     | Neutral    |     | `--sds-border-neutral-default` `$sds-border-neutral-default`   |     | `1px solid #999999` |
|            |     | Notice     |     | `--sds-border-notice-default` `$sds-border-notice-default`     |     | `1px solid #f5a623` |
|            |     | Positive   |     | `--sds-border-positive-default` `$sds-border-positive-default` |     | `1px solid #3cb371` |

---

Borders are the lines that go around elements to help contain them while visually communicating to users an element's usage, status, or intent.

### Types of Borders

| **Visual** |     | **Border Type** |     | **Usage**                                                                                                     |
| ---------- | --- | --------------- | --- | ------------------------------------------------------------------------------------------------------------- |
|            |     | Standard Border |     | Base style for all borders. Borders are used on secondary buttons, input fields, modals, dropdown menus, etc. |
|            |     | Dashed Border   |     | Dashed borders are used in file upload/drag and drop containers and Dashed Text Links.                        |

### Border Variables

| **Visual** |     | **Variable**             |     | **Value**                |     | **Usage**                                                                                                                            |
| ---------- | --- | ------------------------ | --- | ------------------------ | --- | ------------------------------------------------------------------------------------------------------------------------------------ |
|            |     | `borderPrimary600`       |     | `1px solid primary600;`  |     | Active rounded and square buttons                                                                                                    |
|            |     | `borderPrimary500`       |     | `1px solid primary500;`  |     | Hover rounded and square buttons                                                                                                     |
|            |     | `borderPrimary400`       |     | `1px solid primary400;`  |     | Secondary buttons, active states of input containers                                                                                 |
|            |     | `borderGray500`          |     | `1px solid gray500;`     |     | Input and dropdown hover states                                                                                                      |
|            |     | `borderGray400`          |     | `1px solid gray400;`     |     | Input borders (default states)                                                                                                       |
|            |     | `borderGray300`          |     | `1px solid gray300;`     |     | Disabled or non-interactive containers (buttons/inputs/tooltips)                                                                     |
|            |     | `borderGray200`          |     | `1px solid gray200;`     |     |                                                                                                                                      |
|            |     | `borderGray100`          |     | `1px solid gray100;`     |     | Modals and dropdown Menus                                                                                                            |
|            |     | `borderSuccess400`       |     | `1px solid success400;`  |     |                                                                                                                                      |
|            |     | `borderError400`         |     | `1px solid error500;`    |     |                                                                                                                                      |
|            |     | `borderWarning400`       |     | `1px solid warning500;`  |     | Warning state on inputs                                                                                                              |
|            |     | `borderGray400Dashed`    |     | `2px dashed gray400;`    |     | File upload/drag and drop containers                                                                                                 |
|            |     | `borderPrimary400Dashed` |     | `2px dashed primary400;` |     | Hover states for containers with dashed borders                                                                                      |
|            |     | `borderLinkDashed`       |     | `1px dashed;`            |     | Default bottom-border for Dashed Text Links; border color is inherited from the color used in the paragraph it is part of.           |
|            |     | `borderLinkSolid`        |     | `1px solid;`             |     | Hover and Pressed bottom-border for Dashed Text Links; border color is inherited from the color used in the paragraph it is part of. |

---

Borders are the lines that go around elements to help contain them while visually communicating to users an element's usage, status, or intent.

### Types of Borders

| **Visual** |     | **Border Type** |     | **Usage**                                                                                                     |
| ---------- | --- | --------------- | --- | ------------------------------------------------------------------------------------------------------------- |
|            |     | Standard Border |     | Base style for all borders. Borders are used on secondary buttons, input fields, modals, dropdown menus, etc. |
|            |     | Dashed Border   |     | Dashed borders are used in file upload/drag and drop containers and Dashed Text Links.                        |

### Border Variables

| **Visual** |     | **Variable**             |     | **Value**                |     | **Usage**                                                                                                                            |
| ---------- | --- | ------------------------ | --- | ------------------------ | --- | ------------------------------------------------------------------------------------------------------------------------------------ |
|            |     | `borderPrimary600`       |     | `1px solid primary600;`  |     | Active rounded and square buttons                                                                                                    |
|            |     | `borderPrimary500`       |     | `1px solid primary500;`  |     | Hover rounded and square buttons                                                                                                     |
|            |     | `borderPrimary400`       |     | `1px solid primary400;`  |     | Secondary buttons, active states of input containers                                                                                 |
|            |     | `borderGray500`          |     | `1px solid gray500;`     |     | Input and dropdown hover states                                                                                                      |
|            |     | `borderGray400`          |     | `1px solid gray400;`     |     | Input borders (default states)                                                                                                       |
|            |     | `borderGray300`          |     | `1px solid gray300;`     |     | Disabled or non-interactive containers (buttons/inputs/tooltips)                                                                     |
|            |     | `borderGray200`          |     | `1px solid gray200;`     |     |                                                                                                                                      |
|            |     | `borderGray100`          |     | `1px solid gray100;`     |     | Modals and dropdown Menus                                                                                                            |
|            |     | `borderSuccess400`       |     | `1px solid success400;`  |     |                                                                                                                                      |
|            |     | `borderError400`         |     | `1px solid error500;`    |     |                                                                                                                                      |
|            |     | `borderWarning400`       |     | `1px solid warning500;`  |     | Warning state on inputs                                                                                                              |
|            |     | `borderGray400Dashed`    |     | `2px dashed gray400;`    |     | File upload/drag and drop containers                                                                                                 |
|            |     | `borderPrimary400Dashed` |     | `2px dashed primary400;` |     | Hover states for containers with dashed borders                                                                                      |
|            |     | `borderLinkDashed`       |     | `1px dashed;`            |     | Default bottom-border for Dashed Text Links; border color is inherited from the color used in the paragraph it is part of.           |
|            |     | `borderLinkSolid`        |     | `1px solid;`             |     | Hover and Pressed bottom-border for Dashed Text Links; border color is inherited from the color used in the paragraph it is part of. |
