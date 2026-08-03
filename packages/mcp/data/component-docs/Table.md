# Table

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Table/index.tsx).

## Import

**React TypeScript**

```tsx
import { Table } from "@czi-sds/components";
```

## Code examples

### **Default Table**

This example demonstrates a Table that utilizes all SDS Table-related components, providing a comprehensive showcase of their functionalities and features.

**Example: DefaultTable**

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
  TableHeader,
  SdsTagColorType,
} from "@czi-sds/components";
import { styled, RadioGroup, FormControlLabel } from "@mui/material";

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
          {/* hover is what puts the sort chevron in the DOM; without it a header
              is inert and shows no sorting affordance at all. */}
          <CellHeader active hover>
            Active Header
          </CellHeader>
          <CellHeader hover>
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
                <Icon sdsSize="xl" sdsIcon="Flask" />
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
              {["info", "notice", "beta", "negative", "positive"].map(
                (item) => (
                  <Tag
                    key={item}
                    color={item as SdsTagColorType}
                    label={item as string}
                    sdsStyle="rounded"
                    sdsType="secondary"
                  />
                )
              )}
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
                <Icon sdsSize="xl" sdsIcon="Download" />
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
                <Icon sdsSize="xl" sdsIcon="Bacteria" />
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
              <Icon sdsSize="l" sdsIcon="Virus" />
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

## Recipes

These recipes show a few of the more complex approaches available for customizing Tables.

