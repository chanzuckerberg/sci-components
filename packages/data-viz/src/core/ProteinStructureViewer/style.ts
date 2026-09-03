import styled from "@emotion/styled";
import { LEGEND_CONTAINER_NAME } from "./components/StructureLegend/style";

interface ViewerRootProps {
  showSequenceViewer: boolean;
}

/** Smallest box in which Mol* can still lay out a usable viewport. */
const MIN_HEIGHT = 190;
const MIN_WIDTH = 200;

/**
 * Height reserved for the sequence panel along the bottom, and the viewport
 * width above which it grows. The legend offsets in the legend's own styles
 * track these values.
 */
const SEQUENCE_HEIGHT = "max(104px, 30%)";
const SEQUENCE_HEIGHT_WIDE = "max(134px, 32%)";
const WIDE_VIEWPORT = 880;

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
  container-name: ${LEGEND_CONTAINER_NAME};

  .msp-plugin {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }

  /* Mol* chrome that the custom viewport and sequence panel replace. */
  .msp-plugin .msp-viewport-controls-buttons,
  .msp-plugin .msp-layout-expanded,
  .msp-plugin .msp-log,
  .msp-plugin .msp-left-panel-controls,
  .msp-plugin .msp-layout-region.msp-layout-left,
  .msp-plugin .msp-layout-region.msp-layout-right,
  .msp-plugin .msp-layout-region.msp-layout-bottom {
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
   * sequence rather than behind it. The panel grows on wider viewports, and the
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

      @media (min-width: ${WIDE_VIEWPORT}px) {
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
