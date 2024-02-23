import { Checkbox as RawCheckbox, checkboxClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { focusVisibleA11yStyle } from "../styles/common/mixins/a11y";
import {
  CommonThemeProps,
  getIconSizes,
  getSemanticComponentColors,
  getSpaces,
} from "../styles/common/selectors/theme";
import { SemanticComponentColors } from "../styles";

export interface CheckboxExtraProps extends CommonThemeProps {
  intent?: "default" | "error" | "warning";
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
        padding-right: ${spaces?.s}px;
      }

      .MuiSvgIcon-root {
        height: ${iconSizes?.s.height}px;
        width: ${iconSizes?.s.width}px;
      }
    `;
  }}
`;
