import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyMediumL,
  fontBodyMediumS,
  fontBodySemiboldM,
  fontBodySemiboldL,
  fontBodySemiboldS,
  fontCapsXxxxs,
  getSemanticColors,
  getSpaces,
  getCorners,
} from "src/core/styles";
import { css, SerializedStyles } from "@emotion/react";
import ListSubheader from "src/core/List/components/ListSubheader";
import { Divider } from "@mui/material";
import { ExtraHeaderProps } from "../style";
import { AccordionDetails } from "src/core/Accordion";

const doNotForwardProps = [
  "isNarrow",
  "hasSection",
  "hasInvertedStyle",
  "sectionProps",
  "sdsStyle",
];

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

  ${(props: CommonThemeProps & { isNarrow?: boolean }) => {
    const { isNarrow } = props;
    const spaces = getSpaces(props);

    return css`
      column-gap: ${spaces?.m}px;
      row-gap: ${spaces?.s}px;
      ${isNarrow && NarrowStyledSection()}
    `;
  }}
`;

export const StyledSectionHeader = styled(ListSubheader, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraHeaderProps) => {
    const { isNarrow, hasInvertedStyle, sdsStyle } = props;

    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    function getBackgroundColor() {
      if (isNarrow) {
        return hasInvertedStyle
          ? semanticColors?.base.backgroundPrimaryDark
          : semanticColors?.base.backgroundPrimary;
      }

      return semanticColors?.base?.surface;
    }

    function getTextColor() {
      if (isNarrow) {
        return hasInvertedStyle
          ? semanticColors?.base.textSecondaryOnDark
          : semanticColors?.base.textSecondary;
      }

      return semanticColors?.base?.textSecondary;
    }

    if (sdsStyle === "drawer") {
      return css`
        ${fontBodySemiboldM(props)}
        top: 0;
        color: ${getTextColor()} !important;
        background-color: transparent;
        padding: 0;
        margin-bottom: ${spaces?.xxs}px !important;
      `;
    }

    return css`
      &.MuiListSubheader-root {
        ${fontCapsXxxxs(props)}
        top: 0;
        color: ${getTextColor()};
        background-color: ${getBackgroundColor()};
        padding: ${spaces?.xxs}px ${isNarrow ? spaces?.xl : spaces?.xs}px;
        margin-bottom: 0;
      }
    `;
  }}
`;

export const StyledAccordionDetails = styled(AccordionDetails, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: CommonThemeProps & { sdsStyle?: "dropdown" | "drawer" }) => {
    const { sdsStyle } = props;
    const spaces = getSpaces(props);

    return css`
      ${sdsStyle === "drawer" &&
      css`
        display: flex;
        flex-direction: column;
        gap: ${spaces?.m}px;
      `}
    `;
  }}
`;

export const StyledAccordionSection = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(
    props: CommonThemeProps & {
      sdsStyle?: "dropdown" | "drawer";
      hasInvertedStyle?: boolean;
    }
  ) => {
    const { sdsStyle, hasInvertedStyle } = props;
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    if (sdsStyle === "drawer") {
      return css`
        border-radius: ${corners?.xl}px;
        padding: ${spaces?.l}px;
        background-color: ${hasInvertedStyle
          ? semanticColors?.base?.backgroundSecondaryOnDark
          : semanticColors?.base?.backgroundSecondary};
      `;
    }

    return css`
      padding: 0;
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
      return hasSection ? spaces?.s : spaces?.xxs;
    };

    const getBorderColor = () => {
      if (isNarrow) {
        return hasInvertedStyle
          ? semanticColors?.base?.dividerOnDark
          : semanticColors?.base?.divider;
      }

      return semanticColors?.base?.divider;
    };

    return css`
      &.MuiDivider-root {
        position: relative;
        margin: 0 0 ${getMarginBottom()}px;
        border-bottom: solid 1px ${getBorderColor()};
        padding-bottom: ${spaces?.xxs}px;
      }
    `;
  }}
`;

export const StyledLabelTextWrapper = styled("div")`
  ${(props: CommonThemeProps & { active?: boolean; isNarrow?: boolean }) => {
    const { active, isNarrow } = props;

    return [
      isNarrow
        ? active
          ? fontBodySemiboldL(props)
          : fontBodyMediumL(props)
        : active
          ? fontBodySemiboldS(props)
          : fontBodyMediumS(props),
      css`
        position: absolute;
      `,
    ];
  }}
`;

export const StyledLabelTextWrapperShadow = styled("div")`
  ${(props: CommonThemeProps & { active?: boolean; isNarrow?: boolean }) => {
    const { isNarrow } = props;
    return css`
      ${isNarrow ? fontBodySemiboldL(props) : fontBodySemiboldS(props)}
      visibility: hidden;
      opacity: 0;
    `;
  }}
`;
