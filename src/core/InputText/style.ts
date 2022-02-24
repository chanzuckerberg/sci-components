import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { TextField } from "@material-ui/core";
import {
  fontBody,
  getBorders,
  getCorners,
  getSpaces,
  getTypography,
  Props,
} from "../styles";

export interface ExtraProps extends Props {
  disabled?: boolean;
  intent?: "default" | "error" | "warning";
  sdsType?: "textField" | "textArea";
  sdsStage?: "default" | "userInput";
  hideLabel?: boolean;
}

const sdsPropNames = ["sdsStyle", "sdsStage", "sdsType", "intent", "hideLabel"];

const fontBodyM = fontBody("m");

const error = (props: ExtraProps): SerializedStyles => {
  const borders = getBorders(props);

  return css`
    .MuiOutlinedInput-notchedOutline {
      border: ${borders?.error[400]};
    }
  `;
};

const warning = (props: ExtraProps): SerializedStyles => {
  const borders = getBorders(props);

  return css`
    .MuiOutlinedInput-notchedOutline {
      border: ${borders?.warning[400]};
    }
  `;
};

const disabledStyled = (props: ExtraProps): SerializedStyles => {
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

const textArea = (props: ExtraProps): SerializedStyles => {
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

export const StyledLabel = styled.label`
  display: block;
  ${fontBodyM}

  ${(props) => {
    const typography = getTypography(props);

    return `
      font-family: ${typography?.fontFamily};
    `;
  }}
`;

export const StyledInputBase = styled(TextField, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  ${(props: ExtraProps) => {
    const { intent, sdsType, disabled } = props;
    const spacings = getSpaces(props);
    const borders = getBorders(props);
    const corners = getCorners(props);

    return css`
      margin-bottom: ${spacings?.l}px;
      margin-right: ${spacings?.m}px;
      min-width: 160px;

      .MuiOutlinedInput-inputMarginDense {
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
