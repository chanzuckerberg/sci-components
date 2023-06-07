import { SerializedStyles } from "@emotion/react";
import {
  Tab as RawTab,
  Tabs as RawTabs,
  TabsProps as RawTabsProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { fontBodyS, fontBodyXs } from "../styles";
import {
  CommonThemeProps,
  getColors,
  getFontWeights,
  getSpaces,
} from "../styles/common/selectors/theme";
import { SdsSize } from "./components/common";

export type TabsProps = Omit<
  RawTabsProps,
  "nonce" | "rev" | "rel" | "autoFocus" | "content"
> & {
  underlined?: boolean;
  sdsSize?: "small" | "large";
};

const TempTabs = (props: RawTabsProps) => <RawTabs {...props} />;

const TABS_DO_NOT_FORWARD_PROPS = ["underlined", "sdsSize"];

export const StyledTabs = styled(TempTabs, {
  shouldForwardProp: (prop) =>
    !TABS_DO_NOT_FORWARD_PROPS.includes(String(prop)),
})<TabsProps>`
  box-sizing: border-box;
  padding-bottom: 0px;
  min-height: unset;
  position: relative;
  z-index: 1;
  overflow: inherit;

  & .MuiTabs-scroller {
    overflow: inherit !important;
  }

  ${(props) => {
    const { underlined, sdsSize = "large" } = props;
    const colors = getColors(props);
    const spaces = getSpaces(props);

    const isLarge = sdsSize === "large";

    return `
      margin-top: ${isLarge ? spaces?.l : spaces?.m}px;
      margin-bottom: ${isLarge ? spaces?.xl : spaces?.m}px;
      border-bottom: ${underlined ? `2px solid ${colors?.gray[200]};` : "none"};
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

  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    const fontWeights = getFontWeights(props);

    const { sdsSize } = props;

    const isLarge = sdsSize === "large";

    return `
      font-weight: ${fontWeights?.semibold};
      margin: 0 ${spaces?.xl}px ${spaces?.xxs}px 0;

      // (thuang): Large Tab height is 30px, the offset is 4px
      height: ${isLarge ? 26 : 22}px;

      color: ${colors?.gray[500]};

      &:hover, :focus {
        color: black;
      }

      &.Mui-selected {
        color: black;

        &:hover {
          color: black;
        }
      }

      &:active {
        color: black;
      }

      &:disabled {
        color: ${colors?.gray[200]};
      }
    `;
  }}
`;

function tabFontMixin(props: TabProps): SerializedStyles | null {
  const { sdsSize } = props;
  const isLarge = sdsSize === "large";

  return isLarge ? fontBodyS(props) : fontBodyXs(props);
}
