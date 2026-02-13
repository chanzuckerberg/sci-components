import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonProps,
  toggleButtonClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import { focusVisibleA11yStyle } from "src/core/styles/common/mixins/a11y";
import {
  CommonThemeProps,
  fontBodyMediumS,
  getCorners,
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
    const corners = getCorners(props);

    return `
      box-shadow: inset 0 0 0 1px ${semanticColors?.base?.borderPrimary};
      border-radius: ${corners?.l}px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 1px;
      width: fit-content;
      padding: ${spaces?.xxxs}px;

      &:hover {
        box-shadow: inset 0 0 0 1px ${semanticColors?.base?.borderPrimaryInteraction};
      }

      .${toggleButtonClasses.root}.${toggleButtonClasses.disabled} {
        border-color: transparent;
      }

      .${toggleButtonClasses.root}.${toggleButtonClasses.selected} {
        background-color: ${semanticColors?.base?.fillPrimaryInteraction};
        color: ${semanticColors?.accent?.foregroundActive};
        border-color: ${semanticColors?.base?.borderPrimary};

        &:hover {
          background-color: ${semanticColors?.base?.fillPrimaryInteraction};
          color: ${semanticColors?.base?.ornamentSecondaryInteraction};
        }
      }

      .${toggleButtonClasses.root} {
        ${focusVisibleA11yStyle(props)}
        background-color: transparent;
        border: none;
        color: ${semanticColors?.base?.ornamentSecondary};
        padding: ${spaces?.xxs}px ${spaces?.m}px;
        border-radius: ${corners?.m}px;
        margin: 0;

        &:hover {
          border-color: ${semanticColors?.base?.borderPrimary};
          background-color: ${semanticColors?.base?.fillPrimaryInteraction};
          color: ${semanticColors?.base?.ornamentSecondaryInteraction};
        }
      }
    `;
  }}
`;

export const StyledToggleButton = styled(ToggleButton, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: ToggleButtonProps & CommonThemeProps) => {
    const { disabled } = props;

    const semanticColors = getSemanticColors(props);

    return `
      border: none !important;
      svg {
        color: ${disabled ? semanticColors?.base?.ornamentDisabled : "currentColor"};
      }
    `;
  }}
`;

export const StyledToggleButtonIcon = styled("div")`
  line-height: 0px;
`;

export const StyledToggleButtonLabel = styled("div")`
  ${fontBodyMediumS}
  white-space: nowrap;
  line-height: 16px !important;
`;
