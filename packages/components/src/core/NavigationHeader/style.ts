/* eslint-disable sonarjs/no-duplicate-string */
import { AppBar, Divider, Drawer, Toolbar, css } from "@mui/material";
import {
  CommonThemeProps,
  fontBodyMediumL,
  fontBodyL,
  fontBodyS,
  fontBodySemiboldL,
  fontBodySemiboldS,
  fontBodyXs,
  fontHeaderL,
  fontHeaderM,
  getCorners,
  getIconSizes,
  getSemanticColors,
  getShadows,
  getSpaces,
} from "../styles";
import Tag from "../Tag";
import InputSearch from "../InputSearch";
import styled from "@emotion/styled";
import Link from "../Link";
import Button, { SdsButtonProps, SdsMinimalButtonProps } from "../Button";
import { SerializedStyles } from "@emotion/react";
import { IconButtonProps } from "./NavigationHeader.types";
import Accordion from "../Accordion";

export interface ExtraHeaderProps extends CommonThemeProps {
  hasInvertedStyle?: boolean;
  isNarrow?: boolean;
}

const doNotForwardProps = [
  "hasInvertedStyle",
  "isNarrow",
  "primaryNavPosition",
  "showSearch",
  "logoLinkComponent",
  "logoLinkProps",
];

export const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraHeaderProps) => {
    const colors = getSemanticColors(props);

    return `
      background-color: ${props.hasInvertedStyle ? colors?.base.backgroundPrimaryOnDark : colors?.base.backgroundPrimary};
      background-image: none;
      max-width: 100%;
      overflow-x: auto;
    `;
  }}
`;

const NarrowToolbar = (props: ExtraHeaderProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    border-bottom: 1px solid
      ${props.hasInvertedStyle
        ? semanticColors?.base.dividerOnDark
        : semanticColors?.base.divider};
    background-color: ${props.hasInvertedStyle
      ? semanticColors?.base.backgroundPrimaryOnDark
      : semanticColors?.base.backgroundPrimary};
    background-image: none;
    box-shadow: none;
    position: sticky !important;
    top: 0;
    z-index: 1000;
    justify-content: space-between;
  `;
};

export const StyledToolbar = styled(Toolbar, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraHeaderProps) => {
    const { isNarrow } = props;

    const spaces = getSpaces(props);

    return css`
      &.MuiToolbar-root {
        min-height: 48px;
        max-height: 48px;
        padding: ${spaces?.s}px ${spaces?.xl}px;

        ${isNarrow && NarrowToolbar(props)}
      }
    `;
  }}
`;

export const StyledShadowElement = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraHeaderProps) => {
    const shadows = getShadows(props);

    return `
      box-shadow: ${shadows?.m};
      height: 10px;
      display: block;
      position: fixed;
      width: 100%;
      top: 46px;
      left: 0;
      z-index: 100;
    `;
  }}
`;

export const StyledShadowCoverElement = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraHeaderProps) => {
    const colors = getSemanticColors(props);

    return `
      background: ${props.hasInvertedStyle ? colors?.base.backgroundPrimaryOnDark : colors?.base.backgroundPrimary};
      height: 10px;
      display: block;
      position: absolute;
      width: 100%;
      top: 56px;
      left: 0;
      z-index: 100;
    `;
  }}
`;

export interface ExtraButtonProps extends CommonThemeProps {
  hasInvertedStyle?: boolean;
}

export const StyledHeaderButton = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})<
  ExtraButtonProps &
    (SdsMinimalButtonProps | SdsButtonProps) & { isNarrow?: boolean }
>`
  ${(props) => {
    const { sdsType, hasInvertedStyle, isNarrow } = props;

    const mode = props?.theme?.palette?.mode || "light";
    const semanticColors = getSemanticColors(props);

    const secondaryButtonStyles = `
      box-shadow: inset 0 0 0 1px ${mode === "light" ? "white" : semanticColors?.accent?.fillPrimary};
      color: ${mode === "light" ? "white" : semanticColors?.accent?.fillPrimary};
      &:hover {
        background-color: ${semanticColors?.accent?.fillHover};
        box-shadow: inset 0 0 0 1px ${semanticColors?.accent?.fillHover};
        color: ${semanticColors?.base?.textPrimaryOnDark};
      }
    `;

    return css`
      ${sdsType === "secondary" && hasInvertedStyle
        ? secondaryButtonStyles
        : ""}
      ${isNarrow && fontBodyL(props)}
    `;
  }}
