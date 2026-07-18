import { Args } from "@storybook/react-vite";
import { MEDIUM_LOREM_IPSUM } from "@components/src/common/storybook/loremIpsum";
import Button from "@components/src/core/Button";
import ContentCard, {
  ContentCardActions,
  ContentCardBody,
} from "@components/src/core/ContentCard";
import Icon from "@components/src/core/Icon";

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
        <Button sdsStyle="minimal" sdsType="primary" size="large">
          Button
        </Button>
      </ContentCardActions>
    </ContentCard>
  );
};
