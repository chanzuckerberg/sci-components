import { css, SerializedStyles } from "@emotion/react";
import {
  buttonBaseClasses,
  inputAdornmentClasses,
  outlinedInputClasses,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyS,
  fontBodyXs,
  getBorders,
  getColors,
  getCorners,
  getSemanticComponentColors,
  getSpaces,
} from "../styles";

export interface InputTextExtraProps extends CommonThemeProps {
  disabled?: boolean;
  intent?: "default" | "error" | "warning";
  sdsType?: "textField" | "textArea";
  sdsStage?: "default" | "userInput";
  hideLabel?: boolean;
}

const sdsPropNames = ["sdsStyle", "sdsStage", "sdsType", "intent", "hideLabel"];

const error = (props: InputTextExtraProps): SerializedStyles => {
  const borders = getBorders(props);
  const semanticComponentColors = getSemanticComponentColors(props);

  return css`
    .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline} {
      border: ${borders?.negative[400]};
    }

    .${outlinedInputClasses.root}:hover
      .${outlinedInputClasses.notchedOutline} {
      border: ${borders?.negative[400]};
    }

    .${outlinedInputClasses.root}.${outlinedInputClasses.focused} {
      .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.negative[400]};
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

const warning = (props: InputTextExtraProps): SerializedStyles => {
  const borders = getBorders(props);
  const semanticComponentColors = getSemanticComponentColors(props);

  return css`
    .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline} {
      border: ${borders?.notice[400]};
    }

    .${outlinedInputClasses.root}:hover
      .${outlinedInputClasses.notchedOutline} {
      border: ${borders?.notice[400]};
    }

    .${outlinedInputClasses.root}.${outlinedInputClasses.focused} {
      .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.notice[400]};
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

const disabledStyled = (props: InputTextExtraProps): SerializedStyles => {
  const borders = getBorders(props);
  const colors = getColors(props);

  return css`
    .${outlinedInputClasses.disabled} {
      .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.base[300]};
      }

      &:hover .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.base[300]};
      }

      &::placeholder {
        color: ${colors?.gray[300]};
        opacity: 1;
      }
    }
  `;
};

const textArea = (props: InputTextExtraProps): SerializedStyles => {
  const spacings = getSpaces(props);

  return css`
    .${outlinedInputClasses.multiline} {
      padding: ${spacings?.xxs}px;

      > .${outlinedInputClasses.inputMultiline} {
        padding: ${spacings?.xxs}px ${spacings?.m}px ${spacings?.m}px;
        resize: both;
      }
    }
  `;
};

const userInput = (props: InputTextExtraProps): SerializedStyles => {
  const { intent } = props;
  const borders = getBorders(props);

  const border =
    intent === "error"
      ? borders?.negative[400]
      : intent === "warning"
        ? borders?.notice[400]
        : borders?.accent[400];

  return css`
    .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline} {
      border: ${border};
    }

    .${outlinedInputClasses.root}:hover
      .${outlinedInputClasses.notchedOutline} {
      border: ${border};
    }
  `;
};

export const StyledLabel = styled("label")`
  display: block;
  ${fontBodyS}

  ${(props) => {
    const spacings = getSpaces(props);

    return `
      margin-bottom: ${spacings?.xxs}px;
    `;
  }}
`;

export const StyledInputBase = styled(TextField, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  ${(props: InputTextExtraProps) => {
    const { intent, sdsType, sdsStage, disabled } = props;

    const spacings = getSpaces(props);
    const borders = getBorders(props);
    const corners = getCorners(props);
    const semanticComponentColors = getSemanticComponentColors(props);

    return css`
      margin-bottom: ${spacings?.l}px;
      margin-right: ${spacings?.m}px;
      min-width: 160px;
      display: block;

      .${outlinedInputClasses.inputSizeSmall} {
        ${fontBodyXs(props)}
        padding: ${spacings?.xs}px ${spacings?.m}px;
        height: unset;
        box-sizing: border-box;
        background-color: ${semanticComponentColors?.base?.surfacePrimary};
      }

      .${outlinedInputClasses.notchedOutline} {
        border-radius: ${corners?.m}px;
        border: ${borders?.base[400]};
      }

      .${outlinedInputClasses.root}:hover
        .${outlinedInputClasses.notchedOutline} {
        border-color: ${semanticComponentColors?.base?.borderHover};
      }

      .${outlinedInputClasses.root}.${outlinedInputClasses.focused}
        .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.accent[400]};
      }

      ${sdsType === "textArea" && textArea(props)}
      ${intent === "error" && error(props)}
      ${intent === "warning" && warning(props)}
      ${disabled && disabledStyled(props)}
      ${sdsStage === "userInput" && userInput(props)}
    `;
  }}
`;
