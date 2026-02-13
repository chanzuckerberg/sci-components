import { useTheme } from "@mui/material";
import { Args } from "@storybook/react-webpack5";
import React from "react";
import Button from "src/core/Button";
import RawPopover from "src/core/Popover";
import { SDSTheme } from "src/core/styles";

export const Popover = (props: Args): JSX.Element => {
  const theme = useTheme<SDSTheme>();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "sds-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        sdsStyle="outline"
        sdsType="primary"
        size="large"
        onClick={handleClick}
      >
        Open Popover
      </Button>
      <RawPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        {...props}
      >
        <div
          style={{
            padding: theme?.app?.spacing?.xl,
            border: `dashed 1px ${theme?.palette?.sds?.base?.divider}`,
          }}
        >
          The content of the Popover
          <br /> passed to the Popover component as children.
        </div>
      </RawPopover>
    </div>
  );
};
