import { PopoverProps as RawPopoverProps, useTheme } from "@mui/material";
import { forwardRef } from "react";
import { StyledPopover } from "./style";
import { getSpaces } from "../styles";

export type PopoverProps = RawPopoverProps;

/**
 * @see https://mui.com/material-ui/react-popover/
 */
const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  function Popover(props, ref) {
    const theme = useTheme();
    const spaces = getSpaces({ theme });

    return (
      <StyledPopover
        ref={ref}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        transformOrigin={{ vertical: -(spaces?.s || 8), horizontal: 0 }}
        {...props}
      />
    );
  }
);

export default Popover;
