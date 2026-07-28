import React from "react";
import TooltipCondensed from "./index";
import figma from "@figma/code-connect";

figma.connect(
  TooltipCondensed,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=9133%3A16578",
  {
    props: {
      // Node URL updated: the old node (14086:9644) no longer exists after the
      // overhaul; this points at the current TooltipCondensed (9133:16578).
      //
      // REMOVED (drift fix): `inverted` and `hasInvertedStyle` both read the
      // Figma property "hasInvertedStyle?", which no longer exists.
      indicator: figma.boolean("showIndicator?"),
    },
    example: (props) => (
      <TooltipCondensed title="Tooltip text" indicator={props.indicator}>
        <span>Tooltip content</span>
      </TooltipCondensed>
    ),
  }
);
