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

* Clicking an action Button that is configured to close, cancel, or complete an action occurring in the Dialog
* Pressing the keyboard Esc key
* Clicking the close Icon Button
* Clicking outside of the Dialog. Doing this will result in any selections the user has made being lost, so it is recommended that the `canOutsideClickClose` prop remain set to `false` (the default setting) in instances where losing entered information would be a significant burden to the user

---

### Dialog Spacing

In instances where the length of content contained in the Dialog results in the Dialog filling the entire height of the screen, there must be a minimum of `spaceXxl` margin above and below the Dialog window. The Dialog content scrolls when it exceeds the max-height of the dialog window; the title and any action Buttons are anchored to the top and bottom during scrolling.

---

### Dialog Backdrop

A backdrop appears behind the active Dialog to bring emphasis to it as well as indicate to users that they cannot interact with the content on the page behind it.

## Code

## Dialog Component

| Below you will find an interactive Storybook iframe for Dialogs.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** Dialog |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the napari hub or napari.org codebases, use a theme file to enable the napari visual appearance customization.

### Dialog

Storybook

---

A Dialog is a window element that appears on top of content to provide information or prompt the user for an action. When a Dialog is active, it disables all functionality of the page below and remains on the screen until it is either dismissed or action has been taken.

## Overview

## Dialog Variants

| The interior of a Dialog can be filled with any content needed, whether that is to communicate information to the user or collect data from them via a form. They come in four different sizes, each of which can optionally include a close Tertiary Icon Button in the top right corner, artwork above the title, and action Button(s) if the Dialog is prompting the user to take an action. In addition to their title, Dialogs can include overline text above the title, a subtitle below the title, or both.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Dialog for any given use case. |   | **Jump to variant:** Persistent Dismissible Use Cases |
| --- | --- | --- |

---

## Dialog

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ GEN EPI Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Dialogs are highly customizable and designed to accommodate a range of product needs; any combination of the following properties can be used:

* Overline text above the title, subtitle text below the title, or both
* Artwork above the title, whether a logo, icon, or illustration

There are four size options, each with a fixed width and minimum height (except for `xs` which has no minimum height):

* `xs` —`width: 400px`
* `s` —`width: 600px`, `min-height: 400px`
* `m` —`width: 900px`, `min-height: 480px`
* `l` —`width: 1200px`, `min-height: 600px`

Dialogs may be dismissed by:

* Clicking an action Button that is configured to close, cancel, or complete a multi-step workflow occurring in the Dialog
* Pressing the keyboard Esc key
* Clicking the close Tertiary Icon Button on Dismissible Dialogs
* Clicking outside of the Dialog. Doing this will result in any selections the user has made being lost, so it is recommended that the `canOutsideClickClose` prop remain set to `false` (the default setting) in instances where losing entered information would be a significant burden to the user

### Persistent Dialog

Use this variant when the user is unable to dismiss the Dialog without making a selection from one of the action Button(s). Because there is no way for the user to manually dismiss the Dialog, this variant must contain at least one action Button.

Persistent Dialogs are generally used in multi-step workflows where dismissing the Dialog would result in a loss of progress or when there is a need for users to confirm they have read the content on the Dialog before proceeding, such as when they are being directed to an external site (see Dialog Use Cases section below for details).

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

 

---

---

---

### Dismissible Dialog

Use this variant to allow the user the ability to manually dismiss the Dialog by clicking the close Tertiary Icon Button in the Dialog's upper right corner. Dismissing the Dialog will result in any selections the user has made being lost. Dismissible Dialogs should not be used in multi-step workflows where closing the Dialog would result in a loss of progress.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

---

---

---

---

---

### Dialog Spacing

In instances where the length of content contained in the Dialog results in the Dialog filling the entire height of the screen, there must be a minimum of `spaceXxl` margin above and below the Dialog window. The Dialog content scrolls when it exceeds the max-height of the dialog window; title, overline, subtitle, and any action Buttons are anchored to the top and bottom during scrolling.

---

### Dialog Backdrop

A backdrop appears behind the active Dialog to bring emphasis to it as well as indicate to users that they cannot interact with the content on the page behind it.

---

## Dialog Use Cases

Details and guidelines around complex Dialog use cases, such as nested Dialogs and multi-step Dialog workflows.

### Nested Dialogs

Nested Dialogs should only be used in specific scenarios, most notably when a user is being directed to an external site and a final confirmation is needed.

Avoid using nested dialogs when possible because it introduces layers of complexity to pages and may make it more difficult for users to anticipate the results of their actions. It may also impede usability by making it more difficult for users to quickly exit a flow. Instead, explore utilizing a multi-step Dialog workflow (see below).

 

### Multi-step Dialog Workflow

Dialog workflows should contain no more than three steps. Workflows that are more than three steps should be designed as a full-page experience.

