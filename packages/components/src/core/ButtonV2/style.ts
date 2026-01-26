/* eslint-disable sonarjs/cognitive-complexity */
import { Button, buttonClasses } from "@mui/material";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
import { Children, isValidElement, ReactNode } from "react";
import {
  CommonThemeProps,
  fontBodyMediumL,
  fontBodyMediumM,
  fontBodyMediumS,
  fontBodyMediumXs,
  fontBodyMediumXxxs,
  getCorners,
  getIconSizes,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import { focusVisibleA11yStyle } from "src/core/styles/common/mixins/a11y";
import { ButtonV2Props } from "./ButtonV2.types";

const doNotForwardProps = [
  "sdsType",
  "sdsSize",
  "backgroundOnHover",
  "iconOnlyChild",
  "backgroundAppearance",
];

type ButtonExtraProps = ButtonV2Props &
  CommonThemeProps & {
    /**
     * Internal prop: indicates if the only child is an Icon component.
     * Computed in ButtonV2 component and passed to styled component.
     */
    iconOnlyChild?: boolean;
  };

/**
 * Helper function to check if children is a single Icon element (not text or other content).
 * This detects both the SDS Icon component and raw SVG elements.
 */
export const isIconOnlyChild = (children: ReactNode): boolean => {
  const childArray = Children.toArray(children);

  // Must be exactly one child
  if (childArray.length !== 1) return false;

  const child = childArray[0];
  if (!isValidElement(child)) return false;

  // Check if it's an Icon component or SVG element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childType = child.type as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childProps = child.props as any;

  // Check for SVG string type (intrinsic element)
  if (childType === "svg") return true;

  // Check for SDS Icon component by its specific props (sdsIcon and sdsSize)
  if (childProps?.sdsIcon !== undefined && childProps?.sdsSize !== undefined) {
    return true;
  }

  // Check for Icon component (function or forwardRef component)
  if (typeof childType === "function") {
    return childType.name === "Icon" || childType.displayName === "Icon";
  }

  // Check for forwardRef components (which have a render property)
  if (typeof childType === "object" && childType !== null) {
    return (
      childType.displayName === "Icon" ||
      childType.render?.name === "Icon" ||
      childType.render?.displayName === "Icon"
    );
  }

  return false;
};

const GeneralButtonStyles = (props: ButtonExtraProps): SerializedStyles => {
  const corners = getCorners(props);

  return css`
    border: none;
    border-radius: ${corners?.l}px;
    white-space: nowrap;
    min-width: fit-content;

    &:hover {
      border: none;
    }

    &:active {
      border: none;
    }

    &:disabled {
      border: none;
    }

    .${buttonClasses.startIcon}, .${buttonClasses.endIcon} {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .${buttonClasses.startIcon} {
      margin-right: 0;
      margin-left: 0;
    }

    .${buttonClasses.endIcon} {
      margin-left: 0;
      margin-right: 0;
    }
  `;
};

const LargeButtonStyles = (props: ButtonExtraProps): SerializedStyles => {
  const {
    startIcon,
    endIcon,
    backgroundOnHover = true,
    variant,
    children,
    theme,
    iconOnlyChild = false,
  } = props;
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);

  const hasIconViaProps = !!startIcon || !!endIcon;
  const onlyIcon =
    (hasIconViaProps && !children) || (iconOnlyChild && !hasIconViaProps);

  const paddingWide =
    variant === "text"
      ? backgroundOnHover
        ? onlyIcon
          ? `0 ${spaces?.s}px`
          : `0 ${spaces?.m}px`
        : `0px`
      : onlyIcon
        ? `0 ${spaces?.s}px`
        : `0 ${spaces?.m}px`;
  const buttonHeightWide =
    variant === "text"
      ? backgroundOnHover
        ? "32px"
        : onlyIcon
          ? "16px"
          : "24px"
      : "32px";
  const iconSizeWide = iconSizes?.s?.width;
  const gapWide = spaces?.s;

  const paddingNarrow =
    variant === "text"
      ? backgroundOnHover
        ? onlyIcon
          ? `0 ${spaces?.m}px`
          : `0 ${spaces?.l}px`
        : `0px`
      : onlyIcon
        ? `0 ${spaces?.m}px`
        : `0 ${spaces?.l}px`;
  const buttonHeightNarrow =
    variant === "text"
      ? backgroundOnHover
        ? "40px"
        : onlyIcon
          ? "16px"
          : "26px"
      : "40px";
  const iconSizeNarrow = iconSizes?.s?.width;
  const gapNarrow = spaces?.s;

  return css`
    ${fontBodyMediumS(props)}
    height: ${buttonHeightWide};
    padding: ${paddingWide};
    gap: ${gapWide}px;

    .${buttonClasses.startIcon}, .${buttonClasses.endIcon}, svg {
      height: ${iconSizeWide}px;
      width: ${iconSizeWide}px;

      svg {
        max-width: ${iconSizeWide}px;
        max-height: ${iconSizeWide}px;
      }
    }

    ${theme?.breakpoints?.down("md")} {
      ${fontBodyMediumL(props)}
      height: ${buttonHeightNarrow};
      padding: ${paddingNarrow};
      gap: ${gapNarrow}px;

      .${buttonClasses.startIcon}, .${buttonClasses.endIcon}, svg {
        height: ${iconSizeNarrow}px;
        width: ${iconSizeNarrow}px;

        svg {
          max-width: ${iconSizeNarrow}px;
          max-height: ${iconSizeNarrow}px;
        }
      }
    }
  `;
};

