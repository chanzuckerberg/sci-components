import styled from "@emotion/styled";
import Button from "src/core/Button";
import { fontHeader, getSemanticColors, getSpaces } from "src/core/styles";
import { ExtraHeaderProps } from "../../style";
import { css, SerializedStyles } from "@emotion/react";

interface PrimaryNavItemProps extends ExtraHeaderProps {
  active?: boolean;
}

const doNotForwardProps = ["active", "hasInvertedStyle", "isNarrow"];

const NarrowPrimaryNavItem = (props: PrimaryNavItemProps): SerializedStyles => {
  const { active, hasInvertedStyle } = props;

  const spaces = getSpaces(props);
  const colors = getSemanticColors(props);

  const activeBackgroundColor = hasInvertedStyle
    ? colors?.base.backgroundSecondaryInverse
    : colors?.base.backgroundSecondary;

  const activeBorderColor = hasInvertedStyle
    ? colors?.base?.borderOnFill
    : colors?.accent?.border;

  const inactiveBorderColor = hasInvertedStyle
    ? colors?.neutral?.fillPrimary
    : colors?.base.border;

  return css`
    border-left: ${spaces?.xs}px solid
      ${active ? activeBorderColor : "transparent"};
    border-radius: 0;
    justify-content: start;
    padding: ${spaces?.m}px 0 ${spaces?.m}px
      ${(spaces?.l ?? 0) + (spaces?.xxxs ?? 0)}px;
    background: ${active ? activeBackgroundColor : "transparent"};
    width: 100%;

    &:hover {
      box-shadow: none;
      background: ${hasInvertedStyle
        ? colors?.base.backgroundSecondaryInverse
        : colors?.base.backgroundSecondary};
      border-left: ${spaces?.xs}px solid
        ${active ? activeBorderColor : inactiveBorderColor};
    }
  `;
};

export const PrimaryNavItem = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  display: flex;
  align-items: start;
  background: none;

  ${(props: PrimaryNavItemProps) => {
    const { hasInvertedStyle, isNarrow } = props;

    const spaces = getSpaces(props);
    const colors = getSemanticColors(props);

    return css`
      gap: ${spaces?.xs}px;

      &:hover {
        background: none;
        box-shadow: none;

        > span {
          color: ${hasInvertedStyle
            ? colors?.base.textPrimaryInverse
            : colors?.base.textPrimary};
        }
      }

      ${isNarrow && NarrowPrimaryNavItem(props)}
    `;
  }}
`;

export const StyledLabel = styled("span", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontHeader("m")}

  ${(props: PrimaryNavItemProps) => {
    const { hasInvertedStyle, active, isNarrow } = props;
    const colors = getSemanticColors(props);
    const spaces = getSpaces(props);

    const activeColor = hasInvertedStyle
      ? colors?.base.textPrimaryInverse
      : colors?.base.textPrimary;

    const inactiveColor = hasInvertedStyle
      ? colors?.base.textSecondaryInverse
      : colors?.base.textSecondary;

    const activeBorderColor = hasInvertedStyle
      ? colors?.base?.borderOnFill
      : colors?.accent?.border;

    const inactiveBorderColor = hasInvertedStyle
      ? colors?.base.borderOnFill
      : colors?.base.border;

    return `
      color: ${active ? activeColor : inactiveColor};

      ${
        !isNarrow &&
        css`
          border-bottom: solid 2px transparent;
          border-bottom-color: ${active ? activeBorderColor : "transparent"};
          padding-bottom: ${spaces?.xxxs}px;

          &:hover {
            border-bottom-color: ${active
              ? activeBorderColor
              : inactiveBorderColor};
          }
        `
      }
    `;
  }}
`;
