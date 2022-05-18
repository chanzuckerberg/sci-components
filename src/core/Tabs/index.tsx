import { css } from "@emotion/css";
import { TabProps as RawTabProps, useTheme } from "@material-ui/core";
import React, { forwardRef, useContext, useMemo } from "react";
import { AppThemeOptions } from "../styles/common/defaultTheme";
import { getColors } from "../styles/common/selectors/theme";
import { TabsContext } from "./components/common";
import LabelWithCount from "./components/LabelWithCount";
import { StyledTab, StyledTabs, TabsProps } from "./style";

export type { TabsProps };

const TabIndicator = (theme: AppThemeOptions) => {
  const colors = getColors({ theme });

  return css`
    background-color: ${colors?.primary[400]};
    height: 2px;
    bottom: -2px;
    z-index: 2;
  `;
};

const Tabs = forwardRef<HTMLButtonElement, TabsProps>(function Tabs(
  props,
  ref
): React.ReactElement {
  const { sdsSize = "large", ...rest } = props;
  const theme = useTheme();

  const contextValue = React.useMemo(() => ({ sdsSize }), [sdsSize]);

  const indicatorProps = useMemo(() => {
    return { className: TabIndicator(theme) };
  }, [theme]);

  return (
    <TabsContext.Provider value={contextValue}>
      <StyledTabs TabIndicatorProps={indicatorProps} ref={ref} {...rest} />
    </TabsContext.Provider>
  );
});

export default Tabs;

export interface TabProps extends RawTabProps {
  count?: number;
}

/**
 * @see https://v4.mui.com/components/tabs/
 */
export const Tab = forwardRef<HTMLDivElement, TabProps>(function Tab(
  props,
  ref
) {
  const { count, label, ...rest } = props;
  const context = useContext(TabsContext);
  const Label =
    // (thuang): `count` can be 0, which is a valid count value.
    count === undefined ? (
      label
    ) : (
      <LabelWithCount label={label} count={count} />
    );

  return <StyledTab label={Label} ref={ref} {...rest} {...context} />;
});
