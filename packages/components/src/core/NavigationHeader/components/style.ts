import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontCapsXxxxs,
  getBorders,
  getSemanticColors,
  getSpaces,
  Spaces,
} from "src/core/styles";
import { css, SerializedStyles } from "@emotion/react";
import ListSubheader from "src/core/List/components/ListSubheader";
import { Divider } from "@mui/material";
import { ExtraHeaderProps } from "../style";

const doNotForwardProps = ["isNarrow", "hasSection"];

const NarrowStyledSection = (): SerializedStyles => {
  return css`
    align-items: start;
    flex-direction: column;
  `;
};

export const StyledSection = styled("section", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  display: flex;
  align-items: center;

  ${(props: CommonThemeProps & { gap?: keyof Spaces; isNarrow?: boolean }) => {
    const { isNarrow } = props;
    const spaces = getSpaces(props);

    return css`
      column-gap: ${spaces?.[props?.gap ?? "xl"]}px;

      ${isNarrow && NarrowStyledSection()}
    `;
  }}
`;

export const StyledSectionHeader = styled(ListSubheader, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ExtraHeaderProps) => {
    const { isNarrow } = props;

    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return css`
      &.MuiListSubheader-root {
        ${fontCapsXxxxs(props)}
        top: 0;
        color: ${semanticColors?.base?.textSecondary};
        background-color: ${semanticColors?.base?.surface};
        padding: ${spaces?.xxs}px ${isNarrow ? spaces?.xl : spaces?.s}px;
        margin-bottom: 0;
      }
    `;
  }}
`;

interface StyledDividerProps extends CommonThemeProps {
  hasSection?: boolean;
  isNarrow?: boolean;
}

export const StyledDivider = styled(Divider, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StyledDividerProps) => {
    const { hasSection, isNarrow } = props;

    const spaces = getSpaces(props);
    const borders = getBorders(props);

    // Calculate margin based on section and narrow state
    const getMarginBottom = () => {
      return hasSection ? spaces?.s : isNarrow ? 0 : spaces?.xxs;
    };

    return css`
      &.MuiDivider-root {
        position: relative;
        margin: 0 0 ${getMarginBottom()}px;
        border-bottom: ${borders?.base?.divider};
        padding-bottom: ${isNarrow ? 0 : spaces?.xxs}px;
      }
    `;
  }}
`;
