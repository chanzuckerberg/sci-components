import { Tab, Tabs, TabsProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CommonThemeProps, fontBodyXs, getColors, getSpaces } from "../styles";

export interface NavigationJumpToExtraProps
  extends Omit<
      TabsProps,
      "indicatorColor" | "nonce" | "rev" | "rel" | "autoFocus" | "content"
    >,
    CommonThemeProps {
  sdsIndicatorColor?:
    | "primary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "gray"
    | "beta";
}

const doNotForwardProps = ["items", "sdsIndicatorColor"];

export const StyledTabs = styled(Tabs, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: NavigationJumpToExtraProps) => {
    const { sdsIndicatorColor = "primary" } = props;
    const colors = getColors(props);
    const spaces = getSpaces(props);

    return `
      &:before {
        background-color: ${colors?.gray[200]};
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
        background-color: ${colors?.[sdsIndicatorColor][400]} !important;
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
    const colors = getColors(props);

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
        background-color: ${colors?.gray[400]};
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
        backgroundColor: ${colors?.gray[200]};
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
