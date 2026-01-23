/* eslint-disable sonarjs/cognitive-complexity */
import { Button, buttonClasses } from "@mui/material";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
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

const doNotForwardProps = ["sdsType", "sdsSize", "backgroundOnHover"];

type ButtonExtraProps = ButtonV2Props & CommonThemeProps;

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
  } = props;
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);

  const hasIcon = !!startIcon || !!endIcon;
  const onlyIcon = hasIcon && !children;

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

    .${buttonClasses.startIcon}, .${buttonClasses.endIcon} {
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
  } = props;
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);

  const hasIcon = !!startIcon || !!endIcon;
  const onlyIcon = hasIcon && !children;

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

    .${buttonClasses.startIcon}, .${buttonClasses.endIcon} {
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
  } = props;
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);

  const hasIcon = !!startIcon || !!endIcon;
  const onlyIcon = hasIcon && !children;

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

    .${buttonClasses.startIcon}, .${buttonClasses.endIcon} {
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
  `;
};

const PrimaryButtonStyles = (props: ButtonExtraProps): SerializedStyles => {
  const { variant, backgroundOnHover = true } = props;
  const semanticColors = getSemanticColors(props);

  const contentColor =
    variant === "contained"
      ? semanticColors?.base?.textOnFill
      : semanticColors?.accent?.foreground;

  const ornamentColor =
    variant === "contained"
      ? semanticColors?.base?.ornamentOnFill
      : semanticColors?.accent?.foreground;

  const backgroundColor =
    variant === "contained"
      ? semanticColors?.accent?.fillPrimary
      : "transparent";

  const disabledBackgroundColor =
    variant === "contained"
      ? semanticColors?.base?.fillDisabled
      : "transparent";

  const disabledBorder =
    variant === "outlined"
      ? `inset 0 0 0 1px ${semanticColors?.base?.borderSecondary}`
      : "none";

  const boxshadow =
    variant === "outlined"
      ? `inset 0 0 0 1px ${semanticColors?.accent?.foreground}`
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
        : semanticColors?.accent?.foregroundInteraction};
      background-color: ${variant === "contained"
        ? semanticColors?.accent?.fillInteraction
        : variant === "outlined"
          ? semanticColors?.accent?.surfaceSecondary
          : backgroundOnHover
            ? semanticColors?.base?.fillPrimaryInteraction
            : "transparent"};
      box-shadow: ${variant === "text"
        ? "none"
        : `inset 0 0 0 1px
        ${semanticColors?.accent?.foregroundInteraction}`};

      svg {
        color: ${variant === "contained"
          ? semanticColors?.base?.ornamentPrimaryInverse
          : semanticColors?.accent?.foregroundInteraction};
      }
    }

    &:active {
      color: ${variant === "contained"
        ? semanticColors?.base?.textPrimaryInverse
        : semanticColors?.accent?.foregroundPressed};
      background-color: ${variant === "contained"
        ? semanticColors?.accent?.fillPressed
        : variant === "outlined"
          ? semanticColors?.accent?.surfaceSecondary
          : backgroundOnHover
            ? semanticColors?.base?.fillPrimaryPressed
            : "transparent"};
      box-shadow: ${variant === "text"
        ? "none"
        : `inset 0 0 0 1px ${semanticColors?.accent?.fillPressed}`};

      svg {
        color: ${variant === "contained"
          ? semanticColors?.base?.ornamentPrimaryInverse
          : semanticColors?.accent?.foregroundPressed};
      }
    }

    &:disabled {
      color: ${semanticColors?.base?.textDisabled};
      background-color: ${disabledBackgroundColor};
      box-shadow: ${disabledBorder};

      svg {
        color: ${semanticColors?.base?.ornamentDisabled};
      }
    }
  `;
};

