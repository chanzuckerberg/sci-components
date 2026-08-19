import styled from "@emotion/styled";
import { backdropClasses, Drawer, drawerClasses } from "@mui/material";
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
     * (masoudmanson): The overlay Panel floats over a page that stays usable, so
     * the control that opened it has to remain clickable. Passing pointer events
     * through the modal root does that while leaving the root at its full size,
     * which matters because MUI's Slide measures the root to work out how far the
     * Panel has to travel: a root shrunk to fit its content collapses to a 0x0
     * box in the top left corner, and a Panel anchored right or bottom then slides
     * in from the wrong edge.
     */
    pointer-events: none;

    .${drawerClasses.paper}, .${backdropClasses.root} {
      pointer-events: auto;
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
      padding-bottom: ${spaces?.m}px;
      margin-bottom: ${spaces?.m}px;
      padding-top: ${spaces?.xl}px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: ${spaces?.xl}px;
        transform: translateY(100%);
        background: linear-gradient(
          to bottom,
          ${semanticColors?.base?.backgroundPrimary},
          transparent
        );
        pointer-events: none;
      }
    `;
  }}
`;