const MediumButtonStyles = (props: ButtonExtraProps): SerializedStyles => {
  const {
    startIcon,
    endIcon,
    backgroundOnHover = true,
    variant,
    children,
    theme,
    iconOnlyChild = false,
  } = props;
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);

  const hasIconViaProps = !!startIcon || !!endIcon;
  const onlyIcon =
    (hasIconViaProps && !children) || (iconOnlyChild && !hasIconViaProps);

  const paddingWide =
    variant === "text"
      ? backgroundOnHover
        ? `0 ${spaces?.s}px`
        : `0px`
      : `0 ${spaces?.s}px`;
  const buttonHeightWide =
    variant === "text"
      ? backgroundOnHover
        ? "28px"
        : onlyIcon
          ? "12px"
          : "24px"
      : "28px";
  const iconSizeWide = iconSizes?.xs?.width;
  const gapWide = spaces?.xs;

  const paddingNarrow =
    variant === "text"
      ? backgroundOnHover
        ? onlyIcon
          ? `0 ${spaces?.s}px`
          : `0 ${spaces?.m}px`
        : `0px`
      : onlyIcon
        ? `0 ${spaces?.s}px`
        : `0 ${spaces?.m}px`;
  const buttonHeightNarrow =
    variant === "text"
      ? backgroundOnHover
        ? "32px"
        : onlyIcon
          ? "16px"
          : "24px"
      : "32px";
  const iconSizeNarrow = iconSizes?.s?.width;
  const gapNarrow = spaces?.s;

  return css`
    ${fontBodyMediumS(props)}
    height: ${buttonHeightWide};
    padding: ${paddingWide};
    gap: ${gapWide}px;

    .${buttonClasses.startIcon}, .${buttonClasses.endIcon}, svg {
      height: ${iconSizeWide}px;
      width: ${iconSizeWide}px;

      svg {
        max-width: ${iconSizeWide}px;
        max-height: ${iconSizeWide}px;
      }
    }

    ${theme?.breakpoints?.down("md")} {
      ${fontBodyMediumM(props)}
      height: ${buttonHeightNarrow};
      padding: ${paddingNarrow};
      gap: ${gapNarrow}px;

      .${buttonClasses.startIcon}, .${buttonClasses.endIcon}, svg {
        height: ${iconSizeNarrow}px;
        width: ${iconSizeNarrow}px;

        svg {
          max-width: ${iconSizeNarrow}px;
          max-height: ${iconSizeNarrow}px;
        }
      }
    }
  `;
};

