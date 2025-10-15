import React, {
  useState,
  useMemo,
  useEffect,
  createContext,
  useRef,
} from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  RowSelectionState,
  VisibilityState,
  PaginationState,
  ColumnPinningState,
  Header,
  Row,
  Cell,
  Table as TanstackTable,
  RowData,
  CellContext,
} from "@tanstack/react-table";

import Table from "../Table";
import TableHeader from "../TableHeader";
import TableRow, { TableRowProps } from "../TableRow";
import CellHeader, { CellHeaderProps } from "../CellHeader";
import CellBasic from "../CellBasic";
import CellComponent from "../CellComponent";
import Pagination, { PaginationProps } from "src/core/Pagination";
import {
  StyledInputSearch,
  StyledPaginationWrapper,
  StyledTableContainer,
  StyledTableWrapper,
} from "./style";
import InputCheckbox from "../InputCheckbox";
import {
  calculateTableSizing,
  getCommonPinningStyles,
  SELECT_COLUMN_ID,
} from "./utils";

// Declaration merging to add pinning to ColumnDef.meta
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    pinning?: "left" | "right";
    verticalAlign?: "top" | "middle" | "bottom";
    isGrow?: boolean;
    widthPercentage?: number;
    headerCellProps?: Partial<CellHeaderProps>;
  }
}

export interface PreComposedTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  border?: boolean;
  enableSorting?: boolean;
  enableRowSelection?: boolean;
  shouldPinSelectRowToLeft?: boolean;
  enablePagination?: boolean;
  enableColumnFiltering?: boolean;
  enableGlobalFiltering?: boolean;
  paginationConfig?: Partial<PaginationProps> & {
    placement?: "left" | "center" | "right";
  };
  className?: string;
  style?: React.CSSProperties;
  tableWidth?: string;
  tableRowProps?: Partial<TableRowProps>;
  onRowSelect?: (selectedRows: TData[]) => void;
  sdsStyle?: "lined" | "striped";
}

// Create context for row hover state
export const RowHoverContext = createContext<{ isRowHovered: boolean }>({
  isRowHovered: false,
});

