# Search

Search is a flexible way for users to find data of interest or filter down their data by a keyword. This allows users to take action on the available data without the distraction of irrelevant information.

## Overview

## Search Flow Types

| There are three general flow patterns recommended when considering adding search or filter functionality to products. Each of these follows the same four basic steps: 1. User types in a keyword 2. Search is initiated 3. Results are displayed 4. User takes action on the results Although the general steps followed are universal, the implementation choices made on how each step is accomplished, most notably how the results are displayed, are what differentiate each flow type. |     | **Jump to flow type:** On-page Results flow Results Page flow |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------------------------------- |

### Flow Types

| **On-page Results** |     | **Results Page** |
| ------------------- | --- | ---------------- |

| The content on the page automatically updates to reflect the search result. |     | The results of the search are displayed on a separate "search results" page. |
| --------------------------------------------------------------------------- | --- | ---------------------------------------------------------------------------- |

---

## On-page Results

Search results are displayed on the current page by filtering down the visible content within the searchable area(s) to show matches only. This search is the most common pattern; it is used both at the component and the page levels.



---

#### 1. User types keyword into Search Input

It is recommended to position your Search Input at the top level of the content the user will be searching.

For example, if the search will display results for a list of plugins (1), position the Search Input at the top of the list (2).

#### **2. Search Initiated by User**

Search is initiated when the user clicks a button, hits “enter”, or completes some other user action.

This method is recommended when search results must be fetched from the backend, or when the user needs to set up other specifications before initiating the search.



#### **3.** Results Displayed in Searched Content Area

Results are displayed by filtering the content in the searchable area (1) so that only search results are visible.

If there are no results, it is recommended that a “No Results” blank state is displayed in the content area instead.

#### 4. User Takes Action on Results

Depending on the product and the user’s workflow, users may take a number of next actions on the results, possibly including:

- Refine search results (1); re-starts this flow.
- Sort search results (2).
- Filter search results (3).
- Interact with results, such as selecting a single result (4).

---

### Use Case Examples

Below are links to example use cases where we recommend using an On-page Results flow:

- Search within a Dropdown Menu

### Technical Considerations

It is recommended to discuss any search approach under consideration with the engineering team to better understand the technical parameters the product can support.

That being said, for the On-page Results flow, keep in mind:

- This approach is impacted by whether the search is done on the frontend or the backend. If search is slow and has to be done on the backend, consider using the Results Page flow type instead.
- Paginated vs infinite scrolling results may have an impact on the search flow options available.

---

## Results Page

Search results are displayed on a different page than where the search was originally initiated. Depending on the use case, this may be a unique “Results” page, or an existing page where the data is usually located. The Results Page flow is often combined with the On-page Results flow. Learn more about Combining Search Types.



---

#### 1. User Types Keyword into Search Component

It is recommended to position Search Inputs at the top level of the content the search will apply to.

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

- Refine search results (1). It is recommended to use the On-Page Results flow type; see Combining Flow Types.
- Interact with results, like drilling down into a single result (2) .
- Filter or Sort Results.



---

### Technical Considerations

It is recommended to discuss any search approach under consideration with the engineering team to better understand the technical parameters the product can support.

That being said, for the Results Page flow type, keep in mind that this approach has the best performance when the search is performed on the backend.

## Example Use Cases

## Example Use Cases

This section will describe search in some use cases currently used across CZI products. These can be used as guidance or inspiration for similar use cases encountered by product teams, but keep in mind that each individual product's needs may be different.

### Searching within a Dropdown Menu

When searching the Menu Items within a Dropdown Menu, it is recommended to use the On-Page Results flow type. Why? Think of the Dropdown Menu as the “page” and the Menu Items as the content being searched. As the user searches, the content is filtered down without leaving the open Dropdown Menu.

The following behaviors are recommended for displaying search results within a Dropdown Menu.

## Other Considerations

| Search is a complex component, and is highly subjective to each product's use case. While it's impossible to support and document every use case, here is a collection of patterns that may be useful to consider when implementing it. The patterns detailed below have not been developed by the SDS team and are simply examples pulled from products that utilize the SDS components. |     | **Jump to pattern:** Combining Search Types Supporting User Behavior |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | -------------------------------------------------------------------- |

---

## Combining Search Types

Depending on the use case, there may be a need to combine multiple flow types. How to do this is highly variable depending on each product's workflow, searched content, and user needs. Below are a few examples of combinations the CZI Science products have found useful.

### Results Page + On-page Results Flow

In most use cases for the Results Page flow, it can be beneficial to provide users with a way to modify their search results by implementing the On-page Results flow within a Results Page design.