const SmallButtonStyles = (props: ButtonExtraProps): SerializedStyles => {
  const {
    startIcon,
    endIcon,
    backgroundOnHover = true,
    variant,
    children,
    theme,
    iconOnlyChild = false,
  } = props;
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);

  const hasIconViaProps = !!startIcon || !!endIcon;
  const onlyIcon =
    (hasIconViaProps && !children) || (iconOnlyChild && !hasIconViaProps);

  const paddingWide =
    variant === "text"
      ? backgroundOnHover
        ? onlyIcon
          ? `0 7px`
          : `0 ${spaces?.s}px`
        : `0px`
      : onlyIcon
        ? `0 7px`
        : `0 ${spaces?.s}px`;
  const buttonHeightWide =
    variant === "text"
      ? backgroundOnHover
        ? "24px"
        : onlyIcon
          ? "10px"
          : "16px"
      : "24px";
  const iconSizeWide = iconSizes?.xxs?.width;
  const gapWide = spaces?.xxs;

  const paddingNarrow =
    variant === "text"
      ? backgroundOnHover
        ? `0 ${spaces?.s}px`
        : `0px`
      : `0 ${spaces?.s}px`;
  const buttonHeightNarrow =
    variant === "text"
      ? backgroundOnHover
        ? "28px"
        : onlyIcon
          ? "12px"
          : "20px"
      : "28px";
  const iconSizeNarrow = iconSizes?.xs?.width;
  const gapNarrow = spaces?.xs;

  return css`
    ${fontBodyMediumXxxs(props)}
    height: ${buttonHeightWide};
    padding: ${paddingWide};
    gap: ${gapWide}px;

    .${buttonClasses.startIcon}, .${buttonClasses.endIcon}, svg {
      height: ${iconSizeWide}px;
      width: ${iconSizeWide}px;

      svg {
        max-width: ${iconSizeWide}px;
        max-height: ${iconSizeWide}px;
      }
    }

    ${theme?.breakpoints?.down("md")} {
      ${fontBodyMediumXs(props)}
      height: ${buttonHeightNarrow};
      padding: ${paddingNarrow};
      gap: ${gapNarrow}px;

      .${buttonClasses.startIcon}, .${buttonClasses.endIcon}, svg {
        height: ${iconSizeNarrow}px;
        width: ${iconSizeNarrow}px;

        svg {
          max-width: ${iconSizeNarrow}px;
          max-height: ${iconSizeNarrow}px;
        }
      }
    }
  `;
};

