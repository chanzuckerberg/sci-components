import {
  FormControlLabel,
  Checkbox as RawCheckbox,
  checkboxClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import { focusVisibleA11yStyle } from "src/core/styles/common/mixins/a11y";
import {
  CommonThemeProps,
  getBorders,
  getIconSizes,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import { SDSPalette, fontBodyXs, fontBodyXxs } from "../styles";
import Icon from "../Icon";

export interface CheckboxExtraProps extends CommonThemeProps {
  intent?: "default" | "negative" | "notice" | "positive";
  disabled?: boolean;
}

const intentToColor = {
  default: "base",
  negative: "negative",
  notice: "notice",
  positive: "positive",
};

export const StyledIcon = styled(Icon)`
  ${(props: CheckboxExtraProps) => {
    const iconSizes = getIconSizes(props);

    return `
      height: ${iconSizes?.xs.height}px;
      width: ${iconSizes?.xs.width}px;
    `;
  }}
`;

export const StyledCheckboxDefaultIcon = styled("span")`
  ${(props: CheckboxExtraProps) => {
    const { intent = "default" } = props;

    const iconSizes = getIconSizes(props);
    const borders = getBorders(props);

    const borderColor = intentToColor[intent] as keyof SDSPalette;

    return `
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;
      border: ${borders?.[borderColor]?.default};
      border-radius: 2px;
    `;
  }}
`;

export const StyledCheckboxCheckedIcon = styled("div")`
  ${(props: CheckboxExtraProps) => {
    const iconSizes = getIconSizes(props);
    const semanticColors = getSemanticColors(props);

    return `
      display: flex;
      align-items: center;
      justify-content: center;
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;
      border-radius: 2px;
      background-color: ${semanticColors?.accent?.ornament};

      ${StyledIcon} {
        fill: ${semanticColors?.base?.ornamentPrimaryInverse};
      }
    `;
  }}
`;

export const StyledCheckbox = styled(RawCheckbox)`
  ${(props: CheckboxExtraProps) => {
    const spaces = getSpaces(props);

    return `
      &.${checkboxClasses.root} {
        ${focusVisibleA11yStyle(props)}
        
        padding: 0;
        margin-right: ${spaces?.s}px;
        border-radius: 0;

        &:hover {
          background-color: transparent;
        }
      }
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
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
    `;
  }}
`;

const disabledStyles = (props: CheckboxExtraProps) => {
  const semanticColors = getSemanticColors(props);
  const borders = getBorders(props);

  return `
    user-select: none;

    ${StyledCheckboxDefaultIcon} {
      border: ${borders?.base?.disabled};
    }

    ${StyledCheckboxCheckedIcon} {
      background-color: ${semanticColors?.base?.ornamentDisabled};
    }

    ${StyledCheckboxCaption} {
      color: ${semanticColors?.base?.textDisabled};
    }

    &:hover, &:active {
      ${StyledCheckboxDefaultIcon} {
        border: ${borders?.base?.disabled};
      }

      ${StyledCheckboxCheckedIcon} {
        background-color: ${semanticColors?.base?.ornamentDisabled};
      }
    }
  `;
};

export const StyledFormControlLabel = styled(FormControlLabel)`
  ${(props: CheckboxExtraProps) => {
    const { disabled } = props;

    const semanticColors = getSemanticColors(props);
    const borders = getBorders(props);

    return `
      align-items: start;
      margin-bottom: 0;
      margin-left: 0;
      margin-right: 0;
      width: fit-content;

      &:hover {
        ${StyledCheckboxDefaultIcon} {
          border: ${borders?.base?.hover};
          background-color: ${disabled ? "transparent" : semanticColors?.base?.fillInteraction};
        }

        ${StyledCheckboxCheckedIcon} {
          background-color: ${semanticColors?.accent?.fillHover};
        }
      }

      &:active {
        ${StyledCheckboxDefaultIcon} {
          border: ${borders?.base?.pressed};
        }

        ${StyledCheckboxCheckedIcon} {
          background-color: ${semanticColors?.accent?.fillPressed};
        }
      }

      ${disabled && disabledStyles(props)}
    `;
  }}
`;
