import { Args } from "@storybook/react-webpack5";
import { MEDIUM_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import Button from "src/core/Button";
import ContentCard, {
  ContentCardActions,
  ContentCardBody,
} from "src/core/ContentCard";
import Icon from "src/core/Icon";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <ContentCard
      data-testid="content-card"
      visualElementType="icon"
      icon={<Icon sdsIcon="Compass" sdsSize="xl" />}
      titleText="Content Card Title"
      subtitleText="Content Card Subtitle"
      metadataText="Content Card Metadata"
      {...props}
    >
      <ContentCardBody>{MEDIUM_LOREM_IPSUM}</ContentCardBody>
      <ContentCardActions>
        <Button sdsStyle="minimal" sdsType="primary">
          Button
        </Button>
      </ContentCardActions>
    </ContentCard>
  );
};
