---
title: "Table"
id: 7353048
uid: "1647a1"
slug: "1647a1-table"
url: "https://sds.czi.design/009eaf17b/v/latest/p/1647a1-table"
hidden: false
locked: false
created_at: "2025-07-07T20:30:53.761Z"
updated_at: "2025-07-07T20:30:54.825Z"
status_id: "not_applicable"
status_name: "SDS"
---

# Table

Tables are used to store and visually organize data and other content into a series of cells grouped into a collection of rows and columns, helping users better understand and analyze a given set of information.

## Guidelines

## Table Components

| Tables are built by combining Header Cells with Basic or Component Cells, providing flexibility for teams to create Tables that house any type of content their product's require. Tables can be sorted, either ascending or descending, by clicking on any Header Cell that has sorting enabled.  To avoid slow loading speeds in Tables that contain large amounts of data, they should be split across multiple pages; incorporate a Pagination component to help users navigate between the pages of multi-page Tables.  [Filters](https://sds.czi.design/009eaf17b/p/543108) are often used in conjunction with Tables, allowing users to manipulate what content is viewable in the Table by the parameters indicated in the Filter. |   | **Jump to element:** [Table Anatomy](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/777c08) [Basic Cell](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/79452c) [Component Cell](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/066d0b) [Header Cell](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/255d36) [Table Row](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/8432d1) [Table Header](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/6460c2) [Pagination](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/891710) |
| --- | --- | --- |

### Visual Preview

>**Note:** Dotted lines around the cells below are only for demonstration purposes to show the cells' containers; in application, individual cells have no borders.

---

### Table Anatomy

---

## Basic Cell

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=table-cellbasic--default)

---

### Overview

The Basic Cell is intended to be filled with strings of text or numerical values. A range of elements can be included alongside text, such as [Icon Buttons](https://sds.czi.design/009eaf17b/v/0/p/47778c-buttons/t/73bd73) or [Tags](https://sds.czi.design/009eaf17b/p/39dc34), to provide additional actions users can take in relation to the content within the cell.

>**Note:** Dotted lines around the cells below are only for demonstration purposes to show the cells' containers; in application, individual cells have no borders.

| Default | Default + Secondary text | Default + Secondary text + Tertiary text | Default (right aligned) |
| --- | --- | --- | --- |

| Default (wrapped) | Hover (truncated) + Tooltip | Basic Cell + Icon | Basic Cell + Tag |
| --- | --- | --- | --- |

---

### Basic Cell Spacing

These rules establish how much margin should exist between and around elements. Multiple Basic and/or Component Cells are placed beside each other to create a [Table Row](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/8432d1). Stack Table Rows below a [Table Header](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/6460c2) to create a full Table.

---

## Component Cell

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=table-cellcomponent--default)

---

### Overview

Component Cells can accept any type of element, including any combination or number of components, but should not be used to display text strings (use a [Basic Cell](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/79452c) for this). Most commonly it is used to hold [Buttons](https://sds.czi.design/009eaf17b/p/47778c), [Toggles](https://sds.czi.design/009eaf17b/v/0/p/548a3d-control-inputs/t/54c33d), and [Checkbox Inputs](https://sds.czi.design/009eaf17b/v/0/p/548a3d-control-inputs/t/70a4ba).

>**Note:** Dotted lines around the cells below are only for demonstration purposes to show the cells' containers; in application, individual cells have no borders.

| Default | Filled (left aligned) | Filled (center aligned) | Filled (right aligned) | Filled (fit contents) |
| --- | --- | --- | --- | --- |

---

### Component Cell Spacing

These rules establish how much margin should exist between and around elements. Multiple Basic and/or Component Cells are placed beside each other to create a [Table Row](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/8432d1). Stack Table Rows below a [Table Header](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/6460c2) to create a full Table.

---

## Header Cell

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=table-cellheader--default)

---

### Overview

Header Cells are placed at the top of Table columns and serve as the header for the content found in the cells below it. The Header Cell's horizontal alignment should match the text position of the [Basic](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/79452c) or [Component Cell](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/066d0b) below it. For Basic or Component Cells with centered-aligned content, the Header Cell should be left aligned. Header Cells' vertical alignment is centered and cannot be adjusted.

Users are able to manually sort columns in ascending or descending order by clicking on the Header Cell. On first click, the Table will rearrange itself and sort in the direction indicated on the sort icon. A second click and the sort direction will flip. A third click and the content will return to its non-sorted order.

Each Header Cell can have an optional [Tooltip](https://sds.czi.design/009eaf17b/p/74af45) appear when hovered over. This can be used to display supplemental information or help further define the contents of the column below it.

>**Note:** Dotted lines around the cells below are only for demonstration purposes to show the cells' containers; in application, individual cells have no borders.

| Default | Default (center aligned) | Default (right aligned) | Hover + Tooltip | Active (ascending) | Active (descending) |
| --- | --- | --- | --- | --- | --- |

---

### Header Cell Spacing

These rules establish how much margin should exist between and around elements. Multiple Header Cells are placed beside each other to create a [Table Header](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/6460c2). Stack [Table Rows](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/8432d1) below a Table Header to create a full Table.

---

## Table Row

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=table-tablerow--default)

---

### Overview

A Table Row is a container filled with multiple [Basic](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/79452c) or [Component Cells](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/066d0b) placed side-by-side to form a row of different, but related pieces of information, for example, data related to a collected sample.

