import RawProteinStructureViewer, {
  StructureSelection,
} from "@data-viz/src/core/ProteinStructureViewer";
import { Args } from "@storybook/react-vite";
import { useState } from "react";
import { CRAMBIN_PDB, CRAMBIN_PLDDT } from "../constants";

/** Mol* needs a sized box; stories give it one. */
const STORY_HEIGHT = 520;
const STORY_MAX_WIDTH = 640;

export interface ProteinStructureViewerStoryProps extends Args {
  /**
   * Selection the story starts on.
   *
   * Not a component prop, and so deliberately not something a story passes
   * through `args`: it is only an initial value, where the real `selection` is
   * controlled for as long as the viewer is mounted. A control offering it
   * would appear to set the selection and then be ignored by every interaction
   * after the first. Stories that want it reach it through `render`, which
   * keeps it out of the controls panel.
   */
  initialSelection?: StructureSelection | null;
  /**
   * Chains the story starts with hidden.
   *
   * Seeding it this way, rather than passing `hiddenChains` as an arg, is what
   * keeps the toggles working: `hiddenChains` is controlled, so a story that
   * sets it and never updates it pins visibility where it started and the
   * toggles can only report. The story owns the state instead, which is what
   * a consumer driving visibility from its own UI would do.
   */
  initialHiddenChains?: string[];
}

export const ProteinStructureViewer = (
  props: ProteinStructureViewerStoryProps
): JSX.Element => {
  // Crambin unless a story names its own structure, as the complex does. These
  // are defaults rather than fixed values so that every arg a story sets is a
  // real component prop, and the controls panel offers nothing the component
  // does not actually take.
  const {
    initialHiddenChains,
    initialSelection = null,
    pdb = CRAMBIN_PDB,
    plddt = CRAMBIN_PLDDT,
    ...rest
  } = props;

  // Selection is controlled, so the story owns it the way a consumer would.
  // Every way of making one - a residue click, a drag across the sequence, a
  // chain caption - arrives through onSelectionChange, so the story accepts
  // them all by echoing whatever it is handed straight back.
  const [selection, setSelection] = useState<StructureSelection | null>(
    initialSelection
  );

  const [hiddenChains, setHiddenChains] = useState<string[]>(
    initialHiddenChains ?? []
  );

  /**
   * Only taken over when a story seeds it. Left alone otherwise, so the
   * uncontrolled default - the viewer owning visibility, which is what makes
   * the toggles work with no state on the consumer's side - is what the rest
   * of the stories demonstrate.
   */
  const controlsVisibility = initialHiddenChains !== undefined;

  return (
    <div
      style={{
        height: STORY_HEIGHT,
        width: "100%",
        maxWidth: STORY_MAX_WIDTH,
      }}
    >
      <RawProteinStructureViewer
        {...rest}
        {...(controlsVisibility && {
          hiddenChains,
          onChainVisibilityChange: setHiddenChains,
        })}
        onSelectionChange={setSelection}
        pdb={pdb}
        plddt={plddt}
        selection={selection}
      />
    </div>
  );
};