**Note:** The Table components are presentational: they render the markup and the styling, and leave sorting, filtering and paging to whatever manages your data. The recipes below use [TanStack Table](https://tanstack.com/table/latest) for that, as does PreComposedTable internally, and two of them add [TanStack Query](https://tanstack.com/query/latest) and [TanStack Virtual](https://tanstack.com/virtual/latest) for fetching and virtualization. None of them ship with SDS. Install the ones you need alongside it.

### Text-only Table

A table made up entirely of CellBasics, with headers that sort nothing and so set `hideSortIcon`.

**Example: TextOnlyTable**

```tsx
import * as React from "react";
import {
  CellBasic,
  CellHeader,
  TableHeader,
  TableRow,
  Table,
} from "@czi-sds/components";

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

```css
.app {
  padding: 20px;
  width: 90%;
  margin: auto;
}
```

### Table with a custom sorting function

Every column here sorts on click through TanStack Table's own comparators, except Last Name, which is given a `sortingFn` of its own that orders names by length rather than alphabetically. Note that each sortable header sets `hover`, without which CellHeader draws no sort chevron.

**Example: TableWithCustomSorting**

```tsx
// Sorting is TanStack Table's job, not the Table component's: the header cell only
// draws the state it is handed. active turns on the accent styling, direction picks
// the chevron, and onClick is wired to the column's own toggle handler.
//
// CellHeader draws its sort icon and its tooltip only while hover is true, so every
// sortable header below sets it. Without it the header sorts on click but never
// shows a chevron.
//
// The Last Name column sorts by string length instead of alphabetically, which is
// all a custom sortingFn is: a comparator handed to the column.

import {
  Button,
  CellBasic,
  CellComponent,
  CellHeader,
  Icon,
  Table,
  TableHeader,
  TableRow,
  Tag,
  getSpaces,
  type CellHeaderDirection,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { faker } from "@faker-js/faker";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type CellContext,
  type ColumnDef,
  type HeaderContext,
  type Row,
  type SortingState,
} from "@tanstack/react-table";
import * as React from "react";

type Person = {
  age: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  status: "relationship" | "complicated" | "single";
};

const STATUSES: Person["status"][] = ["relationship", "complicated", "single"];

const STATUS_COLORS = {
  complicated: "negative",
  relationship: "positive",
  single: "notice",
} as const;

function makeData(count: number): Person[] {
  return Array.from({ length: count }, () => ({
    age: faker.number.int({ max: 96, min: 18 }),
    createdAt: faker.date.between({
      from: new Date("2001-01-01"),
      to: new Date(),
    }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    status: faker.helpers.shuffle(STATUSES)[0]!,
  }));
}

const ActionList = styled.ul<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      gap: ${spaces?.xxs}px;
      justify-content: flex-end;
      list-style: none;
      margin: 0;
      padding: 0;
    `;
  }}
`;

const ACTIONS = [
  { icon: "TreeHorizontal", label: "View lineage" },
  { icon: "BarChartVertical3", label: "View chart" },
  { icon: "Download", label: "Download" },
  { icon: "DotsHorizontal", label: "More actions" },
] as const;

function sortableHeader(header: HeaderContext<Person, unknown>, name: string) {
  const sorted = header.column.getIsSorted();

  return (
    <CellHeader
      active={!!sorted}
      colSpan={header.header.colSpan}
      direction={sorted ? (sorted as CellHeaderDirection) : undefined}
      hover
      onClick={header.column.getToggleSortingHandler()}
    >
      {name}
    </CellHeader>
  );
}

function textCell(cell: CellContext<Person, unknown>) {
  return (
    <CellBasic
      primaryText={String(cell.getValue())}
      shouldShowTooltipOnHover={false}
      verticalAlign="center"
    />
  );
}

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "firstName",
    cell: (cell) => (
      <CellBasic
        icon={<Icon sdsIcon="Person" sdsSize="s" />}
        iconVerticalAlign="center"
        primaryText={cell.getValue() as string}
        shouldShowTooltipOnHover={false}
        verticalAlign="center"
      />
    ),
    header: (header) => sortableHeader(header, "First Name"),
  },
  {
    accessorKey: "lastName",
    cell: textCell,
    header: (header) => {
      const sorted = header.column.getIsSorted();

      return (
        <CellHeader
          active={!!sorted}
          colSpan={header.header.colSpan}
          direction={sorted ? (sorted as CellHeaderDirection) : undefined}
          hover
          onClick={header.column.getToggleSortingHandler()}
          shouldShowTooltipOnHover
          tooltipText="This column uses a custom sorting function."
          tooltipSubtitle="Sorts names by how long they are."
        >
          Last Name
        </CellHeader>
      );
    },
    sortingFn: (rowA: Row<Person>, rowB: Row<Person>, columnId: string) => {
      const a = rowA.getValue<string>(columnId).length;
      const b = rowB.getValue<string>(columnId).length;

      return a === b ? 0 : a > b ? 1 : -1;
    },
  },
  {
    accessorKey: "age",
    cell: textCell,
    header: (header) => sortableHeader(header, "Age"),
  },
  {
    accessorKey: "status",
    cell: (cell) => {
      const status = cell.getValue() as Person["status"];

      return (
        <CellComponent verticalAlign="center">
          <Tag
            color={STATUS_COLORS[status]}
            hover={false}
            label={status}
            sdsStyle="rounded"
            sdsType="secondary"
          />
        </CellComponent>
      );
    },
    header: (header) => sortableHeader(header, "Status"),
  },
  {
    accessorKey: "createdAt",
    cell: (cell) => {
      const createdAt = cell.getValue() as Date;

      return (
        <CellBasic
          primaryText={createdAt.getFullYear().toString()}
          secondaryText={createdAt.toLocaleString("en-us", {
            day: "numeric",
            month: "long",
          })}
          tooltipProps={{ title: createdAt.toLocaleString("en-us") }}
          verticalAlign="center"
        />
      );
    },
    header: (header) => sortableHeader(header, "Created At"),
  },
  {
    accessorKey: "actions",
    cell: () => (
      <CellComponent horizontalAlign="right" verticalAlign="center">
        <ActionList>
          {ACTIONS.map((action) => (
            <li key={action.icon}>
              <Button
                aria-label={action.label}
                sdsStyle="minimal"
                sdsType="secondary"
              >
                <Icon sdsIcon={action.icon} sdsSize="s" />
              </Button>
            </li>
          ))}
        </ActionList>
      </CellComponent>
    ),
    enableSorting: false,
    header: () => (
      <CellHeader hideSortIcon horizontalAlign="right">
        Actions
      </CellHeader>
    ),
    id: "actions",
  },
];

