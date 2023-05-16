import React, { useEffect, useState } from "react";

/**
 * Custom hook that observes elements to determine if they are in the viewport.
 *
 * @param items - Array of items to observe.
 * @returns Object containing the visibility status of each observed item.
 */
export default function useInView(
  items: Array<{
    title: string;
    elementRef: React.MutableRefObject<HTMLElement | null>;
  }>
) {
  const [elements, setElements] = useState<{
    [key: string]: { isInView: boolean };
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

        if (entry.isIntersecting) {
          // Element is in view
          setElements((prev) => {
            return {
              ...prev,
              [name]: {
                el: entry,
                isInView: true,
              },
            };
          });
        } else {
          // Element is not in view
          setElements((prev) => ({
            ...prev,
            [name]: {
              el: entry,
              isInView: false,
            },
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback);

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
  }, []);

  return elements;
}
