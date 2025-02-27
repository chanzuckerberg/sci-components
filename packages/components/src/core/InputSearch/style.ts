import { css, SerializedStyles } from "@emotion/react";
import {
  buttonBaseClasses,
  InputAdornment,
  inputAdornmentClasses,
  inputBaseClasses,
  outlinedInputClasses,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyM,
  fontBodyXs,
  getBorders,
  getCorners,
  getIconSizes,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

type IntentType = "negative" | "notice" | "positive";
export interface InputSearchExtraProps extends CommonThemeProps {
  disabled?: boolean;
  intent?: IntentType | "default";
  sdsStyle?: "rounded" | "square";
  value?: string;
}

const doNotForwardProps = [
  "sdsStyle",
  "intent",
  "handleSubmit",
  "customTheme",
  "hasInvertedStyle",
];

const rounded = (props: InputSearchExtraProps): SerializedStyles => {
  const corners = getCorners(props);
  const semanticColors = getSemanticColors(props);

  return css`
    .${outlinedInputClasses.root} {
      border-radius: ${corners?.l}px;

      .${outlinedInputClasses.notchedOutline} {
        border-radius: ${corners?.l}px;
        border: 1px solid ${semanticColors?.base?.borderPrimary};
      }
    }
  `;
};

const applyIntentColor = (
  props: InputSearchExtraProps,
  intent: IntentType
): SerializedStyles => {
  const semanticColors = getSemanticColors(props);
  const borders = getBorders(props);

  return css`
    .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline} {
      border: ${borders?.[intent]?.default};
    }

    .${outlinedInputClasses.root}:hover
      .${outlinedInputClasses.notchedOutline} {
      border: ${borders?.base?.hover};
    }

    .${outlinedInputClasses.root}.${outlinedInputClasses.focused} {
      .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.[intent]?.default};
      }

      .${inputAdornmentClasses.root} .${buttonBaseClasses.root}:last-of-type {
        cursor: default;
        svg {
          color: ${semanticColors?.[intent]?.ornament};
        }
      }
    }
  `;
};

const disabledStyled = (props: InputSearchExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    .${outlinedInputClasses.disabled} {
      .${outlinedInputClasses.notchedOutline} {
        border: 1px solid ${semanticColors?.base?.borderPrimaryDisabled} !important;
      }

      .${inputAdornmentClasses.root} svg {
        color: ${semanticColors?.base?.ornamentDisabled};
      }

      &:hover {
        .${outlinedInputClasses.notchedOutline} {
          border: 1px solid ${semanticColors?.base?.borderPrimaryDisabled};
        }

        .${inputAdornmentClasses.root} svg {
          color: ${semanticColors?.base?.ornamentDisabled} !important;
        }
      }

      &::placeholder {
        color: ${semanticColors?.base?.textDisabled};
        opacity: 1;
      }
    }
  `;
};

export const StyledLabel = styled("label")`
  ${fontBodyM}
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      margin-bottom: ${spaces?.xxs}px;
      position: absolute;
      overflow: hidden;
      clip: rect(0 0 0 0);
      height: 1px;
      width: 1px;
      margin: -1px; 
      padding: 0; 
      border: 0;
    `;
  }}
`;

export const StyledSearchBase = styled(TextField, {
  shouldForwardProp: (prop) => {
    return !doNotForwardProps.includes(prop.toString());
  },
})`
  ${(props: InputSearchExtraProps) => {
    const { intent, disabled, sdsStyle } = props;

    const spaces = getSpaces(props);
    const iconSizes = getIconSizes(props);
    const semanticColors = getSemanticColors(props);

    return css`
      margin-top: ${spaces?.m}px;
      margin-bottom: ${spaces?.m}px;
      margin-right: ${spaces?.xl}px;
      min-width: 120px;
      display: block;

      [type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: none;
        appearance: none;
      }

      & .input-search-clear-icon {
        cursor: pointer;

        svg {
          height: ${iconSizes?.xs?.height}px;
          width: ${iconSizes?.xs?.width}px;
        }
      }

      .${outlinedInputClasses.root} {
        padding: 0 ${spaces?.m}px;
        width: 100%;

        .${outlinedInputClasses.input} {
          padding-right: ${spaces?.l}px;
        }

        .MuiInputAdornment-positionEnd {
          position: absolute;
          right: ${spaces?.m}px;
        }

        .${outlinedInputClasses.notchedOutline} {
          border: 1px solid ${semanticColors?.base?.borderPrimary};
        }

        &:hover .input-search-clear-icon,
        &:focus-within .input-search-clear-icon {
          svg {
            color: ${semanticColors?.base?.ornamentSecondary} !important;
          }

          &:hover {
            svg {
              color: ${semanticColors?.base?.ornamentSecondaryHover} !important;
            }
          }

          &:active {
            svg {
              color: ${semanticColors?.accent?.fillPressed} !important;
            }
          }
        }
      }

      .${inputBaseClasses.inputSizeSmall} {
        ${fontBodyXs(props)}
        padding: ${spaces?.xs}px ${spaces?.s}px;
        height: unset;
        box-sizing: border-box;
      }

      .${outlinedInputClasses.root}:hover {
        & .${buttonBaseClasses.root}:last-of-type {
          svg {
            color: ${semanticColors?.base?.ornamentSecondaryHover};
          }
        }
        .${outlinedInputClasses.notchedOutline} {
          border: 1px solid ${semanticColors?.base?.borderPrimaryHover};
        }
      }

      .${outlinedInputClasses.root}.${outlinedInputClasses.focused} {
        outline: none;

        .${outlinedInputClasses.notchedOutline} {
          border: 1px solid ${semanticColors?.accent?.border};
        }

        .${inputAdornmentClasses.root} .${buttonBaseClasses.root}:last-of-type {
          cursor: default;
          svg {
            color: ${semanticColors?.accent?.ornamentFocus};
          }
        }
      }

      &.user-is-tabbing .${outlinedInputClasses.root}:focus-within {
        outline: 2px solid ${semanticColors?.base?.borderPrimaryHover};
        outline-offset: 1px;
      }

      ${sdsStyle === "rounded" && rounded(props)}
      ${intent === "negative" && applyIntentColor(props, "negative")}
      ${intent === "notice" && applyIntentColor(props, "notice")}
      ${intent === "positive" && applyIntentColor(props, "positive")}
      ${disabled && disabledStyled(props)}
    `;
  }}
`;

export const StyledInputAdornment = styled(InputAdornment)`
  position: relative;
  height: unset;
  margin: 0;
`;
