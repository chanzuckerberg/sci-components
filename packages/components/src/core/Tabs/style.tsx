import { SerializedStyles } from "@emotion/react";
import {
  Tab as RawTab,
  Tabs as RawTabs,
  TabsProps as RawTabsProps,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  focusVisibleA11yStyle,
  fontBodySemiboldS,
  fontBodySemiboldXs,
  CommonThemeProps,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import { SdsSize } from "./components/common";

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
      border-bottom: ${underlined ? `2px solid ${semanticColors?.base?.divider};` : "none"};
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
  min-height: unset;
  padding: 0;
  min-width: 32px;
  opacity: 1 !important;

  ${tabFontMixin}
  ${focusVisibleA11yStyle}

  ${(props) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      margin-right: ${spaces?.xl}px;
      padding-bottom: ${spaces?.xxs}px;

      color: ${semanticColors?.base?.textSecondary};

      &:hover, :focus {
        box-shadow: 0 2px 0 0 ${semanticColors?.base?.border};
        color: ${semanticColors?.base?.textPrimary};
      }

      &.Mui-selected {
        color: ${semanticColors?.base?.textPrimary};

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

  return isLarge ? fontBodySemiboldS(props) : fontBodySemiboldXs(props);
}
