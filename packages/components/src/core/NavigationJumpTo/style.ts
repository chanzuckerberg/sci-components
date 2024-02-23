import { Tab, Tabs, TabsProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyXs,
  getSemanticComponentColors,
  getSpaces,
} from "../styles";

export interface NavigationJumpToExtraProps
  extends Omit<TabsProps, "indicatorColor" | "onChange">,
    CommonThemeProps {
  sdsIndicatorColor?:
    | "accent"
    | "negative"
    | "info"
    | "positive"
    | "notice"
    | "beta";
}

const doNotForwardProps = ["items", "sdsIndicatorColor"];

export const StyledTabs = styled(Tabs, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: NavigationJumpToExtraProps) => {
    const { sdsIndicatorColor = "info" } = props;
    const spaces = getSpaces(props);
    const semanticComponentColors = getSemanticComponentColors(props);

    return `
      &:before {
        background-color: ${semanticComponentColors?.base?.surfaceTertiary};
        border-radius: ${spaces?.xxxs}px;
        content: "";
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: ${spaces?.xxxs}px;
      }
      max-width: 180px;
      top: ${spaces?.xl}px;
      margin-bottom: ${spaces?.l}px;
      margin-right: ${spaces?.m}px;
      position: sticky;
      .MuiTabs-indicator {
        background-color: ${semanticComponentColors?.[sdsIndicatorColor]?.fill} !important;
        border-radius: 2px;
        left: 0;
        width: 2px;
      }
    `;
  }}
`;

export const StyledTab = styled(Tab, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBodyXs}

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticComponentColors = getSemanticComponentColors(props);

    return `
      box-sizing: border-box;
      max-width: 180px;
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
        background-color: ${semanticComponentColors?.base?.border};
        display: none;
        border-radius: ${spaces?.xxxs}px;
      }
      &:hover {
        color: black;
        &:before {
          display: block;
        }
      }
      &.Mui-selected {
        color: black;
        font-weight: 600;
      }
      &.MuiTabs-indicator {
        backgroundColor: ${semanticComponentColors?.base?.surfaceTertiary};
        width: ${spaces?.xxxs}px;
      }
      &.MuiButtonBase-root {
        white-space: nowrap;
        padding: 0;
        overflow: visible;
      }
    `;
  }}
`;
