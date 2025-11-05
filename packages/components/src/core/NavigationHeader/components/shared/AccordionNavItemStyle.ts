import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  CommonThemeProps,
  fontBodyXs,
  fontBodySemiboldS,
  fontBodyMediumS,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

const doNotForwardProps = [
  "hasInvertedStyle",
  "hasCaption",
  "iconSize",
  "hasDetails",
  "hasIcon",
];

export const StyledDrawerNavItem = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(
    props: CommonThemeProps & {
      hasInvertedStyle?: boolean;
      hasCaption?: boolean;
    }
  ) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    const textColor = props.hasInvertedStyle
      ? semanticColors?.base?.textPrimaryOnDark
      : semanticColors?.base?.textPrimary;

    return css`
      display: flex;
      align-items: center;
      gap: ${spaces?.l}px;
      padding: ${spaces?.s}px 0;
      cursor: pointer;
      border-radius: 8px;
      transition: background-color 150ms;
      color: ${textColor};
    `;
  }}
`;

export const StyledDrawerNavItemContent = styled("div")`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return css`
      display: flex;
      flex-direction: column;
      gap: 0;
      flex: 1;
      min-width: 0;
      padding-top: ${spaces?.xxs}px;
    `;
  }}
`;

export const StyledDrawerNavItemText = styled("div")`
  ${(
    props: CommonThemeProps & {
      hasDetails?: boolean;
      hasInvertedStyle?: boolean;
    }
  ) => {
    const { hasDetails, hasInvertedStyle } = props;
    const semanticColors = getSemanticColors(props);

    const textColor = hasInvertedStyle
      ? semanticColors?.base?.textPrimaryOnDark
      : semanticColors?.base?.textPrimary;

    return css`
      ${hasDetails ? fontBodySemiboldS(props) : fontBodyMediumS(props)}
      color: ${textColor};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      line-height: 24px;
    `;
  }}
`;

export const StyledDrawerNavItemCaption = styled("div")`
  ${(props: CommonThemeProps & { hasInvertedStyle?: boolean }) => {
    const semanticColors = getSemanticColors(props);

    const captionColor = props.hasInvertedStyle
      ? semanticColors?.base?.textSecondaryOnDark
      : semanticColors?.base?.textSecondary;

    return css`
      ${fontBodyXs(props)}
      color: ${captionColor};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      line-height: 20px;
    `;
  }}
`;

export const StyledIconWrapper = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(
    props: CommonThemeProps & { iconSize: "s" | "l"; hasDetails?: boolean }
  ) => {
    const { iconSize } = props;

    const size = props.iconSize === "l" ? "24px" : "16px";
    const spaces = getSpaces(props);

    return css`
      flex-shrink: 0;
      width: ${size};
      height: ${size};
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 ${iconSize === "l" ? 0 : spaces?.xxs}px;
      box-sizing: content-box;
    `;
  }}
`;
