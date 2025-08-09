import * as React from "react";
import { Args } from "@storybook/react";
import RawPanel from "src/core/Panel";
import Button from "src/core/Button";
import { Box, Typography } from "@mui/material";
import { LONG_LOREM_IPSUM } from "src/common/storybook/loremIpsum";

export const ScrollBehaviorDemo = (props: Args): JSX.Element => {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <Box sx={{ paddingBottom: 4 }}>
        <Button
          sdsStyle="icon"
          sdsSize="medium"
          sdsType="primary"
          icon="InfoCircle"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        />
      </Box>

      <RawPanel
        sdsType="overlay"
        open={open}
        closeButtonOnClick={() => {
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
        HeaderComponent={
          <Typography
            variant="h3"
            sx={{ margin: "0 !important", padding: "0 !important" }}
          >
            Scrollable Panel
          </Typography>
        }
        position="right"
        {...props}
      >
        {LONG_LOREM_IPSUM}
      </RawPanel>

      <Box>
        <Typography variant="h3">Scrollable Content</Typography>
        <p>{LONG_LOREM_IPSUM}</p>
        <p>{LONG_LOREM_IPSUM}</p>
        <p>{LONG_LOREM_IPSUM}</p>
        <p>{LONG_LOREM_IPSUM}</p>
        <p>{LONG_LOREM_IPSUM}</p>
      </Box>
    </>
  );
};
