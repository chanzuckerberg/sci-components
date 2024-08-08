import {
  FormControlLabel,
  Checkbox as RawCheckbox,
  checkboxClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { focusVisibleA11yStyle } from "src/core/styles/common/mixins/a11y";
import {
  CommonThemeProps,
  getIconSizes,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import { SDSPalette, fontBodyXs, fontBodyXxs } from "../styles";

export interface CheckboxExtraProps extends CommonThemeProps {
  intent?: "default" | "error" | "warning";
  disabled?: boolean;
}

export const StyledCheckbox = styled(RawCheckbox)`
  ${(props: CheckboxExtraProps) => {
    const { intent = "default" } = props;

    const iconSizes = getIconSizes(props);
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    const intentToColor = {
      default: "base",
      error: "negative",
      warning: "notice",
    };

    const checkboxColor = intentToColor[intent] as keyof SDSPalette;

    return `
      color: ${semanticColors?.[checkboxColor]?.border};

      &:hover {
        color: ${semanticColors?.base?.borderHover};
        background-color: transparent;
      }

      &.${checkboxClasses.disabled} {
        color: ${semanticColors?.base?.borderDisabled};
      }

      &.${checkboxClasses.checked} {
        color: ${semanticColors?.accent?.border};

        &:hover {
          color: ${semanticColors?.accent?.borderHover};
          background-color: transparent;
        }

        &.${checkboxClasses.disabled} {
          color: ${semanticColors?.base?.borderDisabled};
        }
      }

      &.${checkboxClasses.root} {
        ${focusVisibleA11yStyle(props)}
        padding: 0;
        margin-right: ${spaces?.s}px;
        border-radius: 0;
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

export const StyledCheckboxLabel = styled("span")`
  ${fontBodyXs}

  ${(props: CheckboxExtraProps) => {
    const spaces = getSpaces(props);

    return `
      margin-top: -${spaces?.xxxs}px !important;
    `;
  }}
`;

export const StyledCheckboxCaption = styled("span")`
  ${fontBodyXxs}

  ${(props: CheckboxExtraProps) => {
    const { disabled } = props;
    const semanticColors = getSemanticColors(props);

    return `
      color: ${disabled ? semanticColors?.base?.textDisabled : semanticColors?.base?.textSecondary};
    `;
  }}
`;
