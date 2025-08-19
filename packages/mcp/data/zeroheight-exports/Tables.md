# Tables

Tables are used to store and visually organize data and other content into a series of cells grouped into a collection of rows and columns, helping users better understand and analyze a given set of information.

## Overview

## Table elements

| Tables are made up of a Table Header with as many Table Rows stacked below it as needed. Table Headers contain multiple Header Cells which serve as top-level indicators for the type of content found in the column of cells below each. Similarly, Table Rows are comprised of Basic Cells which contain the bulk of the data within a Table.  Follow the usage criteria accompanying each variant as a guide for building a Table for any use case. |   | **Jump to element:** Table Anatomy Basic Cell Header Cell Table Row Table Header |
| --- | --- | --- |

---

## Table Anatomy

---

## Basic Cell

|  | In Figma |   |  | Meets Accessibility |   |  | In napari hub + .org Codebases |
| --- | --- | --- | --- | --- | --- | --- | --- |

The Basic Cell is the most common cell type comprising a Table. It is intended to be filled with strings of text or numerical values.

Use the `horizontalAlign` and `verticalAlign` props to control how the content within the cell is positioned. To follow Table best practices, when displaying strings of text, set the `horizontalAlign` prop to `left`, when displaying numerical values, set the `horizontalAlign` prop to `right`.

Click on each variant below to enter inspect view and get details on its code attributes and any global styles it uses.

**Note:** Dotted lines around the cells below are only for demonstration purposes to show the cells' containers; in application, individual cells have no borders.

---

---

### Basic Cell Spacing

These rules establish how much margin should exist between and around elements. Multiple Basic Cells are placed beside each other to create a Table Row. Stack Table Rows below a Table Header to create a full Table.

 

---

## Header Cell

|  | In Figma |   |  | Meets Accessibility |   |  | In napari hub + .org Codebases |
| --- | --- | --- | --- | --- | --- | --- | --- |

Header Cells are placed at the top of Table columns and serve as the header or indicator of the content found in the cells below it.

Use the `horizontalAlign` prop to control how the content within the cell is positioned. The Header Cell's text position should match the horizontal alignment of the content cells below it. For content cells with centered-aligned content, set the Header Cell to `horizontalAlign: left`. Header Cells' vertical alignment is centered and cannot be adjusted.

Click on each variant below to enter inspect view and get details on its code attributes and any global styles it uses.

**Note:** Dotted lines around the cells below are only for demonstration purposes to show the cells' containers; in application, individual cells have no borders.

---

---

### Header Cell Spacing

These rules establish how much margin should exist between and around elements. Multiple Header Cells are placed beside each other to create a Table Header. Stack Table Rows below a Table Header to create a full Table.

---

## Table Row

|  | In Figma |   |  | Meets Accessibility |   |  | In napari hub + .org Codebases |
| --- | --- | --- | --- | --- | --- | --- | --- |

A Table Row is a container filled with multiple Basic Cells placed side-by-side to form a row of different, but related pieces of information that all connect back to the same data source, such as a collected sample. Each data source should have its own row, meaning the Table will have as many Table Rows as there are data sources.

Click on each variant below to enter inspect view and get details on its code attributes and any global styles it uses.

---

### Table Row Spacing

These rules establish how much margin should exist between and around elements. Stack Table Rows below a Table Header to create a full Table.

---

## Table Header

|  | In Figma |   |  | Meets Accessibility |   |  | In napari hub + .org Codebases |
| --- | --- | --- | --- | --- | --- | --- | --- |

A Table Header is a container filled with multiple Header Cells placed side-by-side to form a header row. This row is placed at the top of the Table with each Header Cell in the row serving as the column header for the data in the content cells below it. There can only be one Table Header per Table.

---

### Table Header Spacing

These rules establish how much margin should exist between and around elements. Stack Table Rows below a Table Header to create a full Table.

## Code

## Table Components

| Below you will find an interactive Storybook iframe for Tables.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** CellBasic CellHeader TableRow TableHeader Table |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the napari hub or napari.org codebases, use a theme file to enable the napari visual appearance customization.

The technical documentation and code demos can be found here.

### CellBasic

Storybook

---

### CellHeader

Storybook

---

### TableRow

Storybook

---

### TableHeader

Storybook

---

### Table

Storybook

---

Tables are used to store and visually organize data and other content into a series of cells grouped into a collection of rows and columns, helping users better understand and analyze a given set of information.

## Overview

## Table elements

