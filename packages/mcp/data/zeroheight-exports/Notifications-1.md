---
title: "Notifications"
id: 7353004
uid: "88f500"
slug: "88f500-notifications"
url: "https://sds.czi.design/009eaf17b/v/latest/p/88f500-notifications"
hidden: false
locked: false
created_at: "2025-07-07T20:30:43.386Z"
updated_at: "2025-07-07T20:30:43.572Z"
---

# Notifications

Notifications appear outside of the flow of the page to highlight information to the user whether in response to an action they have completed or to bring their attention to important details.

## Overview

## Notification Variants

| Notifications come in two different variants for designers to use depending on the type of information they need to display and whether they want the user to have the ability to manually dismiss them or not. All Notification variants can be set to automatically dismiss after a designated period of time (8 seconds by default).  Notifications appear outside of the flow of the page on top of other elements as opposed to [Callouts](https://sds.czi.design/009eaf17b/p/04b2c1) which appear within the page's flow.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Notification for any given use case. |   | **Jump to variant:** [Persistent](https://sds.czi.design/009eaf17b/v/0/p/88f500-notifications/t/20560b) [Dismissible](https://sds.czi.design/009eaf17b/v/0/p/88f500-notifications/t/09d2c0) [Intent Variations](https://sds.czi.design/009eaf17b/v/0/p/88f500-notifications/t/831925) |
| --- | --- | --- |

---

## Notification

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Persistent Notification

Use when communicating information that is intended to remain persistent on the screen and is not manually dismissible by the user. It can be set to automatically dismiss after a designated period of time using the `autoDismiss` prop; when set to `true`, the automatic dismissal will occur after 8 milliseconds by default, but can be set to a custom length of time by entering a millisecond value into the prop.

A [Minimal Button](https://sds.czi.design/009eaf17b/v/0/p/6196ff-buttons/t/48c331) can be added to the Notification if additional action from the user is possible or necessary. Relevant components such as Tables (documentation coming soon) or Charts (documentation coming soon), or additional text can be included in the content module block as necessary.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

---

---

---

 

### Dismissible Notification

Use when communicating information that is manually dismissible by the user and does not need to remain persistent on the screen. It can be set to automatically dismiss after a designated period of time using the `autoDismiss` prop; when set to `true`, the automatic dismissal will occur after 8 milliseconds by default, but can be set to a custom length of time by entering a millisecond value into the prop.

A [Minimal Button](https://sds.czi.design/009eaf17b/v/0/p/6196ff-buttons/t/48c331) can be added to the Notification if additional action from the user is possible or necessary. Relevant components such as Tables (documentation coming soon) or Charts (documentation coming soon), or additional text can be included in the content module block as necessary.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

 

---

---

---

---

### Notification Spacing

These rules establish how much margin should exist between and around elements. Because Notifications are positioned in the top-right corner of the UI on top of other elements, the top and right spacing rules below indicate the distance between the component and the edges of the browser window.

---

### Intent Variations

There are four different intents that all Notification variants can communicate—Info, Error, Success, and Warning—indicated with the use of color and iconography and selected using the `intent` prop.

Each intent is demonstrated below using the Persistent Notification for reference. Regardless of variant, the colors and icons used are the same:

| **Error** | **Info** |
| --- | --- |

| **Success** | **Warning** |
| --- | --- |

## Code

## Notification Component

| Below you will find an interactive Storybook iframe for Notifications.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [Notification](https://sds.czi.design/009eaf17b/v/0/p/88f500-notifications/t/11515a) |
| --- | --- | --- |

---

### Notification

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/notification--default&args=intent:info)

 

