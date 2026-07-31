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
