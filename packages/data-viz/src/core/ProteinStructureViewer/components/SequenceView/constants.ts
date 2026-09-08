/** Residues are laid out in fixed-size sections that never split across lines. */
export const SEQUENCE_GROUP_SIZE = 10;

/** Attribute carrying a residue's sequence index, used for hit testing. */
export const SEQ_ID_ATTR = "data-seqid";

/** Hover updates are coalesced to roughly one every three frames. */
export const HOVER_THROTTLE_MS = 3 * 16.666;

/** How long the copy button shows its confirmation state. */
export const COPIED_FEEDBACK_MS = 2000;

export const CAMERA_RESET_DURATION_MS = 250;
