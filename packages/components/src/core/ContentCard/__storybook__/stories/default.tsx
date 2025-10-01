import { Args } from "@storybook/types";
import { MEDIUM_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import Button from "src/core/Button";
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
        {buttons && buttons.map((button: typeof Button) => button)}
      </ContentCardActions>
    </RawContentCard>
  );
};
