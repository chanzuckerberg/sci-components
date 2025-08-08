import { AppBar, Divider, Drawer, Toolbar, css } from "@mui/material";
import {
  CommonThemeProps,
  fontBodyMediumL,
  fontBodyS,
  fontBodySemiboldL,
  fontHeaderL,
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
      background-color: ${props.hasInvertedStyle ? colors?.base.backgroundPrimaryInverse : colors?.base.backgroundPrimary};
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
        ? semanticColors?.base.dividerInverse
        : semanticColors?.base.divider};
    background-color: ${props.hasInvertedStyle
      ? semanticColors?.base.backgroundPrimaryInverse
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
      background: ${props.hasInvertedStyle ? colors?.base.backgroundPrimaryInverse : colors?.base.backgroundPrimary};
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
})<ExtraButtonProps & (SdsMinimalButtonProps | SdsButtonProps)>`
  ${(props) => {
    const { sdsType, hasInvertedStyle } = props;
    const mode = props?.theme?.palette?.mode || "light";
    const semanticColors = getSemanticColors(props);

    const secondaryButtonStyles = `
      box-shadow: inset 0 0 0 1px ${mode === "light" ? "white" : semanticColors?.accent?.fillPrimary};
      color: ${mode === "light" ? "white" : semanticColors?.accent?.fillPrimary};
      &:hover {
        background-color: ${semanticColors?.accent?.fillHover};
        box-shadow: inset 0 0 0 1px ${semanticColors?.accent?.fillHover};
        color: ${semanticColors?.base?.textPrimaryInverse};
      }
    `;

    return `
      ${sdsType === "secondary" && hasInvertedStyle ? secondaryButtonStyles : ""}
    `;
  }}
`;

const invertedNarrowButtonStyles = (
  props: ExtraButtonProps & (SdsMinimalButtonProps | SdsButtonProps)
): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    color: ${semanticColors?.base?.textPrimaryInverse};
    svg {
      fill: ${semanticColors?.base?.ornamentPrimaryInverse};
    }

    &:hover,
    &:focus,
    &:active,
    &:focus-within {
      color: ${semanticColors?.base?.textPrimaryInverse};
      svg {
        fill: ${semanticColors?.base?.ornamentPrimaryInverse};
      }
    }
  `;
};

export const StyledNarrowIconButton = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})<ExtraButtonProps & (SdsMinimalButtonProps | SdsButtonProps)>`
  ${(props) => {
    const { hasInvertedStyle } = props;

    return css`
      ${hasInvertedStyle && invertedNarrowButtonStyles(props)}
    `;
  }}
`;

const invertedWideButtonStyles = (
  props: ExtraButtonProps & IconButtonProps
): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    svg {
      fill: ${semanticColors?.base?.ornamentSecondaryInverse};
    }

    &:hover,
    &:focus,
    &:active,
    &:focus-within {
      svg {
        fill: ${semanticColors?.base?.ornamentPrimaryInverse};
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
        ? colors?.base.textPrimaryInverse
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
          ? semanticColors?.base.textPrimaryInverse
          : semanticColors?.base.textPrimary};
        fieldset {
          border-color: ${hasInvertedStyle
            ? semanticColors?.base?.borderPrimaryInverse
            : ""};
        }

        .MuiInputBase-input {
          &::placeholder {
            color: ${hasInvertedStyle
              ? semanticColors?.base?.textTertiaryInverse
              : semanticColors?.base?.textTertiary};
            opacity: 1;
          }
        }

        .MuiInputAdornment-root {
          .MuiButtonBase-root:last-of-type {
            svg {
              color: ${hasInvertedStyle
                ? semanticColors?.base?.ornamentSecondaryInverse
                : ""};
            }
          }
        }

        &:hover {
          fieldset {
            border-color: ${hasInvertedStyle
              ? semanticColors?.base?.borderPrimaryHoverInverse
              : ""} !important;
          }

          .MuiInputAdornment-root {
            .MuiButtonBase-root:last-of-type {
              svg {
                color: ${hasInvertedStyle
                  ? semanticColors?.base?.ornamentPrimaryInverse
                  : ""};
              }
            }
          }
        }

        &.Mui-focused {
          fieldset {
            border-color: ${hasInvertedStyle
              ? semanticColors?.base?.borderPrimaryPressedInverse
              : ""} !important;
          }

          .MuiInputAdornment-root {
            .MuiButtonBase-root:last-of-type {
              svg {
                color: ${hasInvertedStyle
                  ? semanticColors?.base?.ornamentPrimaryInverse
                  : ""};
              }
            }
          }
        }

        &.Mui-disabled {
          fieldset {
            border-color: ${hasInvertedStyle
              ? semanticColors?.base?.borderPrimaryDisabledInverse
              : ""} !important;
          }

          .MuiInputAdornment-root {
            .MuiButtonBase-root:last-of-type {
              svg {
                color: ${hasInvertedStyle
                  ? semanticColors?.base?.ornamentDisabledInverse
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
    ? colors?.base.backgroundPrimaryInverse
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
        background: ${props.hasInvertedStyle ? colors?.base.backgroundPrimaryInverse : colors?.base.backgroundPrimary};
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
      ? semanticColors?.base.textSecondaryInverse
      : semanticColors?.base.textSecondary;

    const textOpenColor = hasInvertedStyle
      ? semanticColors?.base.textPrimaryInverse
      : semanticColors?.base.textPrimary;

    const ChevronDefaultColor = hasInvertedStyle
      ? semanticColors?.base.ornamentSecondaryInverse
      : semanticColors?.base.ornamentSecondary;

    const ChevronOpenColor = hasInvertedStyle
      ? semanticColors?.base?.ornamentSecondaryPressedInverse
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
            ? semanticColors?.base?.fillPressedInverse
            : semanticColors?.base?.fillPressed};

          svg {
            color: ${ChevronOpenColor} !important;
          }
        }

        &:hover {
          width: 100%;
          box-shadow: none;
          background: ${hasInvertedStyle
            ? semanticColors?.base.fillHoverInverse
            : semanticColors?.base.fillHover};
          color: ${hasInvertedStyle
            ? semanticColors?.base.textPrimaryInverse
            : semanticColors?.base.textPrimary};

          svg {
            color: ${hasInvertedStyle
              ? semanticColors?.base?.ornamentSecondaryHoverInverse
              : semanticColors?.base.ornamentSecondaryHover} !important;
          }
        }
      }

      .MuiCollapse-root .MuiAccordionDetails-root {
        padding: 0;

        .MuiButtonBase-root {
          padding: ${spaces?.s}px ${spaces?.m}px ${spaces?.s}px ${spaces?.xl}px !important;

          .primary-text {
            color: ${hasInvertedStyle
              ? semanticColors?.base.textSecondaryInverse
              : semanticColors?.base.textSecondary} !important;
          }

          &:hover {
            .primary-text {
              color: ${hasInvertedStyle
                ? semanticColors?.base.textPrimaryInverse
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
          ? semanticColors?.base.dividerInverse
          : semanticColors?.base.divider
      };
    `;
  }}
`;