const PrimaryButtonStyles = (props: ButtonExtraProps): SerializedStyles => {
  const {
    variant,
    backgroundOnHover = true,
    backgroundAppearance = "matchBackground",
  } = props;
  const semanticColors = getSemanticColors(props);

  const contentColor =
    variant === "contained"
      ? semanticColors?.base?.textOnFill
      : backgroundAppearance === "dark"
        ? semanticColors?.accent?.foregroundOnDark
        : semanticColors?.accent?.foreground;

  const ornamentColor =
    variant === "contained"
      ? semanticColors?.base?.ornamentOnFill
      : backgroundAppearance === "dark"
        ? semanticColors?.accent?.foregroundOnDark
        : semanticColors?.accent?.foreground;

  const backgroundColor =
    variant === "contained"
      ? semanticColors?.accent?.fillPrimary
      : "transparent";

  const disabledBackgroundColor =
    variant === "contained"
      ? backgroundAppearance === "dark"
        ? semanticColors?.base?.fillDisabledOnDark
        : semanticColors?.base?.fillDisabled
      : "transparent";

  const disabledBorder =
    variant === "outlined"
      ? `inset 0 0 0 1px ${backgroundAppearance === "dark" ? semanticColors?.base?.borderPrimaryDisabledOnDark : semanticColors?.base?.borderPrimaryDisabled}`
      : "none";

  const boxshadow =
    variant === "outlined"
      ? `inset 0 0 0 1px ${backgroundAppearance === "dark" ? semanticColors?.accent?.foregroundOnDark : semanticColors?.accent?.foreground}`
      : "none";

  return css`
    background-color: ${backgroundColor};
    box-shadow: ${boxshadow};
    color: ${contentColor};

    svg {
      color: ${ornamentColor};
    }

    &:hover {
      color: ${variant === "contained"
        ? semanticColors?.base?.textPrimaryInverse
        : backgroundAppearance === "dark"
          ? semanticColors?.accent?.foregroundInteractionOnDark
          : semanticColors?.accent?.foregroundInteraction};
      background-color: ${variant === "contained"
        ? semanticColors?.accent?.fillInteraction
        : variant === "outlined"
          ? backgroundAppearance === "dark"
            ? semanticColors?.accent?.surfaceSecondaryOnDark
            : semanticColors?.accent?.surfaceSecondary
          : backgroundOnHover
            ? backgroundAppearance === "dark"
              ? semanticColors?.base?.fillPrimaryInteractionOnDark
              : semanticColors?.base?.fillPrimaryInteraction
            : "transparent"};
      box-shadow: ${variant === "outlined"
        ? `inset 0 0 0 1px ${backgroundAppearance === "dark" ? semanticColors?.accent?.foregroundInteractionOnDark : semanticColors?.accent?.foregroundInteraction}`
        : "none"};

      svg {
        color: ${variant === "contained"
          ? semanticColors?.base?.ornamentPrimaryInverse
          : backgroundAppearance === "dark"
            ? semanticColors?.accent?.foregroundInteractionOnDark
            : semanticColors?.accent?.foregroundInteraction};
      }
    }

    &:active {
      color: ${variant === "contained"
        ? semanticColors?.base?.textPrimaryInverse
        : backgroundAppearance === "dark"
          ? semanticColors?.accent?.foregroundPressedOnDark
          : semanticColors?.accent?.foregroundPressed};
      background-color: ${variant === "contained"
        ? semanticColors?.accent?.fillPressed
        : variant === "outlined"
          ? backgroundAppearance === "dark"
            ? semanticColors?.accent?.surfaceSecondaryOnDark
            : semanticColors?.accent?.surfaceSecondary
          : backgroundOnHover
            ? backgroundAppearance === "dark"
              ? semanticColors?.base?.fillPrimaryPressedOnDark
              : semanticColors?.base?.fillPrimaryPressed
            : "transparent"};
      box-shadow: ${variant === "outlined"
        ? `inset 0 0 0 1px ${backgroundAppearance === "dark" ? semanticColors?.accent?.foregroundPressedOnDark : semanticColors?.accent?.foregroundPressed}`
        : "none"};

      svg {
        color: ${variant === "contained"
          ? semanticColors?.base?.ornamentPrimaryInverse
          : backgroundAppearance === "dark"
            ? semanticColors?.accent?.foregroundPressedOnDark
            : semanticColors?.accent?.foregroundPressed};
      }
    }

    &:disabled {
      color: ${backgroundAppearance === "dark"
        ? semanticColors?.base?.textDisabledOnDark
        : semanticColors?.base?.textDisabled};
      background-color: ${disabledBackgroundColor};
      box-shadow: ${disabledBorder};

      svg {
        color: ${backgroundAppearance === "dark"
          ? semanticColors?.base?.ornamentDisabledOnDark
          : semanticColors?.base?.ornamentDisabled};
      }
    }
  `;
};

