// A thousand rows behind a scroll container, with only the visible ones in the DOM.
// Two libraries do the work: @tanstack/react-virtual measures the scroller and
// reports which rows to draw, and @tanstack/react-query fetches the next batch as
// the scroller nears its end. The Table components themselves are unchanged — the
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
