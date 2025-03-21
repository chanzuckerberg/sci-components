import { AppBar, Drawer, Toolbar, css } from "@mui/material";
import {
  CommonThemeProps,
  fontBody,
  fontHeader,
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
      background: ${props.hasInvertedStyle ? colors?.base.backgroundPrimaryInverse : colors?.base.backgroundPrimary};
      max-width: 100%;
      max-height: 56px;
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
    background: ${props.hasInvertedStyle
      ? semanticColors?.base.backgroundPrimaryInverse
      : semanticColors?.base.backgroundPrimary};
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
        min-height: 56px;
        max-height: 56px;
        padding: ${spaces?.m}px ${spaces?.xl}px;

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

const NarrowTitleContainer = (props: ExtraHeaderProps): SerializedStyles => {
  const spaces = getSpaces(props);

  return css`
    p {
      margin-left: ${spaces?.xs}px;
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

      ${isNarrow && NarrowTitleContainer(props)}
    `;
  }}
`;

export const StyledTitleTagWrapper = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontHeader("l")}
  ${fontHeader("l", true)}

  ${(props: ExtraHeaderProps) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      align-items: center;
      gap: ${spaces?.xs}px;

      p {
        white-space: nowrap;
      }
  `;
  }}
`;

export const StyledTag = styled(Tag)`
  margin: 1px 0 0 0;

  .MuiChip-label {
    ${fontBody("xxxs", "regular")}
    ${fontBody("xxxs", "regular", /* isNarrow */ true)}
  }

  &:hover {
    text-decoration: none;
  }
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

  .MuiInputBase-input {
    ${fontBody("xs", "regular")}
    ${fontBody("m", "regular", /* isNarrow */ true)}
  }

  ${(props: ExtraSearchProps) => {
    const { hasInvertedStyle, isNarrow } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return css`
      max-width: ${isNarrow ? "100%" : "320px"};
      padding: ${isNarrow ? `${spaces?.m}px ${spaces?.xl}px` : ""};
      .MuiInputBase-root {
        color: ${hasInvertedStyle
          ? semanticColors?.base.textPrimaryInverse
          : semanticColors?.base.textPrimary};
        fieldset {
          border-color: ${hasInvertedStyle
            ? semanticColors?.base?.borderPrimaryInverse
            : ""};
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
    padding: ${spaces?.xl}px;
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

  .MuiButtonBase-root {
    ${fontBody("l", "semibold", /* isNarrow */ true)}
  }

  [data-style="minimal"] {
    ${fontBody("m", "semibold", /* isNarrow */ true)}
  }

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
        min-height: 100vh;
        justify-content: space-between;
      }
    `;
  }}
`;

export const StyledNarrowButton = styled(Button)`
  ${(props: ExtraButtonProps & IconButtonProps) => {
    const { hasInvertedStyle } = props;

    return css`
      ${hasInvertedStyle && invertedWideButtonStyles(props)}
      margin: 0;
    `;
  }}
`;
