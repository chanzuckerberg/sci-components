# Notifications

Notifications appear outside of the flow of the page to highlight information to the user whether in response to an action they have completed or to bring their attention to important details.

## Overview

## Notification Variants

| Notifications come in two different variants for designers to use depending on the type of information they need to display and whether they want the user to have the ability to manually dismiss them or not. All Notification variants can be set to automatically dismiss after a designated period of time (8 seconds by default).  Notifications appear outside of the flow of the page on top of other elements as opposed to Callouts which appear within the page's flow.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Notification for any given use case. |   | **Jump to variant:** Persistent Dismissible Intent Variations |
| --- | --- | --- |

---

## Notification

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ GEN EPI Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Persistent Notification

Use when communicating information that is intended to remain persistent on the screen and is not manually dismissible by the user. It can be set to automatically dismiss after a designated period of time using the `autoDismiss` prop; when set to `true`, the automatic dismissal will occur after 8 milliseconds by default, but can be set to a custom length of time by entering a millisecond value into the prop.

A Minimal Button or Text Link can be added to the Notification if additional action from the user is possible or necessary. Most commonly, a Minimal Button with the label "Dismiss" is included to allow users to close out of the Notification. Text Links take users to pages related to the content on the Notification; for example when a user begins building a new tree, a Notification appears alerting them this work has begun that includes a Text Link that navigates them to the tree page for them to view their newly created tree.

Relevant components such as Tables (documentation coming soon) or Charts (documentation coming soon), or additional text can be included in the content module block as necessary.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

---

---

---

### Dismissible Notification

Use when communicating information that is manually dismissible by the user and does not need to remain persistent on the screen. It can be set to automatically dismiss after a designated period of time using the `autoDismiss` prop; when set to `true`, the automatic dismissal will occur after 8 milliseconds by default, but can be set to a custom length of time by entering a millisecond value into the prop.

A Minimal Button can be added to the Notification if additional action from the user is possible or necessary. Relevant components such as Tables (documentation coming soon) or Charts (documentation coming soon), or additional text can be included in the content module block as necessary.

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

| Below you will find an interactive Storybook iframe for Notifications.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** Notification |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the CZ GEN EPI codebase, use a theme file to enable the CZ GEN EPI visual appearance customization.

### Notification

Storybook

 

---

Notifications appear outside of the flow of the page to highlight information to the user whether in response to an action they have completed or to bring their attention to important details.

## Overview

## Notification Variants

| Notifications come in two different variants for designers to use depending on the type of information they need to display and whether they want the user to have the ability to manually dismiss them or not. All Notification variants can be set to automatically dismiss after a designated period of time (8 seconds by default).  Notifications appear outside of the flow of the page on top of other elements as opposed to Callouts which appear within the page's flow.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Notification for any given use case. |   | **Jump to variant:** Persistent Dismissible Intent Variations |
| --- | --- | --- |

---

## Notification

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Persistent Notification

Use when communicating information that is intended to remain persistent on the screen and is not manually dismissible by the user. It can be set to automatically dismiss after a designated period of time using the `autoDismiss` prop; when set to `true`, the automatic dismissal will occur after 8 milliseconds by default, but can be set to a custom length of time by entering a millisecond value into the prop.

A Minimal Button can be added to the Notification if additional action from the user is possible or necessary. Relevant components such as Tables (documentation coming soon) or Charts (documentation coming soon), or additional text can be included in the content module block as necessary.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

---

---

---

 

### Dismissible Notification

Use when communicating information that is manually dismissible by the user and does not need to remain persistent on the screen. It can be set to automatically dismiss after a designated period of time using the `autoDismiss` prop; when set to `true`, the automatic dismissal will occur after 8 milliseconds by default, but can be set to a custom length of time by entering a millisecond value into the prop.

A Minimal Button can be added to the Notification if additional action from the user is possible or necessary. Relevant components such as Tables (documentation coming soon) or Charts (documentation coming soon), or additional text can be included in the content module block as necessary.

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

| Below you will find an interactive Storybook iframe for Notifications.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** Notification |
| --- | --- | --- |

---

### Notification

Storybook

 

