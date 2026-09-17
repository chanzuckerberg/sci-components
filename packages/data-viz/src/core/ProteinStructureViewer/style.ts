import styled from "@emotion/styled";

interface ViewerRootProps {
  showSequenceViewer: boolean;
}

/** Smallest box in which Mol* can still lay out a usable viewport. */
const MIN_HEIGHT = 190;
const MIN_WIDTH = 200;

/**
 * Name of the size container the root declares below, which is what lets the
 * sequence panel and the legend reflow to the viewer's own width rather than
 * the page's.
 */
export const VIEWER_CONTAINER_NAME = "sds-structure-viewer";

/**
 * Height reserved for the sequence panel along the bottom, and the viewer
 * width above which it grows. Measured against the container above rather than
 * the page, so a viewer embedded in a wider page sizes to the room it has.
 *
 * The legend sits directly on top of the panel and offsets itself by these
 * same three values, so it reads them from here rather than restating them.
 * Copies that drifted would leave the legend floating off the panel.
 */
export const SEQUENCE_HEIGHT = "max(104px, 30%)";
export const SEQUENCE_HEIGHT_WIDE = "max(134px, 32%)";
export const WIDE_VIEWER = 880;

/**
 * The element Mol* mounts into.
 *
 * This has to be its own node rather than the root: Mol* takes ownership of its
 * target and replaces whatever is in it, so anything the viewer renders
 * alongside the plugin (the legend) has to be a sibling of this, not a child.
 */
export const PluginMount = styled("div")`
  position: absolute;
  inset: 0;
`;

/**
 * Root container for the viewer.
 *
 * Mol* ships no stylesheet of its own here: the viewport and sequence panel are
 * replaced with custom components and the remaining chrome is hidden, so all
 * that is left to style is the layout scaffolding. Those overrides are nested
 * below rather than declared globally, so consumers do not have to import
 * anything extra and two viewers on a page cannot fight over the same
 * selectors.
 *
 * The element also declares itself a size container, which is what lets the
 * legend reflow to the viewer's own width instead of the page's.
 */
export const ViewerRoot = styled("div")<ViewerRootProps>`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-width: ${MIN_WIDTH}px;
  min-height: ${MIN_HEIGHT}px;
  container-type: inline-size;
  container-name: ${VIEWER_CONTAINER_NAME};

  .msp-plugin {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }

  /*
   * The expanded layout is kept hidden because it is the one piece of Mol*
   * chrome that would escape this container: it takes the plugin out of the
   * box it was given and over the page.
   *
   * Its neighbours used to be here too - the viewport's icon column, and the
   * left, right and bottom regions. They are not any more, because hiding them
   * from here made them unreachable: Mol* already gates each of them behind a
   * PluginConfig.Viewport flag and behind layout.initial.regionState, both of
   * which a consumer can set through molstarSpec, and a display:none on top of
   * that overrode the answer. None of them shows by default - the viewer's own
   * flags and region state are what keep them away - so this only has to stay
   * out of their way.
   *
   * No backticks in here: this is inside a template literal, and one would end
   * it.
   */
  .msp-plugin .msp-layout-expanded {
    display: none !important;
  }

  .msp-plugin canvas {
    display: block !important;
  }

  .msp-plugin .msp-layout-static {
    height: 100%;
  }

  .msp-plugin .msp-sequence-wrapper-non-empty {
    overflow-y: auto;
  }

  /*
   * Mol* puts the sequence panel in its "top" region; move it to the bottom and
   * shrink the main viewport region to match, so the structure sits above the
   * sequence rather than behind it. The panel grows on wider viewers, and the
   * viewport region's offset follows it.
   */
  ${(props: ViewerRootProps) => {
    const { showSequenceViewer } = props;
    const mainBottom = showSequenceViewer ? SEQUENCE_HEIGHT : "0";
    const mainBottomWide = showSequenceViewer ? SEQUENCE_HEIGHT_WIDE : "0";

    return `
      .msp-plugin .msp-layout-region.msp-layout-top {
        display: ${showSequenceViewer ? "block" : "none"} !important;
        position: absolute !important;
        inset: auto 0 0 0 !important;
        height: ${SEQUENCE_HEIGHT} !important;
      }

      .msp-plugin .msp-layout-region.msp-layout-main {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: ${mainBottom} !important;
      }

      @container ${VIEWER_CONTAINER_NAME} (min-width: ${WIDE_VIEWER}px) {
        .msp-plugin .msp-layout-region.msp-layout-top {
          height: ${SEQUENCE_HEIGHT_WIDE} !important;
        }

        .msp-plugin .msp-layout-region.msp-layout-main {
          bottom: ${mainBottomWide} !important;
        }
      }
    `;
  }}

  /*
   * Toast slot rendered by the custom viewport. No loci label providers are
   * registered (residue info goes to the legend instead), so this only carries
   * Mol*'s own transient messages.
   */
  .msp-plugin .msp-highlight-toast-wrapper {
    position: absolute !important;
    left: 10px !important;
    max-width: 95% !important;
    z-index: 10000 !important;
    pointer-events: none;
  }
`;
