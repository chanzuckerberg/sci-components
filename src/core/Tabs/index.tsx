import { css } from "@emotion/css";
import styled from "@emotion/styled";
import {
  Tab as RawTab,
  Tabs as RawTabs,
  TabsProps as RawTabsProps,
  useTheme,
} from "@material-ui/core";
import React, { ChangeEvent, FormEvent } from "react";
import { AppThemeOptions } from "../styles/common/defaultTheme";
import {
  getColors,
  getPalette,
  getSpacings,
} from "../styles/common/selectors/theme";

// (thuang): https://github.com/mui-org/material-ui/issues/17454#issuecomment-647132303
// Will be fixed in v5.x
interface TabsPropsFixed extends Omit<RawTabsProps, "onChange"> {
  onChange:
    | ((event: ChangeEvent<Record<string, unknown>>, value: never) => void)
    | ((event: FormEvent<HTMLButtonElement>) => void);
}

// (thuang): Use this instead of MUI's raw Tabs. `onChange` type will be fixed
// in v5.x
// https://github.com/mui-org/material-ui/issues/17454#issuecomment-647132303
const TempTabs = (props: TabsPropsFixed) => <RawTabs {...(props as never)} />;

export type TabsProps = TabsPropsFixed & {
  underlined?: boolean;
};

const StyledTabs = styled(TempTabs, {
  shouldForwardProp: (prop) => prop !== "underlined",
})<TabsProps>`
  ${(props) => {
    const { underlined } = props;
    const colors = getColors(props);

    return `
      box-sizing: border-box;
      padding-bottom: 0px;
      margin-bottom: 0px;
      border-bottom: ${underlined ? `3px solid ${colors?.gray[200]};` : "none"};
      position: relative;
      z-index: 1;
      overflow: inherit;

      & .MuiTabs-scroller {
        overflow: inherit !important;
      }
    `;
  }}
`;

const TabIndicator = (theme: AppThemeOptions) => {
  const colors = getColors({ theme });

  return css`
    background-color: ${colors?.primary[400]};
    height: 3px;
    bottom: -3px;
    z-index: 2;
  `;
};

const Tabs = (props: TabsProps): React.ReactElement => {
  const theme = useTheme();

  return (
    <StyledTabs
      {...props}
      TabIndicatorProps={{ className: TabIndicator(theme) }}
    />
  );
};

export default Tabs;

export const Tab = styled(RawTab)`
  ${(props) => {
    const colors = getColors(props);
    const spacings = getSpacings(props);
    const palette = getPalette(props);

    return `
      color: ${colors?.gray[500]};
      text-transform: none;
      height: 20px;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      padding-bottom: ${spacings?.xxs}px;
      &:hover {
        color: ${colors?.gray[600]};
      }
      &:active {
        color: ${palette?.text?.primary};
      }
      &:disabled {
        color: ${colors?.gray[200]};
      }
    `;
  }}
`;
