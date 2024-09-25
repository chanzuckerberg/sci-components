import styled from "@emotion/styled";
import { Drawer, drawerClasses } from "@mui/material";
import {
  CommonThemeProps,
  getSemanticColors,
  getShadows,
  getSpaces,
} from "../styles";
import { PanelProps } from ".";
import { css, SerializedStyles } from "@emotion/react";

const doNotForwardProps = [
  "sdsType",
  "position",
  "width",
  "headerComponent",
  "onClick",
  "disableScrollLock",
];

type PanelExtraProps = PanelProps & CommonThemeProps;

const BasicPanel = (props: PanelExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);
  const spaces = getSpaces(props);

  return css`
    .${drawerClasses.paper} {
      background-color: ${semanticColors?.base?.surfacePrimary};
      padding: ${spaces?.l}px;
      min-width: 240px;
      min-height: 240px;
    }
  `;
};

const OverlayPanel = (props: PanelExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);
  const spaces = getSpaces(props);
  const shadows = getShadows(props);

  return css`
    .${drawerClasses.paper} {
      background-color: ${semanticColors?.base?.surfacePrimary};
      padding: ${spaces?.xl}px;
      min-width: 320px;
      min-height: 320px;
      box-shadow: ${shadows?.l};
      background-image: none;
    }
  `;
};

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: PanelExtraProps) => {
    const { sdsType, position, width } = props;
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    const WidthString = typeof width === "number" ? `${width}px` : width;

    const PanelWidth = position !== "bottom" ? WidthString : "100%";
    const PanelHeight = position !== "bottom" ? "100%" : WidthString;

    return css`
      .${drawerClasses.root} {
        border-color: ${semanticColors?.base?.divider};
        border-width: ${spaces?.xxxs}px;
        height: ${PanelHeight};
        width: ${PanelWidth};
      }

      .${drawerClasses.paper} {
        height: ${PanelHeight};
        width: ${PanelWidth};
      }

      ${sdsType === "basic" && BasicPanel(props)}
      ${sdsType === "overlay" && OverlayPanel(props)}
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