The Table Row also has its own set of props that control how the row as a whole behaves. For example, Table Rows can have [Tooltips](https://sds.czi.design/009eaf17b/p/74af45) enabled on them that appear when the row is hovered over, communicating information about an entire row to users. Be sure to only enable Tooltips on either the row or cell and not both, so users don't trigger two Tooltips simultaneously.

Additionally, [Checkbox Inputs](https://sds.czi.design/009eaf17b/v/0/p/548a3d-control-inputs/t/86b757) can be placed within a Component Cell in the first column of a row, giving users the ability to select entire rows and complete bulk actions on them, such as downloading, editing, etc. See the [Table Row Actions](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/59ed88) section below for more details.

| Default | Default (no divider) | Hover + Tooltip | Selected | Disabled |
| --- | --- | --- | --- | --- |

---

### Table Row Actions

Table Rows may have actions tied to them, such as the ability to edit, delete, download, etc. Users complete these actions by clicking on corresponding [Icon Buttons](https://sds.czi.design/009eaf17b/v/0/p/47778c-buttons/t/73bd73) that are placed within a [Component Cell](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/066d0b) in the final column at the end of a Table Row (1). Table Row Actions can either be exposed on hover or can be persistent in the Table at all times.

#### Overflow Menu

An overflow Icon Button, represented by the `[DotsHorizontal3](https://sds.czi.design/009eaf17b/p/529e08)` icon (2), can be used to surface a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/42bdf2) (3) that contains additional actions. This should be used in instances where a large number of actions are needed (generally more than three) or the designer wants to save space in wide Tables that contain many columns.

#### Bulk Actions

Tables can be designed to allow users to complete actions across multiple Table Rows at the same time, known as bulk actions. Similar to row actions, bulk actions are completed by clicking on corresponding [Icon Buttons](https://sds.czi.design/009eaf17b/v/0/p/47778c-buttons/t/73bd73) that are located at the top right of the Table, above the [Table Header](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/82449e); they should be inactive when no rows are selected (4).

#### Selectable Rows

To make Table Rows selectable, designers must include [Checkbox Inputs](https://sds.czi.design/009eaf17b/v/0/p/548a3d-control-inputs/t/70a4ba) in the first column of the row (5). It is recommended that only once rows are selected should applicable bulk action [Icon Buttons](https://sds.czi.design/009eaf17b/v/0/p/47778c-buttons/t/73bd73) become enabled, allowing users to take action across all selected rows (6). How this functionality is implemented is ultimately up to the product team. Add a counter to indicate how many rows have been selected (7).

Because actions taken at the row level will impact stored data in the application, row and bulk actions are completely controlled by the application itself and not the SDS component.

---

### Table Row Spacing

These rules establish how much margin should exist between and around elements. Stack Table Rows below a  [Table Header](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/6460c2) to create a full Table.

---

## Table Header

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=table-tableheader--default)

---

### Overview

A Table Header is a container filled with multiple [Header Cells](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/255d36) placed side-by-side to form a header row. This row is placed at the top of a Table with each Header Cell serving as the column header for the content below it; a 2px border should be placed below it. There can only be one Table Header per Table.

---

### Table Header Spacing

These rules establish how much margin should exist between and around elements. Stack [Table Rows](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/8432d1) below a  Table Header to create a full Table.

---

## Pagination

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

[Default](https://chanzuckerberg.github.io/sci-components/iframe.html?id=table-pagination--default)

---

### Overview

Large Tables may have long loading times. To mitigate this, Tables can be split across multiple pages with the addition of a Pagination component to navigate between these pages. Place the Pagination component below the final Table Row on each page. It is right-aligned by default, but can optionally be center or left-aligned.

Users are able to click on any page number to jump immediately to that page; otherwise they can use the forward and back [Icon Buttons](https://sds.czi.design/009eaf17b/v/0/p/47778c-buttons/t/73bd73) to navigate page-by-page. For Tables that are longer than seven pages, ellipses are displayed to represent any additional pages not viewable. When enabled, the ellipses between page numbers can be clicked on, allowing users to select a page to jump to via a [Dropdown Menu](https://sds.czi.design/009eaf17b/p/42bdf2). When disabled, the ellipses will still be visible but not interactive.

| Default | Default (square) | Hover | Default (ellipsis disabled) | Default (ellipsis enabled) |
| --- | --- | --- | --- | --- |

---

### Pagination Spacing

These rules establish how much margin should exist between and around elements. Place Pagination below the final [Table Row](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/8432d1) on each page of the Table.

## Code

## Table Components

| `Tables` are built by combining `CellHeader` with `CellBasic` or `CellComponent`, providing flexibility for teams to create `Tables` that house any type of content their product's require. `Tables` can be sorted, either ascending or descending, by clicking on any `CellHeader` that has sorting enabled.  To avoid slow loading speeds in `Tables` that contain large amounts of data, they should be split across multiple pages; incorporate `Pagination` to help users navigate between the pages of multi-page Tables.  `Filters` are often used in conjunction with Tables, allowing users to manipulate what content is viewable in the `Table` by the parameters indicated in the `Filter`. |   | **Jump to component:** [CellBasic](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/703189) [CellComponent](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/440ac7) [CellHeader](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/03de1b) [TableRow](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/4163d9) [Pagination](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/86a541) |
| --- | --- | --- |

### Visual Preview

>**Note:** Dotted lines around the cells below are only for demonstration purposes to show the cells' containers; in application, individual cells have no borders.

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

---

## CellBasic

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/CellBasic/index.tsx).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `horizontalAlign` | `"left"` `| "center"` `| "right"` | `"left"` | Horizontal alignment of cell content. |
| `icon` | `Node` | `-` | Places an icon at the left side of the cell component. |
| `iconVerticalAlign` | `"top"` `| "center"` `| "bottom"` | `"top"` | Vertical alignment of the icon component. |
| `primaryText` | `string` | `-` | Primary text value. |
| `primaryTextWrapLineCount` | `number` | `3` | Number of text wrap lines for primary text. |
| `primaryTextComponentSlotBottom` | `ReactNode` | `null` | Component slot below primary text. This will only show if there is no secondary or tertiary text. Remove the default values of secondary and tertiary text to see this in action. |
| `primaryTextComponentSlotRight` | `ReactNode` | `null` | Component slot to the right of primary text |
| `secondaryText` | `string` | `-` | Secondary Text. |
| `secondaryTextWrapLineCount` | `number` | `1` | Number of text wrap lines for secondary text. |
| `tertiaryText` | `string` | `-` | Tertiary Text. |
| `tertiaryTextWrapLineCount` | `number` | `1` | Number of text wrap lines for tertiary text. |
| `shouldShowTooltipOnHover` | `boolean` | `true` | When set to `true`, a tooltip will be shown on cell hover. |
| `shouldTextWrap` | `boolean` | `true` | When set to `true`, wraps the content texts by the number of defined wrap line numbers. |
| `tooltipProps` | `Partial<TooltipProps>` | `{}` | These props will be directly passed to the `Tooltip` component. |
| `verticalAlign` | `"top"` `| "center"` `| "bottom"` | `"top"` | Vertical alignment of the cell content. |

### Code examples

#### Default CellBasic

This example demonstrates the minimum required props for rendering a `CellBasic` component.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}

table {
  border: dashed 1px #eee;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import { CellBasic } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <table>
        <tbody>
          <tr>
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Secondary Text"
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Table</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### CellBasic with Icon and Text Wrap

This example highlights a `CellBasic` component featuring an SDS icon and lengthy texts for Primary, Secondary, and Tertiary content, all thoughtfully wrapped for optimal presentation.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import { CellBasic, Icon } from "@czi-sds/components";
import "./styles.css";

function App() {
  const TableCellStyle = {
    border: "dashed 1px #eee",
    maxWidth: 160,
    width: 160,
  };
  
  return (
    <div className="app">
      <table>
        <tbody>
          <tr>
            <CellBasic
              primaryText="Primary Text that is longer than expected."
              secondaryText="Secondary Text that is londer than expected."
              tertiaryText="Tertiary Text that is lonegrt than expected."
              icon={<Icon sdsIcon="Bacteria" sdsSize="l" sdsType="static" color="notice" />}
              style={TableCellStyle}
              tooltipProps={{
                placement: "right",
                sdsStyle: "light"
              }}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Table</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

---

## CellComponent

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/CellComponent/index.tsx).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `horizontalAlign` | `"left"` `| "center"` `| "right"` | `"left"` | Specifies the horizontal alignment of the cell content. |
| `verticalAlign` | `"top"` `| "center"` `| "bottom"` | `"top"` | Specifies the vertical alignment of the cell content. |

### Code examples

#### **Default CellComponent**

This example demonstrates the minimum required props for rendering a `CellComponent` component.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}

table {
  border: dashed 1px #eee;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import { CellComponent, InputToggle } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <table>
        <tbody>
          <tr>
            <CellComponent>
              <InputToggle />
            </CellComponent>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Table</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

---

## CellHeader

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/CellHeader/index.tsx).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | `false` | When `true`, the component is in active state. |
| `hover` | `boolean` | `false` | By default, the component is not interactive and does not have a hover state. When set to `true`, it displays a `sortIcon` and changes color on hover. |
| `direction` | `"asc" | "desc"` | `"desc"` | Changes the chevron icon based on the sort direction. |
| `hideSortIcon` | `boolean` | `false` | If set to `true`, the sort icon becomes hidden. |
| `horizontalAlign` | `"left"` `| "center"` `| "right"` | `"left"` | Horizontally aligns the component's content. |
| `shouldShowTooltipOnHover` | `boolean` | `true` | When `true`, show a tooltip on component hover. |
| `tooltipText` | `string` | `-` | The content of the tooltip. |
| `tooltipProps` | `Partial<TooltipProps>` | `{}` | These props are directly passed to the tooltip component. |

### Code examples

#### **Default CellHeader**

This example demonstrates the minimum required props for rendering a `CellHeader` component.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}

table {
  border: dashed 1px #eee;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import { CellHeader } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <table>
        <thead>
          <tr>
            <CellHeader>
              Header
            </CellHeader>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Table</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

---

## TableRow

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/TableRow/index.tsx).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | When `true`, the row is disabled. |
| `hover` | `boolean` | `true` | When `true`, the component has a hover style. |
| `selected` | `boolean` | `false` | When `true`, component is in the selected state. |
| `rowHeight` | `number` | `-` | Sets a maximum height for the table row. |
| `shouldShowTooltipOnHover` | `boolean` | `true` | When `true`, a tooltip shows up on component hover. |
| `tooltipProps` | `Partial<TooltipProps>` | `{}` | These props are directly passed to the tooltip component. |
| `tooltipText` | `string` | `-` | Tooltip text. |
| `tooltipSubtitle` | `string` | `-` | Toltip subtitle. |
| `useDivider` | `boolean` | `true` | If set to `true`, shows a bottom border under the table row. |

### Code examples

#### **Default TableRow**

This example demonstrates the minimum required props for rendering a `TableRow` component.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import { TableRow, CellBasic } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <table>
        <tbody>
          <TableRow>
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Secondary Text"
              shouldShowTooltipOnHover={false}
            />
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Secondary Text"
              shouldShowTooltipOnHover={false}
            />
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Secondary Text"
              shouldShowTooltipOnHover={false}
            />
          </TableRow>
        </tbody>
      </table>
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Table</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

---

## TableHeader

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/TableHeader/index.tsx).

### Code examples

#### **Default TableHeader**

This example demonstrates the minimum required props for rendering a `TableHeader` component.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import { TableRow, CellHeader } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <table>
        <thead>
          <tr>
            <CellHeader>
              Header
            </CellHeader>
            <CellHeader>
              Header
            </CellHeader>
            <CellHeader>
              Header
            </CellHeader>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Table</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

---

## Pagination

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Pagination/index.tsx).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `onPageChange` | `(page: number) => void;` | `-` | A callback function triggered when the page number is changed. |
| `onNextPage` | `() => void;` | `-` | A callback function triggered when the "Next" page button is clicked. |
| `onPreviousPage` | `() => void;` | `-` | A callback function triggered when the "Previous" page button is clicked. |
| `pageSize` | `number` | `-` | Specifies the number of items to be shown on each page. |
| `siblingCount` | `number` | `1` | Specifies the number of siblings for each page number. |
| `sdsStyle` | `"rounded"` `| "square"` | `"rounded"` | The style of the component. |
| `totalCount` | `number` | `-` | Total number of items to be paginated. |
| `truncateDropdown` | `boolean` | `true` | If `true`, a dropdown menu is shown for hidden page numbers. |

### Code examples

#### **Default Pagination**

This example showcases a `Pagination` component with the minimum required props.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import { Pagination } from "@czi-sds/components";
import { useState } from "react";
import "./styles.css";

function App() {
  
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <div className="app">
      <Pagination
        pageSize={5}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
        onNextPage={() => setCurrentPage(currentPage + 1)}
        onPreviousPage={() => setCurrentPage(currentPage - 1)}
        totalCount={250}
        siblingCount={2}
        currentPage={currentPage}
        truncateDropdown
      />
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pagination</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

---

## Table

### SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Table/index.tsx).

### Code examples

#### **Default Table**

This example demonstrates a `Table` that utilizes all SDS Table-related components, providing a comprehensive showcase of their functionalities and features.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import { 
  CellBasic, 
  CellComponent, 
  CellHeader,
  Icon, 
  InputRadio,  
  Tag, 
  Table, 
  TableRow, 
  TableHeader 
} from "@czi-sds/components";
import { styled, RadioGroup, FormControlLabel } from "@mui/material";
import "./styles.css";

function App() {
  
  const StyledIconCell = styled("div")`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;

  return (
    <div className="app">
      <Table>
        <TableHeader>
          <CellHeader horizontalAlign="center" hideSortIcon>
            Category
          </CellHeader>
          <CellHeader active>Active Header</CellHeader>
          <CellHeader>
            A very long table header title to test sort icon positioning
          </CellHeader>
          <CellHeader hideSortIcon>Component</CellHeader>
          <CellHeader horizontalAlign="right" hideSortIcon>
            Right Aligned and Not sortable
          </CellHeader>
        </TableHeader>
        <tbody>
          <TableRow>
            <CellComponent verticalAlign="center" horizontalAlign="center">
              <StyledIconCell>
                <Icon sdsSize="xl" sdsIcon="Flask" sdsType="static" />
                <Tag
                  color="info"
                  label="Chemistry"
                  sdsStyle="rounded"
                  sdsType="secondary"
                />
              </StyledIconCell>
            </CellComponent>
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              secondaryTextWrapLineCount={2}
              shouldTextWrap
            />
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Secondary Text"
              tertiaryText="Tertiary Text"
              shouldShowTooltipOnHover={false}
            />
            <CellComponent>
              {["info", "notice", "beta", "negative", "positive"].map((item) => (
                <Tag
                  key={item}
                  color={item as SdsTagColorType}
                  label={item as string}
                  sdsStyle="rounded"
                  sdsType="secondary"
                />
              ))}
            </CellComponent>
            <CellBasic
              primaryText="356"
              horizontalAlign="right"
              shouldShowTooltipOnHover={false}
            />
          </TableRow>
          <TableRow>
            <CellComponent verticalAlign="center" horizontalAlign="center">
              <StyledIconCell>
                <Icon sdsSize="xl" sdsIcon="Download" sdsType="static" />
                <Tag
                  color="info"
                  label="Downloadable Content"
                  sdsStyle="rounded"
                  sdsType="secondary"
                />
              </StyledIconCell>
            </CellComponent>
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Secondary Text"
              tertiaryText="Tertiary Text"
              shouldShowTooltipOnHover={false}
            />
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Secondary Text"
              shouldShowTooltipOnHover={false}
            />
            <CellComponent>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                defaultValue="1"
              >
                <InputRadio label="Option I" caption="Caption I" value="1" />
                <InputRadio label="Option II" caption="Caption II" value="2" />
              </RadioGroup>
            </CellComponent>
            <CellBasic
              primaryText="1,234"
              secondaryText="2,344,000"
              tertiaryText="12.5%"
              horizontalAlign="right"
              shouldShowTooltipOnHover={false}
            />
          </TableRow>
          <TableRow
            disabled
            shouldShowTooltipOnHover
            tooltipText="This row is DISABLED!"
            tooltipSubtitle="Tooltip subtitle"
          >
            <CellComponent verticalAlign="center" horizontalAlign="center">
              <StyledIconCell>
                <Icon sdsSize="xl" sdsIcon="Bacteria" sdsType="static" />
                <Tag
                  color="negative"
                  label="Disease"
                  sdsStyle="rounded"
                  sdsType="secondary"
                />
              </StyledIconCell>
            </CellComponent>
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Secondary Text"
              tertiaryText="Tertiary Text"
              shouldShowTooltipOnHover={false}
              verticalAlign="center"
            />
            <CellBasic
              primaryText="Primary Text"
              shouldShowTooltipOnHover={false}
              verticalAlign="center"
            />
            <CellComponent verticalAlign="center">
              <Icon sdsSize="l" sdsIcon="Virus" sdsType="static" />
            </CellComponent>
            <CellBasic
              primaryText="0.4"
              horizontalAlign="right"
              verticalAlign="center"
              shouldShowTooltipOnHover={false}
            />
          </TableRow>
        </tbody>
      </Table>
    </div>
  );
}

export default App;
```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Table</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

## Component Recipes

## Table Recipes

| These component recipes show a few of the more complex approaches available for customizing Tables.  |   | **Jump to recipe:** [Text-only Table](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/46319a) [Table with a custom sorting function](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/490982) [Table with custom Tooltips](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/770a4e) [Table with virtualized rows](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/969aef) [Editable Table Cells with Access to Internal Data](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/16881f) [Table with Front-End Pagination](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/41b699) [Table with Back-End Pagination](https://sds.czi.design/009eaf17b/v/0/p/1647a1-tables/t/011922) |
| --- | --- | --- |

#### Text-only Table

This shows a table that is made up entirely of `BasicCells`.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
  width: 90%;
  margin: auto;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import * as React from "react";
import {
  CellBasic,
  CellHeader,
  TableHeader,
  TableRow,
  Table,
} from "@czi-sds/components";
import "./styles.css";

import {
  CellContext,
  HeaderContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  birthdate: string;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "Tanner",
    lastName: "Linsley",
    age: 24,
    birthdate: "26 October 1997",
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "Tandy",
    lastName: "Miller",
    age: 40,
    birthdate: "14 July 1982",
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    birthdate: "25 February 1977",
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

function createHeaderCell(
  header: HeaderContext<Person, unknown>,
  name: string
) {
  return (
    <CellHeader
      hideSortIcon
      horizontalAlign={header.header.id === "progress" ? "right" : "left"}
    >
      {header.header.isPlaceholder ? "" : name}
    </CellHeader>
  );
}

function createBodyCell(cell: CellContext<Person, unknown>) {
  return (
    <CellBasic
      primaryText={cell.getValue() as string}
      shouldShowTooltipOnHover={false}
    />
  );
}

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (cell) => createBodyCell(cell),
    header: (header) => createHeaderCell(header, "First Name"),
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (cell) => createBodyCell(cell),
    header: (header) => createHeaderCell(header, "Last Name"),
  }),
  columnHelper.accessor("age", {
    cell: (cell) => (
      <CellBasic
        key={cell.cell.id}
        primaryText={cell.getValue().toString()}
        secondaryText={cell.row.original.birthdate}
        shouldShowTooltipOnHover={false}
      />
    ),
    header: (header) => createHeaderCell(header, "Age"),
  }),
  columnHelper.accessor("visits", {
    cell: (cell) => createBodyCell(cell),
    header: (header) => createHeaderCell(header, "Visits"),
  }),
  columnHelper.accessor("status", {
    cell: (cell) => createBodyCell(cell),
    header: (header) => createHeaderCell(header, "Status"),
  }),
  columnHelper.accessor("progress", {
    cell: (cell) => (
      <CellBasic
        key={cell.cell.id}
        primaryText={cell.getValue().toString()}
        secondaryText={`${cell.getValue()} ± 5%`}
        shouldShowTooltipOnHover={false}
        horizontalAlign="right"
      />
    ),
    header: (header) => createHeaderCell(header, "Profile Progress"),
  }),
];

function App() {
  const [data] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="app">
      <Table>
        <TableHeader>
          {table.getFlatHeaders().map((header) => (
            <React.Fragment key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </React.Fragment>
          ))}
        </TableHeader>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <React.Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;

```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Table</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### Table with a custom sorting function

In this example, a `Table` is presented with various columns, each employing default sorting mechanisms defined by react-table. However, the `LastName` column stands out as it utilizes a custom sorting function named `sortByLength`, which is specifically defined in the code. This customization allows for distinct sorting behavior in the "LastName" column compared to the rest of the `Table`.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
  width: 90%;
  margin: auto;
}

.actions-list {
  display: flex;
  justify-content: end;
  list-style: none;

  & li {
    margin-right: 8px;

    & .MuiButtonBase-root {
      outline: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import React from "react";
import {
  CellBasic,
  CellHeader,
  TableHeader,
  TableRow,
  Table,
  CellHeaderDirection,
  Icon,
  CellComponent,
  ButtonIcon,
  Button,
  Tag,
} from "@czi-sds/components";
import {
  CellContext,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  HeaderContext,
  Row,
  SortingFn,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { faker } from "@faker-js/faker";
import "./styles.css";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: "relationship" | "complicated" | "single";
  createdAt: Date;
  subRows?: Person[];
};

const newPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(96),
    visits: faker.number.int(1000),
    createdAt: faker.date.between({
      from: new Date("2001-01-01"),
      to: new Date(),
    }),
    status: faker.helpers.shuffle<Person["status"]>([
      "relationship",
      "complicated",
      "single",
    ])[0]!,
  };
};

function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return [...Array(len)].map((): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

declare module "@tanstack/table-core" {
  interface SortingFns {
    sortByLength: SortingFn<unknown>;
  }
}

function createHeaderCell(
  header: HeaderContext<Person, unknown>,
  name: string
) {
  return (
    <CellHeader
      colSpan={header.header.colSpan}
      direction={
        header.column.getIsSorted()
          ? (header.column.getIsSorted() as CellHeaderDirection)
          : undefined
      }
      active={!!header.column.getIsSorted()}
      onClick={header.column.getToggleSortingHandler()}
      hideSortIcon={header.header.id === "actions" ? true : false}
      horizontalAlign={header.header.id === "actions" ? "right" : "left"}
    >
      {name}
    </CellHeader>
  );
}

function createBodyCell(cell: CellContext<Person, unknown>) {
  return (
    <CellBasic
      primaryText={cell.getValue() as string}
      horizontalAlign={cell.column.id === "progress" ? "center" : "left"}
      verticalAlign="center"
      shouldShowTooltipOnHover={false}
    />
  );
}

function App() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const data = React.useState(() => makeData(20))[0];

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        id: "firstName",
        cell: (cell) => (
          <CellBasic
            primaryText={cell.getValue() as string}
            icon={<Icon sdsSize="s" sdsIcon="person" sdsType="static" />}
            verticalAlign="center"
            iconVerticalAlign="center"
            shouldShowTooltipOnHover={false}
          />
        ),
        header: (header) => createHeaderCell(header, "First Name"),
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (cell) => createBodyCell(cell),
        header: (header) => (
          <CellHeader
            colSpan={header.header.colSpan}
            direction={
              header.column.getIsSorted()
                ? (header.column.getIsSorted() as CellHeaderDirection)
                : undefined
            }
            active={!!header.column.getIsSorted()}
            onClick={header.column.getToggleSortingHandler()}
            shouldShowTooltipOnHover
            tooltipText="This column uses a custom sorting function."
            tooltipSubtitle="Sorts items based on their length."
          >
            Last Name
          </CellHeader>
        ),
        sortingFn: "sortByLength",
      },
      {
        accessorKey: "age",
        cell: (cell) => createBodyCell(cell),
        header: (header) => createHeaderCell(header, "Age"),
      },
      {
        accessorKey: "status",
        id: "status",
        cell: (cell) => (
          <CellComponent verticalAlign="center">
            <Tag
              label={cell.cell.getValue() as string}
              color={
                cell.cell.getValue() === "single"
                  ? "notice"
                  : cell.cell.getValue() === "relationship"
                  ? "positive"
                  : "negative"
              }
              sdsStyle="rounded"
              sdsType="secondary"
              hover={false}
            />
          </CellComponent>
        ),
        header: (header) => createHeaderCell(header, "Status"),
      },
      {
        accessorKey: "createdAt",
        cell: (cell) => (
          <CellBasic
            primaryText={(cell.getValue() as Date).getFullYear().toString()}
            secondaryText={(cell.getValue() as Date).toLocaleString("en-us", {
              month: "long",
              day: "numeric",
            })}
            tooltipProps={{
              title: (cell.getValue() as Date).toLocaleString("en-us"),
              sdsStyle: "dark",
              leaveDelay: 0,
              leaveTouchDelay: 0,
            }}
            verticalAlign="center"
            horizontalAlign="left"
          />
        ),
        header: (header) => createHeaderCell(header, "Created At"),
      },
      {
        id: "actions",
        accessorKey: "actions",
        cell: () => (
          <CellComponent horizontalAlign="right" verticalAlign="center">
            <ul className="actions-list">
              <li>
                <Button
                  sdsStyle="icon"
                  icon="TreeHorizontal"
                  sdsSize="small"
                  sdsType="secondary"
                />
              </li>
              <li>
                <Button
                  sdsStyle="icon"
                  icon="BarChartVertical3"
                  sdsSize="small"
                  sdsType="secondary"
                />
              </li>
              <li>
                <Button
                  sdsStyle="icon"
                  icon="Download"
                  sdsSize="small"
                  on
                  sdsType="secondary"
                />
              </li>
              <li>
                <Button
                  sdsStyle="icon"
                  icon="DotsHorizontal"
                  sdsSize="small"
                  sdsType="secondary"
                />
              </li>
            </ul>
          </CellComponent>
        ),
        header: (header) => createHeaderCell(header, "Actions"),
        enableSorting: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    sortingFns: {
      sortByLength: (
        rowA: Row<Person>,
        rowB: Row<Person>,
        columnId: string
      ): number => {
        const a: string = rowA.getValue(columnId);
        const b: string = rowB.getValue(columnId);

        if (a.length > b.length) return 1;
        if (a.length < b.length) return -1;
        return 0;
      },
    },
  });
  return (
    <div className="app">
      <Table>
        <TableHeader>
          {table.getFlatHeaders().map((header) => (
            <React.Fragment key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </React.Fragment>
          ))}
        </TableHeader>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <React.Fragment key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </React.Fragment>
                  ))}
                </TableRow>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;

```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Table</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### Table with custom Tooltips

This shows a `Table` with custom `Tooltips`.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 16px;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import * as React from "react";
import {
  CellBasic,
  CellHeader,
  TableHeader,
  TableRow,
  Table,
  CellComponent,
  Tag,
} from "@czi-sds/components";
import {
  CellContext,
  HeaderContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./styles.css";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  birthdate: string;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "Tanner",
    lastName: "Linsley",
    age: 24,
    birthdate: "26 October 1997",
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "Tandy",
    lastName: "Miller",
    age: 40,
    birthdate: "14 July 1982",
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    birthdate: "25 February 1977",
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

function createHeaderCell(
  header: HeaderContext<Person, unknown>,
  name: string
) {
  return (
    <CellHeader
      hideSortIcon
      horizontalAlign={header.header.id === "progress" ? "right" : "left"}
    >
      {header.header.isPlaceholder ? "" : name}
    </CellHeader>
  );
}

function createBodyCell(info: CellContext<Person, unknown>) {
  return (
    <CellBasic
      primaryText={info.getValue() as string}
      shouldShowTooltipOnHover={false}
    />
  );
}

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => createBodyCell(info),
    header: (header) => createHeaderCell(header, "First Name"),
  }),
  columnHelper.accessor("lastName", {
    cell: (info) => createBodyCell(info),
    header: (header) => createHeaderCell(header, "Last Name"),
  }),
  columnHelper.accessor("age", {
    cell: (info) => (
      <CellBasic
        key={info.cell.id}
        primaryText={info.cell.getValue().toString()}
        secondaryText={info.cell.row.original.birthdate}
        tooltipProps={{
          sdsStyle: "dark",
          leaveTouchDelay: 0,
          leaveDelay: 0,
          subtitle: "",
          title: info.cell.row.original.birthdate,
        }}
      />
    ),
    header: (header) => createHeaderCell(header, "Age"),
  }),
  columnHelper.accessor("visits", {
    cell: (info) => createBodyCell(info),
    header: (header) => createHeaderCell(header, "Visits"),
  }),
  columnHelper.accessor("status", {
    cell: (info) => (
      <CellComponent verticalAlign="center" key={info.cell.id}>
        <Tag
          label={info.cell.getValue() as string}
          color={
            info.cell.getValue() === "Single"
              ? "notice"
              : info.cell.getValue() === "In Relationship"
              ? "positive"
              : "negative"
          }
          sdsStyle="rounded"
          sdsType="secondary"
          hover={false}
        />
      </CellComponent>
    ),
    header: (header) => createHeaderCell(header, "Status"),
  }),
  columnHelper.accessor("progress", {
    cell: (info) => (
      <CellBasic
        key={info.cell.id}
        primaryText={info.cell.getValue().toString()}
        secondaryText={`${info.cell.getValue()} ± 5%`}
        horizontalAlign="right"
        tooltipProps={{
          sdsStyle: "dark",
          leaveTouchDelay: 0,
          leaveDelay: 0,
          title: `Profile Progress`,
        }}
      />
    ),
    header: (header) => createHeaderCell(header, "Profile Progress"),
  }),
];

function App() {
  const [data] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="app">
      <Table>
        <TableHeader>
          {table.getFlatHeaders().map((header) => (
            <React.Fragment key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </React.Fragment>
          ))}
        </TableHeader>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <React.Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;

```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Table</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### Table with virtualized rows

This example showcases a `Table` that implements virtualization for its rows, optimizing performance and rendering efficiency when dealing with a large amount of data.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  position: relative;
  padding: 10px;
  width: 95%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  height: 350px;
  overflow: auto;
}

thead {
  background: white;
  box-shadow: 0 0 10px #ccc;
  margin: 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.fetched {
  font-size: 18px;
  padding: 25px 35px;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 5px;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.3);
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  ColumnSort,
  useReactTable,
  HeaderContext,
  CellContext,
} from "@tanstack/react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtual } from "react-virtual";
import {
  CellBasic,
  CellHeader,
  CellHeaderDirection,
  Table,
  TableHeader,
  TableRow,
  Tag,
  CellComponent,
} from "@czi-sds/components";
import { faker } from "@faker-js/faker";
import "./styles.css";

const fetchSize = 20;

type Person = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  status: "relationship" | "complicated" | "single";
};

type PersonApiResponse = {
  data: Person[];
  meta: {
    totalRowCount: number;
  };
};

const newPerson = (index: number): Person => {
  return {
    id: index + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    status: faker.helpers.shuffle<Person["status"]>([
      "relationship",
      "complicated",
      "single",
    ])[0]!,
  };
};

function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return [...Array(len)].map((_, d): Person => {
      return {
        ...newPerson(d),
      };
    });
  };

  return makeDataLevel();
}

const data = makeData(1000);

//simulates a backend api
const fetchData = (start: number, size: number, sorting: SortingState) => {
  const dbData = [...data];
  if (sorting.length) {
    const sort = sorting[0] as ColumnSort;
    const { id, desc } = sort as { id: keyof Person; desc: boolean };
    dbData.sort((a, b) => {
      if (desc) {
        return a[id] < b[id] ? 1 : -1;
      }
      return a[id] > b[id] ? 1 : -1;
    });
  }

  return {
    data: dbData.slice(start, start + size),
    meta: {
      totalRowCount: dbData.length,
    },
  };
};

function createHeaderCell(cell: HeaderContext<Person, unknown>, name: string) {
  return (
    <CellHeader
      direction={
        cell.header.column.getIsSorted()
          ? (cell.header.column.getIsSorted() as CellHeaderDirection)
          : undefined
      }
      active={!!cell.header.column.getIsSorted()}
      onClick={cell.header.column.getToggleSortingHandler()}
    >
      {name}
    </CellHeader>
  );
}

function createBodyCell(info: CellContext<Person, unknown>) {
  return (
    <CellBasic
      primaryText={info.getValue() as string}
      shouldShowTooltipOnHover={false}
    />
  );
}

function App() {
  //we need a reference to the scrolling element for logic down below
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "id",
        cell: (info) => createBodyCell(info),
        header: (info) => createHeaderCell(info, "ID"),
      },
      {
        accessorKey: "firstName",
        cell: (info) => createBodyCell(info),
        header: (info) => createHeaderCell(info, "First Name"),
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => createBodyCell(info),
        header: (info) => createHeaderCell(info, "Last Name"),
      },
      {
        accessorKey: "age",
        cell: (info) => createBodyCell(info),
        header: (info) => createHeaderCell(info, "Age"),
      },
      {
        accessorKey: "status",
        header: (info) => createHeaderCell(info, "Status"),
        cell: (info) => {
          return (
            <CellComponent verticalAlign="center" key={info.cell.id}>
              <Tag
                label={info.cell.getValue() as string}
                color={
                  info.cell.getValue() === "single"
                    ? "notice"
                    : info.cell.getValue() === "relationship"
                    ? "positive"
                    : "negative"
                }
                sdsStyle="rounded"
                sdsType="secondary"
                hover={false}
              />
            </CellComponent>
          );
        },
      },
    ],
    []
  );

  //react-query has an useInfiniteQuery hook just for this situation!
  const { data, fetchNextPage, isFetching, isLoading } =
    useInfiniteQuery<PersonApiResponse>(
      ["table-data", sorting], //adding sorting state as key causes table to reset and fetch from new beginning upon sort
      async ({ pageParam = 0 }) => {
        const start = pageParam * fetchSize;
        const fetchedData = fetchData(start, fetchSize, sorting); //pretend api call
        return fetchedData;
      },
      {
        getNextPageParam: (_lastGroup, groups) => groups.length,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
      }
    );

  //we must flatten the array of arrays from the useInfiniteQuery hook
  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );
  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = flatData.length;

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = React.useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

        //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
        if (
          scrollHeight - scrollTop - clientHeight < 300 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  //a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  React.useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const table = useReactTable({
    data: flatData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();

  //Virtualizing is optional, but might be necessary if we are going to potentially have hundreds or thousands of rows
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="app">
      <div
        className="container"
        onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
        ref={tableContainerRef}
      >
        <Table>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeader key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <React.Fragment key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </React.Fragment>
              ))}
            </TableHeader>
          ))}
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<Person>;
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <React.Fragment key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </React.Fragment>
                  ))}
                </TableRow>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="fetched">
        Fetched {flatData.length} of {totalDBRowCount} Rows.
      </div>
    </div>
  );
}

export default App;

```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Table</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### Editable Table Cells with Access to Internal Data

This example demonstrates how to access the internal data management state in a `Table`. Table cells are **Editable**, click on a cell to start editing (Changes will apply on blur!)

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 20px;
  width: 90%;
  margin: auto;
}

.actions {
  margin: 20px 0;
}

.log {
  margin: 20px 0;
  padding: 0 15px;
  border: solid 1px #eee;
}

.log pre {
  font-family: "Courier New", Courier, monospace;
  font-size: 11px;
  word-break: break-word;
}

.editable-input {
  background-color: transparent;
  border: none;
  outline: none;
}

```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import React from "react";
import {
  CellBasic,
  CellHeader,
  TableHeader,
  TableRow,
  Table,
  Button,
  Icon,
  getSemanticColors,
} from "@czi-sds/components";
import {
  CellContext,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";
import { useTheme } from "@mui/material";
import { faker } from "@faker-js/faker";
import "./styles.css";

type StatusTypes = "relationship" | "complicated" | "single";

type Person = {
  [key: string]: unknown;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: StatusTypes;
  subRows?: Person[];
};

const newPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<Person["status"]>([
      "relationship",
      "complicated",
      "single",
    ])[0]!,
  };
};

function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return [...Array(len)].map((): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: TData) => void;
  }
}

const CellEditor = (cell: CellContext<Person, unknown>) => {
  const theme = useTheme();
  const semanticColors = getSemanticColors({theme});
  
  const initialValue = cell.getValue();
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    cell.table.options.meta?.updateData(cell.row.index, cell.column.id, value as Person);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      className="editable-input"
      value={value as string}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      style={{ color: semanticColors?.base?.textPrimary }}
    />
  );
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<Person>> = {
  cell: CellEditor,
};

const defaultColumns: ColumnDef<Person>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "visits",
    header: "Visits",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "progress",
    header: "Profile Progress",
  },
];

function App() {
  const [log, setLog] = React.useState("");
  const [data, setData] = React.useState(() => makeData(3));
  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ]);

  // Create the table and pass your options
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData(
          (
            old: Person[] // Specify the type of 'old' as Person[]
          ) =>
            old.map((row, index) => {
              if (index === rowIndex) {
                const oldValue = row[columnId]; // No need for type assertion
                setLog(
                  `Row index: ${rowIndex}\nColumn Id: ${columnId}\nOld value: ${oldValue}\nNew value: ${value}`
                );
                return {
                  ...row,
                  [columnId]: value,
                };
              }
              return row;
            })
        );
      },
    },
  });

  // Manage your own state
  const [state, setState] = React.useState(table.initialState);

  // Change table data
  const changeTableData = () => {
    setData(() => makeData(5));
    setLog("");
  };

  // Override the state managers for the table to your own
  table.setOptions((prev) => ({
    ...prev,
    state,
    onStateChange: setState,
    // These are just table options, so if things
    // need to change based on your state, you can
    // derive them here
  }));

  return (
    <div className="app">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) =>
            headerGroup.headers.map((header) => (
              <CellHeader key={header.id} hideSortIcon>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </CellHeader>
            ))
          )}
        </TableHeader>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <CellBasic
                  key={cell.id}
                  primaryText={
                    flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    ) as string
                  }
                  shouldShowTooltipOnHover={false}
                />
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>

      <div className="actions">
        <Button
          startIcon={<Icon sdsIcon="refresh" sdsSize="s" sdsType="button" />}
          sdsStyle="rounded"
          sdsType="primary"
          onClick={changeTableData}
        >
          Change table data
        </Button>
      </div>

      {log && (
        <div className="log">
          <h4>Cell Value Update Log:</h4>
          <pre>{log}</pre>
        </div>
      )}

      {data && (
        <div className="log">
          <h4>Table data:</h4>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Table</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### Table with Front-End Pagination

This example uses front-end `Pagination` to show table data in multiple pages.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 16px;
}

button {
  outline: none !important;
}

#pagination-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding: 15px 0;
}
```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import React from "react";
import {
  CellBasic,
  CellHeader,
  TableHeader,
  TableRow,
  Table,
  CellHeaderDirection,
  CellComponent,
  Tag,
  Pagination,
} from "@czi-sds/components";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  PaginationState,
  HeaderContext,
  CellContext,
} from "@tanstack/react-table";
import { faker } from "@faker-js/faker";
import "./styles.css";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
};

const newPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(96),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<Person["status"]>([
      "relationship",
      "complicated",
      "single",
    ])[0]!,
  };
};

function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return [...Array(len)].map((): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

function App() {
  const DATA_COUNT = 99;
  const PAGE_SIZE = 3;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const data = React.useState(() => makeData(DATA_COUNT))[0];

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: PAGE_SIZE,
    });

  function createHeaderCell(
    header: HeaderContext<Person, unknown>,
    name: string
  ) {
    return (
      <CellHeader
        key={header.header.id}
        colSpan={header.header.colSpan}
        direction={
          header.column.getIsSorted()
            ? (header.column.getIsSorted() as CellHeaderDirection)
            : undefined
        }
        active={!!header.column.getIsSorted()}
        onClick={header.column.getToggleSortingHandler()}
        horizontalAlign={header.header.id === "createdAt" ? "right" : "left"}
        shouldShowTooltipOnHover={true}
        tooltipText={name}
        tooltipProps={{
          enterDelay: 2000,
          enterNextDelay: 2000,
        }}
      >
        {name}
      </CellHeader>
    );
  }

  function createBodyCell(cell: CellContext<Person, unknown>) {
    return (
      <CellBasic
        key={cell.cell.id}
        primaryText={cell.getValue() as string}
        horizontalAlign={cell.column.id === "progress" ? "center" : "left"}
        verticalAlign="center"
        shouldShowTooltipOnHover={true}
      />
    );
  }

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        cell: (cell) => createBodyCell(cell),
        header: (header) => createHeaderCell(header, "First Name"),
      },
      {
        accessorKey: "lastName",
        cell: (cell) => createBodyCell(cell),
        header: (header) => createHeaderCell(header, "Last Name"),
      },
      {
        accessorKey: "age",
        cell: (cell) => createBodyCell(cell),
        header: (header) => createHeaderCell(header, "Age"),
      },
      {
        accessorKey: "visits",
        cell: (cell) => createBodyCell(cell),
        header: (header) => createHeaderCell(header, "Visits"),
      },
      {
        accessorKey: "status",
        cell: (cell) => (
          <CellComponent key={cell.cell.id} verticalAlign="center">
            <Tag
              label={cell.getValue() as string}
              color={
                cell.cell.getValue() === "single"
                  ? "notice"
                  : cell.cell.getValue() === "relationship"
                  ? "positive"
                  : "negative"
              }
              sdsStyle="rounded"
              sdsType="secondary"
            />
          </CellComponent>
        ),
        header: (header) => createHeaderCell(header, "Status"),
      },
      {
        accessorKey: "progress",
        cell: (cell) => createBodyCell(cell),
        header: (header) => createHeaderCell(header, "Profile Progress"),
      },
    ],
    []
  );

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <div className="app">
      <Table>
        <TableHeader>
          {table.getFlatHeaders().map((header) => (
            <React.Fragment key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </React.Fragment>
          ))}
        </TableHeader>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <React.Fragment key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </React.Fragment>
                ))}
              </TableRow>
            );
          })}
        </tbody>
      </Table>
      <div id="pagination-wrapper">
        <Pagination
          sdsStyle="round"
          pageSize={table.getState().pagination.pageSize}
          onPageChange={(page: number) => {
            table.setPageIndex(page - 1);
          }}
          onNextPage={() => table.nextPage()}
          onPreviousPage={() => table.previousPage()}
          totalCount={DATA_COUNT}
          siblingCount={1}
          currentPage={table.getState().pagination.pageIndex + 1}
          truncateDropdown
        />
      </div>
    </div>
  );
}