For a flow that takes place inside a Dialog, all steps within that workflow should take place within the same size Dialog for a consistent user experience. Each step of the workflow should also be clearly communicated within the Dialog using the overline text.

The Dialog should not be dismissible and the `canOutsideClickClose` prop should be set to `false` to prevent any accidental loss of progress.

## Code

## Dialog Component

| Below you will find an interactive Storybook iframe for Dialogs.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** Dialog |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the CZ GEN EPI codebase, use a theme file to enable the CZ GEN EPI visual appearance customization.

### Dialog

Storybook

---

A Dialog is a window element that appears on top of content to provide information or prompt the user for an action. When a Dialog is active, it disables all functionality of the page below and remains on the screen until it is either dismissed or action has been taken.

## Overview

## Dialog Variants

| The interior of a Dialog can be filled with any content needed, whether that is to communicate information to the user or collect data from them via a form. They come in four different sizes, each of which can optionally include a close Tertiary Icon Button in the top right corner, artwork above the title, and action Button(s) if the Dialog is prompting the user to take an action. In addition to their title, Dialogs can include overline text above the title, a subtitle below the title, or both.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Dialog for any given use case. |   | **Jump to variant:** Persistent Dismissible Use Cases |
| --- | --- | --- |

---

## Dialog

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Dialogs are highly customizable and designed to accommodate a range of product needs; any combination of the following properties can be used:

* Overline text above the title, subtitle text below the title, or both
* Artwork above the title, whether a logo, icon, or illustration

There are four size options, each with a fixed width and minimum height (except for `xs` which has no minimum height):

* `xs` —`width: 400px`
* `s` —`width: 600px`, `min-height: 400px`
* `m` —`width: 900px`, `min-height: 480px`
* `l` —`width: 1200px`, `min-height: 600px`

Dialogs may be dismissed by:

* Clicking an action Button that is configured to close, cancel, or complete a multi-step workflow occurring in the Dialog
* Pressing the keyboard Esc key
* Clicking the close Tertiary Icon Button on Dismissible Dialogs
* Clicking outside of the Dialog. Doing this will result in any selections the user has made being lost, so it is recommended that the `canOutsideClickClose` prop remain set to `false` (the default setting) in instances where losing entered information would be a significant burden to the user

### Persistent Dialog

Use this variant when the user is unable to dismiss the Dialog without making a selection from one of the action Button(s). Because there is no way for the user to manually dismiss the Dialog, this variant must contain at least one action Button.

Persistent Dialogs are generally used in multi-step workflows where dismissing the Dialog would result in a loss of progress or when there is a need for users to confirm they have read the content on the Dialog before proceeding, such as when they are being directed to an external site (see Dialog Use Cases section below for details).

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

 

---

---

---

### Dismissible Dialog

Use this variant to allow the user the ability to manually dismiss the Dialog by clicking the close Tertiary Icon Button in the Dialog's upper right corner. Dismissing the Dialog will result in any selections the user has made being lost. Dismissible Dialogs should not be used in multi-step workflows where closing the Dialog would result in a loss of progress.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

---

---

---

---

---

### Dialog Spacing

In instances where the length of content contained in the Dialog results in the Dialog filling the entire height of the screen, there must be a minimum of `spaceXxl` margin above and below the Dialog window. The Dialog content scrolls when it exceeds the max-height of the dialog window; title, overline, subtitle, and any action Buttons are anchored to the top and bottom during scrolling.

 

---

### Dialog Backdrop

A backdrop appears behind the active Dialog to bring emphasis to it as well as indicate to users that they cannot interact with the content on the page behind it.

---

## Dialog Use Cases

Details and guidelines around complex Dialog use cases, such as nested Dialogs and multi-step Dialog workflows.

### Nested Dialogs

Nested Dialogs should only be used in specific scenarios, most notably when a user is being directed to an external site and a final confirmation is needed.

Avoid using nested dialogs when possible because it introduces layers of complexity to pages and may make it more difficult for users to anticipate the results of their actions. It may also impede usability by making it more difficult for users to quickly exit a flow. Instead, explore utilizing a multi-step Dialog workflow (see below).

 

### Multi-step Dialog Workflow

Dialog workflows should contain no more than three steps. Workflows that are more than three steps should be designed as a full-page experience.

For a flow that takes place inside a Dialog, all steps within that workflow should take place within the same size Dialog for a consistent user experience. Each step of the workflow should also be clearly communicated within the Dialog using the overline text.

The Dialog should not be dismissible and the `canOutsideClickClose` prop should be set to `false` to prevent any accidental loss of progress.

## Code

## Dialog Component

| Below you will find an interactive Storybook iframe for Dialogs.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** Dialog |
| --- | --- | --- |

---

### Dialog

Storybook

 

