import { Args } from "@storybook/react-webpack5";
import { MEDIUM_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import ButtonV2 from "src/core/ButtonV2";
import RawContentCard, {
  ContentCardActions,
  ContentCardBody,
} from "src/core/ContentCard";

export const ContentCard = (props: Args): JSX.Element => {
  const { buttons, visualElementType, ...rest } = props;

  return (
    <RawContentCard visualElementType={visualElementType} {...rest}>
      <ContentCardBody>{MEDIUM_LOREM_IPSUM}</ContentCardBody>

      <ContentCardActions>
        {buttons && buttons.map((button: typeof ButtonV2) => button)}
      </ContentCardActions>
    </RawContentCard>
  );
};
