import styled from "@emotion/styled";
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
import Tag from "src/core/Tag";
import Button, { SdsMinimalButtonProps } from "src/core/Button";

export type StyledTextItemProps = ExtraHeaderProps & {
  open: boolean;
  sdsStyle?: "dropdown" | "drawer";
};

const ButtonDoNotForwardProps = [
  "isNarrow",
  "sdsStyle",
  "open",
  "defaultUrl",
  "hasDetails",
  "hasIcon",
  "sectionProps",
];

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
        ? semanticColors?.base.fillInteractionOnDark
        : semanticColors?.base.fillInteraction};
    }
  `;
};

export const StyledTextItem = styled(
  Button as unknown as React.ComponentType<
    Partial<SdsMinimalButtonProps> & StyledTextItemProps
  >,
  {
    shouldForwardProp: (prop: string) =>
      !ButtonDoNotForwardProps.includes(prop),
  }
)<StyledTextItemProps>`
  ${fontBodyMediumS}

  justify-content: flex-start;
  width: fit-content;
  min-width: fit-content;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;

  ${(props: StyledTextItemProps) => {
    const { hasInvertedStyle, open, isNarrow } = props;

    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);
    const corners = getCorners(props);

    const textDefaultColor = hasInvertedStyle
      ? semanticColors?.base.textSecondaryOnDark
      : semanticColors?.base.textSecondary;

    const textOpenColor = hasInvertedStyle
      ? semanticColors?.base.textPrimaryOnDark
      : semanticColors?.base.textPrimary;

    const ChevronDefaultColor = hasInvertedStyle
      ? semanticColors?.base.ornamentSecondaryOnDark
      : semanticColors?.base.ornamentSecondary;

    const ChevronHoverColor = hasInvertedStyle
      ? semanticColors?.base?.ornamentSecondaryInteractionOnDark
      : semanticColors?.base.ornamentSecondaryInteraction;

    const ChevronOpenColor = hasInvertedStyle
      ? semanticColors?.base?.ornamentSecondaryInteractionOnDark
      : semanticColors?.base.ornamentSecondaryInteraction;

    return [
      open ? fontBodySemiboldS(props) : fontBodyMediumS(props),
      css`
        padding: ${spaces?.xxxs}px ${spaces?.m}px;
        border-radius: ${corners?.l}px;
        background-color: ${open
          ? hasInvertedStyle
            ? semanticColors?.base?.fillPressedOnDark
            : semanticColors?.base?.fillPressed
          : "transparent"};

        gap: ${spaces?.xs}px;
        color: ${open ? textOpenColor : textDefaultColor};

        svg {
          color: ${open ? ChevronOpenColor : ChevronDefaultColor};
        }

        &:hover {
          background: ${hasInvertedStyle
            ? semanticColors?.base.fillInteractionOnDark
            : semanticColors?.base.fillInteraction};
          box-shadow: none;

          color: ${hasInvertedStyle
            ? semanticColors?.base.textPrimaryOnDark
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

export const StyledTag = styled(Tag)`
  margin: 0;
`;
