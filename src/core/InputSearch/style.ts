import { css, SerializedStyles } from "@emotion/react";
import {
  inputAdornmentClasses,
  inputBaseClasses,
  outlinedInputClasses,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyM,
  getBorders,
  getColors,
  getCorners,
  getSpaces,
  getTypography,
} from "../styles";

export interface InputSearchExtraProps extends CommonThemeProps {
  disabled?: boolean;
  intent?: "default" | "error" | "warning";
  sdsStyle?: "rounded" | "square";
  sdsStage?: "default" | "userInput";
}

const sdsPropNames = ["sdsStyle", "sdsStage", "intent", "handleSubmit"];

const rounded = (props: InputSearchExtraProps): SerializedStyles => {
  const corners = getCorners(props);
  const borders = getBorders(props);

  return css`
    .${outlinedInputClasses.notchedOutline} {
      border-radius: ${corners?.l}px;
      border: ${borders?.gray[400]};
    }
  `;
};

const error = (props: InputSearchExtraProps): SerializedStyles => {
  const borders = getBorders(props);

  return css`
    .${outlinedInputClasses.notchedOutline} {
      border: ${borders?.error[400]};
    }
  `;
};

const warning = (props: InputSearchExtraProps): SerializedStyles => {
  const borders = getBorders(props);

  return css`
    .${outlinedInputClasses.notchedOutline} {
      border: ${borders?.warning[400]};
    }
  `;
};

const disabledStyled = (props: InputSearchExtraProps): SerializedStyles => {
  const borders = getBorders(props);
  const colors = getColors(props);

  return css`
    .Mui-disabled {
      .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.gray[300]};
      }

      .MuiInputAdornment-root svg {
        color: ${colors?.gray[300]};
      }

      &:hover .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.gray[300]};
      }
    }
  `;
};

export const StyledLabel = styled("label")`
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
      height: 1px;
      width: 1px;
      margin: -1px; padding: 0; border: 0;
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
    const spacings = getSpaces(props);
    const borders = getBorders(props);
    const colors = getColors(props);

    return css`
      margin-top: ${spacings?.m}px;
      margin-bottom: ${spacings?.m}px;
      margin-right: ${spacings?.xl}px;
      min-width: 120px;
      display: block;

      .${outlinedInputClasses.root} {
        .${outlinedInputClasses.notchedOutline} {
          border: ${borders?.gray[400]};
        }
      }

      .${inputBaseClasses.inputSizeSmall} {
        padding: ${spacings?.xs}px ${spacings?.l}px;
        height: 34px;
        box-sizing: border-box;
        background-color: #fff;
      }

      .${outlinedInputClasses.root}:hover
        .${outlinedInputClasses.notchedOutline} {
        border: ${borders?.gray[500]};
      }

      .${outlinedInputClasses.root}.Mui-focused {
        .${outlinedInputClasses.notchedOutline} {
          border: ${borders?.primary[400]};
        }

        .${inputAdornmentClasses.root} svg {
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
