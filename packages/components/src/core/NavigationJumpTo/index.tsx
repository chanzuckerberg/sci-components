import React, {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  CSSProperties,
  useMemo,
} from "react";
import useScrollStopListener from "src/common/helpers/scrollStop";
import { toKebabCase } from "src/common/utils";
import { NavigationJumpToExtraProps, StyledTab, StyledTabs } from "./style";
import useInView from "./useIntersection";

type SubItem = {
  title: string;
  elementRef: React.MutableRefObject<HTMLElement | null>;
};

type Item = {
  title: string;
  elementRef: React.MutableRefObject<HTMLElement | null>;
  subItems?: SubItem[];
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

const scrollIntoViewWithOffset = (id: string, offset: number) => {
  const element = document.getElementById(id);
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

    // Flatten items for intersection observer
    const flattenedItems = useMemo(
      () =>
        items.reduce<
          Array<{
            title: string;
            elementRef: React.MutableRefObject<HTMLElement | null>;
          }>
        >((acc, item) => {
          acc.push({ elementRef: item.elementRef, title: item.title });
          if (item.subItems) {
            acc.push(...item.subItems);
          }
          return acc;
        }, []),
      [items]
    );

    const sectionIsInView = useInView(flattenedItems, offsetTop);

    // Create mapping between rendered tab index and flattened item index
    const tabToFlattenedIndexMap = React.useMemo(() => {
      const map: number[] = [];
      items.forEach((item) => {
        const flattenedIndex = flattenedItems.findIndex(
          (flatItem) =>
            flatItem.title === item.title &&
            flatItem.elementRef === item.elementRef
        );
        map.push(flattenedIndex);
        if (item.subItems) {
          item.subItems.forEach((subItem) => {
            const subFlattenedIndex = flattenedItems.findIndex(
              (flatItem) =>
                flatItem.title === subItem.title &&
                flatItem.elementRef === subItem.elementRef
            );
            map.push(subFlattenedIndex);
          });
        }
      });
      return map;
    }, [items, flattenedItems]);

    const a11yProps = (title: string, elementId: string) => {
      return {
        "aria-controls": elementId,
        id: `navigation-tab-${title}`,
      };
    };

    // Create tabs for a single item including its sub-items
    const createTabsForItem = (item: Item, itemIndex: number) => {
      const tabs = [
        <StyledTab
          key={toKebabCase(item.title)}
          label={item.title}
          tabIndex={0}
          width={width}
          {...a11yProps(
            toKebabCase(item.title),
            item.elementRef.current?.getAttribute("id") ||
              `navigation-panel-${itemIndex + 1}`
          )}
        />,
      ];

      if (item.subItems) {
        item.subItems.forEach((subItem, subIndex) => {
          tabs.push(
            <StyledTab
              key={`${toKebabCase(item.title)}-${toKebabCase(subItem.title)}`}
              label={subItem.title}
              tabIndex={0}
              width={width}
              isSubItem={true}
              {...a11yProps(
                toKebabCase(subItem.title),
                subItem.elementRef.current?.getAttribute("id") ||
                  `navigation-panel-${itemIndex + 1}-${subIndex + 1}`
              )}
            />
          );
        });
      }

      return tabs;
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

      // Get the flattened item index from the tab index
      const flattenedIndex = tabToFlattenedIndexMap[newValue];
      const targetItem = flattenedItems[flattenedIndex];

      // Smoothly scroll to the section of the page referenced by the clicked nav item
      if (offsetTop) {
        scrollIntoViewWithOffset(
          `${targetItem?.elementRef?.current?.getAttribute("id")}`,
          offsetTop
        );
      } else {
        targetItem?.elementRef?.current?.scrollIntoView({
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
      const flattenedSectionInView = Object.values(sectionIsInView).findIndex(
        (section) => section.isInView
      );

      // Convert flattened index back to tab index
      const tabSectionInView = tabToFlattenedIndexMap.findIndex(
        (flatIndex) => flatIndex === flattenedSectionInView
      );

      // Update the tabs value only if a section is present in the viewport
      // and no navigation item has been clicked, preventing updates during window scroll
      // and unnecessary movement of the tabs indicator.
      if (tabSectionInView > -1 && !navItemClicked) {
        setFirstTabIndexInview(tabSectionInView);

        // Invoke the custom onChange prop
        handleOnChange(
          tabSectionInView,
          {
            target: flattenedItems[flattenedSectionInView],
            type: "scroll",
          } as unknown as React.SyntheticEvent,
          "scroll"
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      handleOnChange,
      flattenedItems,
      sectionIsInView,
      tabToFlattenedIndexMap,
    ]);

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
        {items.map((item, itemIndex) => createTabsForItem(item, itemIndex))}
      </StyledTabs>
    );
  }
);

export default NavigationJumpTo;
