import { useEffect, useRef } from "react";

/**
 * Creates a scroll stop listener with a given callback and timeout.
 *
 * @param callback - The callback function to be executed when scrolling stops.
 * @param timeout - The duration (in milliseconds) after which the callback is triggered when scrolling stops. Default is 50ms.
 * @returns A function to destroy the scroll stop listener and clean up the event listener.
 */
const createScrollStopListener = (callback: () => void, timeout = 50) => {
  let removed = false;
  let handle: NodeJS.Timeout | null = null;

  const onScroll = () => {
    if (handle) {
      clearTimeout(handle);
    }
    handle = setTimeout(callback, timeout);
  };

  // Attach scroll event listener to the specified element
  document.addEventListener("scroll", onScroll, true);

  return () => {
    if (removed) {
      return;
    }

    removed = true;

    if (handle) {
      clearTimeout(handle);
    }

    // Remove the scroll event listener from the element
    document.removeEventListener("scroll", onScroll);
  };
};

/**
 * Custom hook that listens for scroll stop events and triggers a callback function.
 *
 * @param callback - The callback function to be executed when scrolling stops.
 * @param timeout - The duration (in milliseconds) after which the callback is triggered when scrolling stops. Default is 50ms.
 */
const useScrollStopListener = (callback: () => void, timeout = 50) => {
  const callbackRef = useRef<() => void>();
  callbackRef.current = callback;

  useEffect(() => {
    const destroyListener = createScrollStopListener(() => {
      if (callbackRef.current) {
        callbackRef.current();
      }
    }, timeout);
    return () => destroyListener();
  }, [timeout]);
};

export default useScrollStopListener;
