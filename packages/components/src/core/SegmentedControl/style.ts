import { ToggleButtonGroup, toggleButtonClasses } from "@mui/material";
import styled from "@emotion/styled";
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
        background-color: ${semanticColors?.base?.fillOpen};
        color: ${semanticColors?.accent?.iconSelected};
        border-color: ${semanticColors?.base?.border};

        &:hover {
          background-color: ${semanticColors?.base?.fillHover};
        }
      }

      .${toggleButtonClasses.root} {
        ${focusVisibleA11yStyle(props)}
        background-color: ${semanticColors?.base?.fillPrimary};
        border-color: ${semanticColors?.base?.border};
        line-height: 0px;
        color: ${semanticColors?.base?.iconSecondary};
        padding: ${(spaces?.xs ?? 6) - 1}px ${spaces?.l}px;

        &:hover {
          border-color: ${semanticColors?.base?.border};
          background-color: ${semanticColors?.base?.fillHover};
        }
      }
    `;
  }}
`;
