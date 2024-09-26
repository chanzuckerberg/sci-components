import { Box, useTheme } from "@mui/material";
import { Args } from "@storybook/react";
import React, { useState } from "react";
import { LONG_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import Button from "src/core/Button";
import Callout from "src/core/Callout";
import CalloutTitle from "src/core/Callout/components/CalloutTitle";
import RawPanel, { PanelProps } from "src/core/Panel";

const InvalidBasicPanelPropsError = (
  <Callout intent="negative">
    <CalloutTitle>Invalid Props!</CalloutTitle>
    <p>
      The <strong>Basic</strong> Panel only supports <strong>left</strong> or{" "}
      <strong>right</strong> positions. Please update the{" "}
      <strong>position</strong> prop to one of these valid values.
    </p>
  </Callout>
);

const Main = (
  props: PanelProps & { open: boolean; children?: React.ReactNode }
) => {
  const { open, sdsType, position, children, width } = props;

  const margin =
    sdsType === "basic"
      ? position === "left"
        ? `0 0 0 ${width}`
        : position === "right"
          ? `0 ${width} 0 0`
          : "0" // Default to 0 if neither left nor right
      : "0"; // Default to 0 for non-basic panels

  return (
    <Box
      sx={{
        margin: open ? margin : "none",
      }}
    >
      {children}
    </Box>
  );
};

export const Panel = (props: Args): JSX.Element => {
  const { sdsType, position } = props;

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        alignItems: "center",
        border: `dashed 1px ${theme?.palette?.sds?.base?.divider}`,
        color: theme?.palette?.sds?.base?.textSecondary,
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
      role="presentation"
    >
      [Panel Content]
    </Box>
  );

  const HeaderComponent = (
    <Box
      sx={{
        alignItems: "center",
        border: `dashed 1px ${theme?.palette?.sds?.base?.divider}`,
        color: theme?.palette?.sds?.base?.textSecondary,
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      [Panel Header]
    </Box>
  );

  if (sdsType === "basic" && position === "bottom") {
    return InvalidBasicPanelPropsError;
  }

  return (
    <>
      <RawPanel
        sdsType={sdsType}
        open={open}
        closeButtonOnClick={toggleDrawer(false)}
        headerComponent={HeaderComponent}
        disableScrollLock={true}
        ModalProps={{ disableScrollLock: true }}
        {...props}
      >
        {DrawerList}
      </RawPanel>

      <Main open={open} {...props}>
        <Button
          sdsType="primary"
          sdsStyle="icon"
          icon="InfoCircle"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Panel Toggle"
        >
          Toggle Panel
        </Button>

        <p>{LONG_LOREM_IPSUM}</p>
        <p>{LONG_LOREM_IPSUM}</p>
        <p>{LONG_LOREM_IPSUM}</p>
        <p>{LONG_LOREM_IPSUM}</p>
      </Main>
    </>
  );
};
