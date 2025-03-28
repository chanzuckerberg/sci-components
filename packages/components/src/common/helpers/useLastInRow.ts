import { useEffect, useState } from "react";

/**
 * A custom hook that detects the last item in each row of a wrapped layout.
 *
 * Neither CSS Flexbox nor CSS Grid provide a built-in way to identify the last item
 * in a visually wrapped row. Since items can wrap dynamically based on screen size,
 * we rely on measuring their vertical positions in the DOM.
 *
 * We iterate through the list of items and compare their offsetTop values. If an item
 * has a higher offsetTop than the previous one, it means it started a new row, so the
 * previous item was the last in its row.
 *
 * A ResizeObserver is used to re-run this logic whenever the container resizes, ensuring it
 * stays accurate in responsive layouts.
 *
 * @param containerRef - A ref to the container element
 * @param itemRefs - An array of refs to the items
 * @returns A Set of last items in each row
 */
export const useLastInRow = (
  containerRef: React.RefObject<HTMLElement>,
  itemRefs: React.MutableRefObject<(HTMLElement | null)[]>
) => {
  const [lastItems, setLastItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const updateLastInRow = () => {
      const items = itemRefs.current.filter(Boolean) as HTMLElement[];
      let currentTop: number | null = null;
      const newSet = new Set<number>();

      items.forEach((item, index) => {
        if (currentTop === null) {
          currentTop = item.offsetTop;
        } else if (item.offsetTop > currentTop) {
          newSet.add(index - 1);
          currentTop = item.offsetTop;
        }
      });

      if (items.length > 0) {
        newSet.add(items.length - 1);
      }

      setLastItems(newSet);
    };

    updateLastInRow();

    const resizeObserver = new ResizeObserver(() => {
      updateLastInRow();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [containerRef, itemRefs]);

  return lastItems;
};
