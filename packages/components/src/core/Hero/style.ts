import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { CommonThemeProps, getSpaces } from "../styles";
import { HERO_MARGINS, HeroProps } from "./Hero.types";

const doNotForwardProps = ["heroHeight", "overlayContainerMinMargin"];

interface StyledHeroProps extends HeroProps, CommonThemeProps {
  heroHeight?: string;
}

const getResponsivePadding = (props: StyledHeroProps) => {
  const { overlayContainerMinMargin } = props;
  const spaces = getSpaces(props);

  return css`
    padding: ${spaces?.xxl}px
      ${overlayContainerMinMargin?.small || HERO_MARGINS.SMALL}px;

    @media (min-width: 768px) {
      padding: ${spaces?.xxl}px
        ${overlayContainerMinMargin?.medium || HERO_MARGINS.MEDIUM}px;
    }

    @media (min-width: 1200px) {
      padding: ${spaces?.xxl}px
        ${overlayContainerMinMargin?.large || HERO_MARGINS.LARGE}px;
    }
  `;
};

// Main Hero Container
export const StyledHeroContainer = styled("section", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StyledHeroProps) => {
    const { heroHeight } = props;

    return css`
      ${getResponsivePadding(props)};
      display: flex;
      position: relative;
      height: ${heroHeight};
      width: 100%;
      background-color: pink;
      align-items: center;
      text-align: center;
    `;
  }}
`;