`;

const invertedNarrowButtonStyles = (
  props: ExtraButtonProps & (SdsMinimalButtonProps | SdsButtonProps)
): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    color: ${semanticColors?.base?.textPrimaryOnDark};
    svg {
      fill: ${semanticColors?.base?.ornamentPrimaryOnDark};
    }

    &:hover,
    &:focus,
    &:active,
    &:focus-within {
      color: ${semanticColors?.base?.textPrimaryOnDark};
      svg {
        fill: ${semanticColors?.base?.ornamentPrimaryOnDark};
      }
    }
  `;
};

export const StyledNarrowIconButton = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})<
  ExtraButtonProps &
    (SdsMinimalButtonProps | SdsButtonProps) & { isNarrow?: boolean }
>`
  ${(props) => {
    const { hasInvertedStyle, isNarrow } = props;

    return css`
      ${hasInvertedStyle && invertedNarrowButtonStyles(props)}
      ${isNarrow && fontBodyL(props)}
    `;
  }}
`;

const invertedWideButtonStyles = (
  props: ExtraButtonProps & IconButtonProps
): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    svg {
      fill: ${semanticColors?.base?.ornamentSecondaryOnDark};
    }

    &:hover,
    &:focus,
    &:active,
    &:focus-within {
      svg {
        fill: ${semanticColors?.base?.ornamentPrimaryOnDark};
      }
    }
  `;
};

export const StyledWideIconButton = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})<ExtraButtonProps & IconButtonProps>`
  ${(props) => {
    const { hasInvertedStyle } = props;

    return css`
      ${hasInvertedStyle && invertedWideButtonStyles(props)}
      margin: 0;
    `;
  }}
`;

export const StyledLogoLinkWrapper = styled(Link, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  align-items: center;
  display: flex;
  text-decoration: none !important;

  ${(props: ExtraHeaderProps) => {
    const { isNarrow } = props;

    return css`
      width: ${isNarrow ? "100%" : "auto"};
    `;
  }}
`;

export const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NarrowTitleContainer = (): SerializedStyles => {
  return css`
    p {
      margin: 0px;
      margin-block: 0px;
    }
  `;
};

export const StyledTitleContainer = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  display: flex;
  align-items: center;

  ${(props: ExtraHeaderProps) => {
    const { isNarrow } = props;

    const colors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return css`
      gap: ${spaces?.l}px;
      color: ${props.hasInvertedStyle
        ? colors?.base.textPrimaryOnDark
        : colors?.base.textPrimary};
      margin-right: ${spaces?.xxl}px;
      width: 100%;

      ${isNarrow && NarrowTitleContainer()}
    `;
  }}
`;

export const StyledTitleTagWrapper = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraHeaderProps) => {
    const spaces = getSpaces(props);

    return css`
      display: flex;
      align-items: center;
      gap: ${spaces?.xs}px;

      p {
        ${fontHeaderL(props)}
        margin: 0;
        white-space: nowrap;
      }
    `;
  }}
`;

export const StyledTag = styled(Tag)`
  margin: 0;
`;

interface StyledPrimaryNavContainerProps extends CommonThemeProps {
  primaryNavPosition?: "left" | "right";
  showSearch?: boolean;
  isNarrow?: boolean;
}

export const StyledPrimaryNavContainer = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  align-items: center;
  display: flex;
  flex-grow: 1;

  ${(props: StyledPrimaryNavContainerProps) => {
    const { showSearch, primaryNavPosition, isNarrow } = props;
    const spaces = getSpaces(props);

    const primaryNavPositionWithSearch =
      primaryNavPosition === "left" ? "flex-start" : "space-between";
    const primaryNavPositionWithoutSearch =
      primaryNavPosition === "left" ? "flex-start" : "flex-end";

    return css`
      flex-direction: ${isNarrow ? "column" : "row"};
      gap: ${spaces?.xxl}px;
      margin-right: ${spaces?.xxl}px;
      flex: 1;
      justify-content: ${showSearch
        ? primaryNavPositionWithSearch
        : primaryNavPositionWithoutSearch};
    `;
  }}
