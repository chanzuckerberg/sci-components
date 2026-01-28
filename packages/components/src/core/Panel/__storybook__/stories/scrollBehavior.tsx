import * as React from "react";
import { Args } from "@storybook/react-webpack5";
import RawPanel from "src/core/Panel";
import { Box, Typography } from "@mui/material";
import { LONG_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import Icon from "src/core/Icon";
import ButtonToggle from "src/core/ButtonToggle";

export const ScrollBehaviorDemo = (props: Args): JSX.Element => {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <Box sx={{ paddingBottom: 4 }}>
        <ButtonToggle
          aria-label="button-toggle"
          startIcon={<Icon sdsIcon="InfoCircle" sdsSize="s" />}
          size="large"
          sdsType="primary"
          sdsStyle="minimal"
          onClick={() => setOpen((prev) => !prev)}
          sdsStage={open ? "on" : "off"}
          backgroundOnHover
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
