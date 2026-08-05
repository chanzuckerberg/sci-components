/** Live preview surface wrapped around an extracted code example. */
export const PREVIEW_CLASS = "sds-doc-example-preview";

/** Grid of component cards, one per category, on the Overview page. */
export const CATALOG_CLASS = "sds-doc-catalog";

/**
 * The cropped frame a catalog card renders its miniature in. Doubles as the
 * scope for whatever CSS that example brought with it, as `PREVIEW_CLASS` does
 * for a full preview.
 */
export const CATALOG_PREVIEW_CLASS = "sds-doc-catalog-preview";

/**
 * Placeholder a page fills with live content of its own, handed to <SdsDoc />
 * as a slot. Unlike an example, what goes in one is not a sandbox to read and
 * run but part of the page itself, such as the table of tokens a Bases page is
 * written around.
 */
export const SLOT_CLASS = "sds-doc-slot";

/** Expand/collapse control inside a code block's caption bar. */
export const TOGGLE_CLASS = "sds-doc-code-toggle";

/**
 * The code itself, under a block's caption bar. Positions the copy control over
 * the corner of the code, and is what a collapsed block hides.
 */
export const CODE_BODY_CLASS = "sds-doc-code-body";

/** Holds the copy control in the top corner of the code it copies. */
export const CODE_COPY_CLASS = "sds-doc-code-copy";

/** Link out of a code block's caption bar, e.g. to the playground. */
export const CODE_ACTION_CLASS = "sds-doc-code-action";

/**
 * Storybook's opt-out from the typography it applies to bare elements across a
 * docs page. Previews render real components, so the whole subtree around one
 * carries this class — including the placeholder the preview is portaled into,
 * which would otherwise pass the docs body font down by inheritance.
 */
export const SB_UNSTYLED_CLASS = "sb-unstyled";
