---
title: "Icons"
id: 7352948
uid: "65c15b"
slug: "65c15b-icons"
url: "https://sds.czi.design/009eaf17b/v/latest/p/65c15b-icons"
hidden: false
locked: false
created_at: "2025-07-07T20:30:30.843Z"
updated_at: "2025-07-07T20:30:33.413Z"
---

# Icons

Icons are generally used in conjunction with text to further clarify the outcome of a user's action. Occasionally they are used as buttons themselves without accompanying text.

### Icon Component and Sizes

Any icons used in the UI should be added using the Icon component; it contains two props, `sdsIcon` and `sdsSize`.

The first prop, `sdsIcon`, is the name of the icon to be displayed. It is built as an enum and thus only accepts strings that contain icon names found in the design system.

The second prop, `sdsSize`, dictates the size of the icon to be displayed. There are four icon sizes available and each icon has a pre-established set of sizes available to it. The icon name passed into the `sdsIcon` prop will limit which sizes are available to be passed into the `sdsSize` prop.

| **Extra Large** | **Large** | **Small** | **Extra Small** |
| --- | --- | --- | --- |

| Used only for [Icon Buttons](https://sds.czi.design/009eaf17b/v/0/p/19fa79-buttons/t/523de0). | [Buttons](https://sds.czi.design/009eaf17b/p/19fa79) and [Tags](https://sds.czi.design/009eaf17b/p/66562c) | [Dropdown Input](https://sds.czi.design/009eaf17b/p/25d75a) and [Search Inputs](https://sds.czi.design/009eaf17b/p/25d43a) | [Checkbox Inputs](https://sds.czi.design/009eaf17b/v/0/p/818f0c-control-inputs/t/373b8f), [Tags](https://sds.czi.design/009eaf17b/p/66562c), [Menu Items](https://sds.czi.design/009eaf17b/v/0/p/95546f-dropdown-menus/t/614b7e) |
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

| **Chevrons** |   |   |   |
| --- | --- | --- | --- |

|  **Chevrons** | **Circles** | **Code** | **Copy** |
| --- | --- | --- | --- |

| **Copy** | **Cube** | **DNA** | **Document** |
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

| **Person** | **Percentage** | **Pins** |   |
| --- | --- | --- | --- |

| **Play** | **Pluses** |   | **Projects** |
| --- | --- | --- | --- |

| **Projects** | **Puzzle Piece** | **Question Mark** | **Quote** |
| --- | --- | --- | --- |

| **Refresh** | **Save** | **Search** |   |
| --- | --- | --- | --- |

| **Share** | **Sliders** | **Speech Bubbles** | **Squares** |
| --- | --- | --- | --- |

| **Stars** |   | **Table** | **Trash Can** |
| --- | --- | --- | --- |

| **Trees** |   |   |   |
| --- | --- | --- | --- |

| **Trees** |   | **Triangles** |   |
| --- | --- | --- | --- |

| **Triangles** |   | **Upload** | **Viruses** |
| --- | --- | --- | --- |

| **Viruses** | **Xmarks** |   |   |
| --- | --- | --- | --- |

