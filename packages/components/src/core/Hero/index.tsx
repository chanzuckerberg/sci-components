import React, { isValidElement } from "react";
import {
  BackgroundFillContainer,
  ContentSlot,
  DarkeningMask,
  DarkeningVignette,
  HeroCaption,
  HeroTitle,
  OverlayContent,
  OverlayMedia,
  OverlayMediaWrapper,
  StyledHeroContainer,
} from "./style";
import { HeroProps } from "./Hero.types";

export type { HeroProps };

const Hero = React.forwardRef<HTMLElement, HeroProps>((props, ref) => {
  const {
    heroHeight,
    children,
    headerText,
    captionText,
    headerFontSize,
    hasInvertTextColor,
    overlayContentWidth,
    textAlignment,
    darkeningMask,
    darkeningMaskColor = "#000000",
    darkeningMaskOpacity = 0,
    darkeningVignette,
    overlayMedia,
    overlayMediaPosition,
    overlayMediaMaxHeight,
    overlayMediaMaxWidth,
    overlayMediaMargin,
    backgroundFill,
    ...rest
  } = props;

  // Determine if backgroundFill is a color string or a React node
  const isBackgroundFillColorString =
    typeof backgroundFill === "string" && !isValidElement(backgroundFill);
  const isBackgroundFillReactNode = isValidElement(backgroundFill);

  return (
    <StyledHeroContainer
      ref={ref}
      heroHeight={heroHeight}
      backgroundFillColor={
        isBackgroundFillColorString ? backgroundFill : undefined
      }
      {...rest}
    >
      {isBackgroundFillReactNode && (
        <BackgroundFillContainer>{backgroundFill}</BackgroundFillContainer>
      )}

      {darkeningMask && (
        <DarkeningMask
          darkeningMaskColor={darkeningMaskColor}
          darkeningMaskOpacity={darkeningMaskOpacity}
        />
      )}

      {overlayMedia && (
        <OverlayMediaWrapper overlayMediaPosition={overlayMediaPosition}>
          <OverlayMedia
            overlayMediaPosition={overlayMediaPosition}
            overlayMediaMaxHeight={overlayMediaMaxHeight}
            overlayMediaMaxWidth={overlayMediaMaxWidth}
            overlayMediaMargin={overlayMediaMargin}
          >
            {overlayMedia}
          </OverlayMedia>
        </OverlayMediaWrapper>
      )}

      <OverlayContent
        overlayContentWidth={overlayContentWidth}
        textAlignment={textAlignment}
      >
        {headerText && (
          <HeroTitle
            headerFontSize={headerFontSize}
            hasInvertTextColor={hasInvertTextColor}
          >
            {headerText}
          </HeroTitle>
        )}
        {captionText && (
          <HeroCaption hasInvertTextColor={hasInvertTextColor}>
            {captionText}
          </HeroCaption>
        )}
        {children && <ContentSlot>{children}</ContentSlot>}
      </OverlayContent>

      {darkeningVignette && <DarkeningVignette />}
    </StyledHeroContainer>
  );
});

Hero.displayName = "Hero";

export default Hero;