function App() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [data] = React.useState(() => makeData(10));

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
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

### Table with custom Tooltips

This shows a Table with custom Tooltips.

**Example: TableWithCustomTooltips**

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

```css
.app {
  padding: 16px;
}
```

### Table with virtualized rows

A thousand rows in a scroll container with only the visible ones in the DOM, using `@tanstack/react-virtual` to decide which rows to draw and `@tanstack/react-query` to fetch the next batch as the scroller nears its end. The spacer rows above and below the window are what keep the scrollbar proportional.

**Example: TableWithVirtualizedRows**

```tsx
// A thousand rows behind a scroll container, with only the visible ones in the DOM.
// Two libraries do the work: @tanstack/react-virtual measures the scroller and
// reports which rows to draw, and @tanstack/react-query fetches the next batch as
// the scroller nears its end. The Table components themselves are unchanged: the
// spacer rows above and below the window are what keep the scrollbar honest.
//
// estimateSize has to be close to a real row's height or the scrollbar drifts as it
// measures; an SDS row of single-line CellBasics is about 45px.
//
// react-query needs a QueryClientProvider above anything that queries, which in an
// application belongs near the root rather than inside a component like this.

import {
  CellBasic,
  CellComponent,
  CellHeader,
  Table,
  TableHeader,
  TableRow,
  Tag,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CellHeaderDirection,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { faker } from "@faker-js/faker";
import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type CellContext,
  type ColumnDef,
  type HeaderContext,
  type SortingState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import * as React from "react";

const FETCH_SIZE = 25;
const ROW_HEIGHT = 48;

type Person = {
  age: number;
  firstName: string;
  id: number;
  lastName: string;
  status: "relationship" | "complicated" | "single";
};

const STATUSES: Person["status"][] = ["relationship", "complicated", "single"];

const STATUS_COLORS = {
  complicated: "negative",
  relationship: "positive",
  single: "notice",
} as const;

const ROWS: Person[] = Array.from({ length: 1000 }, (_unused, index) => ({
  age: faker.number.int({ max: 80, min: 18 }),
  firstName: faker.person.firstName(),
  id: index + 1,
  lastName: faker.person.lastName(),
  status: faker.helpers.shuffle(STATUSES)[0]!,
}));

type RowPage = {
  rows: Person[];
  totalRowCount: number;
};

// Stands in for a paginated endpoint: sorts the whole set, then returns one slice.
async function fetchRows(
  start: number,
  size: number,
  sorting: SortingState
): Promise<RowPage> {
  const rows = [...ROWS];
  const sort = sorting[0];

  if (sort) {
    const key = sort.id as keyof Person;
    rows.sort((a, b) => {
      if (a[key] === b[key]) return 0;
      const ascending = a[key] > b[key] ? 1 : -1;
      return sort.desc ? -ascending : ascending;
    });
  }

  return {
    rows: rows.slice(start, start + size),
    totalRowCount: rows.length,
  };
}

const Scroller = styled.div<CommonThemeProps>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      border: 1px solid ${semanticColors?.base?.divider};
      height: 400px;
      overflow: auto;

      /* The header has to be pinned by hand; the Table components do not do it. */
      thead th {
        background: ${semanticColors?.base?.backgroundPrimary};
        position: sticky;
        top: 0;
        z-index: 1;
      }
    `;
  }}
`;

const Readout = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: ${spaces?.s}px 0 0;
    `;
  }}
