---
title: "Icons"
id: 7352904
uid: "529e08"
slug: "529e08-icons"
url: "https://sds.czi.design/009eaf17b/v/latest/p/529e08-icons"
hidden: false
locked: false
created_at: "2025-07-07T20:30:18.758Z"
updated_at: "2025-07-07T20:30:23.750Z"
status_id: "not_applicable"
status_name: "SDS"
---

# Icons

Icons are generally used in conjunction with text to further clarify the outcome of a user's action. Occasionally they are used as buttons themselves without accompanying text. 

### Icon Component and Sizes

Any icons used in the UI should be added using the Icon component; it contains two props, `sdsIcon` and `sdsSize`.

The first prop, `sdsIcon`, is the name of the icon to be displayed. It is built as an enum and thus only accepts strings that contain icon names found in the design system.

The second prop, `sdsSize`, dictates the size of the icon to be displayed. There are four icon sizes available and each icon has a pre-established set of sizes available to it. The icon name passed into the `sdsIcon` prop will limit which sizes are available to be passed into the `sdsSize` prop.

| **Extra Large** | **Large** | **Small** | **Extra Small** |
| --- | --- | --- | --- |

| Used only for [Icon Buttons](https://sds.czi.design/009eaf17b/v/0/p/47778c-buttons/t/73bd73). | [Buttons](https://sds.czi.design/009eaf17b/p/47778c), [Callouts](https://sds.czi.design/009eaf17b/p/72e266), [Notifications](https://sds.czi.design/009eaf17b/p/56981d), [Tags](https://sds.czi.design/009eaf17b/p/39dc34), etc. | [Dropdown Inputs](https://sds.czi.design/009eaf17b/p/1004b1), [Search Inputs](https://sds.czi.design/009eaf17b/v/0/p/1596f8-field-inputs/t/70a4ba), [Segmented Control](https://sds.czi.design/009eaf17b/p/16c065), etc. | [Checkbox Inputs](https://sds.czi.design/009eaf17b/v/0/p/548a3d-control-inputs/t/70a4ba), [Filter Tags](https://sds.czi.design/009eaf17b/v/0/p/39dc34-tags/t/70a4ba), [Multi-select Menu Items](https://sds.czi.design/009eaf17b/v/0/p/42bdf2-dropdown-menus/t/66d4e3), etc. |
| --- | --- | --- | --- |

### Custom Icons

In rare circumstances, an icon will need added to the UI without using the Icon component (most often in cases where the icon being used is not part of the icon set within the design system). In these cases, an svg of the icon should always be used and its size should be set using one of the sizing variables below. The dimensions established with these variables align to the dimensions used by the `sdsSize` prop on the Icon component.

| **Visual** |   | **SDS Variable** |   | **Value** |   | **Equivalent Value in sdsSize Prop** |
| --- | --- | --- | --- | --- | --- | --- |
|  |   | `iconSizeXl` |   | `height: 32px` `width: 32px` |   | `extraLarge` |
|  |   | `iconSizeL` |   | `height: 24px` `width: 24px` |   | `large`  |
|  |   | `iconSizeS` |   | `height: 16px` `width: 16px` |   | `small` |
|  |   | `iconSizeXs` |   | `height: 12px` `width: 12px` |   | `extraSmall` |

### Icons

The table below provides a visual of each icon, its name to be passed in the `sdsIcon` prop, as well as the sizes available to be passed in the `sdsSize` prop.

| **Bacteria** | **Bar Charts** |   |   |
| --- | --- | --- | --- |

| **Book** | **Checks** |   | **Chevrons** |
| --- | --- | --- | --- |

| **Chevrons** |   |   |   |
| --- | --- | --- | --- |

| **Chevrons** |   |   | **Circles** |
| --- | --- | --- | --- |

| **Code** | **Compass** | **Copy** | **Cube** |
| --- | --- | --- | --- |

| **DNA** | **Document** | **Dots** | **Download** |
| --- | --- | --- | --- |

| **Edit** | **Envelope** | **Exclamation Marks** |   |
| --- | --- | --- | --- |

| **Eyes** |   | **Filter** | **Flags** |
| --- | --- | --- | --- |

| **Flags** |   |   | **Flasks** |
| --- | --- | --- | --- |

| **Flasks** |   | **Gear** | **Github** |
| --- | --- | --- | --- |

| **Globes** |   | **Grids** |   |
| --- | --- | --- | --- |

| **Grids** |   | **House** | **Info** |
| --- | --- | --- | --- |

| **Info** | **Life Ring** | **Lightbulb** | **Lines** |
| --- | --- | --- | --- |

| **Lines** | **Link** | **List** | **Loading** |
| --- | --- | --- | --- |

| **Locks** |   | **Minus** | **Open** |
| --- | --- | --- | --- |

| **Pause** | **People** |   | **Percentage** |
| --- | --- | --- | --- |

| **Pins** |   | **Play** | **Pluses** |
| --- | --- | --- | --- |

| **Pluses** | **Projects** |   | **Puzzle Piece** |
| --- | --- | --- | --- |

| **Question Marks** |   | **Quote** | **Read** |
| --- | --- | --- | --- |

| **Refresh** | **Report** | **Rocket** | **Rotate** |
| --- | --- | --- | --- |

| **Rotate** | **Save** | **Scale** | **Scatter Plot** |
| --- | --- | --- | --- |

| **Search** |   | **Send** | **Share** |
| --- | --- | --- | --- |

| **Sliders** | **Speech Bubbles** | **Squares** | **Stars** |
| --- | --- | --- | --- |

| **Stars** | **Table** | **Thumbs** |   |
| --- | --- | --- | --- |

| **Trash Can** | **Trees** |   |   |
| --- | --- | --- | --- |

| **Trees** |   |   | **Triangles** |
| --- | --- | --- | --- |

| **Triangles** |   |   | **Update** |
| --- | --- | --- | --- |

| **Upload** | **Viruses** |   | **Widget** |
| --- | --- | --- | --- |

| **X Marks** |   |   |   |
| --- | --- | --- | --- |

