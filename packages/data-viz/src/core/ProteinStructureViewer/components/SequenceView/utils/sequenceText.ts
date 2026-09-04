import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";
import { CHAIN_SEPARATOR } from "../constants";
import type { SequenceWrapperEntry } from "../hooks/useSequenceWrappers";

/**
 * The structure's residues as text, one section per chain separated by
 * `CHAIN_SEPARATOR`. Placeholder entries contribute nothing, since they have no
 * residues to write.
 */
export function sequenceTextFromEntries(
  entries: SequenceWrapperEntry[]
): string {
  return entries
    .filter((entry) => typeof entry.wrapper !== "string")
    .map((entry) => {
      const wrapper = entry.wrapper as SequenceWrapper.Any;
      return Array.from({ length: wrapper.length }, (_, i) =>
        wrapper.residueLabel(i)
      ).join("");
    })
    .join(CHAIN_SEPARATOR);
}
