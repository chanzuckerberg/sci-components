---
title: "Control Inputs"
id: 7353022
uid: "727b9c"
slug: "727b9c-control-inputs"
url: "https://sds.czi.design/009eaf17b/v/latest/p/727b9c-control-inputs"
hidden: false
locked: false
created_at: "2025-07-07T20:30:48.233Z"
updated_at: "2025-07-07T20:30:48.642Z"
---

# Control Inputs

Control Inputs are elements that enable users to make selections and communicate choices when presented with various options in the UI.

## Overview

## Control Input Variants

| There is a range of Control Input variants available for designers to use depending on the type of action or response they are needing to elicit from the user. Checkbox and Radio Inputs must always be accompanied by a label that communicates the result of the selection.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Control Input for any given use case. |   | **Jump to variant:** [Checkbox](https://sds.czi.design/009eaf17b/v/0/p/727b9c-control-inputs/t/13bceb) [Radio](https://sds.czi.design/009eaf17b/v/0/p/727b9c-control-inputs/t/411239) [Toggle](https://sds.czi.design/009eaf17b/v/0/p/727b9c-control-inputs/t/77c14e) [Slider](https://sds.czi.design/009eaf17b/v/0/p/727b9c-control-inputs/t/756e41) |
| --- | --- | --- |

### Visual Preview

Use the links below to jump to information on a specific Control Input variant:

---

## Checkbox Input

|  | In Figma |   |  | Meets Accessibility |   |  |  In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Use when the user can select multiple options from a group of choices. Each Checkbox must be coupled with a label (and optional caption) to communicate the result of a selection.

Use `sdsStage: indeterminate` to indicate a mixed selection; reserved for cases where "Select All" is an option as part of a group of checkboxes.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Disabled** |
| --- | --- | --- |

---

---

 

### Checkbox Intent States

Use `intent: default` to communicate that user has yet to enter a response.

Use `intent: error` to communicate when a user has entered an incorrect or incomplete response.

Use `intent: warning` to communicate when a user needs to be alerted that their response needs attention.

| **Default** | **Error** | **Warning** |
| --- | --- | --- |

### Checkbox Lockups

Each Checkbox must be coupled with a label to communicate the result of a selection. If additional details about the selection need to be communicated, an optional caption can be included.

---

### Checkbox Spacing

These rules establish how much margin should exist between and around elements.

---

## Radio Input

|  | In Figma |   |  | Meets Accessibility |   |  |  In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Use when the user can select only one option from a group of choices. Each Radio must be coupled with a label (and optional caption) to communicate the result of a selection.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Disabled** |
| --- | --- | --- |

| **Default** | **Disabled** |
| --- | --- |

### Radio Intent States

Use `intent: default` to communicate that user has yet to enter a response.

Use `intent: error` to communicate when a user has entered an incorrect or incomplete response.

Use `intent: warning` to communicate when a user needs to be alerted that their response needs attention.

| **Default** | **Error** | **Warning** |
| --- | --- | --- |

 

### Radio Lockups

Each Radio must be coupled with a label to communicate the result of a selection. If additional details about the selection need to be communicated, an optional caption can be included.

---

### Radio Spacing

These rules establish how much margin should exist between and around elements.

---

## Toggle

|  | In Figma |   |  | Meets Accessibility |   |  |  In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Use to allow the user to flip a setting or option from off to on and vice versa.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Disabled** |
| --- | --- | --- |

---

---

### Toggle Switch Spacing

These rules establish how much margin should exist between and around elements.

---

## Slider

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Single-sided Slider

Use when there is a specific datapoint or value within a dataset that the user is able to select.

---

### Double-sided Slider

Use when users need the ability to select a range between two values within a dataset.

---

---

### Slider Spacing

These rules establish how much margin should exist between and around elements.

## Code

## Control Input Components

| Below you will find interactive Storybook iframes for each component within the Control Input element group.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [InputCheckbox](https://sds.czi.design/009eaf17b/v/0/p/727b9c-control-inputs/t/40ac29) [InputRadio](https://sds.czi.design/009eaf17b/v/0/p/727b9c-control-inputs/t/96e275) [InputToggle](https://sds.czi.design/009eaf17b/v/0/p/727b9c-control-inputs/t/730907) [InputSlider](https://sds.czi.design/009eaf17b/v/0/p/727b9c-control-inputs/t/64ce8a) |
| --- | --- | --- |

---

### InputCheckbox

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/inputs-inputcheckbox--default)

---

### InputRadio

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/inputs-inputradio--default)

---

### InputToggle

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/inputs-inputtoggle--default)

---

### InputSlider

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/inputs-inputslider--default)

