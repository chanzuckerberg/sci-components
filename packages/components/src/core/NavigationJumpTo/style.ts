import { Tab, Tabs, TabsProps, tabsClasses } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyXs,
  getCorners,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import { focusVisibleA11yStyle } from "src/core/styles/common/mixins/a11y";
import { CSSProperties } from "react";

export interface NavigationJumpToExtraProps
  extends Omit<TabsProps, "onChange">,
    CommonThemeProps {
  width?: CSSProperties["width"];
  isSubItem?: boolean;
}

const doNotForwardProps = ["items", "sdsIndicatorColor", "width", "isSubItem"];

export const StyledTabs = styled(Tabs, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: NavigationJumpToExtraProps) => {
    const { width = "100%" } = props;
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      &:before {
        background-color: ${semanticColors?.base?.divider};
        border-radius: 0;
        content: "";
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 1px;
      }

      width: ${width};
      top: ${spaces?.xl}px;
      margin-bottom: ${spaces?.l}px;
      margin-right: ${spaces?.m}px;
      position: sticky;
      overflow: visible;

      .${tabsClasses.indicator} {
        background-color: ${semanticColors?.accent?.borderSelected} !important;
        border-radius: 0;
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
    const corners = getCorners(props);
    const { isSubItem = false } = props;
    const leftPadding = isSubItem ? spaces?.xl : spaces?.m;

    return `
      ${focusVisibleA11yStyle(props)}
      box-sizing: border-box;
      padding: ${spaces?.xs}px ${spaces?.m}px ${spaces?.xs}px ${leftPadding}px !important;
      align-items: start;
      min-height: unset;
      max-height: unset;
      text-transform: none;
      border-top-right-radius: ${corners?.l}px;
      border-bottom-right-radius: ${corners?.l}px;
      &:last-child {
        margin-bottom: 0;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: ${spaces?.xxxs}px;
        height: 100%;
        background-color: ${semanticColors?.base?.borderPrimaryHover};
        display: none;
        border-radius: ${spaces?.xxxs}px;
      }
      &:hover {
        color: ${semanticColors?.base?.textPrimary};
        background-color: ${semanticColors?.base?.fillHover};
        &:before {
          display: block;
        }
      }
      &.Mui-selected {
        color: ${semanticColors?.base?.textPrimary};
        font-weight: 500;
      }
      &.MuiButtonBase-root {
        text-align: left;
        padding: 0;
        overflow: visible;
      }
    `;
  }}
`;
