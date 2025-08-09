import styled from "@emotion/styled";
import { Drawer, drawerClasses } from "@mui/material";
import {
  CommonThemeProps,
  getSemanticColors,
  getShadows,
  getSpaces,
} from "../styles";
import { css, SerializedStyles } from "@emotion/react";
import {
  PANEL_BASIC_MIN_WIDTH_PX,
  PANEL_OVERLAY_MIN_WIDTH_PX,
  PanelProps,
} from "./Panel.types";

type PanelExtraProps = PanelProps & CommonThemeProps;

const doNotForwardProps = [
  "sdsType",
  "position",
  "width",
  "HeaderComponent",
  "onClick",
  "disableScrollLock",
  "closeButtonOnClick",
  "CloseButtonComponent",
  "isBackdropClickEnabled",
  "slotProps",
];

const basicPanelStyles = (props: PanelExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);
  const spaces = getSpaces(props);

  return css`
    .${drawerClasses.paper} {
      background-color: ${semanticColors?.base?.backgroundPrimary};
      padding: ${spaces?.l}px;
      min-width: ${PANEL_BASIC_MIN_WIDTH_PX}px;
      min-height: ${PANEL_BASIC_MIN_WIDTH_PX}px;
    }
  `;
};

const overlayPanelStyles = (props: PanelExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);
  const spaces = getSpaces(props);
  const shadows = getShadows(props);

  return css`
    /**
     * (masoudmanson): This prevents the Panel from taking up the full width of the screen,
     * allowing the ToggleButton to be clicked to close the Panel. Due to an issue with
     * MUI v5, the following styles cause the Panel to generate accessibility (a11y) errors.
     * In the meantime, we are ignoring the a11y errors within Storybook.
     */
    width: fit-content;
    height: fit-content;
    div[data-testid="sentinelStart"],
    div[data-testid="sentinelEnd"] {
      width: fit-content;
    }

    .${drawerClasses.paper} {
      background-color: ${semanticColors?.base?.backgroundPrimary};
      padding: 0 ${spaces?.xl}px ${spaces?.xl}px;
      min-width: ${PANEL_OVERLAY_MIN_WIDTH_PX}px;
      min-height: ${PANEL_OVERLAY_MIN_WIDTH_PX}px;
      box-shadow: ${shadows?.l};
      background-image: none;
    }
  `;
};

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: PanelExtraProps) => {
    const { sdsType = "basic", anchor = "left", width } = props;

    const widthString = typeof width === "number" ? `${width}px` : width;

    const panelWidth = anchor !== "bottom" ? widthString : "100%";
    const panelHeight = anchor !== "bottom" ? "100%" : widthString;

    return css`
      .${drawerClasses.paper} {
        height: ${panelHeight};
        width: ${panelWidth};
      }

      ${sdsType === "basic" && basicPanelStyles(props)}
      ${sdsType === "overlay" && overlayPanelStyles(props)}
    `;
  }}
`;

export const StyledHeaderComponent = styled("div")`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return css`
      position: sticky;
      top: 0;
      z-index: 1000;
      background-color: ${semanticColors?.base?.backgroundPrimary};
      padding-bottom: ${spaces?.xl}px;
      padding-top: ${spaces?.xl}px;
      display: flex;
      justify-content: space-between;
      align-items: start;
    `;
  }}
`;
