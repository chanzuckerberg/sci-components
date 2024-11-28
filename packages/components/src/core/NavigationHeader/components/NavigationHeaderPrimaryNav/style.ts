import styled from "@emotion/styled";
import Button from "src/core/Button";
import {
  CommonThemeProps,
  fontHeader,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

interface PrimaryNavItemProps extends CommonThemeProps {
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

    return `
      gap: ${spaces?.xs}px;


      ${props.theme?.breakpoints.down("md")} {
        border-left: ${spaces?.xs}px solid ${props.active ? colors?.accent.border : "transparent"};
        border-radius: 0;
        justify-content: start;
        padding: ${spaces?.m}px 0 ${spaces?.m}px ${(spaces?.l ?? 0) + (spaces?.xxxs ?? 0)}px;
        background: ${props.active ? colors?.base.backgroundSecondary : "transparent"};
        width: 100%;

        &:hover {
          background: ${colors?.base.backgroundSecondary};
          border-left-color: ${props.active ? "initial" : colors?.neutral.fillPrimary};
        }
      }
    `;
  }}
`;

export const StyledLabel = styled.span`
  ${fontHeader("m")}

  ${(props: PrimaryNavItemProps) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${props.active ? semanticColors?.base.textPrimary : semanticColors?.base.textSecondary};

      ${props.theme?.breakpoints.up("md")} {
        border-bottom: solid 2px transparent;
        border-bottom-color: ${props.active ? semanticColors?.accent.border : "transparent"};
        padding-bottom: ${spaces?.xxxs}px;

        &:hover {
          border-bottom-color: ${semanticColors?.base.border};
        }
      }
    `;
  }}
`;
