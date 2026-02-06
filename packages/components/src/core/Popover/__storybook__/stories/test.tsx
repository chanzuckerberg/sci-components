import { Args } from "@storybook/react-webpack5";
import React from "react";
import Button from "src/core/Button";
import RawPopover from "src/core/Popover";

export const TestDemo = (props: Args): JSX.Element => {
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

  return (
    <div>
      <Button
        sdsStyle="minimal"
        sdsType="primary"
        size="large"
        onClick={handleClick}
        data-testid="popover-trigger"
      >
        Open Popover
      </Button>
      <RawPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        data-testid="popover"
        {...props}
      >
        <div data-testid="popover-content">Popover content</div>
      </RawPopover>
    </div>
  );
};
