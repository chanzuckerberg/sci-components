import styled from "@emotion/styled";
import {
  getSemanticColors,
  getSpaces,
  getCorners,
  fontBodyMediumS,
  fontBodySemiboldS,
  fontBodySemiboldL,
  fontBodyMediumL,
} from "src/core/styles";
import { ExtraHeaderProps } from "../../style";
import { css, SerializedStyles } from "@emotion/react";
import Tag from "src/core/Tag";

interface PrimaryNavItemProps extends ExtraHeaderProps {
  active?: boolean;
  itemType?: "dropdown" | "text";
}

const doNotForwardProps = [
  "active",
  "hasInvertedStyle",
  "isNarrow",
  "hasSection",
];

const NarrowPrimaryNavItem = (props: PrimaryNavItemProps): SerializedStyles => {
  const { active, hasInvertedStyle } = props;

  const spaces = getSpaces(props);
  const semanticColors = getSemanticColors(props);
  const corners = getCorners(props);

  const ChevronHoverColor = hasInvertedStyle
    ? semanticColors?.base?.ornamentSecondaryHoverOnDark
    : semanticColors?.base.ornamentSecondaryHover;

  return css`
    border-radius: ${corners?.l}px;
    justify-content: start;
    padding: ${spaces?.s}px ${spaces?.m}px;
    background-color: ${active
      ? hasInvertedStyle
        ? semanticColors?.base?.fillPressedOnDark
        : semanticColors?.base?.fillPressed
      : "transparent"};
    width: 100%;

    &:hover {
      background: ${hasInvertedStyle
        ? semanticColors?.base.fillHoverOnDark
        : semanticColors?.base.fillHover};
      box-shadow: none;

      ${StyledLabel} {
        color: ${hasInvertedStyle
          ? semanticColors?.base.textPrimaryOnDark
          : semanticColors?.base.textPrimary};
      }

      svg {
        color: ${ChevronHoverColor} !important;
      }
    }
  `;
};

export const PrimaryNavItem = styled("button", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  display: flex;
  align-items: center;
  min-width: fit-content;

  ${(props: PrimaryNavItemProps) => {
    const { hasInvertedStyle, isNarrow, active, sdsStyle } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    const ChevronDefaultColor = hasInvertedStyle
      ? semanticColors?.base.ornamentSecondaryOnDark
      : semanticColors?.base.ornamentSecondary;

    const ChevronHoverColor = hasInvertedStyle
      ? semanticColors?.base?.ornamentSecondaryHoverOnDark
      : semanticColors?.base.ornamentSecondaryHover;

    const ChevronOpenColor = hasInvertedStyle
      ? semanticColors?.base.ornamentSecondaryPressedOnDark
      : semanticColors?.base.ornamentSecondaryPressed;

    return css`
      border: none;
      padding: ${spaces?.xxxs}px ${spaces?.m}px;
      border-radius: ${corners?.l}px;
      background-color: ${sdsStyle === "drawer"
        ? "transparent"
        : active
          ? hasInvertedStyle
            ? semanticColors?.base?.fillPressedOnDark
            : semanticColors?.base?.fillPressed
          : "transparent"};

      svg {
        color: ${active ? ChevronOpenColor : ChevronDefaultColor};
      }

      &:hover {
        background: ${sdsStyle === "drawer"
          ? "transparent"
          : hasInvertedStyle
            ? semanticColors?.base.fillHoverOnDark
            : semanticColors?.base.fillHover} !important;
        box-shadow: none;

        ${StyledLabel} {
          color: ${hasInvertedStyle
            ? semanticColors?.base.textPrimaryOnDark
            : semanticColors?.base.textPrimary};
        }

        svg {
          color: ${ChevronHoverColor} !important;
        }
      }

      ${isNarrow && NarrowPrimaryNavItem(props)}
    `;
  }}
`;

export const StyledTag = styled(Tag)`
  margin: 0;
`;

export const NarrowStyledLabel = (
  props: PrimaryNavItemProps
): SerializedStyles => {
  const { active } = props;
  return css`
    ${active ? fontBodySemiboldL(props) : fontBodyMediumL(props)}
  `;
};

export const StyledLabel = styled("span", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: PrimaryNavItemProps) => {
    const { hasInvertedStyle, active, isNarrow } = props;

    const spaces = getSpaces(props);
    const colors = getSemanticColors(props);

    const activeColor = hasInvertedStyle
      ? colors?.base.textPrimaryOnDark
      : colors?.base.textPrimary;

    const inactiveColor = hasInvertedStyle
      ? colors?.base.textSecondaryOnDark
      : colors?.base.textSecondary;

    return [
      active ? fontBodySemiboldS(props) : fontBodyMediumS(props),
      css`
        position: relative;
        display: flex;
        align-items: center;
        gap: ${spaces?.xs}px;
        color: ${active ? activeColor : inactiveColor};

        /* TODO: Double check with Connor! */
        /* ${StyledTag} {
           margin-right: -${spaces?.s}px;margin-right
        } */

        ${isNarrow && NarrowStyledLabel(props)}
      `,
    ];
  }}
`;