---

## Patterns to Support User Behavior

Below are some example behavior patterns worth considering to help support users in their searching. Evaluate if implementing these will help users’ workflows and if the product can support any technical requirements of implementation.

---

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

It is recommended to position the Search Input at the top level of the content the user will be searching within.

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

- Refine search results (1); re-starts this flow.
- Filter search results (2).
- Sort search results (3).
- Interact with results, like drilling down into a single result, performing actions upon results, etc. (4).

---

### Use Case Examples

Below are links to example use cases where we recommend using an On-page Results flow:

- Search within a Dropdown Menu

### Technical Considerations

It is recommended to discuss any search approach under consideration with the engineering team to better understand the technical parameters the product can support.

That being said, for the On-page Results flow, keep in mind that paginated vs infinite scrolling results may have an impact on the search flow options available.

## Example Use Cases

## Example Use Cases

This section will describe search in some use cases currently used across CZI products. These can be used as guidance or inspiration for similar use cases encountered by product teams, but keep in mind that each individual product's needs may be different.

### Searching within a Dropdown Menu

When searching the Menu Items within a Dropdown Menu, it is recommended to use the On-Page Results flow type. Why? Think of the Dropdown Menu as the “page” and the Menu Items as the content being searched. As the user searches, the content is filtered down without leaving the open Dropdown Menu.

The following behaviors are recommended for displaying search results within a Dropdown Menu.

## Other Considerations

## Patterns to Support User Behavior

Below are some example behavior patterns worth considering to help support users in their searching. Evaluate if implementing these will help users’ workflows and if the product can support any technical requirements of implementation.

---

Search is a flexible way for users to find data of interest or filter down their data by a keyword. This allows users to take action on the available data without the distraction of irrelevant information.

## Overview

## Search Flow Types

| There are two general flow patterns recommended when considering adding search or filter functionality to products. Both of these follow the same four basic steps: 1. User types in a keyword 2. Search is initiated 3. Results are displayed 4. User takes action on the results Although the general steps followed are universal, the implementation choices made on how each step is accomplished, most notably how the results are displayed, are what differentiate each flow type. |     | **Jump to type:** On-page Results flow Results Dropdown flow |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | ------------------------------------------------------------ |

---

### Flow Types

| **On-page Results** |     | **Results Dropdown** |
| ------------------- | --- | -------------------- |

| The content on the page automatically updates to reflect the search result. |     | The results of the search are Menu Items in a Dropdown Menu for the user to select from. |
| --------------------------------------------------------------------------- | --- | ---------------------------------------------------------------------------------------- |

---

## On-page Results

Search results are displayed on the current page by filtering down the visible content within the searchable area(s) to show matches only. This search is the most common pattern; it is used both at the component and the page levels.

---

#### **1. User types keyword into Search Input**

It is recommended to position the Search Input at the top level of the content the user will be searching within.

For example, if the search will display results in tables across multiple tabs (1), position the Search Input in the header (2).

#### **2. Search Initiated by User**

Search is initiated when the user clicks a button, hits “enter”, or completes some other user action.

This method is recommended when search results must be fetched from the backend, or when the user needs to set up other specifications before initiating the search.

#### **3. Results Displayed in Searched Content Area**

Results are displayed by filtering the content in the searchable area (1) so that only search results are visible.

If there are no results, it is recommended that a “No Results” blank state is displayed in the content area instead.

#### **4. User Takes Action on Results**

Depending on the product and the user’s workflow, users may take a number of next actions on the results, possibly including:

- Refine search results (1); re-starts this flow.
- Filter search results (2).
- Sort search results (3).
- Interact with results, like drilling down into a single result, performing actions upon results, etc. (4).

---

### Use Case Examples

Below are links to example use cases where we recommend using an On-page Results flow:

- Search within a Dropdown Menu

### Technical Considerations

It is recommended to discuss any search approach under consideration with the engineering team to better understand the technical parameters the product can support.

That being said, for the On-page Results flow, keep in mind that paginated vs infinite scrolling results may have an impact on the search flow options available.

---

## Results Dropdown

Search results are displayed inside a Dropdown Menu that appears below the Search Input. The user will remain on the same page until they select a result from the Dropdown Menu.

---

#### **1. User Types Keyword into Search Component**

It is recommended to position the Search Input at the top level of the content the search will apply to.

For example, if the search will display results from across multiple tabs (1), position the Search Input in the header (2).

#### **2. Search Initiated (Live Update)**

As the user types, the app automatically initiates the search with each keystroke.

It is not recommended for user action to initiate search for this flow type.

