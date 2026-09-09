import { useCallback, useEffect, useRef, useState } from "react";
import { COPIED_FEEDBACK_MS } from "../constants";
import { copyText } from "../utils/copyText";
import { sequenceTextFromEntries } from "../utils/sequenceText";
import type { SequenceWrapperEntry } from "./useSequenceWrappers";

export interface CopySequence {
  /** True while the button shows its confirmation state. */
  copied: boolean;
  copySequence: () => void;
}

/**
 * Copies the structure's residues to the clipboard, chains separated so a
 * complex does not paste as one sequence, and holds a confirmation flag for a
 * moment afterwards.
 */
export function useCopySequence(entries: SequenceWrapperEntry[]): CopySequence {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  const copySequence = useCallback(() => {
    const sequence = sequenceTextFromEntries(entries);

    void copyText(sequence)
      .then(() => {
        setCopied(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(
          () => setCopied(false),
          COPIED_FEEDBACK_MS
        );
      })
      .catch(() => {
        // The host refused both clipboard paths. Leave the button unconfirmed
        // rather than report a copy that did not happen.
      });
  }, [entries]);

  return { copied, copySequence };
}
