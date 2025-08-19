---
title: "Tags"
id: 7352929
uid: "66562c"
slug: "66562c-tags"
url: "https://sds.czi.design/009eaf17b/v/latest/p/66562c-tags"
hidden: false
locked: false
created_at: "2025-07-07T20:30:27.567Z"
updated_at: "2025-07-07T20:30:27.875Z"
---

# Tags

Tags are used to help with categorization on plugin pages or in conjunction with filters to indicate which have been applied to the results of a search.

## Overview

| There are two Tag component types—standard Tags and Filter Tags. Tags are used to label the attributes of each plugin, helping users identify relevant plugins to use in their workflows whereas Filter Tags are used in conjunction with the [Filter](https://sds.czi.design/009eaf17b/p/740252) component to indicate which filters have been applied to the list of plugins.  Follow the usage criteria accompanying each variant as a guide for selecting the correct Tag for any given use case. |   | **Jump to variant:** [Tag](https://sds.czi.design/009eaf17b/v/0/p/66562c-tags/t/75ef26) [Filter Tag](https://sds.czi.design/009eaf17b/v/0/p/66562c-tags/t/83d29b) |
| --- | --- | --- |

### Visual Preview

Use the links below to jump to information on a specific Tag:

---

## Tag

|  | In Figma |   |  | Meets Accessibility |   |  | In napari hub + .org Codebases |
| --- | --- | --- | --- | --- | --- | --- | --- |

Tags are used to label the attributes of each plugin; these attributes are able to be filtered on using the [Filter](https://sds.czi.design/009eaf17b/p/740252) component. On the plugin list page, when a given parameter is filtered on, any matching attributes will appear as `active` Tags at the bottom of each plugin card. Additional attributes will continue to be displayed as `inactive` Tags. Users can click on any `inactive` Tag to add it as a Filter parameter.

If the user has clicked into a plugin's detail page while having one or more Filter parameters applied, all applicable Tags within the filtered category will appear at the top of the page with the Filtered parameter(s) appearing as `active` Tags. Additional attributes will continue to be displayed as `inactive` Tags. Users can click on any `inactive` Tag to bring them back to the plugin list page and add that attribute to their list of parameters being filtered on.

The [InfoCircle](https://sds.czi.design/009eaf17b/p/65c15b) icons within each Tag can be hovered over to display a [Tooltip](https://sds.czi.design/009eaf17b/p/156f2a) that will provide a definition of the parameter listed on the Tag.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default (Inactive)** | **Default (Active)** | **Hover** | **Pressed** |
| --- | --- | --- | --- |

---

### Tag Spacing

These rules establish how much margin should exist between and around elements.

---

## Filter Tag

|  | In Figma |   |  | Meets Accessibility |   |  | In napari hub + .org Codebases |
| --- | --- | --- | --- | --- | --- | --- | --- |

On the left-side filter panel on the plugin list page, Filter Tags appear underneath each [Filter](https://sds.czi.design/009eaf17b/p/740252) [Dropdown Input](https://sds.czi.design/009eaf17b/p/25d75a) to communicate that the plugin list is being filtered on the parameter indicated on the Tag. Users can click on the [Xmark](https://sds.czi.design/009eaf17b/p/65c15b) icon on the tag to remove that parameter from the group of filters being applied.

Click on each state below to enter inspect view and get details on its code attributes and any global styles it uses.

| **Default** | **Hover** | **Pressed** |
| --- | --- | --- |

---

### Filter Tag Spacing

These rules establish how much margin should exist between and around elements.

## Code

## Tag Components

| Below you will find interactive Storybook iframes for each component within the Tags element group.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [Tag](https://sds.czi.design/009eaf17b/v/0/p/66562c-tags/t/65568b) [TagFilter](https://sds.czi.design/009eaf17b/v/0/p/66562c-tags/t/5087bf) |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the napari hub or napari.org codebases, use a theme file to enable the napari visual appearance customization.

### Tag

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/tag--default)

---

### TagFilter 

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/tagfilter--default)

