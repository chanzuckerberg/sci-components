/* eslint-disable sonarjs/cognitive-complexity */
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
import { ButtonGroup, buttonGroupClasses, buttonClasses } from "@mui/material";
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
import { ButtonGroupProps } from "./ButtonGroup.types";

const doNotForwardProps = ["sdsType", "sdsStyle", "backgroundAppearance"];

type ButtonGroupExtraProps = ButtonGroupProps & CommonThemeProps;

/**
 * General styles for the ButtonGroup component
 * Uses CSS borders for styling (with box-sizing: border-box to maintain dimensions)
 */
const GeneralButtonGroupStyles = (
  props: ButtonGroupExtraProps
): SerializedStyles => {
  const corners = getCorners(props);

  return css`
    .${buttonGroupClasses.grouped} {
      box-sizing: border-box;
      border-radius: ${corners?.l}px;
      min-width: fit-content;
      z-index: 1;

      &::before {
        border-radius: inherit;
      }

      &:hover,
      &:active,
      &:focus {
        z-index: 2;
      }
    }

    .${buttonGroupClasses.grouped}:disabled {
      z-index: 0;
    }

    /* First button - round left corners only (horizontal) */
    .${buttonGroupClasses.groupedHorizontal}:first-of-type {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    /* Last button - round right corners only (horizontal) */
    .${buttonGroupClasses.groupedHorizontal}:last-of-type {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    /* Middle buttons - no border radius (horizontal) */
    .${buttonGroupClasses.groupedHorizontal}:not(:first-of-type):not(
        :last-of-type
      ) {
      border-radius: 0;
    }

    /* Vertical orientation */
    .${buttonGroupClasses.groupedVertical}:first-of-type {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .${buttonGroupClasses.groupedVertical}:last-of-type {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    .${buttonGroupClasses.groupedVertical}:not(:first-of-type):not(
        :last-of-type
      ) {
      border-radius: 0;
    }
  `;
};

/**
 * Large size styles based on Figma specs:
 * Wide: 32px height, fontBodyS (14px), icon S (16x16), padding spaceM (12px), gap spaceS (8px)
 * Wide icon-only: 10px (custom) padding → 36px width
 * Narrow: 40px height, fontBodyL (16px), icon S (16x16), padding spaceL (16px), gap spaceS (8px)
 * Narrow text+icon: 14px padding
 * Narrow icon-only: 14px (custom) padding → 44px width
 */
const LargeButtonGroupStyles = (
  props: ButtonGroupExtraProps
): SerializedStyles => {
  const { theme } = props;
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);

  const buttonHeightWide = "32px";
  const paddingWide = `0 ${spaces?.m}px`;
  const iconOnlyPaddingWide = "0 10px"; // 10px custom for icon-only
  const iconSizeWide = iconSizes?.s?.width;
  const gapWide = spaces?.s;

  const buttonHeightNarrow = "40px";
  const paddingNarrow = `0 ${spaces?.l}px`;
  const iconOnlyPaddingNarrow = "0 14px"; // 14px custom for icon-only
  const iconSizeNarrow = iconSizes?.s?.width;
  const gapNarrow = spaces?.s;

  return css`
    .${buttonGroupClasses.grouped} {
      ${fontBodyMediumS(props)}
      height: ${buttonHeightWide};
      padding: ${paddingWide};
      gap: ${gapWide}px;

      .${buttonClasses.startIcon}, .${buttonClasses.endIcon} {
        margin: 0;
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

        .${buttonClasses.startIcon}, .${buttonClasses.endIcon} {
          height: ${iconSizeNarrow}px;
          width: ${iconSizeNarrow}px;

          svg {
            max-width: ${iconSizeNarrow}px;
            max-height: ${iconSizeNarrow}px;
          }
        }
      }
    }

    /* Icon-only buttons: has svg but no startIcon/endIcon slots, or startIcon is the only child (e.g. ButtonToggle) */
    .${buttonGroupClasses.grouped}:has(svg):not(
        :has(.${buttonClasses.startIcon})
      ):not(:has(.${buttonClasses.endIcon})),
    .${buttonGroupClasses.grouped}:has(> .${buttonClasses.startIcon}:only-child) {
      padding: ${iconOnlyPaddingWide};

      ${theme?.breakpoints?.down("md")} {
        padding: ${iconOnlyPaddingNarrow};
      }
    }

    /* Text + icon buttons: has startIcon or endIcon (excluding icon-only ButtonToggle) */
    .${buttonGroupClasses.grouped}:has(.${buttonClasses.startIcon}):not(
        :has(> .${buttonClasses.startIcon}:only-child)
      ),
    .${buttonGroupClasses.grouped}:has(.${buttonClasses.endIcon}) {
      ${theme?.breakpoints?.down("md")} {
        padding: 0 14px;
      }
    }
  `;
};

