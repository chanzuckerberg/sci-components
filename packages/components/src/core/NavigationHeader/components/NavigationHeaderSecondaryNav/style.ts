import styled from "@emotion/styled";
import Button, { SdsMinimalButtonProps } from "src/core/Button";
import {
  fontBodyMediumL,
  fontBodyMediumS,
  fontBodySemiboldL,
  fontBodySemiboldS,
  getCorners,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import { ExtraHeaderProps } from "../../style";
import { css, SerializedStyles } from "@emotion/react";

export type StyledTextItemProps = ExtraHeaderProps &
  SdsMinimalButtonProps & { open: boolean };

const ButtonDoNotForwardProps = ["isNarrow"];

const NarrowStyledTextItem = (props: StyledTextItemProps): SerializedStyles => {
  const { hasInvertedStyle, open } = props;

  const semanticColors = getSemanticColors(props);
  const spaces = getSpaces(props);
  const corners = getCorners(props);

  return css`
    ${open ? fontBodySemiboldL(props) : fontBodyMediumL(props)}
    border-radius: ${corners?.l}px;
    padding: ${spaces?.s}px ${spaces?.m}px;
    width: 100%;

    &:hover {
      box-shadow: none;
      background: ${hasInvertedStyle
        ? semanticColors?.base.fillHoverInverse
        : semanticColors?.base.fillHover};
    }
  `;
};

export const StyledTextItem = styled(Button, {
  shouldForwardProp: (prop: string) => !ButtonDoNotForwardProps.includes(prop),
})`
  ${fontBodyMediumS}

  justify-content: flex-start;
  width: fit-content;
  min-width: unset;

  ${(props: StyledTextItemProps) => {
    const { hasInvertedStyle, open, isNarrow } = props;

    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);
    const corners = getCorners(props);

    const textDefaultColor = hasInvertedStyle
      ? semanticColors?.base.textSecondaryInverse
      : semanticColors?.base.textSecondary;

    const textOpenColor = hasInvertedStyle
      ? semanticColors?.base.textPrimaryInverse
      : semanticColors?.base.textPrimary;

    const ChevronDefaultColor = hasInvertedStyle
      ? semanticColors?.base.ornamentSecondaryInverse
      : semanticColors?.base.ornamentSecondary;

    const ChevronHoverColor = hasInvertedStyle
      ? semanticColors?.base?.ornamentSecondaryHoverInverse
      : semanticColors?.base.ornamentSecondaryHover;

    const ChevronOpenColor = hasInvertedStyle
      ? semanticColors?.base?.ornamentSecondaryPressedInverse
      : semanticColors?.base.ornamentSecondaryPressed;

    return [
      open ? fontBodySemiboldS(props) : fontBodyMediumS(props),
      css`
        padding: ${spaces?.xxxs}px ${spaces?.m}px;
        border-radius: ${corners?.l}px;
        background-color: ${open
          ? hasInvertedStyle
            ? semanticColors?.base?.fillPressedInverse
            : semanticColors?.base?.fillPressed
          : "transparent"};

        gap: ${spaces?.xs}px;
        color: ${open ? textOpenColor : textDefaultColor};

        svg {
          color: ${open ? ChevronOpenColor : ChevronDefaultColor};
        }

        &:hover {
          background: ${hasInvertedStyle
            ? semanticColors?.base.fillHoverInverse
            : semanticColors?.base.fillHover};
          box-shadow: none;

          color: ${hasInvertedStyle
            ? semanticColors?.base.textPrimaryInverse
            : semanticColors?.base.textPrimary};

          svg {
            color: ${ChevronHoverColor};
          }
        }

        ${isNarrow && NarrowStyledTextItem(props)}
      `,
    ];
  }}
`;
