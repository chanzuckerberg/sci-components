import { Args } from "@storybook/react-webpack5";
import { Box } from "@mui/material";
import RawHero from "src/core/Hero";
import Button from "src/core/Button";

export const ResponsiveDemo = (props: Args): JSX.Element => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Large Hero */}
      <Box>
        <h3>Large Maximum Width</h3>
        <RawHero
          headerText="Large Hero Section"
          captionText="This hero uses the large maximum width setting which provides more space for content on wider screens."
          maxWidth="large"
          {...props}
        >
          <Button sdsType="primary" sdsStyle="rounded">
            Get Started
          </Button>
        </RawHero>
      </Box>

      {/* Medium Hero */}
      <Box>
        <h3>Medium Maximum Width</h3>
        <RawHero
          headerText="Medium Hero Section"
          captionText="This hero uses a medium maximum width for more constrained layouts."
          maxWidth="medium"
          {...props}
        >
          <Button sdsType="secondary" sdsStyle="rounded">
            Learn More
          </Button>
        </RawHero>
      </Box>

      {/* Small Hero */}
      <Box>
        <h3>Small Maximum Width</h3>
        <RawHero
          headerText="Compact Hero"
          captionText="This hero is configured with a small maximum width for very focused layouts."
          maxWidth="small"
          {...props}
        >
          <Button sdsType="primary" sdsStyle="minimal">
            Explore
          </Button>
        </RawHero>
      </Box>
    </Box>
  );
};
