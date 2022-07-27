import { css, SerializedStyles } from "@emotion/react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyS,
  getBorders,
  getCorners,
  getSpaces,
  getTypography,
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

  return css`
    .MuiOutlinedInput-notchedOutline {
      border: ${borders?.error[400]};
    }
  `;
};

const warning = (props: InputTextExtraProps): SerializedStyles => {
  const borders = getBorders(props);

  return css`
    .MuiOutlinedInput-notchedOutline {
      border: ${borders?.warning[400]};
    }
  `;
};

const disabledStyled = (props: InputTextExtraProps): SerializedStyles => {
  const borders = getBorders(props);

  return css`
    .Mui-disabled {
      .MuiOutlinedInput-notchedOutline {
        border: ${borders?.gray[300]};
      }
      &:hover .MuiOutlinedInput-notchedOutline {
        border: ${borders?.gray[300]};
      }
    }
  `;
};

const textArea = (props: InputTextExtraProps): SerializedStyles => {
  const spacings = getSpaces(props);
  return css`
    .MuiInputBase-multiline {
      padding: ${spacings?.xxs}px;
      > .MuiInputBase-inputMultiline {
        padding: ${spacings?.xxs}px ${spacings?.m}px ${spacings?.m}px;
        resize: both;
      }
    }
  `;
};

export const StyledLabel = styled("label")`
  display: block;
  ${fontBodyS}

  ${(props) => {
    const typography = getTypography(props);
    const spacings = getSpaces(props);

    return `
      font-family: ${typography?.fontFamily};
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
    const { intent, sdsType, disabled } = props;
    const spacings = getSpaces(props);
    const borders = getBorders(props);
    const corners = getCorners(props);

    return css`
      margin-bottom: ${spacings?.l}px;
      margin-right: ${spacings?.m}px;
      min-width: 160px;
      display: block;

      .MuiInputBase-inputSizeSmall {
        padding: ${spacings?.xs}px ${spacings?.l}px;
        height: 34px;
        box-sizing: border-box;
        background-color: #fff;

        .MuiOutlinedInput-notchedOutline {
          border-radius: ${corners?.m}px;
          border: ${borders?.gray[400]};
        }
      }

      .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
        border: ${borders?.gray[500]};
      }

      .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border: ${borders?.primary[400]};
      }

      ${sdsType === "textArea" && textArea(props)}
      ${intent === "error" && error(props)}
      ${intent === "warning" && warning(props)}
      ${disabled && disabledStyled(props)}
    `;
  }}
`;
