import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";
import { useCallback, useEffect, useRef, useState } from "react";
import { COPIED_FEEDBACK_MS } from "../constants";
import type { SequenceWrapperEntry } from "./useSequenceWrappers";

export interface CopySequence {
  /** True while the button shows its confirmation state. */
  copied: boolean;
  copySequence: () => void;
}

/**
 * Copies every chain's residues to the clipboard as one string, and holds a
 * confirmation flag for a moment afterwards. Placeholder entries contribute
 * nothing, since they have no residues to copy.
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
    const sequence = entries
      .filter((s) => typeof s.wrapper !== "string")
      .map((s) => {
        const w = s.wrapper as SequenceWrapper.Any;
        return Array.from({ length: w.length }, (_, i) =>
          w.residueLabel(i)
        ).join("");
      })
      .join("");

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
