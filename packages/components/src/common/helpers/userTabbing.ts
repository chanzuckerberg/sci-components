"use client";

import { useEffect } from "react";

/**
 * Adds a 'user-is-tabbing' class and a 'data-user-is-tabbing' attribute to the provided element when the user starts navigating
 * with the keyboard. This is useful for styling focus outlines differently when the user is using the keyboard to tab through elements.
 * It is particularly beneficial for input elements where the styles for :focus and :focus-visible are identical,
 * unlike button elements which have both :focus and :focus-visible states available to style separately.
 * By detecting when the user is tabbing, we can apply different styles for :focus and :focus-visible states.
 *
 * @param {HTMLElement} element - The element to which the 'user-is-tabbing' class will be added.
 * @returns {Function} A function to remove the 'user-is-tabbing' class and 'data-user-is-tabbing' attribute and clean up the event listeners.
 */

const detectUserTabbing = (element: HTMLElement) => {
  if (!element) return;

  let removed = false;

  function handleFirstTab(e: KeyboardEvent) {
    if (e.code === "Tab") {
      element.classList.add("user-is-tabbing");
      element.setAttribute("data-user-is-tabbing", "true");

      window.removeEventListener("keydown", handleFirstTab);
      window.addEventListener("mousedown", handleMouseDownOnce);
    }
  }

  function handleMouseDownOnce() {
    element.classList.remove("user-is-tabbing");
    element.removeAttribute("data-user-is-tabbing");

    window.removeEventListener("mousedown", handleMouseDownOnce);
    window.addEventListener("keydown", handleFirstTab);
  }

  window.addEventListener("keydown", handleFirstTab);

  return () => {
    if (removed) {
      return;
    }

    removed = true;

    window.removeEventListener("keydown", handleFirstTab);
    window.removeEventListener("mousedown", handleMouseDownOnce);
  };
};

/**
 * Custom hook that listens for keyboard and mouse events to detect when
 * the user is tabbing through elements.
 *
 * @param {React.RefObject} ref - The ref to the element to which the 'user-is-tabbing' class
 * and 'data-user-is-tabbing' attribute will be added.
 */
const useDetectUserTabbing = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (ref.current) {
      const destroyListener = detectUserTabbing(ref.current);
      return () => destroyListener?.();
    }
  }, [ref]);
};

export default useDetectUserTabbing;