`;

function sortableHeader(header: HeaderContext<Person, unknown>, name: string) {
  const sorted = header.column.getIsSorted();

  return (
    <CellHeader
      active={!!sorted}
      direction={sorted ? (sorted as CellHeaderDirection) : undefined}
      hover
      onClick={header.column.getToggleSortingHandler()}
    >
      {name}
    </CellHeader>
  );
}

function textCell(cell: CellContext<Person, unknown>) {
  return (
    <CellBasic
      primaryText={String(cell.getValue())}
      shouldShowTooltipOnHover={false}
      verticalAlign="center"
    />
  );
}

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "id",
    cell: textCell,
    header: (header) => sortableHeader(header, "ID"),
  },
  {
    accessorKey: "firstName",
    cell: textCell,
    header: (header) => sortableHeader(header, "First Name"),
  },
  {
    accessorKey: "lastName",
    cell: textCell,
    header: (header) => sortableHeader(header, "Last Name"),
  },
  {
    accessorKey: "age",
    cell: textCell,
    header: (header) => sortableHeader(header, "Age"),
  },
  {
    accessorKey: "status",
    cell: (cell) => {
      const status = cell.getValue() as Person["status"];

      return (
        <CellComponent verticalAlign="center">
          <Tag
            color={STATUS_COLORS[status]}
            hover={false}
            label={status}
            sdsStyle="rounded"
            sdsType="secondary"
          />
        </CellComponent>
      );
    },
    header: (header) => sortableHeader(header, "Status"),
  },
];

function VirtualizedTable() {
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Sorting is part of the query key, so changing it starts the list over.
  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery({
    getNextPageParam: (_lastPage: RowPage, pages: RowPage[]) => pages.length,
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchRows(pageParam * FETCH_SIZE, FETCH_SIZE, sorting),
    queryKey: ["virtualized-table-rows", sorting],
  });

  const rows = React.useMemo(
    () => data?.pages.flatMap((page) => page.rows) ?? [],
    [data]
  );
  const totalRowCount = data?.pages[0]?.totalRowCount ?? 0;

  const table = useReactTable({
    columns,
    data: rows,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    onSortingChange: setSorting,
    state: { sorting },
  });
  const tableRows = table.getRowModel().rows;

  const virtualizer = useVirtualizer({
    count: tableRows.length,
    estimateSize: () => ROW_HEIGHT,
    getScrollElement: () => scrollerRef.current,
    overscan: 10,
  });
  const virtualRows = virtualizer.getVirtualItems();
  const paddingTop = virtualRows[0]?.start ?? 0;
  const paddingBottom =
    virtualizer.getTotalSize() -
    (virtualRows[virtualRows.length - 1]?.end ?? 0);

  const fetchMoreOnBottomReached = React.useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || isFetching || rows.length >= totalRowCount) return;

    const remaining =
      scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
    if (remaining < 300) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetching, rows.length, totalRowCount]);

  // The first batch may not fill the scroller, in which case no scroll event fires.
  React.useEffect(fetchMoreOnBottomReached, [fetchMoreOnBottomReached]);

  if (isLoading) return <p>Loading…</p>;

  return (
    <>
      <Scroller onScroll={fetchMoreOnBottomReached} ref={scrollerRef}>
        <Table>
          <TableHeader>
            {table.getFlatHeaders().map((header) => (
              <React.Fragment key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </React.Fragment>
            ))}
          </TableHeader>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td colSpan={columns.length} style={{ height: paddingTop }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = tableRows[virtualRow.index]!;

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
                <td
                  colSpan={columns.length}
                  style={{ height: paddingBottom }}
                />
              </tr>
            )}
          </tbody>
        </Table>
      </Scroller>

      <Readout>
        Showing {virtualRows.length} of {rows.length} loaded rows, out of{" "}
        {totalRowCount}. Scroll to load more.
      </Readout>
    </>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <VirtualizedTable />
      </QueryClientProvider>
    </div>
  );
}

export default App;
```

### Editable Table Cells with Access to Internal Data

Editing reaches the data above the table through TanStack Table's `meta` object. Click a cell to edit it; the change is written back on blur, and the log below records what moved. Note that the editable cells are CellComponents rather than CellBasics, since CellBasic renders text rather than `children`.

**Example: TableWithEditableCells**

