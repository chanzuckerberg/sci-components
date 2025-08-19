---
title: "Field Inputs"
id: 7353028
uid: "700da5"
slug: "700da5-field-inputs"
url: "https://sds.czi.design/009eaf17b/v/latest/p/700da5-field-inputs"
hidden: false
locked: false
created_at: "2025-07-07T20:30:50.274Z"
updated_at: "2025-07-07T20:30:50.540Z"
---

# Field Inputs

Field Inputs are elements that allow users to type within them, providing an area for users to enter content and information or perform a search.

## Overview

## Field Input Variants

| There are two Field Input variants available for designers to use—Search Inputs allow users to enter text to perform a search and Text Inputs provide a free-form space for users to type in information as needed.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Text Input for any given use case. |   | **Jump to variant:** [Rounded Search](https://sds.czi.design/009eaf17b/v/0/p/700da5-field-inputs/t/156904) [Square Search](https://sds.czi.design/009eaf17b/v/0/p/700da5-field-inputs/t/64091c) [Text](https://sds.czi.design/009eaf17b/v/0/p/700da5-field-inputs/t/26099f) |
| --- | --- | --- |

---

## Rounded Search Input

|  | In Figma |   |  | Meets Accessibility |   |  |  In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Used in CZ ID for top-level searches and when searching within Tables.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Focus** | **Disabled** |
| --- | --- | --- | --- |

 

### Rounded Search Input Intent States

The `intent` prop is used to communicate the response state of the user's search inquiry.

Use `intent: default` to communicate when a user has entered an accepted or complete search.

Use `intent: error` to communicate when a user has entered an incorrect or incomplete search.

Use `intent: warning` to communicate when a user needs to be alerted that their search needs attention.

| **Default** | **Error** | **Warning** |
| --- | --- | --- |

---

### Rounded Search Input Spacing

These rules establish how much margin should exist between and around elements.

---

## Square Search Input

|  | In Figma |   |  | Meets Accessibility |   |  |  In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Used in CZ ID for searches constrained to the element the Input is placed within such as [Dropdown Menus](https://sds.czi.design/009eaf17b/p/2157fe) or Forms.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Focus** | **Disabled** |
| --- | --- | --- | --- |

 

### Square Search Input Intent States

The `intent` prop is used to communicate the response state of the user's search inquiry.

Use `intent: default` to communicate when a user has entered an accepted or complete search.

Use `intent: error` to communicate when a user has entered an incorrect or incomplete search.

Use `intent: warning` to communicate when a user needs to be alerted that their search needs attention.

| **Default** | **Error** | **Warning** |
| --- | --- | --- |

---

### Square Search Input Spacing

These rules establish how much margin should exist between and around elements.

---

## Text Input

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Text Field Input

The Text Field Input is meant to fit one line of text and should be only used when there is a limited amount or a single line's worth of content intended for the user to input.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Focus** | **Disabled** |
| --- | --- | --- | --- |

 

### Text Area Input

The Text Area Input is meant to fit multiple lines of text and should be used when there is the potential that the user will want or need to input more than a single line's worth of content.

It includes a handle in the bottom right corner that the user can grab and drag to expand its size.

It can be set to accept a specific number of characters in case there is a need to limit how much content the user can enter.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Focus** | **Disabled** |
| --- | --- | --- | --- |

 

### Text Input Intent States

The `intent` prop is used to communicate the response state of the text the user has input.

Use `intent: default` to communicate when a user has entered an accepted or complete input.

Use `intent: error` to communicate when a user has entered an incorrect or incomplete input.

Use `intent: warning` to communicate when a user needs to be alerted that the content they've input needs attention.

| **Default** | **Error** | **Warning** |
| --- | --- | --- |

---

---

### Text Input Spacing

These rules establish how much margin should exist between and around elements.

## Code

## Field Input Components

| Below you will find an interactive Storybook iframe for Field Inputs.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [InputSearch](https://sds.czi.design/009eaf17b/v/0/p/700da5-field-inputs/t/56bbd1) [InputText](https://sds.czi.design/009eaf17b/v/0/p/700da5-field-inputs/t/54729d) |
| --- | --- | --- |

---

### InputSearch

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/inputs-inputsearch--default)

---

### InputText

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/inputs-inputtext--default)

