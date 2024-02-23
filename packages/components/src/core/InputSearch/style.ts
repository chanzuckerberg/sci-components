import { css, SerializedStyles } from "@emotion/react";
import {
  buttonBaseClasses,
  InputAdornment,
  inputAdornmentClasses,
  inputBaseClasses,
  outlinedInputClasses,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyM,
  fontBodyXs,
  getColors,
  getCorners,
  getIconSizes,
  getSemanticComponentColors,
  getSpaces,
} from "../styles";

export interface InputSearchExtraProps extends CommonThemeProps {
  disabled?: boolean;
  intent?: "default" | "error" | "warning";
  sdsStyle?: "rounded" | "square";
  sdsStage?: "default" | "userInput";
  value?: string;
}

const sdsPropNames = ["sdsStyle", "sdsStage", "intent", "handleSubmit"];

const rounded = (props: InputSearchExtraProps): SerializedStyles => {
  const corners = getCorners(props);
  const semanticComponentColors = getSemanticComponentColors(props);

  return css`
    .${outlinedInputClasses.root} {
      border-radius: ${corners?.l}px;

      .${outlinedInputClasses.notchedOutline} {
        border-radius: ${corners?.l}px;
        border: 1px solid ${semanticComponentColors?.base?.border};
      }
    }
  `;
};

const error = (props: InputSearchExtraProps): SerializedStyles => {
  const semanticComponentColors = getSemanticComponentColors(props);

  return css`
    .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline} {
      border: 1px solid ${semanticComponentColors?.negative?.border};
    }

    .${outlinedInputClasses.root}:hover
      .${outlinedInputClasses.notchedOutline} {
      border: 1px solid ${semanticComponentColors?.negative?.border};
    }

    .${outlinedInputClasses.root}.${outlinedInputClasses.focused} {
      .${outlinedInputClasses.notchedOutline} {
        border: 1px solid ${semanticComponentColors?.negative?.border};
      }

      .${inputAdornmentClasses.root} .${buttonBaseClasses.root}:last-of-type {
        cursor: default;
        svg {
          color: ${semanticComponentColors?.base?.icon};
        }
      }
    }
  `;
};

const warning = (props: InputSearchExtraProps): SerializedStyles => {
  const semanticComponentColors = getSemanticComponentColors(props);

  return css`
    .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline} {
      border: 1px solid ${semanticComponentColors?.notice?.border};
    }

    .${outlinedInputClasses.root}:hover
      .${outlinedInputClasses.notchedOutline} {
      border: 1px solid ${semanticComponentColors?.notice?.border};
    }

    .${outlinedInputClasses.root}.${outlinedInputClasses.focused} {
      .${outlinedInputClasses.notchedOutline} {
        border: 1px solid ${semanticComponentColors?.notice?.border};
      }

      .${inputAdornmentClasses.root} .${buttonBaseClasses.root}:last-of-type {
        cursor: default;
        svg {
          color: ${semanticComponentColors?.base?.icon};
        }
      }
    }
  `;
};

const userInput = (props: InputSearchExtraProps): SerializedStyles => {
  const { intent } = props;
  const semanticComponentColors = getSemanticComponentColors(props);

  const border =
    intent === "error"
      ? semanticComponentColors?.negative?.border
      : intent === "warning"
        ? semanticComponentColors?.notice?.border
        : semanticComponentColors?.accent?.border;

  const color =
    intent === "default"
      ? semanticComponentColors?.accent?.icon
      : semanticComponentColors?.base?.icon;

  return css`
    .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline} {
      border: 1px solid ${border};
    }

    .${outlinedInputClasses.root}:hover
      .${outlinedInputClasses.notchedOutline} {
      border: 1px solid ${border};
    }

    .${inputAdornmentClasses.root} svg {
      color: ${color};
    }
  `;
};

const disabledStyled = (props: InputSearchExtraProps): SerializedStyles => {
  const colors = getColors(props);
  const semanticComponentColors = getSemanticComponentColors(props);

  return css`
    .${outlinedInputClasses.disabled} {
      .${outlinedInputClasses.notchedOutline} {
        border: 1px solid ${semanticComponentColors?.base?.borderDisabled};
      }

      .${inputAdornmentClasses.root} svg {
        color: ${semanticComponentColors?.base?.iconDisabled};
      }

      &:hover .${outlinedInputClasses.notchedOutline} {
        border: 1px solid ${semanticComponentColors?.base?.borderDisabled};
      }

      &::placeholder {
        color: ${colors?.gray[300]};
        opacity: 1;
      }
    }
  `;
};

export const StyledLabel = styled("label")`
  ${fontBodyM}
  ${(props) => {
    const spacings = getSpaces(props);

    return `
      margin-bottom: ${spacings?.xxs}px;
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
    const { intent, disabled, sdsStyle, sdsStage, value } = props;

    const spacings = getSpaces(props);
    const iconSizes = getIconSizes(props);
    const semanticComponentColors = getSemanticComponentColors(props);

    return css`
      margin-top: ${spacings?.m}px;
      margin-bottom: ${spacings?.m}px;
      margin-right: ${spacings?.xl}px;
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
        padding: 0 ${spacings?.m}px;
        background-color: ${semanticComponentColors?.base?.surface};

        .${outlinedInputClasses.notchedOutline} {
          border: 1px solid ${semanticComponentColors?.base?.border};
        }

        &:hover .input-search-clear-icon,
        &:focus-within .input-search-clear-icon {
          opacity: ${value ? 1 : 0};
        }
      }

      .${inputBaseClasses.inputSizeSmall} {
        ${fontBodyXs(props)}
        padding: ${spacings?.xs}px ${spacings?.s}px;
        height: unset;
        box-sizing: border-box;
        background-color: ${semanticComponentColors?.base?.surface};
      }

      .${outlinedInputClasses.root}:hover
        .${outlinedInputClasses.notchedOutline} {
        border: 1px solid ${semanticComponentColors?.base?.borderHover};
      }

      .${outlinedInputClasses.root}.${outlinedInputClasses.focused} {
        .${outlinedInputClasses.notchedOutline} {
          border: 1px solid ${semanticComponentColors?.accent?.border};
        }

        .${inputAdornmentClasses.root} .${buttonBaseClasses.root}:last-of-type {
          cursor: default;
          svg {
            color: ${semanticComponentColors?.accent?.icon};
          }
        }
      }

      ${sdsStyle === "rounded" && rounded(props)}
      ${intent === "error" && error(props)}
      ${intent === "warning" && warning(props)}
      ${disabled && disabledStyled(props)}
      ${sdsStage === "userInput" && userInput(props)}
    `;
  }}
`;

export const StyledInputAdornment = styled(InputAdornment)`
  position: relative;
  height: unset;
  margin: 0;
`;