```tsx
// Editing goes through TanStack Table's meta object, which is the supported way to
// reach application state from inside a cell renderer. Each cell keeps the value
// being typed in its own state and calls meta.updateData on blur; the table itself
// stays a pure view of the data above it.
//
// An interactive cell belongs in a CellComponent, not a CellBasic: CellBasic takes
// text through primaryText and renders it as text, while CellComponent takes
// children.

import {
  Button,
  CellComponent,
  CellHeader,
  Icon,
  Table,
  TableHeader,
  TableRow,
  fontBodyS,
  fontBodyXs,
  fontHeaderS,
  getCorners,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { faker } from "@faker-js/faker";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type CellContext,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table";
import * as React from "react";

type Person = {
  age: number;
  firstName: string;
  lastName: string;
  status: string;
  visits: number;
};

// Declaring the meta shape is what types table.options.meta at the call site. The
// type parameter is unused here but has to match TanStack's own declaration.
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: string) => void;
  }
}

function makeData(count: number): Person[] {
  return Array.from({ length: count }, () => ({
    age: faker.number.int({ max: 80, min: 18 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    status: faker.helpers.shuffle([
      "relationship",
      "complicated",
      "single",
    ])[0]!,
    visits: faker.number.int(1000),
  }));
}

const EditableInput = styled.input<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const corners = getCorners(props);
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      background: transparent;
      border: 1px solid transparent;
      border-radius: ${corners?.m}px;
      color: ${semanticColors?.base?.textPrimary};
      padding: ${spaces?.xxs}px ${spaces?.xs}px;
      width: 100%;

      &:hover {
        border-color: ${semanticColors?.base?.borderPrimary};
      }

      &:focus {
        border-color: ${semanticColors?.accent?.borderSelected};
        outline: none;
      }
    `;
  }}
`;

const Toolbar = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      margin-top: ${spaces?.l}px;
    `;
  }}
`;

const Log = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      margin-top: ${spaces?.l}px;
    `;
  }}
`;

const LogTitle = styled.h4<CommonThemeProps>`
  ${fontHeaderS}
  margin: 0;
`;

const LogBody = styled.pre<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const corners = getCorners(props);
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      background: ${semanticColors?.base?.backgroundSecondary};
      border-radius: ${corners?.m}px;
      color: ${semanticColors?.base?.textSecondary};
      margin: ${spaces?.xs}px 0 0;
      max-height: 160px;
      overflow: auto;
      padding: ${spaces?.s}px;
    `;
  }}
`;

function CellEditor(cell: CellContext<Person, unknown>) {
  const initialValue = String(cell.getValue());
  const [value, setValue] = React.useState(initialValue);

  // Regenerating the data resets every cell back to what the table now holds.
  React.useEffect(() => setValue(initialValue), [initialValue]);

  return (
    <CellComponent verticalAlign="center">
      <EditableInput
        aria-label={`${cell.column.id}, row ${cell.row.index + 1}`}
        onBlur={() =>
          cell.table.options.meta?.updateData(
            cell.row.index,
            cell.column.id,
            value
          )
        }
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
    </CellComponent>
  );
}

const columns: ColumnDef<Person>[] = [
  { accessorKey: "firstName", header: "First Name" },
  { accessorKey: "lastName", header: "Last Name" },
  { accessorKey: "age", header: "Age" },
  { accessorKey: "visits", header: "Visits" },
  { accessorKey: "status", header: "Status" },
];

function App() {
  const [data, setData] = React.useState(() => makeData(3));
  const [log, setLog] = React.useState<string[]>([]);

  const table = useReactTable({
    columns,
    data,
    // Every column without its own cell renderer gets the editor.
    defaultColumn: { cell: CellEditor },
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((rows) =>
          rows.map((row, index) => {
            if (index !== rowIndex) return row;

            const previous = String(row[columnId as keyof Person]);
            if (previous === value) return row;

            setLog((entries) => [
              `row ${rowIndex + 1}, ${columnId}: "${previous}" → "${value}"`,
              ...entries,
            ]);

            return { ...row, [columnId]: value };
          })
        );
      },
    },
  });

  return (
    <div className="app">
      <Table>
        <TableHeader>
          {table.getFlatHeaders().map((header) => (
            <CellHeader hideSortIcon key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </CellHeader>
          ))}
        </TableHeader>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} shouldShowTooltipOnHover={false}>
              {row.getVisibleCells().map((cell) => (
                <React.Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Toolbar>
        <Button
          onClick={() => {
            setData(makeData(3));
            setLog([]);
          }}
          sdsStyle="solid"
          sdsType="primary"
          startIcon={<Icon sdsIcon="Refresh" sdsSize="s" />}
        >
          Replace the data
        </Button>
      </Toolbar>

      <Log>
        <LogTitle>Changes written back to the data</LogTitle>
        <LogBody>
          {log.length ? log.join("\n") : "Edit a cell, then click outside it."}
        </LogBody>
      </Log>
    </div>
  );
}

export default App;
```

