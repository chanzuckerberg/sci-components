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

const doNotForwardProps = ["sdsType", "sdsStyle"];

type ButtonGroupExtraProps = ButtonGroupProps & CommonThemeProps;

/**
 * General styles for the ButtonGroup component
 * Note: We use box-shadow instead of border to control component height
 */
const GeneralButtonGroupStyles = (
  props: ButtonGroupExtraProps
): SerializedStyles => {
  const corners = getCorners(props);

  return css`
    /* Remove all MUI default borders and margins - we use box-shadow instead */
    .${buttonGroupClasses.grouped} {
      border: none;
      border-radius: ${corners?.l}px;
      min-width: fit-content;
      margin-left: 0;
      margin-top: 0;

      &:hover {
        border: none;
      }

      &:active {
        border: none;
      }

      &:disabled {
        border: none;
      }

      &:not(:last-of-type) {
        border: none;
        margin-right: 0;
        margin-bottom: 0;
      }

      &:not(:first-of-type) {
        margin-left: 0;
        margin-top: 0;
      }
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

    /* Icon-only buttons: has svg but no startIcon/endIcon slots */
    .${buttonGroupClasses.grouped}:has(svg):not(
        :has(.${buttonClasses.startIcon})
      ):not(:has(.${buttonClasses.endIcon})) {
      padding: ${iconOnlyPaddingWide};

      ${theme?.breakpoints?.down("md")} {
        padding: ${iconOnlyPaddingNarrow};
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

    /* Icon-only buttons: has svg but no startIcon/endIcon slots */
    .${buttonGroupClasses.grouped}:has(svg):not(
        :has(.${buttonClasses.startIcon})
      ):not(:has(.${buttonClasses.endIcon})) {
      padding: ${iconOnlyPaddingWide};

      ${theme?.breakpoints?.down("md")} {
        padding: ${iconOnlyPaddingNarrow};
      }
    }
  `;
};

