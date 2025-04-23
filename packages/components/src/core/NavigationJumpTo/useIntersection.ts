import React, { useEffect, useState } from "react";

/**
 * Custom hook that observes elements to determine if they are in the viewport.
 *
 * @param items - Array of items to observe.
 * @param offsetTop - Offset from the top of the viewport to consider when determining if an element is in view.
 * @returns Object containing the visibility status of each observed item.
 */
export default function useInView(
  items: Array<{
    title: string;
    elementRef: React.MutableRefObject<HTMLElement | null>;
  }>,
  offsetTop: number = 0
) {
  const [elements, setElements] = useState<{
    [key: string]: {
      intersectionEntry: IntersectionObserverEntry;
      isInView: boolean;
    };
  }>({});

  useEffect(() => {
    /**
     * Callback function called by the IntersectionObserver.
     * Updates the visibility status of observed elements.
     *
     * @param entries - IntersectionObserverEntry array containing information about each observed element.
     */
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry, index) => {
        const name = entry.target.getAttribute("id") || index;

        setElements((prev) => {
          return {
            ...prev,
            [name]: {
              intersectionEntry: entry,
              isInView: entry.isIntersecting,
            },
          };
        });
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: `-${offsetTop}px 0px 0px 0px`,
    });

    // Observe each item's element
    items.forEach((item) => {
      if (item.elementRef.current) {
        observer.observe(item.elementRef.current);
      }
    });

    // Cleanup function to disconnect the IntersectionObserver
    return () => {
      observer.disconnect();
    };
  }, [items, offsetTop]);

  // If the window object is not available (e.g., in a node environment) or
  // If the IntersectionObserver is not available (e.g., in a test environment),
  // return a default result indicating that all elements are not in view
  if (typeof window === "undefined" || !window.IntersectionObserver) {
    return items.map((item) => {
      return {
        el: item.elementRef,
        isInView: false,
      };
    });
  }

  return elements;
}
