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
  getSemanticComponentColors,
  getSemanticTextColors,
  getSpaces,
} from "src/core/styles";
import { SemanticComponentColors, fontBodyXs, fontBodyXxs } from "../styles";

export interface CheckboxExtraProps extends CommonThemeProps {
  intent?: "default" | "error" | "warning";
  disabled?: boolean;
}

export const StyledCheckbox = styled(RawCheckbox)`
  ${(props: CheckboxExtraProps) => {
    const { intent = "default" } = props;

    const iconSizes = getIconSizes(props);
    const spaces = getSpaces(props);
    const semanticComponentColors = getSemanticComponentColors(props);

    const intentToColor = {
      default: "base",
      error: "negative",
      warning: "notice",
    };

    const checkboxColor = intentToColor[
      intent
    ] as keyof SemanticComponentColors;

    return `
      color: ${semanticComponentColors?.[checkboxColor]?.border};

      &:hover {
        color: ${semanticComponentColors?.base?.borderHover};
        background-color: transparent;
      }

      &.${checkboxClasses.disabled} {
        color: ${semanticComponentColors?.base?.borderDisabled};
      }

      &.${checkboxClasses.checked} {
        color: ${semanticComponentColors?.accent?.border};

        &:hover {
          color: ${semanticComponentColors?.accent?.borderHover};
          background-color: transparent;
        }

        &.${checkboxClasses.disabled} {
          color: ${semanticComponentColors?.accent?.borderDisabled};
        }
      }

      &.${checkboxClasses.root} {
        ${focusVisibleA11yStyle()}
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
    const semanticTextColors = getSemanticTextColors(props);

    return `
      color: ${disabled ? semanticTextColors?.base?.disabled : semanticTextColors?.base?.secondary};
    `;
  }}
`;
