# Dropdown Inputs

Dropdown Inputs are elements that trigger Dropdown Menus to open, enabling users to make selections and communicate choices in the UI.

## Overview

## Dropdown Input Variants

| There are three Dropdown Input variants available for designers to use depending on the placement location within the UI. Dropdown Inputs are always accompanied by a Dropdown Menu which is triggered by the user clicking on the input.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Dropdown Input for any given use case. |   | **Jump to variant:** Rounded Square Minimal |
| --- | --- | --- |

### Visual Preview

Use the links below to jump to information on a specific Dropdown Input variant:

---

## Rounded Dropdown Input

|  | In Figma |   |  | Meets Accessibility |   |  |  In CZ GEN EPI Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Single-select Rounded Dropdown Input

Use when the user is only able to select one option from a group of choices within the triggered Dropdown Menu.

May be used within CZ GEN EPI for filtering within Tables and datasets.

Using the `details` prop, optional text can be added to the Input to communicate additional information such as providing a sub-label or listing the user's selection.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Default** | **Open** | **Disabled** |
| --- | --- | --- | --- | --- |

| **Default + Details** | **Hover** | **Default** | **Open** | **Disabled** |
| --- | --- | --- | --- | --- |

### Multi-select Rounded Dropdown Input

Use when the user is able to select more than one option from a group of choices within the triggered Dropdown Menu.

May be used within CZ GEN EPI for filtering within Tables and datasets.

Using the `details` prop, an optional counter can be added to the Input to communicate how many selections the user has chosen within the triggered Dropdown Menu.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Default** | **Open** | **Disabled** |
| --- | --- | --- | --- | --- |

| **Default + Details** | **Hover** | **Default** | **Open** | **Disabled** |
| --- | --- | --- | --- | --- |

 

### Rounded Dropdown Input Intent States

The `intent` prop is used to communicate the state of the user's response from the accompanying Dropdown Menu.

Use `intent: default` to communicate when a user has entered an accepted or complete response.

Use `intent: error` to communicate when a user has entered an incorrect or incomplete response.

Use `intent: warning` to communicate when a user needs to be alerted that their response needs attention.

Each intent is demonstrated below using the Single-select Dropdown Input for reference; all variants follow the same pattern:

| **Default** | **Error** | **Warning** |
| --- | --- | --- |

---

### Rounded Dropdown Input Spacing

These rules establish how much margin should exist between and around elements.

---

## Square Dropdown Input

|  | In Figma |   |  | Meets Accessibility |   |  |  In CZ GEN EPI Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Single-select Square Dropdown Input

Use when the user is only able to select one option from a group of choices within the triggered Dropdown Menu.

Used within CZ GEN EPI on forms and Dialogs that contain menu options for users.

Using the `details` prop, optional text can be added to the Input to communicate additional information such as providing a sub-label or listing the user's selection.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Default** | **Open** | **Disabled** |
| --- | --- | --- | --- | --- |

| **Default + Details** | **Hover** | **Default** | **Open** | **Disabled** |
| --- | --- | --- | --- | --- |

### Multi-select Square Dropdown Input

Use when the user is able to select more than one option from a group of choices within the triggered Dropdown Menu.

Used within CZ GEN EPI on forms and Dialogs that contain menu options for users.

Using the `details` prop, optional text can be added to the Input to communicate additional information such as providing a sub-label or listing the user's selection.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Default** | **Open** | **Disabled** |
| --- | --- | --- | --- | --- |

| **Default + Details** | **Hover** | **Default** | **Open** | **Disabled** |
| --- | --- | --- | --- | --- |

### Square Dropdown Input Intent States

The `intent` prop is used to communicate the state of the user's response from the accompanying Dropdown Menu.

Use `intent: default` to communicate when a user has entered an accepted or complete response.

Use `intent: error` to communicate when a user has entered an incorrect or incomplete response.

Use `intent: warning` to communicate when a user needs to be alerted that their response needs attention.

Each intent is demonstrated below using the Single-select Dropdown Input for reference; all variants follow the same pattern:

| **Default** | **Error** | **Warning** |
| --- | --- | --- |

 

---

### Square Dropdown Input Spacing

These rules establish how much margin should exist between and around elements.

---

## Minimal Dropdown Input

|  | In Figma |   |  | Meets Accessibility |   |  |  In CZ GEN EPI Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Use when the user is only able to select one option from a group of choices within the triggered Dropdown Menu.

The Minimal Dropdown Input is typically reserved for use in Filters.

Note: `singleSelect` is the only `sdsType` prop value available for Minimal Dropdown Input.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Default** | **Open** | **Disabled** |
| --- | --- | --- | --- | --- |

### Minimal Dropdown Input Intent States

The `intent` prop is used to communicate the state of the user's response from the accompanying Dropdown Menu.

Use `intent: default` to communicate when a user has entered an accepted or complete response.

| **Default** |   |   |
| --- | --- | --- |

---

### Minimal Dropdown Input Spacing

These rules establish how much margin should exist between and around elements.

 

## Code

## Dropdown Input Component

| Below you will find an interactive Storybook iframe for Dropdown Inputs.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** InputDropdown |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the CZ GEN EPI codebase, use a theme file to enable the CZ GEN EPI visual appearance customization.

### InputDropdown

Storybook

