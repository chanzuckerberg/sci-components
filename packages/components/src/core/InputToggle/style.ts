import { Switch, SwitchProps, switchClasses } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontBodyXs,
  getBorders,
  getCorners,
  getIconSizes,
  getSemanticColors,
  getShadows,
  getSpaces,
} from "src/core/styles";

export interface InputToggleExtraProps extends SwitchProps, CommonThemeProps {
  offLabel?: string;
  onChange?(e: React.ChangeEvent): void;
  onLabel?: string;
  width?: number;
}

const toggle = (props: InputToggleExtraProps) => {
  const { disabled, width = 62 } = props;
  const corners = getCorners(props);
  const shadows = getShadows(props);
  const iconSizes = getIconSizes(props);
  const semanticColors = getSemanticColors(props);

  return `
    cursor: ${disabled ? "default" : "pointer"};
    border-radius: ${corners?.l}px;
    height: 24px;
    width: ${width}px;
    line-height: 18px;
    padding: 0;
    overflow: visible;

    .${switchClasses.switchBase} {
      ${focusVisibleA11yStyle(props)}
      outline-offset: 2px !important;
      width: 100%;
      height: 100%;
      border-radius: ${corners?.l}px;
      font: inherit;
      transform: unset;
      justify-content: space-between;

      .${switchClasses.input} {
        width: 100%;
        height: 100%;
        left: 0;
      }

      &.${switchClasses.checked} {
        transform: unset;
      }

      &:hover {
        background-color: transparent;
      }
    }

    .${switchClasses.thumb} {
      height: ${iconSizes?.s?.height}px;
      width: ${iconSizes?.s?.width}px;
      min-width: ${iconSizes?.s?.width}px;
      box-shadow: ${shadows?.none};
    }

    .${switchClasses.track} {
      background-color: ${semanticColors?.base?.surfacePrimary};
      opacity: 1;
      border-radius: ${corners?.l}px;
    }
  `;
};

const toggleOn = (props: InputToggleExtraProps) => {
  const { disabled, value } = props;
  const borders = getBorders(props);
  const spaces = getSpaces(props);
  const semanticColors = getSemanticColors(props);

  return `
    & {
      outline: ${disabled ? borders?.base?.disabled : borders?.accent?.default};
    }

    .${switchClasses.thumb} {
      color: ${disabled ? semanticColors?.base?.iconDisabled : semanticColors?.accent?.icon};
      margin-left: ${spaces?.m}px;
    }

    .${switchClasses.switchBase} {
      left: unset;
      right: 0;
      transform: unset;
      padding: 0 ${spaces?.xxs}px 0 ${spaces?.xs}px;

      .MuiIconButton-label {
        margin-left: ${spaces?.s}px;
      }

      &:before {
        color: ${disabled ? semanticColors?.base?.textDisabled : semanticColors?.base?.textPrimary};
        content: "${value}";
      }
    }

    .${switchClasses.track} {
      background-color: ${semanticColors?.base?.fillPrimary} !important;
      opacity: 1 !important;
    }

    ${
      !disabled &&
      `&:hover {
        outline: ${borders?.accent?.hover};

        .${switchClasses.thumb} {
          color: ${semanticColors?.accent?.iconHover};
        }
      }`
    }
  `;
};

const toggleOff = (props: InputToggleExtraProps) => {
  const { disabled, value } = props;
  const borders = getBorders(props);
  const spaces = getSpaces(props);
  const semanticColors = getSemanticColors(props);

  return `
    & {
      outline: ${disabled ? borders?.base?.disabled : borders?.base?.default};
    }

    .${switchClasses.thumb} {
      color: ${
        disabled
          ? semanticColors?.base?.iconDisabled
          : semanticColors?.base?.iconPrimary
      };
      margin-right: ${spaces?.m}px;
    }

    .${switchClasses.switchBase} {
      right: unset;
      left: 0;
      transform: unset;
      padding: 0 ${spaces?.xs}px 0 ${spaces?.xxs}px;

      .MuiIconButton-label {
        margin-right: ${spaces?.s}px;
      }

      &:after {
        color: ${disabled ? semanticColors?.base?.textDisabled : semanticColors?.base?.textSecondary};
        content: "${value}";
      }
    }

    &:hover {
      .${switchClasses.switchBase} {
        &:after {
          color: ${disabled ? semanticColors?.base?.textDisabled : semanticColors?.base?.textPrimary};
        }
      }
    }

    .${switchClasses.track} {
      background-color: ${semanticColors?.base?.fillPrimary} !important;
      opacity: 1 !important;
    }

    ${
      !disabled &&
      `&:hover {
        outline: ${borders?.base?.hover};

        .${switchClasses.thumb} {
          color: ${semanticColors?.base?.iconPrimaryHover};
        }
      }`
    }
  `;
};

export const Toggle = styled(Switch)`
  ${fontBodyXs}
  ${(props: InputToggleExtraProps) => {
    const { checked } = props;

    return `
      ${toggle(props)}
      ${checked ? toggleOn(props) : toggleOff(props)}
    `;
  }}
` as typeof Switch;
