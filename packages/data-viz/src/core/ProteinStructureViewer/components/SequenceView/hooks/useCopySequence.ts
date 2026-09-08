import { useCallback, useEffect, useRef, useState } from "react";
import { COPIED_FEEDBACK_MS } from "../constants";
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

    navigator.clipboard.writeText(sequence).then(() => {
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        () => setCopied(false),
        COPIED_FEEDBACK_MS
      );
    });
  }, [entries]);

  return { copied, copySequence };
}
