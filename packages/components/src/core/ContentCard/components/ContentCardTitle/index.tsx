import { forwardRef } from "react";
import {
  StyledOverlineText,
  StyledTitleText,
  StyledSubtitleText,
  StyledMetadataText,
  StyledTitleWrapper,
} from "./style";
import { EMPTY_OBJECT } from "src/common/utils";

export interface ContentCardTitleProps {
  overlineText?: string;
  titleText?: string;
  subtitleText?: string;
  metadataText?: string;
  classes?: {
    cardHeader?: string;
    cardOverline?: string;
    cardTitle?: string;
    cardSubtitle?: string;
    cardMetadata?: string;
  };
}

/**
 * @see https://mui.com/material-ui/react-dialog/
 */
const ContentCardTitle = forwardRef<HTMLDivElement, ContentCardTitleProps>(
  function ContentCardTitle(props: ContentCardTitleProps, ref): JSX.Element {
    const {
      overlineText,
      titleText,
      subtitleText,
      metadataText,
      classes = EMPTY_OBJECT,
    } = props;

    const {
      cardHeader,
      cardOverline,
      cardTitle,
      cardSubtitle,
      cardMetadata,
    }: ContentCardTitleProps["classes"] = classes;

    return (
      <div ref={ref}>
        <StyledTitleWrapper className={cardHeader}>
          {overlineText && (
            <StyledOverlineText className={cardOverline}>
              {overlineText}
            </StyledOverlineText>
          )}
          {titleText && (
            <StyledTitleText className={cardTitle}>{titleText}</StyledTitleText>
          )}
          {subtitleText && (
            <StyledSubtitleText className={cardSubtitle}>
              {subtitleText}
            </StyledSubtitleText>
          )}
        </StyledTitleWrapper>
        {metadataText && (
          <StyledMetadataText className={cardMetadata}>
            {metadataText}
          </StyledMetadataText>
        )}
      </div>
    );
  }
);

export default ContentCardTitle;
