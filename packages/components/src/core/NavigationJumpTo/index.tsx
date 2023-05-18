import React, { forwardRef, useEffect, useState } from "react";
import useScrollStopListener from "src/common/helpers/scrollStop";
import { toKebabCase } from "src/common/utils";
import { NavigationJumpToExtraProps, StyledTab, StyledTabs } from "./style";
import useInView from "./useIntersection";

export interface NavigationJumpToProps extends NavigationJumpToExtraProps {
  indicatorColor?:
    | "primary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "gray"
    | "beta";
  items: Array<{
    title: string;
    elementRef: React.MutableRefObject<HTMLElement | null>;
  }>;
}

const NavigationJumpTo = forwardRef<HTMLButtonElement, NavigationJumpToProps>(
  (props, ref): JSX.Element | null => {
    const { items, indicatorColor, ...rest } = props;
    const [navItemClicked, setNavItemClicked] = useState(false);
    const [firstTabIndexInview, setFirstTabIndexInview] = useState(0);
    const sectionIsInView = useInView(items);

    // Assign a unique ID to each tab panel element
    // for accessibility purposes
    useEffect(() => {
      items.forEach((item, index) => {
        item.elementRef.current?.setAttribute(
          "id",
          `navigation-jump-to-${index}`
        );
      });
    }, []);

    const a11yProps = (title: string, elementId: string) => {
      return {
        "aria-controls": elementId,
        id: `navigation-jump-to-${title}`,
      };
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      // Set navItemClicked to true to disable changing the tab value
      // while scrolling. Once the scrolling ends, it is changed back to false.
      setNavItemClicked(true);

      // Smoothly scroll to the section of the page referenced by the clicked nav item
      items[newValue]?.elementRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Update the tab value to newValue to adjust the position of the tabsIndicator
      setFirstTabIndexInview(newValue);
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
      if (sectionInView > -1 && !navItemClicked)
        setFirstTabIndexInview(sectionInView);
    }, [sectionIsInView]);

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
        sdsIndicatorColor={indicatorColor}
        {...rest}
      >
        {items.map(({ title, elementRef }, index) => (
          <StyledTab
            key={toKebabCase(title)}
            label={title}
            {...a11yProps(
              toKebabCase(title),
              elementRef.current?.getAttribute("id") ||
                `navigation-jump-to-${index}`
            )}
          />
        ))}
      </StyledTabs>
    );
  }
);

export default NavigationJumpTo;
