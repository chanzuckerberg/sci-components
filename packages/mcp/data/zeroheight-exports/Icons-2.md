---
title: "Icons"
id: 7352987
uid: "6711cd"
slug: "6711cd-icons"
url: "https://sds.czi.design/009eaf17b/v/latest/p/6711cd-icons"
hidden: false
locked: false
created_at: "2025-07-07T20:30:39.876Z"
updated_at: "2025-07-07T20:30:41.890Z"
---

# Icons

Icons are generally used in conjunction with text to further clarify the outcome of a user's action. Occasionally they are used as buttons themselves without accompanying text.

### Icon Component and Sizes

Any icons used in the UI should be added using the Icon component; it contains two props, `sdsIcon` and `sdsSize`.

The first prop, `sdsIcon`, is the name of the icon to be displayed. It is built as an enum and thus only accepts strings that contain icon names found in the design system.

The second prop, `sdsSize`, dictates the size of the icon to be displayed. There are four icon sizes available and each icon has a pre-established set of sizes available to it. The icon name passed into the `sdsIcon` prop will limit which sizes are available to be passed into the `sdsSize` prop.

| **Extra Large** | **Large** | **Small** | **Extra Small** |
| --- | --- | --- | --- |

| Used only for [Icon Buttons](https://sds.czi.design/009eaf17b/v/0/p/4289c6-buttons/t/3287e9). | [Buttons](https://sds.czi.design/009eaf17b/p/4289c6), [Callouts](https://sds.czi.design/009eaf17b/p/07e099), [Notifications](https://sds.czi.design/009eaf17b/p/43725d), [Tags](https://sds.czi.design/009eaf17b/p/415f47), etc. | [Dropdown Inputs](https://sds.czi.design/009eaf17b/p/9800c1), [Search Inputs](https://sds.czi.design/009eaf17b/v/0/p/5323b5-field-inputs/t/81abad), [Segmented Control](https://sds.czi.design/009eaf17b/p/025431), etc. | [Checkbox Inputs](https://sds.czi.design/009eaf17b/v/0/p/735181-control-inputs/t/412576), [Filter Tags](https://sds.czi.design/009eaf17b/v/0/p/415f47-tags/t/966ade), [Multi-select Menu Items](https://sds.czi.design/009eaf17b/v/0/p/552539-dropdown-menus/t/343310), etc. |
| --- | --- | --- | --- |

### Custom Icons

In rare circumstances, an icon will need added to the UI without using the Icon component (most often in cases where the icon being used is not part of the icon set within the design system). In these cases, an svg of the icon should always be used and its size should be set using one of the sizing variables below. The dimensions established with these variables align to the dimensions used by the `sdsSize` prop on the Icon component.

| **Visual** |   | **Variable** |   | **Value** |   | **Equivalent sdsSize Value** |
| --- | --- | --- | --- | --- | --- | --- |
|  |   | `iconSizeXl` |   | `height: 32px` `width: 32px` |   | `extraLarge` |
|  |   | `iconSizeL` |   | `height: 22px` `width: 22px` |   | `large` |
|  |   | `iconSizeS` |   | `height: 14px` `width: 14px` |   | `small` |
|  |   | `iconSizeXs` |   | `height: 10px` `width: 10px` |   | `extraSmall` |

### Icons

The table below provides a visual of each icon, its name to be passed in the `sdsIcon` prop, as well as the sizes available to be passed in the `sdsSize` prop.

| **Bacteria** | **Bar Charts** |   |   |
| --- | --- | --- | --- |

| **Book** | **Checks** |   | **Chevrons** |
| --- | --- | --- | --- |

|  **Chevrons** |   |   | **Circles** |
| --- | --- | --- | --- |

| **Compass** | **Copy** | **DNA** | **Document** |
| --- | --- | --- | --- |

| **Dots** | **Download** | **Edit** | **Exclamation Marks** |
| --- | --- | --- | --- |

| **Exclamation Marks** | **Eyes** |   | **Filter** |
| --- | --- | --- | --- |

| **Flags** |   |   |   |
| --- | --- | --- | --- |

| **Flasks** |   |   | **Gear** |
| --- | --- | --- | --- |

| **Globes** |   | **Grids** |   |
| --- | --- | --- | --- |

| **Grids** | **House** | **Info** |   |
| --- | --- | --- | --- |

| **Life Ring** | **Lightbulb** | **Lines** |   |
| --- | --- | --- | --- |

| **Link** | **List** | **Loading** | **Locks** |
| --- | --- | --- | --- |

| **Locks** | **Minus** | **Open** | **People** |
| --- | --- | --- | --- |

| **People** | **Percentage** | **Pins** |   |
| --- | --- | --- | --- |

| **Play** | **Pluses** |   | **Projects** |
| --- | --- | --- | --- |

| **Projects** | **Puzzle Piece** | **Question Mark** | **Refresh** |
| --- | --- | --- | --- |

| **Save** | **Search** |   | **Share** |
| --- | --- | --- | --- |

| **Sliders** | **Speech Bubbles** | **Squares** | **Stars** |
| --- | --- | --- | --- |

| **Stars** | **Table** | **Trash Can** | **Trees** |
| --- | --- | --- | --- |

| **Trees** |   |   |   |
| --- | --- | --- | --- |

| **Trees** | **Triangles** |   |   |
| --- | --- | --- | --- |

| **Triangles** | **Upload** | **Virus** | **Xmarks** |
| --- | --- | --- | --- |

| **Xmarks** |   |   |   |
| --- | --- | --- | --- |

