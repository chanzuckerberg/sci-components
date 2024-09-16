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
  getCorners,
  getIconSizes,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

export interface InputSearchExtraProps extends CommonThemeProps {
  disabled?: boolean;
  intent?: "default" | "negative" | "notice";
  sdsStyle?: "rounded" | "square";
  value?: string;
}

const sdsPropNames = ["sdsStyle", "intent", "handleSubmit"];

const rounded = (props: InputSearchExtraProps): SerializedStyles => {
  const corners = getCorners(props);
  const semanticColors = getSemanticColors(props);

  return css`
    .${outlinedInputClasses.root} {
      border-radius: ${corners?.l}px;

      .${outlinedInputClasses.notchedOutline} {
        border-radius: ${corners?.l}px;
        border: 1px solid ${semanticColors?.base?.border};
      }
    }
  `;
};

const error = (props: InputSearchExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline} {
      border: 1px solid ${semanticColors?.negative?.border};
    }

    .${outlinedInputClasses.root}:hover
      .${outlinedInputClasses.notchedOutline} {
      border: 1px solid ${semanticColors?.base?.borderHover};
    }

    .${outlinedInputClasses.root}.${outlinedInputClasses.focused} {
      .${outlinedInputClasses.notchedOutline} {
        border: 1px solid ${semanticColors?.base?.borderHover};
      }

      .${inputAdornmentClasses.root} .${buttonBaseClasses.root}:last-of-type {
        cursor: default;
        svg {
          color: ${semanticColors?.base?.iconPrimaryHover};
        }
      }
    }
  `;
};

const warning = (props: InputSearchExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline} {
      border: 1px solid ${semanticColors?.notice?.border};
    }

    .${outlinedInputClasses.root}:hover
      .${outlinedInputClasses.notchedOutline} {
      border: 1px solid ${semanticColors?.base?.borderHover};
    }

    .${outlinedInputClasses.root}.${outlinedInputClasses.focused} {
      .${outlinedInputClasses.notchedOutline} {
        border: 1px solid ${semanticColors?.base?.borderHover};
      }

      .${inputAdornmentClasses.root} .${buttonBaseClasses.root}:last-of-type {
        cursor: default;
        svg {
          color: ${semanticColors?.base?.iconPrimaryHover};
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
        border: 1px solid ${semanticColors?.base?.borderDisabled} !important;
      }

      .${inputAdornmentClasses.root} svg {
        color: ${semanticColors?.base?.iconDisabled};
      }

      &:hover .${outlinedInputClasses.notchedOutline} {
        border: 1px solid ${semanticColors?.base?.borderDisabled};
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
    return !sdsPropNames.includes(prop.toString());
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
        opacity: 0;
        cursor: pointer;

        svg {
          height: ${iconSizes?.xs?.height}px;
          width: ${iconSizes?.xs?.width}px;
        }
      }

      .${outlinedInputClasses.root} {
        padding: 0 ${spaces?.m}px;
        background-color: ${semanticColors?.base?.surfacePrimary};

        .${outlinedInputClasses.notchedOutline} {
          border: 1px solid ${semanticColors?.base?.border};
        }

        &:hover .input-search-clear-icon,
        &:focus-within .input-search-clear-icon {
          opacity: 1;

          svg {
            color: ${semanticColors?.base?.iconPrimary} !important;
          }

          &:hover {
            svg {
              color: ${semanticColors?.base?.iconPrimaryHover} !important;
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
        background-color: ${semanticColors?.base?.surfacePrimary};
      }

      .${outlinedInputClasses.root}:hover {
        & .${buttonBaseClasses.root}:last-of-type {
          svg {
            color: ${semanticColors?.base?.iconPrimaryHover};
          }
        }
        .${outlinedInputClasses.notchedOutline} {
          border: 1px solid ${semanticColors?.base?.borderHover};
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
            color: ${semanticColors?.accent?.icon};
          }
        }
      }

      &.user-is-tabbing .${outlinedInputClasses.root}:focus-within {
        outline: 2px solid ${semanticColors?.base?.borderHover};
        outline-offset: 1px;
      }

      ${sdsStyle === "rounded" && rounded(props)}
      ${intent === "negative" && error(props)}
      ${intent === "notice" && warning(props)}
      ${disabled && disabledStyled(props)}
    `;
  }}
`;

export const StyledInputAdornment = styled(InputAdornment)`
  position: relative;
  height: unset;
  margin: 0;
`;
