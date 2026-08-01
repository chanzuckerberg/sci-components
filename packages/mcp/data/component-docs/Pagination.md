# Pagination

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Pagination/index.tsx).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name             | Type                    | Default | Description                                                                                                                                                                      |
| ---------------- | ----------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onPageChange     | (page: number) => void; | -       | A callback function triggered when the page number is changed.                                                                                                                   |
| onNextPage       | () => void;             | -       | A callback function triggered when the "Next" page button is clicked.                                                                                                            |
| onPreviousPage   | () => void;             | -       | A callback function triggered when the "Previous" page button is clicked.                                                                                                        |
| currentPage      | number                  | -       | Required. The page to mark as current, counted from 1. Pagination keeps no page state of its own.                                                                                |
| pageSize         | number                  | -       | Required. How many items fit on a page, which together with totalCount gives the number of pages. Must be at least 1; a smaller value throws.                                    |
| totalCount       | number                  | -       | Required. Total number of items being paged through — the whole set, not the current page.                                                                                       |
| siblingCount     | number                  | 1       | How many page numbers to keep on each side of the current page before the rest collapse into an ellipsis.                                                                        |
| sdsStyle         | "round" \| "square"     | "round" | Whether the page and chevron targets are circles or rounded squares.                                                                                                             |
| truncateDropdown | boolean                 | true    | When true the ellipsis is a menu of the pages it stands for. When false it is a disabled placeholder, and those pages can only be reached by stepping through with the chevrons. |

Pagination is always controlled: it reports what was clicked and renders whatever currentPage you hand back. It renders nothing at all when currentPage is 0 or when there are fewer than two pages to show.

## Code examples

### **Default Pagination**

This example showcases a Pagination component with the minimum required props.

**Example: DefaultPagination**

```tsx
import { Pagination } from "@czi-sds/components";
import { useState } from "react";

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
