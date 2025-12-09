import { css, SerializedStyles } from "@emotion/react";
import {
  buttonBaseClasses,
  inputAdornmentClasses,
  outlinedInputClasses,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodySemiboldXxxs,
  fontBodyXs,
  getBorders,
  getCorners,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import { focusVisibleA11yStyle } from "src/core/styles/common/mixins/a11y";

type IntentType = "negative" | "notice" | "positive";
export interface InputTextExtraProps extends CommonThemeProps {
  disabled?: boolean;
  intent?: "default" | IntentType;
  sdsType?: "textField" | "textArea";
  hideLabel?: boolean;
}

const sdsPropNames = ["sdsStyle", "sdsType", "intent", "hideLabel"];

const applyIntentColor = (
  props: InputTextExtraProps,
  intent: IntentType
): SerializedStyles => {
  const borders = getBorders(props);
  const semanticColors = getSemanticColors(props);

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

const disabledStyled = (props: InputTextExtraProps): SerializedStyles => {
  const borders = getBorders(props);
  const semanticColors = getSemanticColors(props);

  return css`
    .${outlinedInputClasses.disabled} {
      .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.base?.disabled};
        opacity: 1;
      }

      &:hover .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.base?.disabled};
        background-color: unset;
        opacity: 1;
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
  ${fontBodySemiboldXxxs}

  ${(props) => {
    const spaces = getSpaces(props);

    return `
      margin-bottom: ${spaces?.s}px;
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
      display: block;

      .${outlinedInputClasses.root} {
        width: 100%;
      }

      .${outlinedInputClasses.inputSizeSmall} {
        ${fontBodyXs(props)}
        padding: ${spaces?.xs}px ${spaces?.m}px;
        height: unset;
        box-sizing: border-box;
      }

      .${outlinedInputClasses.notchedOutline} {
        border-radius: ${corners?.l}px;
        border: ${borders?.base?.default};
      }

      .${outlinedInputClasses.input} {
        outline: none;
        border-radius: 4px;
        width: 100%;

        &::placeholder {
          color: ${semanticColors?.base?.textTertiary};
          opacity: 1;
        }
      }

      &.user-is-tabbing .${outlinedInputClasses.input} {
        ${focusVisibleA11yStyle(props)}
      }

      .${outlinedInputClasses.root}:hover
        .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.base?.hover};
        background-color: ${semanticColors?.base?.fillHover};
      }

      .${outlinedInputClasses.root}.${outlinedInputClasses.focused}
        .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.accent?.default};
      }

      ${sdsType === "textArea" && textArea(props)}
      ${intent === "negative" && applyIntentColor(props, "negative")}
      ${intent === "notice" && applyIntentColor(props, "notice")}
      ${intent === "positive" && applyIntentColor(props, "positive")}
      ${disabled && disabledStyled(props)}
    `;
  }}
`;