/**
 * Small size styles based on Figma specs:
 * Wide: 24px height, fontBodyXxxs (11px), icon XXS (10x10), padding spaceS (8px), gap spaceXXS (4px)
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

    /* Icon-only buttons: has svg but no startIcon/endIcon slots */
    .${buttonGroupClasses.grouped}:has(svg):not(
        :has(.${buttonClasses.startIcon})
      ):not(:has(.${buttonClasses.endIcon})) {
      padding: ${iconOnlyPaddingWide};

      ${theme?.breakpoints?.down("md")} {
        padding: ${iconOnlyPaddingNarrow};
      }
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
 * - Middle buttons: only top and bottom borders
 * - Last button: all borders (top, bottom, left, right)
 */
const PrimaryButtonGroupStyles = (
  props: ButtonGroupExtraProps
): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  const defaultColor = semanticColors?.accent?.foreground;
  const hoverColor = semanticColors?.accent?.foregroundInteraction;
  const pressedColor = semanticColors?.accent?.foregroundPressed;
  const disabledColor = semanticColors?.base?.borderPrimaryDisabled;

  // Box-shadow for all borders (first button)
  const allBorders = (color: string | undefined) => `inset 0 0 0 1px ${color}`;

  // Box-shadow for top, bottom, right borders (horizontal: middle and last buttons - no left)
  const topBottomRightBorders = (color: string | undefined) =>
    `inset 0 1px 0 0 ${color}, inset 0 -1px 0 0 ${color}, inset -1px 0 0 0 ${color}`;

  // Box-shadow for left, right, bottom borders (vertical: middle and last buttons - no top)
  const leftRightBottomBorders = (color: string | undefined) =>
    `inset 1px 0 0 0 ${color}, inset -1px 0 0 0 ${color}, inset 0 -1px 0 0 ${color}`;

  return css`
    /* First button - all borders (horizontal) */
    .${buttonGroupClasses.groupedHorizontal}:first-of-type {
      background-color: transparent;
      box-shadow: ${allBorders(defaultColor)};
      color: ${defaultColor};

      svg {
        color: ${defaultColor};
      }

      &:hover {
        color: ${hoverColor};
        background-color: ${semanticColors?.accent?.surfaceSecondary};
        box-shadow: ${allBorders(hoverColor)};

        svg {
          color: ${hoverColor};
        }
      }

      &:active {
        color: ${pressedColor};
        background-color: ${semanticColors?.accent?.surfaceSecondary};
        box-shadow: ${allBorders(pressedColor)};

        svg {
          color: ${pressedColor};
        }
      }

      &:disabled {
        color: ${semanticColors?.base?.textDisabled};
        background-color: transparent;
        box-shadow: ${allBorders(disabledColor)};

        svg {
          color: ${semanticColors?.base?.ornamentDisabled};
        }
      }

      ${focusVisibleA11yStyle(props)}
    }

    /* Middle and last buttons - top, bottom, right borders (horizontal - no left) */
    .${buttonGroupClasses.groupedHorizontal}:not(:first-of-type) {
      background-color: transparent;
      box-shadow: ${topBottomRightBorders(defaultColor)};
      color: ${defaultColor};

      svg {
        color: ${defaultColor};
      }

      &:hover {
        color: ${hoverColor};
        background-color: ${semanticColors?.accent?.surfaceSecondary};
        box-shadow: ${topBottomRightBorders(hoverColor)};

        svg {
          color: ${hoverColor};
        }
      }

      &:active {
        color: ${pressedColor};
        background-color: ${semanticColors?.accent?.surfaceSecondary};
        box-shadow: ${topBottomRightBorders(pressedColor)};

        svg {
          color: ${pressedColor};
        }
      }

      &:disabled {
        color: ${semanticColors?.base?.textDisabled};
        background-color: transparent;
        box-shadow: ${topBottomRightBorders(disabledColor)};

        svg {
          color: ${semanticColors?.base?.ornamentDisabled};
        }
      }

      ${focusVisibleA11yStyle(props)}
    }

    /* First button - all borders (vertical) */
    .${buttonGroupClasses.groupedVertical}:first-of-type {
      background-color: transparent;
      box-shadow: ${allBorders(defaultColor)};
      color: ${defaultColor};

      svg {
        color: ${defaultColor};
      }

      &:hover {
        color: ${hoverColor};
        background-color: ${semanticColors?.accent?.surfaceSecondary};
        box-shadow: ${allBorders(hoverColor)};

        svg {
          color: ${hoverColor};
        }
      }

      &:active {
        color: ${pressedColor};
        background-color: ${semanticColors?.accent?.surfaceSecondary};
        box-shadow: ${allBorders(pressedColor)};

        svg {
          color: ${pressedColor};
        }
      }

      &:disabled {
        color: ${semanticColors?.base?.textDisabled};
        background-color: transparent;
        box-shadow: ${allBorders(disabledColor)};

        svg {
          color: ${semanticColors?.base?.ornamentDisabled};
        }
      }

      ${focusVisibleA11yStyle(props)}
    }

    /* Middle and last buttons - left, right, bottom borders (vertical - no top) */
    .${buttonGroupClasses.groupedVertical}:not(:first-of-type) {
      background-color: transparent;
      box-shadow: ${leftRightBottomBorders(defaultColor)};
      color: ${defaultColor};

      svg {
        color: ${defaultColor};
      }

      &:hover {
        color: ${hoverColor};
        background-color: ${semanticColors?.accent?.surfaceSecondary};
        box-shadow: ${leftRightBottomBorders(hoverColor)};

        svg {
          color: ${hoverColor};
        }
      }

      &:active {
        color: ${pressedColor};
        background-color: ${semanticColors?.accent?.surfaceSecondary};
        box-shadow: ${leftRightBottomBorders(pressedColor)};

        svg {
          color: ${pressedColor};
        }
      }

      &:disabled {
        color: ${semanticColors?.base?.textDisabled};
        background-color: transparent;
        box-shadow: ${leftRightBottomBorders(disabledColor)};

        svg {
          color: ${semanticColors?.base?.ornamentDisabled};
        }
      }

      ${focusVisibleA11yStyle(props)}
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
 * - Middle and last buttons: top, bottom, right borders (no left)
 */
const SecondaryButtonGroupStyles = (
  props: ButtonGroupExtraProps
): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  const defaultColor = semanticColors?.base?.borderSecondary;
  const disabledColor = semanticColors?.base?.borderPrimaryDisabled;

  // Box-shadow for all borders (first button)
  const allBorders = (color: string | undefined) => `inset 0 0 0 1px ${color}`;

  // Box-shadow for top, bottom, right borders (horizontal: middle and last buttons - no left)
  const topBottomRightBorders = (color: string | undefined) =>
    `inset 0 1px 0 0 ${color}, inset 0 -1px 0 0 ${color}, inset -1px 0 0 0 ${color}`;

  // Box-shadow for left, right, bottom borders (vertical: middle and last buttons - no top)
  const leftRightBottomBorders = (color: string | undefined) =>
    `inset 1px 0 0 0 ${color}, inset -1px 0 0 0 ${color}, inset 0 -1px 0 0 ${color}`;

  return css`
    /* First button - all borders (horizontal) */
    .${buttonGroupClasses.groupedHorizontal}:first-of-type {
      background-color: transparent;
      box-shadow: ${allBorders(defaultColor)};
      color: ${semanticColors?.base?.textPrimary};

      svg {
        color: ${semanticColors?.base?.ornamentPrimary};
      }

      &:hover {
        color: ${semanticColors?.base?.textPrimary};
        background-color: ${semanticColors?.base?.fillPrimaryInteraction};
        box-shadow: ${allBorders(defaultColor)};

        svg {
          color: ${semanticColors?.base?.ornamentPrimary};
        }
      }

      &:active {
        color: ${semanticColors?.base?.textPrimary};
        background-color: ${semanticColors?.base?.fillPrimaryPressed};
        box-shadow: ${allBorders(defaultColor)};

        svg {
          color: ${semanticColors?.base?.ornamentPrimary};
        }
      }

      &:disabled {
        color: ${semanticColors?.base?.textDisabled};
        background-color: transparent;
        box-shadow: ${allBorders(disabledColor)};

        svg {
          color: ${semanticColors?.base?.ornamentDisabled};
        }
      }

      ${focusVisibleA11yStyle(props)}
    }

    /* Middle and last buttons - top, bottom, right borders (horizontal - no left) */
    .${buttonGroupClasses.groupedHorizontal}:not(:first-of-type) {
      background-color: transparent;
      box-shadow: ${topBottomRightBorders(defaultColor)};
      color: ${semanticColors?.base?.textPrimary};

      svg {
        color: ${semanticColors?.base?.ornamentPrimary};
      }

      &:hover {
        color: ${semanticColors?.base?.textPrimary};
        background-color: ${semanticColors?.base?.fillPrimaryInteraction};
        box-shadow: ${topBottomRightBorders(defaultColor)};

        svg {
          color: ${semanticColors?.base?.ornamentPrimary};
        }
      }

      &:active {
        color: ${semanticColors?.base?.textPrimary};
        background-color: ${semanticColors?.base?.fillPrimaryPressed};
        box-shadow: ${topBottomRightBorders(defaultColor)};

        svg {
          color: ${semanticColors?.base?.ornamentPrimary};
        }
      }

      &:disabled {
        color: ${semanticColors?.base?.textDisabled};
        background-color: transparent;
        box-shadow: ${topBottomRightBorders(disabledColor)};

        svg {
          color: ${semanticColors?.base?.ornamentDisabled};
        }
      }

      ${focusVisibleA11yStyle(props)}
    }

    /* First button - all borders (vertical) */
    .${buttonGroupClasses.groupedVertical}:first-of-type {
      background-color: transparent;
      box-shadow: ${allBorders(defaultColor)};
      color: ${semanticColors?.base?.textPrimary};

      svg {
        color: ${semanticColors?.base?.ornamentPrimary};
      }

      &:hover {
        color: ${semanticColors?.base?.textPrimary};
        background-color: ${semanticColors?.base?.fillPrimaryInteraction};
        box-shadow: ${allBorders(defaultColor)};

        svg {
          color: ${semanticColors?.base?.ornamentPrimary};
        }
      }

      &:active {
        color: ${semanticColors?.base?.textPrimary};
        background-color: ${semanticColors?.base?.fillPrimaryPressed};
        box-shadow: ${allBorders(defaultColor)};

        svg {
          color: ${semanticColors?.base?.ornamentPrimary};
        }
      }

      &:disabled {
        color: ${semanticColors?.base?.textDisabled};
        background-color: transparent;
        box-shadow: ${allBorders(disabledColor)};

        svg {
          color: ${semanticColors?.base?.ornamentDisabled};
        }
      }

      ${focusVisibleA11yStyle(props)}
    }

    /* Middle and last buttons - left, right, bottom borders (vertical - no top) */
    .${buttonGroupClasses.groupedVertical}:not(:first-of-type) {
      background-color: transparent;
      box-shadow: ${leftRightBottomBorders(defaultColor)};
      color: ${semanticColors?.base?.textPrimary};

      svg {
        color: ${semanticColors?.base?.ornamentPrimary};
      }

      &:hover {
        color: ${semanticColors?.base?.textPrimary};
        background-color: ${semanticColors?.base?.fillPrimaryInteraction};
        box-shadow: ${leftRightBottomBorders(defaultColor)};

        svg {
          color: ${semanticColors?.base?.ornamentPrimary};
        }
      }

      &:active {
        color: ${semanticColors?.base?.textPrimary};
        background-color: ${semanticColors?.base?.fillPrimaryPressed};
        box-shadow: ${leftRightBottomBorders(defaultColor)};

        svg {
          color: ${semanticColors?.base?.ornamentPrimary};
        }
      }

      &:disabled {
        color: ${semanticColors?.base?.textDisabled};
        background-color: transparent;
        box-shadow: ${leftRightBottomBorders(disabledColor)};

        svg {
          color: ${semanticColors?.base?.ornamentDisabled};
        }
      }

      ${focusVisibleA11yStyle(props)}
    }
  `;
};

export const StyledButtonGroup = styled(ButtonGroup, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ButtonGroupExtraProps) => {
    const { sdsType = "primary", size = "medium" } = props;

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