`;

interface ExtraSearchProps extends CommonThemeProps {
  hasInvertedStyle?: boolean;
  isNarrow?: boolean;
}

export const StyledSearch = styled(InputSearch, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  margin: 0;
  width: 100%;

  ${(props: ExtraSearchProps) => {
    const { hasInvertedStyle, isNarrow } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return css`
      max-width: ${isNarrow ? "100%" : "320px"};
      padding: ${isNarrow ? `${spaces?.m}px 0 ${spaces?.l}px` : ""};
      .MuiInputBase-root {
        color: ${hasInvertedStyle
          ? semanticColors?.base.textPrimaryOnDark
          : semanticColors?.base.textPrimary};
        fieldset {
          border-color: ${hasInvertedStyle
            ? semanticColors?.base?.borderPrimaryOnDark
            : ""};
        }

        .MuiInputBase-input {
          &::placeholder {
            color: ${hasInvertedStyle
              ? semanticColors?.base?.textTertiaryOnDark
              : semanticColors?.base?.textTertiary};
            opacity: 1;
          }
        }

        .MuiInputAdornment-root {
          .MuiButtonBase-root:last-of-type {
            svg {
              color: ${hasInvertedStyle
                ? semanticColors?.base?.ornamentSecondaryOnDark
                : ""};
            }
          }
        }

        &:hover {
          fieldset {
            border-color: ${hasInvertedStyle
              ? semanticColors?.base?.borderPrimaryHoverOnDark
              : ""} !important;
          }

          .MuiInputAdornment-root {
            .MuiButtonBase-root:last-of-type {
              svg {
                color: ${hasInvertedStyle
                  ? semanticColors?.base?.ornamentPrimaryOnDark
                  : ""};
              }
            }
          }
        }

        &.Mui-focused {
          fieldset {
            border-color: ${hasInvertedStyle
              ? semanticColors?.base?.borderPrimaryPressedOnDark
              : ""} !important;
          }

          .MuiInputAdornment-root {
            .MuiButtonBase-root:last-of-type {
              svg {
                color: ${hasInvertedStyle
                  ? semanticColors?.base?.ornamentPrimaryOnDark
                  : ""};
              }
            }
          }
        }

        &.Mui-disabled {
          fieldset {
            border-color: ${hasInvertedStyle
              ? semanticColors?.base?.borderPrimaryDisabledOnDark
              : ""} !important;
          }

          .MuiInputAdornment-root {
            .MuiButtonBase-root:last-of-type {
              svg {
                color: ${hasInvertedStyle
                  ? semanticColors?.base?.ornamentDisabledOnDark
                  : ""};
              }
            }
          }
        }
      }
    `;
  }}
`;

const NarrowButtonStyles = (props: ExtraHeaderProps): SerializedStyles => {
  const spaces = getSpaces(props);
  const sizes = getIconSizes(props);
  const colors = getSemanticColors(props);

  const backgroundColor = props.hasInvertedStyle
    ? colors?.base.backgroundPrimaryOnDark
    : colors?.base.backgroundPrimary;

  return css`
    background: ${backgroundColor};
    gap: ${spaces?.l}px;
    flex-direction: column;
    margin-left: 0;
    margin-top: ${spaces?.xxl}px;
    padding: ${spaces?.xl}px 0;
    position: sticky;
    bottom: 0;

    &::before {
      content: "";
      position: absolute;
      height: ${spaces?.xxl}px;
      width: 100%;
      background: linear-gradient(
        to top,
        ${backgroundColor} 0%,
        ${backgroundColor}00 100%
      );
      top: -${spaces?.xxl}px;
    }

    .MuiButton-icon .MuiSvgIcon-root {
      width: ${sizes?.l.width}px;
      height: ${sizes?.l.height}px;
    }
  `;
};

export const StyledButtonSection = styled("section", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  display: flex;
  align-items: center;
  z-index: 10;

  ${(props: ExtraHeaderProps) => {
    const { isNarrow } = props;

    const spaces = getSpaces(props);

    return css`
      gap: ${spaces?.m}px;
      margin-left: ${spaces?.xxl}px;

      ${isNarrow && NarrowButtonStyles(props)}
    `;
  }}
`;

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraHeaderProps) => {
    const colors = getSemanticColors(props);

    return `
      .MuiDrawer-paper {
        background: ${props.hasInvertedStyle ? colors?.base.backgroundPrimaryOnDark : colors?.base.backgroundPrimary};
        width: 100%;
        display: flex;
        flex-direction: column;
        min-height: 100dvh;
        justify-content: space-between;
      }
    `;
  }}
`;

export const StyledDrawerContent = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraHeaderProps) => {
    const spaces = getSpaces(props);

    return css`
      padding: 0 ${spaces?.xl}px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `;
  }}
`;

export const StyledNarrowButton = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraButtonProps & IconButtonProps) => {
    const { hasInvertedStyle } = props;

    return css`
      ${hasInvertedStyle && invertedWideButtonStyles(props)}
      margin: 0;
    `;
  }}
`;

