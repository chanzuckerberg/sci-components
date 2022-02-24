import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Tab as RawTab,
  Tabs as RawTabs,
  TabsProps as RawTabsProps,
} from "@material-ui/core";
import React, { ChangeEvent, FormEvent } from "react";
import { fontBodyS, fontBodyXs } from "../styles";
import {
  getColors,
  getFontWeights,
  getPalette,
  getSpaces,
  Props,
} from "../styles/common/selectors/theme";
import { SdsSize } from "./components/common";

// TODO(185930): https://github.com/mui-org/material-ui/issues/17454#issuecomment-647132303
// Will be fixed in v5.x
interface TabsPropsFixed extends Omit<RawTabsProps, "onChange"> {
  onChange:
    | ((event: ChangeEvent<Record<string, unknown>>, value: never) => void)
    | ((event: FormEvent<HTMLButtonElement>) => void);
}

export type TabsProps = TabsPropsFixed & {
  underlined?: boolean;
  sdsSize?: "small" | "large";
};

// TODO(185930): Use this instead of MUI's raw Tabs. `onChange` type will be fixed
// in v5.x
// https://github.com/mui-org/material-ui/issues/17454#issuecomment-647132303
const TempTabs = (props: TabsPropsFixed) => <RawTabs {...(props as never)} />;

export const StyledTabs = styled(TempTabs, {
  shouldForwardProp: (prop) => prop !== "underlined",
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

interface TabProps extends Props {
  sdsSize: SdsSize;
}

export const StyledTab = styled(RawTab, {
  shouldForwardProp: (prop) => !TAB_DO_NOT_FORWARD_PROPS.includes(String(prop)),
})<TabProps>`
  color: black;
  min-height: unset;
  padding: 0;
  min-width: 32px;

  ${tabFontMixin}

  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    const palette = getPalette(props);
    const fontWeights = getFontWeights(props);

    const { sdsSize } = props;

    const isLarge = sdsSize === "large";

    return `
      font-weight: ${fontWeights?.semibold};
      margin: 0 ${spaces?.xl}px ${spaces?.xxs}px 0;

      // (thuang): Large Tab height is 30px, the offset is 4px
      height: ${isLarge ? 26 : 22}px;

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

function tabFontMixin(props: TabProps): SerializedStyles | null {
  const { sdsSize } = props;
  const isLarge = sdsSize === "large";

  return isLarge ? fontBodyS(props) : fontBodyXs(props);
}
