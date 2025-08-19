---
title: "Search"
id: 7352957
uid: "2659d6"
slug: "2659d6-search"
url: "https://sds.czi.design/009eaf17b/v/latest/p/2659d6-search"
hidden: false
locked: false
created_at: "2025-07-07T20:30:33.796Z"
updated_at: "2025-07-07T20:30:34.087Z"
---

# Search

Search is a flexible way for users to find data of interest or filter down their data by a keyword. This allows users to take action on the available data without the distraction of irrelevant information.

## Overview

## Search Flow Types

CZ GEN EPI only uses the On-page Results flow pattern for adding search or filter functionality. It follows these four basic steps:

1. User types in a keyword
2. Search is initiated
3. Results are displayed
4. User takes action on the result

## On-page Results

Search results are displayed on the current page by filtering down the visible content within the searchable area(s) to show matches only. This search is the most common pattern; it is used both at the component and the page levels.

---

#### **1. User types keyword into Search Input**

It is recommended to position the [Search Input](https://sds.czi.design/009eaf17b/v/0/p/5323b5-field-inputs/t/81abad) at the top level of the content the user will be searching within.

For example, if the search will display results for a single Table (1), position the Search Input at the top of the table (2). 

#### **2A. Search Initiated Automatically (Live Search)**

Otherwise known as "Live Search," as the user types, the app automatically initiates the search with each keystroke or after a specified delay in keystrokes.

This method is recommended in most cases of the On-page Results flow if implementation will allow it. This may not be a feasible solution if the product's search results are paginated.



#### **2B. Search Initiated by User**

Search is initiated when the user clicks a button, hits “enter”, or completes some other user action.

This method is recommended when search results must be fetched from the backend, or when the user needs to set up other specifications before initiating the search. 



#### **3. Results Displayed in Searched Content Area**

Results are displayed by filtering the content in the searchable area (1) so that only search results are visible.

If there are no results, it is recommended that a “No Results” blank state is displayed in the content area instead.

 

**4. User Takes Action on Results**

Depending on the product and the user’s workflow, users may take a number of next actions on the results, possibly including:

* Refine search results (1); re-starts this flow.
* Filter search results (2).
* Sort search results (3).
* Interact with results, like drilling down into a single result, performing actions upon results, etc. (4).

---

### Use Case Examples

Below are links to example use cases where we recommend using an On-page Results flow:

* [Search within a Dropdown Menu](https://sds.czi.design/009eaf17b/v/0/p/2659d6-search/t/278a46)

### Technical Considerations

It is recommended to discuss any search approach under consideration with the engineering team to better understand the technical parameters the product can support.

That being said, for the On-page Results flow, keep in mind that paginated vs infinite scrolling results may have an impact on the search flow options available.

## Example Use Cases

## Example Use Cases

This section will describe search in some use cases currently used across CZI products. These can be used as guidance or inspiration for similar use cases encountered by product teams, but keep in mind that each individual product's needs may be different.

### Searching within a Dropdown Menu

When searching the Menu Items within a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/552539), it is recommended to use the [On-Page Results](https://sds.czi.design/009eaf17b/v/0/p/2659d6-search/t/24026a) flow type. Why? Think of the Dropdown Menu as the “page” and the Menu Items as the content being searched. As the user searches, the content is filtered down without leaving the open Dropdown Menu.

The following behaviors are recommended for displaying search results within a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/552539).

## Other Considerations

## Patterns to Support User Behavior

Below are some example behavior patterns worth considering to help support users in their searching. Evaluate if implementing these will help users’ workflows and if the product can support any technical requirements of implementation.

