---
title: "Intent"
id: 7353064
uid: "88e8a7"
slug: "88e8a7-intent"
url: "https://sds.czi.design/009eaf17b/v/latest/p/88e8a7-intent"
hidden: false
locked: false
created_at: "2025-07-07T20:30:57.459Z"
updated_at: "2025-07-07T20:30:57.536Z"
---

# Intent

Intent components provide additional context to users communicating as to why a negative, notice, or positive intent may have been triggered.

## Guidelines

## Overview

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

Intent Messages can be paired with any Input component ([Checkbox](https://sds.czi.design/009eaf17b/v/0/p/548a3d-control-inputs/t/page-548a3d-79060787-161363-5), [Radio](https://sds.czi.design/009eaf17b/v/0/p/548a3d-control-inputs/t/page-548a3d-79065161-161363-40), [Text Input](https://sds.czi.design/009eaf17b/v/0/p/1596f8-field-inputs/t/page-1596f8-79142466-5456ee-41), [Search Input](https://sds.czi.design/009eaf17b/v/0/p/1596f8-field-inputs/t/page-1596f8-79141518-5456ee-6), [Dropdown](https://sds.czi.design/009eaf17b/p/1004b1)[ Input](https://sds.czi.design/009eaf17b/p/1004b1)) to communicate statuses or issues with user-supplied responses. There are three intents that Intent Message can display—negative, notice, and positive. Each Intent type has a default icon that accompanies it, though these defaults can be swapped out for any icon desired.

Intent messages can be stacked, e.g., different message types can be combined meaning, for example, a user’s response to an input could theoretically have both negative and notice messages accompanying it.

Input Message is not a standalone component within Figma, but is instead built into each Input component individually. Each Input component has a `show intentMessage` prop that toggles visibility of the message(s) on or off.

Optionally, an Intent Indicator can be displayed to the left of an Input. When enabled, a colored border will appear to help increase visibility of Intent Messages within that group, making it easier for users to see when a response requires their attention. This is especially useful in long forms where users might have to skim through many pages to find the responses they need to update or fix.

The Intent Indicator is a standalone component within Figma. It has an empty slot within it that is meant to be filled with the Input component  designers want the Intent Indicator displayed alongside (or group of components in the case of Checkboxes or Radios where multiple are likely combined under one field label to present a range of options for responses to users).

#### Intent Message

As mentioned above, Intent Message is not a standalone component within Figma, but is instead built into each Input component individually. If needed multiple Intent Message types can be stacked to communicate more than one intent per Input.

The example below shows Intent Message displayed in conjunction with [Text Input](https://sds.czi.design/009eaf17b/v/0/p/1596f8-field-inputs/t/page-1596f8-79142466-5456ee-41) for reference. See the documentation for each Input component for examples specific to that Input type.

| Negative | Negative + Notice | Notice | Notice + Positive | Positive |
| --- | --- | --- | --- | --- |

#### Intent Indicator

The example below shows Intent Indicator displayed in conjunction with a range of Input types for reference. See the documentation for each Input component for examples specific to that Input type.

| Empty (Negative) | Negative | Notice | Positive |
| --- | --- | --- | --- |

---

### Intent Spacing

These rules establish how much margin should exist between and around elements.

## Code

>**Note:** Code details coming soon

