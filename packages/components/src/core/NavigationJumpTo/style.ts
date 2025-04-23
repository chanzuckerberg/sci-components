import { Tab, Tabs, TabsProps, tabsClasses } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import { focusVisibleA11yStyle } from "src/core/styles/common/mixins/a11y";
import { CSSProperties } from "react";

export interface NavigationJumpToExtraProps
  extends Omit<TabsProps, "onChange">,
    CommonThemeProps {
  width?: CSSProperties["width"];
}

const doNotForwardProps = ["items", "sdsIndicatorColor", "width"];

export const StyledTabs = styled(Tabs, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: NavigationJumpToExtraProps) => {
    const { width = "180px" } = props;
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      &:before {
        background-color: ${semanticColors?.base?.divider};
        border-radius: ${spaces?.xxxs}px;
        content: "";
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: ${spaces?.xxxs}px;
      }

      width: ${width};
      top: ${spaces?.xl}px;
      margin-bottom: ${spaces?.l}px;
      margin-right: ${spaces?.m}px;
      position: sticky;
      overflow: visible;

      .${tabsClasses.indicator} {
        background-color: ${semanticColors?.accent?.borderSelected} !important;
        border-radius: 2px;
        left: 0;
        width: 2px;
      }

      .${tabsClasses.scroller} {
        overflow: visible !important;
      }
    `;
  }}
`;

export const StyledTab = styled(Tab, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBodyXs}

  ${(props: NavigationJumpToExtraProps) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      ${focusVisibleA11yStyle(props)}
      box-sizing: border-box;
      padding-left: ${spaces?.l}px;
      margin: 0 ${spaces?.l}px ${spaces?.m}px ${spaces?.l}px;
      align-items: start;
      min-height: unset;
      max-height: unset;
      text-transform: none;
      &:last-child {
        margin-bottom: 0;
      }
      &:before {
        content: "";
        position: absolute;
        left: -${spaces?.l}px;
        width: ${spaces?.xxxs}px;
        height: 100%;
        background-color: ${semanticColors?.base?.borderPrimary};
        display: none;
        border-radius: ${spaces?.xxxs}px;
      }
      &:hover {
        color: ${semanticColors?.base?.textPrimary};
        &:before {
          display: block;
        }
      }
      &.Mui-selected {
        color: ${semanticColors?.base?.textPrimary};
        font-weight: 600;
      }
      &.MuiButtonBase-root {
        text-align: left;
        padding: 0;
        overflow: visible;
      }
    `;
  }}
`;
