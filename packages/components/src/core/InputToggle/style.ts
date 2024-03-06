import { Switch, SwitchProps, switchClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyXs,
  getBorders,
  getColors,
  getCorners,
  getSemanticComponentColors,
  getSemanticTextColors,
  getShadows,
  getSpaces,
} from "src/core/styles";

export interface InputToggleExtraProps extends SwitchProps, CommonThemeProps {
  offLabel?: string;
  onChange?(e: React.ChangeEvent): void;
  onLabel?: string;
}

const toggle = (props: InputToggleExtraProps) => {
  const { disabled } = props;
  const corners = getCorners(props);
  const spaces = getSpaces(props);
  const shadows = getShadows(props);
  const semanticComponentColors = getSemanticComponentColors(props);

  const TOGGLE_HEIGHT = 18;

  return `
    cursor: ${disabled ? "default" : "pointer"};
    border-radius: ${corners?.l}px;
    height: 26px;
    width: 62px;
    line-height: 18px;
    padding: ${spaces?.xxs}px;

    .${switchClasses.switchBase} {
      font: inherit;
      margin: ${spaces?.xxs}px;
      padding: 0;
      transform: unset;

      &:hover {
        background-color: transparent;
      }
    }

    .${switchClasses.thumb} {
      height: ${TOGGLE_HEIGHT}px;
      width: ${TOGGLE_HEIGHT}px;
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
    outline: ${disabled ? borders?.accent[300] : borders?.accent[400]};

    .${switchClasses.thumb} {
      color: ${disabled ? semanticComponentColors?.accent?.borderDisabled : semanticComponentColors?.accent?.border};
      margin-left: ${spaces?.s}px;
    }

    .${switchClasses.switchBase} {
      left: unset;
      right: 0;
      transform: unset;

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
        outline: ${borders?.accent[500]};

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
      outline: ${disabled ? borders?.base[300] : borders?.base[400]};
    }

    .${switchClasses.thumb} {
      color: ${
        disabled
          ? semanticComponentColors?.base?.borderDisabled
          : semanticComponentColors?.base?.border
      };
      margin-right: ${spaces?.s}px;
    }

    .${switchClasses.switchBase} {
      right: unset;
      left: 0;
      transform: unset;

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
