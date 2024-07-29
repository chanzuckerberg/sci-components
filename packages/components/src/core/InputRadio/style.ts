import {
  FormControlLabel,
  Radio as RawRadio,
  radioClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { focusVisibleA11yStyle } from "src/core/styles/common/mixins/a11y";
import {
  CommonThemeProps,
  SDSPalette,
  fontBodyXs,
  fontBodyXxs,
  getIconSizes,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

export interface RadioExtraProps extends CommonThemeProps {
  intent?: "default" | "error" | "warning";
  disabled?: boolean;
}

export const StyledRadioButton = styled(RawRadio)`
  ${(props: RadioExtraProps) => {
    const { intent = "default" } = props;

    const spaces = getSpaces(props);
    const iconSizes = getIconSizes(props);

    const semanticColors = getSemanticColors(props);

    const intentToColor = {
      default: "base",
      error: "negative",
      warning: "notice",
    };

    const radioColor = intentToColor[intent] as keyof SDSPalette;

    return `
      color: ${semanticColors?.[radioColor]?.border};

      &:hover {
        color: ${semanticColors?.base?.borderHover};
        background-color: transparent;
      }

      &.${radioClasses.disabled} {
        color: ${semanticColors?.base?.borderDisabled};
      }

      &.${radioClasses.checked} {
        color: ${semanticColors?.accent?.border};

        &:hover {
          color: ${semanticColors?.accent?.borderHover};
          background-color: transparent;
        }

        &.${radioClasses.disabled} {
          color: ${semanticColors?.base?.borderDisabled};
        }
      }

      &.${radioClasses.root} {
        ${focusVisibleA11yStyle(props)}
        margin: 0 ${spaces?.s}px 0 0;
        padding: 0;
      }

      .MuiSvgIcon-root {
        height: ${iconSizes?.s.height}px;
        width: ${iconSizes?.s.width}px;
      }
    `;
  }}
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      align-items: start;
      margin-bottom: ${spaces?.l}px;
      margin-left: 0;
      margin-right: 0;
      width: fit-content;
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
    const { disabled } = props;
    const semanticColors = getSemanticColors(props);

    return `
      color: ${disabled ? semanticColors?.base?.textDisabled : semanticColors?.base?.textSecondary};
    `;
  }}
`;
