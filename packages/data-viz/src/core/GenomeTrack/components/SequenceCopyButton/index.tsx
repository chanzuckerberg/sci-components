import { Button, Icon } from "@czi-sds/components";
import { useCallback, useEffect, useRef, useState } from "react";
import { TrackSequenceCopy } from "../../style";

/** How long the control shows a tick before returning to the copy icon. */
const CONFIRM_MS = 2000;

export const COPY_TEST_ID = "genome-track-copy-sequence";

interface SequenceCopyButtonProps {
  /**
   * The letters to copy.
   *
   * The *visible* range rather than the whole payload window, because that is
   * what the row draws and what the viewport means. A control that silently
   * copied more than is on screen would be a different feature wearing the same
   * icon.
   */
  sequence: string;
  /** The range those letters cover, named in the control's accessible label. */
  range: string;
  /** Top edge of the sequence row, in px, relative to the plot area. */
  top: number;
  /** Height of the sequence row, so the control can centre on it. */
  height: number;
}

/**
 * Copies the visible sequence to the clipboard.
 *
 * A real button, not a canvas affordance: it needs a focus ring, a tab stop and
 * an accessible name, none of which a drawn rectangle can have.
 *
 * It renders beside the plot rather than inside it, layered over the sequence
 * row. Inside, it would be an interactive descendant of the plot's `role="img"`
 * — which assistive technology may not expose at all — and its pointer events
 * would reach the plot's drag handler, where a press would start a pan and a
 * release would read as a click on empty space and clear the selection.
 */
export const SequenceCopyButton = ({
  height,
  range,
  sequence,
  top,
}: SequenceCopyButtonProps): JSX.Element => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(sequence);
    } catch {
      // Clipboard writes reject without a secure context or a user gesture the
      // browser recognises. Leaving the icon alone is the honest outcome: a
      // tick for a copy that did not happen is worse than no feedback.
      return;
    }

    setCopied(true);

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), CONFIRM_MS);
  }, [sequence]);

  return (
    <TrackSequenceCopy style={{ height, top }}>
      <Button
        aria-label={copied ? "Sequence copied" : `Copy sequence for ${range}`}
        data-testid={COPY_TEST_ID}
        onClick={onCopy}
        sdsStyle="minimal"
        sdsType="secondary"
        size="small"
      >
        <Icon sdsIcon={copied ? "Check" : "Copy"} sdsSize="xs" />
      </Button>
    </TrackSequenceCopy>
  );
};

export default SequenceCopyButton;
