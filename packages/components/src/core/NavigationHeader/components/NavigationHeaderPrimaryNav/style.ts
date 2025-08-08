import styled from "@emotion/styled";
import Button from "src/core/Button";
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
    ? semanticColors?.base?.ornamentSecondaryHoverInverse
    : semanticColors?.base.ornamentSecondaryHover;

  return css`
    border-radius: ${corners?.l}px;
    justify-content: start;
    padding: ${spaces?.s}px ${spaces?.m}px;
    background-color: ${active
      ? hasInvertedStyle
        ? semanticColors?.base?.fillPressedInverse
        : semanticColors?.base?.fillPressed
      : "transparent"};
    width: 100%;

    &:hover {
      background: ${hasInvertedStyle
        ? semanticColors?.base.fillHoverInverse
        : semanticColors?.base.fillHover};
      box-shadow: none;

      ${StyledLabel} {
        color: ${hasInvertedStyle
          ? semanticColors?.base.textPrimaryInverse
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
})`
  display: flex;
  align-items: center;
  min-width: fit-content;

  ${(props: PrimaryNavItemProps) => {
    const { hasInvertedStyle, isNarrow, active } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    const ChevronDefaultColor = hasInvertedStyle
      ? semanticColors?.base.ornamentSecondaryInverse
      : semanticColors?.base.ornamentSecondary;

    const ChevronHoverColor = hasInvertedStyle
      ? semanticColors?.base?.ornamentSecondaryHoverInverse
      : semanticColors?.base.ornamentSecondaryHover;

    const ChevronOpenColor = hasInvertedStyle
      ? semanticColors?.base.ornamentSecondaryPressedInverse
      : semanticColors?.base.ornamentSecondaryPressed;

    return css`
      padding: ${spaces?.xxxs}px ${spaces?.m}px;
      border-radius: ${corners?.l}px;
      background-color: ${active
        ? hasInvertedStyle
          ? semanticColors?.base?.fillPressedInverse
          : semanticColors?.base?.fillPressed
        : "transparent"};

      svg {
        color: ${active ? ChevronOpenColor : ChevronDefaultColor};
      }

      &:hover {
        background: ${hasInvertedStyle
          ? semanticColors?.base.fillHoverInverse
          : semanticColors?.base.fillHover};
        box-shadow: none;

        ${StyledLabel} {
          color: ${hasInvertedStyle
            ? semanticColors?.base.textPrimaryInverse
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
      ? colors?.base.textPrimaryInverse
      : colors?.base.textPrimary;

    const inactiveColor = hasInvertedStyle
      ? colors?.base.textSecondaryInverse
      : colors?.base.textSecondary;

    return [
      active ? fontBodySemiboldS(props) : fontBodyMediumS(props),
      css`
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
