import React from "react";
import SegmentedControl from "./index";
import figma from "@figma/code-connect";

/**
 * SegmentedControl renders from `buttonDefinition` — the previous mapping
 * passed an empty array, so the snippet showed an empty control.
 *
 * `segmentContent` maps to the SHAPE of each button definition: the code warns
 * if a button has both `icon` and `label` (and if it has neither), so icon and
 * text segments are genuinely different data, not a styling flag.
 *
 * NOT MAPPED:
 *   - `segment #` (2/3/4): a Figma authoring count; segment count is the
 *     length of `buttonDefinition`.
 *   - nested Segment `state`: interaction state, no code prop (each definition
 *     does support `disabled` if you need it).
 */
figma.connect(
  SegmentedControl,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=14148%3A10042",
  {
    props: {
      // PLACEHOLDER DATA — replace with your own. Structure is accurate;
      // segment counts, labels, and icons are illustrative only.
      buttonDefinition: figma.enum("segmentContent", {
        icon: [
          { icon: "DownloadSimple", value: "value-1" },
          { icon: "DownloadSimple", value: "value-2" },
        ],
        text: [
          { label: "Segment 1", value: "value-1" },
          { label: "Segment 2", value: "value-2" },
        ],
      }),
    },
    example: ({ buttonDefinition }) => (
      <SegmentedControl
        // PLACEHOLDER ICON — icon segments use a placeholder glyph, NOT the icon
        // used in the design. Code Connect cannot read Figma instance swaps, so
        // replace it with the icon actually shown on this instance in Figma.
        // Labels and segment count are illustrative too.
        buttonDefinition={buttonDefinition}
      />
    ),
  }
);