const SecondaryButtonStyles = (props: ButtonExtraProps): SerializedStyles => {
  const { variant, backgroundOnHover = true } = props;
  const semanticColors = getSemanticColors(props);
  const corners = getCorners(props);

  const contentColor =
    variant === "text"
      ? semanticColors?.base?.textSecondary
      : semanticColors?.base?.textPrimary;
  const ornamentColor =
    variant === "text"
      ? semanticColors?.base?.ornamentSecondary
      : semanticColors?.base?.ornamentPrimary;
  const backgroundColor =
    variant === "contained"
      ? semanticColors?.base?.fillSecondary
      : "transparent";

  const disabledBackgroundColor =
    variant === "contained"
      ? semanticColors?.base?.fillDisabled
      : "transparent";

  const disabledBorder =
    variant === "outlined"
      ? `inset 0 0 0 1px ${semanticColors?.base?.borderSecondary}`
      : "none";

  const boxshadow =
    variant === "outlined"
      ? `inset 0 0 0 1px ${semanticColors?.base?.borderSecondary}`
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
          ? semanticColors?.base?.fillSecondaryInteraction
          : variant === "outlined"
            ? semanticColors?.base?.fillPrimaryInteraction
            : backgroundOnHover
              ? semanticColors?.base?.fillPrimaryInteraction
              : "transparent"};
      }
      background-color: ${backgroundColor};
      box-shadow: ${variant === "outlined"
        ? `inset 0 0 0 1px ${semanticColors?.base?.borderSecondary}`
        : "none"};
      color: ${semanticColors?.base?.textPrimary};
      svg {
        color: ${semanticColors?.base?.ornamentPrimary};
      }
    }

    &:active {
      & > * {
        position: relative;
        z-index: 1;
      }
      &::before {
        background-color: ${variant === "contained"
          ? semanticColors?.base?.fillSecondaryPressed
          : variant === "outlined"
            ? semanticColors?.base?.fillPrimaryPressed
            : backgroundOnHover
              ? semanticColors?.base?.fillPrimaryPressed
              : "transparent"};
      }
      background-color: ${backgroundColor};
      box-shadow: ${variant === "outlined"
        ? `inset 0 0 0 1px ${semanticColors?.base?.borderSecondary}`
        : "none"};
    }

    &:disabled {
      color: ${semanticColors?.base?.textDisabled};
      background-color: ${disabledBackgroundColor};
      box-shadow: ${disabledBorder};

      svg {
        color: ${semanticColors?.base?.ornamentDisabled};
      }
    }
  `;
};

const DestructiveButtonStyles = (props: ButtonExtraProps): SerializedStyles => {
  const { variant, backgroundOnHover = true } = props;
  const semanticColors = getSemanticColors(props);

  const contentColor =
    variant === "contained"
      ? semanticColors?.base?.textOnFill
      : semanticColors?.negative?.foreground;

  const ornamentColor =
    variant === "contained"
      ? semanticColors?.base?.ornamentOnFill
      : semanticColors?.negative?.foreground;

  const backgroundColor =
    variant === "contained"
      ? semanticColors?.negative?.fillPrimary
      : "transparent";

  const disabledBackgroundColor =
    variant === "contained"
      ? semanticColors?.base?.fillDisabled
      : "transparent";

  const disabledBorder =
    variant === "outlined"
      ? `inset 0 0 0 1px ${semanticColors?.base?.borderSecondary}`
      : "none";

  const boxshadow =
    variant === "outlined"
      ? `inset 0 0 0 1px ${semanticColors?.negative?.foreground}`
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
        ? semanticColors?.negative?.foregroundInteraction
        : semanticColors?.base?.textPrimaryInverse};
      background-color: ${variant === "text"
        ? backgroundOnHover
          ? semanticColors?.base?.fillPrimaryInteraction
          : "transparent"
        : semanticColors?.negative?.fillInteraction};
      box-shadow: none;

      svg {
        color: ${variant === "text"
          ? semanticColors?.negative?.foregroundInteraction
          : semanticColors?.base?.ornamentPrimaryInverse};
      }
    }

    &:active {
      color: ${variant === "text"
        ? semanticColors?.negative?.foregroundPressed
        : semanticColors?.base?.textPrimaryInverse};
      background-color: ${variant === "text"
        ? backgroundOnHover
          ? semanticColors?.base?.fillPrimaryPressed
          : "transparent"
        : semanticColors?.negative?.fillPressed};
      box-shadow: ${variant === "text"
        ? "none"
        : `inset 0 0 0 1px ${semanticColors?.negative?.fillPressed}`};

      svg {
        color: ${variant === "text"
          ? semanticColors?.negative?.foregroundPressed
          : semanticColors?.base?.ornamentPrimaryInverse};
      }
    }

    &:disabled {
      color: ${semanticColors?.base?.textDisabled};
      background-color: ${disabledBackgroundColor};
      box-shadow: ${disabledBorder};

      svg {
        color: ${semanticColors?.base?.ornamentDisabled};
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
