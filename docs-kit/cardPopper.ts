import type { Modifier, PopperProps } from "@mui/material";

/**
 * The custom property a catalog card sets to say what its miniature has been
 * scaled by. Read off the popper, which inherits it from the stage.
 */
export const CARD_SCALE_PROPERTY = "--sds-card-scale";

type ScaleModifier = Modifier<"sdsCardScale", Record<string, never>>;

/**
 * Where an overlay sits relative to its anchor, corrected for the card's scale.
 *
 * Popper measures the scale itself, as an element's painted height over its
 * laid-out height, and divides the anchor's distance from the top of the window by
 * it. Painted heights are whole pixels: at 0.45 a 34px button paints 15px and so
 * measures 15/34, or 0.441, and every coordinate divided by that comes out long.
 * The overshoot grows with the anchor's distance down the window, which is what
 * makes an overlay creep away from its anchor as the page is scrolled.
 *
 * The scale is known exactly here, so this does popper's own arithmetic with it
 * and hands back the result. `state.reset` sends the update round again from the
 * top, so that what follows works from the corrected rectangle.
 */
const scaleModifier: ScaleModifier = {
  data: {},
  enabled: true,
  fn({ name, state }) {
    const data = state.modifiersData[name] as { corrected?: boolean };
    if (data.corrected) return;

    const { popper, reference } = state.elements;
    // A virtual anchor - the one a tooltip following the cursor is given - has no
    // element to be measured, and no scale to be measured wrongly.
    if (!(reference instanceof HTMLElement)) return;

    const scale = Number.parseFloat(
      window
        .getComputedStyle(popper)
        .getPropertyValue(CARD_SCALE_PROPERTY)
        .trim()
    );
    if (!scale || scale === 1) return;

    const parent = popper.offsetParent;
    if (!(parent instanceof HTMLElement)) return;

    const parentRect = parent.getBoundingClientRect();
    const referenceRect = reference.getBoundingClientRect();

    state.rects.reference = {
      height: referenceRect.height / scale,
      width: referenceRect.width / scale,
      x:
        (referenceRect.left - parentRect.left) / scale +
        parent.scrollLeft -
        parent.clientLeft,
      y:
        (referenceRect.top - parentRect.top) / scale +
        parent.scrollTop -
        parent.clientTop,
    };

    data.corrected = true;
    state.reset = true;
  },
  name: "sdsCardScale",
  phase: "afterRead",
};

/**
 * How an overlay is positioned inside a catalog card: from its anchor, corrected
 * for the card's scale, and from nothing else.
 *
 * Popper otherwise keeps an overlay inside the window, nudging it back in or
 * flipping it to the other side of its anchor when it would fall outside. Both
 * compare a miniature laid out at full size against the window it is drawn a
 * fraction of the size in, so an overlay is moved by however far down the page its
 * card happens to be - the second reason these drifted as the page scrolled. A
 * card is a fixed picture, and crops what runs past its edges, so it wants
 * neither.
 *
 * Passed to the popper through the catalog's theme, and by hand in the few card
 * examples whose component hands the popper options of its own; Tooltip is one.
 */
export const CARD_POPPER_OPTIONS: PopperProps["popperOptions"] = {
  modifiers: [
    scaleModifier,
    { enabled: false, name: "flip" },
    { enabled: false, name: "preventOverflow" },
  ],
};
