import { ToggleButtonGroup, toggleButtonClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { focusVisibleA11yStyle } from "src/core/styles/common/mixins/a11y";
import {
  CommonThemeProps,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

const doNotForwardProps = ["buttonDefinition"];

export const StyledSegmentedControl = styled(ToggleButtonGroup, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      .${toggleButtonClasses.root}.${toggleButtonClasses.selected} {
        /* the number 47 is the opacity of the color, which is equal to 28% */
        background-color: ${semanticColors?.base?.fillOpen}47;
        color: ${semanticColors?.accent?.icon};
        border-color: ${semanticColors?.base?.border};

        &:hover {
          /* the number 47 is the opacity of the color, which is equal to 28% */
          background-color: ${semanticColors?.base?.fillHover}47;
        }
      }

      .${toggleButtonClasses.root} {
        ${focusVisibleA11yStyle(props)}
        border-color: ${semanticColors?.base?.border};
        line-height: 0px;
        color: ${semanticColors?.base?.iconPrimaryHover};
        padding: ${(spaces?.xs ?? 6) - 1}px ${spaces?.l}px;

        &:hover {
          border-color: ${semanticColors?.base?.border};
          /* the number 47 is the opacity of the color, which is equal to 28% */
          background-color: ${semanticColors?.base?.fillHover}47;
        }
      }
    `;
  }}
`;
