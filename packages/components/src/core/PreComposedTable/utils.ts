import { Column, ColumnDef, Header, Table } from "@tanstack/react-table";
import { CSSProperties } from "react";

export const SELECT_COLUMN_ID = "SdsTableSelectColumn";

function getSize(size = 100, max = Number.MAX_SAFE_INTEGER, min = 40) {
  return Math.max(Math.min(size, max), min);
}

/**
 * Calculates the sizing of table columns and distributes available width proportionally.
 * This function acts as an extension for TanStack Table, ensuring proper column sizing
 * based on provided metadata, including `isGrow`, `widthPercentage`, and size constraints.
 *
 * https://github.com/TanStack/table/discussions/4179#discussioncomment-11895847
 */
export const calculateTableSizing = <DataType>(
  columns: Header<DataType, unknown>[],
  totalWidth: number
): Record<string, number> => {
  let totalAvailableWidth = totalWidth;
  let totalIsGrow = 0;

  columns.forEach((header) => {
    const column = header.column.columnDef;
    if (!column.size && !column.meta?.isGrow) {
      let calculatedSize = 100;
      if (column?.meta?.widthPercentage) {
        calculatedSize = column.meta.widthPercentage * totalWidth * 0.01;
      } else {
        calculatedSize = totalWidth / columns.length;
      }

      const size = getSize(calculatedSize, column.maxSize, column.minSize);

      column.size = size;
    }

    if (column.meta?.isGrow) totalIsGrow += 1;
    else
      totalAvailableWidth -= getSize(
        column.size,
        column.maxSize,
        column.minSize
      );
  });

  const sizing: Record<string, number> = {};

  columns.forEach((header) => {
    const column = header.column.columnDef;
    if (column.meta?.isGrow) {
      let calculatedSize = 100;
      calculatedSize = Math.floor(totalAvailableWidth / totalIsGrow);
      const size = getSize(calculatedSize, column.maxSize, column.minSize);
      column.size = size;
    }

    sizing[`${column.id}`] = Number(column.size);
  });

  return sizing;
};

export const calculateLeftPosition = <DataType>(
  column: Column<DataType, unknown>,
  table: Table<DataType>
) => {
  if (column.id === SELECT_COLUMN_ID) return 0;

  const allColumns = table.getAllColumns();
  const currentIndex = allColumns.findIndex((col) => col.id === column.id);
  let leftPosition = 0;

  // Add widths of other left-pinned columns before this one
  for (let i = 0; i < currentIndex; i++) {
    const col = allColumns[i];
    const colDef = col.columnDef as ColumnDef<DataType>;
    if (colDef.meta?.pinning === "left") {
      leftPosition += col.getSize();
    }
  }

  return leftPosition;
};

export const calculateRightPosition = <DataType>(
  column: Column<DataType, unknown>,
  table: Table<DataType>
) => {
  const allColumns = table.getAllColumns();
  const currentIndex = allColumns.findIndex((col) => col.id === column.id);
  let rightPosition = 0;

  for (let i = currentIndex + 1; i < allColumns.length; i++) {
    const col = allColumns[i];
    const colDef = col.columnDef as ColumnDef<DataType>;
    if (colDef.meta?.pinning === "right") {
      rightPosition += col.getSize();
    }
  }

  return rightPosition;
};

export const getCommonPinningStyles = <DataType>(
  column: Column<DataType, unknown>,
  table: Table<DataType>
): CSSProperties => {
  const columnWithPinning = column.columnDef as ColumnDef<DataType>;
  const shouldPin = columnWithPinning.meta?.pinning;

  if (!shouldPin) {
    return {
      position: "relative" as const,
      width: column.getSize(),
    };
  }

  const leftPosition =
    shouldPin === "left" ? calculateLeftPosition(column, table) : 0;
  const rightPosition =
    shouldPin === "right" ? calculateRightPosition(column, table) : 0;

  return {
    left: shouldPin === "left" ? `${leftPosition}px` : undefined,
    position: "sticky" as const,
    right: shouldPin === "right" ? `${rightPosition}px` : undefined,
    width: column.getSize(),
    zIndex: 1,
  };
};