### Table with Front-End Pagination

All the rows are in memory and TanStack Table slices them, so paging is only a change of `pageIndex`. Pagination counts pages from 1 while TanStack counts from 0, which is the one thing to keep straight when wiring the two together.

**Example: TableWithFrontEndPagination**

```tsx
// All 99 rows are in memory and TanStack Table slices them, so paging is only a
// change of pageIndex. The SDS Pagination component is a controlled view of that
// state: it reports which page was asked for and the table decides what that means.
//
// Pagination counts pages from 1 and TanStack counts from 0, which is the only
// thing to keep straight when wiring the two together.

import {
  CellBasic,
  CellComponent,
  CellHeader,
  Pagination,
  Table,
  TableHeader,
  TableRow,
  Tag,
  getSpaces,
  type CellHeaderDirection,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { faker } from "@faker-js/faker";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type CellContext,
  type ColumnDef,
  type HeaderContext,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import * as React from "react";

const DATA_COUNT = 99;
const PAGE_SIZE = 5;

type Person = {
  age: number;
  firstName: string;
  lastName: string;
  progress: number;
  status: "relationship" | "complicated" | "single";
  visits: number;
};

const STATUSES: Person["status"][] = ["relationship", "complicated", "single"];

const STATUS_COLORS = {
  complicated: "negative",
  relationship: "positive",
  single: "notice",
} as const;

function makeData(count: number): Person[] {
  return Array.from({ length: count }, () => ({
    age: faker.number.int({ max: 96, min: 18 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle(STATUSES)[0]!,
    visits: faker.number.int(1000),
  }));
}

const PaginationWrapper = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      justify-content: flex-end;
      margin-top: ${spaces?.l}px;
    `;
  }}
`;

function sortableHeader(header: HeaderContext<Person, unknown>, name: string) {
  const sorted = header.column.getIsSorted();
  const isNumeric = header.column.id === "progress";

  return (
    <CellHeader
      active={!!sorted}
      colSpan={header.header.colSpan}
      direction={sorted ? (sorted as CellHeaderDirection) : undefined}
      horizontalAlign={isNumeric ? "right" : "left"}
      hover
      onClick={header.column.getToggleSortingHandler()}
    >
      {name}
    </CellHeader>
  );
}

function textCell(cell: CellContext<Person, unknown>) {
  return (
    <CellBasic
      horizontalAlign={cell.column.id === "progress" ? "right" : "left"}
      primaryText={String(cell.getValue())}
      shouldShowTooltipOnHover={false}
      verticalAlign="center"
    />
  );
}

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "firstName",
    cell: textCell,
    header: (header) => sortableHeader(header, "First Name"),
  },
  {
    accessorKey: "lastName",
    cell: textCell,
    header: (header) => sortableHeader(header, "Last Name"),
  },
  {
    accessorKey: "age",
    cell: textCell,
    header: (header) => sortableHeader(header, "Age"),
  },
  {
    accessorKey: "visits",
    cell: textCell,
    header: (header) => sortableHeader(header, "Visits"),
  },
  {
    accessorKey: "status",
    cell: (cell) => {
      const status = cell.getValue() as Person["status"];

      return (
        <CellComponent verticalAlign="center">
          <Tag
            color={STATUS_COLORS[status]}
            hover={false}
            label={status}
            sdsStyle="rounded"
            sdsType="secondary"
          />
        </CellComponent>
      );
    },
    header: (header) => sortableHeader(header, "Status"),
  },
  {
    accessorKey: "progress",
    cell: textCell,
    header: (header) => sortableHeader(header, "Profile Progress"),
  },
];

function App() {
  const [data] = React.useState(() => makeData(DATA_COUNT));
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: { pagination, sorting },
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
            <TableRow key={row.id} shouldShowTooltipOnHover={false}>
              {row.getVisibleCells().map((cell) => (
                <React.Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>

      <PaginationWrapper>
        <Pagination
          currentPage={pagination.pageIndex + 1}
          onNextPage={() => table.nextPage()}
          onPageChange={(page) => table.setPageIndex(page - 1)}
          onPreviousPage={() => table.previousPage()}
          pageSize={pagination.pageSize}
          sdsStyle="round"
          totalCount={data.length}
        />
      </PaginationWrapper>
    </div>
  );
}

export default App;
```