/**
 * Medium size styles based on Figma specs:
 * Wide: 28px height, fontBodyS (14px), icon XS (12x12), padding spaceS (8px), gap spaceXS (6px)
 * Wide icon-only: 10px (custom) padding → 32px width
 * Narrow: 32px height, fontBodyM (14px), icon S (16x16), padding spaceM (12px), gap spaceS (8px)
 * Narrow icon-only: 10px (custom) padding → 36px width
 * Narrow text+icon: 10px padding
 */
const MediumButtonGroupStyles = (
  props: ButtonGroupExtraProps
): SerializedStyles => {
  const { theme } = props;
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);

  const buttonHeightWide = "28px";
  const paddingWide = `0 ${spaces?.s}px`;
  const iconOnlyPaddingWide = "0 10px"; // 10px custom for icon-only
  const iconSizeWide = iconSizes?.xs?.width;
  const gapWide = spaces?.xs;

  const buttonHeightNarrow = "32px";
  const paddingNarrow = `0 ${spaces?.m}px`;
  const iconOnlyPaddingNarrow = "0 10px"; // 10px custom for icon-only
  const iconSizeNarrow = iconSizes?.s?.width;
  const gapNarrow = spaces?.s;

  return css`
    .${buttonGroupClasses.grouped} {
      ${fontBodyMediumS(props)}
      height: ${buttonHeightWide};
      padding: ${paddingWide};
      gap: ${gapWide}px;

      .${buttonClasses.startIcon}, .${buttonClasses.endIcon} {
        margin: 0;
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

        .${buttonClasses.startIcon}, .${buttonClasses.endIcon} {
          height: ${iconSizeNarrow}px;
          width: ${iconSizeNarrow}px;

          svg {
            max-width: ${iconSizeNarrow}px;
            max-height: ${iconSizeNarrow}px;
          }
        }
      }
    }

    /* Icon-only buttons: has svg but no startIcon/endIcon slots, or startIcon is the only child (e.g. ButtonToggle) */
    .${buttonGroupClasses.grouped}:has(svg):not(
        :has(.${buttonClasses.startIcon})
      ):not(:has(.${buttonClasses.endIcon})),
    .${buttonGroupClasses.grouped}:has(> .${buttonClasses.startIcon}:only-child) {
      padding: ${iconOnlyPaddingWide};

      ${theme?.breakpoints?.down("md")} {
        padding: ${iconOnlyPaddingNarrow};
      }
    }

    /* Text + icon buttons: has startIcon or endIcon (excluding icon-only ButtonToggle) */
    .${buttonGroupClasses.grouped}:has(.${buttonClasses.startIcon}):not(
        :has(> .${buttonClasses.startIcon}:only-child)
      ),
    .${buttonGroupClasses.grouped}:has(.${buttonClasses.endIcon}) {
      padding: 0 10px;
    }
  `;
};

/**
 * Small size styles based on Figma specs:
 * Wide: 24px height, fontBodyXxxs (11px), icon XXS (10x10), padding spaceS (8px), gap spaceXXS (4px)
 * Wide text+icon: spaceS (8px) padding
 * Wide icon-only: 8px padding (from Figma button 26x24 with 10x10 icon) → 26px width
 * Narrow: 28px height, fontBodyXS (13px), icon XS (12x12), padding spaceS (8px), gap spaceXS (6px)
 * Narrow icon-only: 10px (custom) padding → 32px width
 */