#### **3. Results Displayed in Dropdown**

Instead of updating the searched content area, results are displayed in a Dropdown Menu below the Search Input (1).

If there are no results, it is recommended to display a bank state in the Dropdown Menu instead.

#### **4. User Takes Action on Results**

Depending on the product and the user’s workflow, they may take a number of next actions on the results, possibly including:

- Refine search results (1); re-starts this flow.
- Interact with results, such as drilling down into a single result (2) .
- Initiate a different type of search flow. For example, the user clicks “enter” to filter page by search keyword (3). See Combining Search Types section to learn more.

## Example Use Cases

## Example Use Cases

This section will describe search in some use cases currently used across CZI products. These can be used as guidance or inspiration for similar use cases encountered by product teams, but keep in mind that each individual product's needs may be different.

### Searching within a Dropdown Menu

When searching the Menu Items within a Dropdown Menu, it is recommended to use the On-Page Results flow type. Why? Think of the Dropdown Menu as the “page” and the Menu Items as the content being searched. As the user searches, the content is filtered down without leaving the open Dropdown Menu.

The following behaviors are recommended for displaying search results within a Dropdown Menu.



## Other Considerations

| Search is a complex component, and is highly subjective to each product's use case. While it's impossible to support and document every use case, here is a collection of patterns that may be useful to consider when implementing it. The patterns detailed below have not been developed by the SDS team and are simply examples pulled from products that utilize the SDS components. **Please consider the information in this section as inspiration only.** |     | **Jump to pattern:** Combining Search Types Supporting User Behavior |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | -------------------------------------------------------------------- |

---

## Combining Search Types

Depending on the use case, there may be a need to combine multiple flow types. How to do this is highly variable depending on each product's workflow, searched content, and user needs. Below are a few examples of combinations the CZI Science products have found useful.

### Results Dropdown + On-page Results Flow

CZ ID combines the Results Dropdown and the On-page Results flows. This allows users to jump to a specific result or filter the workspace by the search, depending on their needs.

---

## Patterns to Support User Behavior

Below are some example behavior patterns worth considering to help support users in their searching. Evaluate if implementing these will help users’ workflows and if the product can support any technical requirements of implementation.

---

Search is a flexible way for users to find data of interest or filter down their data by a keyword. This allows users to take action on the available data without the distraction of irrelevant information.

## Guidelines

## Search Flow Types

| There are three general flow patterns recommended when considering adding search or filter functionality to products. Each of these follows the same four basic steps: 1. User types in a keyword 2. Search is initiated 3. Results are displayed 4. User takes action on the results Although the general steps followed are universal, the implementation choices made on how each step is accomplished, most notably how the results are displayed, are what differentiate each flow type. |     | **Jump to flow type:** On-page Results flow Results Dropdown flow Results Page flow |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------------------------------------------------------- |

### Flow Types

| **On-page Results** | **Results Dropdown** | **Results Page** |
| ------------------- | -------------------- | ---------------- |

| The content on the page automatically updates to reflect the search result. | The results of the search are Menu Items in a Dropdown Menu for the user to select from. | The results of the search are displayed on a separate "search results" page. |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |

---

## On-page Results

Search results are displayed on the current page by filtering down the visible content within the searchable area(s) to show matches only. This search is the most common pattern; it is used both at the component and the page levels.

### Example from CZ GEN EPI

The example flow below uses CZ GEN EPI to show the on-page refresh of content that occurs when using the On-page Results flow.

---

#### 1. User types keyword into Search Input

It is recommended to position the Search Input at the top level of the content the user will be searching within.

For example, if the search will display results for a single Table (1), position the Search Input at the top of the table (2).

#### 2A. Search Initiated Automatically (Live Search)

Otherwise known as "Live Search," as the user types, the app automatically initiates the search with each keystroke or after a specified delay in keystrokes.

This method is recommended in most cases of the On-page Results flow if implementation will allow it. This may not be a feasible solution if the product's search results are paginated.

#### **2B. Search Initiated by User**

Search is initiated when the user clicks a button, hits “enter”, or completes some other user action.

This method is recommended when search results must be fetched from the backend, or when the user needs to set up other specifications before initiating the search.

#### **3.** Results Displayed in Searched Content Area

Results are displayed by filtering the content in the searchable area (1) so that only search results are visible.

If there are no results, it is recommended that a “No Results” blank state is displayed in the content area instead.

#### 4. User Takes Action on Results

Depending on the product and the user’s workflow, users may take a number of next actions on the results, possibly including:

