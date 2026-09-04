import { Tooltip, defaultTheme, getSpaces } from "@czi-sds/components";
import { forwardRef, useImperativeHandle, useState } from "react";

/**
 * Pull the tooltip toward the residue by the SDS `m` spacing token. Spacing
 * tokens are theme-invariant, so reading from the light theme is fine; popper's
 * offset modifier needs a number, hence deriving it from the token.
 */
const MAIN_AXIS_OFFSET = -(getSpaces({ theme: defaultTheme })?.m ?? 12);

interface ResidueTooltipState {
  anchorEl: HTMLElement | null;
  label: string;
}

export interface ResidueTooltipHandle {
  show: (anchorEl: HTMLElement, label: string) => void;
  hide: () => void;
}

/**
 * A single controlled tooltip anchored to the residue span currently under the
 * cursor. Driven imperatively through its ref so that hover updates re-render
 * only the tooltip, not the residue grid.
 */
const ResidueTooltip = forwardRef<ResidueTooltipHandle>((_props, ref) => {
  const [{ anchorEl, label }, setState] = useState<ResidueTooltipState>({
    anchorEl: null,
    label: "",
  });

  useImperativeHandle(
    ref,
    () => ({
      hide: () =>
        setState((prev) =>
          prev.anchorEl === null ? prev : { ...prev, anchorEl: null }
        ),
      show: (nextAnchorEl, nextLabel) =>
        setState({ anchorEl: nextAnchorEl, label: nextLabel }),
    }),
    []
  );

  return (
    <Tooltip
      arrow
      disableInteractive
      open={anchorEl !== null}
      placement="top"
      // The child below is a required MUI anchor placeholder; the popper is
      // positioned against the hovered residue span passed in via anchorEl.
      // The negative offset pulls the tooltip closer to the residue than the
      // default gap.
      slotProps={{
        popper: {
          anchorEl,
          modifiers: [
            {
              name: "offset",
              options: { offset: [0, MAIN_AXIS_OFFSET] },
            },
          ],
        },
      }}
      title={label}
    >
      <span style={{ height: 0, position: "fixed", width: 0 }} />
    </Tooltip>
  );
});

export default ResidueTooltip;