| Tables can be sorted, either ascending or descending, by clicking on any Header Cell that has sorting enabled. This will rearrange all of the content in the Table by the category in that column.  Filters are often used in conjunction with Tables, allowing users to manipulate what content is viewable in the Table by the parameters indicated in the Filter.  Follow the usage criteria accompanying each variant as a guide for building a Table for any use case. |   | **Jump to element:** Table Anatomy Content Cells Header Cell Table Row Table Header CZ ID Tables |
| --- | --- | --- |

---

## Table Anatomy

Tables are made up of a Table Header with as many Table Rows stacked below it as needed. Table Headers contain multiple Header Cells which serve as top-level indicators for the type of content found in the column of cells below each. Similarly, Table Rows are comprised of two different types of content cells, Basic Cells and Component Cells; these cell types contain the bulk of the data within a Table and are designed to be flexible in their ability to hold nearly any type of content. For Tables with large amounts of data, only data from visible cells will be loaded (colloquially known as *lazy load*); as the user scrolls down the Table, additional data will be pulled from the server and displayed once the data has fully loaded.

---

## Content Cells

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Basic Cell

The Basic Cell is the most common cell type comprising a Table. It is intended to be filled with strings of text or numerical values. There is child node built in where designers can insert a range of elements, such as Icon Buttons or Tags, to provide additional actions users can take in relation to the content within the cell. There is also the option to include an Icon to the left of the cell text to communicate additional context.

Basic Cells have three levels of content hierarchy available within them: primary, secondary, and tertiary—providing designers flexibility to delineate content within the cell as needed by their datasets.

Use the `horizontalAlign` and `verticalAlign` props to control how the content within the cell is positioned. To follow Table best practices, when displaying strings of text, set the `horizontalAlign` prop to `left`, when displaying numerical values, set the `horizontalAlign` prop to `right`.

By default, the `wrap` prop is set to `true`, meaning text entered into the cell will wrap onto the next line if it is longer than the width of the cell. The height of the cell (and the corresponding Table Row) will expand to accommodate any additional lines of text that get wrapped. Use the `...TextWrapLineCount` props to establish how many lines text strings are allowed to wrap before they are truncated with an ellipsis. Changing the `wrap` prop to `false` will prevent overflow text from wrapping onto the next line and instead be truncated with an ellipsis. Enable the `shouldShowTooltipOnHover` prop to have truncated text appear in a Tooltip when the cell is hovered over.

### Basic Cell Variants

Click on each variant below to enter inspect view and get details on its code attributes and any global styles it uses.

**Note:** Dotted lines around the cells below are only for demonstration purposes to show the cells' containers; in application, individual cells have no borders.

 

---

---

---

---

---

---

### Component Cell

Use a Component Cell to construct more complex or custom cells that some products may have a need for as it can house multiple components in one cell. As an example, it can be used to construct a cell where there is both an icon on the left, primary text, secondary text, and a tag in the tertiary area of the cell, or to the right of the primary and secondary text. It can also be used for something simpler like placing Buttons, Toggles, etc. within a Table. This cell type can accept any type of element that is not a text string via the built-in child node and can be used as designers and engineers see necessary.

Component Cells have the same alignment options as Basic Cells; alignment is adjusted using the props `horizontalAlign` and `verticalAlign`.

Use the `fitCellToComponent` prop to have the cell size automatically adjust to accommodate the element placed within it.

### Component Cell Variants

Click on each variant below to enter inspect view and get details on its code attributes and any global styles it uses.

**Note:** Dotted lines around the cells below are only for demonstration purposes to show the cells' containers; in application, individual cells have no borders.

---

---

---

### Content Cell Spacing

These rules establish how much margin should exist between and around elements. Multiple content cells are placed beside each other to create a Table Row. Stack Table Rows below a Table Header to create a full Table.

 

---

## Header Cell

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

Header Cells are placed at the top of Table columns and serve as the header or indicator of the content found in the cells below it.

Use the `horizontalAlign` prop to control how the content within the cell is positioned. The Header Cell's text position should match the horizontal alignment of the content cells below it. For content cells with centered-aligned content, set the Header Cell to `horizontalAlign: left`. Header Cells' vertical alignment is centered and cannot be adjusted.

Users are able to manually sort columns in ascending or descending order by clicking on the Header Cell. On first click, the Table will rearrange itself and sort in the direction indicated on the sort icon. Click again and the sort direction will flip. Click a third time and the content will return to its non-sorted order. Use the `hideSortIcon` prop to show or hide the column sort icon that indicates the direction the column's content is sorted in.

Each Header Cell can have an optional Tooltip appear when hovered over by using the `shouldShowTooltipOnHover` prop. This can be used to display supplemental information or help further define the contents of the column.

| **Default** | **Hover** |
| --- | --- |

---

 

### Header Cell Variants

Click on each variant below to enter inspect view and get details on its code attributes and any global styles it uses.

