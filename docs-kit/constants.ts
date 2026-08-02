/** Live preview surface wrapped around an extracted code example. */
export const PREVIEW_CLASS = "sds-doc-example-preview";

/** Expand/collapse control inside a code block's caption bar. */
export const TOGGLE_CLASS = "sds-doc-code-toggle";

/** Link out of a code block's caption bar, e.g. to the playground. */
export const CODE_ACTION_CLASS = "sds-doc-code-action";

/**
 * Storybook's opt-out from the typography it applies to bare elements across a
 * docs page. Previews render real components, so the whole subtree around one
 * carries this class — including the placeholder the preview is portaled into,
 * which would otherwise pass the docs body font down by inheritance.
 */
export const SB_UNSTYLED_CLASS = "sb-unstyled";
