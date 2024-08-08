"use client";

import { Switch, SwitchProps, switchClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontBodyXs,
  getBorders,
  getColors,
  getCorners,
  getIconSizes,
  getSemanticComponentColors,
  getSemanticTextColors,
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
  const semanticComponentColors = getSemanticComponentColors(props);

  return `
    cursor: ${disabled ? "default" : "pointer"};
    border-radius: ${corners?.l}px;
    height: 24px;
    width: ${width}px;
    line-height: 18px;
    padding: 0;
    overflow: visible;

    .${switchClasses.switchBase} {
      ${focusVisibleA11yStyle()}
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
      background-color: ${semanticComponentColors?.base?.surfacePrimary};
      width: unset;
    }
  `;
};

const toggleOn = (props: InputToggleExtraProps) => {
  const { disabled, value } = props;
  const borders = getBorders(props);
  const colors = getColors(props);
  const spaces = getSpaces(props);
  const semanticComponentColors = getSemanticComponentColors(props);
  const semanticTextColors = getSemanticTextColors(props);

  return `
    outline: ${disabled ? borders?.accent?.disabled : borders?.accent?.default};

    .${switchClasses.thumb} {
      color: ${disabled ? semanticComponentColors?.accent?.borderDisabled : semanticComponentColors?.accent?.border};
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
        color: ${disabled ? semanticTextColors?.base?.disabled : semanticTextColors?.base?.primary};
        content: "${value}";
      }
    }

    ${
      !disabled &&
      `&:hover {
        outline: ${borders?.accent?.hover};

        .${switchClasses.thumb} {
          color: ${colors?.blue[500]};
        }
      }`
    }
  `;
};

const toggleOff = (props: InputToggleExtraProps) => {
  const { disabled, value } = props;
  const borders = getBorders(props);
  const spaces = getSpaces(props);
  const semanticComponentColors = getSemanticComponentColors(props);
  const semanticTextColors = getSemanticTextColors(props);

  return `
    & {
      outline: ${disabled ? borders?.base?.disabled : borders?.base?.default};
    }

    .${switchClasses.thumb} {
      color: ${
        disabled
          ? semanticComponentColors?.base?.borderDisabled
          : semanticComponentColors?.base?.border
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
        color: ${disabled ? semanticTextColors?.base?.disabled : semanticTextColors?.base?.primary};
        content: "${value}";
      }
    }

    ${
      !disabled &&
      `&:hover {
        outline: ${borders?.base?.black};

        .${switchClasses.thumb} {
          color: ${semanticComponentColors?.base?.iconHover};
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
