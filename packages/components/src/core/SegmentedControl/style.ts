import { ToggleButtonGroup, toggleButtonClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  getSemanticComponentColors,
  getSpaces,
} from "../styles";

const doNotForwardProps = ["buttonDefinition"];

export const StyledSegmentedControl = styled(ToggleButtonGroup, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticComponentColors = getSemanticComponentColors(props);

    return `
    .${toggleButtonClasses.root}.${toggleButtonClasses.selected} {
        background-color: ${semanticComponentColors?.base?.fillOpen};
        color: ${semanticComponentColors?.accent?.icon};
        border-color: ${semanticComponentColors?.base?.border};

        &:hover {
          background-color: ${semanticComponentColors?.base?.fillHover};
        }
      }

      .${toggleButtonClasses.root} {
        border-color: ${semanticComponentColors?.base?.border};
        line-height: 0px;
        color: ${semanticComponentColors?.base?.iconHover};
        padding: ${(spaces?.xs ?? 6) - 1}px ${spaces?.l}px;

        &:hover {
          border-color: ${semanticComponentColors?.base?.border};
          background-color: ${semanticComponentColors?.base?.fillHover};
        }
      }
    `;
  }}
`;
