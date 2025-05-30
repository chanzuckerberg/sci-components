import React, { useRef, useEffect, useState } from "react";
import { CardMedia, CardMediaProps } from "@mui/material";
import {
  StyledCard,
  StyledCardActionArea,
  StyledCardContent,
  StyledCardContentAligner,
  StyledContentCardBody,
  StyledIconMediaWrapper,
} from "./style";
import ContentCardTitle, {
  ContentCardTitleProps,
} from "./components/ContentCardTitle";
import ContentCardActions, {
  ContentCardActionsProps,
} from "./components/ContentCardActions";
import { EMPTY_OBJECT, mergeRefs } from "src/common/utils";
import ContentCardImageMedia from "./components/ContentCardImageMedia";
import {
  CONTENT_CARD_DEFAULT_IMAGE_MEDIA_SIZE,
  CONTENT_CARD_WIDE_TYPE_MIN_WIDTH_HIGH_BOUNDARY,
  CONTENT_CARD_WIDE_TYPE_MIN_WIDTH_LOW_BOUNDARY,
  ContentCardProps,
} from "./ContentCard.types";
import {
  StyledTitleText,
  StyledSubtitleText,
  StyledMetadataText,
  StyledOverlineText,
} from "./components/ContentCardTitle/style";

export {
  ContentCardActions,
  StyledContentCardBody as ContentCardBody,
  CardMedia as ContentCardMedia,
  StyledTitleText as ContentCardTitle,
  StyledSubtitleText as ContentCardSubtitle,
  StyledMetadataText as ContentCardMetadata,
  StyledOverlineText as ContentCardOverline,
};

export type {
  ContentCardProps,
  CardMediaProps as ContentCardMediaProps,
  ContentCardActionsProps,
  ContentCardTitleProps,
};

const useResponsiveWidth = (initialSdsType: ContentCardProps["sdsType"]) => {
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
  buttonsPosition: ContentCardProps["buttonsPosition"],
  classes?: {
    cardActions?: string;
  }
) => {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === ContentCardActions) {
      return React.cloneElement(child, {
        ...child.props,
        buttonsPosition,
        classes,
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
      clickableCardProps,
      classes = EMPTY_OBJECT,
    } = props;

    const {
      cardMedia,
      cardContent,
      cardHeader,
      cardMetadata,
      cardOverline,
      cardSubtitle,
      cardTitle,
      cardActions,
      cardPaper,
      clickableCardButton,
    }: ContentCardProps["classes"] = classes;

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
          className={cardMedia}
        />
      ) : visualElementType === "icon" && icon ? (
        <StyledIconMediaWrapper boundingBox={boundingBox} className={cardMedia}>
          {icon}
        </StyledIconMediaWrapper>
      ) : null;

    const cardInnerContent = (
      <>
        {visualElement}
        <StyledCardContent
          boundingBox={boundingBox}
          clickableCard={clickableCard}
          className={cardContent}
        >
          <ContentCardTitle
            overlineText={overlineText}
            titleText={titleText}
            subtitleText={subtitleText}
            metadataText={metadataText}
            classes={{
              cardHeader,
              cardMetadata,
              cardOverline,
              cardSubtitle,
              cardTitle,
            }}
          />
          <StyledCardContentAligner>
            {enhanceChildrenWithCardActionsProps(
              children,
              clickableCard,
              buttonsPosition,
              {
                cardActions: cardActions,
              }
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
        className={cardPaper}
      >
        {clickableCard ? (
          <StyledCardActionArea
            {...clickableCardProps}
            // (masoudmanson): The following props are for internal use only and should not be user editable.
            // To prevent users from overriding them, we use the spread operator to pass user provided props
            // to the StyledCardActionArea component on top while hardcoding the rest after it.
            sdsStyle="minimal"
            cardSdsType={dynamicSdsType}
            visualElementType={visualElementType}
            imagePosition={imagePosition}
            className={clickableCardButton}
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