export const StyledAccordion = styled(Accordion, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  padding: 0 !important;
  width: 100%;
  min-width: unset;

  .MuiAccordionSummary-content {
    ${fontBodyMediumL}
  }

  .MuiAccordionDetails-root .MuiButtonBase-root .primary-text {
    ${fontBodyS}
  }

  ${(props: ExtraHeaderProps) => {
    const { hasInvertedStyle } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    const textDefaultColor = hasInvertedStyle
      ? semanticColors?.base.textSecondaryOnDark
      : semanticColors?.base.textSecondary;

    const textOpenColor = hasInvertedStyle
      ? semanticColors?.base.textPrimaryOnDark
      : semanticColors?.base.textPrimary;

    const ChevronDefaultColor = hasInvertedStyle
      ? semanticColors?.base.ornamentSecondaryOnDark
      : semanticColors?.base.ornamentSecondary;

    const ChevronOpenColor = hasInvertedStyle
      ? semanticColors?.base?.ornamentSecondaryPressedOnDark
      : semanticColors?.base.ornamentSecondaryPressed;

    return css`
      .MuiButtonBase-root {
        padding: ${spaces?.s}px ${spaces?.m}px !important;
        border-radius: ${corners?.l}px;
        color: ${textDefaultColor};

        svg {
          color: ${ChevronDefaultColor};
        }

        &[aria-expanded="true"] {
          .MuiAccordionSummary-content {
            ${fontBodySemiboldL(props)}
          }
          color: ${textOpenColor};

          background-color: ${hasInvertedStyle
            ? semanticColors?.base?.fillPressedOnDark
            : semanticColors?.base?.fillPressed};

          svg {
            color: ${ChevronOpenColor} !important;
          }
        }

        &:hover {
          width: 100%;
          box-shadow: none;
          background: ${hasInvertedStyle
            ? semanticColors?.base.fillHoverOnDark
            : semanticColors?.base.fillHover};
          color: ${hasInvertedStyle
            ? semanticColors?.base.textPrimaryOnDark
            : semanticColors?.base.textPrimary};

          svg {
            color: ${hasInvertedStyle
              ? semanticColors?.base?.ornamentSecondaryHoverOnDark
              : semanticColors?.base.ornamentSecondaryHover} !important;
          }
        }
      }

      .MuiCollapse-root .MuiAccordionDetails-root {
        padding: 0;
        margin-top: ${spaces?.xxs}px;

        .MuiButtonBase-root {
          padding: ${spaces?.s}px ${spaces?.m}px ${spaces?.s}px ${spaces?.xl}px !important;

          .primary-text {
            color: ${hasInvertedStyle
              ? semanticColors?.base.textSecondaryOnDark
              : semanticColors?.base.textSecondary} !important;
          }

          &:hover {
            .primary-text {
              color: ${hasInvertedStyle
                ? semanticColors?.base.textPrimaryOnDark
                : semanticColors?.base.textPrimary} !important;
            }
          }
        }
      }
    `;
  }}
`;

interface StyledSectionDividerProps extends CommonThemeProps {
  hasInvertedStyle?: boolean;
}

export const StyledSectionDivider = styled(Divider, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: StyledSectionDividerProps) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      margin: ${spaces?.m}px 0;
      border-color: ${
        props.hasInvertedStyle
          ? semanticColors?.base.dividerOnDark
          : semanticColors?.base.divider
      };
    `;
  }}
`;

// Hover Drawer Components for sdsStyle="drawer"
export const StyledMegaMenuDrawer = styled(Drawer, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraHeaderProps) => {
    const { hasInvertedStyle } = props;
    const semanticColors = getSemanticColors(props);

    return css`
      pointer-events: none;

      .MuiDrawer-paper {
        background-color: ${hasInvertedStyle
          ? semanticColors?.base.backgroundPrimaryOnDark
          : semanticColors?.base.backgroundPrimary};
        top: 48px;
        height: auto;
        max-height: calc(100vh - 48px);
        overflow: visible;
        pointer-events: auto;
        transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.1);
      }

      .MuiSlide-root {
        transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      }
    `;
  }}
`;

export const StyledMegaMenuBackdrop = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${() => {
    return css`
      position: fixed;
      top: 48px;
      left: 0;
      right: 0;
      bottom: 0;
      backdrop-filter: blur(5px);
      z-index: 1200;
      animation: fadeInBlur 225ms cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: auto;

      @keyframes fadeInBlur {
        from {
          backdrop-filter: blur(0px);
        }
        to {
          backdrop-filter: blur(5px);
        }
      }
    `;
  }}
