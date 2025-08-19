---
title: "Borders"
id: 7352911
uid: "47078f"
slug: "47078f-borders"
url: "https://sds.czi.design/009eaf17b/v/latest/p/47078f-borders"
hidden: false
locked: false
created_at: "2025-07-07T20:30:24.716Z"
updated_at: "2025-07-07T20:30:24.721Z"
status_id: "not_applicable"
status_name: "SDS"
---

# Borders

Borders are the lines that go around elements to help contain them while visually communicating to users an element's usage, status, or intent.

### Types of Borders

| **Visual** |   | **Border Type** |   | **Usage** |
| --- | --- | --- | --- | --- |
|  |   | Standard Border |   |  Base style for all borders. Borders are used on secondary buttons, input fields, modals, dropdown menus, etc.  |
|   |   | Dashed Border |   | Dashed borders are used in file upload/drag and drop containers and [Dashed Links](https://sds.czi.design/009eaf17b/v/0/p/78d741-text-links/t/677879). |

### Base Borders

These borders are used throughout the SDS whenever borders in Base colors are needed.

| **Visual** |   | **Usage** |   | **CSS / SCSS Variables** |   | **Value** |
| --- | --- | --- | --- | --- | --- | --- |
|   |   | Default |   | `--sds-border-base-default` `$sds-border-base-default` |   | `1px solid #999999` |
|   |   | Hover |   | `--sds-border-base-hover` `$sds-border-base-hover` |   | `1px solid #000000` |
|   |   | Disabled |   | `--sds-border-base-disabled` `$sds-border-base-disabled` |   | `1px solid #cccccc` |
|   |   | Table borders only |   | `--sds-border-base-table` `$sds-border-base-table` |   | `1px solid #cccccc` |
|   |   | Dividers only (`<hr>`) |   | `--sds-border-base-divider` `$sds-border-base-divider` |   | `1px solid #eaeaea` |

### Link Borders

Use this border type when implementing links with a dashed underline.

| **Visual** |   | **Usage** |   | **CSS / SCSS Variables** |   | **Value** |
| --- | --- | --- | --- | --- | --- | --- |
|   |   | Dashed link (default state) |   | `--sds-border-link-dashed` `$sds-border-link-dashed` |   | `1px dashed` |
|   |   | Dashed link (hover and pressed states) |   | `--sds-border-link-solid` `$sds-border-link-solid` |   | `1px solid` |

### Accent Borders

These borders are used throughout the SDS whenever borders in Accent colors are needed.

| **Visual** |   | **Usage** |   | **CSS / SCSS Variables** |   | **Value** |
| --- | --- | --- | --- | --- | --- | --- |
|   |   | Default |   | `--sds-border-accent-default` `$sds-border-accent-default` |   | `1px solid #0b68f8` |
|   |   | Hover |   | `--sds-border-accent-hover` `$sds-border-accent-hover` |   | `1px solid #0142a4` |
|   |   | Disabled |   | `--sds-border-accent-disabled` `$sds-border-accent-disabled` |   | `1px solid #a6c9ff` |
|   |   | Default (dashed) |   | `--sds-border-accent-dashed` `$sds-border-accent-dashed` |   | `1px dashed #0b68f8` |

### Intent Borders

These borders are used on elements when needing to communicate a specific intent as indicated in the *Intent* column.

| **Visual** |   | **Intent** |   | **CSS / SCSS Variables** |   | **Value** |
| --- | --- | --- | --- | --- | --- | --- |
|   |   | Beta |   | `--sds-border-beta-default` `$sds-border-beta-default` |   | `1px solid #7a41ce` |
|   |   | Info |   | `--sds-border-info-default` `$sds-border-info-default` |   | `1px solid #0b68f8` |
|   |   | Negative |   | `--sds-border-negative-default` `$sds-border-negative-default` |   | `1px solid #dc132c` |
|   |   | Neutral |   | `--sds-border-neutral-default` `$sds-border-neutral-default` |   | `1px solid #999999` |
|   |   | Notice |   | `--sds-border-notice-default` `$sds-border-notice-default` |   | `1px solid #f5a623` |
|  |   | Positive |   | `--sds-border-positive-default` `$sds-border-positive-default` |   | `1px solid #3cb371` |

