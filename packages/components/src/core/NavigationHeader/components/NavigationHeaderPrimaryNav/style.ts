import styled from "@emotion/styled";
import {
  getSemanticColors,
  getSpaces,
  getCorners,
  fontBodyMediumS,
  fontBodySemiboldS,
  fontBodySemiboldL,
  fontBodyMediumL,
  CommonThemeProps,
} from "src/core/styles";
import { css, SerializedStyles } from "@emotion/react";
import Tag from "src/core/Tag";
import Button from "src/core/Button";

interface PrimaryNavItemProps extends CommonThemeProps {
  hasInvertedStyle?: boolean;
  isNarrow?: boolean;
  active?: boolean;
  itemType?: "dropdown" | "text";
  innerSdsStyle?: "drawer" | "dropdown";
}

const doNotForwardProps = [
  "active",
  "hasInvertedStyle",
  "isNarrow",
  "hasSection",
  "innerSdsStyle",
  "defaultUrl",
  "hasDetails",
  "hasIcon",
  "sectionProps",
];

const NarrowPrimaryNavItem = (props: PrimaryNavItemProps): SerializedStyles => {
  const { active, hasInvertedStyle, innerSdsStyle } = props;

  const spaces = getSpaces(props);
  const semanticColors = getSemanticColors(props);
  const corners = getCorners(props);

  const ChevronHoverColor = hasInvertedStyle
    ? semanticColors?.base?.ornamentSecondaryInteractionOnDark
    : semanticColors?.base.ornamentSecondaryInteraction;

  return css`
    border-radius: ${corners?.l}px;
    justify-content: start;
    padding: ${spaces?.s}px ${spaces?.l}px;
    ${innerSdsStyle === "drawer"
      ? css`
          background-color: transparent !important;
        `
      : css`
          background-color: ${active
            ? hasInvertedStyle
              ? semanticColors?.base?.fillPressedOnDark
              : semanticColors?.base?.fillPressed
            : "transparent"};
        `}
    width: 100%;

    &:hover {
      ${innerSdsStyle === "drawer"
        ? css`
            background: transparent !important;
          `
        : css`
            background: ${hasInvertedStyle
              ? semanticColors?.base.fillInteractionOnDark
              : semanticColors?.base.fillInteraction};
          `}
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

export const PrimaryNavItem = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})<PrimaryNavItemProps>`
  display: flex;
  align-items: center;
  min-width: fit-content;

  ${(props: PrimaryNavItemProps) => {
    const { hasInvertedStyle, isNarrow, active } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    const ChevronDefaultColor = hasInvertedStyle
      ? semanticColors?.base.ornamentSecondaryOnDark
      : semanticColors?.base.ornamentSecondary;

    const ChevronHoverColor = hasInvertedStyle
      ? semanticColors?.base?.ornamentSecondaryInteractionOnDark
      : semanticColors?.base.ornamentSecondaryInteraction;

    const ChevronOpenColor = hasInvertedStyle
      ? semanticColors?.base.ornamentSecondaryInteractionOnDark
      : semanticColors?.base.ornamentSecondaryInteraction;

    return css`
      border: none;
      padding: ${spaces?.xxxs}px ${spaces?.m}px;
      border-radius: ${corners?.l}px;
      background-color: ${active
        ? hasInvertedStyle
          ? semanticColors?.base?.fillPressedOnDark
          : semanticColors?.base?.fillPressed
        : "transparent"};

      svg {
        color: ${active ? ChevronOpenColor : ChevronDefaultColor};
      }

      &:hover {
        background: ${hasInvertedStyle
          ? semanticColors?.base.fillInteractionOnDark
          : semanticColors?.base.fillInteraction} !important;
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
