import { SerializedStyles } from "@emotion/react";
import {
  Tab as RawTab,
  Tabs as RawTabs,
  TabsProps as RawTabsProps,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  focusVisibleA11yStyle,
  CommonThemeProps,
  getSemanticColors,
  getSpaces,
  fontBodyS,
  fontBodyXs,
  getCorners,
} from "src/core/styles";
import { SdsSize } from "./components/common";
import { Count, Label } from "./components/LabelWithCount/style";

export type TabsProps = RawTabsProps & {
  underlined?: boolean;
  sdsSize?: "small" | "large";
} & CommonThemeProps;

const TempTabs = (props: RawTabsProps) => <RawTabs {...props} />;

const TABS_DO_NOT_FORWARD_PROPS = ["underlined", "sdsSize"];

export const StyledTabs = styled(TempTabs, {
  shouldForwardProp: (prop) =>
    !TABS_DO_NOT_FORWARD_PROPS.includes(String(prop)),
})`
  box-sizing: border-box;
  padding-bottom: 0px;
  min-height: unset;
  position: relative;
  z-index: 1;
  overflow: inherit;

  & .MuiTabs-scroller {
    overflow: inherit !important;
  }

  ${(props: TabsProps) => {
    const { underlined, sdsSize = "large" } = props;
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    const isLarge = sdsSize === "large";

    return `
      margin-top: ${isLarge ? spaces?.l : spaces?.m}px;
      margin-bottom: ${isLarge ? spaces?.xl : spaces?.m}px;
      ${underlined ? `box-shadow: inset 0 -1px 0 0 ${semanticColors?.base?.divider}` : ""}
    `;
  }}
`;

const TAB_DO_NOT_FORWARD_PROPS = ["sdsSize"];

interface TabProps extends CommonThemeProps {
  sdsSize: SdsSize;
}

export const StyledTab = styled(RawTab, {
  shouldForwardProp: (prop) => !TAB_DO_NOT_FORWARD_PROPS.includes(String(prop)),
})<TabProps>`
  ${tabFontMixin}
  ${focusVisibleA11yStyle}

  ${(props) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    return `
      min-height: unset;
      padding: ${spaces?.xxxs}px ${spaces?.m}px ${spaces?.xxs}px;
      min-width: 32px;

      color: ${semanticColors?.base?.textSecondary};

      &:hover {
        box-shadow: inset 0 -2px 0 0 ${semanticColors?.base?.borderPrimaryHover};
        color: ${semanticColors?.base?.textPrimary};
        background-color: ${semanticColors?.base?.fillOpen};
        border-top-right-radius: ${corners?.l}px;
        border-top-left-radius: ${corners?.l}px;
      }

      &.Mui-selected {
        color: ${semanticColors?.base?.textPrimary};
        font-weight: 500;

        ${Label} {
          font-weight: 500;
          color: ${semanticColors?.base?.textPrimary};
        }

        ${Count} {
          color: ${semanticColors?.base?.textPrimary};
        }

        &:hover {
          color: ${semanticColors?.base?.textPrimary};
        }
      }

      &:active {
        color: ${semanticColors?.base?.textPrimary};
      }

      &:disabled {
        color: ${semanticColors?.base?.textDisabled};
      }
    `;
  }}
`;

function tabFontMixin(props: TabProps): SerializedStyles | null {
  const { sdsSize } = props;
  const isLarge = sdsSize === "large";

  return isLarge ? fontBodyS(props) : fontBodyXs(props);
}