const SmallButtonGroupStyles = (
  props: ButtonGroupExtraProps
): SerializedStyles => {
  const { theme } = props;
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);

  const buttonHeightWide = "24px";
  const paddingWide = `0 ${spaces?.s}px`;
  const iconOnlyPaddingWide = `0 ${spaces?.s}px`; // 8px for icon-only (same as text)
  const iconSizeWide = iconSizes?.xxs?.width;
  const gapWide = spaces?.xxs;

  const buttonHeightNarrow = "28px";
  const paddingNarrow = `0 ${spaces?.s}px`;
  const iconOnlyPaddingNarrow = "0 10px"; // 10px custom for icon-only
  const iconSizeNarrow = iconSizes?.xs?.width;
  const gapNarrow = spaces?.xs;

  return css`
    .${buttonGroupClasses.grouped} {
      ${fontBodyMediumXxxs(props)}
      height: ${buttonHeightWide};
      padding: ${paddingWide};
      gap: ${gapWide}px;

      .${buttonClasses.startIcon}, .${buttonClasses.endIcon} {
        margin: 0;
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

        .${buttonClasses.startIcon}, .${buttonClasses.endIcon} {
          height: ${iconSizeNarrow}px;
          width: ${iconSizeNarrow}px;

          svg {
            max-width: ${iconSizeNarrow}px;
            max-height: ${iconSizeNarrow}px;
          }
        }
      }
    }

    /* Icon-only buttons: has svg but no startIcon/endIcon slots, or startIcon is the only child (e.g. ButtonToggle) */
    .${buttonGroupClasses.grouped}:has(svg):not(
        :has(.${buttonClasses.startIcon})
      ):not(:has(.${buttonClasses.endIcon})),
    .${buttonGroupClasses.grouped}:has(> .${buttonClasses.startIcon}:only-child) {
      padding: ${iconOnlyPaddingWide};

      ${theme?.breakpoints?.down("md")} {
        padding: ${iconOnlyPaddingNarrow};
      }
    }

    /* Text + icon buttons: has startIcon or endIcon (excluding icon-only ButtonToggle) */
    .${buttonGroupClasses.grouped}:has(.${buttonClasses.startIcon}):not(
        :has(> .${buttonClasses.startIcon}:only-child)
      ),
    .${buttonGroupClasses.grouped}:has(.${buttonClasses.endIcon}) {
      padding: 0 ${spaces?.s}px;
    }
  `;
};

/**
 * Primary type styles for outline (based on Figma specs)
 * Colors: Accent.foreground for text/icon/border
 * Hover: Accent.surface-secondary fill, Accent.foreground-interaction for text/icon/border
 * Pressed: Accent.surface-secondary fill, Accent.foreground-pressed for text/icon/border
 * Disabled: Base.text-disabled, Base.ornament-disabled, Base.border-primary-disabled
 *
 * Border logic for horizontal ButtonGroup:
 * - First button: all borders (top, bottom, left, right)
 * - Non-first buttons: no left border (to avoid double borders)
 *
 * Disabled border logic:
 * - Horizontal: top/bottom gray, left/right stay active (except outer edges)
 * - Vertical: left/right gray, top/bottom stay active (except outer edges)
 */
const PrimaryButtonGroupStyles = (
  props: ButtonGroupExtraProps
): SerializedStyles => {
  const { backgroundAppearance } = props;
  const semanticColors = getSemanticColors(props);

  const defaultColor =
    backgroundAppearance === "dark"
      ? semanticColors?.accent?.foregroundOnDark
      : semanticColors?.accent?.foreground;
  const hoverColor =
    backgroundAppearance === "dark"
      ? semanticColors?.accent?.foregroundInteractionOnDark
      : semanticColors?.accent?.foregroundInteraction;
  const pressedColor =
    backgroundAppearance === "dark"
      ? semanticColors?.accent?.foregroundPressedOnDark
      : semanticColors?.accent?.foregroundPressed;
  const disabledColor =
    backgroundAppearance === "dark"
      ? semanticColors?.base?.borderPrimaryDisabledOnDark
      : semanticColors?.base?.borderPrimaryDisabled;
  const textDisabledColor =
    backgroundAppearance === "dark"
      ? semanticColors?.base?.textDisabledOnDark
      : semanticColors?.base?.textDisabled;
  const ornamentDisabledColor =
    backgroundAppearance === "dark"
      ? semanticColors?.base?.ornamentDisabledOnDark
      : semanticColors?.base?.ornamentDisabled;
  const hoverBgColor =
    backgroundAppearance === "dark"
      ? semanticColors?.accent?.surfaceSecondaryOnDark
      : semanticColors?.accent?.surfaceSecondary;

  return css`
    && .${buttonGroupClasses.grouped} {
      background-color: transparent;
      border: 1px solid ${defaultColor};
      box-shadow: none;
      color: ${defaultColor};

      svg {
        color: ${defaultColor};
      }
    }

    && .${buttonGroupClasses.grouped}:hover {
      color: ${hoverColor};
      background-color: ${hoverBgColor};
      border: 1px solid ${hoverColor};
      box-shadow: none;

      svg {
        color: ${hoverColor};
      }
    }

    && .${buttonGroupClasses.grouped}:active {
      color: ${pressedColor};
      background-color: ${hoverBgColor};
      border: 1px solid ${pressedColor};
      box-shadow: none;

      svg {
        color: ${pressedColor};
      }
    }

    .${buttonGroupClasses.grouped} {
      ${focusVisibleA11yStyle(props)}
    }

    && .${buttonGroupClasses.grouped}:disabled {
      color: ${textDisabledColor};
      background-color: transparent;
      border: 1px solid ${disabledColor};
      box-shadow: none;

      svg {
        color: ${ornamentDisabledColor};
      }
    }
  `;
};