const SecondaryButtonStyles = (props: ButtonExtraProps): SerializedStyles => {
  const {
    variant,
    backgroundOnHover = true,
    backgroundAppearance = "matchBackground",
  } = props;
  const semanticColors = getSemanticColors(props);
  const corners = getCorners(props);

  const contentColor =
    variant === "text"
      ? backgroundAppearance === "dark"
        ? semanticColors?.base?.textSecondaryOnDark
        : semanticColors?.base?.textSecondary
      : backgroundAppearance === "dark"
        ? semanticColors?.base?.textPrimaryOnDark
        : semanticColors?.base?.textPrimary;
  const ornamentColor =
    variant === "text"
      ? backgroundAppearance === "dark"
        ? semanticColors?.base?.ornamentSecondaryOnDark
        : semanticColors?.base?.ornamentSecondary
      : backgroundAppearance === "dark"
        ? semanticColors?.base?.ornamentPrimaryOnDark
        : semanticColors?.base?.ornamentPrimary;
  const backgroundColor =
    variant === "contained"
      ? backgroundAppearance === "dark"
        ? semanticColors?.base?.fillSecondaryOnDark
        : semanticColors?.base?.fillSecondary
      : "transparent";

  const disabledBackgroundColor =
    variant === "contained"
      ? backgroundAppearance === "dark"
        ? semanticColors?.base?.fillDisabledOnDark
        : semanticColors?.base?.fillDisabled
      : "transparent";

  const disabledBorder =
    variant === "outlined"
      ? `inset 0 0 0 1px ${semanticColors?.base?.borderSecondary}`
      : "none";

  const boxshadow =
    variant === "outlined"
      ? `inset 0 0 0 1px ${backgroundAppearance === "dark" ? semanticColors?.base?.borderPrimaryDisabledOnDark : semanticColors?.base?.borderPrimaryDisabled}`
      : "none";

  return css`
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      border-radius: ${corners?.l}px;
    }
    position: relative;
    background-color: ${backgroundColor};
    box-shadow: ${boxshadow};
    color: ${contentColor};

    svg {
      color: ${ornamentColor};
    }

    &:hover {
      & > * {
        position: relative;
        z-index: 1;
      }
      &::before {
        background-color: ${variant === "contained"
          ? backgroundAppearance === "dark"
            ? semanticColors?.base?.fillSecondaryInteractionOnDark
            : semanticColors?.base?.fillSecondaryInteraction
          : variant === "outlined"
            ? backgroundAppearance === "dark"
              ? semanticColors?.base?.fillPrimaryInteractionOnDark
              : semanticColors?.base?.fillPrimaryInteraction
            : backgroundOnHover
              ? backgroundAppearance === "dark"
                ? semanticColors?.base?.fillPrimaryInteractionOnDark
                : semanticColors?.base?.fillPrimaryInteraction
              : "transparent"};
      }
      background-color: ${backgroundColor};
      box-shadow: ${variant === "outlined"
        ? `inset 0 0 0 1px ${backgroundAppearance === "dark" ? semanticColors?.base?.borderSecondaryOnDark : semanticColors?.base?.borderSecondary}`
        : "none"};
      color: ${backgroundAppearance === "dark"
        ? semanticColors?.base?.textPrimaryOnDark
        : semanticColors?.base?.textPrimary};
      svg {
        color: ${backgroundAppearance === "dark"
          ? semanticColors?.base?.ornamentPrimaryOnDark
          : semanticColors?.base?.ornamentPrimary};
      }
    }

    &:active {
      & > * {
        position: relative;
        z-index: 1;
      }
      &::before {
        background-color: ${variant === "contained"
          ? backgroundAppearance === "dark"
            ? semanticColors?.base?.fillSecondaryPressedOnDark
            : semanticColors?.base?.fillSecondaryPressed
          : variant === "outlined"
            ? backgroundAppearance === "dark"
              ? semanticColors?.base?.fillPrimaryPressedOnDark
              : semanticColors?.base?.fillPrimaryPressed
            : backgroundOnHover
              ? backgroundAppearance === "dark"
                ? semanticColors?.base?.fillPrimaryPressedOnDark
                : semanticColors?.base?.fillPrimaryPressed
              : "transparent"};
      }
      background-color: ${backgroundColor};
      box-shadow: ${variant === "outlined"
        ? `inset 0 0 0 1px ${backgroundAppearance === "dark" ? semanticColors?.base?.borderSecondaryOnDark : semanticColors?.base?.borderSecondary}`
        : "none"};
    }

    &:disabled {
      color: ${backgroundAppearance === "dark"
        ? semanticColors?.base?.textDisabledOnDark
        : semanticColors?.base?.textDisabled};
      background-color: ${disabledBackgroundColor};
      box-shadow: ${disabledBorder};

      svg {
        color: ${backgroundAppearance === "dark"
          ? semanticColors?.base?.ornamentDisabledOnDark
          : semanticColors?.base?.ornamentDisabled};
      }
    }
  `;
};

