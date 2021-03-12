import { css } from "@emotion/css";
import styled from "@emotion/styled";
import {
  StylesProvider,
  Tab as RawTab,
  Tabs as RawTabs,
  TabsProps as RawTabsProps,
} from "@material-ui/core";
import React from "react";
import { defaultThemeOptions } from "../styles";

export interface TabsProps extends RawTabsProps {
  underlined?: boolean;
}

const StyledTabs = styled(RawTabs)<TabsProps>`
  box-sizing: border-box;
  padding-bottom: 0px;
  margin-bottom: 0px;
  border-bottom: ${({ underlined }) =>
    underlined
      ? `3px solid ${defaultThemeOptions.app.colors.gray[200]};`
      : "none"};
  position: relative;
  z-index: 1;
  overflow: inherit;
  & .MuiTabs-scroller {
    overflow: inherit !important;
  }
`;
const TabIndicator = css`
  background-color: ${defaultThemeOptions.app.colors.primary[400]};
  height: 3px;
  bottom: -3px;
  z-index: 2;
`;

const Tabs = (props: TabsProps) => {
  return (
    <StylesProvider injectFirst>
      {/*  eslint-disable-next-line react/jsx-props-no-spreading -- disable prop spread for extension */}
      <StyledTabs {...props} TabIndicatorProps={{ className: TabIndicator }} />
    </StylesProvider>
  );
};

export default Tabs;

export const Tab = styled(RawTab)`
  color: ${defaultThemeOptions.app.colors.gray[500]};
  text-transform: none;
  height: 20px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  padding-bottom: ${defaultThemeOptions.app.spacing.xxs}px;
  &:hover {
    color: ${defaultThemeOptions.app.colors.gray[600]};
  }
  &:active {
    color: ${defaultThemeOptions.palette?.text?.primary};
  }
  &:disabled {
    color: ${defaultThemeOptions.app.colors.gray[200]};
  }
`;
