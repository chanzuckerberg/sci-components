import { forwardRef, ReactNode } from "react";
import {
  StyledOverlineText,
  StyledTitleText,
  StyledSubtitleText,
  StyledMetadataText,
  StyledTitleWrapper,
} from "./style";
import { EMPTY_OBJECT, cn } from "src/common/utils";
import { BaseContentCardProps } from "src/core/ContentCard/ContentCard.types";

export interface ContentCardTitleProps
  extends Pick<
    BaseContentCardProps,
    "overlineText" | "titleText" | "subtitleText" | "metadataText"
  > {
  classes?: {
    cardHeader?: string;
    cardOverline?: string;
    cardTitle?: string;
    cardSubtitle?: string;
    cardMetadata?: string;
  };
}

interface TextComponentProps {
  text: string | ReactNode;
  className?: string;
}

type StyledTextComponentProps = {
  className?: string;
  children: ReactNode;
};

const createTextComponent = (
  StyledComponent: React.ComponentType<StyledTextComponentProps>
) => {
  return ({ text, className }: TextComponentProps) => {
    if (!text) return null;

    return typeof text === "string" ? (
      <StyledComponent className={cn(className)}>{text}</StyledComponent>
    ) : (
      text
    );
  };
};

const OverlineText = createTextComponent(StyledOverlineText);
const TitleText = createTextComponent(StyledTitleText);
const SubtitleText = createTextComponent(StyledSubtitleText);
const MetadataText = createTextComponent(StyledMetadataText);

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
        <StyledTitleWrapper className={cn(cardHeader)}>
          <OverlineText text={overlineText} className={cardOverline} />
          <TitleText text={titleText} className={cardTitle} />
          <SubtitleText text={subtitleText} className={cardSubtitle} />
        </StyledTitleWrapper>
        <MetadataText text={metadataText} className={cardMetadata} />
      </div>
    );
  }
);

export default ContentCardTitle;
