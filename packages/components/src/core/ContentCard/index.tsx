import React, { useRef, useEffect, useState } from "react";
import {
  StyledCard,
  StyledCardActionArea,
  StyledCardContent,
  StyledCardContentAligner,
  StyledContentCardBody,
  StyledIconMediaWrapper,
} from "./style";
import ContentCardTitle from "./components/ContentCardTitle";
import ContentCardActions from "./components/ContentCardActions";
import { mergeRefs } from "src/common/utils";
import ContentCardImageMedia from "./components/ContentCardImageMedia";
import {
  CONTENT_CARD_DEFAULT_IMAGE_MEDIA_SIZE,
  CONTENT_CARD_WIDE_TYPE_MIN_WIDTH_HIGH_BOUNDARY,
  CONTENT_CARD_WIDE_TYPE_MIN_WIDTH_LOW_BOUNDARY,
  ContentCardProps,
} from "./ContentCard.types";

export { ContentCardActions, StyledContentCardBody as ContentCardBody };

export type { ContentCardProps };

const useResponsiveWidth = (initialSdsType: "wide" | "narrow") => {
  const [isNarrow, setIsNarrow] = useState(false);

  const handleResize = (width: number) => {
    if (width < CONTENT_CARD_WIDE_TYPE_MIN_WIDTH_LOW_BOUNDARY && !isNarrow) {
      setIsNarrow(true);
    } else if (
      width > CONTENT_CARD_WIDE_TYPE_MIN_WIDTH_HIGH_BOUNDARY &&
      isNarrow
    ) {
      setIsNarrow(false);
    }
  };

  return {
    dynamicSdsType: isNarrow ? "narrow" : initialSdsType,
    handleResize,
    isNarrow,
  };
};

/**
 * (masoudmanson): This function is used to add the clickableCard and
 * buttonsPosition props to the ContentCardActions sub-component.
 */
const enhanceChildrenWithCardActionsProps = (
  children: React.ReactNode,
  clickableCard: boolean,
  buttonsPosition: ContentCardProps["buttonsPosition"]
) => {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === ContentCardActions) {
      return React.cloneElement(child, {
        ...child.props,
        buttonsPosition,
        clickableCard,
      });
    }
    return child;
  });
};

/**
 * @see https://mui.com/material-ui/react-card/
 */
const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>(
  (props, ref) => {
    const {
      visualElementType = "none",
      image,
      icon,
      imagePadding = false,
      imageSize = CONTENT_CARD_DEFAULT_IMAGE_MEDIA_SIZE,
      overlineText,
      titleText,
      subtitleText,
      metadataText,
      boundingBox: propsBoundingBox = true,
      children,
      sdsType = "wide",
      clickableCard = false,
      imagePosition = "left",
      buttonsPosition = "left",
    } = props;

    // Force boundingBox to be true when clickableCard is true
    const boundingBox = clickableCard ? true : propsBoundingBox;

    const cardRef = useRef<HTMLDivElement>(null);
    const { handleResize, dynamicSdsType } = useResponsiveWidth(sdsType);

    useEffect(() => {
      const element = cardRef.current;
      if (!element) return;

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          handleResize(entry.contentRect.width);
        }
      });

      resizeObserver.observe(element);

      return () => {
        resizeObserver.disconnect();
      };
    }, [handleResize]);

    const visualElement =
      visualElementType === "image" && image ? (
        <ContentCardImageMedia
          imagePadding={imagePadding}
          boundingBox={boundingBox}
          sdsType={dynamicSdsType}
          imageSize={imageSize}
          image={image}
          imagePosition={imagePosition}
        />
      ) : visualElementType === "icon" && icon ? (
        <StyledIconMediaWrapper boundingBox={boundingBox}>
          {icon}
        </StyledIconMediaWrapper>
      ) : null;

    const cardInnerContent = (
      <>
        {visualElement}
        <StyledCardContent
          boundingBox={boundingBox}
          clickableCard={clickableCard}
        >
          <ContentCardTitle
            overlineText={overlineText}
            titleText={titleText}
            subtitleText={subtitleText}
            metadataText={metadataText}
          />
          <StyledCardContentAligner>
            {enhanceChildrenWithCardActionsProps(
              children,
              clickableCard,
              buttonsPosition
            )}
          </StyledCardContentAligner>
        </StyledCardContent>
      </>
    );

    return (
      <StyledCard
        ref={mergeRefs([ref, cardRef])}
        {...props}
        sdsType={dynamicSdsType}
        boundingBox={boundingBox}
      >
        {clickableCard ? (
          <StyledCardActionArea
            sdsType={dynamicSdsType}
            visualElementType={visualElementType}
            imagePosition={imagePosition}
          >
            {cardInnerContent}
          </StyledCardActionArea>
        ) : (
          cardInnerContent
        )}
      </StyledCard>
    );
  }
);

export default ContentCard;
