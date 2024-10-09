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
  props: Pick<PanelProps, "width" | "sdsType" | "position"> & {
    open: boolean;
    children?: React.ReactNode;
  }
) => {
  const { open, sdsType, position = "left", children, width } = props;

  const positionMarginMap = {
    bottom: "0",
    left: `0 0 0 ${width}`,
    right: `0 ${width} 0 0`,
  };

  /**
   * (masoudmanson): Default to 0 for non-basic panels.
   */
  const margin = sdsType === "basic" ? positionMarginMap[position] : "0";

  return (
    <Box
      sx={{
        margin: open ? margin : "0",
      }}
    >
      {children}
    </Box>
  );
};

export const Panel = (props: Args): JSX.Element => {
  const { sdsType = "basic", position = "left" } = props;

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const commonBoxStyles = {
    alignItems: "center",
    border: `dashed 1px ${theme?.palette?.sds?.base?.divider}`,
    color: theme?.palette?.sds?.base?.textSecondary,
    display: "flex",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  };

  const DrawerList = (
    <Box sx={commonBoxStyles} role="presentation">
      [Panel Content]
    </Box>
  );

  const HeaderComponent = <Box sx={commonBoxStyles}>[Panel Header]</Box>;

  if (sdsType === "basic" && position === "bottom") {
    return InvalidBasicPanelPropsError;
  }

  return (
    <>
      <RawPanel
        sdsType={sdsType}
        open={open}
        closeButtonOnClick={() => setOpen(false)}
        HeaderComponent={HeaderComponent}
        {...props}
      >
        {DrawerList}
      </RawPanel>

      <Main open={open} sdsType={sdsType} {...props}>
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