**Note:** Dotted lines around the cells below are only for demonstration purposes to show the cells' containers; in application, individual cells have no borders.

---

---

---

---

---

### Header Cell Spacing

These rules establish how much margin should exist between and around elements. Multiple Header Cells are placed beside each other to create a Table Header. Stack Table Rows below a Table Header to create a full Table.

---

## Table Row

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

A Table Row is a container filled with multiple content cells placed side-by-side to form a row of different, but related pieces of information that all connect back to the same data source, such as a collected sample. Each data source should have its own row, meaning the Table will have as many Table Rows as there are data sources.

While each content cell has props that allow designers and engineers to adjust the features and functionality for each cell individually, the Table Row also has its own set of props that control how the row as a whole behaves.

To help users identify exactly which row they are hovering over at any given time, use the `hover` prop to trigger a visual change in the row on hover; this includes a shift in the row's background color and changing the user's cursor to a pointer. This can be coupled with the `shouldShowTooltipOnHover` prop, resulting in the appearance of a Tooltip when the row is hovered over, useful in instances where there's a need to communicate information about an entire row to users. Because individual content cells can have Tooltips enabled on them, it is best to only enable Tooltips at either the row level or individual content cell level and not both, otherwise users will trigger two Tooltips simultaneously when hovering which may cause confusion.

Some Table designs will allow users to select entire rows via Checkbox Inputs located in the first cell of the row and complete bulk actions on the content within selected rows (such as downloading, editing, etc. See the Table Row Actions section below for more details). In response to the input being checked, enable the Table Row's `selected` prop to change its background color to indicate that the row has been selected.

Enable the `useDivider` prop to help visually distinguish between Table Rows by adding a horizontal line along the bottom edge of the row.

Use the `disabled` prop to gray out all of the cells in the row and make it so users cannot interact with their content.

Click on each variant below to enter inspect view and get details on its code attributes and any global styles it uses.

 

---

---

---

---

---

### Table Row Actions

For advanced Tables, Table Rows may have actions tied to them, such as the ability to edit, delete, download, etc., which allow users to modify or manipulate the contents of the cells within that row. Users complete these actions by clicking on corresponding Icon Buttons that are placed within a Component Cell in the final column at the end of a Table Row (1).

An overflow Icon Button, represented by the `DotsHorizontal3` icon (2), can be used to surface a Dropdown Menu (3) that contains additional actions. This should be used in instances where a large number of actions are needed (generally more than three) or the designer wants to save space in wide Tables that contain many columns. Table Row Actions can either be exposed on hover or can be persistent in the Table at all times.

 

For efficiency, Tables can be designed to allow users to complete actions across multiple Table Rows at the same time, known as bulk actions. Similar to row actions, bulk actions are completed by clicking on corresponding Icon Buttons that are located at the top right of the Table, above the Table Header; they should be inactive when no rows are selected (1).

 

To make Table Rows selectable, designers must include Checkbox Inputs in the first column of the row, providing an input for users to click on and select the row (2); enable the Table Row's `selected` prop to indicate when rows are selected. Once rows are selected, any applicable bulk action Icon Button should become active to allow users to take action across all selected rows (3). In addition to these Icon Buttons, there should be a counter present that indicates how many rows have been selected (4).

Because actions taken at the row level will impact stored data in the application, row and bulk actions are completely controlled by the application itself and not the SDS component.

 

---

### Table Row Spacing

These rules establish how much margin should exist between and around elements. Stack Table Rows below a Table Header to create a full Table.

---

## Table Header

|  | In Figma |   |  | Meets Accessibility |   |  | In CZ ID Codebase |
| --- | --- | --- | --- | --- | --- | --- | --- |

A Table Header is a container filled with multiple Header Cells placed side-by-side to form a header row. This row is placed at the top of the Table with each Header Cell in the row serving as the column header for the data in the content cells below it. There can only be one Table Header per Table.

---

### Table Header Spacing

These rules establish how much margin should exist between and around elements. Stack Table Rows below a Table Header to create a full Table.

---

## CZ ID Tables

The following Table configurations are currently in use in CZ ID.

### Download Table

### Project Table

### Sample Table – Consensus Genome

### Sample Table – Metagenomic

### Taxon Table

## Code

## Table Components

| Below you will find an interactive Storybook iframe for Tables.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** CellBasic CellComponent CellHeader TableRow TableHeader Table |
| --- | --- | --- |

---

The technical documentation and code demos can be found here.

### CellBasic

Storybook

---

 

### CellComponent

Storybook

---

### CellHeader

Storybook

---

### TableRow

Storybook

---

###  

### TableHeader

Storybook

---

### Table

Storybook

 

