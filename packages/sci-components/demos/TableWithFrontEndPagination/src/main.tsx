/* eslint-disable no-case-declarations */
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  CellBasic,
  CellComponent,
  CellHeader,
  CellHeaderDirection,
  Pagination,
  Table,
  TableHeader,
  TableRow,
  Tag,
} from "czifui";
import React from "react";
import "./index.css";
import { makeData, Person } from "./makeData";

type SdsTagColorType =
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "gray"
  | "beta";

function App() {
  const DATA_COUNT = 100;
  const PAGE_SIZE = 5;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const data = React.useState(() => makeData(DATA_COUNT))[0];

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: PAGE_SIZE,
    });

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        header: "First Name",
        id: "firstName",
      },
      {
        accessorFn: (row) => row.lastName,
        cell: (info) => info.getValue(),
        header: "Last Name",
        id: "lastName",
      },
      {
        accessorKey: "age",
        footer: (props) => props.column.id,
        header: "Age",
      },
      {
        accessorKey: "visits",
        footer: (props) => props.column.id,
        header: "Visits",
      },
      {
        accessorKey: "status",
        footer: (props) => props.column.id,
        header: "Status",
        id: "status",
      },
      {
        accessorKey: "progress",
        footer: (props) => props.column.id,
        header: "Profile Progress",
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
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
    },
  });

  return (
    <div className="app">
      <h1 className="title">Table with Front-End only Pagination</h1>
      <p className="description">
        Using front-end pagination to show table data in multiple pages.
      </p>
      <Table>
        <TableHeader>
          {table.getFlatHeaders().map((header) => (
            <CellHeader
              key={header.id}
              colSpan={header.colSpan}
              direction={
                header.column.getIsSorted()
                  ? (header.column.getIsSorted() as CellHeaderDirection)
                  : undefined
              }
              active={!!header.column.getIsSorted()}
              onClick={header.column.getToggleSortingHandler()}
              horizontalAlign={header.id === "createdAt" ? "right" : "left"}
            >
              {
                flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                ) as string
              }
            </CellHeader>
          ))}
        </TableHeader>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  // eslint-disable-next-line sonarjs/no-small-switch
                  switch (cell.column.id) {
                    case "status":
                      const tagIndentMap: { [key: string]: SdsTagColorType } = {
                        complicated: "warning",
                        relationship: "error",
                        single: "beta",
                      };
                      const tagValue = cell.getValue() as string;
                      return (
                        <CellComponent key={cell.id} verticalAlign="center">
                          <Tag
                            label={tagValue}
                            color={tagIndentMap[tagValue]}
                            sdsStyle="rounded"
                            sdsType="secondary"
                          />
                        </CellComponent>
                      );
                    default:
                      return (
                        <CellBasic
                          key={cell.id}
                          primaryText={
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            ) as string
                          }
                          horizontalAlign={
                            cell.column.id === "progress" ? "center" : "left"
                          }
                          verticalAlign="center"
                          shouldShowTooltipOnHover={false}
                        />
                      );
                  }
                })}
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
