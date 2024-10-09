import styled from "@emotion/styled";
import { Drawer, drawerClasses } from "@mui/material";
import {
  CommonThemeProps,
  getSemanticColors,
  getShadows,
  getSpaces,
} from "../styles";
import {
  PANEL_BASIC_MIN_WIDTH_PX,
  PANEL_OVERLAY_MIN_WIDTH_PX,
  PanelProps,
} from ".";
import { css, SerializedStyles } from "@emotion/react";

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
];

const basicPanelStyles = (props: PanelExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);
  const spaces = getSpaces(props);

  return css`
    .${drawerClasses.paper} {
      background-color: ${semanticColors?.base?.surfacePrimary};
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
    .${drawerClasses.paper} {
      background-color: ${semanticColors?.base?.surfacePrimary};
      padding: ${spaces?.xl}px;
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
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    const widthString = typeof width === "number" ? `${width}px` : width;

    const panelWidth = anchor !== "bottom" ? widthString : "100%";
    const panelHeight = anchor !== "bottom" ? "100%" : widthString;

    return css`
      .${drawerClasses.root} {
        border-color: ${semanticColors?.base?.divider};
        border-width: ${spaces?.xxxs}px;
        height: ${panelHeight};
        width: ${panelWidth};
      }

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

    return css`
      margin-bottom: ${spaces?.xxl}px;
      display: flex;
      justify-content: space-between;
      align-items: start;
    `;
  }}
`;
