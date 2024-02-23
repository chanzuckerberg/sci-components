import { FormControlLabel, styled } from "@mui/material";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontBodyXxs,
  getIconSizes,
  getSemanticTextColors,
  getSpaces,
} from "src/core/styles";

export interface FormControlLabelExtraProps extends CommonThemeProps {
  disabled?: boolean;
}

export const StyledFormControlLabelWrapper = styled("label")`
  ${focusVisibleA11yStyle()}
  ${(props: FormControlLabelExtraProps) => {
    const { disabled } = props;

    return `
      cursor: ${disabled ? "default" : "pointer"};
      display: inline-flex;
      flex-direction: column;
    `;
  }}
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  margin: 0;
`;

export const StyledFormControlCaption = styled("span")`
  ${fontBodyXxs}

  ${(props: FormControlLabelExtraProps) => {
    const { disabled } = props;

    const semanticTextColors = getSemanticTextColors(props);
    const iconSizes = getIconSizes(props);
    const spacings = getSpaces(props);

    return `
      color: ${disabled ? semanticTextColors?.base?.disabled : semanticTextColors?.base?.secondary};
      margin-left: ${(iconSizes?.s?.width ?? 16) + (spacings?.s ?? 8)}px;
    `;
  }}
`;
