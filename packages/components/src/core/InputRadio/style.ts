import { Radio as RawRadio, radioClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { focusVisibleA11yStyle } from "../styles/common/mixins/a11y";
import {
  CommonThemeProps,
  SemanticComponentColors,
  getIconSizes,
  getSemanticComponentColors,
  getSpaces,
} from "../styles";

export interface RadioExtraProps extends CommonThemeProps {
  intent?: "default" | "error" | "warning";
}

export const StyledRadioButton = styled(RawRadio)`
  ${(props: RadioExtraProps) => {
    const { intent = "default" } = props;

    const spaces = getSpaces(props);
    const iconSizes = getIconSizes(props);

    const semanticComponentColors = getSemanticComponentColors(props);

    const intentToColor = {
      default: "base",
      error: "negative",
      warning: "notice",
    };

    const radioColor = intentToColor[intent] as keyof SemanticComponentColors;

    return `
    color: ${semanticComponentColors?.[radioColor]?.border};

      &:hover {
        color: ${semanticComponentColors?.base?.borderHover};
        background-color: transparent;
      }

      &.${radioClasses.disabled} {
        color: ${semanticComponentColors?.base?.borderDisabled};
      }

      &.${radioClasses.checked} {
        color: ${semanticComponentColors?.accent?.border};

        &:hover {
          color: ${semanticComponentColors?.accent?.borderHover};
          background-color: transparent;
        }

        &.${radioClasses.disabled} {
          color: ${semanticComponentColors?.accent?.borderDisabled};
        }
      }

      &.${radioClasses.root} {
        ${focusVisibleA11yStyle()}
        padding: 0;
        padding-right: ${spaces?.s}px;
      }

      .MuiSvgIcon-root {
        height: ${iconSizes?.s.height}px;
        width: ${iconSizes?.s.width}px;
      }
    `;
  }}
`;
