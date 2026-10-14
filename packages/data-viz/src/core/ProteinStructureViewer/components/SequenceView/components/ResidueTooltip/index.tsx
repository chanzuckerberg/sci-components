import {
  Tooltip,
  defaultTheme,
  getSemanticColors,
  getSpaces,
} from "@czi-sds/components";
import { useTheme } from "@mui/material";
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
  const theme = useTheme();
  const semanticColors = getSemanticColors({ theme });
  const residueTooltipBackgroundColor = semanticColors?.base?.backgroundPrimary;
  const residueTooltipTextColor = semanticColors?.base?.textPrimary;

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
        tooltip: {
          // The text color is set inline alongside the background rather than
          // left to the SDS Tooltip's own class. Only the background is forced
          // here, so a host app whose cascade outranks that class -- an emotion
          // cache inside a CSS layer, say -- keeps MUI's default white text,
          // which pairs with MUI's default dark surface and disappears against
          // this light one.
          style: {
            backgroundColor: residueTooltipBackgroundColor,
            color: residueTooltipTextColor,
          },
        },
        arrow: {
          style: {
            color: residueTooltipBackgroundColor,
          },
        },
      }}
      title={label}
    >
      <span style={{ height: 0, position: "fixed", width: 0 }} />
    </Tooltip>
  );
});

export default ResidueTooltip;
