import styled from "@emotion/styled";
import Button from "src/core/Button";
import { fontHeader, getSemanticColors, getSpaces } from "src/core/styles";
import { ExtraHeaderProps } from "../../style";

interface PrimaryNavItemProps extends ExtraHeaderProps {
  active?: boolean;
}

const doNotForwardProps = ["active", "hasInvertedStyle"];

export const PrimaryNavItem = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  display: flex;
  align-items: start;
  background: none;

  &:hover {
    background: none;
    box-shadow: none;
  }

  ${(props: PrimaryNavItemProps) => {
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

    return `
      gap: ${spaces?.xs}px;

      &:hover {
        > span {
          color: ${
            hasInvertedStyle
              ? colors?.base.textPrimaryInverse
              : colors?.base.textPrimary
          };
        }
      }

      ${props.theme?.breakpoints?.down("md")} {
        border-left: ${spaces?.xs}px solid ${active ? activeBorderColor : "transparent"};
        border-radius: 0;
        justify-content: start;
        padding: ${spaces?.m}px 0 ${spaces?.m}px ${(spaces?.l ?? 0) + (spaces?.xxxs ?? 0)}px;
        background: ${active ? activeBackgroundColor : "transparent"};
        width: 100%;

        &:hover {
          background: ${hasInvertedStyle ? colors?.base.backgroundSecondaryInverse : colors?.base.backgroundSecondary};
          border-left: ${spaces?.xs}px solid ${active ? activeBorderColor : inactiveBorderColor};
        }
      }
    `;
  }}
`;

export const StyledLabel = styled("span", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontHeader("m")}

  ${(props: PrimaryNavItemProps) => {
    const { hasInvertedStyle, active } = props;
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

      ${props.theme?.breakpoints.up("md")} {
        border-bottom: solid 2px transparent;
        border-bottom-color: ${active ? activeBorderColor : "transparent"};
        padding-bottom: ${spaces?.xxxs}px;

        &:hover {
          border-bottom-color: ${
            active ? activeBorderColor : inactiveBorderColor
          };
        }
      }
    `;
  }}
`;
