import styled from "@emotion/styled";
import Link from "../../../Link";
import { Divider } from "@mui/material";
import { CommonThemeProps, fontBody, getSemanticColors } from "src/core/styles";

interface FooterLinkStyleProps extends CommonThemeProps {
  hasInvertedStyle?: boolean;
}

const doNotForwardProps = ["hasInvertedStyle"];

export const StyledLinkItemLink = styled(Link, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBody("xxs", "regular")}

  ${(props: FooterLinkStyleProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${props.hasInvertedStyle ? semanticColors?.base.textSecondaryInverse : semanticColors?.base.textSecondary};
      white-space: nowrap;

      &:hover {
        color: ${props.hasInvertedStyle ? semanticColors?.base.textPrimaryInverse : semanticColors?.base.textPrimary};
        text-decoration: none;
      }
    `;
  }}
`;

export const StyledDivider = styled(Divider, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: FooterLinkStyleProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      border-color: ${
        props.hasInvertedStyle
          ? semanticColors?.base.dividerInverse
          : semanticColors?.base.divider
      };
    `;
  }}
`;
