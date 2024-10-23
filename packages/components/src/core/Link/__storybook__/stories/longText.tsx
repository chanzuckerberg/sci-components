import { Typography } from "@mui/material";
import { LONG_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import RawLink from "src/core/Link";

export const LongerTextDemo = (): JSX.Element => {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Default Link with Long Text
      </Typography>
      <RawLink href="#" sdsStyle="default">
        {LONG_LOREM_IPSUM}
      </RawLink>

      <Typography variant="h4" sx={{ mb: 2, mt: 6 }}>
        Dashed Link with Long Text
      </Typography>
      <RawLink href="#" sdsStyle="dashed">
        {LONG_LOREM_IPSUM}
      </RawLink>
    </>
  );
};
