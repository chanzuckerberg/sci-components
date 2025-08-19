---
title: "Callouts"
id: 7352964
uid: "07e099"
slug: "07e099-callouts"
url: "https://sds.czi.design/009eaf17b/v/latest/p/07e099-callouts"
hidden: false
locked: false
created_at: "2025-07-07T20:30:35.025Z"
updated_at: "2025-07-07T20:30:35.191Z"
---

# Callouts

Callouts are used within the flow of the page to highlight information to the user whether in response to an action they have completed or to bring their attention to important details.

## Overview

## Callout Variants

| Callouts come in three different variants for designers to use depending on the type of information they need to display and whether they want the user to have the ability to manually dismiss them or not. All Callout variants can be set to automatically dismiss after a designated period of time (8 seconds by default).  Callouts appear within the flow of the page as opposed to [Notifications](https://sds.czi.design/009eaf17b/p/43725d) which appear outside of the page's flow on top of other elements. They span the full width of the `<div>` they are placed within.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Callout for any given use case. |   | **Jump to variant:** [Persistent](https://sds.czi.design/009eaf17b/v/0/p/07e099-callouts/t/79ce5c) [Dismissible](https://sds.czi.design/009eaf17b/v/0/p/07e099-callouts/t/260fdc) [Expandable](https://sds.czi.design/009eaf17b/v/0/p/07e099-callouts/t/1044a1) [Intent Variations](https://sds.czi.design/009eaf17b/v/0/p/07e099-callouts/t/81215d) |
| --- | --- | --- |

---

## Callout

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ GEN EPI Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Persistent Callout

Use when communicating information that is intended to remain persistent on the screen and is not manually dismissible by the user. It can be set to automatically dismiss after a designated period of time using the `autoDismiss` prop; when set to `true`, the automatic dismissal will occur after 8 milliseconds by default, but can be set to a custom length of time by entering a millisecond value into the prop.

Used in CZ GEN EPI to display warnings, errors, and supplemental information to users in reaction to actions they have taken in a flow.

An additional block of text can be added in addition to the Callout's title if more space is needed to communicate the Callout's message.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

 

---

### Dismissible Callout

Use when communicating information that is manually dismissible by the user and does not need to remain persistent on the screen. It can be set to automatically dismiss after a designated period of time using the `autoDismiss` prop; when set to `true`, the automatic dismissal will occur after 8 milliseconds by default, but can be set to a custom length of time by entering a millisecond value into the prop.

Used in CZ GEN EPI to highlight helpful information to users when viewing a page; typically placed at the top of the page.

An additional block of text can be added in addition to the Callout's title if more space is needed to communicate the Callout's message.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

---

### Expandable Callout

Use when communicating a lengthy amount of information, most of which is hidden by default within an accordion. This Callout variant is intended to remain persistent on the screen and is not manually dismissible by the user. It can be set to automatically dismiss after a designated period of time using the `autoDismiss` prop; when set to `true`, the automatic dismissal will occur after 8 milliseconds by default, but can be set to a custom length of time by entering a millisecond value into the prop.

An additional block of text can be added in addition to the Callout's title if more space is needed to communicate the Callout's message.

Additional content, whether more text or relevant components, can be included in the content module block within the accordion.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

 

---

---

---

### Callout Spacing

These rules establish how much margin should exist between and around elements.

---

### Intent Variations

There are four different intents that all Callout variants can communicate—Info, Error, Success, and Warning—indicated with the use of color and iconography and selected using the `intent` prop.

Each intent is demonstrated below using the Persistent Callout for reference. Regardless of variant, the colors and icons used are the same:

| **Error** | **Info** |
| --- | --- |

| **Success** | **Warning** |
| --- | --- |

## Code

## Callout Component

| Below you will find an interactive Storybook iframe for Callouts.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [Callout](https://sds.czi.design/009eaf17b/v/0/p/07e099-callouts/t/37c06b) |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the CZ GEN EPI codebase, use a theme file to enable the CZ GEN EPI visual appearance customization.

### Callout

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/callout--default)

 

