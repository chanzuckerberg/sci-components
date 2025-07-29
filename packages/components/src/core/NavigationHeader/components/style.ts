import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontCapsXxxxs,
  getSemanticColors,
  getSpaces,
  Spaces,
} from "src/core/styles";
import { css, SerializedStyles } from "@emotion/react";
import ListSubheader from "src/core/List/components/ListSubheader";
import { Divider } from "@mui/material";
import { ExtraHeaderProps } from "../style";

const doNotForwardProps = ["isNarrow", "hasSection"];

const NarrowStyledSection = (): SerializedStyles => {
  return css`
    align-items: start;
    flex-direction: column;
  `;
};

export const StyledSection = styled("section", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  display: flex;
  align-items: center;

  ${(props: CommonThemeProps & { gap?: keyof Spaces; isNarrow?: boolean }) => {
    const { isNarrow } = props;
    const spaces = getSpaces(props);

    return css`
      column-gap: ${spaces?.[props?.gap ?? "xl"]}px;

      ${isNarrow && NarrowStyledSection()}
    `;
  }}
`;

export const StyledSectionHeader = styled(ListSubheader, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraHeaderProps) => {
    const { isNarrow, hasInvertedStyle } = props;

    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    function getBackgroundColor() {
      if (isNarrow) {
        return hasInvertedStyle
          ? semanticColors?.base.backgroundPrimaryInverse
          : semanticColors?.base.backgroundPrimary;
      }

      return semanticColors?.base?.surface;
    }

    function getTextColor() {
      if (isNarrow) {
        return hasInvertedStyle
          ? semanticColors?.base.textSecondaryInverse
          : semanticColors?.base.textSecondary;
      }

      return semanticColors?.base?.textSecondary;
    }

    return css`
      &.MuiListSubheader-root {
        ${fontCapsXxxxs(props)}
        top: 0;
        color: ${getTextColor()};
        background-color: ${getBackgroundColor()};
        padding: ${spaces?.xxs}px ${isNarrow ? spaces?.xl : spaces?.s}px;
        margin-bottom: 0;
      }
    `;
  }}
`;

interface StyledDividerProps extends CommonThemeProps {
  hasSection?: boolean;
  isNarrow?: boolean;
  hasInvertedStyle?: boolean;
}

export const StyledDivider = styled(Divider, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StyledDividerProps) => {
    const { hasSection, isNarrow, hasInvertedStyle } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    // Calculate margin based on section and narrow state
    const getMarginBottom = () => {
      return hasSection ? spaces?.s : isNarrow ? 0 : spaces?.xxs;
    };

    const getBorderColor = () => {
      if (isNarrow) {
        return hasInvertedStyle
          ? semanticColors?.base?.dividerInverse
          : semanticColors?.base?.divider;
      }

      return semanticColors?.base?.divider;
    };

    return css`
      &.MuiDivider-root {
        position: relative;
        margin: 0 0 ${getMarginBottom()}px;
        border-bottom: solid 1px ${getBorderColor()};
        padding-bottom: ${isNarrow ? 0 : spaces?.xxs}px;
      }
    `;
  }}
`;
