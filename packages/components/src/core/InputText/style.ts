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
  getCorners,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import { focusVisibleA11yStyle } from "src/core/styles/common/mixins/a11y";

export interface InputTextExtraProps extends CommonThemeProps {
  disabled?: boolean;
  intent?: "default" | "negative" | "notice";
  sdsType?: "textField" | "textArea";
  hideLabel?: boolean;
}

const sdsPropNames = ["sdsStyle", "sdsType", "intent", "hideLabel"];

const negative = (props: InputTextExtraProps): SerializedStyles => {
  const borders = getBorders(props);
  const semanticColors = getSemanticColors(props);

  return css`
    .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline} {
      border: ${borders?.negative?.default};
    }

    .${outlinedInputClasses.root}:hover
      .${outlinedInputClasses.notchedOutline} {
      border: ${borders?.base?.hover};
    }

    .${outlinedInputClasses.root}.${outlinedInputClasses.focused} {
      .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.base?.hover};
      }

      .${inputAdornmentClasses.root} .${buttonBaseClasses.root}:last-of-type {
        cursor: default;
        svg {
          color: ${semanticColors?.base?.iconPrimary};
        }
      }
    }
  `;
};

const notice = (props: InputTextExtraProps): SerializedStyles => {
  const borders = getBorders(props);
  const semanticColors = getSemanticColors(props);

  return css`
    .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline} {
      border: ${borders?.notice?.default};
    }

    .${outlinedInputClasses.root}:hover
      .${outlinedInputClasses.notchedOutline} {
      border: ${borders?.base?.hover};
    }

    .${outlinedInputClasses.root}.${outlinedInputClasses.focused} {
      .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.base?.hover};
      }

      .${inputAdornmentClasses.root} .${buttonBaseClasses.root}:last-of-type {
        cursor: default;
        svg {
          color: ${semanticColors?.base?.iconPrimary};
        }
      }
    }
  `;
};

const disabledStyled = (props: InputTextExtraProps): SerializedStyles => {
  const borders = getBorders(props);
  const semanticColors = getSemanticColors(props);

  return css`
    .${outlinedInputClasses.disabled} {
      .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.base?.disabled};
      }

      &:hover .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.base?.disabled};
      }

      &::placeholder {
        color: ${semanticColors?.base?.textDisabled};
        opacity: 1;
      }
    }
  `;
};

const textArea = (props: InputTextExtraProps): SerializedStyles => {
  const spaces = getSpaces(props);

  return css`
    .${outlinedInputClasses.multiline} {
      padding: ${spaces?.xxs}px;

      > .${outlinedInputClasses.inputMultiline} {
        padding: ${spaces?.xxs}px ${spaces?.m}px ${spaces?.m}px;
        resize: both;
      }
    }
  `;
};

export const StyledLabel = styled("label")`
  display: block;
  ${fontBodyS}

  ${(props) => {
    const spaces = getSpaces(props);

    return `
      margin-bottom: ${spaces?.xxs}px;
    `;
  }}
`;

export const StyledInputBase = styled(TextField, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  ${(props: InputTextExtraProps) => {
    const { intent, sdsType, disabled } = props;

    const spaces = getSpaces(props);
    const borders = getBorders(props);
    const corners = getCorners(props);
    const semanticColors = getSemanticColors(props);

    return css`
      margin-bottom: ${spaces?.l}px;
      margin-right: ${spaces?.m}px;
      min-width: 160px;
      display: block;

      .${outlinedInputClasses.inputSizeSmall} {
        ${fontBodyXs(props)}
        padding: ${spaces?.xs}px ${spaces?.m}px;
        height: unset;
        box-sizing: border-box;
        background-color: ${semanticColors?.base?.surfacePrimary};
      }

      .${outlinedInputClasses.notchedOutline} {
        border-radius: ${corners?.m}px;
        border: ${borders?.base?.default};
      }

      .${outlinedInputClasses.input} {
        outline: none;
        border-radius: 4px;
      }

      &.user-is-tabbing .${outlinedInputClasses.input} {
        ${focusVisibleA11yStyle(props)}
      }

      .${outlinedInputClasses.root}:hover
        .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.base?.hover};
      }

      .${outlinedInputClasses.root}.${outlinedInputClasses.focused}
        .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.accent?.default};
      }

      ${sdsType === "textArea" && textArea(props)}
      ${intent === "negative" && negative(props)}
      ${intent === "notice" && notice(props)}
      ${disabled && disabledStyled(props)}
    `;
  }}
`;