const PreComposedTable = <TData extends RowData>({
  data,
  columns,
  border = true,
  enableSorting = false,
  enableRowSelection = false,
  shouldPinSelectRowToLeft = true,
  enablePagination = false,
  enableColumnFiltering = false,
  enableGlobalFiltering = false,
  paginationConfig,
  className,
  style,
  tableWidth = "100%",
  onRowSelect,
  tableRowProps,
  sdsStyle = "lined",
}: PreComposedTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: paginationConfig?.pageSize ?? 10,
  });
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({});
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Add selection column if enabled and doesn't already exist
  const tableColumns = useMemo(() => {
    // First, always filter out any existing selection columns to avoid duplicates
    const columnsWithoutSelection = columns.filter(
      (col) => col.id !== SELECT_COLUMN_ID
    );

    if (enableRowSelection) {
      return [
        {
          accessorFn: () => null,
          cell: (props: CellContext<TData, unknown>) => {
            const { row, cell } = props;
            const pinnedStyle = getCommonPinningStyles(cell.column, table);

            return (
              <CellComponent
                horizontalAlign="center"
                verticalAlign="top"
                {...props}
                style={{
                  width: `${cell.column.getSize()}px`,
                  ...pinnedStyle,
                }}
              >
                <InputCheckbox
                  stage={row.getIsSelected() ? "checked" : "unchecked"}
                  disabled={!row.getCanSelect()}
                  onChange={() => row.toggleSelected()}
                  aria-label="Select row"
                />
              </CellComponent>
            );
          },
          enableFiltering: false,
          enablePinning: false,
          enableSorting: false,
          header: ({
            table,
            header,
          }: {
            table: TanstackTable<TData>;
            header: Header<TData, unknown>;
          }) => {
            const pinnedStyle = getCommonPinningStyles(header.column, table);
            let stage: "checked" | "unchecked" | "indeterminate" = "unchecked";
            if (table.getIsAllPageRowsSelected()) {
              stage = "checked";
            } else if (table.getIsSomePageRowsSelected()) {
              stage = "indeterminate";
            }
            return (
              <CellHeader
                horizontalAlign="center"
                style={{ width: `${header.getSize()}px`, ...pinnedStyle }}
              >
                <InputCheckbox
                  stage={stage}
                  onChange={() => table.toggleAllPageRowsSelected()}
                  aria-label="Select all rows"
                />
              </CellHeader>
            );
          },
          id: SELECT_COLUMN_ID,
          meta: {
            pinning: shouldPinSelectRowToLeft ? ("left" as const) : undefined,
            verticalAlign: "top" as const,
          },
          size: 40,
        },
        ...columnsWithoutSelection,
      ];
    }

    return columnsWithoutSelection;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, enableRowSelection, shouldPinSelectRowToLeft]);

  const table = useReactTable({
    columns: tableColumns,
    data,
    debugTable: true,
    enableColumnFilters: enableColumnFiltering,
    enableGlobalFilter: enableGlobalFiltering,
    enableRowSelection: enableRowSelection,
    enableSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnPinningChange: setColumnPinning,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnPinning,
      columnVisibility,
      globalFilter,
      pagination,
      rowSelection,
      sorting,
    },
  });

  const createInitialPinning = React.useCallback(() => {
    const initialPinning = {} as ColumnPinningState;

    tableColumns.forEach((column) => {
      const columnWithPinning = column as ColumnDef<TData>;
      if (columnWithPinning.meta?.pinning) {
        const columnId =
          column.id || (column as { accessorKey?: string }).accessorKey;
        if (columnId) {
          const side = columnWithPinning.meta.pinning as "left" | "right";
          if (!initialPinning[side]) {
            initialPinning[side] = [];
          }
          initialPinning[side]!.push(columnId as string);
        }
      }
    });

    return initialPinning;
  }, [tableColumns]);

  // Initialize column pinning from column definitions
  useEffect(() => {
    setColumnPinning(createInitialPinning());
  }, [createInitialPinning]);

  // Call onRowSelect callback when row selection changes
  useEffect(() => {
    if (onRowSelect && enableRowSelection) {
      const selectedRows = table
        .getSelectedRowModel()
        .rows.map((row) => row.original);
      onRowSelect(selectedRows);
    }
  }, [rowSelection, onRowSelect, enableRowSelection, table]);

  useEffect(() => {
    setPagination({
      pageIndex: 0,
      pageSize: paginationConfig?.pageSize ?? 10,
    });
  }, [paginationConfig]);

  const headers = table.getFlatHeaders();

  React.useLayoutEffect(() => {
    if (!tableContainerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const initialColumnSizing = calculateTableSizing(
          headers,
          entry.contentRect.width
        );
        table.setColumnSizing(initialColumnSizing);
      }
    });
    resizeObserver.observe(tableContainerRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [headers, table]);

  const renderCell = (cell: Cell<TData, unknown>, row: Row<TData>) => {
    const isRowHovered = hoveredRowId === row.id;
    const isPinned = cell.column.columnDef.meta?.pinning;
    const pinnedStyle = getCommonPinningStyles(cell.column, table);

    let cellContent;

    if (typeof cell.column.columnDef.cell === "string") {
      cellContent = (
        <CellBasic
          as="div"
          primaryText={cell.getValue() as string}
          shouldShowTooltipOnHover={false}
          shouldShowUndelineOnHover={false}
          verticalAlign={
            cell.column.columnDef.meta?.verticalAlign === "middle"
              ? "center"
              : cell.column.columnDef.meta?.verticalAlign
          }
          style={{
            width: `${cell.column.getSize()}px`,
          }}
        />
      );
    } else if (cell.column.columnDef.cell) {
      cellContent = flexRender(cell.column.columnDef.cell, {
        ...cell.getContext(),
        as: "div",
        style: {
          width: `${cell.column.getSize()}px`,
        },
      });
    } else {
      // Fallback for undefined cell content
      cellContent = (
        <CellBasic
          as="div"
          primaryText={String(cell.getValue() || "")}
          shouldShowTooltipOnHover={false}
          shouldShowUndelineOnHover={false}
          style={{
            width: `${cell.column.getSize()}px`,
          }}
          verticalAlign={
            cell.column.columnDef.meta?.verticalAlign === "middle"
              ? "center"
              : cell.column.columnDef.meta?.verticalAlign
          }
        />
      );
    }

    if (isPinned) {
      return (
        <RowHoverContext.Provider key={cell.id} value={{ isRowHovered }}>
          <td
            style={{
              ...pinnedStyle,
              width: `${cell.column.getSize()}px`,
              verticalAlign: cell.column.columnDef.meta?.verticalAlign,
            }}
          >
            {cellContent}
          </td>
        </RowHoverContext.Provider>
      );
    }

    return (
      <RowHoverContext.Provider key={cell.id} value={{ isRowHovered }}>
        <td
          style={{
            verticalAlign: cell.column.columnDef.meta?.verticalAlign,
            width: `${cell.column.getSize()}px`,
          }}
        >
          {cellContent}
        </td>
      </RowHoverContext.Provider>
    );
  };

  const renderHeader = (header: Header<TData, unknown>) => {
    const isSortable = enableSorting && header.column.getCanSort();
    const isSorted = header.column.getIsSorted();
    const sortDirection = header.column.getIsSorted() as "asc" | "desc";
    const isPinned = header.column.columnDef.meta?.pinning;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ref, ...headerCellProps } =
      header.column.columnDef.meta?.headerCellProps || {};
    const pinnedStyle = getCommonPinningStyles(header.column, table);

    if (typeof header.column.columnDef.header === "string") {
      return (
        <CellHeader
          key={header.id}
          colSpan={header.colSpan}
          style={{
            ...(isPinned ? pinnedStyle : {}),
            width: `${header.getSize()}px`,
          }}
          active={!!isSorted}
          direction={sortDirection || undefined}
          hover={isSortable}
          onClick={header.column.getToggleSortingHandler()}
          {...headerCellProps}
        >
          {header.isPlaceholder ? null : header.column.columnDef.header}
        </CellHeader>
      );
    } else if (header.column.columnDef.header) {
      return flexRender(header.column.columnDef.header, {
        ...header.getContext(),
        key: header.id,
        style: {
          ...(isPinned ? pinnedStyle : {}),
          width: `${header.getSize()}px`,
        },
      });
    } else {
      // Fallback for undefined header content
      return (
        <CellHeader
          key={header.id}
          colSpan={header.colSpan}
          style={{
            ...(isPinned ? pinnedStyle : {}),
            width: `${header.getSize()}px`,
          }}
          active={!!isSorted}
          direction={sortDirection || undefined}
          hover={isSortable}
          onClick={header.column.getToggleSortingHandler()}
        >
          {header.column.id || "Header"}
        </CellHeader>
      );
    }
  };

  return (
    <StyledTableContainer
      ref={tableContainerRef}
      className={className}
      style={{ width: tableWidth, ...style }}
      key={`table-${columns.length}-${columns.map((col) => col.id || "col").join("-")}`}
    >
      {enableGlobalFiltering && (
        <div style={{ marginBottom: "16px" }}>
          <StyledInputSearch
            id="global-search"
            label="Search"
            placeholder="Search all columns..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
      )}

      <StyledTableWrapper border={border} sdsStyle={sdsStyle}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup.headers.map((header: Header<TData, unknown>) => {
                    return renderHeader(header);
                  })}
                </React.Fragment>
              );
            })}
          </TableHeader>
          <tbody>
            {table.getRowModel().rows.map((row: Row<TData>) => (
              <TableRow
                key={row.id}
                onMouseEnter={() => setHoveredRowId(row.id)}
                onMouseLeave={() => setHoveredRowId(null)}
                selected={row.getIsSelected()}
                aria-selected={row.getIsSelected()}
                {...tableRowProps}
              >
                {row.getVisibleCells().map((cell: Cell<TData, unknown>) => {
                  return renderCell(cell, row);
                })}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </StyledTableWrapper>

      {enablePagination && (
        <StyledPaginationWrapper placement={paginationConfig?.placement}>
          <Pagination
            currentPage={table.getState().pagination.pageIndex + 1}
            onPageChange={(page: number) => table.setPageIndex(page - 1)}
            onNextPage={() => table.nextPage()}
            onPreviousPage={() => table.previousPage()}
            pageSize={table.getState().pagination.pageSize}
            totalCount={table.getFilteredRowModel().rows.length}
            {...paginationConfig}
          />
        </StyledPaginationWrapper>
      )}
    </StyledTableContainer>
  );
};

export default PreComposedTable;