### Table with Back-End Pagination

Only one page of rows exists on the client, so `manualPagination` stops the table from slicing and the row count arrives with the data. The request is faked with a delay, and `keepPreviousData` holds the current page on screen while the next one loads.

**Example: TableWithBackEndPagination**

```tsx
// Here the rows for one page are all that exist on the client, so the table cannot
// work out how many pages there are: manualPagination tells it not to slice, and the
// row count comes back with the data. Pagination is driven by that count instead.
//
// The fetch is faked with a delay. keepPreviousData holds the previous page on
// screen while the next one loads, which is what stops the table from collapsing to
// nothing between pages; the body is dimmed while a fetch is in flight.

import {
  CellBasic,
  CellComponent,
  CellHeader,
  Icon,
  Pagination,
  Table,
  TableHeader,
  TableRow,
  Tag,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CellHeaderDirection,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { faker } from "@faker-js/faker";
import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type CellContext,
  type ColumnDef,
  type HeaderContext,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import * as React from "react";

const DATA_COUNT = 198;
const PAGE_SIZE = 5;

type Person = {
  age: number;
  firstName: string;
  lastName: string;
  progress: number;
  status: "relationship" | "complicated" | "single";
  visits: number;
};

const STATUSES: Person["status"][] = ["relationship", "complicated", "single"];

const STATUS_COLORS = {
  complicated: "negative",
  relationship: "positive",
  single: "notice",
} as const;

const ROWS: Person[] = Array.from({ length: DATA_COUNT }, () => ({
  age: faker.number.int({ max: 80, min: 18 }),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  progress: faker.number.int(100),
  status: faker.helpers.shuffle(STATUSES)[0]!,
  visits: faker.number.int(1000),
}));

// Stands in for an endpoint that takes a page and sorts server-side.
async function fetchPage({
  pageIndex,
  pageSize,
  sorting,
}: PaginationState & { sorting: SortingState }) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const rows = [...ROWS];
  const sort = sorting[0];

  if (sort) {
    const key = sort.id as keyof Person;
    rows.sort((a, b) => {
      if (a[key] === b[key]) return 0;
      const ascending = a[key] > b[key] ? 1 : -1;
      return sort.desc ? -ascending : ascending;
    });
  }

  return {
    rows: rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
    totalRowCount: rows.length,
  };
}

const TableBody = styled.tbody<{ isFetching: boolean }>`
  ${(props) => (props.isFetching ? "filter: grayscale(1); opacity: 0.4;" : "")}
  transition: opacity 150ms ease-out;
`;

const Footer = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      align-items: center;
      display: flex;
      gap: ${spaces?.m}px;
      justify-content: flex-end;
      margin-top: ${spaces?.l}px;
    `;
  }}
