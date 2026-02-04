import * as React from "react";
import { Args } from "@storybook/react-webpack5";
import RawPanel from "src/core/Panel";
import Button from "src/core/Button";
import { Box, Typography } from "@mui/material";
import { LONG_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import Icon from "src/core/Icon";
import ButtonToggle from "src/core/ButtonToggle";

export const CustomHeaderAndCloseButtonDemo = (props: Args): JSX.Element => {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <Box sx={{ padding: 4 }}>
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
            Panel Header
          </Typography>
        }
        CloseButtonComponent={
          <Button
            sdsStyle="minimal"
            size="large"
            sdsType="secondary"
            data-testid="panel-close-button"
            aria-label="Panel Toggle"
            backgroundOnHover={false}
          >
            <Icon sdsIcon="ChevronLeft" sdsSize="l" />
          </Button>
        }
        data-testid="panel"
        {...props}
      >
        {LONG_LOREM_IPSUM}
      </RawPanel>
    </>
  );
};
