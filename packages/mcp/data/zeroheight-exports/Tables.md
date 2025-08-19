---
title: "Tables"
id: 7352926
uid: "781d66"
slug: "781d66-tables"
url: "https://sds.czi.design/009eaf17b/v/latest/p/781d66-tables"
hidden: false
locked: false
created_at: "2025-07-07T20:30:26.759Z"
updated_at: "2025-07-07T20:30:27.203Z"
---

# Tables

Tables are used to store and visually organize data and other content into a series of cells grouped into a collection of rows and columns, helping users better understand and analyze a given set of information.

## Overview

## Table elements

| Tables are made up of a[ Table Header](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/00c604) with as many [Table Rows](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/243e8c) stacked below it as needed. Table Headers contain multiple [Header Cells](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/84d48a) which serve as top-level indicators for the type of content found in the column of cells below each. Similarly, Table Rows are comprised of [Basic Cells](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/44fdf7) which contain the bulk of the data within a Table.  Follow the usage criteria accompanying each variant as a guide for building a Table for any use case. |   | **Jump to element:** [Table Anatomy](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/6872d0) [Basic Cell](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/44fdf7) [Header Cell](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/84d48a) [Table Row](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/243e8c) [Table Header](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/00c604) |
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

These rules establish how much margin should exist between and around elements. Multiple Basic Cells are placed beside each other to create a [Table Row](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/243e8c). Stack Table Rows below a [Table Header](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/00c604) to create a full Table.

 

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

These rules establish how much margin should exist between and around elements. Multiple Header Cells are placed beside each other to create a [Table Header](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/00c604). Stack [Table Rows](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/243e8c) below a Table Header to create a full Table.

---

## Table Row

|  | In Figma |   |  | Meets Accessibility |   |  | In napari hub + .org Codebases |
| --- | --- | --- | --- | --- | --- | --- | --- |

A Table Row is a container filled with multiple [Basic Cells](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/44fdf7) placed side-by-side to form a row of different, but related pieces of information that all connect back to the same data source, such as a collected sample. Each data source should have its own row, meaning the Table will have as many Table Rows as there are data sources.

Click on each variant below to enter inspect view and get details on its code attributes and any global styles it uses.

---

### Table Row Spacing

These rules establish how much margin should exist between and around elements. Stack Table Rows below a [Table Header](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/00c604) to create a full Table.

---

## Table Header

|  | In Figma |   |  | Meets Accessibility |   |  | In napari hub + .org Codebases |
| --- | --- | --- | --- | --- | --- | --- | --- |

A Table Header is a container filled with multiple [Header Cells](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/84d48a) placed side-by-side to form a header row. This row is placed at the top of the Table with each Header Cell in the row serving as the column header for the data in the content cells below it. There can only be one Table Header per Table.

---

### Table Header Spacing

These rules establish how much margin should exist between and around elements. Stack [Table Rows](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/243e8c) below a Table Header to create a full Table.

## Code

## Table Components

| Below you will find an interactive Storybook iframe for Tables.  Tabs within each iframe provide a different set of tools: The Controls tab allows you to see and adjust all available props. The Actions tab shows you data displayed by event handler arguments. |   | **Jump to component:** [CellBasic](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/59c8c9) [CellHeader](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/3593c8) [TableRow](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/753690) [TableHeader](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/52bcb9) [Table](https://sds.czi.design/009eaf17b/v/0/p/781d66-tables/t/6075ca) |
| --- | --- | --- |

---

>This component appears as it is in the default SDS codebase. Once imported into the napari hub or napari.org codebases, use a theme file to enable the napari visual appearance customization.

The technical documentation and code demos can be found [here](https://docs.google.com/document/d/1guGn7emIgvcLRKO4ftsDUUGLywAElDtpoReEj80Hyeg/edit?usp=sharing).

### CellBasic

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/table-cellbasic--default)

---

### CellHeader

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/table-cellheader--default)

---

### TableRow

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/table-tablerow--default)

---

### TableHeader

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/table-tableheader--default)

---

### Table

[Storybook](https://chanzuckerberg.github.io/sci-components/?path=/story/table-table--default)