`;

// A div rather than a p, because Icon renders a div and a p cannot contain one.
const FetchingNote = styled.div<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      align-items: center;
      color: ${semanticColors?.base?.textSecondary};
      display: flex;
      gap: ${spaces?.xxs}px;
      margin: 0;
      margin-right: auto;
    `;
  }}
`;

function sortableHeader(header: HeaderContext<Person, unknown>, name: string) {
  const sorted = header.column.getIsSorted();
  const isNumeric = header.column.id === "progress";

  return (
    <CellHeader
      active={!!sorted}
      colSpan={header.header.colSpan}
      direction={sorted ? (sorted as CellHeaderDirection) : undefined}
      horizontalAlign={isNumeric ? "right" : "left"}
      hover
      onClick={header.column.getToggleSortingHandler()}
      shouldShowTooltipOnHover
      tooltipProps={{ enterDelay: 750 }}
      tooltipText={`Sort by ${name.toLowerCase()}`}
    >
      {name}
    </CellHeader>
  );
}

function textCell(cell: CellContext<Person, unknown>) {
  return (
    <CellBasic
      horizontalAlign={cell.column.id === "progress" ? "right" : "left"}
      primaryText={String(cell.getValue())}
      shouldShowTooltipOnHover={false}
      verticalAlign="center"
    />
  );
}

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "firstName",
    cell: textCell,
    header: (header) => sortableHeader(header, "First Name"),
  },
  {
    accessorKey: "lastName",
    cell: textCell,
    header: (header) => sortableHeader(header, "Last Name"),
  },
  {
    accessorKey: "age",
    cell: textCell,
    header: (header) => sortableHeader(header, "Age"),
  },
  {
    accessorKey: "visits",
    cell: textCell,
    header: (header) => sortableHeader(header, "Visits"),
  },
  {
    accessorKey: "status",
    cell: (cell) => {
      const status = cell.getValue() as Person["status"];

      return (
        <CellComponent verticalAlign="center">
          <Tag
            color={STATUS_COLORS[status]}
            hover={false}
            label={status}
            sdsStyle="rounded"
            sdsType="secondary"
          />
        </CellComponent>
      );
    },
    header: (header) => sortableHeader(header, "Status"),
  },
  {
    accessorKey: "progress",
    cell: textCell,
    header: (header) => sortableHeader(header, "Profile Progress"),
  },
];

const EMPTY_ROWS: Person[] = [];

function PagedTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const { data, isFetching } = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => fetchPage({ ...pagination, sorting }),
    queryKey: ["table-page", pagination, sorting],
  });

  const table = useReactTable({
    columns,
    data: data?.rows ?? EMPTY_ROWS,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount: data?.totalRowCount ?? 0,
    state: { pagination, sorting },
  });

  return (
    <>
      <Table>
        <TableHeader>
          {table.getFlatHeaders().map((header) => (
            <React.Fragment key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </React.Fragment>
          ))}
        </TableHeader>
        <TableBody isFetching={isFetching}>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} shouldShowTooltipOnHover={false}>
              {row.getVisibleCells().map((cell) => (
                <React.Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Footer>
        {isFetching && (
          <FetchingNote>
            <Icon sdsIcon="Loading" sdsSize="s" />
            Fetching page {pagination.pageIndex + 1}…
          </FetchingNote>
        )}
        <Pagination
          currentPage={pagination.pageIndex + 1}
          onNextPage={() => table.nextPage()}
          onPageChange={(page) => table.setPageIndex(page - 1)}
          onPreviousPage={() => table.previousPage()}
          pageSize={pagination.pageSize}
          sdsStyle="round"
          totalCount={data?.totalRowCount ?? 0}
        />
      </Footer>
    </>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <PagedTable />
      </QueryClientProvider>
    </div>
  );
}

export default App;
```

## Props

Table is a styled table element: full width, collapsed borders, automatic layout. Its only prop is `children`, and anything else you pass lands on the table element. Compose it the way you would plain HTML: a TableHeader for the head, a `tbody` of TableRows for the body.
