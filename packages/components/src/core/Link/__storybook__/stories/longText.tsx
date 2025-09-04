import { Typography } from "@mui/material";
import { LONG_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import Callout from "src/core/Callout";
import Icon from "src/core/Icon";
import RawLink from "src/core/Link";

export const LongerTextDemo = (): JSX.Element => {
  return (
    <>
      <Callout
        intent="negative"
        title="Deprecated!"
        sdsStyle="persistent"
        icon={<Icon sdsIcon="ExclamationMarkCircle" sdsSize="s" />}
        body={
          <>
            The <strong>Link</strong> component is deprecated!
            <br />
            Please use <strong>Link Typography</strong> instead.
          </>
        }
      />
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