/**
 * Secondary type styles for outline (based on Figma specs)
 * Colors: Base.text-primary, Base.ornament-primary, Base.border-secondary
 * Hover: Base.fill-primary-interaction
 * Pressed: Base.fill-primary-pressed
 * Disabled: Base.text-disabled, Base.ornament-disabled, Base.border-primary-disabled
 *
 * Border logic for horizontal ButtonGroup:
 * - First button: all borders (top, bottom, left, right)
 * - Non-first buttons: no left border (to avoid double borders)
 *
 * Disabled border logic:
 * - Horizontal: top/bottom gray, left/right stay active (except outer edges)
 * - Vertical: left/right gray, top/bottom stay active (except outer edges)
 */
const SecondaryButtonGroupStyles = (
  props: ButtonGroupExtraProps
): SerializedStyles => {
  const { backgroundAppearance } = props;
  const semanticColors = getSemanticColors(props);

  const defaultColor =
    backgroundAppearance === "dark"
      ? semanticColors?.base?.borderSecondaryOnDark
      : semanticColors?.base?.borderSecondary;
  const disabledColor =
    backgroundAppearance === "dark"
      ? semanticColors?.base?.borderPrimaryDisabledOnDark
      : semanticColors?.base?.borderPrimaryDisabled;
  const textColor =
    backgroundAppearance === "dark"
      ? semanticColors?.base?.textPrimaryOnDark
      : semanticColors?.base?.textPrimary;
  const textDisabledColor =
    backgroundAppearance === "dark"
      ? semanticColors?.base?.textDisabledOnDark
      : semanticColors?.base?.textDisabled;
  const ornamentColor =
    backgroundAppearance === "dark"
      ? semanticColors?.base?.ornamentPrimaryOnDark
      : semanticColors?.base?.ornamentPrimary;
  const ornamentDisabledColor =
    backgroundAppearance === "dark"
      ? semanticColors?.base?.ornamentDisabledOnDark
      : semanticColors?.base?.ornamentDisabled;
  const hoverBgColor =
    backgroundAppearance === "dark"
      ? semanticColors?.base?.fillPrimaryInteractionOnDark
      : semanticColors?.base?.fillPrimaryInteraction;
  const pressedBgColor =
    backgroundAppearance === "dark"
      ? semanticColors?.base?.fillPrimaryPressedOnDark
      : semanticColors?.base?.fillPrimaryPressed;

  return css`
    && .${buttonGroupClasses.grouped} {
      background-color: transparent;
      border: 1px solid ${defaultColor};
      box-shadow: none;
      color: ${textColor};

      svg {
        color: ${ornamentColor};
      }
    }

    && .${buttonGroupClasses.grouped}:hover {
      color: ${textColor};
      background-color: ${hoverBgColor};
      border: 1px solid ${defaultColor};
      box-shadow: none;

      svg {
        color: ${ornamentColor};
      }
    }

    && .${buttonGroupClasses.grouped}:active {
      color: ${textColor};
      background-color: ${pressedBgColor};
      border: 1px solid ${defaultColor};
      box-shadow: none;

      svg {
        color: ${ornamentColor};
      }
    }

    .${buttonGroupClasses.grouped} {
      ${focusVisibleA11yStyle(props)}
    }

    && .${buttonGroupClasses.grouped}:disabled {
      color: ${textDisabledColor};
      background-color: transparent;
      border: 1px solid ${disabledColor};
      box-shadow: none;

      svg {
        color: ${ornamentDisabledColor};
      }
    }
  `;
};

export const StyledButtonGroup = styled(ButtonGroup, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ButtonGroupExtraProps) => {
    const { sdsType = "primary", size = "large" } = props;

    return css`
      ${GeneralButtonGroupStyles(props)}
      ${sdsType === "primary" && PrimaryButtonGroupStyles(props)}
      ${sdsType === "secondary" && SecondaryButtonGroupStyles(props)}
      ${size === "large" && LargeButtonGroupStyles(props)}
      ${size === "medium" && MediumButtonGroupStyles(props)}
      ${size === "small" && SmallButtonGroupStyles(props)}
    `;
  }}
`;
