---
title: "Search"
id: 7352921
uid: "90178b"
slug: "90178b-search"
url: "https://sds.czi.design/009eaf17b/v/latest/p/90178b-search"
hidden: false
locked: false
created_at: "2025-07-07T20:30:25.107Z"
updated_at: "2025-07-07T20:30:26.188Z"
---

# Search

Search is a flexible way for users to find data of interest or filter down their data by a keyword. This allows users to take action on the available data without the distraction of irrelevant information.

## Overview

## Search Flow Types

| There are three general flow patterns recommended when considering adding search or filter functionality to products. Each of these follows the same four basic steps:  1. User types in a keyword 2. Search is initiated 3. Results are displayed 4. User takes action on the results Although the general steps followed are universal, the implementation choices made on how each step is accomplished, most notably how the results are displayed, are what differentiate each flow type. |   | **Jump to flow type:** [On-page Results flow](https://sds.czi.design/009eaf17b/v/0/p/42f8c9-search/t/70a4ba) [Results Page flow](https://sds.czi.design/009eaf17b/v/0/p/42f8c9-search/t/97c339) |
| --- | --- | --- |

### Flow Types

| **On-page Results** |   | **Results Page** |
| --- | --- | --- |

| The content on the page automatically updates to reflect the search result. |   | The results of the search are displayed on a separate "search results" page. |
| --- | --- | --- |

---

## On-page Results

Search results are displayed on the current page by filtering down the visible content within the searchable area(s) to show matches only. This search is the most common pattern; it is used both at the component and the page levels.

 

---

#### 1. User types keyword into Search Input

It is recommended to position your [Search Input](https://sds.czi.design/009eaf17b/p/25d43a) at the top level of the content the user will be searching. 

For example, if the search will display results for a list of plugins (1), position the Search Input at the top of the list (2). 

#### **2. Search Initiated by User**

Search is initiated when the user clicks a button, hits “enter”, or completes some other user action. 

This method is recommended when search results must be fetched from the backend, or when the user needs to set up other specifications before initiating the search.  

 



#### **3.** Results Displayed in Searched Content Area

Results are displayed by filtering the content in the searchable area (1) so that only search results are visible.

If there are no results, it is recommended that a “No Results” blank state is displayed in the content area instead.

#### 4. User Takes Action on Results

Depending on the product and the user’s workflow, users may take a number of next actions on the results, possibly including:

* Refine search results (1); re-starts this flow.
* Sort search results (2).
* Filter search results (3).
* Interact with results, such as selecting a single result (4).

---

### Use Case Examples

Below are links to example use cases where we recommend using an On-page Results flow:

* [Search within a Dropdown Menu](https://sds.czi.design/009eaf17b/v/0/p/90178b-search/t/402fea)

### Technical Considerations

It is recommended to discuss any search approach under consideration with the engineering team to better understand the technical parameters the product can support.

That being said, for the On-page Results flow, keep in mind:

* This approach is impacted by whether the search is done on the frontend or the backend. If search is slow and has to be done on the backend, consider using the [Results Page](https://sds.czi.design/009eaf17b/v/0/p/90178b-search/t/201bfb) flow type instead.
* Paginated vs infinite scrolling results may have an impact on the search flow options available.

---

## Results Page

Search results are displayed on a different page than where the search was originally initiated. Depending on the use case, this may be a unique “Results” page, or an existing page where the data is usually located. The Results Page flow is often combined with the On-page Results flow. Learn more about [Combining Search Types](https://sds.czi.design/009eaf17b/v/0/p/90178b-search/t/7842aa).

 

---

#### 1. User Types Keyword into Search Component

It is recommended to position [Search Inputs](https://sds.czi.design/009eaf17b/p/25d43a) at the top level of the content the search will apply to.

For example, if the search will display results from across the whole site (1), position the Search Input in a top-level navigation or outside of the page content hierarchy (2).

 

#### 2. **Search Initiated by User**

Search is initiated when the user clicks a button (1), hits “enter” (2), or some other user action.

Because results will be displayed on a new page, Live Search is not recommended.

 

#### 3. Results Displayed on the Results page

After the user initiates the search, they are automatically directed to a results page.

The results page format depends on the product's use case and content. In the example shown, the results page is a unique page that lists search results for pages across the entire website.

If there are no results, it is recommended to display a bank state on the results page.

 

#### 4. User Takes Action on Results

Depending on the product and the user’s workflow, they may take a number of next actions on the results, possibly including:

* Refine search results (1). It is recommended to use the [On-Page Results](https://sds.czi.design/009eaf17b/v/0/p/90178b-search/t/948779) flow type; see [Combining Flow Types](https://sds.czi.design/009eaf17b/v/0/p/90178b-search/t/7842aa).
* Interact with results, like drilling down into a single result (2) .
* Filter or Sort Results.

 

---

### Technical Considerations

It is recommended to discuss any search approach under consideration with the engineering team to better understand the technical parameters the product can support.

That being said, for the Results Page flow type, keep in mind that this approach has the best performance when the search is performed on the backend. 

## Example Use Cases

## Example Use Cases

This section will describe search in some use cases currently used across CZI products. These can be used as guidance or inspiration for similar use cases encountered by product teams, but keep in mind that each individual product's needs may be different.

### Searching within a Dropdown Menu

When searching the Menu Items within a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/95546f), it is recommended to use the [On-Page Results](https://sds.czi.design/009eaf17b/v/0/p/90178b-search/t/948779) flow type. Why? Think of the Dropdown Menu as the “page” and the Menu Items as the content being searched. As the user searches, the content is filtered down without leaving the open Dropdown Menu.

The following behaviors are recommended for displaying search results within a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/95546f).

## Other Considerations

| Search is a complex component, and is highly subjective to each product's use case. While it's impossible to support and document every use case, here is a collection of patterns that may be useful to consider when implementing it.  The patterns detailed below have not been developed by the SDS team and are simply examples pulled from products that utilize the SDS components. |   | **Jump to pattern:** [Combining Search Types](https://sds.czi.design/009eaf17b/v/0/p/90178b-search/t/7842aa) [Supporting User Behavior](https://sds.czi.design/009eaf17b/v/0/p/90178b-search/t/5922be) |
| --- | --- | --- |

---

## Combining Search Types

Depending on the use case, there may be a need to combine multiple flow types. How to do this is highly variable depending on each product's workflow, searched content, and user needs. Below are a few examples of combinations the CZI Science products have found useful.

### Results Page + On-page Results Flow

In most use cases for the Results Page flow, it can be beneficial to provide users with a way to modify their search results by implementing the [On-page Results flow](https://sds.czi.design/009eaf17b/v/0/p/90178b-search/t/948779) within a [Results Page](https://sds.czi.design/009eaf17b/v/0/p/90178b-search/t/201bfb) design.

---

## Patterns to Support User Behavior

Below are some example behavior patterns worth considering to help support users in their searching. Evaluate if implementing these will help users’ workflows and if the product can support any technical requirements of implementation.