`;

export const StyledMegaMenuContent = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraHeaderProps) => {
    const { hasInvertedStyle } = props;
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return css`
      background-color: ${hasInvertedStyle
        ? semanticColors?.base.backgroundPrimaryOnDark
        : semanticColors?.base.backgroundPrimary};
      padding: ${spaces?.xl}px;
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.xxl}px;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      justify-content: center;
      animation: fadeInContent 200ms cubic-bezier(0.4, 0, 0.2, 1);

      @keyframes fadeInContent {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `;
  }}
`;

export const StyledHoverDrawerColumn = styled("div", {
  shouldForwardProp: (prop: string) =>
    !doNotForwardProps.includes(prop) && prop !== "totalColumns",
})<ExtraHeaderProps & { totalColumns?: number }>`
  ${(props: ExtraHeaderProps & { totalColumns?: number }) => {
    const spaces = getSpaces(props);
    const { totalColumns } = props;

    // If more than 4 columns, force exactly 4 per row
    const shouldForceLayout = totalColumns && totalColumns > 4;

    return css`
      display: flex;
      flex-direction: column;
      gap: ${spaces?.xxs}px;
      min-width: ${shouldForceLayout ? "0" : "240px"};
      max-width: ${shouldForceLayout ? "none" : "400px"};
      flex: ${shouldForceLayout
        ? `0 0 calc((100% - (3 * ${spaces?.xxl}px)) / 4)`
        : "1 1 auto"};
    `;
  }}
`;

export const StyledHoverDrawerColumnHeader = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraHeaderProps) => {
    const { hasInvertedStyle } = props;
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return css`
      ${fontHeaderM(props)}
      font-weight: 600;
      color: ${hasInvertedStyle
        ? semanticColors?.base.textSecondaryOnDark
        : semanticColors?.base.textSecondary};
      padding: 0 0 0 56px;
      margin-bottom: ${spaces?.m}px;
    `;
  }}
`;

export const StyledHoverDrawerItem = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})<ExtraHeaderProps & { hasIcon?: boolean }>`
  ${(props: ExtraHeaderProps & { hasIcon?: boolean }) => {
    const { hasInvertedStyle, hasIcon } = props;
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);
    const spaces = getSpaces(props);

    return css`
      justify-content: flex-start;
      text-align: left;
      padding: ${spaces?.s}px ${spaces?.l}px;
      border-radius: ${corners?.m}px;
      min-height: auto;
      width: 100%;
      margin-left: ${hasIcon ? 0 : 40}px;

      &:hover {
        background: ${hasInvertedStyle
          ? semanticColors?.base.fillHoverOnDark
          : semanticColors?.base.fillHover};
        box-shadow: none;
      }
    `;
  }}
`;

export const StyledHoverDrawerItemContent = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})<ExtraHeaderProps>`
  ${(props: ExtraHeaderProps) => {
    const spaces = getSpaces(props);

    return css`
      display: flex;
      align-items: center;
      gap: ${spaces?.l}px;
      width: 100%;
    `;
  }}
`;

export const StyledHoverDrawerItemIcon = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})<ExtraHeaderProps & { hasIcon?: boolean; hasDetails?: boolean }>`
  ${(props: ExtraHeaderProps & { hasIcon?: boolean; hasDetails?: boolean }) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);
    const { hasDetails } = props;

    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${semanticColors?.accent?.fillPrimary};
      padding: 0 ${hasDetails ? 0 : spaces?.xxs}px;

      svg {
        color: inherit;
      }
    `;
  }}
`;

export const StyledHoverDrawerItemText = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${() => {
    return css`
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      min-width: 0;
    `;
  }}
`;

export const StyledHoverDrawerItemTitle = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraHeaderProps) => {
    const { hasInvertedStyle } = props;
    const semanticColors = getSemanticColors(props);

    return css`
      ${fontBodySemiboldS(props)}
      color: ${hasInvertedStyle
        ? semanticColors?.base.textPrimaryOnDark
        : semanticColors?.base.textPrimary};

      ${StyledHoverDrawerItem}:hover & {
        color: ${hasInvertedStyle
          ? semanticColors?.base.textPrimaryOnDark
          : semanticColors?.base.textPrimary};
      }
    `;
  }}
`;

export const StyledHoverDrawerItemDetails = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraHeaderProps) => {
    const { hasInvertedStyle } = props;
    const semanticColors = getSemanticColors(props);

    return css`
      ${fontBodyXs(props)}
      color: ${hasInvertedStyle
        ? semanticColors?.base.textSecondaryOnDark
        : semanticColors?.base.textSecondary};
    `;
  }}
`;

export const StyledHoverDrawerContainer = styled("div")`
  position: relative;
`;
