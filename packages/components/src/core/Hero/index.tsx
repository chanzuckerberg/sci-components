import React from "react";
import { CardMedia, CardMediaProps } from "@mui/material";
import {
  StyledHeroContainer,
  StyledContentWrapper,
  StyledHeaderText,
  StyledCaptionText,
  StyledContentArea,
  StyledPlaceholder,
  StyledBackgroundWrapper,
} from "./style";
import { HeroProps } from "./Hero.types";

export type { HeroProps };

const Hero = React.forwardRef<HTMLElement, HeroProps>((props, ref) => {
  const {
    headerText,
    captionText,
    children,
    maxWidth = "large",
    className,
    useContainerMargin = true,
    "data-testid": dataTestId = "hero",
    height,
    backgroundFill,
    ...restProps
  } = props;

  /**
   * Handle different types of backgroundFill similar to ContentCard image handling
   * - If it's a string, treat it as a color or URL
   * - If it's a CardMedia component, clone it and apply hero-specific styles
   * - If it's any other valid React element, clone it and apply styles
   * - If it's null/undefined, return null
   */
  const renderBackgroundFill = () => {
    if (!backgroundFill) return null;

    if (typeof backgroundFill === "string") {
      // If it's a string, check if it's a URL or color
      const isUrl =
        backgroundFill.startsWith("http") ||
        backgroundFill.startsWith("/") ||
        backgroundFill.startsWith("./");

      if (isUrl) {
        return (
          <CardMedia
            component="img"
            src={backgroundFill}
            alt="Hero Background"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              zIndex: -1,
            }}
          />
        );
      } else {
        // It's a color string, handled by CSS
        return null;
      }
    } else if (
      React.isValidElement(backgroundFill) &&
      backgroundFill.type === CardMedia
    ) {
      // If it's already a CardMedia component, clone it and apply hero-specific styles
      return React.cloneElement(
        backgroundFill as React.ReactElement<CardMediaProps>,
        {
          sx: {
            ...(backgroundFill.props as CardMediaProps).sx,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: -1,
          },
        }
      );
    } else if (React.isValidElement(backgroundFill)) {
      // If it's any other valid React element, clone it and apply hero-specific styles
      return React.cloneElement(backgroundFill as React.ReactElement, {
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: -1,
          ...(backgroundFill.props as { style?: React.CSSProperties }).style,
        },
      });
    }

    return null;
  };

  return (
    <StyledHeroContainer
      ref={ref}
      className={className}
      maxWidth={maxWidth}
      useContainerMargin={useContainerMargin}
      data-testid={dataTestId}
      height={height}
      backgroundFill={backgroundFill}
      {...restProps}
    >
      <StyledBackgroundWrapper>
        {renderBackgroundFill()}
      </StyledBackgroundWrapper>
      <StyledContentWrapper maxWidth={maxWidth}>
        {headerText && <StyledHeaderText>{headerText}</StyledHeaderText>}

        {captionText && <StyledCaptionText>{captionText}</StyledCaptionText>}

        {children ? (
          <StyledContentArea>{children}</StyledContentArea>
        ) : (
          <StyledContentArea>
            <StyledPlaceholder>Content area (placeholder)</StyledPlaceholder>
          </StyledContentArea>
        )}
      </StyledContentWrapper>
    </StyledHeroContainer>
  );
});

Hero.displayName = "Hero";

export default Hero;
