import { Menu, MenuItem } from "@czi-sds/components";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { copyText } from "../../../../common/copyText";
import { TrackOverlayControl, TrackSequenceCopyButton } from "../../style";

/** How long the tick shows after a copy. */
const CONFIRM_MS = 2000;

export const COPY_TEST_ID = "genome-track-copy-sequence";
export const COPY_VISIBLE_TEST_ID = "genome-track-copy-visible";
export const COPY_FULL_TEST_ID = "genome-track-copy-full";

interface SequenceCopyButtonProps {
  /** The sequence inside the current viewport. */
  visibleSequence: string;
  /** The payload's whole sequence. */
  fullSequence: string;
  /** Range labels shown in the menu. */
  visibleRange: string;
  fullRange: string;
  /** Top edge of the control's line, in px, relative to the plot area. */
  top: number;
  /** Height of that line, so the control can centre on it. */
  height: number;
  density: "comfortable" | "compact";
}

/** SDS button size per density, with its icon size in px (`xs` and `xxs`). */
const CONTROL = {
  comfortable: { icon: 12, size: "medium" as const },
  compact: { icon: 10, size: "small" as const },
};

/** Copies the sequence, offering the visible range or the whole payload. */
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
      await copyText(text);
    } catch {
      // The clipboard write failed, so show no tick.
      return;
    }

    setCopied(true);

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), CONFIRM_MS);
  }, []);

  return (
    <TrackOverlayControl style={{ height, top }}>
      {/* `startIcon` with no children makes this an icon-only button. */}
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
    </TrackOverlayControl>
  );
};

export default SequenceCopyButton;
