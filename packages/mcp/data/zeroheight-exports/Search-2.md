---
title: "Search"
id: 7352998
uid: "244d3b"
slug: "244d3b-search"
url: "https://sds.czi.design/009eaf17b/v/latest/p/244d3b-search"
hidden: false
locked: false
created_at: "2025-07-07T20:30:42.316Z"
updated_at: "2025-07-07T20:30:42.605Z"
---

# Search

Search is a flexible way for users to find data of interest or filter down their data by a keyword. This allows users to take action on the available data without the distraction of irrelevant information.

## Overview

## Search Flow Types

| There are two general flow patterns recommended when considering adding search or filter functionality to products. Both of these follow the same four basic steps:  1. User types in a keyword 2. Search is initiated 3. Results are displayed 4. User takes action on the results Although the general steps followed are universal, the implementation choices made on how each step is accomplished, most notably how the results are displayed, are what differentiate each flow type. |   | **Jump to type:** [On-page Results flow](https://sds.czi.design/009eaf17b/v/0/p/244d3b-search/t/760d3a) [Results Dropdown flow](https://sds.czi.design/009eaf17b/v/0/p/244d3b-search/t/141ba8) |
| --- | --- | --- |

---

### Flow Types

| **On-page Results** |   | **Results Dropdown** |
| --- | --- | --- |

| The content on the page automatically updates to reflect the search result. |   | The results of the search are Menu Items in a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/2157fe) for the user to select from. |
| --- | --- | --- |

---

## On-page Results

Search results are displayed on the current page by filtering down the visible content within the searchable area(s) to show matches only. This search is the most common pattern; it is used both at the component and the page levels.

---

#### **1. User types keyword into Search Input**

It is recommended to position the [Search Input](https://sds.czi.design/009eaf17b/v/0/p/1596f8-field-inputs/t/70a4ba) at the top level of the content the user will be searching within.

For example, if the search will display results in tables across multiple tabs (1), position the Search Input in the header (2).

#### **2. Search Initiated by User**

Search is initiated when the user clicks a button, hits “enter”, or completes some other user action.

This method is recommended when search results must be fetched from the backend, or when the user needs to set up other specifications before initiating the search.



#### **3. Results Displayed in Searched Content Area**

Results are displayed by filtering the content in the searchable area (1) so that only search results are visible.

If there are no results, it is recommended that a “No Results” blank state is displayed in the content area instead.

#### **4. User Takes Action on Results**

Depending on the product and the user’s workflow, users may take a number of next actions on the results, possibly including:

* Refine search results (1); re-starts this flow.
* Filter search results (2).
* Sort search results (3).
* Interact with results, like drilling down into a single result, performing actions upon results, etc. (4).

---

### Use Case Examples

Below are links to example use cases where we recommend using an On-page Results flow:

* [Search within a Dropdown Menu](https://sds.czi.design/009eaf17b/v/0/p/244d3b-search/t/95703d)

### Technical Considerations

It is recommended to discuss any search approach under consideration with the engineering team to better understand the technical parameters the product can support.

That being said, for the On-page Results flow, keep in mind that paginated vs infinite scrolling results may have an impact on the search flow options available.

---

## Results Dropdown

Search results are displayed inside a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/2157fe) that appears below the [Search Input](https://sds.czi.design/009eaf17b/p/700da5-field-inputs/t/156904). The user will remain on the same page until they select a result from the Dropdown Menu.

---

#### **1. User Types Keyword into Search Component**

It is recommended to position the [Search Input](https://sds.czi.design/009eaf17b/p/700da5-field-inputs/t/156904) at the top level of the content the search will apply to.

For example, if the search will display results from across multiple tabs (1), position the Search Input in the header (2).

#### **2. Search Initiated (Live Update)**

As the user types, the app automatically initiates the search with each keystroke.

It is not recommended for user action to initiate search for this flow type.



#### **3. Results Displayed in Dropdown**

Instead of updating the searched content area, results are displayed in a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/2157fe) below the [Search Input](https://sds.czi.design/009eaf17b/p/700da5-field-inputs/t/156904) (1).

If there are no results, it is recommended to display a bank state in the Dropdown Menu instead.

#### **4. User Takes Action on Results**

Depending on the product and the user’s workflow, they may take a number of next actions on the results, possibly including:

* Refine search results (1); re-starts this flow.
* Interact with results, such as drilling down into a single result (2) .
* Initiate a different type of search flow. For example, the user clicks “enter” to filter page by search keyword (3). See [Combining Search Types](https://sds.czi.design/009eaf17b/v/0/p/244d3b-search/t/40dade) section to learn more.

## Example Use Cases

## Example Use Cases

This section will describe search in some use cases currently used across CZI products. These can be used as guidance or inspiration for similar use cases encountered by product teams, but keep in mind that each individual product's needs may be different.

### Searching within a Dropdown Menu

When searching the Menu Items within a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/2157fe), it is recommended to use the [On-Page Results](https://sds.czi.design/009eaf17b/v/0/p/42f8c9-search/t/70a4ba) flow type. Why? Think of the Dropdown Menu as the “page” and the Menu Items as the content being searched. As the user searches, the content is filtered down without leaving the open Dropdown Menu.

The following behaviors are recommended for displaying search results within a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/2157fe).

 

## Other Considerations

| Search is a complex component, and is highly subjective to each product's use case. While it's impossible to support and document every use case, here is a collection of patterns that may be useful to consider when implementing it.  The patterns detailed below have not been developed by the SDS team and are simply examples pulled from products that utilize the SDS components.   **Please consider the information in this section as inspiration only.** |   | **Jump to pattern:** [Combining Search Types](https://sds.czi.design/009eaf17b/v/0/p/244d3b-search/t/40dade) [Supporting User Behavior](https://sds.czi.design/009eaf17b/v/0/p/244d3b-search/t/9761f2) |
| --- | --- | --- |

---

## Combining Search Types

Depending on the use case, there may be a need to combine multiple flow types. How to do this is highly variable depending on each product's workflow, searched content, and user needs. Below are a few examples of combinations the CZI Science products have found useful.

### Results Dropdown + On-page Results Flow

CZ ID combines the [Results Dropdown](https://sds.czi.design/009eaf17b/v/0/p/244d3b-search/t/141ba8) and the [On-page Results](https://sds.czi.design/009eaf17b/v/0/p/42f8c9-search/t/70a4ba) flows. This allows users to jump to a specific result or filter the workspace by the search, depending on their needs.

---

## Patterns to Support User Behavior

Below are some example behavior patterns worth considering to help support users in their searching. Evaluate if implementing these will help users’ workflows and if the product can support any technical requirements of implementation.

