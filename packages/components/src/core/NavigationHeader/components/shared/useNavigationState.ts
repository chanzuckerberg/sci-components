import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to manage navigation drawer and dropdown state
 * Includes hover delay logic for smooth drawer transitions
 */
export function useNavigationState<T extends string = string>() {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [activeDropdownKey, setActiveDropdownKey] = useState<T | null>(null);
  const [activeDrawerKey, setActiveDrawerKey] = useState<T | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuWidth, setMenuWidth] = useState<number | string>("100%");
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoverEnterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [contentKey, setContentKey] = useState<T | null>(null);
  const [isContentFading, setIsContentFading] = useState(false);

  const open = Boolean(anchorEl);
  const drawerOpen = activeDrawerKey !== null;

  function onClose() {
    setAnchorEl(null);
    setActiveDropdownKey(null);
  }

  function onDrawerClose() {
    // Clear any pending hover enter timeout
    if (hoverEnterTimeoutRef.current) {
      clearTimeout(hoverEnterTimeoutRef.current);
    }
    // Clear any existing close timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDrawerKey(null);
      setContentKey(null);
    }, 200);
  }

  function onDrawerOpen(key: T) {
    // Clear any pending close timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // If drawer is already open with different content, add a delay before changing
    if (activeDrawerKey !== null && activeDrawerKey !== key) {
      // Clear any pending hover enter timeout
      if (hoverEnterTimeoutRef.current) {
        clearTimeout(hoverEnterTimeoutRef.current);
      }

      // Wait 100ms before changing content
      hoverEnterTimeoutRef.current = setTimeout(() => {
        setIsContentFading(true);
        setTimeout(() => {
          setActiveDrawerKey(key);
          setContentKey(key);
          setIsContentFading(false);
        }, 100);
      }, 100);
    } else {
      // First time opening or reopening same drawer - open immediately
      setActiveDrawerKey(key);
      setContentKey(key);
      setIsContentFading(false);
    }
  }

  function cancelDrawerClose() {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  }

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (hoverEnterTimeoutRef.current) {
        clearTimeout(hoverEnterTimeoutRef.current);
      }
    };
  }, []);

  // Update menu width when button ref changes
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) {
      return;
    }

    setMenuWidth(button.offsetWidth);
  }, []);

  return {
    // State
    anchorEl,
    activeDropdownKey,
    activeDrawerKey,
    contentKey,
    isContentFading,
    open,
    drawerOpen,
    buttonRef,
    menuWidth,

    // Actions
    setAnchorEl,
    setActiveDropdownKey,
    setActiveDrawerKey,
    setContentKey,
    onClose,
    onDrawerClose,
    onDrawerOpen,
    cancelDrawerClose,
  };
}
