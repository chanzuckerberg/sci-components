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
