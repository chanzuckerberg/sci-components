import React, { forwardRef, useCallback, useEffect, useState } from "react";
import useScrollStopListener from "src/common/helpers/scrollStop";
import { toKebabCase } from "src/common/utils";
import { NavigationJumpToExtraProps, StyledTab, StyledTabs } from "./style";
import useInView from "./useIntersection";

export interface NavigationJumpToProps extends NavigationJumpToExtraProps {
  items: Array<{
    title: string;
    elementRef: React.MutableRefObject<HTMLElement | null>;
  }>;
  offsetTop?: number;
  onChange?: (value: number) => void;
}

const NavigationJumpTo = forwardRef<HTMLDivElement, NavigationJumpToProps>(
  (props, ref): JSX.Element | null => {
    const { items, offsetTop = 0, onChange, ...rest } = props;
    const [navItemClicked, setNavItemClicked] = useState(false);
    const [firstTabIndexInview, setFirstTabIndexInview] = useState(0);
    const [emittedValue, setEmittedValue] = useState(-1);
    const sectionIsInView = useInView(items);

    useEffect(() => {
      items.forEach((item) => {
        if (offsetTop) {
          const wrapper = document.createElement("div");
          wrapper.style.position = "relative";

          const hiddenDiv = document.createElement("div");
          hiddenDiv.style.height = `${offsetTop}px`;
          hiddenDiv.style.top = `-${offsetTop}px`;
          hiddenDiv.style.position = `absolute`;
          hiddenDiv.style.pointerEvents = `none`;
          hiddenDiv.setAttribute(
            "id",
            `${item.elementRef.current?.getAttribute("id")}-hiddenDiv`
          );

          wrapper.appendChild(hiddenDiv);

          item.elementRef.current?.before(wrapper);

          if (item.elementRef.current)
            wrapper.appendChild(item.elementRef.current);
        }
      });
    }, [items, offsetTop]);

    const a11yProps = (title: string, elementId: string) => {
      return {
        "aria-controls": elementId,
        id: `navigation-tab-${title}`,
      };
    };

    // Emit changes only once
    const handleOnChange = useCallback(
      (value: number) => {
        if (value !== emittedValue) {
          onChange?.(value);
          setEmittedValue(value);
        }
      },
      [emittedValue, onChange]
    );

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      // Set navItemClicked to true to disable changing the tab value
      // while scrolling. Once the scrolling ends, it is changed back to false.
      setNavItemClicked(true);

      // Smoothly scroll to the section of the page referenced by the clicked nav item
      if (offsetTop) {
        const hiddenDiv = document.getElementById(
          `${items[newValue]?.elementRef?.current?.getAttribute(
            "id"
          )}-hiddenDiv`
        );
        hiddenDiv?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        items[newValue]?.elementRef?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      // Update the tab value to newValue to adjust the position of the tabsIndicator
      setFirstTabIndexInview(newValue);

      // Invoke the custom onChange prop
      handleOnChange(newValue);
    };

    // Observe changes in the sectionIsInView object to update the tabs value
    // based on the index of the visible sections in the viewport.
    useEffect(() => {
      // Retrieve the index of the first section that is intersecting with the viewport.
      const sectionInView = Object.values(sectionIsInView).findIndex(
        (section) => section.isInView
      );

      // Update the tabs value only if a section is present in the viewport
      // and no navigation item has been clicked, preventing updates during window scroll
      // and unnecessary movement of the tabs indicator.
      if (sectionInView > -1 && !navItemClicked) {
        setFirstTabIndexInview(sectionInView);

        // Invoke the custom onChange prop
        handleOnChange(sectionInView);
      }
    }, [handleOnChange, navItemClicked, sectionIsInView]);

    // Set navItemClicked to false to re-enable the option
    // to update the tab value based on scroll.
    useScrollStopListener(() => {
      setNavItemClicked(false);
    });

    return (
      <StyledTabs
        ref={ref}
        orientation="vertical"
        variant="fullWidth"
        value={firstTabIndexInview}
        onChange={handleChange}
        aria-label="navigation-jump-to"
        {...rest}
      >
        {items.map(({ title, elementRef }, index) => (
          <StyledTab
            key={toKebabCase(title)}
            label={title}
            tabIndex={0}
            {...a11yProps(
              toKebabCase(title),
              elementRef.current?.getAttribute("id") ||
                `navigation-panel-${index + 1}`
            )}
          />
        ))}
      </StyledTabs>
    );
  }
);

export default NavigationJumpTo;
