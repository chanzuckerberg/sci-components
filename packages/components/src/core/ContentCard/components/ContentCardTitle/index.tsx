import { forwardRef } from "react";
import {
  StyledOverlineText,
  StyledTitleText,
  StyledSubtitleText,
  StyledMetadataText,
  StyledTitleWrapper,
} from "./style";

export interface ContentCardTitleProps {
  overlineText?: string;
  titleText?: string;
  subtitleText?: string;
  metadataText?: string;
  classes?: {
    cardHeader?: string;
    overlineText?: string;
    titleText?: string;
    subtitleText?: string;
    metadataText?: string;
  };
}

/**
 * @see https://mui.com/material-ui/react-dialog/
 */
const ContentCardTitle = forwardRef<HTMLDivElement, ContentCardTitleProps>(
  function ContentCardTitle(props: ContentCardTitleProps, ref): JSX.Element {
    const { overlineText, titleText, subtitleText, metadataText, classes } =
      props;

    return (
      <div ref={ref}>
        <StyledTitleWrapper className={classes?.cardHeader}>
          {overlineText && (
            <StyledOverlineText className={classes?.overlineText}>
              {overlineText}
            </StyledOverlineText>
          )}
          {titleText && (
            <StyledTitleText className={classes?.titleText}>
              {titleText}
            </StyledTitleText>
          )}
          {subtitleText && (
            <StyledSubtitleText className={classes?.subtitleText}>
              {subtitleText}
            </StyledSubtitleText>
          )}
        </StyledTitleWrapper>
        {metadataText && (
          <StyledMetadataText className={classes?.metadataText}>
            {metadataText}
          </StyledMetadataText>
        )}
      </div>
    );
  }
);

export default ContentCardTitle;
