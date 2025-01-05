import styled from "@emotion/styled";
import Button from "src/core/Button";
import { fontHeader, getSemanticColors, getSpaces } from "src/core/styles";
import { ExtraHeaderProps } from "../../style";

interface PrimaryNavItemProps extends ExtraHeaderProps {
  active?: boolean;
}

export const PrimaryNavItem = styled(Button)`
  display: flex;
  align-items: center;
  background: none;

  &:hover {
    background: none;
  }

  ${(props: PrimaryNavItemProps) => {
    const spaces = getSpaces(props);
    const colors = getSemanticColors(props);

    const activeBackgroundColor = props.hasInvertedStyle
      ? colors?.base.backgroundSecondaryInverse
      : colors?.base.backgroundSecondary;

    return `
      gap: ${spaces?.xs}px;

      &:hover {
        > span {
          color: ${
            props.hasInvertedStyle
              ? colors?.base.textPrimaryInverse
              : colors?.base.textPrimary
          };
        }
      }

      ${props.theme?.breakpoints.down("md")} {
        border-left: ${spaces?.xs}px solid ${props.active ? colors?.accent.borderSelected : "transparent"};
        border-radius: 0;
        justify-content: start;
        padding: ${spaces?.m}px 0 ${spaces?.m}px ${(spaces?.l ?? 0) + (spaces?.xxxs ?? 0)}px;
        background: ${props.active ? activeBackgroundColor : "transparent"};
        width: 100%;

        &:hover {
          background: ${props.hasInvertedStyle ? colors?.base.backgroundSecondaryInverse : colors?.base.backgroundSecondary};
          border-left-color: ${props.active ? colors?.accent.borderSelected : colors?.neutral.fillPrimary};
        }
      }
    `;
  }}
`;

export const StyledLabel = styled.span`
  ${fontHeader("m")}

  ${(props: PrimaryNavItemProps) => {
    const colors = getSemanticColors(props);
    const spaces = getSpaces(props);

    const activeColor = props.hasInvertedStyle
      ? colors?.base.textPrimaryInverse
      : colors?.base.textPrimary;

    const inactiveColor = props.hasInvertedStyle
      ? colors?.base.textSecondaryInverse
      : colors?.base.textSecondary;

    return `
      color: ${props.active ? activeColor : inactiveColor};

      ${props.theme?.breakpoints.up("md")} {
        border-bottom: solid 2px transparent;
        border-bottom-color: ${props.active ? colors?.accent.border : "transparent"};
        padding-bottom: ${spaces?.xxxs}px;

        &:hover {
          border-bottom-color: ${
            props.active
              ? colors?.accent.border
              : props.hasInvertedStyle
                ? colors?.base.borderInverse
                : colors?.base.border
          };
        }
      }
    `;
  }}
`;