- Refine search results (1); re-starts this flow.
- Filter search results (2).
- Sort search results (3).
- Interact with results, like drilling down into a single result, performing actions upon results, etc. (4).

---

### Use Case Examples

Below are links to example use cases where we recommend using an On-page Results flow:

- Search within a Dropdown Menu

### Technical Considerations

It is recommended to discuss any search approach under consideration with the engineering team to better understand the technical parameters the product can support.

That being said, for the On-page Results flow, keep in mind:

- This approach is impacted by whether the search is done on the frontend or the backend. If search is slow and has to be done on the backend, consider using User-initiated Search (Step 2B) or the Results Page flow type instead.
- Paginated vs infinite scrolling results may have an impact on the search flow options available.

---

## Results Dropdown

Search results are displayed inside a Dropdown Menu that appears below the Search Input. The user will remain on the same page until they select a result from the Dropdown Menu.

### Example from CZ ID

The example flow below uses CZ ID to show the contents of a Dropdown Menu filtering down to include only the Menu Items that match the keyword entered into the Search Input.

---

#### 1. User Types Keyword into Search Component

It is recommended to position the Search Input at the top level of the content the search will apply to.

For example, if the search will display results from across multiple tabs (1), position the Search Input in the header (2).

#### 2. Search Initiated (Live Update)

As the user types, the app automatically initiates the search with each keystroke.

It is not recommended for user action to initiate search for this flow type.

#### 3. Results Displayed in Dropdown

Instead of updating the searched content area, results are displayed in a Dropdown Menu below the Search Input (1).

If there are no results, it is recommended to display a bank state in the Dropdown Menu instead.

#### 4. User Takes Action on Results

Depending on the product and the user’s workflow, they may take a number of next actions on the results, possibly including:

- Refine search results (1); re-starts this flow.
- Interact with results, such as drilling down into a single result (2) .
- Initiate a different type of search flow. For example, the user clicks “enter” to filter page by search keyword (3). See Combining Search Types section to learn more.

---

## Results Page

Search results are displayed on a different page than where the search was originally initiated. Depending on the use case, this may be a unique “Results” page, or an existing page where the data is usually located. The Results Page flow is often combined with the On-page Results flow. Learn more about Combining Flow Types.

### Example from napari.org

The example flow below uses napari.org to show the usage of a Results Page to display the outcome of a search.

---

#### 1. User Types Keyword into Search Component

It is recommended to position Search Inputs at the top level of the content the search will apply to.

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

- Refine search results (1). It is recommended to use the On-Page Results flow type; see Combining Flow Types.
- Interact with results, like drilling down into a single result (2) .
- Filter or Sort Results.

---

### Technical Considerations

It is recommended to discuss any search approach under consideration with the engineering team to better understand the technical parameters the product can support.

That being said, for the Results Page flow type, keep in mind that this approach has the best performance when the search is performed on the backend.

## Example Use Cases

## Example Use Cases

This section will describe search in some use cases currently used across CZI products. These can be used as guidance or inspiration for similar use cases encountered by product teams, but keep in mind that each individual product's needs may be different.

### Searching within a Dropdown Menu

When searching the Menu Items within a Dropdown Menu, it is recommended to use the On-Page Results flow type. Why? Think of the Dropdown Menu as the “page” and the Menu Items as the content being searched. As the user searches, the content is filtered down without leaving the open Dropdown Menu.

The following behaviors are recommended for displaying search results within a Dropdown Menu.

## Other Considerations

| Search is a complex component, and is highly subjective to each product's use case. While it's impossible to support and document every use case, here is a collection of patterns that may be useful to consider when implementing it. The patterns detailed below have not been developed by the SDS team and are simply examples pulled from products that utilize the SDS components. **Please consider the information in this section as inspiration only.** |     | **Jump to pattern:** Combining Search Types Supporting User Behavior |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | -------------------------------------------------------------------- |

---

## Combining Search Types

Depending on the use case, there may be a need to combine multiple flow types. How to do this is highly variable depending on each product's workflow, searched content, and user needs. Below are a few examples of combinations the CZI Science products have found useful.

### Results Page + On-page Results Flow

In most use cases for the Results Page flow, it can be beneficial to provide users with a way to modify their search results by implementing the On-page Results flow within a Results Page design.

### Results Dropdown + On-page Results Flow

CZ ID combines the Results Dropdown and the On-page Results flows. This allows users to jump to a specific result or filter the workspace by the search, depending on their needs.

---

## Patterns to Support User Behavior

Below are some example behavior patterns worth considering to help support users in their searching. Evaluate if implementing these will help users’ workflows and if the product can support any technical requirements of implementation.
