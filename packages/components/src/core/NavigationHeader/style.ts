import { AppBar, Drawer, Toolbar } from "@mui/material";
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

export interface ExtraHeaderProps extends CommonThemeProps {
  hasInvertedStyle?: boolean;
}

const doNotForwardProps = ["hasInvertedStyle"];

export const StyledHeader = styled(AppBar, {
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

export const StyledToolbar = styled(Toolbar, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraHeaderProps) => {
    const spaces = getSpaces(props);
    const colors = getSemanticColors(props);

    return `
      &.MuiToolbar-root {
        min-height: 56px;
        max-height: 56px;
        padding: ${spaces?.m}px ${spaces?.xl}px;

        ${props.theme?.breakpoints?.down("md")} {
          border-bottom: 1px solid ${props.hasInvertedStyle ? colors?.base.dividerInverse : colors?.base.divider};
          background: ${props.hasInvertedStyle ? colors?.base.backgroundPrimaryInverse : colors?.base.backgroundPrimary};
          position: sticky !important;
          top: 0;
          z-index: 1000;
        }
      }
    `;
  }}
`;

export const StyledShadowElement = styled.div`
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

export const StyledShadowCoverElement = styled.div`
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

export const StyledHeaderButton = styled(Button)<
  ExtraButtonProps & (SdsMinimalButtonProps | SdsButtonProps)
>`
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

export const StyledLogoLinkWrapper = styled(Link)`
  align-items: center;
  display: flex;
  text-decoration: none !important;

  ${(props: CommonThemeProps) => {
    return `
      ${props.theme?.breakpoints?.down("md")} {
        width: 100%;
      }
    `;
  }}
`;

export const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTitleContainer = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontHeader("l")}
  ${fontHeader("l", /* isNarrow */ true)}

  display: flex;
  align-items: center;

  p {
    margin: 0;
  }

  ${(props: ExtraHeaderProps) => {
    const colors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${props.hasInvertedStyle ? colors?.base.textPrimaryInverse : colors?.base.textPrimary};
      margin-right: ${spaces?.xxl}px;
      width: 100%;

      p {
        margin-left: ${spaces?.l}px;
        margin-right: ${spaces?.xs}px;
      }

      ${props.theme?.breakpoints?.down("md")} {
        p {
          margin-left: ${spaces?.xs}px;
        }
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
}

export const StyledPrimaryNavContainer = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;

  ${(props: StyledPrimaryNavContainerProps) => {
    const { showSearch, primaryNavPosition } = props;
    const spaces = getSpaces(props);

    const primaryNavPositionWithSearch =
      primaryNavPosition === "left" ? "flex-start" : "space-between";
    const primaryNavPositionWithoutSearch =
      primaryNavPosition === "left" ? "flex-start" : "flex-end";

    return `
      gap: ${spaces?.xxl}px;
      margin-right: ${spaces?.xxl}px;
      flex: 1;
      justify-content: ${showSearch ? primaryNavPositionWithSearch : primaryNavPositionWithoutSearch};

      ${props.theme?.breakpoints?.down("md")} {
        flex-direction: column;
      }
    `;
  }}
`;

interface ExtraSearchProps extends CommonThemeProps {
  hasInvertedStyle?: boolean;
}

export const StyledSearch = styled(InputSearch)`
  margin: 0;
  max-width: 320px;
  width: 100%;

  .MuiInputBase-input {
    ${fontBody("xs", "regular")}
    ${fontBody("m", "regular", /* isNarrow */ true)}
  }

  ${(props: ExtraSearchProps) => {
    const { hasInvertedStyle } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      .MuiInputBase-root {
        fieldset {
          border-color: ${hasInvertedStyle ? semanticColors?.base?.borderInverse : ""};
        }

        .MuiInputAdornment-root {
          .MuiButtonBase-root:last-of-type {
            svg {
              color: ${hasInvertedStyle ? semanticColors?.base?.ornamentSecondaryInverse : ""};
            }
          }
        }
        
        &:hover {
          fieldset {
            border-color: ${hasInvertedStyle ? semanticColors?.base?.borderHoverInverse : ""} !important;
          }

          .MuiInputAdornment-root {
            .MuiButtonBase-root:last-of-type {
              svg {
                color: ${hasInvertedStyle ? semanticColors?.base?.ornamentPrimaryInverse : ""};
              }
            }
          }
        }

        &.Mui-focused {
          fieldset {
            border-color: ${hasInvertedStyle ? semanticColors?.base?.borderPressedInverse : ""} !important;
          }

          .MuiInputAdornment-root {
            .MuiButtonBase-root:last-of-type {
              svg {
                color: ${hasInvertedStyle ? semanticColors?.base?.ornamentPrimaryInverse : ""};
              }
            }
          }
        }

        &.Mui-disabled {
          fieldset {
            border-color: ${hasInvertedStyle ? semanticColors?.base?.borderDisabledInverse : ""} !important;
          }

          .MuiInputAdornment-root {
            .MuiButtonBase-root:last-of-type {
              svg {
                color: ${hasInvertedStyle ? semanticColors?.base?.ornamentDisabledInverse : ""};
              }
            }
          }
        }
      }

      ${props.theme?.breakpoints?.down("md")} {
        max-width: unset;
        padding: ${spaces?.m}px ${spaces?.xl}px;
      }
    `;
  }}
`;

export const StyledButtonSection = styled.section`
  display: flex;
  align-items: center;

  .MuiButtonBase-root {
    ${fontBody("l", "semibold", /* isNarrow */ true)}
  }

  [data-style="minimal"] {
    ${fontBody("m", "semibold", /* isNarrow */ true)}
  }

  ${(props: ExtraHeaderProps) => {
    const spaces = getSpaces(props);
    const sizes = getIconSizes(props);
    const colors = getSemanticColors(props);

    const backgroundColor = props.hasInvertedStyle
      ? colors?.base.backgroundPrimaryInverse
      : colors?.base.backgroundPrimary;

    return `
      gap: ${spaces?.m}px;
      margin-left: ${spaces?.xl}px;

      ${props.theme?.breakpoints?.down("md")} {
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
          background: linear-gradient(to top, ${backgroundColor} 0%, ${backgroundColor}00 100%);
          top: -${spaces?.xxl}px;
        }

        .MuiButton-icon .MuiSvgIcon-root {
          width: ${sizes?.l.width}px;
          height: ${sizes?.l.height}px;
        }
      }
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
  & {
    margin: 0;
  }
`;