const DestructiveButtonStyles = (props: ButtonExtraProps): SerializedStyles => {
  const {
    variant,
    backgroundOnHover = true,
    backgroundAppearance = "matchBackground",
  } = props;
  const semanticColors = getSemanticColors(props);

  const contentColor =
    variant === "contained"
      ? semanticColors?.base?.textOnFill
      : backgroundAppearance === "dark"
        ? semanticColors?.negative?.foregroundOnDark
        : semanticColors?.negative?.foreground;

  const ornamentColor =
    variant === "contained"
      ? semanticColors?.base?.ornamentOnFill
      : backgroundAppearance === "dark"
        ? semanticColors?.negative?.foregroundOnDark
        : semanticColors?.negative?.foreground;

  const backgroundColor =
    variant === "contained"
      ? semanticColors?.negative?.fillPrimary
      : "transparent";

  const disabledBackgroundColor =
    variant === "contained"
      ? backgroundAppearance === "dark"
        ? semanticColors?.base?.fillDisabledOnDark
        : semanticColors?.base?.fillDisabled
      : "transparent";

  const disabledBorder =
    variant === "outlined"
      ? `inset 0 0 0 1px ${backgroundAppearance === "dark" ? semanticColors?.base?.borderPrimaryDisabledOnDark : semanticColors?.base?.borderPrimaryDisabled}`
      : "none";

  const boxshadow =
    variant === "outlined"
      ? `inset 0 0 0 1px ${backgroundAppearance === "dark" ? semanticColors?.negative?.foregroundOnDark : semanticColors?.negative?.foreground}`
      : "none";

  return css`
    background-color: ${backgroundColor};
    box-shadow: ${boxshadow};
    color: ${contentColor};

    svg {
      color: ${ornamentColor};
    }

    &:hover {
      color: ${variant === "text"
        ? backgroundAppearance === "dark"
          ? semanticColors?.negative?.foregroundInteractionOnDark
          : semanticColors?.negative?.foregroundInteraction
        : semanticColors?.base?.textPrimaryInverse};
      background-color: ${variant === "text"
        ? backgroundOnHover
          ? backgroundAppearance === "dark"
            ? semanticColors?.base?.fillPrimaryInteractionOnDark
            : semanticColors?.base?.fillPrimaryInteraction
          : "transparent"
        : semanticColors?.negative?.fillInteraction};
      box-shadow: none;

      svg {
        color: ${variant === "text"
          ? backgroundAppearance === "dark"
            ? semanticColors?.negative?.foregroundInteractionOnDark
            : semanticColors?.negative?.foregroundInteraction
          : semanticColors?.base?.ornamentPrimaryInverse};
      }
    }

    &:active {
      color: ${variant === "text"
        ? backgroundAppearance === "dark"
          ? semanticColors?.negative?.foregroundPressedOnDark
          : semanticColors?.negative?.foregroundPressed
        : semanticColors?.base?.textPrimaryInverse};
      background-color: ${variant === "text"
        ? backgroundOnHover
          ? backgroundAppearance === "dark"
            ? semanticColors?.base?.fillPrimaryPressedOnDark
            : semanticColors?.base?.fillPrimaryPressed
          : "transparent"
        : semanticColors?.negative?.fillPressed};
      box-shadow: none;

      svg {
        color: ${variant === "text"
          ? backgroundAppearance === "dark"
            ? semanticColors?.negative?.foregroundPressedOnDark
            : semanticColors?.negative?.foregroundPressed
          : semanticColors?.base?.ornamentPrimaryInverse};
      }
    }

    &:disabled {
      color: ${backgroundAppearance === "dark"
        ? semanticColors?.base?.textDisabledOnDark
        : semanticColors?.base?.textDisabled};
      background-color: ${disabledBackgroundColor};
      box-shadow: ${disabledBorder};

      svg {
        color: ${backgroundAppearance === "dark"
          ? semanticColors?.base?.ornamentDisabledOnDark
          : semanticColors?.base?.ornamentDisabled};
      }
    }
  `;
};

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${focusVisibleA11yStyle}

  ${(props: ButtonExtraProps) => {
    const { sdsType, size } = props;

    return css`
      ${GeneralButtonStyles(props)}
      ${sdsType === "primary" && PrimaryButtonStyles(props)}
      ${sdsType === "secondary" && SecondaryButtonStyles(props)}
      ${sdsType === "destructive" && DestructiveButtonStyles(props)}
      ${size === "large" && LargeButtonStyles(props)}
      ${size === "medium" && MediumButtonStyles(props)}
      ${size === "small" && SmallButtonStyles(props)}
    `;
  }}
`;

interface StyledChildrenProps extends CommonThemeProps {
  size?: "small" | "medium" | "large";
}

export const StyledChildren = styled("span", {
  shouldForwardProp: (prop: string) => prop !== "size",
})<StyledChildrenProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props: StyledChildrenProps) => {
    const { size = "medium", theme } = props;
    const spaces = getSpaces(props);

    // Gap values matching the button size styles
    const gapValues = {
      large: { wide: spaces?.s, narrow: spaces?.s },
      medium: { wide: spaces?.xs, narrow: spaces?.s },
      small: { wide: spaces?.xxs, narrow: spaces?.xs },
    };

    const gap = gapValues[size];

    return css`
      gap: ${gap.wide}px;

      ${theme?.breakpoints?.down("md")} {
        gap: ${gap.narrow}px;
      }
    `;
  }}
`;
