---
title: "Dialogs"
id: 7352928
uid: "559d56"
slug: "559d56-dialogs"
url: "https://sds.czi.design/009eaf17b/v/latest/p/559d56-dialogs"
hidden: false
locked: false
created_at: "2025-07-07T20:30:27.452Z"
updated_at: "2025-07-07T20:30:27.550Z"
---

# Dialogs

A Dialog is a window element that appears on top of content to provide information or prompt the user for an action. When a Dialog is active, it disables all functionality of the page below and remains on the screen until it is either dismissed or action has been taken.

## Overview

|  | In Figma |   |  | Meets Accessibility |   |  | In napari hub + .org Codebases |
| --- | --- | --- | --- | --- | --- | --- | --- |

Dialogs are highly customizable and designed to accommodate a range of product needs and can optionally include overline text above the title, subtitle text below the title, or both. The interior of a Dialog can be filled with any content needed, whether that is to communicate information to the user or collect data from them via a form.

There are five size options, each with a fixed width and minimum height (except for `xs` and `xxs` which have no minimum height):

* `xxs` — `width: 270px`
* `xs` —`width: 400px`
* `s` —`width: 600px`, `min-height: 400px`
* `m` —`width: 900px`, `min-height: 480px`
* `l` —`width: 1200px`, `min-height: 600px`

Dialogs are dismissible in a few different ways. Regardless of how a Dialog is dismissed, it will result in any selections the user has made within it being lost.

Dialogs may be dismissed by:

* Clicking an action [Button](https://sds.czi.design/009eaf17b/p/19fa79) that is configured to close, cancel, or complete an action occurring in the Dialog
* Pressing the keyboard Esc key
* Clicking the close [Icon Button](https://sds.czi.design/009eaf17b/v/0/p/19fa79-buttons/t/523de0)
* Clicking outside of the Dialog. Doing this will result in any selections the user has made being lost, so it is recommended that the `canOutsideClickClose` prop remain set to `false` (the default setting) in instances where losing entered information would be a significant burden to the user

---

### Dialog Spacing

In instances where the length of content contained in the Dialog results in the Dialog filling the entire height of the screen, there must be a minimum of `spaceXxl` margin above and below the Dialog window. The Dialog content scrolls when it exceeds the max-height of the dialog window; the title and any action [Buttons](https://sds.czi.design/009eaf17b/p/19fa79) are anchored to the top and bottom during scrolling.

---

### Dialog Backdrop

A backdrop appears behind the active Dialog to bring emphasis to it as well as indicate to users that they cannot interact with the content on the page behind it.

## Code

## Dialog Component

| Below you will find an interactive Storybook iframe for Dialogs.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [Dialog](https://sds.czi.design/009eaf17b/v/0/p/559d56-dialogs/t/818eff) |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the napari hub or napari.org codebases, use a theme file to enable the napari visual appearance customization.

### Dialog

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/dialog--default)

