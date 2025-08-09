import * as React from "react";
import { Args } from "@storybook/react";
import RawPanel from "src/core/Panel";
import Button from "src/core/Button";
import { Box, Typography } from "@mui/material";
import { LONG_LOREM_IPSUM } from "src/common/storybook/loremIpsum";

export const CustomHeaderAndCloseButtonDemo = (props: Args): JSX.Element => {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <Box sx={{ padding: 4 }}>
        <Button
          sdsStyle="icon"
          sdsSize="medium"
          sdsType="primary"
          icon="InfoCircle"
          onClick={() => {
            setOpen(true);
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
            Panel Header
          </Typography>
        }
        CloseButtonComponent={
          <Button
            sdsStyle="icon"
            sdsSize="medium"
            sdsType="tertiary"
            icon="ChevronLeft"
            data-testid="panel-close-button"
            aria-label="Panel Toggle"
          />
        }
        data-testid="panel"
        {...props}
      >
        {LONG_LOREM_IPSUM}
      </RawPanel>
    </>
  );
};
