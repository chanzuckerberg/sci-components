import { Args } from "@storybook/react-vite";
import React from "react";
import Button from "@components/src/core/Button";
import RawPopover from "@components/src/core/Popover";

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
