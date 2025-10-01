import React from "react";
import { StyledHeroContainer } from "./style";
import { HeroProps } from "./Hero.types";

export type { HeroProps };

const Hero = React.forwardRef<HTMLElement, HeroProps>((props, ref) => {
  const { heroHeight, children, ...rest } = props;

  return (
    <StyledHeroContainer ref={ref} heroHeight={heroHeight} {...rest}>
      {children}
      Hero Title
    </StyledHeroContainer>
  );
});

Hero.displayName = "Hero";

export default Hero;