export default App;

```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Table</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

#### Table with Back-End Pagination

This example illustrates a `Table` that implements back-end pagination by utilizing mocked data retrieved through a query function built with the `react-query` package.

**/styles.css**

```css
body {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08px;
  line-height: 20px;
  text-transform: none;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.app {
  padding: 16px;
}

button {
  outline: none !important;
}

#pagination-wrapper {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.table-data-loading {
  display: flex;
  align-items: center;
}

.table-data-loading small {
  font-size: 12px;
  padding-left: 5px;
  color: #888;
}

```

**tsconfig.json**

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}
```

**/App.tsx**

```tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CellBasic,
  CellHeader,
  TableHeader,
  TableRow,
  Table,
  CellHeaderDirection,
  CellComponent,
  Tag,
  Pagination,
  Icon,
} from "@czi-sds/components";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  PaginationState,
  CellContext,
  HeaderContext,
} from "@tanstack/react-table";
import "./styles.css";
import { styled } from "@mui/material";
import { faker } from "@faker-js/faker";

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
};

const DATA_COUNT = 198;

const newPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<Person["status"]>([
      "relationship",
      "complicated",
      "single",
    ])[0]!,
  };
};

function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return [...Array(len)].map((): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

const data = makeData(DATA_COUNT);

async function fetchData(options: { pageIndex: number; pageSize: number }) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500));

  return {
    rows: data.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: Math.ceil(data.length / options.pageSize),
  };
}

function App() {
  const PAGE_SIZE = 3;
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: PAGE_SIZE,
    });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  };

  const dataQuery = useQuery(
    ["data", fetchDataOptions],
    () => fetchData(fetchDataOptions),
    { keepPreviousData: true }
  );

  const defaultData = React.useMemo(() => [], []);

  function createHeaderCell(
    header: HeaderContext<Person, unknown>,
    name: string
  ) {
    return (
      <CellHeader
        key={header.header.id}
        colSpan={header.header.colSpan}
        direction={
          header.column.getIsSorted()
            ? (header.column.getIsSorted() as CellHeaderDirection)
            : undefined
        }
        active={!!header.column.getIsSorted()}
        onClick={header.column.getToggleSortingHandler()}
        horizontalAlign={header.header.id === "createdAt" ? "right" : "left"}
        shouldShowTooltipOnHover={true}
        tooltipText={name}
        tooltipProps={{
          enterDelay: 2000,
          enterNextDelay: 2000,
        }}
      >
        {name}
      </CellHeader>
    );
  }

  function createBodyCell(cell: CellContext<Person, unknown>) {
    return (
      <CellBasic
        key={cell.cell.id}
        primaryText={cell.getValue() as string}
        horizontalAlign={cell.column.id === "progress" ? "center" : "left"}
        verticalAlign="center"
        shouldShowTooltipOnHover={true}
      />
    );
  }

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        cell: (cell) => createBodyCell(cell),
        header: (header) => createHeaderCell(header, "First Name"),
      },
      {
        accessorKey: "lastName",
        cell: (cell) => createBodyCell(cell),
        header: (header) => createHeaderCell(header, "Last Name"),
      },
      {
        accessorKey: "age",
        cell: (cell) => createBodyCell(cell),
        header: (header) => createHeaderCell(header, "Age"),
      },
      {
        accessorKey: "visits",
        cell: (cell) => createBodyCell(cell),
        header: (header) => createHeaderCell(header, "Visits"),
      },
      {
        accessorKey: "status",
        cell: (cell) => (
          <CellComponent key={cell.cell.id} verticalAlign="center">
            <Tag
              label={cell.getValue() as string}
              color={
                cell.cell.getValue() === "single"
                  ? "notice"
                  : cell.cell.getValue() === "relationship"
                  ? "positive"
                  : "negative"
              }
              sdsStyle="rounded"
              sdsType="secondary"
            />
          </CellComponent>
        ),
        header: (header) => createHeaderCell(header, "Status"),
      },
      {
        accessorKey: "progress",
        cell: (cell) => createBodyCell(cell),
        header: (header) => createHeaderCell(header, "Profile Progress"),
      },
    ],
    []
  );

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    autoResetAll: false,
    debugTable: true,
  });

  const StyledTableBody = styled("tbody")`
    ${dataQuery.isFetching ? `opacity: .3; filter: grayscale(1)` : null}
  `;

  return (
    <div className="app">
      <Table>
        <TableHeader>
          {table.getFlatHeaders().map((header) => (
            <React.Fragment key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </React.Fragment>
          ))}
        </TableHeader>
        <StyledTableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <React.Fragment key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </React.Fragment>
                ))}
              </TableRow>
            );
          })}
        </StyledTableBody>
      </Table>
      <div id="pagination-wrapper">
        <Pagination
          sdsStyle="round"
          pageSize={table.getState().pagination.pageSize}
          onPageChange={(page: number) => {
            table.setPageIndex(page - 1);
          }}
          onNextPage={() => table.nextPage()}
          onPreviousPage={() => table.previousPage()}
          totalCount={DATA_COUNT}
          siblingCount={1}
          currentPage={table.getState().pagination.pageIndex + 1}
          truncateDropdown
        />
        {dataQuery.isFetching ? (
          <div className="table-data-loading">
            <Icon sdsIcon="Loading" sdsSize="l" sdsType="static" />
            <small> Fetching Table Data ...</small>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;

```

**/index.tsx**

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Theme } from "@czi-sds/components";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const queryClient = new QueryClient();

const RootApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? Theme("dark") : Theme("light");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <App />
          </QueryClientProvider>
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

```

**/public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Table</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

**/package.json**

```json
{"dependencies":{"react":"^18.0.0","react-dom":"^18.0.0","react-scripts":"^4.0.0"},"devDependencies":{"@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.0.0"},"main":"/index.tsx"}
```

---

