import { css } from "@emotion/css";
import { TabProps as RawTabProps, useTheme } from "@mui/material";
import React, { ReactNode, forwardRef, useContext, useMemo } from "react";
import { SDSTheme } from "../styles/common/types";
import { getSemanticComponentColors } from "../styles/common/selectors/theme";
import LabelWithCount from "./components/LabelWithCount";
import { TabsContext } from "./components/common";
import { StyledTab, StyledTabs, TabsProps } from "./style";

export type { TabsProps };

const TabIndicator = (theme: SDSTheme) => {
  const semanticComponentColors = getSemanticComponentColors({ theme });

  return css`
    &.MuiTabs-indicator {
      background-color: ${semanticComponentColors?.accent?.border};
      height: 2px;
      bottom: -2px;
      z-index: 2;
    }
  `;
};

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  function Tabs(props, ref): React.ReactElement {
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
  }
);

export default Tabs;

export interface TabProps extends RawTabProps {
  count?: ReactNode;
}

/**
 * @see https://mui.com/material-ui/react-tabs/
 */
export const Tab = forwardRef<HTMLDivElement, TabProps>(
  function Tab(props, ref) {
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
  }
);
