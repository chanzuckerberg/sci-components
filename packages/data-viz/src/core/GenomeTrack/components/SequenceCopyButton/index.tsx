import { Menu, MenuItem } from "@czi-sds/components";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TrackSequenceCopy, TrackSequenceCopyButton } from "../../style";

/** How long the control shows a tick before returning to the copy icon. */
const CONFIRM_MS = 2000;

export const COPY_TEST_ID = "genome-track-copy-sequence";
export const COPY_VISIBLE_TEST_ID = "genome-track-copy-visible";
export const COPY_FULL_TEST_ID = "genome-track-copy-full";

interface SequenceCopyButtonProps {
  /**
   * The letters inside the current viewport.
   *
   * Kept separate from `fullSequence` rather than sliced on demand, because
   * which of the two a user wants is genuinely ambiguous — the row draws one
   * and the payload holds the other — and the menu exists to stop the control
   * guessing.
   */
  visibleSequence: string;
  /** Every letter the payload carries, whatever is on screen. */
  fullSequence: string;
  /** The visible range, named in the menu so the choice is concrete. */
  visibleRange: string;
  /** The payload's range, likewise. */
  fullRange: string;
  /** Top edge of the control's line, in px, relative to the plot area. */
  top: number;
  /** Height of that line, so the control can centre on it. */
  height: number;
  density: "comfortable" | "compact";
}

/**
 * SDS button size per density, and the icon size that goes with it.
 *
 * SDS fixes both: a `medium` minimal button is 28 px tall and sizes its icon to
 * `iconSizes.xs`, a `small` one is 24 px and uses `iconSizes.xxs`. The pixel
 * values are passed to the Phosphor icon so the glyph is drawn at the size SDS
 * is going to lay out for it rather than at Phosphor's `1em` default.
 */
const CONTROL = {
  comfortable: { icon: 12, size: "medium" as const },
  compact: { icon: 10, size: "small" as const },
};

/**
 * Copies the sequence, offering the visible range or the whole payload.
 *
 * A real button, not a canvas affordance: it needs a focus ring, a tab stop and
 * an accessible name, none of which a drawn rectangle can have.
 *
 * It renders beside the plot rather than inside it, layered onto the sequence
 * section's header line. Inside, it would be an interactive descendant of the
 * plot's `role="img"` — which assistive technology may not expose at all — and
 * its pointer events would reach the plot's drag handler, where a press would
 * start a pan and a release would read as a click on empty space and clear the
 * selection.
 *
 * The two choices are a menu rather than one button because a single control
 * has to pick, and either choice is wrong half the time: copying only what is
 * on screen surprises anyone who zoomed in to read a detail and wanted the
 * region, and copying the whole payload surprises anyone who framed a range
 * deliberately. Naming both ranges in the menu means the user never has to
 * infer which they got.
 */
export const SequenceCopyButton = ({
  density,
  fullRange,
  fullSequence,
  height,
  top,
  visibleRange,
  visibleSequence,
}: SequenceCopyButtonProps): JSX.Element => {
  const control = CONTROL[density];
  const [copied, setCopied] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const copy = useCallback(async (text: string) => {
    setAnchor(null);

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard writes reject without a secure context or a user gesture the
      // browser recognises. Leaving the icon alone is the honest outcome: a
      // tick for a copy that did not happen is worse than no feedback.
      return;
    }

    setCopied(true);

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), CONFIRM_MS);
  }, []);

  return (
    <TrackSequenceCopy style={{ height, top }}>
      {/*
       * An SDS minimal `secondary` button, so the resting grey, the hover and
       * press washes, the focus ring and the sizing are all SDS's own. Only the
       * icon's interaction colour is overridden, to the accent ramp — see
       * `TrackSequenceCopyButton` for why that cannot come from a variant.
       *
       * The icon goes through `startIcon` with no children rather than as a
       * child, which is what makes it an icon-only button: `Button` derives
       * that from `startIcon && !children`. Passing it as a child would not
       * work — `isIconOnlyChild` only recognises the deprecated SDS `Icon`
       * component, an `svg` intrinsic, or a child carrying `sdsIcon`/`sdsSize`,
       * and a Phosphor icon is none of those, so the control would be laid out
       * as a text button.
       */}
      <TrackSequenceCopyButton
        aria-expanded={anchor !== null}
        aria-haspopup="menu"
        aria-label={copied ? "Sequence copied" : "Copy sequence"}
        data-testid={COPY_TEST_ID}
        onClick={(event) => setAnchor(event.currentTarget)}
        sdsStyle="minimal"
        sdsType="secondary"
        size={control.size}
        startIcon={
          copied ? (
            <CheckIcon size={control.icon} />
          ) : (
            <CopyIcon size={control.icon} />
          )
        }
      />

      <Menu
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        open={anchor !== null}
      >
        <MenuItem
          data-testid={COPY_VISIBLE_TEST_ID}
          onClick={() => copy(visibleSequence)}
        >
          {`Copy Visible Segment (${visibleRange})`}
        </MenuItem>
        <MenuItem
          data-testid={COPY_FULL_TEST_ID}
          disabled={fullSequence === visibleSequence}
          onClick={() => copy(fullSequence)}
        >
          {`Copy Full Segment (${fullRange})`}
        </MenuItem>
      </Menu>
    </TrackSequenceCopy>
  );
};

export default SequenceCopyButton;
