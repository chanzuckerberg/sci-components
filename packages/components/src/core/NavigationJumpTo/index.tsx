import React, { forwardRef, useEffect } from "react";
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
    const [value, setValue] = React.useState(0);
    const [pendingValue, setPendingValue] = React.useState(0);

    const a11yProps = (title: string, id: string) => {
      return {
        "aria-controls": id,
        id: `navigation-jump-to-${title}`,
      };
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
      items[newValue]?.elementRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    const sectionIsInView = useInView(items);

    useScrollStopListener(() => {
      setValue(pendingValue);
    }, 100);

    useEffect(() => {
      const sectionInView = Object.entries(sectionIsInView).findIndex(
        (section) => section[1].isInView
      );

      setPendingValue(sectionInView);
    }, [sectionIsInView]);

    return (
      <StyledTabs
        ref={ref}
        orientation="vertical"
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="navigation-jump-to"
        sdsIndicatorColor={indicatorColor}
        {...rest}
        indicatorColor="primary"
      >
        {items.map(({ title, elementRef }, index) => (
          <StyledTab
            disableRipple
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
