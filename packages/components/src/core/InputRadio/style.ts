import {
  FormControlLabel,
  Radio as RawRadio,
  radioClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import { focusVisibleA11yStyle } from "src/core/styles/common/mixins/a11y";
import {
  CommonThemeProps,
  SDSPalette,
  fontBodyXs,
  fontBodyXxs,
  getBorders,
  getIconSizes,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

export interface RadioExtraProps extends CommonThemeProps {
  intent?: "default" | "negative" | "notice" | "positive";
  disabled?: boolean;
}

const intentToColor = {
  default: "base",
  negative: "negative",
  notice: "notice",
  positive: "positive",
};

export const StyledRadioDot = styled("span")`
  ${(props: RadioExtraProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      height: 6px;
      width: 6px;
      border-radius: 50%;
      background-color: ${semanticColors?.base?.ornamentPrimaryInverse};
    `;
  }}
`;

export const StyledRadioDefaultIcon = styled("span")`
  ${(props: RadioExtraProps) => {
    const { intent = "default" } = props;

    const iconSizes = getIconSizes(props);
    const borders = getBorders(props);

    const borderColor = intentToColor[intent] as keyof SDSPalette;

    return `
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;
      border: ${borders?.[borderColor]?.default};
      border-radius: 50%;
    `;
  }}
`;

export const StyledRadioCheckedIcon = styled("div")`
  ${(props: RadioExtraProps) => {
    const iconSizes = getIconSizes(props);
    const semanticColors = getSemanticColors(props);

    return `
      display: flex;
      align-items: center;
      justify-content: center;
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;
      border-radius: 50%;
      background-color: ${semanticColors?.accent?.fillPrimary};
    `;
  }}
`;

export const StyledRadioButton = styled(RawRadio)`
  ${(props: RadioExtraProps) => {
    const spaces = getSpaces(props);

    return `
      &.${radioClasses.root} {
        ${focusVisibleA11yStyle(props)}
        margin: 0 ${spaces?.s}px 0 0;
        padding: 0;
      }
    `;
  }}
`;

export const StyledLabelContainer = styled("span")`
  display: flex;
  justify-content: start;
  flex-direction: column;
`;

export const StyledRadioLabel = styled("span")`
  ${fontBodyXs}

  ${(props: RadioExtraProps) => {
    const spaces = getSpaces(props);

    return `
      margin-top: -${spaces?.xxxs}px !important;
    `;
  }}
`;

export const StyledRadioCaption = styled("span")`
  ${fontBodyXxs}

  ${(props: RadioExtraProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
    `;
  }}
`;

const disabledStyles = (props: RadioExtraProps) => {
  const semanticColors = getSemanticColors(props);

  return `
    user-select: none;

    ${StyledRadioCaption} {
      color: ${semanticColors?.base?.textDisabled};
    }

    ${StyledRadioDefaultIcon} {
      border: 1px solid ${semanticColors?.base?.borderPrimaryDisabled};
    }

    ${StyledRadioCheckedIcon} {
      background-color: ${semanticColors?.base?.ornamentDisabled};
    }

    &:hover, &:active {
      ${StyledRadioDefaultIcon} {
        border: 1px solid ${semanticColors?.base?.borderPrimaryDisabled};
      }

      ${StyledRadioCheckedIcon} {
        background-color: ${semanticColors?.base?.ornamentDisabled};
      }
    }
  `;
};

export const StyledFormControlLabel = styled(FormControlLabel)`
  ${(props: RadioExtraProps) => {
    const { disabled } = props;

    const semanticColors = getSemanticColors(props);

    return `
      align-items: start;
      margin-bottom: 0;
      margin-left: 0;
      margin-right: 0;
      width: fit-content;

      &:hover {
        ${StyledRadioDefaultIcon} {
          border: 1px solid ${semanticColors?.base?.borderPrimaryInteraction};  
          background-color: ${disabled ? "transparent" : semanticColors?.base?.fillPrimaryInteraction};
        }

        ${StyledRadioCheckedIcon} {
          background-color: ${semanticColors?.accent?.fillInteraction};
        }
      }

      &:active {
        ${StyledRadioDefaultIcon} {
          border: 1px solid ${semanticColors?.base?.borderPrimaryInteraction};
        }

        ${StyledRadioCheckedIcon} {
          background-color: ${semanticColors?.accent?.fillPressed};
        }
      }

      ${disabled && disabledStyles(props)}
    `;
  }}
`;
