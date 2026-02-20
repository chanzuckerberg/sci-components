import { useRef, useMemo, useCallback, useEffect } from "react";
import { ColumnDef, RowData, Table } from "@tanstack/react-table";

/**
 * Manages gradient vignettes on the inner edges of pinned columns.
 *
 * Identifies which columns sit at the boundary of left/right pinned groups
 * and toggles scroll-aware data attributes on the wrapper so the CSS
 * gradients in StyledTableWrapper only appear while content scrolls
 * underneath the pinned columns.
 */
export function usePinnedColumnGradient<TData extends RowData>(
  table: Table<TData>,
  columns: ColumnDef<TData>[]
) {
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const { lastLeftPinnedColumnId, firstRightPinnedColumnId } = useMemo(() => {
    const allCols = table.getAllColumns();
    const leftPinned = allCols.filter(
      (col) => col.columnDef.meta?.pinning === "left"
    );
    const rightPinned = allCols.filter(
      (col) => col.columnDef.meta?.pinning === "right"
    );
    return {
      firstRightPinnedColumnId:
        rightPinned.length > 0 ? rightPinned[0].id : null,
      lastLeftPinnedColumnId:
        leftPinned.length > 0 ? leftPinned[leftPinned.length - 1].id : null,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, columns]);

  const getPinnedEdge = useCallback(
    (columnId: string): "left" | "right" | undefined => {
      if (columnId === lastLeftPinnedColumnId) return "left";
      if (columnId === firstRightPinnedColumnId) return "right";
      return undefined;
    },
    [lastLeftPinnedColumnId, firstRightPinnedColumnId]
  );

  useEffect(() => {
    const wrapper = tableWrapperRef.current;
    if (!wrapper) return;
    if (!lastLeftPinnedColumnId && !firstRightPinnedColumnId) return;

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = wrapper;
      const hasHorizontalScroll = scrollWidth > clientWidth;

      if (scrollLeft > 0) {
        wrapper.setAttribute("data-scrolled-left", "true");
      } else {
        wrapper.removeAttribute("data-scrolled-left");
      }

      if (hasHorizontalScroll && scrollLeft < scrollWidth - clientWidth - 1) {
        wrapper.setAttribute("data-scrolled-right", "true");
      } else {
        wrapper.removeAttribute("data-scrolled-right");
      }
    };

    updateScrollState();
    wrapper.addEventListener("scroll", updateScrollState, { passive: true });

    const resizeObserver = new ResizeObserver(() => updateScrollState());
    resizeObserver.observe(wrapper);

    return () => {
      wrapper.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [lastLeftPinnedColumnId, firstRightPinnedColumnId]);

  return { getPinnedEdge, tableWrapperRef };
}
