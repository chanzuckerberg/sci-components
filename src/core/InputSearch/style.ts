import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { TextField } from "@material-ui/core";
import {
  fontBodyM,
  getBorders,
  getColors,
  getCorners,
  getSpaces,
  getTypography,
  Props,
} from "../styles";

export interface ExtraProps extends Props {
  disabled?: boolean;
  intent?: "default" | "error" | "warning";
  sdsStyle?: "rounded" | "square";
  sdsStage?: "default" | "userInput";
  handleSubmit: (event: React.SyntheticEvent) => void;
}

const sdsPropNames = ["sdsStyle", "sdsStage", "intent", "handleSubmit"];

const rounded = (props: ExtraProps): SerializedStyles => {
  const corners = getCorners(props);

  return css`
    .MuiOutlinedInput-notchedOutline {
      border-radius: ${corners?.l}px;
    }
  `;
};

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
  const colors = getColors(props);

  return css`
    .Mui-disabled {
      .MuiOutlinedInput-notchedOutline {
        border: ${borders?.gray[300]};
      }

      .MuiInputAdornment-root svg {
        color: ${colors?.gray[300]};
      }

      &:hover .MuiOutlinedInput-notchedOutline {
        border: ${borders?.gray[300]};
      }
    }
  `;
};

export const StyledLabel = styled.label`
  ${fontBodyM}
  ${(props) => {
    const typography = getTypography(props);
    const spacings = getSpaces(props);
    return `
      font-family: ${typography?.fontFamily};
      margin-bottom: ${spacings?.xxs}px;
      position: absolute; 
      overflow: hidden; 
      clip: rect(0 0 0 0); 
      height: 1px; width: 1px; 
      margin: -1px; padding: 0; border: 0; 
    `;
  }}
`;

export const StyledSearchBase = styled(TextField, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  ${(props: ExtraProps) => {
    const { intent, disabled, sdsStyle } = props;
    const spacings = getSpaces(props);
    const borders = getBorders(props);
    const corners = getCorners(props);
    const colors = getColors(props);

    return css`
      margin-top: ${spacings?.m}px;
      margin-bottom: ${spacings?.m}px;
      margin-right: ${spacings?.xl}px;
      min-width: 120px;
      display: block;
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
      .MuiOutlinedInput-root.Mui-focused {
        .MuiOutlinedInput-notchedOutline {
          border: ${borders?.primary[400]};
        }

        .MuiInputAdornment-root svg {
          color: ${colors?.primary[400]};
        }
      }

      ${sdsStyle === "rounded" && rounded(props)}
      ${intent === "error" && error(props)}
      ${intent === "warning" && warning(props)}
      ${disabled && disabledStyled(props)}
    `;
  }}
`;
