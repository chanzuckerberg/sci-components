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
}

/**
 * @see https://mui.com/material-ui/react-dialog/
 */
const ContentCardTitle = forwardRef<HTMLDivElement, ContentCardTitleProps>(
  function ContentCardTitle(props: ContentCardTitleProps, ref): JSX.Element {
    const { overlineText, titleText, subtitleText, metadataText } = props;

    return (
      <div ref={ref}>
        <StyledTitleWrapper>
          {overlineText && (
            <StyledOverlineText>{overlineText}</StyledOverlineText>
          )}
          {titleText && <StyledTitleText>{titleText}</StyledTitleText>}
          {subtitleText && (
            <StyledSubtitleText>{subtitleText}</StyledSubtitleText>
          )}
        </StyledTitleWrapper>
        {metadataText && (
          <StyledMetadataText>{metadataText}</StyledMetadataText>
        )}
      </div>
    );
  }
);

export default ContentCardTitle;
