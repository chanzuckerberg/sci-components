/* eslint-disable sonarjs/cognitive-complexity */
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
import {
  getSemanticColors,
  getSpaces,
  getCorners,
  fontBodyMediumS,
  fontBodySemiboldS,
  fontBodyMediumL,
  fontBodySemiboldL,
  CommonThemeProps,
} from "src/core/styles";
import Button, { SdsMinimalButtonProps } from "src/core/Button";

interface UnifiedNavItemProps extends CommonThemeProps {
  hasInvertedStyle?: boolean;
  isNarrow?: boolean;
  /**
   * Whether the nav item is active (for primary nav) or open (for secondary nav)
   * These mean the same thing - the item is currently selected/showing dropdown
   */
  active?: boolean;
  itemType?: "dropdown" | "text";
  innerSdsStyle?: "drawer" | "dropdown";
  /**
   * Navigation variant determines styling differences between primary and secondary nav
   * - primary: Used for main navigation items (with StyledLabel)
   * - secondary: Used for secondary navigation items (simpler styling)
   */
  navVariant: "primary" | "secondary";
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
  "navVariant",
  "itemType",
];

const NarrowNavItemStyles = (props: UnifiedNavItemProps): SerializedStyles => {
  const { active, hasInvertedStyle, innerSdsStyle, navVariant } = props;

  const spaces = getSpaces(props);
  const semanticColors = getSemanticColors(props);
  const corners = getCorners(props);

  const ChevronHoverColor = hasInvertedStyle
    ? semanticColors?.base?.ornamentSecondaryInteractionOnDark
    : semanticColors?.base?.ornamentSecondaryInteraction;

  return css`
    ${active ? fontBodySemiboldL(props) : fontBodyMediumL(props)}
    border-radius: ${corners?.l}px;
    padding: ${spaces?.s}px
      ${navVariant === "primary" ? spaces?.l : spaces?.m}px;
    ${navVariant === "primary" ? "justify-content: start;" : ""}
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

      ${navVariant === "primary" && StyledLabel} {
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

export const UnifiedNavItem = styled(
  Button as unknown as React.ComponentType<
    Partial<SdsMinimalButtonProps> & UnifiedNavItemProps
  >,
  {
    shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
  }
)`
  display: flex;
  align-items: center;
  min-width: fit-content;
  border: none;
  background: transparent;

  ${(props: UnifiedNavItemProps) => {
    const { hasInvertedStyle, isNarrow, active, navVariant } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    const textDefaultColor = hasInvertedStyle
      ? semanticColors?.base.textSecondaryOnDark
      : semanticColors?.base.textSecondary;

    const textActiveColor = hasInvertedStyle
      ? semanticColors?.base.textPrimaryOnDark
      : semanticColors?.base.textPrimary;

    const ChevronDefaultColor = hasInvertedStyle
      ? semanticColors?.base.ornamentSecondaryOnDark
      : semanticColors?.base.ornamentSecondary;

    const ChevronHoverColor = hasInvertedStyle
      ? semanticColors?.base?.ornamentSecondaryInteractionOnDark
      : semanticColors?.base.ornamentSecondaryInteraction;

    const ChevronOpenColor = hasInvertedStyle
      ? semanticColors?.base.ornamentSecondaryInteractionOnDark
      : semanticColors?.base.ornamentSecondaryInteraction;

    return [
      navVariant === "secondary" &&
        (active ? fontBodySemiboldS(props) : fontBodyMediumS(props)),
      css`
        padding: ${spaces?.xxxs}px ${spaces?.m}px;
        border-radius: ${corners?.l}px;
        background-color: ${active
          ? hasInvertedStyle
            ? semanticColors?.base?.fillPressedOnDark
            : semanticColors?.base?.fillPressed
          : "transparent"};

        ${navVariant === "secondary"
          ? css`
              gap: ${spaces?.xs}px;
              color: ${active ? textActiveColor : textDefaultColor};
              justify-content: flex-start;
              width: fit-content;
            `
          : ""}

        svg {
          color: ${active ? ChevronOpenColor : ChevronDefaultColor};
        }

        &:hover {
          background: ${hasInvertedStyle
            ? semanticColors?.base.fillInteractionOnDark
            : semanticColors?.base.fillInteraction} !important;
          box-shadow: none;

          ${navVariant === "primary" && StyledLabel} {
            color: ${hasInvertedStyle
              ? semanticColors?.base.textPrimaryOnDark
              : semanticColors?.base.textPrimary};
          }

          svg {
            color: ${ChevronHoverColor} !important;
          }
        }

        ${isNarrow && NarrowNavItemStyles(props)}
      `,
    ];
  }}
`;

// StyledLabel for primary nav items (secondary nav doesn't use this)
export const StyledLabel = styled("span", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: UnifiedNavItemProps) => {
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

        ${isNarrow &&
        css`
          ${active ? fontBodySemiboldL(props) : fontBodyMediumL(props)}
        `}
      `,
    ];
  }}
`;
