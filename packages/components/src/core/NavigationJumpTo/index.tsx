import React, {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  CSSProperties,
} from "react";
import useScrollStopListener from "src/common/helpers/scrollStop";
import { toKebabCase } from "src/common/utils";
import { NavigationJumpToExtraProps, StyledTab, StyledTabs } from "./style";
import useInView from "./useIntersection";

type Item = {
  title: string;
  elementRef: React.MutableRefObject<HTMLElement | null>;
};

export interface NavigationJumpToProps extends NavigationJumpToExtraProps {
  items: Array<Item>;
  offsetTop?: number;
  onChange?: (
    value: number,
    event?: React.SyntheticEvent,
    type?: "click" | "scroll"
  ) => void;
  width?: CSSProperties["width"];
}

const scrollIntoViewWithOffset = (selector: string, offset: number) => {
  const element = document.querySelector(selector);
  if (!element) return;

  window.scrollTo({
    behavior: "smooth",
    top:
      element.getBoundingClientRect().top -
      document.body.getBoundingClientRect().top -
      offset,
  });
};

const NavigationJumpTo = forwardRef<HTMLDivElement, NavigationJumpToProps>(
  (props, ref): JSX.Element | null => {
    const { items, offsetTop = 0, onChange, width, ...rest } = props;
    const [navItemClicked, setNavItemClicked] = useState(false);
    const [firstTabIndexInview, setFirstTabIndexInview] = useState(0);
    const [emittedValue, setEmittedValue] = useState(-1);
    const sectionIsInView = useInView(items, offsetTop + 20);

    const a11yProps = (title: string, elementId: string) => {
      return {
        "aria-controls": elementId,
        id: `navigation-tab-${title}`,
      };
    };

    // Emit changes only once
    const handleOnChange = useCallback(
      (
        value: number,
        event: React.SyntheticEvent,
        type: "click" | "scroll"
      ) => {
        if (value !== emittedValue) {
          onChange?.(value, event, type);
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
        scrollIntoViewWithOffset(
          `#${items[newValue]?.elementRef?.current?.getAttribute("id")}`,
          offsetTop
        );
      } else {
        items[newValue]?.elementRef?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      // Update the tab value to newValue to adjust the position of the tabsIndicator
      setFirstTabIndexInview(newValue);

      // Invoke the custom onChange prop
      handleOnChange(newValue, event, "click");
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
        handleOnChange(
          sectionInView,
          {
            target: items[sectionInView],
            type: "scroll",
          } as unknown as React.SyntheticEvent,
          "scroll"
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleOnChange, items, sectionIsInView]);

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
        width={width}
        {...rest}
      >
        {items.map(({ title, elementRef }, index) => (
          <StyledTab
            key={toKebabCase(title)}
            label={title}
            tabIndex={0}
            width={width}
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
